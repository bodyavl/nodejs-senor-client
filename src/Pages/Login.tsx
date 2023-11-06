import { FormEvent, useState } from "react";
import { useSignInMutation } from "../genetated/types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [signIn, { error }] = useSignInMutation({
    onCompleted: ({ signIn }) => {
      if (signIn.accessToken && signIn.refreshToken) {
        localStorage.setItem("accessToken", signIn.accessToken);
        localStorage.setItem("refreshToken", signIn.refreshToken);
        navigate("/");
      } else {
        localStorage.clear();
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn({
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

export default Login;
