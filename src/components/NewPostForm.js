import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";

function NewPostForm(props) {

  function handleNewPostFormSubmission(event) {
    event.preventDefault();
    props.onNewPostCreation({
      heading: event.target.heading.value,
      content: event.target.heading.value,
      id: v4()
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewPostFormSubmission}
        buttonText="Post!" />
    </React.Fragment>
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;