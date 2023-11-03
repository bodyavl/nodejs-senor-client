import { useState } from "react";
import { ICustomer } from "./interfaces";
import { useQuery, gql } from "@apollo/client";
import { User } from "./Components/User/User";
import { setContext } from "@apollo/client/link/context";

const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers(data: { take: 3 }) {
      id
      email
      role
    }
  }
`;

function App() {
  const [customers, setCustomers] = useState<ICustomer[]>();

  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {data.customers.map((customer: ICustomer) => (
        <User
          key={customer.id}
          id={customer.id}
          email={customer.email}
          role={customer.role}
        />
      ))}
    </>
  );
}

export default App;
