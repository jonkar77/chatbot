export const env = process.env.REACT_APP_ENV || 'local';

let backendApi;

switch (env) {
  case 'prod':
    backendApi = 'https://chatbot-server-ruddy.vercel.app';
    break;
  default:
    backendApi = 'http://localhost:5000';
}

export const baseURL = backendApi;
