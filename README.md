# AI Notes Server

Simple Node.js backend that proxies AI requests for the AI Notes app.

It exists to keep AI logic off the frontend and return generated text responses.

## Tech Stack
- Node.js
- Express

## API

### POST /ai
Accepts a prompt and returns generated text.

**Request**
```json
{
  "prompt": "Your text here"
}
```

**Response**
```json
{
  "output": "Generated text"
}
```

## Running locally
```bash
npm install
node index.js
```

Server runs at:
```
http://localhost:8787
```

## Frontend
Used by:
https://github.com/Msagi1/ai-notes-app
