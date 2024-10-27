export const env = process.env.REACT_APP_ENV || 'local';

let frontendApi;

switch (env) {
  case 'prod':
    frontendApi = 'https://chatbot-en.vercel.app';
    break;
  default:
    frontendApi = 'http://localhost:3000';
}

export const baseURL = frontendApi;
