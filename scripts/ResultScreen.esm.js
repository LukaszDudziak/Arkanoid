import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { mainMenu } from "./MainMenu.esm.js";
import { canvas } from "./Canvas.esm.js";
import { userData } from "./UserData.esm.js";
import { levelSelect } from "./LevelSelect.esm.js";
import { GameState } from "./GameState.esm.js";
import { game } from "./Game.esm.js";

const RESULT_SCREEN_GAME_WIN_CLASS = "end-screen--is-win";
const RESULT_SCREEN_END_SCREEN_ID = "js-end-screen";
const RESULT_SCREEN_HEADER_ID = "js-game-result";
const RESULT_SCREEN_BACK_BUTTON_ID = "js-back-to-levels";
const RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID = "js-restart-level";

//obsługa okna zakończenia gry
class ResultScreen extends Common {
  constructor() {
    super(RESULT_SCREEN_END_SCREEN_ID);
    this.bindToElements();
  }
  //standardowe przypisanie do elementów dom
  bindToElements() {
    this.resultTextElement = this.bindToElement(RESULT_SCREEN_HEADER_ID);

    const backButtonElement = this.bindToElement(RESULT_SCREEN_BACK_BUTTON_ID);
    const restartButtonElement = this.bindToElement(
      RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID
    );

    backButtonElement.addEventListener("click", () => this.backButtonClick());
    restartButtonElement.addEventListener("click", () =>
      this.restartLevelClick()
    );
  }

  //wyświetlenie screena
  viewResultScreen(isGameWin) {
    //zależnego od wygranej/przegranej
    if (isGameWin) {
      this.element.classList.add(RESULT_SCREEN_GAME_WIN_CLASS);
    } else {
      this.element.classList.remove(RESULT_SCREEN_GAME_WIN_CLASS);
    }
    //wyświetlonko
    this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
    this.resultTextElement.textContent = isGameWin ? "WYGRAŁEŚ" : "PRZEGRAŁEŚ";
  }

  backButtonClick() {
    this.changeVisibilityScreen(canvas.element, HIDDEN_SCREEN);
    this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
    this.changeVisibilityScreen(
      mainMenu.miniSettingsLayerElement,
      HIDDEN_SCREEN
    );
    mainMenu.showLevelScreen();
  }

  restartLevelClick() {
    this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
    levelSelect.loadLevel(game.gameState.level);
  }
}

export const resultScreen = new ResultScreen();
