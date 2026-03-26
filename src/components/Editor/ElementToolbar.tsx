import type { ElementType } from '../../types';
import { elementMetas } from '../../utils';
import styles from '../../styles/editor.module.css';

interface Props {
  onAddElement: (type: ElementType) => void;
}

export function ElementToolbar({ onAddElement }: Props) {
  return (
    <div className={styles.elementToolbar}>
      <div className={styles.elementToolbarTitle}>Elemente hinzufügen</div>
      <div className={styles.elementGrid}>
        {elementMetas.map((meta) => (
          <button
            key={meta.type}
            className={styles.elementButton}
            onClick={() => onAddElement(meta.type)}
            title={meta.description}
          >
            <span className={styles.elementIcon}>{meta.icon}</span>
            <span className={styles.elementLabel}>{meta.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
