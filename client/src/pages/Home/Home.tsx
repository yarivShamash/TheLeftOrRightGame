import { FormEventHandler } from "react";
import { useNavigate } from "@tanstack/react-router";

import { FormContainer } from "./styles";
import { UserForm } from "./types";
import { useUser } from "../../providers/UserProvider";

export const Home = () => {
  const navigate = useNavigate();
  const { loading, user, getUser } = useUser();
  console.log("🚀 > Home > user:", user);

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
        <h3>LOADING..</h3>
      ) : (
        <>
          <input placeholder="What's your name?" type="text" name="name" />
          <input type="submit" value="START" />
        </>
      )}
    </FormContainer>
  );
};
