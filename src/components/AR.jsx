import React, { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

const DEG2RAD = THREE.MathUtils;

const AR = () => {
  const containerRef = useRef(null);
  const gltf = useGLTF("/butterfly-1.glb");
  const mixer = useRef(null); // Animation mixer

  useEffect(() => {

    // if (!gltf) return;

    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/butterfly.mind"
    });

    // if (!flag) {
    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // ✅ ADD LIGHTS for proper texture rendering
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Soft white light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 2, 3);
    scene.add(ambientLight, directionalLight);

    // const geometry = new THREE.SphereGeometry(0.5);
    // const material = new THREE.MeshBasicMaterial({ color: 0xba0000, transparent: true, opacity: 0.95 });
    // const plane = new THREE.Mesh(geometry, material);
    // anchor.group.add(plane);

    // Load GLB Model
    if (gltf) {
      console.log(gltf.animations);

      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5); // Adjust size
      model.position.set(0, 0, 0); // Adjust position
      model.rotateY((Math.PI / 180) * 180.0);
      model.rotateX((Math.PI / 180) * -45.0);
      // model.rotateZ((Math.PI / 180) * 90.0);
      anchor.group.add(model);

      // ✅ Check if model has animations
      if (gltf.animations.length > 0) {
        mixer.current = new THREE.AnimationMixer(model);

        // gltf.animations.forEach((clip) => {
        //   const action = mixer.current.clipAction(clip, model);
        //   action.play(); // Play all animations
        // });

        const action = mixer.current.clipAction(gltf.animations[0], model); // Play the first animation
        action.play();
      }
    }

    mindarThree.start();

    // ✅ Animate loop for smooth animation
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = 0.75 * clock.getDelta();
      if (mixer.current) mixer.current.update(delta); // Update animation
      renderer.render(scene, camera);
    });
    // }

    return () => {
      renderer.setAnimationLoop(null);
      mindarThree.stop();
    }
  }, []);

  return (
    <div className='ar-container' style={{ width: "100%", height: "100%" }} ref={containerRef}>
    </div>
  )
}

export default AR
