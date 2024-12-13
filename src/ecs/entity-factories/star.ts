import { World } from "objecs";
import { rndFromList } from "../../lib/array.ts";
import { rndInt } from "../../lib/math.ts";
import { Pico8Colors } from "../constants.ts";
import type { Entity } from "../entity.ts";

type StarFactoryOptions = {
  position: NonNullable<Entity["transform"]>["position"];
  world: World<Entity>;
};

/**
 *
 * @param {StarFactoryOptions} options
 */
export function starFactory({ position, world }: StarFactoryOptions) {
  const entity = world.createEntity({
    direction: {
      x: 0,
      y: 1,
    },
    star: {
      color: Pico8Colors.Color7,
    },
    transform: {
      position,
      rotation: 0,
      scale: {
        x: 1,
        y: 1,
      },
    },
    velocity: {
      x: 0,
      y: rndFromList([60, 30, 20]),
    },
  });

  // Adjust star color based on velocity
  if (entity.velocity.y < 30) {
    entity.star.color = Pico8Colors.Color1;
  } else if (entity.velocity.y < 60) {
    entity.star.color = Pico8Colors.Color13;
  }
}

type StarfieldFactoryOptions = {
  areaWidth: number;
  areaHeight: number;
  count: number;
  world: World<Entity>;
};

/**
 * @param {StarfieldFactoryOptions} options
 */
export function starfieldFactory({
  areaHeight,
  areaWidth,
  count,
  world,
}: StarfieldFactoryOptions) {
  for (let i = 0; i < count; i++) {
    starFactory({
      position: {
        x: rndInt(areaWidth, 1),
        y: rndInt(areaHeight, 1),
      },
      world,
    });
  }
}
