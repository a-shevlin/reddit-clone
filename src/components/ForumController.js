import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";
import PostDetail from "./PostDetail";
import { connect } from 'react-redux';
import  { db, auth } from './../firebase.js'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as a from '../actions';

function ForumControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainPostList, setMainPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "posts"),
      (collectionSnapshot) => {
        const posts = [];
        collectionSnapshot.forEach((doc) => {
          posts.push({
            heading: doc.data().heading,
            userName: doc.data().userName,
            content: doc.data().content,
            date: doc.data().date,
            count: doc.data().count,
            id: doc.id
          });
        });
        setMainPostList(posts);
      },
      (error) => {

      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedPost != null) {
      setFormVisibleOnPage(false);
      setSelectedPost(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleEditingPostInList = async (postToEdit) => {
    const postRef = doc(db, "posts", postToEdit.id);
    await updateDoc(postRef, postToEdit);
    setEditing(false);
    setSelectedPost(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleDeletingPost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setSelectedPost(null);
  }

  const handleChangingSelectedPost = (id) => {
    const selection = mainPostList.filter(post => post.id === id)[0];
    setSelectedPost(selection);
  }

  const handleAddingPostToList = async (newPostData) => {
    await addDoc(collection(db, "posts"), newPostData);
    setFormVisibleOnPage(false);
  }


  // const handleUpVotes = (id, count) => {
  //   const {dispatch} = props;
  //   const upVoted = count + 1;
  //   const action = a.increment(id, upVoted);
  //   dispatch(action);
  //   console.log(props.mainPostList[id]);
  // };

  // const handleDownVotes = (id, count) => {
  //   const {dispatch} = props;
  //   const upVoted = count - 1;
  //   //0 if 1-1
  //   const action = a.increment(id, upVoted);
  //   dispatch(action);
  //   console.log(props.mainPostList[id]);
  // }

  if (auth.currentUser == null) { 
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null; 
    
    if (selectedPost != null) {
      currentlyVisibleState = (
        <PostDetail 
          post = {selectedPost}
          //onClickingDelete = {handleDeletingPost}
          //onClickingEdit = {handleEditPost}
        />
        //show add comment / available comments
      );
      buttonText = "Return To Forum";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewPostForm 
          onNewPostCreation={handleAddingPostToList}
        />
      );
      buttonText = "Return To Forum";
      
    } else {
      currentlyVisibleState = (
        <PostList 
        postList={mainPostList}
        onPostSelection={handleChangingSelectedPost}
        // onUpVote={handleUpVotes}
        // onDownVote={handleDownVotes}
        />
      );
      buttonText = "Make Post!";
    }
    return (
      <React.Fragment>
        <div className="forum">
          <div className="col-left">
            <button id="controllerBtn"onClick={handleClick}>{buttonText}</button>
            {currentlyVisibleState}
          </div>
          <div className="col-right">
            <div className="col-item" id="communities">
              <h6 className="cHeader">Top Communities</h6>
              <hr />
              <ol>
                <a href="#">
                  <li className="cListItem">
                  <span>1</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/first</span>
                  <button className="cJoin">Join</button>
                </li>
                </a>
                
                <li className="cListItem">
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <a href="#">r/second</a>
                  <button className="cJoin">Join</button>
                </li>
                <li className="cListItem">
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <a href="#">r/third</a>
                  <button className="cJoin">Join</button>
                </li>
                <li className="cListItem">
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <a href="#">r/fourth</a>
                  <button className="cJoin">Join</button>
                </li>
                <li className="cListItem">
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <a href="#">r/fifth</a>
                  <button className="cJoin">Join</button>
                </li>
              </ol>
              <button className="cViewAll">View All</button>
            </div>
            <div className="col-item" id="premium">

            </div>
            <div className="col-item" id="create">

            </div>
            <div className="col-item" id="info">

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ForumControl;