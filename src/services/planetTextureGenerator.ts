import * as THREE from 'three';

export interface PlanetTextureSet {
  map: THREE.Texture;
  bumpMap?: THREE.Texture | null;
  specularMap?: THREE.Texture | null;
  cloudsMap?: THREE.Texture | null;
}

/**
 * High-fidelity NASA planetary texture manager and procedural synthesizer.
 * Loads authentic NASA JPL/Cassini/MESSENGER/Hubble/LRO texture maps,
 * with anisotropic filtering and sRGB color space for photorealistic 3D rendering.
 */
class PlanetTextureGenerator {
  private loader: THREE.TextureLoader = new THREE.TextureLoader();
  private textureCache: Map<string, THREE.Texture> = new Map();
  private ringCache: THREE.Texture | null = null;
  private maxAnisotropy: number = 8;

  constructor() {
    // Standard anisotropic filtering
    this.maxAnisotropy = 8;
  }

  /**
   * Load an authentic NASA texture from local public/textures
   */
  public loadNasaTexture(path: string, isColorMap: boolean = true): THREE.Texture {
    if (this.textureCache.has(path)) {
      return this.textureCache.get(path)!;
    }

    const texture = this.loader.load(path);
    if (isColorMap) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = this.maxAnisotropy;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    this.textureCache.set(path, texture);
    return texture;
  }

  /**
   * Get complete texture suite for a planet (diffuse, bump, specular, clouds)
   */
  public getPlanetTextures(
    planetId: string,
    surfaceType: string,
    baseColor: string,
    secondaryColor: string
  ): PlanetTextureSet {
    switch (planetId) {
      case 'sun':
        return {
          map: this.loadNasaTexture('/textures/sunmap.jpg', true)
        };

      case 'mercury':
        return {
          map: this.loadNasaTexture('/textures/mercurymap.jpg', true),
          bumpMap: this.loadNasaTexture('/textures/mercurybump.jpg', false)
        };

      case 'venus':
        return {
          map: this.loadNasaTexture('/textures/venusmap.jpg', true),
          bumpMap: this.loadNasaTexture('/textures/venusbump.jpg', false)
        };

      case 'earth':
        return {
          map: this.loadNasaTexture('/textures/earthmap1k.jpg', true),
          bumpMap: this.loadNasaTexture('/textures/earthbump1k.jpg', false),
          specularMap: this.loadNasaTexture('/textures/earthspec1k.jpg', false),
          cloudsMap: this.loadNasaTexture('/textures/earthcloudmap.jpg', false)
        };

      case 'mars':
        return {
          map: this.loadNasaTexture('/textures/marsmap1k.jpg', true),
          bumpMap: this.loadNasaTexture('/textures/marsbump1k.jpg', false)
        };

      case 'jupiter':
        return {
          map: this.loadNasaTexture('/textures/jupitermap.jpg', true)
        };

      case 'saturn':
        return {
          map: this.loadNasaTexture('/textures/saturnmap.jpg', true)
        };

      case 'uranus':
        return {
          map: this.loadNasaTexture('/textures/uranusmap.jpg', true)
        };

      case 'neptune':
        return {
          map: this.loadNasaTexture('/textures/neptunemap.jpg', true)
        };

      // Exoplanets Multiverse fallback to procedural synthesis
      default:
        return {
          map: this.getProceduralTexture(surfaceType, baseColor, secondaryColor)
        };
    }
  }

  /**
   * Earth's Moon textures (NASA LRO)
   */
  public getMoonTextures(): { map: THREE.Texture; bumpMap: THREE.Texture } {
    return {
      map: this.loadNasaTexture('/textures/moonmap1k.jpg', true),
      bumpMap: this.loadNasaTexture('/textures/moonbump1k.jpg', false)
    };
  }

