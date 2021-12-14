import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const INFINITE_TEST_QUERY = gql`
  query infiniteTest($skip: Int!, $take: Int!) {
    infiniteTest(skip: $skip, take: $take) {
      id
      file
      name
    }
  }
`;

const Picture = styled.img`
  height: 400px;
  width: 400px;
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
      {!loading && data && data.infiniteTest && (
        <InfiniteScroll
          dataLength={data.infiniteTest.length}
          next={onLoadMore}
          hasMore={true}
        >
          {data.infiniteTest.map(test => (
            <Picture src={test.file} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Test;

{
  /* <button onClick={onLoadMore}>더 불러오기</button>
      <div>
        {data?.infiniteTest?.map(test => (
          <Picture src={test.file} />
        ))}
      </div> */
}
