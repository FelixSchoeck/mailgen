import type { DividerElement as DividerElementType } from '../../types';
import styles from '../../styles/elements.module.css';

interface Props {
  element: DividerElementType;
  onChange: (updates: Partial<DividerElementType>) => void;
}

export function DividerElement({ element: _element, onChange: _onChange }: Props) {
  return (
    <div>
      <div className={styles.dividerPreview} />
      <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '8px' }}>
        Horizontale Trennlinie
      </div>
    </div>
  );
}
