import type { HeaderElement as HeaderElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: HeaderElementType;
  onChange: (updates: Partial<HeaderElementType>) => void;
}

export function HeaderElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Titel</label>
        <input
          type="text"
          className={styles.input}
          value={element.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="z.B. Einladung zur OV-Sitzung"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Untertitel</label>
        <input
          type="text"
          className={styles.input}
          value={element.subtitle}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          placeholder="z.B. OV Musterstadt"
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.headerPreview}>
        <div className={styles.headerTitle}>{element.title || 'Titel'}</div>
        <div className={styles.headerSubtitle}>{element.subtitle || 'Untertitel'}</div>
      </div>
    </div>
  );
}
