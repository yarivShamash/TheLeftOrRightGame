import { Box, Heading } from "@radix-ui/themes";
import styled from "styled-components";

interface ResultBannerProps {
  $success: boolean;
}

export const ResultBanner = styled(Box)<ResultBannerProps>`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  background-color: ${({ $success }) => ($success ? "green" : "red")};
`;

export const ResultText = styled(Heading)`
  font-size: 2rem;
  background: transparent;
`;
