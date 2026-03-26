import { useRef } from 'react';
import type { MailElement } from '../../types';
import { elementMetas } from '../../utils';
import {
  HeaderElement,
  TextElement,
  HighlightBoxElement,
  WarningBoxElement,
  AgendaElement,
  ButtonElement,
  DividerElement,
  SignatureElement,
  FooterElement,
} from '../Elements';
import styles from '../../styles/editor.module.css';

interface Props {
  elements: MailElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<MailElement>) => void;
  onRemoveElement: (id: string) => void;
  onMoveElement: (fromIndex: number, toIndex: number) => void;
}

export function ElementList({
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onRemoveElement,
  onMoveElement,
}: Props) {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      if (dragItem.current !== dragOverItem.current) {
        onMoveElement(dragItem.current, dragOverItem.current);
      }
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const getElementMeta = (type: string) => {
    return elementMetas.find((m) => m.type === type);
  };

  const renderElementEditor = (element: MailElement) => {
    const handleChange = (updates: Partial<MailElement>) => {
      onUpdateElement(element.id, updates);
    };

    switch (element.type) {
      case 'header':
        return <HeaderElement element={element} onChange={handleChange} />;
      case 'text':
        return <TextElement element={element} onChange={handleChange} />;
      case 'highlight-box':
        return <HighlightBoxElement element={element} onChange={handleChange} />;
      case 'warning-box':
        return <WarningBoxElement element={element} onChange={handleChange} />;
      case 'agenda':
        return <AgendaElement element={element} onChange={handleChange} />;
      case 'button':
        return <ButtonElement element={element} onChange={handleChange} />;
      case 'divider':
        return <DividerElement element={element} onChange={handleChange} />;
      case 'signature':
        return <SignatureElement element={element} onChange={handleChange} />;
      case 'footer':
        return <FooterElement element={element} onChange={handleChange} />;
      default:
        return null;
    }
  };

  if (elements.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>📭</p>
        <p>Füge Elemente aus der Sidebar hinzu,<br />um deine Mail zu erstellen.</p>
      </div>
    );
  }

  return (
    <div className={styles.elementList}>
      {elements.map((element, index) => {
        const meta = getElementMeta(element.type);
        const isSelected = selectedElementId === element.id;

        return (
          <div
            key={element.id}
            className={`${styles.elementCard} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelectElement(element.id)}
          >
            <div 
              className={styles.elementCardHeader}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className={styles.elementCardTitle}>
                <span style={{ cursor: 'grab' }}>☰</span>
                <span>{meta?.icon}</span>
                <span>{meta?.label}</span>
              </div>
              <div className={styles.elementCardActions}>
                <button
                  className={styles.iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index > 0) onMoveElement(index, index - 1);
                  }}
                  disabled={index === 0}
                  title="Nach oben"
                >
                  ↑
                </button>
                <button
                  className={styles.iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index < elements.length - 1) onMoveElement(index, index + 1);
                  }}
                  disabled={index === elements.length - 1}
                  title="Nach unten"
                >
                  ↓
                </button>
                <button
                  className={`${styles.iconButton} ${styles.delete}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveElement(element.id);
                  }}
                  title="Löschen"
                >
                  🗑
                </button>
              </div>
            </div>
            <div className={styles.elementCardContent}>
              {renderElementEditor(element)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
