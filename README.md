# VERBOSE - A chat app

## Purpose:

To build a mobile chat app in React Native, optimized for both iOS and Android devices

## URL Address:

https://github.com/rosswyman/chat-app

## Dependencies:

- Built off of React Native, Gifted Chat, Firebase, and Expo
- Refer to package.json for full details

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## To Use This App

1. Create a new database using Google's Firebase https://firebase.google.com/. Reference https://firebase.google.com/docs for help setting up the database.
2. In terminal, navigate to desired location to clone repositiry.
3. Clone the repository `git clone https://github.com/rosswyman/chat-app.git`
4. Run `npm install` to install dependencies.
5. Return to your Firebase project and access project settings by clicking the gear icon next the "Project Overview". You will need to copy the `const firebaseConfig = { ... }` unique to your database and use it to replace the config found in Chat.js. You can search for "// Configuration for Google Firebase Database" to find the appropriate section.
6. Once you have saved the changes, run `expo start` from the project root directory.
7. Download the Expo Go app onto your mobile device.
8. Use your camera to scan the QR code shwon from the previous `expo start` command to launch the app.
