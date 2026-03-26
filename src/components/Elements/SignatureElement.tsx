import type { SignatureElement as SignatureElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: SignatureElementType;
  onChange: (updates: Partial<SignatureElementType>) => void;
}

export function SignatureElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Grußformel</label>
        <input
          type="text"
          className={styles.input}
          value={element.greeting}
          onChange={(e) => onChange({ greeting: e.target.value })}
          placeholder="z.B. Herzliche Grüße 🌻"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Abschlusstext</label>
        <input
          type="text"
          className={styles.input}
          value={element.closingText}
          onChange={(e) => onChange({ closingText: e.target.value })}
          placeholder="z.B. euer Sprecher*innenteam"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Namen</label>
        <input
          type="text"
          className={styles.input}
          value={element.names}
          onChange={(e) => onChange({ names: e.target.value })}
          placeholder="z.B. Max Mustermann & Erika Musterfrau"
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.signaturePreview}>
        <p className={styles.greeting}>{element.greeting || 'Grußformel'}</p>
        <p className={styles.closingText}>{element.closingText || 'Abschlusstext'}</p>
        <p className={styles.names}>{element.names || 'Namen'}</p>
      </div>
    </div>
  );
}
