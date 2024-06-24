import { FormEventHandler, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import api from "../../axiosconfig";
import { FormContainer } from "./styles";

interface UserForm extends HTMLFormElement {
  name: string;
}
export const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<UserForm> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await api.post("/user", {
        headers: { "Content-Type": "application/json" },
        // @ts-expect-error This is expected due to the structure of the event object.
        name: e.target.name.value,
      });

      if (response.status === 200) {
        setIsLoading(false);
        navigate({ to: "/game" });
      } else {
        setIsLoading(false);
        console.error("Error saving name:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network error:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {isLoading ? (
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
