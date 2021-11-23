import styled from "styled-components";
import { PropTypes } from "prop-types";
import Comment from "./Comment";

const CommentContainer = styled.div``;

const TotalComment = styled.div``;

export default function Comments({ pictureId, comments, totalComment }) {
  return (
    <CommentContainer>
      <TotalComment>댓글 개수: {totalComment}</TotalComment>
      {comments
        ? comments.map(comment => (
            <Comment
              key={comment.id}
              payload={comment.payload}
              author={comment.author}
              isMine={comment.isMine}
            />
          ))
        : null}
    </CommentContainer>
  );
}

Comments.propTypes = {
  pictureId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      payload: PropTypes.string.isRequired,
      author: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }),
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  )
};
