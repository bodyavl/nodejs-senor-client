import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  GraphQLRequest,
  Observable,
  FetchResult,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { JwtTokens } from "./interfaces/index.ts";
import { REFRESH_TOKENS } from "./operations.ts";
import { GraphQLError } from "graphql";

function isRefreshRequest(operation: GraphQLRequest) {
  return operation.operationName === "refreshTokens";
}

function returnTokenDependingOnOperation(operation: GraphQLRequest) {
  if (isRefreshRequest(operation))
    return localStorage.getItem("refreshToken") || "";
  else return localStorage.getItem("accessToken") || "";
}

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const authLink = setContext((operation, { headers }) => {
  const token = returnTokenDependingOnOperation(operation);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            // ignore 401 error for a refresh request
            if (operation.operationName === "refreshTokens") return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const { accessToken } = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshTokens: JwtTokens;
    }>({
      mutation: REFRESH_TOKENS,
    });

    const accessToken = refreshResolverResponse.data?.refreshTokens.accessToken;
    const refreshToken =
      refreshResolverResponse.data?.refreshTokens.refreshToken;

    localStorage.setItem("accessToken", accessToken || "");
    localStorage.setItem("refreshToken", refreshToken || "");

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    console.log();
    // localStorage.clear();
    throw err;
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
