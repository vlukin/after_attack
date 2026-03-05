## ADDED Requirements

### Requirement: Virtual Rooms
The game SHALL divide players into virtual rooms, where each room contains exactly three players.

#### Scenario: Players join a room
- **WHEN** players connect to the server
- **THEN** they are assigned to a room with other players

### Requirement: Room Composition
Each room SHALL contain three players. If human players fail to connect in time, the missing players are replaced by bots.

#### Scenario: Room filled with bots
- **WHEN** insufficient human players join before matchmaking timeout
- **THEN** the room is filled with bot players to reach three total players

### Requirement: Human Player Identification
Human players SHALL be identified by their user sessions and names selected on the login screen.

#### Scenario: Player identified by session
- **WHEN** a player connects to the server
- **THEN** the player is identified by their socket session and username

### Requirement: Server-Side Game State
The game state SHALL be stored and managed entirely on the server to ensure fairness.

#### Scenario: Game state managed server-side
- **WHEN** gameplay events occur
- **THEN** all game state changes happen on the server

### Requirement: Scoring and Game Logic
The scoring system and game logic SHALL remain unchanged from the current implementation.

#### Scenario: Scoring unchanged
- **WHEN** a round completes
- **THEN** scoring is calculated as implemented (points = number of blames received)

### Requirement: Multi-Browser Testing
If a human player has multiple browsers open, they can simulate a multiplayer game on a single computer using different browser sessions.

#### Scenario: Single-player multiplayer simulation
- **WHEN** a player opens multiple browsers
- **THEN** each browser session is treated as a separate player in the game

### Requirement: Maximum Rooms
The game SHALL support multiple virtual rooms running simultaneously.

#### Scenario: Multiple rooms active
- **WHEN** multiple groups of players connect
- **THEN** each group is placed in a separate virtual room
