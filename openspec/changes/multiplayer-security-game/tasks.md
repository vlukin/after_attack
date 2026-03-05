## 1. Project Setup

- [x] 1.1 Initialize React project with TypeScript
- [x] 1.2 Install dependencies (socket.io-client, qrcode.react)
- [x] 1.3 Set up project structure (components, hooks, services, types)
- [x] 1.4 Configure CSS custom properties for theming

## 2. Backend Server

- [x] 2.1 Set up Node.js server with Express
- [x] 2.2 Configure Socket.io for real-time communication
- [x] 2.3 Implement game state management
- [x] 2.4 Create matchmaking logic with 10-second timeout
- [x] 2.5 Implement bot player generation (Russian names)
- [x] 2.6 Create round management (event selection, scoring)

## 3. Login Screen

- [x] 3.1 Create username input component with random generation
- [x] 3.2 Implement adjective and noun dictionaries
- [x] 3.3 Build Play Now button with matchmaking
- [x] 3.4 Add progress bar for waiting
- [x] 3.5 Integrate Technical Support button

## 4. Game Screen

- [x] 4.1 Round starts immediately (no countdown)
- [x] 4.2 Build event display component
- [x] 4.3 Implement player department cards
- [x] 4.4 Add tap-to-blame interaction (immediate, no confirm button)
- [x] 4.5 Create excuse display on selected card
- [x] 4.6 Implement scoring (points = number of blames received)
- [x] 4.7 Add round continuation flow (minimum 5 seconds between rounds)
- [x] 4.8 Penalty points display for all players including bots
- [x] 4.9 Game ends at 5 points (not 3)
- [x] 4.10 Player cannot select their own card

## 5. Game End Screen

- [x] 5.1 Create winner/loser message display
- [x] 5.2 Implement fireworks animation
- [x] 5.3 Winner displays random phrase from last_words.json
- [x] 5.4 Build Play Again button with username persistence
- [x] 5.5 Integrate Technical Support button

## 6. UI/UX Polish

- [x] 6.1 Implement glass-morphism styling
- [x] 6.2 Add white/dark theme toggle
- [x] 6.3 Create screen transition animations
- [x] 6.4 Add loading states and error handling

## 7. Configuration

- [x] 7.1 Add QR code URL to Technical Support (Telegram link)
- [x] 7.2 Load security events from JSON file
- [x] 7.3 Create excuses data structure with type mapping
- [x] 7.4 Add last_words.json for winner phrases

## 8. Multiplayer Mode

- [x] 8.1 Implement virtual rooms with 3 players each
- [x] 8.2 Handle player connections and disconnections
- [x] 8.3 Support multiple rooms running simultaneously
- [x] 8.4 Server-side game state management
- [x] 8.5 Handle multiple browser sessions from same user
- [x] 8.6 Add username validation and sanitization

## 9. Testing

- [x] 9.1 Write end-to-end tests for full gameplay
- [x] 9.2 Test matchmaking with simulated players
- [x] 9.3 Test gameplay with bot players
- [x] 9.4 Test multi-browser single-player simulation

## 10. Bug Fixes & Updates

- [x] 10.1 Fix end screen winner/loser logic (penalty points: 5 points = lose)
- [x] 10.2 Implement multi-room support (4th+ players create new rooms)
- [x] 10.3 Add roomId to Player interface
- [x] 10.4 Fix TypeScript errors in GameManager (remove duplicate code)
- [x] 10.5 Update loser message to show winner phrase
