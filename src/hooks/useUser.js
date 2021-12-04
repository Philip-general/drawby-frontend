import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../Apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowers
      totalFollowings
      followHashtags {
        hashtagName
      }
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken
  });
  return { data };
};
export default useUser;
