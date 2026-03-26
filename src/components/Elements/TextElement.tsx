import type { TextElement as TextElementType } from '../../types';
import { RichTextEditor } from '../common';
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
        <RichTextEditor
          value={element.content}
          onChange={(content) => onChange({ content })}
          placeholder="Gib deinen Text ein..."
          rows={4}
        />
      </div>
    </div>
  );
}
