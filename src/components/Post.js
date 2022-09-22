import React, { useState, useEffect, useContext }from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import CommentList from "./CommentList";
import  { db, auth } from './../firebase.js'
import  {collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, FieldValue, increment } from 'firebase/firestore';

function Post(props) {

  const {isLogged, setIsLogged, userName, setUserName, postId, setPostId} = useContext(UserContext);
  const [voteCount, setVoteCount] = useState(props.count);

  
  
  useEffect(() => {
    const countRef = doc(db, "posts", props.id);

      updateDoc(countRef, {
        count: voteCount
      });
  
  }, [voteCount]);

  useEffect(() => {

    setVoteCount(props.count)
  
  }, [props.count]);

  const handleUpVotes = () => {
    setVoteCount(voteCount => voteCount + 1);
    console.log("clicked upvote");
  }

  const handleDownVotes = () => {
    setVoteCount(voteCount => voteCount - 1);
    console.log("clicked downvote");
  }

  function grabPostId(id) {
    setPostId(id);
  }

  return (
    <React.Fragment>
      <div className="container post" >
      <div className="col-left">
        <div className="upArrowClip hoverClip" onClick={() => handleUpVotes()}>
          <div className="upArrow arrow"></div>
        </div>
          <div className="count">{voteCount}</div>
        <div className="downArrowClip hoverClip" onClick={() => handleDownVotes()}>
          <div className="downArrow arrow"></div> 
        </div>
        </div>
        
        <div className="col-right">
          <div className="postHeader" onClick={() => props.whenPostClicked(props.id)}>
            <h5>Posted by {props.userName} {props.date}</h5>
            <h3>{props.heading}</h3>
            <p>{props.content}</p>
          </div>
          <div className="postButtons">
            <div className="comments pButton" 
                  onClick={() => { props.whenCommentClicked(props.id); grabPostId(props.id) }}>
              <i className="icon" id="commentsClip"></i>
              <span>comments</span>
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
              <div className="ellipsis pButton">
                <span id="pBtnMore">...</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* <CommentList/> */}
    </React.Fragment>
  )
}



Post.propTypes = {
  heading: PropTypes.string, 
  userName: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  count: PropTypes.number,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func,
  whenCommentClicked: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func
};

export default Post;