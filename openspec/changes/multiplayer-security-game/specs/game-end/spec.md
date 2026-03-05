## ADDED Requirements

### Requirement: Loser message
The player who reaches 3 points SHALL see the message "Next time, but not today" (in Russian: "В следующий раз, но не сегодня").

#### Scenario: Loser sees message
- **WHEN** a player's score reaches 3
- **THEN** that player sees the "Next time, but not today." message

### Requirement: Winner message
The other two players SHALL see the message "Today is your day!" with a three-shot fireworks display.

#### Scenario: Winners see celebration
- **WHEN** a player's score reaches 3
- **THEN** the other two players see "Today is your day!" with fireworks

### Requirement: Winner phrase
The winner SHALL see a randomly selected phrase from the last_words.json file instead of "won the game!".

#### Scenario: Winner phrase displayed
- **WHEN** a player wins the game
- **THEN** a random humorous phrase is displayed for the winner

### Requirement: Fireworks animation
The system SHALL display a three-shot fireworks animation for winners.

#### Scenario: Fireworks display
- **WHEN** winners are determined
- **THEN** a three-shot fireworks animation plays on screen

### Requirement: Play Again button
The system SHALL display a "Play Again" button that returns players to the login screen with the previous username pre-filled.

#### Scenario: User clicks Play Again
- **WHEN** user clicks "Play Again" button
- **THEN** the login screen is displayed with the previous username in the input field
