import type {
  MailElement,
  MailDocument,
  HeaderElement,
  TextElement,
  HighlightBoxElement,
  WarningBoxElement,
  AgendaElement,
  ButtonElement,
  SignatureElement,
  FooterElement,
} from '../types';
import { mailTemplateCss, colors } from '../styles/mailTemplate';

// Konvertiert einfache Markdown-Syntax zu HTML
function simpleMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

// Generiert HTML für ein einzelnes Element
function generateElementHtml(element: MailElement): string {
  switch (element.type) {
    case 'header': {
      const el = element as HeaderElement;
      return `
        <tr>
          <td style="background-color: ${colors.headerBg}; padding: 20px; text-align: center; color: ${colors.footerText}; font-size: 18px; font-weight: bold;">
            ${el.title}<br />
            <span style="font-weight: normal; font-size: 14px;">${el.subtitle}</span>
          </td>
        </tr>`;
    }

    case 'text': {
      const el = element as TextElement;
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 30px 30px 0 30px;">
            <p>${simpleMarkdown(el.content)}</p>
          </td>
        </tr>`;
    }

    case 'highlight-box': {
      const el = element as HighlightBoxElement;
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 0 30px;">
            <div class="v1ov-highlight-box" style="background-color: ${colors.highlightBg}; border-left: 5px solid ${colors.primary}; padding: 15px; margin: 20px 0;">
              <h2 style="margin-top: 0; border: none; color: ${colors.primary}; font-size: 18px;">${el.title}</h2>
              <p style="margin-bottom: ${el.hint ? '10px' : '0'};">${simpleMarkdown(el.content)}</p>
              ${el.hint ? `<p style="margin-bottom: 0; font-size: 15px;">🥤 <em><strong>Hinweis:</strong> ${el.hint}</em></p>` : ''}
            </div>
          </td>
        </tr>`;
    }

    case 'warning-box': {
      const el = element as WarningBoxElement;
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 0 30px;">
            <div class="v1ov-warning-box" style="background-color: ${colors.warningBg}; border: 1px solid ${colors.warningBorder}; padding: 15px; margin-top: 20px;">
              <strong>${el.title}</strong><br />
              ${simpleMarkdown(el.content)}
            </div>
          </td>
        </tr>`;
    }

    case 'agenda': {
      const el = element as AgendaElement;
      const itemsHtml = el.items
        .map(
          (item, index) => `
          <li style="border-bottom: ${index < el.items.length - 1 ? '1px solid #eeeeee' : 'none'}; padding-bottom: 8px; padding-top: ${index > 0 ? '4px' : '0'};">
            <strong>${item.label}:</strong> ${item.text}
          </li>`
        )
        .join('');

      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 0 30px;">
            <h2 style="color: #333333; font-size: 18px; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px; display: inline-block;">${el.title}</h2>
            <ul style="list-style-type: none; padding-left: 0; margin-top: 10px;">
              ${itemsHtml}
            </ul>
          </td>
        </tr>`;
    }

    case 'button': {
      const el = element as ButtonElement;
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 0 30px;">
            <hr class="v1ov-divider" style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;" />
            <div style="text-align: center;">
              <h3 style="color: #333; margin-bottom: 10px;">${el.title}</h3>
              <p style="font-size: 15px;">${el.description}</p>
              <a class="v1ov-button" href="${el.buttonUrl}" style="display: inline-block; background-color: ${colors.primary}; color: ${colors.footerText} !important; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">${el.buttonText} →</a>
              ${el.hint ? `<p style="font-size: 13px; color: #666; margin-top: 15px;">${el.hint}</p>` : ''}
            </div>
            <hr class="v1ov-divider" style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;" />
          </td>
        </tr>`;
    }

    case 'divider':
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 0 30px;">
            <hr class="v1ov-divider" style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;" />
          </td>
        </tr>`;

    case 'signature': {
      const el = element as SignatureElement;
      return `
        <tr>
          <td class="v1ov-mail-content" style="padding: 20px 30px 30px 30px;">
            <p>${el.greeting}</p>
            <p>${el.closingText}<br />${el.names}</p>
          </td>
        </tr>`;
    }

    case 'footer': {
      const el = element as FooterElement;
      return `
        <tr>
          <td class="v1ov-footer" style="background-color: ${colors.footerBg}; color: ${colors.footerText}; padding: 20px; text-align: center; font-size: 12px;">
            ${el.organizationName}<br />
            ${el.organizationType}<br />
            ${el.additionalInfo ? `<span style="font-size: 10px; color: #aaaaaa;">${el.additionalInfo}</span>` : ''}
          </td>
        </tr>`;
    }

    default:
      return '';
  }
}

// Generiert das komplette Mail-HTML
export function generateMailHtml(document: MailDocument): string {
  const elementsHtml = document.elements.map(generateElementHtml).join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.name}</title>
  <style type="text/css">
${mailTemplateCss}
  </style>
</head>
<body>
  <div style="font-size: 12pt; font-family: Arial,Helvetica,sans-serif;">
    <div class="v1ov-mail-wrapper" style="margin: 0; padding: 0; background-color: ${colors.background}; font-family: Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: 100%;">
        <tbody>
          <tr>
            <td style="padding: 20px 0;" align="center">
              <table class="v1ov-mail-container" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: ${colors.white};">
                <tbody>
                  ${elementsHtml}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
}

// Generiert HTML nur für den Inhalt (für die Vorschau)
export function generatePreviewHtml(document: MailDocument): string {
  return generateMailHtml(document);
}

// Kopiert HTML in die Zwischenablage
export async function copyHtmlToClipboard(html: string): Promise<boolean> {
  try {
    // Versuche die moderne Clipboard API
    if (navigator.clipboard && navigator.clipboard.write) {
      const blob = new Blob([html], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([html], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([clipboardItem]);
      return true;
    }

    // Fallback: Nur Text kopieren
    await navigator.clipboard.writeText(html);
    return true;
  } catch (error) {
    console.error('Fehler beim Kopieren:', error);
    
    // Letzter Fallback: execCommand
    try {
      const textarea = document.createElement('textarea');
      textarea.value = html;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}
