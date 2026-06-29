import { ITEMS } from '../data/items';
import './SpecialItemViewer.css';

/**
 * 特殊物品的详细信息浮层
 * 用于查看松柏、杜松、高原野草、氆氇碎片等特殊物品的详情
 */

const ITEM_DETAILS = {
  song_bai: {
    title: '松柏',
    desc: (
      <>
        <p>生长在经堂外墙角的一株老松柏。</p>
        <p>煨桑仪式中用于净化——先用松柏的烟洗净身心，再请杜松的烟把祈福带上去。</p>
        <p>白玛说过，先净后请，顺序不能错。</p>
      </>
    ),
  },
  du_song: {
    title: '杜松',
    desc: (
      <>
        <p>旦增家院子旁山坡边的杜松。</p>
        <p>煨桑仪式中用于祈福——让烟把心愿带上去。白玛说这是后放的植物，在松柏净化之后入炉。</p>
      </>
    ),
  },
  ye_cao: {
    title: '高原野草',
    desc: (
      <>
        <p>煨桑台边散落的干枯野草。</p>
        <p>看起来和仪式用的松柏、杜松有些相似，但并非煨桑的正确材料。</p>
        <p>如果放进炉里，烟的味道不对——白玛一定会皱眉。</p>
      </>
    ),
  },
  pulu_fragment: {
    title: '氆氇碎片',
    desc: (
      <>
        <p>从白玛那里得到的氆氇碎片。</p>
        <p>已被研磨成骨白粉末，不再是一块布料。</p>
        <p>骨白是绘制唐卡的重要底色颜料之一。</p>
      </>
    ),
  },
};

export default function SpecialItemViewer({ itemId, onClose }) {
  const item = ITEMS[itemId];
  const detail = ITEM_DETAILS[itemId];

  if (!item) return null;

  return (
    <div className="special-item-viewer__overlay" onClick={onClose}>
      <div className="special-item-viewer" onClick={(e) => e.stopPropagation()}>
        <button className="special-item-viewer__close" onClick={onClose}>×</button>

        <div className="special-item-viewer__icon">{item.emoji}</div>
        <h2 className="special-item-viewer__title">
          {detail?.title || item.label}
        </h2>

        {detail?.desc && (
          <div className="special-item-viewer__desc">{detail.desc}</div>
        )}

        <button className="special-item-viewer__back" onClick={onClose}>
          返回包裹
        </button>
      </div>
    </div>
  );
}
