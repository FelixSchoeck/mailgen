import type { TextElement as TextElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: TextElementType;
  onChange: (updates: Partial<TextElementType>) => void;
}

export function TextElement({ element, onChange }: Props) {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Text</label>
        <textarea
          className={styles.textarea}
          value={element.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Gib deinen Text ein...&#10;&#10;**fett** und *kursiv* werden unterstützt."
          rows={4}
        />
        <div className={styles.hint}>
          Formatierung: **fett**, *kursiv*
        </div>
      </div>
    </div>
  );
}
