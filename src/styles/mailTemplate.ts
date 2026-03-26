// Mail-Template CSS als String für den HTML-Export
export const mailTemplateCss = `
.v1ov-mail-wrapper {
  margin: 0;
  padding: 0;
  background-color: #F5F1E9;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.v1ov-mail-wrapper table {
  border-collapse: collapse;
  width: 100%;
}

.v1ov-mail-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
}

.v1ov-mail-wrapper h1 {
  color: #46962b;
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.v1ov-mail-wrapper h2 {
  color: #333333;
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 2px solid #46962b;
  padding-bottom: 5px;
  display: inline-block;
}

.v1ov-mail-wrapper h3 {
  color: #333333;
  margin-bottom: 10px;
}

.v1ov-mail-wrapper p {
  color: #333333;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.v1ov-mail-wrapper li {
  color: #333333;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.v1ov-highlight-box {
  background-color: #f0f9eb;
  border-left: 5px solid #46962b;
  padding: 15px;
  margin: 20px 0;
}

.v1ov-warning-box {
  background-color: #fffce6;
  border: 1px solid #e3d65b;
  padding: 15px;
  margin-top: 20px;
}

.v1ov-button {
  display: inline-block;
  background-color: #46962b;
  color: #ffffff !important;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
}

.v1ov-button:hover {
  background-color: #367a20;
}

.v1ov-footer {
  background-color: #333333;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  font-size: 12px;
}

.v1ov-footer a {
  color: #ffffff;
  text-decoration: underline;
}

.v1ov-divider {
  border: 0;
  border-top: 1px solid #eeeeee;
  margin: 30px 0;
}

@media only screen and (max-width: 600px) {
  .v1ov-mail-container {
    width: 100% !important;
  }
  .v1ov-mail-content {
    padding: 15px !important;
  }
}
`;

// Farb-Konstanten
export const colors = {
  primary: '#46962b',
  primaryDark: '#367a20',
  headerBg: '#1c302a',
  background: '#F5F1E9',
  white: '#ffffff',
  text: '#333333',
  lightGray: '#eeeeee',
  highlightBg: '#f0f9eb',
  warningBg: '#fffce6',
  warningBorder: '#e3d65b',
  footerBg: '#333333',
  footerText: '#ffffff',
  mutedText: '#666666',
  lightText: '#aaaaaa',
};
