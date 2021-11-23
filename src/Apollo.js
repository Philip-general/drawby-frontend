import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "authorization";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = token => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = history => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
  isLoggedInVar(false);
};
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const darkModeOn = () => {
  localStorage.setItem(DARK_MODE, "on");
  darkModeVar(true);
};

export const darkModeOff = () => {
  localStorage.setItem(DARK_MODE, "");
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

//http header로 보내기 위해서 사용
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
