import { World } from "objecs";
import { FontLibrary, loadImage, Window } from "skia-canvas";
import { starfieldFactory } from "./entity-factories/star.ts";
import type { Entity } from "./entity.ts";
import { movementSystemFactory } from "./systems/movement-system.ts";
import { spriteRenderingSystemFactory } from "./systems/sprite-rendering-system.ts";
import { starfieldRenderingSystemFactory } from "./systems/starfield-rendering-system.ts";
import { starfieldSystemFactory } from "./systems/starfield-system.ts";

FontLibrary.use("PICO-8", "assets/fonts/pico-8.ttf");

const spriteSheet = await loadImage("assets/image/shmup.png");

const gameWidth = 128;
const gameHeight = 128;
const scale = 4;

const win = new Window({
  title: "Cherry Bomb",
  width: gameWidth * scale,
  height: gameHeight * scale,
  fullscreen: false,
  background: "black",
});

const { canvas, ctx: context } = win;

canvas.height = gameHeight;
canvas.width = gameWidth;
context.imageSmoothingEnabled = false;

const world = new World<Entity>();

const systems = [
  starfieldSystemFactory({ world }),
  movementSystemFactory({ world }),
  starfieldRenderingSystemFactory({
    context,
    world,
  }),
  await spriteRenderingSystemFactory({
    context,
    spriteSheet,
    world,
  }),
];

starfieldFactory({
  areaWidth: gameWidth - 1,
  areaHeight: gameHeight - 1,
  count: 100,
  world,
});

const TARGET_FPS = 60;
const STEP = 1000 / TARGET_FPS;
const dt = STEP / 1000;
let variableDt = 0;
let dtAccumulator = 0;
let last = performance.now();

win.on("draw", (e) => {
  const hrt = performance.now();

  dtAccumulator += hrt - last;
  variableDt = (hrt - last) / 1000;

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (const system of systems) {
    system(variableDt);
  }

  context.font = "5px PICO-8";
  context.fillStyle = "#ffffff";
  context.strokeStyle = "#ffffff";
  context.lineWidth = 1;

  const textMetrics = context.measureText("Cherry Bomb");
  context.fillText(
    "Cherry Bomb",
    (canvas.width / 2 - textMetrics.width / 2) | 0,
    8,
  );

  last = hrt;
});

// while (!window.destroyed) {
//   const hrt = performance.now();

//   dtAccumulator += hrt - last;
//   variableDt = (hrt - last) / 1000;

//   const keyboardState = sdl.keyboard.getState();

//   if (keyboardState[sdl.keyboard.SCANCODE.ESCAPE]) {
//     window.destroy();

//     break;
//   }

//   input.left = keyboardState[sdl.keyboard.SCANCODE.LEFT];
//   input.right = keyboardState[sdl.keyboard.SCANCODE.RIGHT];
//   input.up = keyboardState[sdl.keyboard.SCANCODE.UP];
//   input.down = keyboardState[sdl.keyboard.SCANCODE.DOWN];

//   context.clearRect(0, 0, canvas.width, canvas.height);

//   while (dtAccumulator >= STEP) {
//     dtAccumulator -= STEP;
//   }

//   for (const system of systems) {
//     system(variableDt);
//   }

//   context.font = "5px PICO-8";
//   context.fillStyle = "#ffffff";
//   context.strokeStyle = "#ffffff";
//   context.lineWidth = 1;

//   const textMetrics = context.measureText("Cherry Bomb");
//   context.fillText(
//     "Cherry Bomb",
//     (canvas.width / 2 - textMetrics.width / 2) | 0,
//     8,
//   );

//   const buffer = canvas.toBuffer("raw");

//   window.render(gameWidth, gameHeight, gameWidth * 4, "bgra32", buffer);

//   await setTimeout(0);

//   last = hrt;
// }
