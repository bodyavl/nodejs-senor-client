import { FC } from "react";
import { Role } from "../../types";

interface IDetailedUserProps {
  id?: string;
  email?: string;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}

const DetailedUser: FC<IDetailedUserProps> = ({
  id,
  email,
  role,
  createdAt,
  updatedAt,
}) => {
  return (
    <>
      <h2>
        Id: {id}
        <br />
        <br />
        Email: {email}
      </h2>
      <p>
        Role: {role}
        <br />
        Created At: {createdAt}
        <br />
        Updated At: {updatedAt}
      </p>
      <br />
    </>
  );
};

export default DetailedUser;
