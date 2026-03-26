import type { FooterElement as FooterElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: FooterElementType;
  onChange: (updates: Partial<FooterElementType>) => void;
}

export function FooterElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Organisationsname</label>
        <input
          type="text"
          className={styles.input}
          value={element.organizationName}
          onChange={(e) => onChange({ organizationName: e.target.value })}
          placeholder="z.B. OV Musterstadt"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Organisationstyp</label>
        <input
          type="text"
          className={styles.input}
          value={element.organizationType}
          onChange={(e) => onChange({ organizationType: e.target.value })}
          placeholder="z.B. BÜNDNIS 90/DIE GRÜNEN"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Zusatzinfo (optional)</label>
        <input
          type="text"
          className={styles.input}
          value={element.additionalInfo || ''}
          onChange={(e) => onChange({ additionalInfo: e.target.value })}
          placeholder="z.B. Link zum Impressum"
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.footerPreview}>
        <div>{element.organizationName || 'OV Name'}</div>
        <div>{element.organizationType || 'Organisation'}</div>
        {element.additionalInfo && (
          <div className="additionalInfo">{element.additionalInfo}</div>
        )}
      </div>
    </div>
  );
}
