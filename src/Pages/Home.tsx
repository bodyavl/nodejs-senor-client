import { Link, useNavigate } from "react-router-dom";
import { User } from "../Components/User/User";
import { useGetCustomersQuery } from "../genetated/types";

const Home = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetCustomersQuery({
    variables: {
      take: 3,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error?.message === "Unauthorized") navigate("/login");

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Link to="/login">Log In</Link>
      <br />
      <Link to="/signup">Sign Up</Link>

      {data?.customers.map((customer) => (
        <User key={customer.id} id={customer.id} email={customer.email} />
      ))}
    </>
  );
};

export default Home;
