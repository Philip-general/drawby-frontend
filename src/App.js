import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { client, isLoggedInVar } from "./Apollo";
import Facebook from "./auth/Facebook";
import routes from "./routes";
import Layout from "./Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import SocialSignUp from "./screens/SocialSignUp";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path={routes.home}
              element={
                isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )
              }
            />
            <Route path={routes.FacebookLogin} element={<Facebook />} />
            <Route path={routes.socialSignUp} element={<SocialSignUp />} />
            <Route path={routes.signUp} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
