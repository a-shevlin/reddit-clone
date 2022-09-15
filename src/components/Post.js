import React from "react";
import PropTypes from "prop-types";
import CommentList from "./CommentList";

function Post(props) {
  return (
    <React.Fragment>
      <div className="container post" >
      <div className="col-left">
          <div className="upArrow" onClick={() => props.onUpVote(props.id, props.count)}></div>
          <div className="count">{props.count}</div>
          <div className="downArrow" onClick={() => props.onDownVote(props.id, props.count)}></div>
        </div>
        
        <div className="col-right" onClick={() => props.whenPostClicked(props.id)}>
          <h5>Posted by {props.userName} {props.date}</h5>
          <h3>{props.heading}</h3>
          <p>{props.content}</p>
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
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func
};

export default Post;