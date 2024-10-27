const baseURL = process.env.NODE_ENV === "local" 
  ? "http://localhost:3000" 
  : "https://chatbot-en.vercel.app";

module.exports = { baseURL };