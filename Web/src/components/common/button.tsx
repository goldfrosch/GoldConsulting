import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import {
  ButtonColorMap,
  ButtonThemeColor,
  ButtonThemeSize
} from "styles/Palette";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: ButtonThemeColor;
  size: ButtonThemeSize;
}

function Button({ theme, size, children, ...props }: ButtonProps) {
  return (
    <ButtonBlock theme={theme} size={size} {...props}>
      {children}
    </ButtonBlock>
  );
}

const ButtonBlock = styled.button<ButtonProps>`
  background-color: ${props =>
    ButtonColorMap[props.theme as ButtonThemeColor].backgroundColor};
  color: ${props => ButtonColorMap[props.theme as ButtonThemeColor].color};

  border: 1px solid
    ${props => ButtonColorMap[props.theme as ButtonThemeColor].border};

  cursor: pointer;
`;

export default Button;
