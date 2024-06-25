import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Theme as RadixTheme } from "@radix-ui/themes";

import { Flex } from "@radix-ui/themes";
import styled from "styled-components";
import { UserProvider } from "../providers/UserProvider";

export const PageContainer = styled(Flex)`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #4e5da0, #010513);
`;

export const Route = createRootRoute({
  component: () => (
    <RadixTheme>
      <UserProvider>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </UserProvider>
    </RadixTheme>
  ),
});
