export enum Palette {
  black="#000000",
  white="#FFFFFF",
}

interface ButtonColorProperty {
  backgroundColor: Palette;
  color: Palette;
  border: Palette;
};

interface ButtonSizeProperty {
  width: string,
  height: string,
  fontSize: string,
  radius: string,
}

export enum ButtonThemeColor {
  first="first"
}

export enum ButtonThemeSize {
  small="small",
}

export const ButtonColorMap: {[key in ButtonThemeColor]: ButtonColorProperty} = {
  first: {
    backgroundColor: Palette.white,
    color: Palette.black,
    border: Palette.black,
  }
}

export const ButtonSizeMap: {[key in ButtonThemeSize]: ButtonSizeProperty} = {
  small: {
    width: "24px",
    height: "16px",
    fontSize: "16px",
    radius: "50%",
  }
}