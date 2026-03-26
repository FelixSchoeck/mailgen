import { v4 as uuidv4 } from 'uuid';
import type {
  MailElement,
  HeaderElement,
  TextElement,
  HighlightBoxElement,
  WarningBoxElement,
  AgendaElement,
  ButtonElement,
  DividerElement,
  SignatureElement,
  FooterElement,
  ElementType,
} from '../types';

// Generiert eine eindeutige ID
const generateId = (): string => {
  // Fallback wenn uuid nicht verfügbar
  if (typeof uuidv4 === 'function') {
    return uuidv4();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createId = generateId;

// Default-Werte für neue Elemente
export const createDefaultElement = (type: ElementType): MailElement => {
  const id = generateId();

  switch (type) {
    case 'header':
      return {
        id,
        type: 'header',
        title: 'Einladung zur OV-Sitzung',
        subtitle: 'OV Musterstadt',
      } as HeaderElement;

    case 'text':
      return {
        id,
        type: 'text',
        content: 'Liebe Grüne,\n\nwir laden euch herzlich zu unserer nächsten Sitzung ein.',
      } as TextElement;

    case 'highlight-box':
      return {
        id,
        type: 'highlight-box',
        title: '📅 Wann & Wo',
        content: '**Wann:** Montag, 15. April 2024 um 19:00 Uhr\n**Wo:** Gemeindehaus, Musterstraße 1',
        hint: 'Getränke sind vorhanden.',
      } as HighlightBoxElement;

    case 'warning-box':
      return {
        id,
        type: 'warning-box',
        title: '⏱️ Hinweis zur Redezeit',
        content: 'Um allen genügend Raum für Austausch zu geben:\n• 3 Minuten für Redebeiträge\n• 1 Minute pro Diskussionsbeitrag',
      } as WarningBoxElement;

    case 'agenda':
      return {
        id,
        type: 'agenda',
        title: '📋 Tagesordnung (TO)',
        items: [
          { id: generateId(), label: 'TOP 1', text: 'Begrüßung und Protokoll' },
          { id: generateId(), label: 'TOP 2', text: 'Berichte' },
          { id: generateId(), label: 'TOP 3', text: 'Anträge' },
          { id: generateId(), label: 'TOP 4', text: 'Verschiedenes' },
        ],
      } as AgendaElement;

    case 'button':
      return {
        id,
        type: 'button',
        title: 'Der digitale OV-Kalender',
        description: 'Damit ihr keinen Termin mehr verpasst, abonniert unseren Kalender!',
        buttonText: 'Zum Kalender',
        buttonUrl: 'https://example.com/kalender',
        hint: 'Bei technischen Problemen meldet euch gerne.',
      } as ButtonElement;

    case 'divider':
      return {
        id,
        type: 'divider',
      } as DividerElement;

    case 'signature':
      return {
        id,
        type: 'signature',
        greeting: 'Herzliche Grüße 🌻',
        closingText: 'euer Sprecher*innenteam',
        names: 'Max Mustermann & Erika Musterfrau',
      } as SignatureElement;

    case 'footer':
      return {
        id,
        type: 'footer',
        organizationName: 'OV Musterstadt',
        organizationType: 'BÜNDNIS 90/DIE GRÜNEN',
        additionalInfo: '',
      } as FooterElement;

    default:
      throw new Error(`Unknown element type: ${type}`);
  }
};

// Element-Metadaten für die Toolbar
export interface ElementMeta {
  type: ElementType;
  label: string;
  icon: string;
  description: string;
}

export const elementMetas: ElementMeta[] = [
  { type: 'header', label: 'Header', icon: '🏷️', description: 'Dunkelgrüner Titel-Banner' },
  { type: 'text', label: 'Text', icon: '📝', description: 'Freitext-Absatz' },
  { type: 'highlight-box', label: 'Highlight-Box', icon: '💚', description: 'Grüne Info-Box' },
  { type: 'warning-box', label: 'Hinweis-Box', icon: '⚠️', description: 'Gelbe Hinweis-Box' },
  { type: 'agenda', label: 'Tagesordnung', icon: '📋', description: 'Liste mit TOPs' },
  { type: 'button', label: 'Button', icon: '🔘', description: 'Call-to-Action Button' },
  { type: 'divider', label: 'Trennlinie', icon: '➖', description: 'Horizontale Linie' },
  { type: 'signature', label: 'Signatur', icon: '✍️', description: 'Grußformel' },
  { type: 'footer', label: 'Footer', icon: '📌', description: 'Fußzeile mit OV-Info' },
];
