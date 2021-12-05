import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

const TOKEN = "authorization";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = token => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = history => {
  localStorage.removeItem(TOKEN);
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

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin"
  // fetchOptions: {
  //   method: "POST"
  // }
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql"
// });

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

// const wsLink = new WebSocketLink({
//   uri: "ws:http://localhost:4000/graphql"
// });

//http header로 보내기 위해서 사용
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``
    }
  };
});

// websocket이 필요한가 체크하여 wsLink, httpLink 중 하나 선택
// const requestLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// // 현재 입력된 객체가 파일인지 아닌지 확인
// const isFile = value => {
//   if (isPlainObject(value))
//     return Object.values(value).map(isFile).includes(true);
//   const isfile = typeof File !== "undefined" && value instanceof File;
//   const isblob = typeof Blob !== "undefined" && value instanceof Blob;
//   return isfile || isblob;
// };

// // 확인된 객체가 파일이라면 uploadLink를, 아니라면 requestLink 선택
// const isUpload = ({ variables }) => Object.values(variables).some(isFile);
// const terminalLink = split(isUpload, uploadLink, requestLink);

// // 최종 결정된 terminalLink와 authLink를 합하여 link로 보냄.
// const link = ApolloLink.from([authLink, terminalLink]);

export const client = new ApolloClient({
  // link,
  link: authLink.concat(onErrorLink).concat(uploadLink),
  // link: authLink.concat(httpLink).concat(onErrorLink),
  cache: new InMemoryCache()
});
