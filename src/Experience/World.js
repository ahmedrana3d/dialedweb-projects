import * as THREE from "three";
import Experience from "./Experience";
import { Reflector } from "three/addons/objects/Reflector.js";
import gsap from "gsap";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;
    this.size = this.experience.size;
    this.mobileSize = this.experience.size.mobileSize;
    this.time = this.experience.time;

    this.scene = this.experience.scene;
    this.sizes = this.experience.size;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    //? html
    this.navImage = this.experience.html.navImage;
    this.animationBg = this.experience.html.animationBg;

    //? led-LIGHT AND FLOOR REFLECTION
    this.ledScreen = null;
    this.ledBattery = null;

    this.floor = null;
    this.bloomElements = [];

    //? outline SCREEN

    this.outline = null;
    this.glass = null;

    //? cube and keycap animations
    this.screenAnimation = false;

    this.firstCube = null;
    this.secondCube = null;
    this.thirdCube = null;
    this.fourthCube = null;
    this.fifthCube = null;
    this.sixthCube = null;

    this.cubeAnimations = {
      firstCubeAnimation: false,
      secondCubeAnimation: false,
      thirdCubeAnimation: false,
      fourthCubeAnimation: false,
      fifthCubeAnimation: false,
      sixthCubeAnimation: false,
    };

    //? CREATING RAYCASTER

    //? raycaster
    this.rayCaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.intersectObjects = [];
    this.currentIntersects = null;
    this.clicked = false;

    this.setUpScene();

    document.addEventListener("click", (e) => {
      this.clicked = true;
      gsap.to(this.navImage, {
        duration: 1,
        opacity: 0,
        ease: "ease-out",
        display: "none",
      });
    });

    window.addEventListener("mousemove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    //? mixers
    this.mixer = null;
    this.keycapMixer = null;
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      //? ground REFLECTION
      this.geometry = new THREE.PlaneGeometry(50, 50);
      this.groundMirror = new Reflector(this.geometry, {
        clipBias: 0.03,
        textureWidth: this.size.width * this.size.pixelRatio,
        textureHeight: this.size.height * this.size.pixelRatio,
        color: 0xb5b5b5,
      });

      this.groundMirror.position.y = -2.55;
      this.groundMirror.rotateX(-Math.PI / 2);
      if (!this.mobileSize) {
        this.scene.add(this.groundMirror);
      }

      //? RESOURCES/TEXTURES
      this.bakedMap = this.resources.items.bakedMap;
      this.bakedMap.flipY = false;
      this.bakedMap.colorSpace = THREE.SRGBColorSpace;

      this.floorBaked = this.resources.items.floorBaked;
      this.floorBaked.flipY = false;
      this.floorBaked.colorSpace = THREE.SRGBColorSpace;

      this.sceneLogo = this.resources.items.sceneLogo;
      this.sceneLogo.flipY = false;
      this.sceneLogo.colorSpace = THREE.SRGBColorSpace;

      this.numbersImg = this.resources.items.numbers;
      this.numbersImg.flipY = false;
      this.numbersImg.colorSpace = THREE.SRGBColorSpace;

      this.keycapBaked = this.resources.items.keycapBaked;
      this.keycapBaked.flipY = false;
      this.keycapBaked.colorSpace = THREE.SRGBColorSpace;

      this.batteryBaked = this.resources.items.batteryBaked;
      this.batteryBaked.flipY = false;
      this.batteryBaked.colorSpace = THREE.SRGBColorSpace;

      //? portfolio textures
      this.portfolioOne = this.resources.items.portfolioOne;
      this.portfolioOne.flipY = false;
      this.portfolioOne.colorSpace = THREE.SRGBColorSpace;

      this.portfolioTwo = this.resources.items.portfolioTwo;
      this.portfolioTwo.flipY = false;
      this.portfolioTwo.colorSpace = THREE.SRGBColorSpace;

      this.portfolioThree = this.resources.items.portfolioThree;
      this.portfolioThree.flipY = false;
      this.portfolioThree.colorSpace = THREE.SRGBColorSpace;

      this.portfolioFour = this.resources.items.portfolioFour;
      this.portfolioFour.flipY = false;
      this.portfolioFour.colorSpace = THREE.SRGBColorSpace;

      this.portfolioFive = this.resources.items.portfolioFive;
      this.portfolioFive.flipY = false;
      this.portfolioFive.colorSpace = THREE.SRGBColorSpace;

      this.portfolioSix = this.resources.items.portfolioSix;
      this.portfolioSix.flipY = false;
      this.portfolioSix.colorSpace = THREE.SRGBColorSpace;

      this.portfolioSeven = this.resources.items.portfolioSeven;
      this.portfolioSeven.flipY = false;
      this.portfolioSeven.colorSpace = THREE.SRGBColorSpace;

      this.portfolioEight = this.resources.items.portfolioEight;
      this.portfolioEight.flipY = false;
      this.portfolioEight.colorSpace = THREE.SRGBColorSpace;

      this.portfolioNine = this.resources.items.portfolioNine;
      this.portfolioNine.flipY = false;
      this.portfolioNine.colorSpace = THREE.SRGBColorSpace;

      this.portfolioTen = this.resources.items.portfolioTen;
      this.portfolioTen.flipY = false;
      this.portfolioTen.colorSpace = THREE.SRGBColorSpace;

      this.portfolioEleven = this.resources.items.portfolioEleven;
      this.portfolioEleven.flipY = false;
      this.portfolioEleven.colorSpace = THREE.SRGBColorSpace;

      //? RESOURCES/OBJECTS
      this.vendingMachine = this.resources.items.vendingMachine;
      this.cubeModels = this.resources.items.cubeModels;
      this.clickableObjects = this.resources.items.clickableObjects;
      this.keycaps = this.resources.items.keycaps;

      //? Materials
      this.bakedMaterial = new THREE.MeshBasicMaterial({
        map: this.bakedMap,
      });

      this.batteryMaterial = new THREE.MeshBasicMaterial({
        map: this.batteryBaked,
      });

      this.logoMaterial = new THREE.MeshBasicMaterial({
        map: this.sceneLogo,
        transparent: true,
      });

      this.numbersMaterial = new THREE.MeshBasicMaterial({
        map: this.numbersImg,
        transparent: true,
      });

      this.floorMaterial = new THREE.MeshBasicMaterial({
        map: this.floorBaked,
        transparent: true,
        opacity: 0.5,
      });

      this.glassMaterial = new THREE.MeshBasicMaterial({
        color: 0xf2f2f2,
        transparent: true,
        opacity: 0.05,
      });

      //! ADDING OBJECTS TO SCENE
      //? adding the vending machine
      this.vendingMachine.scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.material = this.bakedMaterial;
          child.renderOrder = 0;

          if (child.name.startsWith("led-screen")) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x6fdce3,
            });

            this.ledScreen = child;
            this.intersectObjects.push(child);
          }

          if (child.name.startsWith("logo")) {
            child.material = this.logoMaterial;
          }

          if (child.name.startsWith("battery")) {
            child.material = this.batteryMaterial;
          }

          if (child.name.startsWith("battery-led")) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x6fdce3,
            });
            this.ledBattery = child;
          }

          if (child.name.startsWith("floor")) {
            child.material = this.floorMaterial;

            this.floor = child;
          }

          if (child.name.startsWith("door")) {
            this.door = child;
          }

          if (child.name.startsWith("glass")) {
            child.material = this.glassMaterial;
          }
        }
      });

      this.scene.add(this.vendingMachine.scene);

      //? adding the animated cubes
      this.cubeModels.scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.material = this.bakedMaterial;
          child.renderOrder = 0;

          if (child.name.startsWith("outline")) {
            child.material = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
              color: 0x28b6c3,
              color: 0xffffff,
            });

            this.outline = child;
          }

          if (child.name.startsWith("portfolio-1")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioOne,
            });
          }

          if (child.name.startsWith("portfolio-2")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioTwo,
            });
          }
          if (child.name.startsWith("portfolio-3")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioThree,
            });
          }
          if (child.name.startsWith("portfolio-4")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioFour,
            });
          }
          if (child.name.startsWith("portfolio-5")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioFive,
            });
          }
          if (child.name.startsWith("portfolio-6")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioSix,
            });
          }
          if (child.name.startsWith("portfolio-7")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioSeven,
            });
          }
          if (child.name.startsWith("portfolio-8")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioEight,
            });
          }
          if (child.name.startsWith("portfolio-9")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioNine,
            });
          }
          if (child.name.startsWith("portfolio-10")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioTen,
            });
          }
          if (child.name.startsWith("portfolio-11")) {
            child.material = new THREE.MeshBasicMaterial({
              map: this.portfolioEleven,
            });
          }

          if (child.name.startsWith("cube-first")) {
            this.firstCube = child;
          }
          if (child.name.startsWith("cube-second")) {
            this.secondCube = child;
          }

          if (child.name.startsWith("cube-third")) {
            this.thirdCube = child;
          }

          if (child.name.startsWith("cube-fourth")) {
            this.fourthCube = child;
          }

          if (child.name.startsWith("cube-fifth")) {
            this.fifthCube = child;
          }

          if (child.name.startsWith("cube-sixth")) {
            this.sixthCube = child;
          }
        }
      });

      this.scene.add(this.cubeModels.scene);

      //? adding the clickable numebrs
      this.clickableObjects.scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.material = this.numbersMaterial;
          this.intersectObjects.push(child);
        }
      });

      this.scene.add(this.clickableObjects.scene);

      //? adding the keycaps/logo
      this.keycaps.scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.material = new THREE.MeshBasicMaterial({
            map: this.keycapBaked,
          });
        }
      });

      this.scene.add(this.keycaps.scene);

      //? adding fog
      this.scene.fog = new THREE.Fog(0x00000, 20, 65);

      this.debugActive();

      //? mixer and animations for cube

      this.mixer = new THREE.AnimationMixer(this.cubeModels.scene);

      //? actions
      this.firstCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[0]
      );

      this.firstCubeAction.loop = THREE.LoopOnce;

      this.secondCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[1]
      );
      this.secondCubeAction.loop = THREE.LoopOnce;

      this.thirdCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[2]
      );
      this.thirdCubeAction.loop = THREE.LoopOnce;

      this.fourthCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[3]
      );
      this.fourthCubeAction.loop = THREE.LoopOnce;

      this.fifthCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[5]
      );
      this.fifthCubeAction.loop = THREE.LoopOnce;

      this.sixthCubeAction = this.mixer.clipAction(
        this.cubeModels.animations[4]
      );
      this.sixthCubeAction.loop = THREE.LoopOnce;

      //? KEYCAPS  -- mixer and animations for keycap

      this.keycapMixer = new THREE.AnimationMixer(this.keycaps.scene);

      this.firstKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[0]
      );

      this.secondKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[1]
      );
      this.thirdKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[2]
      );
      this.fourthKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[3]
      );
      this.fifthKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[4]
      );
      this.sixthKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[5]
      );
      this.seventhKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[6]
      );
      this.eighthKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[7]
      );
      this.ninthKeycapAction = this.keycapMixer.clipAction(
        this.keycaps.animations[8]
      );

      this.firstKeycapAction.play();
      this.secondKeycapAction.play();
      this.thirdKeycapAction.play();
      this.fourthKeycapAction.play();
      this.fifthKeycapAction.play();
      this.sixthKeycapAction.play();
      this.seventhKeycapAction.play();
      this.eighthKeycapAction.play();
      this.ninthKeycapAction.play();

      //! MIXER AFTER CUBE FALLING ANIMATION AND "WEBSITE URL"
      this.mixer.addEventListener("finished", (e) => {
        this.animationBg.style.display = "flex";
        gsap.to(this.door.rotation, {
          duration: 1.25,
          x: -Math.PI * 0.5,
          onComplete: () => {
            gsap.to(this.animationBg, {
              duration: 2,
              opacity: 1,
            });
            
            if (this.cubeAnimations.firstCubeAnimation) {
              this.cubeAnimations.firstCubeAnimation = false;
              this.controls = null;

              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.firstCube.position.z + 0.3,
                onComplete: () => {
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
            if (this.cubeAnimations.secondCubeAnimation) {
              this.cubeAnimations.secondCubeAnimation = false;
              this.controls = null;
              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.secondCube.position.z + 0.35,
                onComplete: () => {
                  //! CHANGE THE URL FOR THE SECOND PORTFOLIO-2
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
            if (this.cubeAnimations.thirdCubeAnimation) {
              this.cubeAnimations.thirdCubeAnimation = false;
              this.controls = null;
              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.thirdCube.position.z + 0.3,
                onComplete: () => {
                  //! CHANGE THE URL FOR THE THIRD PORTFOLIO-3
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
            if (this.cubeAnimations.fourthCubeAnimation) {
              this.cubeAnimations.fourthCubeAnimation = false;
              this.controls = null;
              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.fourthCube.position.z + 0.35,
                onComplete: () => {
                  //! CHANGE THE URL FOR THE FOURTH PORTFOLIO-4
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
            if (this.cubeAnimations.fifthCubeAnimation) {
              this.cubeAnimations.fifthCubeAnimation = false;
              this.controls = null;
              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.fifthCube.position.z + 0.3,
                onComplete: () => {
                  //! CHANGE THE URL FOR THE FIFTCH PORTFOLIO-5
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
            if (this.cubeAnimations.sixthCubeAnimation) {
              this.cubeAnimations.sixthCubeAnimation = false;
              this.controls = null;
              gsap.to(this.camera.position, {
                duration: 0.9,
                z: this.sixthCube.position.z + 0.3,
                onComplete: () => {
                  //! CHANGE THE URL FOR THE SIXTH PORTFOLIO-6
                  window.open("https://www.google.com/", "_top").focus();
                },
              });
            }
          },
        });
      });
    });
  }

  stopAllAnimations() {
    this.cubeAnimations.firstCubeAnimation = false;
    this.cubeAnimations.secondCubeAnimation = false;
    this.cubeAnimations.thirdCubeAnimation = false;
    this.cubeAnimations.fourthCubeAnimation = false;
    this.cubeAnimations.fifthCubeAnimation = false;
    this.cubeAnimations.sixthCubeAnimation = false;
  }

  cameraAnimation(positionX, positionZ, targetX, targetY, targetZ, cubeAction) {
    this.stopAllAnimations();
    this.controls.minDistance = 1;

    gsap.to(this.camera.position, {
      duration: 2,
      x: positionX,
      y: targetY,
      z: positionZ,
    });
    gsap.to(this.controls.target, {
      duration: 2,
      x: targetX,
      y: targetY,
      z: targetZ,
      onComplete: () => {
        if (cubeAction) {
          cubeAction.paused = false;
          cubeAction.clampWhenFinished = true;
          cubeAction.play();
        }
      },
    });
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");

      this.worldFolder
        .add(this.floorMaterial, "opacity")
        .min(0)
        .max(1)
        .step(0.05)
        .name("Floor-Reflection");

      this.worldFolder
        .addColor(this.ledScreen.material, "color")
        .name("Screen-Color");

      this.worldFolder
        .addColor(this.glassMaterial, "color")
        .name("GLASS-COLOR");
      this.worldFolder
        .add(this.glassMaterial, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .name("Glass-Opacity");

      this.worldFolder
        .addColor(this.outline.material, "color")
        .name("Outline-Color");
    }
  }

  updateCubeAnimations(cube) {
    this.camera.position.y = cube.position.y;
    this.controls.target.set(cube.position.x, cube.position.y, cube.position.z);
  }

  resize() {
    if (this.planeMaterial) {
      this.planeMaterial.uniforms.uResolution.value.x =
        this.experience.size.width;
      this.planeMaterial.uniforms.uResolution.value.y =
        this.experience.size.height;
    }
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }

    //? change the "200" to increase/decrease the speed of the outline glowing
    if (this.outline) {
      if (!this.screenAnimation) {
        this.outline.material.opacity =
          Math.sin(this.time.elapsed / 350) * 0.5 + 0.5;
      }
    }

    //! MIXER AND CUBE ANIMATIONS
    if (this.mixer !== null) {
      this.mixer.update(this.experience.time.delta * 0.00075);
    }

    if (this.keycapMixer !== null) {
      this.keycapMixer.update(this.experience.time.delta * 0.001);
    }

    if (this.firstCube) {
      if (this.cubeAnimations.firstCubeAnimation) {
        this.updateCubeAnimations(this.firstCube);
      }
    }
    if (this.secondCube) {
      if (this.cubeAnimations.secondCubeAnimation) {
        this.updateCubeAnimations(this.secondCube);
      }
    }
    if (this.thirdCube) {
      if (this.cubeAnimations.thirdCubeAnimation) {
        this.updateCubeAnimations(this.thirdCube);
      }
    }
    if (this.fourthCube) {
      if (this.cubeAnimations.fourthCubeAnimation) {
        this.updateCubeAnimations(this.fourthCube);
      }
    }
    if (this.fifthCube) {
      if (this.cubeAnimations.fifthCubeAnimation) {
        this.updateCubeAnimations(this.fifthCube);
      }
    }
    if (this.sixthCube) {
      if (this.cubeAnimations.sixthCubeAnimation) {
        this.updateCubeAnimations(this.sixthCube);
      }
    }

    if (this.rayCaster) {
      this.rayCaster.setFromCamera(this.pointer, this.camera);
      this.intersects = this.rayCaster.intersectObjects(this.intersectObjects);

      if (this.intersects.length) {
        if (!this.currentIntersect) {
        }
        this.currentIntersect = this.intersects[0];
        if (this.clicked) {
          if (!this.screenAnimation) {
            if (this.currentIntersect.object.name === "led-screen") {
              this.screenAnimation = true;

              if (this.mobileSize) {
                this.cameraAnimation(
                  0.9778,
                  2.79,
                  this.ledScreen.position.x,
                  this.ledScreen.position.y,
                  this.ledScreen.position.z
                );
              } else {
                this.cameraAnimation(
                  0.6732,
                  2.825,
                  this.ledScreen.position.x - 0.3,
                  this.ledScreen.position.y,
                  this.ledScreen.position.z
                );
              }
              setTimeout(() => {
                this.firstCubeAction.time = 0;
                this.secondCubeAction.time = 0;
                this.thirdCubeAction.time = 0;
                this.fourthCubeAction.time = 0;
                this.fifthCubeAction.time = 0;
                this.sixthCubeAction.time = 0;
                this.controls.maxDistance = 5;
              }, 2000);
              gsap.to(this.outline.material, {
                duration: 1,
                opacity: 0,
              });
            }
          }
          if (this.screenAnimation) {
            if (this.currentIntersect.object.name === "1") {
              this.intersectObjects = [];
              this.controls.enabled = false;
              this.cameraAnimation(
                -0.872,
                2.457,
                this.firstCube.position.x,
                this.firstCube.position.y,
                this.firstCube.position.z,
                this.firstCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.firstCubeAnimation = true;
              }, 2000);
            }
            if (this.currentIntersect.object.name === "2") {
              this.intersectObjects = [];

              this.controls.enabled = false;
              this.cameraAnimation(
                -0.172,
                2.457,
                this.secondCube.position.x,
                this.secondCube.position.y,
                this.secondCube.position.z,
                this.secondCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.secondCubeAnimation = true;
              }, 2000);
            }
            if (this.currentIntersect.object.name === "3") {
              this.intersectObjects = [];

              this.controls.enabled = false;
              this.cameraAnimation(
                -0.872,
                2.457,
                this.thirdCube.position.x,
                this.thirdCube.position.y,
                this.thirdCube.position.z,
                this.thirdCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.thirdCubeAnimation = true;
              }, 2000);
            }
            if (this.currentIntersect.object.name === "4") {
              this.intersectObjects = [];

              this.controls.enabled = false;
              this.cameraAnimation(
                -0.172,
                2.457,
                this.fourthCube.position.x,
                this.fourthCube.position.y,
                this.fourthCube.position.z,
                this.fourthCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.fourthCubeAnimation = true;
              }, 2000);
            }
            if (this.currentIntersect.object.name === "5") {
              this.intersectObjects = [];

              this.controls.enabled = false;
              this.cameraAnimation(
                -0.872,
                2.457,
                this.fifthCube.position.x,
                this.fifthCube.position.y,
                this.fifthCube.position.z,
                this.fifthCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.fifthCubeAnimation = true;
              }, 2000);
            }
            if (this.currentIntersect.object.name === "6") {
              this.intersectObjects = [];

              this.controls.enabled = false;
              this.cameraAnimation(
                -0.172,
                2.457,
                this.sixthCube.position.x,
                this.sixthCube.position.y,
                this.sixthCube.position.z,
                this.sixthCubeAction
              );
              setTimeout(() => {
                this.cubeAnimations.sixthCubeAnimation = true;
              }, 2000);
            }
          }
        }
        if (!this.mobileSize) {
          // if (this.screenAnimation) {
          document.body.style.cursor = "pointer";
          // }
        }
      } else if (!this.intersects.length) {
        if (this.currentIntersect) {
          if (!this.mobileSize) {
            document.body.style.cursor = "auto";
          }
        }
        this.currentIntersect = null;
      }
    }
    this.clicked = false;
  }
}
