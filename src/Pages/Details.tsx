import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerQuery } from "../genetated/types";
import DetailedUser from "../Components/DetailedUser/DetailedUser";
import { Link } from "react-router-dom";

const Details = () => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const { loading, error, data } = useGetCustomerQuery({
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error?.message === "Unauthorized") navigate("/login");

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Link to="/">Home</Link>
      <DetailedUser
        id={data?.customer.id}
        email={data?.customer.email}
        role={data?.customer.role}
        createdAt={new Date(data?.customer.createdAt).toISOString()}
        updatedAt={new Date(data?.customer.updatedAt).toISOString()}
      />
    </>
  );
};

export default Details;
