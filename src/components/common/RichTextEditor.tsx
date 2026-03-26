import { useRef, useCallback } from 'react';
import styles from '../../styles/elements.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function RichTextEditor({ value, onChange, placeholder, rows = 4 }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapSelection = useCallback((before: string, after: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = 
      value.substring(0, start) + 
      before + selectedText + after + 
      value.substring(end);
    
    onChange(newText);

    // Cursor nach der Formatierung positionieren
    setTimeout(() => {
      textarea.focus();
      if (selectedText.length === 0) {
        // Wenn nichts selektiert war, Cursor zwischen die Marker setzen
        textarea.setSelectionRange(start + before.length, start + before.length);
      } else {
        // Wenn Text selektiert war, den formatierten Text selektieren
        textarea.setSelectionRange(start, end + before.length + after.length);
      }
    }, 0);
  }, [value, onChange]);

  const insertList = useCallback((ordered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const lines = selectedText.split('\n');
    const listText = lines.map((line, i) => {
      const prefix = ordered ? `${i + 1}. ` : '• ';
      // Wenn Zeile schon mit Aufzählung beginnt, entfernen
      if (line.match(/^(\d+\.\s|•\s|-\s|\*\s)/)) {
        return line.replace(/^(\d+\.\s|•\s|-\s|\*\s)/, '');
      }
      return prefix + line;
    }).join('\n');
    
    const newText = value.substring(0, start) + listText + value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + listText.length);
    }, 0);
  }, [value, onChange]);

  const handleFormat = useCallback((format: string) => {
    switch (format) {
      case 'bold':
        wrapSelection('**', '**');
        break;
      case 'italic':
        wrapSelection('*', '*');
        break;
      case 'underline':
        wrapSelection('<u>', '</u>');
        break;
      case 'ul':
        insertList(false);
        break;
      case 'ol':
        insertList(true);
        break;
    }
  }, [wrapSelection, insertList]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tastaturkürzel
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormat('underline');
          break;
      }
    }
  }, [handleFormat]);

  return (
    <div className={styles.richTextEditor}>
      <div className={styles.formatToolbar}>
        <button
          type="button"
          className={styles.formatButton}
          onClick={() => handleFormat('bold')}
          title="Fett (Strg+B)"
        >
          <strong>F</strong>
        </button>
        <button
          type="button"
          className={styles.formatButton}
          onClick={() => handleFormat('italic')}
          title="Kursiv (Strg+I)"
        >
          <em>K</em>
        </button>
        <button
          type="button"
          className={styles.formatButton}
          onClick={() => handleFormat('underline')}
          title="Unterstrichen (Strg+U)"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>
        <span className={styles.formatDivider} />
        <button
          type="button"
          className={styles.formatButton}
          onClick={() => handleFormat('ul')}
          title="Aufzählung"
        >
          •≡
        </button>
        <button
          type="button"
          className={styles.formatButton}
          onClick={() => handleFormat('ol')}
          title="Nummerierte Liste"
        >
          1.
        </button>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.richTextarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
