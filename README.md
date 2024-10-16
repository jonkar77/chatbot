# Chatbot Interface with LLM Response Formatting and Memory Store

## Project Title
Chatbot Interface with LLM Response and Memory Store

## Project Description
This project involves the development of a simple chatbot interface that integrates with a Large Language Model (LLM) API. The chatbot accepts user queries, sends them to a simulated API, formats the response, and allows users to save the results. An admin panel is implemented to display a list of all users and their saved chatbot responses.

### Key Features:
- User-friendly interface to enter query and receive reqsponse.
- Parsing and displaying JSON responses from the API.
- Saving chatbot responses to a memory store (using Redux) and MongoDB.
- Admin panel to view users and their saved responses.

## Installation Instructions

### Prerequisites:
- Node.js
- MongoDB

### Steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/jonkar77/chatbot.git
    cd chatbot
    ```

2. **Backend Setup**:
    - Install dependencies:
      ```bash
      cd backend
      npm install
      ```
      
    - Start MongoDB server:
      Ensure MongoDB is installed and running on your local machine.
    - Start the backend server:
      ```bash
      node index.js
      ```
    The backend server will run on `http://localhost:5000`.

3. **Frontend Setup**:
    - Install dependencies:
      ```bash
      cd ../frontend
      npm install
      ```
    - Start the frontend development server:
      ```bash
      npm start
      ```
    The frontend server will run on `http://localhost:3000`.

## Deployment Instructions

## Components Overview
- **Navbar**: Contains links to different pages and a logout button.
- **ChatWindow**: Displays chat messages and responses from the API.
- **ChatInput**: Allows users to type and send new messages.
- **AdminPanel**: Displays a list of all users and their responses.
- **UserResponses**: Fetches and displays responses for a specific user.

## API Overview

### Fetch User Responses
- **Endpoint**: `/api/saved_response`
- **Method**: `GET`
- **Parameters**: `user` (query parameter)

### Example Response
```json
[
  {
    "summary": "This is a summary.",
    "result_text": "Detailed result text here.",
    "result_table_path": "https://example.com/table",
    "result_visualization_path": "https://example.com/visualization",
    "createdAt": "2021-05-14T12:00:00.000Z",
    "updatedAt": "2021-05-14T12:00:00.000Z"
  }
]
