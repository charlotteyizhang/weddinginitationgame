const sounds = {
  click: new Audio(require("../sounds/click.mp3")),
  unlock: new Audio(require("../sounds/unlock.mp3")),
  walk: new Audio(require("../sounds/walk.mp3")),
  final: new Audio(require("../sounds/final.mp3")),
} as const;

type SoundsKey = keyof typeof sounds;

export const playAudio = (key: SoundsKey) => {
  sounds[key].play();
};
