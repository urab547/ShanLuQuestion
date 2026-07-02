# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the build locally
npm run lint      # ESLint (eslint.config.js)
npm run deploy    # build + push to GitHub Pages via gh-pages
```

No test framework is configured.

## Architecture

This is a React 19 + Vite browser game — a Tibetan-village point-and-click narrative adventure. All UI text and dialogue is in Chinese.

### State management (App.jsx → Scene.jsx)

All global game state lives in `src/App.jsx`:
- `currentSceneId` — which scene the player is in
- `npcTrust` — per-NPC `{ trustLevel: 0-100, flags: {}, unlockedDialogueTopics: [] }`
- `inventory` — array of collected item/scroll IDs
- `pigments` — per-pigment `{ rawMaterialFound, recipeUnderstood }`
- `viewingItem` — `{ type, id? }` for the currently open viewer overlay

Everything is passed as props into `Scene.jsx`, which manages all scene-local state (~1800 lines). **All interactable click handlers and dialogue-close side effects live in Scene.jsx**, not in child components. When a dialogue closes, `handleCloseDialogue` in Scene.jsx inspects `dialogue.dialogueId` and applies state mutations (flags, trust deltas, save calls, etc.). First-time trust rewards are declared in the `TRUST_AWARDS_ON_CLOSE` table at the top of Scene.jsx and granted via `awardTrustOnce(key, npcId, delta)` (dedup记录 in localStorage `shanglu_trust_awards`).

### Dialogue system (DialogueOverlay.jsx)

- `playerOptions` entries can be plain strings (all funnel to the dialogue's `nextDialogueId`) **or objects** `{ text, next, trustDelta, npcId }` — an object's `next` overrides the default target (real branching; used for 旦增's taboo-test chain `dlg_danzeng_r1_open → r2 → r3_final`, where taboo options jump to `dlg_danzeng_scene_end` and cost -5 trust via Scene's `handleOptionSelect`).
- A dialogue with `nextDialogueId` but **no** `playerOptions` auto-advances to the next node on the last-line click (used for multi-part cutscene chains like the ch4 truth → 白玛 memory sequence).
- Chain advancement (`handleAdvanceDialogue`) preserves `isNpc`/`npcId` so the AI free-chat toggle stays available mid-chain.

### Chapter wiring & ending

- Ch1: first visit to `village_entrance` auto-triggers `dlg_ch1_s1_entry` (guard: localStorage `shanglu_ch1_entry_shown`); three observation items (`village_view`, `north_house`, `snow_peak`) carry the grandfather-notebook foreshadowing.
- Ch2: clicking 旦增 before `danzengSceneBCompleted` flag runs the "先听，再问" taboo test; passing awards +15 and sets the flag.
- Ch4: viewing all three temple-interior relics (`hallFrameViewed/hallMuralViewed/hallClothViewed` scene flags) triggers the truth chain `dlg_danzeng_ch4_truth_open` → 白玛 memory ×4 → `dlg_ch5_transition`.
- Ch5: closing `dlg_ch5_transition` sets `ch4TruthDone` and mounts `EndingSequence.jsx` (留白 ending: BGM stop → fade to black → title → "— 完 —"; no closing text by design). The `dlg_end_cinematic_phase1~5` nodes in dialogues.js are camera-direction drafts, never shown to players.
- Chapters not yet wired: 卓玛办公室 (ch2 scene A), ch3 meeting/hunter-story/"手老了", 仁青 photos 3–5 full image-reading chain. See `src/documents/GameDesignDocument.md` §10 for the backlog.

### Persistence

`src/data/saveManager.js` is the single entry point for all localStorage reads and writes. All keys use the `shanglu_` prefix. The `KEY_MAP` in saveManager maintains old keyname aliases for migration. `deleteSave()` clears everything matching `shanglu_*`.

Direct localStorage calls outside saveManager exist for some keys (custom positions, scales, red dots), but core game state always goes through saveManager.

Notable `shanglu_` keys added 2026-07: `shanglu_trust_awards` (one-shot trust grant dedup), `shanglu_ai_trust_gained_<npcId>` (AI-judge positive-gain cap, 15/NPC), `shanglu_ch1_entry_shown`, scene-state fields `hallFrameViewed/hallMuralViewed/hallClothViewed/ch4TruthDone`. All are cleared by `deleteSave()` on new game.

### Data layer (`src/data/`)

Static definitions — never mutated at runtime:
- `scenes.js` — scene graph (exits, interactable IDs, NPC IDs per scene)
- `items.js` — interactable item definitions
- `npcs.js` — NPC definitions with default positions
- `dialogues.js` — all scripted dialogue trees keyed by `dlg_*` ID
- `trustStages.js` — maps trustLevel ranges to stage names (`stranger` / `listener` / `acknowledged` / `confidant`)
- `scrolls.js`, `pigments.js`, `puzzles.js`, `scrolls.js` — collectible/puzzle data
- `customPositions.js` — default positions/scales for items, NPCs, exits (editable via the in-game "💾 保存布局" dev button, debug mode only)

Design docs live in `src/documents/`. **`GameDesignDocument.md` is the consolidated master** (with 🔧 implementation-status annotations dated 2026-07-02, including the change log in §10); the other three (`GameDesignInitial.md`, `GDD_complete.md`, `SystemDesign.md`) are archived historical versions. The full design review with fix annotations is in `评估.md` at the repo root.

### NPC trust system

Each NPC has `trustLevel` (0–100, never shown to the player). `getTrustStage(npcId, trustLevel)` returns the current stage object. Dialogue IDs follow the convention `dlg_<npcId>_<stage>` for trust-gated conversations. Trust changes happen via `onAdjustTrust(npcId, delta)` called from Scene.jsx at dialogue-close time. Boolean event flags on each NPC drive branching logic (e.g. `hasGivenThangka`, `hasRevealedGubaiSecret`, `danzengSceneBCompleted`).

**Trust economy is balanced to be completable without debug tools.** Supply ledger (each first-time only): 旦增 76 / 白玛 79 (confidant gate = 71 for骨白 secret & temple entry), 格桑 46, 卓玛 30. The sang-ritual success is the deliberate pivot: +15 to 旦增/白玛 (+12 卓玛), pushing 旦增 past confidant to unlock 骨白 and break the "骨白→唐卡→trust→骨白" deadlock. If you add/remove trust-gated content, re-check the ledger in `TRUST_AWARDS_ON_CLOSE` (Scene.jsx) — thresholds are 21/46/71. The 🔧 trust debug panel and 💾 save-layout button only render in debug mode (`?debug` URL param or `localStorage.shanglu_debug === '1'`).

### AI dialogue

`src/ai/apiClient.js` wraps an OpenAI-compatible SSE endpoint (configured in `.env`; currently DeepSeek). Key env vars:
- `VITE_AI_ENDPOINT` — full chat completions URL
- `VITE_AI_API_KEY` — bearer token
- `VITE_AI_MODEL` — model name

Each NPC has a system prompt in `src/ai/prompts/<npcId>.js`, aggregated by `src/ai/npcPrompts.js`. AI mode is triggered when `DialogueOverlay` receives `startInAi: true` (used for free-chat with NPC 仁青 after first meeting).

Free chat feeds back into game state (two directions):
- **AI → game**: on overlay unmount, if the player spoke, `judgeAiChat()` (apiClient.js) sends the transcript for a post-hoc trust verdict (-5..+5; positive gains capped at 15/NPC via `shanglu_ai_trust_gained_*`); Scene's `handleAiChatEnd` applies the delta. Judge failures are silently ignored.
- **Game → AI**: Scene's `getAiContext(npcId)` appends current trust stage + key story flags to the system prompt so the AI persona stays consistent with fixed-dialogue progress.

### Scene rendering

`Scene.jsx` renders a two-layer background (sky color + ground color), an optional background image (`src/data/assets.js → SCENE_BG`), draggable interactables and NPCs, exit arrows, and puzzle widgets. All positions/scales are read from `customPositions` state (merged from `src/data/customPositions.js` defaults and localStorage overrides).

Puzzles (`SortablePuzzle` inside `PuzzleWrapper`) are rendered inline in Scene.jsx for specific scene IDs (temple_exterior → mani_stones, mountain_peak → prayer_flags).

### Viewer overlays

`viewingItem.type` drives which full-screen overlay mounts:
| type | component |
|---|---|
| `scroll` | `ScrollViewer` |
| `pigment` | `PigmentViewer` |
| `pulu` | `PuluGrinder` |
| `thangka` | `ThangkaWorkshop` |
| `thangka_replica` | `ThangkaReplicaViewer` |
| `memory_canvas` | `MemoryCanvasViewer` |
| `sang_ritual` | `SangRitualViewer` |
| `special_item` | `SpecialItemViewer` |

`EndingSequence` is not a `viewingItem` type — it mounts from Scene-local `endingActive` state when `dlg_ch5_transition` closes.
