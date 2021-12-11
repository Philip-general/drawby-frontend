import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { FontSpan } from "../Common/Commons";
import UserIcon from "../Common/Avatar";
import Username from "../Common/Username";
import { useNavigate } from "react-router";

const SSearchBox = styled.div`
  width: 390px;
  height: 36px;
  border-radius: 18px;
  padding: 0 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #fafafa;
  border: solid 1px #ccc;
`;

const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 20%;
  background-color: inherit;
  :focus {
    outline: none;
  }
`;

const SearchModal = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  width: 520px;
  height: 400px;
  margin-top: 21px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const SearchResults = styled.div`
  display: flex;
`;

const SearchResult = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const SearchPicture = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 10px;
`;

const SEARCH_USER_QUERY = gql`
  query searchUser($keyword: String) {
    searchUser(keyword: $keyword) {
      id
      username
      avatar
    }
  }
`;

const SEARCH_PICTURE_QUERY = gql`
  query searchPicture($keyword: String) {
    searchPicture(keyword: $keyword) {
      id
      file
      name
    }
  }
`;

const SEARCH_HASHTAG_QUERY = gql`
  query searchHashtag($keyword: String) {
    searchHashtag(keyword: $keyword) {
      id
      hashtagName
      pictures {
        file
      }
    }
  }
`;

function SearchBox() {
  const [searchModal, setSearchModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState();
  const { data: userData } = useQuery(SEARCH_USER_QUERY, {
    variables: { keyword: searchKeyword },
    skip: !searchKeyword
  });
  const { data: hashtagData } = useQuery(SEARCH_HASHTAG_QUERY, {
    variables: { keyword: searchKeyword },
    skip: !searchKeyword
  });
  const { data: pictureData } = useQuery(SEARCH_PICTURE_QUERY, {
    variables: { keyword: searchKeyword },
    skip: !searchKeyword
  });
  const searching = keyword => {
    setSearchKeyword(keyword);
  };

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };
  const navigate = useNavigate();
  const goProfile = username => {
    setSearchModal(false);
    navigate(`/profile/${username}`);
  };
  const goHashtag = hashtagName => {
    const hashtag = hashtagName.split("#")[1];
    setSearchModal(false);
    navigate(`/hashtag/${hashtag}`);
  };
  const goPicture = () => {
    setSearchModal(false);
  };
  return (
    <div>
      <SSearchBox>
        <SearchIcon src="/PictureSrc/Search.png" />
        <SearchInput
          onFocus={() => openSearchModal()}
          onChange={e => {
            searching(e.target.value);
          }}
          onBlur={e => closeSearchModal(e)}
          type="text"
          placeholder="검색어를 입력하세요.."
        />
      </SSearchBox>
      {searchModal && (
        <SearchModal>
          <SearchResultContainer>
            <FontSpan>작가</FontSpan>
            <SearchResults>
              {searchKeyword &&
                userData?.searchUser &&
                userData?.searchUser.map(user => (
                  <SearchResult
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => goProfile(user.username)}
                    key={user.id}
                  >
                    <UserIcon size="46px" />
                    <Username key={user.id}>{user.username}</Username>
                  </SearchResult>
                ))}
            </SearchResults>
          </SearchResultContainer>
          <SearchResultContainer>
            <FontSpan>해시태그</FontSpan>
            <SearchResults>
              {searchKeyword &&
                hashtagData?.searchHashtag &&
                hashtagData?.searchHashtag.map(hashtag => (
                  <SearchResult
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => goHashtag(hashtag.hashtagName)}
                    key={hashtag.id}
                  >
                    <SearchPicture src={hashtag.pictures[0].file} />
                    <FontSpan key={hashtag.id}>{hashtag.hashtagName}</FontSpan>
                  </SearchResult>
                ))}
            </SearchResults>
          </SearchResultContainer>
          <SearchResultContainer>
            <FontSpan>그림</FontSpan>
            <SearchResults>
              {searchKeyword &&
                pictureData?.searchPicture &&
                pictureData?.searchPicture.map(picture => (
                  <SearchResult
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => goPicture()}
                    key={picture.id}
                  >
                    <SearchPicture src={picture.file} />
                    <FontSpan key={picture.id}>{picture.name}</FontSpan>
                  </SearchResult>
                ))}
            </SearchResults>
          </SearchResultContainer>
        </SearchModal>
      )}
    </div>
  );
}

export default SearchBox;
