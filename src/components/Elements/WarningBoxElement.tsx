import type { WarningBoxElement as WarningBoxElementType } from '../../types';
import { RichTextEditor } from '../common';
import styles from '../../styles/elements.module.css';

interface Props {
  element: WarningBoxElementType;
  onChange: (updates: Partial<WarningBoxElementType>) => void;
}

export function WarningBoxElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Titel</label>
        <input
          type="text"
          className={styles.input}
          value={element.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="z.B. ⏱️ Hinweis zur Redezeit"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Inhalt</label>
        <RichTextEditor
          value={element.content}
          onChange={(content) => onChange({ content })}
          placeholder="Um allen genügend Raum zu geben..."
          rows={4}
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.warningPreview}>
        <div className={styles.warningTitle}>{element.title || 'Hinweis'}</div>
        <div style={{ fontSize: '13px', color: '#333', whiteSpace: 'pre-wrap' }}>
          {element.content || 'Inhalt...'}
        </div>
      </div>
    </div>
  );
}
