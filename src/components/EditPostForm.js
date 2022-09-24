import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditPostForm (props) {
  const { post } = props;

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost({
      commentCount: post.commentCount,
      content: event.target.content.value, 
      count: post.count,
      date: post.date,
      heading: event.target.heading.value, 
      id: post.id,
      userName: post.userName,
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission} 
        buttonText="Edit Post" />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func,
  post: PropTypes.object
};

export default EditPostForm;