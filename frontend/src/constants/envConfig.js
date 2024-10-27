export const env = process.env.REACT_APP_ENV || 'local';

let backendApi;

switch (env) {
  case 'local':
    backendApi = 'https://chatbot-server-ruddy.vercel.app';
    break;
  default:
    backendApi = 'https://chatbot-server-ruddy.vercel.app';
}

export const baseURL = backendApi;
