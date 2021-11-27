import React, { Fragment } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
}
