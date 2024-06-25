import styled from "styled-components";

export const primaryButtonStyle = `
  font-size: 2rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 1rem;
  background: #00ff56;
  color: #f600ff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: grey;
    color: white;
  }
`;

export const SubmitButton = styled.input`
  ${primaryButtonStyle}
`;
