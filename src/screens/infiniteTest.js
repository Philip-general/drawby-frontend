import { gql, useQuery } from "@apollo/client";
import React from "react";

const INFINITE_TEST_QUERY = gql`
  query infiniteTest($skip: Int!, $take: Int!) {
    infiniteTest(skip: $skip, take: $take) {
      id
      payload
    }
  }
`;

function Test() {
  const { data, loading, refetch, fetchMore } = useQuery(INFINITE_TEST_QUERY, {
    variables: { skip: 0, take: 5 }
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.infiniteTest.length,
        take: 5
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          infiniteTest: [...prev.infiniteTest, ...fetchMoreResult.infiniteTest]
        });
      }
    });
  };

  return (
    <div>
      <button onClick={onLoadMore}>더 불러오기</button>
      {data?.infiniteTest?.map(test => (
        <div key={test.id}>{test.payload}</div>
      ))}
    </div>
  );
}

export default Test;
