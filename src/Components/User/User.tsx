import { FC } from "react";
import { Link } from "react-router-dom";

interface UserProps {
  id: string;
  email: string;
}

export const User: FC<UserProps> = ({ id, email }) => {
  return (
    <>
      <h2>
        <Link to={`/details/${id}`}>{id}</Link>
        <br />
        {email}
      </h2>
    </>
  );
};
