import * as THREE from 'three';

/**
 * Procedural texture generator for ultra-realistic planetary surfaces.
 * Creates procedural 2D canvases converted to THREE.CanvasTexture,
 * cached for maximum performance without heavy asset downloads.
 */
class PlanetTextureGenerator {
  private cache: Map<string, THREE.CanvasTexture> = new Map();

  public getTexture(type: string, baseColor: string, secondaryColor: string): THREE.CanvasTexture {
    const key = `${type}_${baseColor}_${secondaryColor}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    switch (type) {
      case 'earth':
        this.drawEarth(ctx);
        break;
      case 'gas_bands':
        this.drawJupiter(ctx);
        break;
      case 'saturn_bands':
        this.drawSaturn(ctx);
        break;
      case 'mars':
        this.drawMars(ctx);
        break;
      case 'cloudy': // Venus
        this.drawVenus(ctx);
        break;
      case 'rocky': // Mercury
        this.drawMercury(ctx);
        break;
      case 'lava':
        this.drawLava(ctx);
        break;
      case 'ice_blue':
      case 'deep_blue':
        this.drawIceGiant(ctx, baseColor, secondaryColor);
        break;
      default:
        this.drawGeneric(ctx, baseColor, secondaryColor);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  // Realistic Earth surface
  private drawEarth(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    // Ocean deep blue base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, '#0d2b45');
    oceanGrad.addColorStop(0.5, '#1b4965');
    oceanGrad.addColorStop(1, '#0d2b45');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    // Continents (procedural organic blobs)
    ctx.fillStyle = '#2d6a4f'; // Forest landmass
    for (let i = 0; i < 45; i++) {
      const cx = (Math.sin(i * 1.7) * 0.5 + 0.5) * w;
      const cy = (Math.cos(i * 2.3) * 0.35 + 0.5) * h;
      const rx = 35 + (i % 6) * 18;
      const ry = 25 + (i % 5) * 14;

      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, (i * 0.4), 0, Math.PI * 2);
      ctx.fill();

      // Desert/savannah interior
      ctx.fillStyle = '#b79759';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.6, ry * 0.6, (i * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2d6a4f';
    }

    // Polar ice caps (North & South)
    ctx.fillStyle = '#f8f9fa';
    // North pole
    ctx.beginPath();
    ctx.ellipse(w / 2, 10, w * 0.6, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // South pole
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 10, w * 0.6, 45, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Clouds texture for Earth's outer atmosphere
  public getEarthClouds(): THREE.CanvasTexture {
    const key = 'earth_clouds';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 1024, 512);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';

    // Swirling cloud belts
    for (let y = 60; y < 450; y += 45) {
      for (let x = 0; x < 1024; x += 30) {
        if (Math.sin(x * 0.02 + y * 0.05) > -0.2) {
          const r = 18 + Math.sin(x * 0.01) * 12;
          ctx.beginPath();
          ctx.arc(x, y + Math.sin(x * 0.02) * 10, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  // Jupiter with banded belts and Great Red Spot
  private drawJupiter(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    const bandColors = [
      '#e0a96d', '#b07d4b', '#f4d2a4', '#a36336',
      '#d99b66', '#874f26', '#e6c28f', '#b37446',
      '#eccba0', '#9c5929', '#db9a61', '#85431b',
      '#f2d0a7', '#ad7542', '#e5b682', '#945b2b'
    ];

    const bandH = h / bandColors.length;
    for (let i = 0; i < bandColors.length; i++) {
      ctx.fillStyle = bandColors[i];
      ctx.fillRect(0, i * bandH, w, bandH + 2);

      // Fine turbulent wavy ripples
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(80, 40, 20, 0.25)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < w; x += 10) {
        const y = i * bandH + Math.sin(x * 0.04 + i) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Great Red Spot
    const grsX = w * 0.65;
    const grsY = h * 0.62;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 55, 32, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#b7321a';
    ctx.shadowColor = '#4a0e05';
    ctx.shadowBlur = 15;
    ctx.fill();

    // Inner storm swirls
    ctx.strokeStyle = '#e26d5c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 35, 18, 0.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Saturn golden butterscotch bands
  private drawSaturn(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    const saturnColors = [
      '#d8b888', '#e8ce9e', '#cfab79', '#ebd5ab',
      '#d2b07e', '#f0dcaf', '#cda673', '#e4c995',
      '#d7b583', '#edd8a6', '#ca9f69', '#dfbe88'
    ];

    const bandH = h / saturnColors.length;
    for (let i = 0; i < saturnColors.length; i++) {
      ctx.fillStyle = saturnColors[i];
      ctx.fillRect(0, i * bandH, w, bandH + 2);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, i * bandH, w, 2);
    }
  }

  // Mars rusty surface with basalt seas & polar ice
  private drawMars(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    // Rusty iron oxide base
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#a53810');
    grad.addColorStop(0.5, '#c7511a');
    grad.addColorStop(1, '#a53810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dark basalt patches (Syrtis Major, Acidalia Planitia)
    ctx.fillStyle = '#4a1e0c';
    for (let i = 0; i < 25; i++) {
      const cx = (Math.sin(i * 1.9) * 0.5 + 0.5) * w;
      const cy = (Math.cos(i * 2.1) * 0.35 + 0.5) * h;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 50 + (i % 4) * 20, 30 + (i % 3) * 15, i * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar dry ice caps
    ctx.fillStyle = '#fff5ea';
    ctx.beginPath();
    ctx.ellipse(w / 2, 8, w * 0.45, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 8, w * 0.45, 25, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Venus dense sulfuric cloud vortex
  private drawVenus(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#e8c991');
    grad.addColorStop(0.5, '#d9b372');
    grad.addColorStop(1, '#f1d7a8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Chevron cloud streaks
    ctx.strokeStyle = 'rgba(255, 248, 220, 0.4)';
    ctx.lineWidth = 14;
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        const yOffset = Math.sin(x * 0.02 + y * 0.01) * 15;
        if (x === 0) ctx.moveTo(x, y + yOffset);
        else ctx.lineTo(x, y + yOffset);
      }
      ctx.stroke();
    }
  }

  // Mercury cratered surface
  private drawMercury(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(0, 0, w, h);

    // Craters with rim highlights & shadows
    for (let i = 0; i < 70; i++) {
      const x = ((i * 137.5) % w);
      const y = ((i * 83.3) % h);
      const r = 8 + (i % 8) * 4;

      // Dark crater floor
      ctx.fillStyle = '#616161';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Bright sunlit rim
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, r, Math.PI, Math.PI * 1.8);
      ctx.stroke();
    }
  }

  // Lava planet (55 Cancri e) with glowing magma fissures
  private drawLava(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 512;

    ctx.fillStyle = '#1c0f0a';
    ctx.fillRect(0, 0, w, h);

    // Glowing magma rivers
    ctx.strokeStyle = '#ff3300';
    ctx.lineWidth = 6;
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 12;

    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      let cx = (i * 60) % w;
      let cy = 0;
      ctx.moveTo(cx, cy);

      while (cy < h) {
        cx += (Math.random() - 0.5) * 40;
        cy += 25;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    // Yellow hot magma centers
    ctx.strokeStyle = '#ffea00';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      let cx = (i * 60) % w;
      let cy = 0;
      ctx.moveTo(cx, cy);
      while (cy < h) {
        cx += (Math.random() - 0.5) * 20;
        cy += 25;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
  }

  // Ice giants (Uranus, Neptune)
  private drawIceGiant(ctx: CanvasRenderingContext2D, c1: string, c2: string) {
    const w = 1024;
    const h = 512;

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, c1);
    grad.addColorStop(0.5, c2);
    grad.addColorStop(1, c1);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle cirrus storm wisps
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    for (let y = 100; y < 450; y += 60) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        const yOffset = Math.sin(x * 0.03 + y) * 8;
        if (x === 0) ctx.moveTo(x, y + yOffset);
        else ctx.lineTo(x, y + yOffset);
      }
      ctx.stroke();
    }
  }

  // Fallback
  private drawGeneric(ctx: CanvasRenderingContext2D, c1: string, c2: string) {
    const w = 1024;
    const h = 512;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }
}

export const planetTextureGenerator = new PlanetTextureGenerator();
