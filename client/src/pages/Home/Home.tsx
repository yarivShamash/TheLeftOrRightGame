import { FormEventHandler } from "react";
import { FormContainer } from "./styles";
import { useNavigate } from "@tanstack/react-router";

interface UserForm extends HTMLFormElement {
  name: string;
}
export const Home = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<UserForm> = (e) => {
    e.preventDefault();
    // @ts-expect-error This is expected due to the structure of the event object.
    console.log(e.target.name.value);
    navigate({ to: "/game" });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input placeholder="What's your name?" type="text" name="name" />
      <input type="submit" value="START" />
    </FormContainer>
  );
};
