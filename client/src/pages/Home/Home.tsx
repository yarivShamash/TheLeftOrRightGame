import { FormEventHandler } from "react";
import { useNavigate } from "@tanstack/react-router";

import { FormContainer, Input, LoadingTitle, SubmitButton } from "./styles";
import { UserForm } from "./types";
import { useUser } from "../../providers/UserProvider";

export const Home = () => {
  const navigate = useNavigate();
  const { loading, getUser } = useUser();

  const handleSubmit: FormEventHandler<UserForm> = async (e) => {
    e.preventDefault();

    try {
      // @ts-expect-error This is expected due to the structure of the event object.
      await getUser(e.target.name.value);
      navigate({ to: "/game" });
    } catch (error) {
      console.error("error getting user:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {loading ? (
        <LoadingTitle>LOADING..</LoadingTitle>
      ) : (
        <>
          <Input placeholder="Hey, what's your name?" type="text" name="name" />
          <SubmitButton type="submit" value="START" />
        </>
      )}
    </FormContainer>
  );
};
