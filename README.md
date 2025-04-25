# Magical AI Agent

## Overview

This is an AI Agent that can do form filling. An automated AI agent that can fill out medical forms. It uses Express.js for the backend API and Playwright for browser automation. The agent can be invoked directly or scheduled to run periodically.


## Features
- AI Agent to fill out forms having 3 separate section
- - Personal Information
- - Medication Information
- - Emergency Contact
- Action tools for each form section along with a submitForm action
- Schema validation on AI Agent side
- An endpoint to invoke the AI Agent
- An endpoint to schedule the AI Agent to run at every 5 minutes
- Schema validation on POST endpoints
- Control delay(ms) between playwright steps globally from consts.ts

## Technologies used

- Vercel AI SDK: To create an AI Agent
- Anthropic: To use Claude mdoel for the AI Agent
- Playwright: For browser automation
- Express: To create backend API endpoints
- Node-cron: To schedule a cron job
- Cors: To control cross-origin resource sharing
- Zod: For schema validation

## Getting Started

```
npm install
```

```
npx playwright install
```

Note: Make sure to put your `ANTHROPIC_API_KEY` in .env file

```
npm run dev
```

## Future Scope

- Unit tests
- Containerization
- Rate limiting on API
- More robust error handling