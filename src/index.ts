import { FontLibrary, loadImage, Window } from "skia-canvas";

const gameWidth = 128;
const gameHeight = 128;
const scale = 4;

FontLibrary.use("PICO-8", "assets/fonts/pico-8.ttf");

const ship = await loadImage("assets/player-ship.png");

const win = new Window({
  background: "lightskyblue",
  fit: "contain-y",
  title: "Cherry Bomb",
  width: gameWidth * scale,
  height: gameHeight * scale,
});

const { canvas, ctx } = win;

canvas.width = gameWidth;
canvas.height = gameHeight;
// ! This must be done after setting the canvas width and height
// ! Images were blurry if I set this before setting the canvas width and height
ctx.imageSmoothingEnabled = false;

ctx.fillStyle = "black";
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

ctx.font = "5px PICO-8";
ctx.fillStyle = "white";

console.log(ctx);

const textMetrics = ctx.measureText("Cherry Bomb");
ctx.fillText("Cherry Bomb", (canvas.width / 2 - textMetrics.width / 2) | 0, 24);

const textPath = ctx.outlineText("Cherry Bomb");
ctx.fill(textPath.offset((canvas.width / 2 - textMetrics.width / 2) | 0, 32));

ctx.drawImage(
  ship,
  canvas.width / 2 - ship.width / 2,
  canvas.height / 2 - ship.height / 2,
);
