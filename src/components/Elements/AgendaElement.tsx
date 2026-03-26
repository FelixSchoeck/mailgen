import type { AgendaElement as AgendaElementType, AgendaItem } from '../../types';
import { createId } from '../../utils/elementDefaults';
import styles from '../../styles/elements.module.css';

interface Props {
  element: AgendaElementType;
  onChange: (updates: Partial<AgendaElementType>) => void;
}

export function AgendaElement({ element, onChange }: Props) {
  const updateItem = (itemId: string, updates: Partial<AgendaItem>) => {
    const newItems = element.items.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    onChange({ items: newItems });
  };

  const removeItem = (itemId: string) => {
    const newItems = element.items.filter((item) => item.id !== itemId);
    onChange({ items: newItems });
  };

  const addItem = () => {
    const nextNumber = element.items.length + 1;
    const newItem: AgendaItem = {
      id: createId(),
      label: `TOP ${nextNumber}`,
      text: '',
    };
    onChange({ items: [...element.items, newItem] });
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Titel</label>
        <input
          type="text"
          className={styles.input}
          value={element.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="z.B. 📋 Tagesordnung (TO)"
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Tagesordnungspunkte</label>
        <div className={styles.agendaItems}>
          {element.items.map((item) => (
            <div key={item.id} className={styles.agendaItem}>
              <input
                type="text"
                className={`${styles.input} ${styles.agendaLabel}`}
                value={item.label}
                onChange={(e) => updateItem(item.id, { label: e.target.value })}
                placeholder="TOP X"
              />
              <input
                type="text"
                className={`${styles.input} ${styles.agendaText}`}
                value={item.text}
                onChange={(e) => updateItem(item.id, { text: e.target.value })}
                placeholder="Thema eingeben..."
              />
              <button
                type="button"
                className={styles.agendaRemove}
                onClick={() => removeItem(item.id)}
                title="Entfernen"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <button type="button" className={styles.addAgendaItem} onClick={addItem}>
          + Punkt hinzufügen
        </button>
      </div>
    </div>
  );
}
