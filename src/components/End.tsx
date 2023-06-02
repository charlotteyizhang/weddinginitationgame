import { useEffect, useState } from "react";
import { Position, State, Step } from "../attributes";
import { Head } from "../images/SVG";
import * as RX from "rxjs";
import photoInvite from "../images/photos/invitation.png";
import { Button } from "./GoBackButton";
import { motion } from "framer-motion";
import { playAudio } from "./audio";

interface EndProps {
  state$: RX.BehaviorSubject<State>;
}
export const End = ({ state$ }: EndProps): JSX.Element => {
  useEffect(() => {
    playAudio("final");
  }, []);
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        padding: "1rem",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "bounce",
          bounce: 0.4,
          duration: 0.8,
        },
      }}
    >
      <div>
        <p style={{ fontSize: "1rem", textAlign: "center" }}>
          恭喜你解锁了时间地点！
        </p>
        <p style={{ fontSize: "1rem", textAlign: "center" }}>
          欢迎来我们的婚礼！
        </p>
      </div>
      <div style={{ flex: 1, alignItems: "center" }}>
        <img src={photoInvite} width="100%" alt="pic3" />
      </div>
      <Button
        text="重玩一次"
        onClick={() => state$.next({ kind: "playing" })}
      />
    </motion.div>
  );
};
