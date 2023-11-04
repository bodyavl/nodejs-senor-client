import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(signInInput: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomers($take: Int, $skip: Int, $where: WhereCustomerInput) {
    customers(data: { take: $take, skip: $skip, where: $where }) {
      id
      email
      role
    }
  }
`;
