import { styled } from "@mui/material/styles";
import RawButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup";

export const ButtonGroup = styled(RawButtonGroup)`
margin: ${({theme}) => theme.spacing(0, 1)};
` as React.ComponentType<ButtonGroupProps>;
  