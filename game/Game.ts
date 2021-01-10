import Player, { PlayerStatus } from './Player';

import game_settings from "./game_settings";

enum GameState {
  Lobby = 1, // waiting for all players to join
  RoleAssignment, // assign roles to all players
  TaskSelection, // waiting for players choose their tasks for the day
  WatcherSelection, // the watcher selects what task they want to watch
  SendResults, // tell the watcher what they requested, and send results of the day to players
  FoodRationing, // players vote on who gets to eat
  UpdatePlayerState, // update if players starve to death
  UpdateGameState, // update the game state for win conditions
  TraitorWin, // Traitor wins the game
  InnocentsWin // Innocents win the game
}

interface DayEvents {
  successfulEscape: boolean
}

class Game {
  currentState: GameState;
  amtOfFood: number;
  totalSuccessfulEscapes: number;
  players: Player[]

  constructor() {
    this.currentState = GameState.Lobby;
    this.amtOfFood = 0;
    this.totalSuccessfulEscapes = 0;
    this.players = [];
  }

  /** Add a player to the game with the given name */
  addPlayer(name: string) {
    const newPlayer = new Player(name);
    this.players.push(newPlayer);
  }

  /** Called at the end of each day to update state and check for win conditions */
  updateGameStatus(today: DayEvents) {
    if (today.successfulEscape) {
      this.totalSuccessfulEscapes += 1;
    }

    const innocentsWinCondition = this.totalSuccessfulEscapes >= game_settings.escapesToVictory;
    if (innocentsWinCondition) {
      this.currentState = GameState.InnocentsWin;
    }

  }

  
}