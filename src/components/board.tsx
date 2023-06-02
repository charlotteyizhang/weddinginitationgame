import React, { Children, useEffect, useRef, useState } from "react";
import { GameState, Item, Step } from "../attributes";
import {
  Calendar,
  Chest,
  GoBack,
  Golden,
  Resort,
  Rocket,
  Silver,
} from "../images/SVG";
import * as RX from "rxjs";
import { pipe } from "fp-ts/lib/function";
import { playAudio } from "./audio";

interface BoardProps {
  step: Step;
  newItem$: RX.Subject<Item>;
  currentStep$: RX.BehaviorSubject<Step>;
  gameState$: RX.BehaviorSubject<GameState>;
  children: React.ReactNode;
}
export const Board = ({
  currentStep$,
  step,
  newItem$,
  children,
  gameState$,
}: BoardProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  const [specialThing] = useState(getSpecialThing(step));

  const [collected, setCollected] = useState(false);

  useEffect(() => {
    const sub = currentStep$.subscribe({
      next: (currentStep) => {
        const isSelected = currentStep === step;
        setIsSelected(isSelected);

        if (specialThing !== null) {
          const collectItem = (_it: Item) => {
            setCollected(true);
            newItem$.next(_it);
            playAudio("unlock");
          };
          if (isSelected && specialThing !== null) {
            gameState$.next({ kind: "SpecialThing" });
            const it = specialThing.item;
            if (it !== null && !collected) {
              collectItem(it);
            }
          } else if (
            specialThing.item === "time" ||
            specialThing.item === "address"
          ) {
            if (currentStep > step && !collected) {
              collectItem(specialThing.item);
            }
          }
        }
        gameState$.next({ kind: "Rolling" });
      },
    });
    return () => sub.unsubscribe();
  }, [collected]);

  return (
    <g style={{ opacity: isSelected ? 1 : 0.8 }}>
      {children}
      {!collected && specialThing?.pic}
    </g>
  );
};

interface SpecialThing {
  item: Item | null;
  pic: JSX.Element;
}

const getSpecialThing = (step: Step): SpecialThing | null => {
  switch (step) {
    case Step.specialSilver: {
      return {
        item: "silver",
        pic: <Silver scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.goForward: {
      return {
        item: null,
        pic: <Rocket scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.specialGolden: {
      return {
        item: "golden",
        pic: <Golden scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.unlockAddress: {
      return {
        item: "address",
        pic: <Resort scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.goBack: {
      return {
        item: null,
        pic: <></>,
        // pic: <GoBack scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.unlockTime: {
      return {
        item: "time",
        pic: <Calendar scale={1} translateX={0} translateY={0} />,
      };
    }
    case Step.last: {
      return {
        item: null,
        pic: <Chest scale={1} translateX={0} translateY={0} />,
      };
    }
    default: {
      return null;
    }
  }
};
