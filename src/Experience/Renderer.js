import * as THREE from "three";

import Experience from "./Experience";
import { WebGLRenderer } from "three";
import { HalfFloatType } from "three";

import {
  SelectiveBloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

export default class Renderer {
  constructor() {
    this.experience = new Experience();

    this.sizes = this.experience.size;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.mobileSize = this.experience.size.mobileSize;
    this.camera = this.experience.camera.instance;

    //? form from html
    this.setUpRenderer();
    this.experience.resources.on("resourcesReady", () => {
      this.bloomElements = this.experience.world.bloomElements;
      this.ledScreen = this.experience.world.ledScreen;
      this.ledBattery = this.experience.world.ledBattery;

      this.outline = this.experience.world.outline;

      this.bloomEffect.selection.add(this.ledScreen);
      this.bloomEffect.selection.add(this.ledBattery);

      this.bloomEffect.selection.add(this.outline);
    });
  }

  setUpRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      antialias: false,
      stencil: true,
      depth: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.setClearColor("#000000");
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 30;
    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: HalfFloatType,
    });

    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomEffect = new SelectiveBloomEffect(this.scene, this.camera, {
      intensity: 1.15,
      mipmapBlur: true,
      luminanceThreshold: 0,
      luminanceSmoothing: 0.5,
      radius: 0.618,
      resolutionScale: 4,
    });

    this.effectPass = new EffectPass(this.camera, this.bloomEffect);

    this.composer.addPass(this.effectPass);

    this.setDebugger();
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.composer.setSize(this.sizes.width, this.sizes.height);
  }

  setDebugger() {
    if (this.experience.debug.active) {
      this.rendererDebug =
        this.experience.debug.gui.addFolder("glow-Intensity");

      this.rendererDebug
        .add(this.bloomEffect, "intensity")
        .min(0)
        .max(10)
        .step(0.001)
        .name("glow-intensity");
    }
  }

  update() {
    // this.renderer.render(this.scene, this.camera);
    this.composer.render(this.scene, this.camera);
  }
}
