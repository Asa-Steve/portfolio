import "./Button.css";

const Button = ({
  btnText = "Click Me",
  type,
  color,
  bgColor,
  disable = false,
}) => {
  return (
    <button
      className={type}
      style={{ color: color, backgroundColor: bgColor }}
      disabled={disable}
    >
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
