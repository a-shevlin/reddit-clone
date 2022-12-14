import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import  { updateDoc ,doc } from 'firebase/firestore';
import  { db } from './../firebase.js';
import CommentList from "./CommentList";


function PostDetail(props){
  const { post } = props;
  const [voteCount, setVoteCount] = useState(post.count);
  const [height, setHeight] = useState(null);
  
  const formattedDate = new Date(post.date.seconds * 1000).toLocaleTimeString();

  const newCommentList = [];
  props.commentList.forEach(function(item) {
    if(item.postId === post.id) {
      newCommentList.push(item);
    }
  })

  useEffect(() => {
    const countRef = doc(db, "posts", post.id);

      updateDoc(countRef, {
        count: voteCount
      });
  
  }, [voteCount]);

  useEffect(() => {

    setVoteCount(post.count)
  
  }, [post.count]);

  const handleUpVotes = () => {
    setVoteCount(voteCount => voteCount + 1);
    console.log("clicked upvote");
  }

  const handleDownVotes = () => {
    setVoteCount(voteCount => voteCount - 1);
    console.log("clicked downvote");
  }

  

  return (
    <React.Fragment>
      <div className="postDetail">
        <div className="container post" >
        <div className="col-left">
          <div className="upArrowClip hoverClip" onClick={() => handleUpVotes()}>
            <div className="upArrow arrow"></div>
          </div>
            <div className="count">{voteCount}</div>
          <div className="downArrowClip hoverClip" >
            <div className="downArrow arrow" onClick={() => handleDownVotes()}></div> 
          </div>
          </div>
          
          <div className="col-right">
            <div className="postHeader">
              <h5>Posted by {post.userName} {formattedDate}</h5>
              <h3>{post.heading}</h3>
              <p>{post.content}</p>
            </div>
            <div className="postButtons">
              <div className="comments pButton">
                <i className="icon" id="commentsClip"></i>
                {props.commentCount === 1 ? (
                <span>{post.commentCount} comment</span>
              ) : (
                <span>{post.commentCount} comments</span>
              )
              }
              </div>
              <a href="/">
                <div className="share pButton">
                  <i className="icon" id="shareClip"></i>
                  <span>share</span>
                </div>
              </a>
              <a href="/">
                <div className="save pButton">
                  <i className="icon" id="saveClip"></i>
                  <span>save</span>
                </div>
              </a>
              <a>
              <div className="ellipsis pButton dropdown">
              <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="pBtnMore">...</span>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={() => props.onClickingEdit()}>Edit</p></li>
                <li><p className="dropdown-item" onClick={() => props.onClickingDelete(post.id)}>Delete</p></li>
              </ul>
            </div>
              </a>
            </div>
          </div>
        </div>
        <CommentList
          commentList={newCommentList}
        />
      </div>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  commentList: PropTypes.array,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func,
}

export default PostDetail;