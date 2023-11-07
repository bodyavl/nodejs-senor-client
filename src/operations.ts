import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(signInInput: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(signUpInput: { email: $email, password: $password }) {
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
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($id: String!, $email: String) {
    customer(data: { id: $id, email: $email }) {
      id
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export const REFRESH_TOKENS = gql`
  mutation refreshTokens {
    refreshTokens {
      accessToken
      refreshToken
    }
  }
`;
