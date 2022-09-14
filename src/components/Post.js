import React from "react";
import PropTypes from "prop-types";

function Post(props) {
  return (
    <React.Fragment>
      <div class="container" onclick={() => props.whenPostClicked(props.id)}>
        <h3>{props.heading}</h3>
        <h5>By {props.username} at {props.date}</h5>
        <p>{props.content}</p>
      </div>
    </React.Fragment>
  )
}

Post.propTypes = {
  heading: PropTypes.string, 
  userName: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Post;