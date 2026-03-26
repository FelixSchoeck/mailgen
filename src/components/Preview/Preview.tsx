import { useMemo } from 'react';
import type { MailDocument } from '../../types';
import { generatePreviewHtml } from '../../utils';
import styles from '../../styles/editor.module.css';

interface Props {
  document: MailDocument;
}

export function Preview({ document }: Props) {
  const html = useMemo(() => {
    return generatePreviewHtml(document);
  }, [document]);

  return (
    <div className={styles.previewPane}>
      <div className={styles.previewLabel}>Live-Vorschau</div>
      <iframe
        srcDoc={html}
        title="Mail-Vorschau"
        style={{
          width: '100%',
          height: 'calc(100% - 30px)',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      />
    </div>
  );
}
