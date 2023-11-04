import { useEffect } from "react";
import { User } from "./Components/User/User";
import { useGetCustomersQuery, useSignInMutation } from "./genetated/types";

function App() {
  const [signIn, { data: loginData, error: loginError }] = useSignInMutation();

  const { loading, error, data } = useGetCustomersQuery({
    variables: {
      take: 3,
    },
  });

  useEffect(() => {
    async function init() {
      await signIn({
        variables: { email: "test2@email.com", password: "test" },
      });

      if (loginData?.signIn.accessToken)
        localStorage.setItem("accessToken", loginData?.signIn.accessToken);
    }
    init();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (loginError) return <p>Error : {loginError.message}</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {data?.customers.map((customer) => (
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
