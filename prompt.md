
Create a multiplayer game with login and gameplay screens.
The game features a white and dark theme. It features a modern Glass UI design style, and beautiful effects are displayed when switching between screens.
All generation logic is on the server; the interface only displays data and handles user input.
The first screen - LOGIN
On this screen, the user can enter a name.
By default, the name is randomly generated in the format: %Adjective Noun%. For example, "Polite Rhinoceros" The adjective is a 1000-word dictionary followed by a space. The noun is the name of a one-word animal, a 500-word dictionary.
The user can change the name.
Below the name input field is a "Play Now" button.
Clicking the "Play Now" button allows the user to wait for other players or join an already-opened game.
The maximum number of players in the game is 3.
The wait, if required, lasts 20 seconds, during which time a progress bar is displayed. Switching to another screen increases the special effect. If 20 seconds have passed and the number of players is less than 3, the game still begins, but the missing player or two are replaced by robots.
Robot names are randomly generated using the same algorithm as user names.
The second screen is the game screen.
Round
After the transition, a progress bar is displayed for 5 seconds.
During this time, an event is selected from the events array, and a random event is selected from the security_events array.
The interface displays the event (event) and consequences (consequences), and the element to assign to the players is selected from the excuses array using the type field.
Three player cards display the department (org_unit) in random order.
A player can tap on a random player (department) card once per round; when tapped, a method of escaping responsibility (description) is displayed. Once all players (or robots) have made their selection, the points are tallied. The player whose card was tapped more than once receives one point, and Round 2 begins.
The game continues until the score reaches 3. A player who has accumulated 3 points sees a picture and the message "Next time, but not today." The other two players receive messages saying "Today is your day!" and a three-shot fireworks display.
Below the message is a "Play Again" button, which takes you to the first Login screen with a pre-filled username from the previous game.
At the bottom of the screens is a "Technical Support" button. Clicking it displays a QR code linking to an image online (the link is in the configuration file).