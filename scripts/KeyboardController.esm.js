export const KEY_CODE_LEFT = "ArrowLeft";
export const KEY_CODE_PAUSE = "Space";
export const KEY_CODE_RIGHT = "ArrowRight";

class KeyboardController {
  constructor() {
    this.clickedKey = null;
    window.addEventListener(
      "keydown",
      (event) => (this.clickedKey = event.code)
    );
  }
}

export const keyboardController = new KeyboardController();
