# Oubliette - Dungeon Browser Game

Year 1 group project for CSC1030 Web Technologies at Queen's University Belfast. Oubliette is a small browser dungeon game built with HTML, CSS, vanilla JavaScript, jQuery, canvas, local media assets, and sound effects.

The project is intentionally simple: no build step, no framework, and no backend. It is a useful snapshot of early frontend work, game state management, canvas drawing, DOM interaction, and group-project integration.

## At a glance

| Area | Details |
| --- | --- |
| Project type | Browser game coursework |
| Stack | HTML, CSS, JavaScript, jQuery |
| Entry point | `index.html` |
| Build step | None |
| Tests | None |
| Main contribution | Maze engine, maze styling, timer/lives/game-flow code |

## Gameplay

The player creates a character, chooses a maze difficulty, and moves through a dungeon before the timer expires. Along the way, the game presents room-specific challenges. Failing challenges can reduce lives; reaching the maze exit wins the game.

Implemented pieces include:

- Start, customisation, avatar, and accessibility screens
- Keyboard and button movement
- Difficulty-based maze generation
- Timer and torch-strength countdown
- Lives display
- Prologue sequence
- Riddle, pressure plate, spider, and button-style challenges
- Local music and sound effects
- English and Spanish UI text toggle

## Running locally

The simplest option is to open `index.html` in a modern browser.

For more consistent media loading, serve the folder with a small static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Repository structure

```text
index.html                Main page and screen layout
CSS/                      Main styling, larger text modes, tooltips, maze styling
Javascript/main.js        Canvas maze generation and movement
Javascript/ruari.js       Timer, menu flow, language toggle, difficulty setup
Javascript/mazeScript-RC.js
                          Pressure-plate maze challenge logic
Javascript/*.js           Other group challenge scripts
images/                   Sprites, challenge art, hearts, torch assets
sfx/                      Music and sound effects
video/                    Candle video used on the start screen
```

## Controls

- Arrow keys move the player in the main maze.
- On-screen buttons provide the same movement controls.
- Challenge screens use their own buttons or text inputs.

## Notes

- This was a group project, so scripts are split by contributor and style varies.
- Some media paths in the HTML use Windows-style separators, which browsers usually tolerate but may behave differently across environments.
- There is no automated test suite; verification is manual by loading the game and playing through the rooms.
- Image credits present in the repo list group-created art assets for the torch, hearts, and challenge images.
