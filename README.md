# Chess Animations

A WebGL-based 3D chess visualization that features textured pieces, realistic lighting, and dynamic animations built using JavaScript and GLSL shaders.

---

## Features

- Fully rendered 3D chessboard and pieces with texture mapping
- Realistic lighting and shading using vertex and fragment shaders
- Smooth animations and transformations of chess pieces
- Multiple materials including marble, wood, and granite
- Modular JavaScript structure for maintainability

---

## Technologies Used

- **WebGL** for 3D graphics rendering
- **JavaScript** for logic and interaction
- **GLSL** for shader programming
- **OBJ** model loading for custom chess piece meshes

---

## Project Structure

```
Chess-Animations/
├── index.html                  # Entry point for the web page
├── main.js                     # Main rendering loop and logic
├── shader.js                   # Shader utility for loading and compiling
├── chessSet.js                 # Piece management and transformation logic
├── granite.js, helpers.js      # Texture and material support
├── *.vs, *.fs                  # GLSL vertex and fragment shaders
├── pieces/                     # Chess piece models and textures
│   ├── PiezasAjedrez.obj
│   ├── PiezasAjedrezDiffuse*.png
│   └── Tablero*.png
```

---

## How to Use

1. Clone the repository:

```bash
git clone https://github.com/your-username/chess-animations.git
cd chess-animations
```

2. Open `index.html` in a WebGL-compatible browser (Chrome, Firefox).

No server required — this project runs entirely in the browser.
