import { canvas } from "./Canvas.esm.js";

/**
 * @typedef {{ x: number, y: number}} offset
 */

/**
 * Class for creating Sprite object
 */
export class Sprite {
  /**
   * Create sprite object
   * @param {!number} spriteX
   * @param {!number} spriteY
   * @param {!number} width
   * @param {!number} height
   * @param {!CanvasImageSource} spritesImage
   * @param {!number} x
   * @param {!number} y
   * @param {number} numberOfSprites
   * @param {offset} offset
   */
  constructor(
    spriteX,
    spriteY,
    width,
    height,
    spritesImage,
    x,
    y,
    numberOfSprites = 1,
    offset = { x: 0, y: 0 }
  ) {
    /**
     * @type {!number}
     */
    this.alpha = 255;
    this.height = height;
    this.width = width;
    this.offset = offset;
    this.numberOfSprites = numberOfSprites;
    this.spritesImage = spritesImage;
    this.spriteStartX = spriteX;
    this.spriteStartY = spriteY;
    this.x = x;
    this.y = y;
  }

  /**
   * Method draw sprite into the canvas context
   * @param {number} [numberOfSprites = 0] Number of index sprite to draw
   * @param {number} [ratio = 1] Scale if it is diffrent than 1
   */
  draw(numberOfSprites = 0, ratio = 1) {
    if (numberOfSprites > this.numberOfSprites) {
      return;
    }
    if (this.alpha !== 255) {
      canvas.context.globalAlpha = this.alpha / 255;
    }

    const startPointToDrawX = numberOfSprites * this.width + this.spriteStartX;

    canvas.context.drawImage(
      this.spritesImage,
      startPointToDrawX,
      this.spriteStartY,
      this.width,
      this.height,
      this.x + this.offset.x,
      this.y + this.offset.y,
      this.width * ratio,
      this.height * ratio
    );

    if (this.alpha !== 255) {
      canvas.context.globalAlpha = 1;
    }
  }

  checkCollisionWithAnotherSprite(vector, anotherSprite) {
    const [collisionPointX, collisionPointY] = this.getProperlyCollisionPoints(
      vector
    );

    if (
      anotherSprite.x < collisionPointX &&
      collisionPointX < anotherSprite.x + anotherSprite.width &&
      anotherSprite.y < collisionPointY &&
      collisionPointY < anotherSprite.y + anotherSprite.height
    ) {
      return true;
    }
    return false;
  }

  getProperlyCollisionPoints(vector) {
    const collisionPointX = vector.dx < 0 ? this.x : this.x + this.width;
    const collisionPointY = vector.dy < 0 ? this.y : this.y + this.height;

    return [collisionPointX, collisionPointY];
  }
}
