import type { HighlightBoxElement as HighlightBoxElementType } from '../../types';
import { RichTextEditor } from '../common';
import styles from '../../styles/elements.module.css';

interface Props {
  element: HighlightBoxElementType;
  onChange: (updates: Partial<HighlightBoxElementType>) => void;
}

export function HighlightBoxElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Titel</label>
        <input
          type="text"
          className={styles.input}
          value={element.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="z.B. 📅 Wann & Wo"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Inhalt</label>
        <RichTextEditor
          value={element.content}
          onChange={(content) => onChange({ content })}
          placeholder="**Wann:** Montag, 15.04.2024 um 19:00 Uhr"
          rows={4}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Hinweis (optional)</label>
        <input
          type="text"
          className={styles.input}
          value={element.hint || ''}
          onChange={(e) => onChange({ hint: e.target.value })}
          placeholder="z.B. Getränke sind vorhanden"
        />
      </div>
      
      {/* Mini-Vorschau */}
      <div className={styles.highlightPreview}>
        <div className={styles.highlightTitle}>{element.title || 'Titel'}</div>
        <div style={{ fontSize: '13px', color: '#333' }}>
          {element.content || 'Inhalt...'}
        </div>
      </div>
    </div>
  );
}
