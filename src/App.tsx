import { css, cx } from "@emotion/css";
import { pipe } from "fp-ts/function";
import { useEffect, useState } from "react";
import * as RX from "rxjs";
import { foldState, State } from "./attributes";
import { End } from "./components/End";
import { Game } from "./components/Game";
import photoTooltip from "./images/photos/startGame.jpg";
import { playAudio } from "./components/audio";

const App = () => {
  const [state$] = useState(
    () => new RX.BehaviorSubject<State>({ kind: "tooltip" })
  );

  const [state, setState] = useState<State>({ kind: "tooltip" });

  useEffect(() => {
    const sub = state$.subscribe({ next: setState });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#FFF6D7",
      })}
    >
      {pipe(
        state,
        foldState({
          onTooltip: () => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100vh",
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "1rem" }}>掷骰子，走过棋盘解锁婚礼请帖</p>
                <p style={{ fontSize: "1rem" }}>
                  如果走到奖券地点，还可以有额外奖励哦！
                </p>
              </div>
              <div style={{ flex: 1, alignItems: "center" }}>
                <img src={photoTooltip} width="100%" alt="picTooltip" />
              </div>
              <div
                className={cx(styles.buttonContainer, css({ width: "100%" }))}
              >
                <button
                  className={cx(
                    styles.buttons,
                    css({
                      backgroundColor: "#F9D03E",
                      border: "#9A7F1E",
                    })
                  )}
                  onClick={() => {
                    setState({ kind: "playing" });
                    playAudio("click");
                  }}
                >
                  开始游戏
                </button>
                <button
                  className={cx(
                    styles.buttons,
                    css({
                      backgroundColor: "#6DB284",
                      border: "#285537",
                    })
                  )}
                  onClick={() => {
                    setState({ kind: "end" });
                    playAudio("click");
                  }}
                >
                  直接看请帖
                </button>
              </div>
            </div>
          ),
          onPlaying: () => (
            <>
              <Game state$={state$} />
              <div className={styles.buttonContainer}>
                <button
                  className={cx(
                    styles.buttons,
                    css({
                      backgroundColor: "#F9D03E",
                      border: "#9A7F1E",
                    })
                  )}
                  onClick={() => setState({ kind: "playing" })}
                >
                  再来一次
                </button>
                <button
                  className={cx(
                    styles.buttons,
                    css({
                      backgroundColor: "#6DB284",
                      border: "#285537",
                    })
                  )}
                  onClick={() => setState({ kind: "end" })}
                >
                  直接看请帖
                </button>
              </div>
            </>
          ),
          onEnd: () => <End state$={state$} />,
        })
      )}
    </div>
  );
};

const styles = {
  buttons: css({
    padding: "0.5rem",
    borderWidth: 2,
    borderRadius: "8px",
  }),
  buttonContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
  }),
};

export default App;
