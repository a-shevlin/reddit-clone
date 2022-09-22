import React, { useContext } from "react";
import { UserContext } from './UserContext';
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";

function NewPostForm(props) {

  const {isLogged, setIsLogged, userName, setUserName, postId, setPostId} = useContext(UserContext);

  function handleNewPostFormSubmission(event) {
    
    event.preventDefault();
    props.onNewPostCreation({
      heading: event.target.heading.value,
      content: event.target.content.value,
      userName: userName,
      date: new Date(),
      count: 1,
      commentCount: 0,
      id: v4()
    });
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