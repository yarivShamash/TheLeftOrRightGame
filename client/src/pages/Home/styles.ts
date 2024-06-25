import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  height: 100vh;
`;

export const Input = styled.input`
  font-size: 2rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 1rem;
  text-align: center;
`;

export const SubmitButton = styled.input`
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

export const LoadingTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: #f600ff;
`;
