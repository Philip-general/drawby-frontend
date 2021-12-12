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
import Upload from "./screens/Upload";
import UserProfile from "./screens/UserProfile";
import GridPictures from "./screens/GridPictures";
import ProfileEdit from "./screens/ProfileEdit";
import Test from "./screens/infiniteTest";
import ContestFeed from "./screens/ContestFeed";

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
                    {"#f1f2f3"}
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
            <Route path={routes.uploadPhoto} element={<Upload />} />
            <Route
              path={routes.profile}
              element={
                <Layout>
                  {"#fff"}
                  <UserProfile />
                </Layout>
              }
            />
            <Route
              path={routes.editProfile}
              element={
                <Layout>
                  {"#fff"}
                  <ProfileEdit />
                </Layout>
              }
            />
            <Route path={`/test`} element={<Test />} />
            <Route
              path={routes.hashtag}
              element={
                <Layout>
                  {"#f1f2f3"}
                  <GridPictures />
                </Layout>
              }
            />
            <Route
              path={routes.contest}
              element={
                <Layout>
                  {"#f1f2f3"}
                  <ContestFeed />
                </Layout>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
