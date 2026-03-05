## Context

A multiplayer security awareness game where 3 players compete by assigning blame for security incidents. The game has a glass-morphism UI with white/dark theme and smooth screen transitions. Game text is primarily in Russian.

**Penalty Points Rule**: First player to reach 5 penalty points LOSES. Others WIN.

## Goals / Non-Goals

**Goals:**
- Create a real-time multiplayer web game
- Implement matchmaking with bot support for 2-3 players (Russian bot names)
- Build round-based gameplay with security events
- Display win/lose screens with fireworks effects (penalty points: 5 = lose)
- Show random loser phrases from last_words.json
- Support multiple virtual rooms simultaneously (4th+ player creates new room)
- Server-side game state management

**Non-Goals:**
- Persistent user accounts (only session-based)
- Mobile app (web-only)
- Voice chat or video
- English localization (Russian only)

## Decisions

- **Frontend**: React with TypeScript for type safety
- **Styling**: CSS Modules with glass-morphism effects
- **Backend**: Node.js with Express + Socket.io for real-time
- **State**: Server-side game state for fairness
- **Theme**: CSS custom properties for white/dark toggle
- **Rooms**: Virtual rooms with 3 players each (or 2 humans + 1 bot, or 1 human + 2 bots)
- **Multi-browser**: Each browser session treated as separate player

## Multiplayer Architecture

### Virtual Rooms
- Each room contains exactly 3 players
- Players join rooms through matchmaking
- Missing players are filled with bots after 10-second timeout

### Server-Side Game State
- All game logic runs on server
- Prevents cheating and ensures fairness
- State includes: players, scores, current event, blame target

### Player Identification
- Human players identified by socket session
- Username from login screen
- Input validation prevents injection attacks

## Risks / Trade-offs

- **Risk**: Bot behavior may feel unnatural → **Mitigation**: Add randomization to bot decisions
- **Risk**: Race conditions in blame assignment → **Mitigation**: Server-side turn validation
- **Risk**: Player disconnection → **Mitigation**: Auto-forfeit after 30s timeout
- **Risk**: Multi-browser exploitation → **Mitigation**: Accept as feature (testing use case)

## Open Questions

- Should there be a leaderboard? (deferred to v2)
- Audio effects for events? (optional enhancement)
- Maximum number of concurrent rooms? (depends on server capacity)
