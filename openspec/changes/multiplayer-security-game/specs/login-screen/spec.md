## ADDED Requirements

### Requirement: Random username generation
The system SHALL generate random usernames in the format "Adjective Noun" where adjective comes from a 1000-word dictionary and noun from a 500-word animal dictionary.

#### Scenario: Generate random username on load
- **WHEN** user opens the login screen
- **THEN** a random username is displayed in the input field

### Requirement: Username editing
The system SHALL allow users to edit their randomly generated username before starting the game.

#### Scenario: User modifies username
- **WHEN** user types in the username input field
- **THEN** the displayed username updates to match user input

### Requirement: Play Now button
The system SHALL display a "Play Now" button that initiates matchmaking when clicked.

#### Scenario: User clicks Play Now
- **WHEN** user clicks "Play Now" button
- **THEN** the system enters matchmaking mode and displays a progress bar

### Requirement: Matchmaking with timeout
The timer starts only when a player presses "Play Now". Each player must click "Play Now" to join the game queue. The system SHALL wait up to 10 seconds for other players to join. If fewer than 3 players join, the game starts with bot players filling empty slots.

#### Scenario: Timer starts on Play Now click
- **WHEN** a player clicks "Play Now" button
- **THEN** the countdown timer starts from 10 seconds only for that player
- **AND** the player's screen shows "Waiting for players..."

#### Scenario: Other players still see Play Now
- **WHEN** player 1 clicks Play Now and is waiting
- **AND** player 2 has not clicked Play Now yet
- **THEN** player 2 still sees the "Play Now" button on their screen

#### Scenario: Player joins existing queue
- **WHEN** player clicks Play Now while timer is running
- **THEN** they join the existing queue and see the current wait time
- **AND** the timer continues for all waiting players

#### Scenario: Game starts with 3 players
- **WHEN** 3 players click Play Now before timer expires
- **THEN** game starts immediately with all 3 players

#### Scenario: Matchmaking timer expires
- **WHEN** 10 seconds elapse during matchmaking
- **THEN** the game starts with available human players and bot players filling remaining slots

### Requirement: Bot player names
The system SHALL generate random usernames for bot players using Russian adjectives and animal nouns.

#### Scenario: Bot player created
- **WHEN** a bot player is needed to fill a slot
- **THEN** a randomly generated Russian username is assigned to the bot

### Requirement: Progress bar display
The system SHALL display a progress bar during matchmaking to show wait time remaining.

#### Scenario: Progress bar shown during wait
- **WHEN** user is waiting for players
- **THEN** a progress bar fills from 0% to 100% over 10 seconds

### Requirement: Username validation
The system SHALL validate usernames before allowing gameplay. Usernames must be between 1 and 100 characters and contain only letters, numbers, spaces, hyphens, and underscores.

#### Scenario: Valid username
- **WHEN** user enters a username between 1 and 100 characters with valid characters
- **THEN** the Play Now button allows starting the game

#### Scenario: Empty username
- **WHEN** user enters an empty username and clicks Play Now
- **THEN** an error message is displayed and gameplay is prevented

#### Scenario: Username too long
- **WHEN** user enters a username longer than 100 characters
- **THEN** an error message is displayed and gameplay is prevented

#### Scenario: Invalid characters
- **WHEN** user enters a username with special characters (SQL injection, XSS attempts)
- **THEN** an error message is displayed and gameplay is prevented

#### Scenario: Server-side validation fallback
- **WHEN** user bypasses client-side validation
- **THEN** server-side validation sanitizes invalid input to "Anonymous"
