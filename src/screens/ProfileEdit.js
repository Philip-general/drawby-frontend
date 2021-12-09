import React from "react";
import useUser from "../hooks/useUser";

function ProfileEdit() {
  const { data } = useUser();
  if (data?.me) {
    console.log(data.me);
  }
  return <div>{data?.me?.username}'s profile edit page</div>;
}

export default ProfileEdit;
