export const env = process.env.REACT_APP_ENV || 'local';

let backendApi;

switch (env) {
  case 'local':
    backendApi = 'http://localhost:5000';
    break;
  default:
    backendApi = 'https://chatbot-server-ruddy.vercel.app';
}

export const baseURL = backendApi;
