import PropTypes from "prop-types";
import  { db, auth } from './../firebase.js';
import React, { useState, useEffect, useContext }from "react";
import  {collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, FieldValue, increment } from 'firebase/firestore';

function Comment(props) {

  const formattedDate = new Date(props.date.seconds * 1000).toLocaleTimeString();
  const [voteCount, setVoteCount] = useState(props.count);

  useEffect(() => {
    const countRef = doc(db, "comments", props.id);

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

  // function grabPostId(id) {
  //   setPostId(id);
  // }


  return (
    <React.Fragment>
      <div className="container comment" >
        <div className="row-top">
          <div className="commentHeader">
            <h5>{props.userName} {formattedDate}</h5>
            <p>{props.content}</p>
          </div>
        </div>
        <div className="row-bottom">
          <div className="postButtons">
            <div className="upArrowClip hoverClip pButton" onClick={() => handleUpVotes()}>
            
              <div className="upArrow arrow"></div>
            </div>
            <div className="count">{props.count}</div>
            <div className="downArrowClip hoverClip pButton" onClick={() => handleDownVotes()}>
              <div className="downArrow arrow" ></div> 
              
            </div>
            <div className="comments pButton">
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
    </React.Fragment>
  )
}

Comment.propTypes = { 
  userName: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.exact({
    seconds: PropTypes.number,
    nanoseconds: PropTypes.number
  }), 
  count: PropTypes.number,
  id: PropTypes.string,
  postId: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Comment;