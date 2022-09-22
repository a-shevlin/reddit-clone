import React, { useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";
import PostDetail from "./PostDetail";
import { UserContext } from './UserContext';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import  { db, auth } from './../firebase.js'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import * as a from '../actions';
import Header from './Header';

function ForumControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainPostList, setMainPostList] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [voteCount, setVoteCount] = useState(1);
  const [selectedSort, setSelectedSort] = useState({});
  const {isLogged, setIsLogged, userName, setUserName} = useContext(UserContext);

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
        const postsObj = {...posts};
        setMainPostList(postsObj);
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

  const handleAsceSortClick = () => {
    setSelectedSort(valuesAsceSorted);
  }

  const handleDescSortClick = () => {
    setSelectedSort(valuesDescSorted);
  }

  let sortedList = mainPostList;
  let valuesDescSorted = Object.values(sortedList).sort(function(a,b){return a.count - b.count});
  let valuesAsceSorted = Object.values(sortedList).sort(function(a,b){return b.count - a.count});
 
  if (isLogged === false) { 
    return (
      <React.Fragment>
        <div className="forum">
          <div className="col-left">
            <p>Login To Make a Post</p>
          </div>
          <div className="col-right">
            <div className="col-item" id="communities">
              <div className="cHeader">
                <h6>Top Communities</h6>
                <hr />
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <span>1</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/first</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <span>2</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/second</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>

              <div className="cBoxLines">
                <a href="#" >
                  <span>3</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/third</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <span>4</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/fourth</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines topBorder">
                <a href="#" >
                  <span>5</span>
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/fifth</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <button className="cViewAll">View All</button>
            </div>
            <div className="col-item" id="premium">
              <div className="pHeader">
                <div className="pLogo"></div>
                <div className="pHeaderText">
                  <h4>Premium</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <button className="pTryNow">Try Now</button>
            </div>
            <div className="col-item" id="create">

            </div>
            <div className="col-item" id="info">

            </div>
          </div>
        </div>
      </React.Fragment>
    )
  } else if (isLogged === true) {
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
        postList={selectedSort}
        onPostSelection={handleChangingSelectedPost}
        // onUpVote={handleUpVoteClick}
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
            <button id="controllerSortAsceBtn"onClick={handleAsceSortClick}>Trending!</button>
            <button id="controllerSortDescBtn"onClick={handleDescSortClick}>Controversial</button>
            {currentlyVisibleState}   
          </div>
          <div className="col-right">
            <div className="col-item" id="communities">
              <h6 className="cHeader">Top Communities</h6>
              <hr />
              <div className="cBoxLines">
                <a href="#" >
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/first</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/second</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/third</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines">
                <a href="#" >
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/fourth</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
              <div className="cBoxLines topBorder">
                <a href="#" >
                  <div className="cMovement"></div>
                  <img src="" className="cImg"/>
                  <span>r/fifth</span>
                  <button className="cJoin">Join</button>
                </a>
              </div>
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