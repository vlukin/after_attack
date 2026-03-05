## ADDED Requirements

### Requirement: Round preparation phase
The system SHALL start rounds immediately without countdown.

#### Scenario: Round starts immediately
- **WHEN** a new round begins
- **THEN** the round starts immediately without any countdown delay

### Requirement: Security event selection
The system SHALL randomly select one event from the security_events array and one event from the excuses array (filtered by type) on the server side.

#### Scenario: Event selected for round
- **WHEN** the round preparation phase completes
- **THEN** a random security event and corresponding excuse are selected server-side

### Requirement: Event display
The system SHALL display the selected event (event text) and its consequences to all players.

#### Scenario: Event shown to players
- **WHEN** event selection completes
- **THEN** the event description and consequences are displayed on screen

### Requirement: Player department cards
The system SHALL display three player cards showing each player's department (org_unit) in random order.

#### Scenario: Player cards displayed
- **WHEN** event is displayed
- **THEN** three cards showing department names appear in random order

### Requirement: Blame assignment with immediate selection
Each player SHALL select one other player's department card by tapping. The selection is locked immediately after tapping - no confirmation button required. Each player can only see their own selection, not other players' selections until all have voted.

#### Scenario: Player selects a card
- **WHEN** player clicks on another player's department card
- **THEN** the card shows a selected indicator and the excuse for that player is displayed on the card
- **AND** other players cannot see this selection until all players have selected

#### Scenario: Selection locked after tap
- **WHEN** player taps a card
- **THEN** the excuse description is shown on the selected card and further selections are disabled for that player

#### Scenario: Other players' selections hidden
- **WHEN** player 1 selects a card
- **AND** player 2 is still selecting
- **THEN** player 1 cannot see player 2's selection
- **AND** player 2 cannot see player 1's selection

#### Scenario: All selections revealed after everyone votes
- **WHEN** all players have made their selections
- **THEN** all selections are revealed to all players
- **AND** scoring is calculated based on all selections

### Requirement: Round scoring
After all players (humans and bots) have made their selections, the system SHALL award points equal to the number of blames each player received from human players only.

#### Scenario: Scoring calculated
- **WHEN** all players have selected their blame target
- **THEN** each player receives points equal to the number of blames they received from human players

#### Scenario: Bot selection
- **WHEN** a round starts
- **THEN** bot players automatically select a random target after a short delay
- **AND** bots can select any player including themselves

### Requirement: Game continuation
The game SHALL continue to the next round until a player reaches 5 points. The next round starts at least 5 seconds after all players have clicked.

#### Scenario: Game continues
- **WHEN** no player has reached 5 points
- **THEN** the next round begins

### Requirement: Game end trigger
The game SHALL end when any player reaches 5 points.

#### Scenario: Player reaches 5 points
- **WHEN** a player's score reaches 5
- **THEN** the game ends and displays results

### Requirement: Player cannot select themselves
Human players SHALL NOT be able to select their own card. Only other players (human or bot) can be selected.

#### Scenario: Player sees their own card disabled
- **WHEN** game screen is displayed
- **THEN** the human player's own card is visually disabled and cannot be selected
