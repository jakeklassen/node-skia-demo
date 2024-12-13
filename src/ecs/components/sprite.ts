import { SpriteLayer } from "../constants.ts";
import { Sprite } from "../entity.ts";

export function spriteFactory(sprite: Sprite): NonNullable<Sprite> {
  return {
    frame: {
      sourceX: sprite.frame.sourceX,
      sourceY: sprite.frame.sourceY,
      width: sprite.frame.width,
      height: sprite.frame.height,
    },
    layer: sprite.layer ?? SpriteLayer.Base,
    opacity: sprite.opacity ?? 1,
    paletteSwaps: sprite.paletteSwaps ?? [],
  };
}
