import { useState, useCallback } from 'react';
import type { ElementType, MailDocument } from '../../types';
import { useMailBuilder } from '../../hooks';
import { generateMailHtml, copyHtmlToClipboard } from '../../utils';
import { ElementToolbar } from './ElementToolbar';
import { ElementList } from './ElementList';
import { Preview } from '../Preview';
import styles from '../../styles/editor.module.css';

export function Editor() {
  const {
    document,
    elements,
    selectedElementId,
    isDirty,
    addElement,
    removeElement,
    updateElement,
    moveElement,
    selectElement,
    loadDocument,
    newDocument,
    saveAsDraft,
    getSavedDrafts,
    deleteDraft,
  } = useMailBuilder();

  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [draftName, setDraftName] = useState('');

  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  }, []);

  const handleAddElement = useCallback((type: ElementType) => {
    addElement(type);
  }, [addElement]);

  const handleCopyHtml = useCallback(async () => {
    const html = generateMailHtml(document);
    const success = await copyHtmlToClipboard(html);
    
    if (success) {
      showNotification('✓ HTML in Zwischenablage kopiert!');
    } else {
      showNotification('Fehler beim Kopieren', 'error');
    }
  }, [document, showNotification]);

  const handleSaveDraft = useCallback(() => {
    if (!draftName.trim()) return;
    
    const saved = saveAsDraft(draftName.trim());
    if (saved) {
      showNotification(`Entwurf "${draftName}" gespeichert`);
      setDraftName('');
      setShowSaveModal(false);
    } else {
      showNotification('Fehler beim Speichern', 'error');
    }
  }, [draftName, saveAsDraft, showNotification]);

  const handleLoadDraft = useCallback((draft: MailDocument) => {
    loadDocument(draft);
    showNotification(`Entwurf "${draft.name}" geladen`);
  }, [loadDocument, showNotification]);

  const handleDeleteDraft = useCallback((id: string, name: string) => {
    if (window.confirm(`Entwurf "${name}" wirklich löschen?`)) {
      deleteDraft(id);
      showNotification(`Entwurf gelöscht`);
    }
  }, [deleteDraft, showNotification]);

  const handleNewDocument = useCallback(() => {
    if (isDirty && !window.confirm('Ungespeicherte Änderungen verwerfen?')) {
      return;
    }
    newDocument();
  }, [isDirty, newDocument]);

  const savedDrafts = getSavedDrafts();

  return (
    <div className={styles.editor}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>📧 Mailbaukasten</h1>
          <p>Grünen-Ortsverband</p>
        </div>
        <div className={styles.sidebarContent}>
          <ElementToolbar onAddElement={handleAddElement} />
          
          {/* Entwürfe */}
          <div className={styles.draftsSection}>
            <div className={styles.draftsSectionTitle}>Gespeicherte Entwürfe</div>
            {savedDrafts.length > 0 ? (
              <div className={styles.draftsList}>
                {savedDrafts.slice(0, 5).map((draft) => (
                  <div
                    key={draft.id}
                    className={styles.draftItem}
                    onClick={() => handleLoadDraft(draft)}
                  >
                    <span className={styles.draftName}>{draft.name}</span>
                    <button
                      className={styles.iconButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDraft(draft.id, draft.name);
                      }}
                      title="Löschen"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                Noch keine Entwürfe gespeichert.
              </p>
            )}
            
            <button className={styles.newDraftButton} onClick={handleNewDocument}>
              + Neuer Entwurf
            </button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className={styles.mainArea}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.documentName}>{document.name}</span>
            <span className={`${styles.saveStatus} ${isDirty ? styles.dirty : ''}`}>
              {isDirty ? '● Ungespeichert' : '✓ Gespeichert'}
            </span>
          </div>
          <div className={styles.toolbarRight}>
            <button className={styles.secondaryButton} onClick={() => setShowSaveModal(true)}>
              💾 Speichern als...
            </button>
            <button
              className={styles.copyButton}
              onClick={handleCopyHtml}
              disabled={elements.length === 0}
            >
              📋 HTML kopieren
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Editor Pane */}
          <div className={styles.editorPane}>
            <ElementList
              elements={elements}
              selectedElementId={selectedElementId}
              onSelectElement={selectElement}
              onUpdateElement={updateElement}
              onRemoveElement={removeElement}
              onMoveElement={moveElement}
            />
          </div>

          {/* Preview Pane */}
          <Preview document={document} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`${styles.toast} ${styles[showToast.type]}`}>
          {showToast.message}
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSaveModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Entwurf speichern</h3>
            <input
              type="text"
              className={styles.modalInput}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Name des Entwurfs"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveDraft();
                if (e.key === 'Escape') setShowSaveModal(false);
              }}
            />
            <div className={styles.modalButtons}>
              <button className={styles.secondaryButton} onClick={() => setShowSaveModal(false)}>
                Abbrechen
              </button>
              <button className={styles.copyButton} onClick={handleSaveDraft}>
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
