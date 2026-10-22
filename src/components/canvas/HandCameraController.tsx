import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { HandGestureState, PlanetData } from '../../types/solar';

interface HandCameraControllerProps {
  selectedPlanet: PlanetData | null;
  gestureState: HandGestureState;
  getPlanetPosition: (id: string) => THREE.Vector3 | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export function HandCameraController({
  selectedPlanet,
  gestureState,
  getPlanetPosition,
  controlsRef
}: HandCameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const desiredCamPos = useRef(new THREE.Vector3(0, 50, 110));
  const isResetting = useRef(false);

  // When PEACE gesture is triggered, reset camera view
  useEffect(() => {
    if (gestureState.gesture === 'PEACE') {
      isResetting.current = true;
      desiredCamPos.current.set(0, 55, 115);
      currentTarget.current.set(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  }, [gestureState.gesture, controlsRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;

    // 1. Zoom gestures: THUMBS_UP (zoom in) and THUMBS_DOWN (zoom out)
    if (gestureState.gesture === 'THUMBS_UP') {
      const dir = new THREE.Vector3().subVectors(camera.position, controls ? controls.target : currentTarget.current);
      const len = dir.length();
      if (len > 12) {
        dir.multiplyScalar(0.97);
        camera.position.copy(controls ? controls.target : currentTarget.current).add(dir);
      }
    } else if (gestureState.gesture === 'THUMBS_DOWN') {
      const dir = new THREE.Vector3().subVectors(camera.position, controls ? controls.target : currentTarget.current);
      const len = dir.length();
      if (len < 220) {
        dir.multiplyScalar(1.03);
        camera.position.copy(controls ? controls.target : currentTarget.current).add(dir);
      }
    }

    // 2. Hand navigation: POINTING or FIST to orbit camera
    if (gestureState.gesture === 'POINTING' || gestureState.gesture === 'FIST') {
      const sensitivity = 3.5;
      const dx = gestureState.delta.x * sensitivity;
      const dy = gestureState.delta.y * sensitivity;

      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        const offset = new THREE.Vector3().subVectors(
          camera.position,
          controls ? controls.target : currentTarget.current
        );
        const radius = offset.length();

        let theta = Math.atan2(offset.x, offset.z);
        let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));

        theta -= dx;
        phi = Math.max(0.1, Math.min(Math.PI / 2.05, phi + dy));

        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);

        camera.position.copy(controls ? controls.target : currentTarget.current).add(offset);
        camera.lookAt(controls ? controls.target : currentTarget.current);
      }
    }

    // 3. Smooth focus transition when a planet is selected
    if (selectedPlanet && getPlanetPosition) {
      const planetPos = getPlanetPosition(selectedPlanet.id);
      if (planetPos) {
        // Lerp OrbitControls target to planet position
        if (controls) {
          controls.target.lerp(planetPos, delta * 3.5);
        }

        // Camera distance appropriate for the planet's radius
        const offsetDistance = Math.max(selectedPlanet.radius * 4.2, 5.5);
        const targetCam = new THREE.Vector3(
          planetPos.x + offsetDistance * 0.7,
          planetPos.y + offsetDistance * 0.5,
          planetPos.z + offsetDistance * 0.9
        );

        camera.position.lerp(targetCam, delta * 2.5);
      }
    } else if (isResetting.current) {
      // Lerp camera back to overview
      camera.position.lerp(desiredCamPos.current, delta * 3.0);
      if (controls) {
        controls.target.lerp(currentTarget.current, delta * 3.0);
      }
      if (camera.position.distanceTo(desiredCamPos.current) < 1.0) {
        isResetting.current = false;
      }
    }
  });

  return null;
}
