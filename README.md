# SolarGesture — Hand-Controlled Solar System Explorer

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks--Vision-teal.svg)](https://developers.google.com/mediapipe)
[![Vite](https://img.shields.io/badge/Vite-Bundler-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-38bdf8.svg)](https://tailwindcss.com/)

**SolarGesture** is an interactive, futuristic 3D Solar System web application that users can navigate using **real-time hand gestures** captured through their webcam, powered by **MediaPipe Tasks Vision** and **Three.js / React Three Fiber**.

---

## 🌟 Key Features

1. **Animated 3D Solar System**:
   - The blazing Sun with solar flare corona aura and omnidirectional dynamic light.
   - All 8 major planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).
   - Earth’s orbiting Moon.
   - Saturn's and Uranus' tilted ring systems with double-sided rendering.
   - Instanced 700-asteroid belt between Mars and Jupiter running at 60 FPS.
   - Toggleable orbital paths and planetary name billboards.

2. **Real-Time Webcam Hand Tracking**:
   - Computer vision powered by Google's `@mediapipe/tasks-vision` HandLandmarker.
   - Detects 21 3D hand landmarks at 30–60 FPS completely in the browser.
   - **Exponential Moving Average (EMA)** smoothing filter eliminates hand jitter.
   - Action debouncing & hysteresis prevent false-positive trigger spam.
   - Picture-in-picture (PIP) webcam feed with real-time skeleton overlay, status badges, and FPS counter.

3. **Intuitive Gesture Controls**:
   - 🖐️ **Open Palm**: Pause or resume planetary orbital motion.
   - 👌 **Pinch (Thumb + Index)**: Select/lock onto celestial targets.
   - ☝️ **Pointing Finger**: Rotate and navigate the 3D cosmic view.
   - ✊ **Closed Fist**: Drag-rotate the celestial sphere or brake motion.
   - ✌️ **Peace Sign (V)**: Instant reset to Solar System overview.
   - 👍 / 👎 **Thumbs Up / Down**: Zoom camera in and out.

4. **Seamless Mouse & Keyboard Fallback**:
   - When webcam access is denied or disabled, full navigation is supported via standard Three.js OrbitControls, mouse clicks, and keyboard shortcuts (`Space`, `R`, `Esc`, `1-9`, `M`, `H`, `G`).

5. **Deep Planetary Telemetry & Glassmorphism UI**:
   - Sliding glassmorphism info panel displaying diameter, mass, gravity, orbital period, day length, temperature, atmospheres, and curated astronomical fun facts.
   - Scientific distinction between visual scale and real astronomical scale.
   - Built-in zero-latency Web Audio API sound synthesizer for futuristic audio feedback.

---

## 🚀 How to Run in Visual Studio Code (VS Code)

Follow these quick steps to open and run the project inside **VS Code**:

### Step 1: Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the folder: `c:\Users\jeeva\solarsystem`.

### Step 2: Open the Built-in Terminal
1. In the top menu of VS Code, click **Terminal** > **New Terminal** (or press `` Ctrl + ` ``).
2. Ensure you are in the project root directory (`solarsystem`).

### Step 3: Install Dependencies
If dependencies are not already installed, run:
```bash
npm install
```

### Step 4: Start the Development Server
Run the Vite development server:
```bash
npm run dev
```

You will see output similar to:
```text
  VITE v8.3.5  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open in Your Web Browser
1. Hold `Ctrl` and click the `http://localhost:5173/` link in the terminal (or open Google Chrome / Edge and navigate to `http://localhost:5173`).
2. When prompted by the browser, click **"Allow"** to grant webcam permissions for hand gesture control.
   *(If you don't have a webcam or deny access, the app will smoothly switch to Mouse & Keyboard mode!)*

---

## 🕹️ Controls Reference

### 🖐️ Hand Gestures (Webcam)
| Gesture | Visual | Action |
| :--- | :---: | :--- |
| **Open Palm** | 🖐️ | Pause / Resume planetary orbits |
| **Pinch** | 👌 | Select hovered planet / focus target |
| **Pointing** | ☝️ | Rotate and pan 3D perspective |
| **Closed Fist** | ✊ | Drag orbit / brake scene |
| **Peace Sign (V)** | ✌️ | Reset camera to full overview |
| **Thumbs Up** | 👍 | Zoom in closer |
| **Thumbs Down** | 👎 | Zoom out into deep space |

### ⌨️ Mouse & Keyboard Fallbacks
| Input | Action |
| :--- | :--- |
| **Left Click + Drag** | Orbit / rotate camera |
| **Right Click + Drag** | Pan camera |
| **Scroll Wheel** | Zoom in / out |
| **Click Planet** | Focus on planet and open telemetry panel |
| **Spacebar** | Pause / Resume orbits |
| **R** | Reset view to solar overview |
| **Esc** | Close info panel / deselect |
| **Keys 1 to 9** | Jump directly to Sun (1) through Neptune (9) |
| **H** | Toggle webcam hand tracking on/off |
| **M** | Mute / Unmute audio sound effects |
| **G** | Open Gesture & Controls Guide |

---

## 📁 Architecture & Folder Structure

```text
solarsystem/
├── public/
│   ├── models/
│   │   └── hand_landmarker.task   # Offline Google MediaPipe vision model
│   └── wasm/                      # MediaPipe WebAssembly vision engine
├── src/
│   ├── assets/                    # Static assets & icons
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── AsteroidBelt.tsx       # Instanced 700-asteroid belt (60 FPS)
│   │   │   ├── HandCameraController.tsx # Gesture & focus camera interpolation
│   │   │   ├── Planet.tsx             # Celestial mesh, axial tilt, orbits, moon
│   │   │   ├── SaturnRings.tsx        # Double-sided ring geometry
│   │   │   ├── SolarCanvas.tsx        # R3F WebGL scene & lighting setup
│   │   │   └── Sun.tsx                # Pulsating star corona & omni light
│   │   └── ui/
│   │       ├── ControlBar.tsx         # Bottom glassmorphism control dock
│   │       ├── GestureGuideModal.tsx  # Illustrated gesture legend
│   │       ├── GestureIndicator.tsx   # HUD floating gesture pill
│   │       ├── PlanetInfoPanel.tsx    # Slide-out glass scientific panel
│   │       ├── PlanetQuickBar.tsx     # Top planet shortcut pills
│   │       ├── ScaleModal.tsx         # Visual vs astronomical scale notice
│   │       ├── WebcamPip.tsx          # Draggable PIP webcam with skeleton overlay
│   │       └── WelcomeModal.tsx       # Interactive onboarding screen
│   ├── data/
│   │   └── planets.ts             # Curated astronomical planetary database
│   ├── hooks/
│   │   └── useHandTracking.ts     # Camera lifecycle, FPS, smoothing, debounce
│   ├── services/
│   │   ├── gestureRecognition.ts  # Euclidean geometry gesture classifier
│   │   ├── handTracker.ts         # MediaPipe HandLandmarker wrapper & canvas drawer
│   │   └── soundEffects.ts        # Pure Web Audio API synthesized SFX
│   ├── types/
│   │   └── solar.ts               # Complete TypeScript interfaces & types
│   ├── App.tsx                    # Top-level orchestration component
│   ├── index.css                  # Tailwind styles, glassmorphism & keyframes
│   └── main.tsx                   # React root entry
├── index.html                     # HTML5 template with Orbitron & Inter fonts
├── package.json                   # Dependencies and npm scripts
├── tailwind.config.js             # Space theme color palette & glowing utilities
└── tsconfig.json                  # TypeScript configuration
```

---

## ⚙️ Building for Production & Deployment

### Production Build
To create a production-optimized bundle:
```bash
npm run build
```
The compiled assets will be in the `dist/` directory.

To test the production build locally:
```bash
npm run preview
```

### Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.
3. Or import your GitHub repository directly in the [Vercel Dashboard](https://vercel.com).
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Deploy to Netlify
1. Drag and drop the `dist` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Or connect your repository in Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## 🔒 Privacy & Security
- Webcam video frames are processed **100% locally on your machine** inside browser memory using WebAssembly and WebGL.
- No webcam imagery, video streams, or biometric data is ever recorded, transmitted, or stored on external servers.

---

## 🪐 Credits & Acknowledgments
- **Google MediaPipe**: Machine learning on-device vision models.
- **Three.js & React Three Fiber**: WebGL 3D graphics rendering.
- **NASA Solar System Exploration**: Scientific astronomical references and orbital telemetry.
