import type { ButtonElement as ButtonElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: ButtonElementType;
  onChange: (updates: Partial<ButtonElementType>) => void;
}

export function ButtonElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Titel</label>
        <input
          type="text"
          className={styles.input}
          value={element.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="z.B. Der digitale OV-Kalender"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Beschreibung</label>
        <input
          type="text"
          className={styles.input}
          value={element.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="z.B. Damit ihr keinen Termin mehr verpasst!"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Button-Text</label>
        <input
          type="text"
          className={styles.input}
          value={element.buttonText}
          onChange={(e) => onChange({ buttonText: e.target.value })}
          placeholder="z.B. Zum Kalender"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Button-URL</label>
        <input
          type="url"
          className={styles.input}
          value={element.buttonUrl}
          onChange={(e) => onChange({ buttonUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Hilfetext (optional)</label>
        <input
          type="text"
          className={styles.input}
          value={element.hint || ''}
          onChange={(e) => onChange({ hint: e.target.value })}
          placeholder="z.B. Bei Problemen meldet euch gerne"
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.buttonPreview}>
        <div className={styles.buttonTitle}>{element.title || 'Titel'}</div>
        <div className={styles.buttonDescription}>{element.description || 'Beschreibung'}</div>
        <span className={styles.ctaButton}>{element.buttonText || 'Button'} →</span>
      </div>
    </div>
  );
}
