import React, {useState,setState, useContext} from 'react';
import { UserContext } from './UserContext';
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";
import  { db, auth } from './../firebase.js'
import { collection, addDoc } from 'firebase/firestore';

function NewCommentForm(props) {
  
  const {isLogged, setIsLogged, userName, setUserName, postId, setPostId} = useContext(UserContext);

  const [content, setContent] = useState(null);

  // console.log(postId);
  const jerry = {postId};

  props.onNewCommentCreation=(e)=>{
    e.preventDefault();
    addDoc(collection(db,'comments'),{
    content:content,
    postId: jerry,
    id: v4()
    })
    console.log(content);
    setContent('')
    };
    
  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "content"){
        setContent(value);
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={props.onNewCommentCreation}>
        <div className="content">
          <input type="textarea" id="content" placeholder="Comment" value={content} onChange = {(e) => handleInputChange(e)}/>
        </div>
        <button type='submit'>Comment!</button>
      </form>
    </React.Fragment>
  )
}

NewCommentForm.propTypes = {
  onNewCommentCreation: PropTypes.func,
}

export default NewCommentForm;