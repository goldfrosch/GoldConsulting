import React from "react";
import styled from "styled-components";

import {
  ButtonColorMap,
  ButtonThemeColor,
  ButtonThemeSize
} from "styles/Palette";

interface ButtonProps {
  theme: ButtonThemeColor;
  size: ButtonThemeSize;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ theme, size, onClick, children }) => {
  return (
    <ButtonBlock theme={theme} size={size} onClick={onClick}>
      {children}
    </ButtonBlock>
  );
};

const ButtonBlock = styled.button<ButtonProps>`
  background-color: ${props =>
    ButtonColorMap[props.theme as ButtonThemeColor].backgroundColor};
  color: ${props => ButtonColorMap[props.theme as ButtonThemeColor].color};

  border: 1px solid
    ${props => ButtonColorMap[props.theme as ButtonThemeColor].border};

  cursor: pointer;
`;

export default Button;
