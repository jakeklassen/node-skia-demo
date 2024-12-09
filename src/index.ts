import { Window } from "skia-canvas";

let win = new Window({ background: "olive", fit: "contain-y" });
console.log(win.ctx === win.canvas.getContext("2d"));

let { canvas, ctx } = win;
ctx.fillStyle = "lightskyblue";
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
