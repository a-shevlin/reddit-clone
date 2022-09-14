import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";

function NewPostForm(props) {

  function handleNewPostFormSubmission(event) {
    
    event.preventDefault();
    props.onNewPostCreation({
      heading: event.target.heading.value,
      content: event.target.content.value,
      userName: event.target.userName.value,
      date: event.target.date.value,
      id: v4()
    });
    console.log(event.target.heading.value);
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewPostFormSubmission}
        pageHead="Make a Post!"
        buttonText="Post!" />
    </React.Fragment>
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;