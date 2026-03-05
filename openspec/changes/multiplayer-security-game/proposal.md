## Why

Create a multiplayer security awareness game where players blame each other for security incidents. The game teaches security concepts through gamification, where players assign blame for security events to other players, making it engaging and educational.

## What Changes

- New multiplayer web application with login and gameplay screens
- Random username generation (Adjective + Animal format, Russian)
- Real-time matchmaking for 3 players with bot support
- Round-based gameplay with security events and blame assignment
- Win/lose screens with fireworks effects (penalty points: 5 points = lose)
- Technical support QR code feature
- Virtual rooms for multiple player groups (auto-create new room for 4th+ player)
- Server-side game state management
- Username input validation

## Capabilities

### New Capabilities

- `login-screen`: Username input with random generation (Russian), Play Now button, waiting room with progress bar (10s timeout), bot fill-in for missing players, input validation
- `game-screen`: Round-based gameplay (immediate start), security event display, player department cards, tap-to-blame mechanic with excuse display, scoring until 5 penalty points, penalty points display for all players
- `game-end`: Winner/loser messages (penalty points: first to 5 loses), fireworks animation, random loser phrase from last_words.json, Play Again with pre-filled username
- `technical-support`: QR code button linking to Telegram URL
- `multiplayer`: Virtual rooms (3 players each), server-side state, socket-based communication, multi-browser support, auto-create new room for 4th+ player

## Impact

- New frontend application (React/Vue recommended)
- Backend for real-time multiplayer (WebSocket)
- Game state management
- Security events data from deepseek_json file
