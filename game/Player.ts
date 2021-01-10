import game_settings from "./game_settings";

export enum PlayerStatus {
  Alive = 1,
  Dead,
}

export default class Player {
  name: string;
  daysSinceLastEaten: number;
  status: PlayerStatus;

  constructor(name: string) {
    this.name = name;
    this.daysSinceLastEaten = 0;
    this.status = PlayerStatus.Alive;
  }

  /** Called at the end of each day to modify the player status given the events
   * that occurred.
   */
  updatePlayerState(eaten: boolean) {
    if (this.status === PlayerStatus.Dead) {
      throw Error("Cannot update player status of dead player");
    }

    if (eaten) {
      this.daysSinceLastEaten = 0;
    } else {
      this.daysSinceLastEaten += 1;
    }

    // check for death condition
    if (this.daysSinceLastEaten >= game_settings.daysToStarvation) {
      this.status = PlayerStatus.Dead;
    }
  }
}
