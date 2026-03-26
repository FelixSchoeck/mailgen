// Basis-Interface für alle Mail-Elemente
export interface BaseElement {
  id: string;
  type: ElementType;
}

export type ElementType =
  | 'header'
  | 'text'
  | 'highlight-box'
  | 'warning-box'
  | 'agenda'
  | 'button'
  | 'divider'
  | 'signature'
  | 'footer';

// Header-Element (dunkelgrüner Banner)
export interface HeaderElement extends BaseElement {
  type: 'header';
  title: string;
  subtitle: string;
}

// Freitext-Paragraph
export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
}

// Grüne Highlight-Box
export interface HighlightBoxElement extends BaseElement {
  type: 'highlight-box';
  title: string;
  content: string;
  hint?: string;
}

// Gelbe Warning-Box
export interface WarningBoxElement extends BaseElement {
  type: 'warning-box';
  title: string;
  content: string;
}

// Tagesordnungspunkt
export interface AgendaItem {
  id: string;
  label: string;
  text: string;
}

// Tagesordnungs-Element
export interface AgendaElement extends BaseElement {
  type: 'agenda';
  title: string;
  items: AgendaItem[];
}

// CTA-Button
export interface ButtonElement extends BaseElement {
  type: 'button';
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  hint?: string;
}

// Trennlinie
export interface DividerElement extends BaseElement {
  type: 'divider';
}

// Signatur/Grußformel
export interface SignatureElement extends BaseElement {
  type: 'signature';
  greeting: string;
  closingText: string;
  names: string;
}

// Footer
export interface FooterElement extends BaseElement {
  type: 'footer';
  organizationName: string;
  organizationType: string;
  additionalInfo?: string;
}

// Union-Type für alle Elemente
export type MailElement =
  | HeaderElement
  | TextElement
  | HighlightBoxElement
  | WarningBoxElement
  | AgendaElement
  | ButtonElement
  | DividerElement
  | SignatureElement
  | FooterElement;

// Mail-Dokument
export interface MailDocument {
  id: string;
  name: string;
  elements: MailElement[];
  createdAt: string;
  updatedAt: string;
}

// Gespeicherte Daten im localStorage
export interface StoredData {
  currentDraft: MailDocument | null;
  savedDrafts: MailDocument[];
}

// Editor-State
export interface EditorState {
  document: MailDocument;
  selectedElementId: string | null;
  isDirty: boolean;
}

// Editor-Actions
export type EditorAction =
  | { type: 'ADD_ELEMENT'; payload: { element: MailElement; index?: number } }
  | { type: 'REMOVE_ELEMENT'; payload: { id: string } }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<MailElement> } }
  | { type: 'MOVE_ELEMENT'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'SELECT_ELEMENT'; payload: { id: string | null } }
  | { type: 'LOAD_DOCUMENT'; payload: { document: MailDocument } }
  | { type: 'NEW_DOCUMENT'; payload: { name?: string } }
  | { type: 'MARK_SAVED' };
