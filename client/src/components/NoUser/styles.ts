import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { primaryButtonStyle } from "../PrimaryButton";

export const NoUserLink = styled(Link)`
  ${primaryButtonStyle}
  text-decoration: none;
`;
