import { World } from "objecs";
import { Window } from "skia-canvas";
import type { Entity } from "../entity.ts";

type StarfieldRenderingSystemOptions = {
  world: World<Entity>;
  context: Window["ctx"];
};

export function starfieldRenderingSystemFactory({
  world,
  context,
}: StarfieldRenderingSystemOptions) {
  const stars = world.archetype("star", "transform");

  return function starfieldRenderingSystem() {
    for (const { star, transform } of stars.entities) {
      context.globalAlpha = 1;

      context.translate(transform.position.x | 0, transform.position.y | 0);
      context.rotate(transform.rotation);
      context.scale(transform.scale.x, transform.scale.y);

      context.fillStyle = star.color;

      context.fillRect(0, 0, 1, 1);

      context.globalAlpha = 1;
      context.resetTransform();
    }
  };
}
