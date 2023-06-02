import { absurd } from "fp-ts/function";

export enum Step {
  start = 0,
  second = 1,
  specialSilver = 2,
  forth = 3,
  unlockTime = 4,
  fifth = 5,
  sixth = 6,
  goForward = 7,
  goBack = 8,
  unlockAddress = 9,
  tenth = 10,
  specialGolden = 11,
  last = 12,
}

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Playing {
  kind: "playing";
}

interface End {
  kind: "end";
}
interface Tooltip {
  kind: "tooltip";
}

export type State = Tooltip | Playing | End;

export const foldState =
  <T>(fns: { onPlaying: () => T; onEnd: () => T; onTooltip: () => T }) =>
  (s: State): T => {
    switch (s.kind) {
      case "playing": {
        return fns.onPlaying();
      }
      case "end": {
        return fns.onEnd();
      }
      case "tooltip": {
        return fns.onTooltip();
      }
      default:
        return absurd(s);
    }
  };

export type Item = "golden" | "silver" | "time" | "address";

interface Rolling {
  kind: "Rolling";
}
interface Walking {
  kind: "Walking";
}

interface Collecting {
  kind: "Collecting";
}

interface SpecialThing {
  kind: "SpecialThing";
}

export type GameState = Rolling | Walking | Collecting | SpecialThing;

export const foldGameState =
  <T>(fns: {
    onRolling: () => T;
    onWalking: () => T;
    onCollecting: () => T;
    onSpecialThing: () => T;
  }) =>
  (s: GameState): T => {
    switch (s.kind) {
      case "Rolling": {
        return fns.onRolling();
      }
      case "Walking": {
        return fns.onWalking();
      }
      case "Collecting": {
        return fns.onCollecting();
      }
      case "SpecialThing": {
        return fns.onSpecialThing();
      }

      default:
        return absurd(s);
    }
  };
