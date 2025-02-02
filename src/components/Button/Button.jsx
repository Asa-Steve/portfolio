import "./Button.css";

const Button = ({ btnText = "Click Me", type, color, bgColor }) => {
  return (
    <button className={type} style={{ color: color, backgroundColor: bgColor }}>
      <span>{btnText}</span>
    </button>
  );
};

export default Button;
