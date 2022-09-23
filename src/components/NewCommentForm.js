import React, { useState, setState, useContext, useEffect } from 'react';
import  {collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, FieldValue, increment } from 'firebase/firestore';
import  { db, auth } from './../firebase.js';
import { UserContext } from './UserContext';
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 



function NewCommentForm(props) {
  
  const {isLogged, setIsLogged, userName, setUserName, postId, setPostId} = useContext(UserContext);
  const { postList } = props;
  const [count, setCount] = useState(null);
  
  

  useEffect(() => {
    let postCount
    props.postList.forEach(function(item) {
      if(item.id === postId) {
        postCount = item.commentCount;
      }
    })
    setCount(postCount);
  }, []);

  const [content, setContent] = useState(null);

  const onNewCommentCreation=(e)=>{
    e.preventDefault();
    addDoc(collection(db,'comments'),{
      content:content,
      userName: userName,
      date: new Date(),
      count: 1,
      postId: postId,
      id: v4()
    })
    
    const countRef = doc(db, "posts", postId);
      updateDoc(countRef, {
        commentCount: count + 1,
      });
    
    
    setContent('');
    props.setVisible(!props.visible)
    };

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "content"){
        setContent(value);
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={onNewCommentCreation}>
        <div className="content">
          <input type="textarea" id="content" placeholder="Comment" value={content} onChange = {(e) => handleInputChange(e)}/>
        </div>
        <button type='submit'>Comment!</button>
      </form>
    </React.Fragment>
  )
}

NewCommentForm.propTypes = {
  setVisible: PropTypes.func,
  visible: PropTypes.bool,
  postList: PropTypes.object,
}

export default NewCommentForm;