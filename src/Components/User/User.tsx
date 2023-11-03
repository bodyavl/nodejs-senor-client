import { FC } from "react";

interface UserProps {
  id: number;
  email: string;
  role: string;
}

export const User: FC<UserProps> = ({ id, email, role }) => {
  return (
    <>
      <h2>
        {id} {email}
      </h2>
      <h4>Role: {role}</h4>
      <br />
    </>
  );
};
