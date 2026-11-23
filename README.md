# Rephrase

Rephrase helps people shape a message around the feeling they want to express. It keeps the original meaning and facts, then rewrites the draft in a selected tone.

## Features

- Expo app for iOS, Android, and web
- Seven tones: heartfelt, warm, encouraging, confident, apologetic, professional, and direct
- Node.js API keeps the OpenAI key off the client
- Drafts are not stored by this API
- Input limits, CORS allow-list, and basic per-process rate limiting

## Run locally

Install Node.js 20 or newer, then run:

```sh
npm install
cp .env.example .env
```

Set your API key in the terminal. Do not put it in an EXPO_PUBLIC_ variable or commit it to GitHub:

```sh
export OPENAI_API_KEY="your-api-key"
```

Start the API in one terminal and Expo in another:

```sh
npm run server
```

```sh
npm start
```

Open the Expo Go QR code on your iPhone. For a physical phone, set EXPO_PUBLIC_API_URL in .env to your Mac's local network address, such as http://192.168.1.25:3000. Keep the phone and Mac on the same Wi-Fi network.

## Deploy the API

Deploy server/index.mjs as a Node.js web service with npm run server as its start command. Configure these variables in the host's private environment settings:

| Variable | Purpose |
| --- | --- |
| OPENAI_API_KEY | Secret API key used by the server |
| OPENAI_MODEL | Optional model override; defaults to gpt-4o-mini |
| ALLOWED_ORIGINS | Comma-separated browser origins allowed to call the API |
| PORT | Usually assigned by the host |

The host needs outbound HTTPS access to api.openai.com. After deployment, check /health and set EXPO_PUBLIC_API_URL to the API's HTTPS base URL when building the app. Hosting and OpenAI usage can have separate charges.

## Privacy

The app sends the message and selected tone to the API, which forwards them to OpenAI and does not store drafts in a database. Avoid entering passwords, payment details, or other sensitive information. Review the hosting provider's and OpenAI's current data policies before using private messages.
