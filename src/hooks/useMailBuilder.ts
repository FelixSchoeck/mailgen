import { useReducer, useCallback, useEffect } from 'react';
import type {
  EditorState,
  EditorAction,
  MailDocument,
  MailElement,
  ElementType,
} from '../types';
import { createDefaultElement, createId } from '../utils/elementDefaults';

// Erstellt ein neues leeres Dokument
const createNewDocument = (name: string = 'Neuer Entwurf'): MailDocument => ({
  id: createId(),
  name,
  elements: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Initial State
const initialState: EditorState = {
  document: createNewDocument(),
  selectedElementId: null,
  isDirty: false,
};

// Reducer für Editor-State
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const { element, index } = action.payload;
      const newElements = [...state.document.elements];
      
      if (index !== undefined && index >= 0 && index <= newElements.length) {
        newElements.splice(index, 0, element);
      } else {
        newElements.push(element);
      }

      return {
        ...state,
        document: {
          ...state.document,
          elements: newElements,
          updatedAt: new Date().toISOString(),
        },
        selectedElementId: element.id,
        isDirty: true,
      };
    }

    case 'REMOVE_ELEMENT': {
      const { id } = action.payload;
      const newElements = state.document.elements.filter((el) => el.id !== id);
      
      return {
        ...state,
        document: {
          ...state.document,
          elements: newElements,
          updatedAt: new Date().toISOString(),
        },
        selectedElementId:
          state.selectedElementId === id ? null : state.selectedElementId,
        isDirty: true,
      };
    }

    case 'UPDATE_ELEMENT': {
      const { id, updates } = action.payload;
      const newElements = state.document.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ) as MailElement[];

      return {
        ...state,
        document: {
          ...state.document,
          elements: newElements,
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }

    case 'MOVE_ELEMENT': {
      const { fromIndex, toIndex } = action.payload;
      const newElements = [...state.document.elements];
      const [removed] = newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, removed);

      return {
        ...state,
        document: {
          ...state.document,
          elements: newElements,
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }

    case 'SELECT_ELEMENT': {
      return {
        ...state,
        selectedElementId: action.payload.id,
      };
    }

    case 'LOAD_DOCUMENT': {
      return {
        ...state,
        document: action.payload.document,
        selectedElementId: null,
        isDirty: false,
      };
    }

    case 'NEW_DOCUMENT': {
      return {
        ...state,
        document: createNewDocument(action.payload.name),
        selectedElementId: null,
        isDirty: false,
      };
    }

    case 'MARK_SAVED': {
      return {
        ...state,
        isDirty: false,
      };
    }

    default:
      return state;
  }
}

// LocalStorage Key
const STORAGE_KEY = 'mailgen-data';

// Lade Daten aus localStorage
const loadFromStorage = (): EditorState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.currentDraft) {
        return {
          document: data.currentDraft,
          selectedElementId: null,
          isDirty: false,
        };
      }
    }
  } catch (e) {
    console.error('Fehler beim Laden aus localStorage:', e);
  }
  return null;
};

// Hook für den Mail-Builder
export function useMailBuilder() {
  const storedState = loadFromStorage();
  const [state, dispatch] = useReducer(
    editorReducer,
    storedState || initialState
  );

  // Autosave bei Änderungen
  useEffect(() => {
    if (state.isDirty) {
      const timeoutId = setTimeout(() => {
        try {
          const existingData = localStorage.getItem(STORAGE_KEY);
          const data = existingData ? JSON.parse(existingData) : { savedDrafts: [] };
          data.currentDraft = state.document;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          dispatch({ type: 'MARK_SAVED' });
        } catch (e) {
          console.error('Fehler beim Speichern:', e);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.document, state.isDirty]);

  // Actions
  const addElement = useCallback((type: ElementType, index?: number) => {
    const element = createDefaultElement(type);
    dispatch({ type: 'ADD_ELEMENT', payload: { element, index } });
  }, []);

  const removeElement = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ELEMENT', payload: { id } });
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<MailElement>) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } });
  }, []);

  const moveElement = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'MOVE_ELEMENT', payload: { fromIndex, toIndex } });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: { id } });
  }, []);

  const loadDocument = useCallback((document: MailDocument) => {
    dispatch({ type: 'LOAD_DOCUMENT', payload: { document } });
  }, []);

  const newDocument = useCallback((name?: string) => {
    dispatch({ type: 'NEW_DOCUMENT', payload: { name } });
  }, []);

  const saveAsDraft = useCallback((name: string) => {
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : { savedDrafts: [] };
      
      const draftToSave: MailDocument = {
        ...state.document,
        id: createId(),
        name,
        updatedAt: new Date().toISOString(),
      };
      
      data.savedDrafts.push(draftToSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      
      return draftToSave;
    } catch (e) {
      console.error('Fehler beim Speichern des Entwurfs:', e);
      return null;
    }
  }, [state.document]);

  const getSavedDrafts = useCallback((): MailDocument[] => {
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      if (existingData) {
        const data = JSON.parse(existingData);
        return data.savedDrafts || [];
      }
    } catch (e) {
      console.error('Fehler beim Laden der Entwürfe:', e);
    }
    return [];
  }, []);

  const deleteDraft = useCallback((id: string) => {
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      if (existingData) {
        const data = JSON.parse(existingData);
        data.savedDrafts = (data.savedDrafts || []).filter(
          (d: MailDocument) => d.id !== id
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error('Fehler beim Löschen des Entwurfs:', e);
    }
  }, []);

  return {
    state,
    document: state.document,
    elements: state.document.elements,
    selectedElementId: state.selectedElementId,
    isDirty: state.isDirty,
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
  };
}
