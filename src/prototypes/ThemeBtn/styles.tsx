import { styled } from "@mui/material/styles";
import RawButtonGroup from "@mui/material/ButtonGroup";

export const ButtonGroup = styled(RawButtonGroup)`
  height: fit-content;
	margin: ${({ theme }) => theme.spacing(0, 1)};
`;
