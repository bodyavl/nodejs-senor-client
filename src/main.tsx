import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiZDA5ODY4N2MtMTBmMS00MzFlLTgwMTctMzU1M2QzMmRjODdjIiwiZW1haWwiOiJ0ZXN0MkBlbWFpbC5jb20iLCJpYXQiOjE2OTkwNDI4ODcsImV4cCI6MTY5OTA0NjQ4N30.nXl_Q0MkWDijYdVjK2Lzahomm7evpg_wZm0mPTa8F6c",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
