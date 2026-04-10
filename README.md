# TailBlazer

## What is this?

A website that lets you report your lost pets.

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file based on `.env.example`
4. Fill in your API keys:
   - `VITE_JSONBIN_KEY` — from jsonbin.io
   - `VITE_BIN_ID` — your bin ID from jsonbin.io
   - `VITE_IMAGEBB_KEY` — from imgbb.com
5. Run `npm run dev`

## Known Bugs / Limitations

Passwords are not hashed. Stored as plain strings in binjson

## AI Disclosure

- I used claude for this assignment. I asked it to be like a TA, so it did not give me the straight solutions. It kept giving me hints for the questions I had.
- I used Gemini to help with the styling with bootstrap
- Helped with writing correct api request for jsonbin and imgBB aswell as the reverse geocoding. Helped me navigate the API docs aswell
- Helped understand the structure of the website, how to modularize using services, components and etc.
- Helped with the logic of services, filling in the knowledge gaps I had
