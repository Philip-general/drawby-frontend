import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 300px;
`;

function Test() {
  const testStr =
    "30자입니다. 이 글은 30자입니다. 이 글은 30자!여기서부터는 30자가 넘어갑니다!";
  const [over30, setOver30] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [check, setCheck] = useState(false);
  if (testStr.length > 30 && !check) {
    setCheck(true);
    setOver30(true);
  }
  return (
    <div>
      {((over30 && readMore) || !over30) && <div>{testStr}</div>}
      {over30 && !readMore && (
        <div>
          <div>{testStr.slice(0, 30)}</div>
          <button onClick={() => setReadMore(true)}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default Test;
