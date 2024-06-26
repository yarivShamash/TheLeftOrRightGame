import { FormEventHandler, useState } from "react";
// import { useNavigate } from "@tanstack/react-router";

import { FormContainer, Input, LoadingTitle, SubmitButton } from "./styles";
import { UserForm } from "./types";
import { useUser } from "../../providers/UserProvider";

export const Home = () => {
  // const navigate = useNavigate();
  const { loading, getUser } = useUser();
  const [userName, setUserName] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit: FormEventHandler<UserForm> = async (e) => {
    e.preventDefault();
    // @ts-expect-error This is expected due to the structure of the event object.
    const userName = e.target.name.value;

    if (!userName) return;

    try {
      await getUser(userName);
      // navigate({ to: "/game" });
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
          <Input
            placeholder="Hey, what's your name?"
            type="text"
            name="name"
            value={userName}
            onChange={handleUserNameChange}
          />
          <SubmitButton type="submit" value="START" disabled={!userName} />
        </>
      )}
    </FormContainer>
  );
};
