import { playAudio } from "./audio";

interface ButtonProps {
  onClick: () => void;
  text: string;
}
export const Button = ({ onClick, text }: ButtonProps): JSX.Element => (
  <button
    style={{
      padding: "0.5rem 0",
      backgroundColor: "#F9D03E",
      border: "transparent",
      width: "100%",
      minHeight: "60px",
    }}
    onClick={() => {
      onClick();
      playAudio("click");
    }}
  >
    {text}
  </button>
);