  /**
   * Photorealistic Saturn Ring texture with Cassini Division and opacity gradients.
   * Generates a 2048x64 high-resolution concentric radial texture based on NASA Cassini data.
   */
  public getSaturnRingTexture(): THREE.Texture {
    if (this.ringCache) return this.ringCache;

    const width = 2048;
    const height = 64;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Create radial gradient across ring width (from inner to outer radius)
    const grad = ctx.createLinearGradient(0, 0, width, 0);

    // NASA Cassini Ring Profile:
    // 0.0 - 0.22: C Ring (semi-transparent dusky crepe ring)
    grad.addColorStop(0.0, 'rgba(40, 35, 30, 0.0)');
    grad.addColorStop(0.04, 'rgba(95, 85, 75, 0.25)');
    grad.addColorStop(0.20, 'rgba(120, 110, 95, 0.40)');
    grad.addColorStop(0.23, 'rgba(60, 50, 40, 0.15)'); // Maxwell Gap

    // 0.24 - 0.65: B Ring (brightest, densest, multi-banded golden-cream)
    grad.addColorStop(0.25, 'rgba(215, 195, 160, 0.88)');
    grad.addColorStop(0.35, 'rgba(235, 215, 180, 0.96)');
    grad.addColorStop(0.48, 'rgba(210, 190, 155, 0.90)');
    grad.addColorStop(0.60, 'rgba(225, 205, 170, 0.94)');
    grad.addColorStop(0.64, 'rgba(195, 175, 140, 0.82)');

    // 0.65 - 0.72: Cassini Division (famous 4,800-km-wide dark gap)
    grad.addColorStop(0.655, 'rgba(30, 25, 20, 0.06)');
    grad.addColorStop(0.685, 'rgba(10, 10, 10, 0.01)');
    grad.addColorStop(0.715, 'rgba(35, 30, 25, 0.08)');

    // 0.72 - 0.96: A Ring (prominent, with Encke Division)
    grad.addColorStop(0.725, 'rgba(195, 175, 145, 0.82)');
    grad.addColorStop(0.82, 'rgba(205, 185, 150, 0.85)');
    grad.addColorStop(0.875, 'rgba(50, 40, 30, 0.10)'); // Encke Gap
    grad.addColorStop(0.89, 'rgba(190, 170, 140, 0.78)');
    grad.addColorStop(0.955, 'rgba(150, 130, 105, 0.65)');

    // 0.96 - 1.0: Outer boundary & F-ring trace
    grad.addColorStop(0.97, 'rgba(30, 25, 20, 0.0)');
    grad.addColorStop(0.985, 'rgba(140, 125, 105, 0.25)'); // F ringlet
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add fine microscopic radial ringlet striations (Cassini micro-structure)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
    for (let x = 0; x < width; x += 3) {
      if (Math.sin(x * 0.15) > 0.3) {
        ctx.fillRect(x, 0, 1.5, height);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    this.ringCache = texture;
    return texture;
  }

  /**
   * Procedural texture generator for exotic Multiverse exoplanets
   */
  public getProceduralTexture(type: string, baseColor: string, secondaryColor: string): THREE.Texture {
    const key = `proc_${type}_${baseColor}_${secondaryColor}`;
    if (this.textureCache.has(key)) {
      return this.textureCache.get(key)!;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (type === 'lava') {
      // 55 Cancri e (cracked basalt with incandescent lava veins)
      ctx.fillStyle = '#140805';
      ctx.fillRect(0, 0, 1024, 512);

      ctx.strokeStyle = '#ff3c00';
      ctx.lineWidth = 5;
      for (let i = 0; i < 24; i++) {
        ctx.beginPath();
        let cx = (i * 45) % 1024;
        let cy = 0;
        ctx.moveTo(cx, cy);
        while (cy < 512) {
          cx += (Math.sin(cy * 0.05 + i) - 0.5) * 35;
          cy += 20;
          ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = '#ffe600';
      ctx.lineWidth = 2;
      for (let i = 0; i < 24; i++) {
        ctx.beginPath();
        let cx = (i * 45) % 1024;
        let cy = 0;
        ctx.moveTo(cx, cy);
        while (cy < 512) {
          cx += (Math.sin(cy * 0.05 + i) - 0.5) * 20;
          cy += 20;
          ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }
    } else {
      // Natural organic gradient for alien exoplanet
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, baseColor);
      grad.addColorStop(0.5, secondaryColor);
      grad.addColorStop(1, baseColor);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Natural atmospheric clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      for (let y = 60; y < 450; y += 50) {
        for (let x = 0; x < 1024; x += 40) {
          if (Math.sin(x * 0.015 + y * 0.03) > 0.1) {
            ctx.beginPath();
            ctx.arc(x, y + Math.sin(x * 0.02) * 12, 22, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    this.textureCache.set(key, texture);
    return texture;
  }
}

export const planetTextureGenerator = new PlanetTextureGenerator();
