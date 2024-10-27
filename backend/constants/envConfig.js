const baseURL = process.env.NODE_ENV === "prod" 
  ? "https://chatbot-en.vercel.app" 
  : "http://localhost:3000";

module.exports = { baseURL };