import { FormEvent, useState } from "react";
import { useSignUpMutation } from "../genetated/types";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [signUp, { error }] = useSignUpMutation({
    onCompleted: ({ signUp }) => {
      if (signUp.accessToken && signUp.refreshToken) {
        localStorage.setItem("accessToken", signUp.accessToken);
        localStorage.setItem("refreshToken", signUp.refreshToken);
        navigate("/");
      } else {
        localStorage.clear();
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signUp({
      variables: { email, password },
    });
  };

  if (error) return <p>Error : {error.message}</p>;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Signup;
