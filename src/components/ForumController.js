import React, { useState, useEffect, useContext } from 'react';
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";
import PostDetail from "./PostDetail";
import CommunityPlate from './CommunityPlate';
import PremiumPlate from './PremiumPlate';
import CreatePlate from './CreatePlate'
import NewCommentForm from './NewCommentForm';
import { UserContext, HeaderState } from './UserContext';
import  { db, auth } from './../firebase.js'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Header from './Header';

function ForumControl() {
  const [mainPostList, setMainPostList] = useState([]);
  const [mainCommentList, setMainCommentList ] = useState([]);
  const { postId, setPostId} = useContext(UserContext);
  const { formVisibleOnPage, setFormVisibleOnPage, selectedPost, setSelectedPost, setEditing, commentFormVisible, setCommentFormVisible } = useContext(HeaderState)



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
            commentCount: doc.data().commentCount,
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

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "comments"),
      (collectionSnapshot) => {
        const comments = [];
        collectionSnapshot.forEach((doc) => {
          comments.push({
            userName: doc.data().userName,
            date: doc.data().date,
            content: doc.data().content,
            count: doc.data().count,
            postId: doc.data().postId,
            id: doc.id
          });
        });
        // const postsObj = {...posts};
        setMainCommentList(comments);
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

  const handleAddComment = (id) => {
    if(selectedPost != null) {
      setCommentFormVisible(false);
      setSelectedPost(null);
      setEditing(null);
      setPostId(id);
    } else {
      setCommentFormVisible(!commentFormVisible);
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
    setMainPostList(valuesAsceSorted);
  }

  const handleDescSortClick = () => {
    setMainPostList(valuesDescSorted);
  }

  let sortedList = mainPostList;
  let valuesDescSorted = Object.values(sortedList).sort(function(a,b){return a.count - b.count});
  let valuesAsceSorted = Object.values(sortedList).sort(function(a,b){return b.count - a.count});

  // snap to top button logic
  let mybutton = document.getElementById("myBtn");
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  } 

  if (auth.currentUser === null) { 
    return (
      <React.Fragment>
        <Header />
        <div className="forum">
          <div className="col-left">
            <p>Login To Make a Post</p>
          </div>
          <div className="col-right">
            <CommunityPlate />
            <PremiumPlate />
            <CreatePlate />
            <div className="col-item" id="info">

            </div>
          </div>
        </div>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null; 
    
    if (selectedPost != null) {
      currentlyVisibleState = (
        <PostDetail 
          post = {selectedPost}
          commentList = {mainCommentList}
        />
      );
      buttonText = "Return To Forum";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewPostForm 
          onNewPostCreation={handleAddingPostToList}
        />
      );
      buttonText = "Return To Forum";
    } else if (commentFormVisible) {
      currentlyVisibleState = (
        <NewCommentForm 
          setVisible={setCommentFormVisible}
          visible={commentFormVisible}
          postId={postId}
          postList={mainPostList}
        />
      );
      buttonText = "Return To Forum";
    } else {
      currentlyVisibleState = (
        <PostList 
          postList={mainPostList}
          onPostSelection={handleChangingSelectedPost}
          addComment={handleAddComment}
        />
      );
      buttonText = "Make Post!";
    }
    return (
      <React.Fragment>
        <Header />
        <div className="forum">
          <div className="col-left">
            <button id="controllerBtn"onClick={handleClick}>{buttonText}</button>
            <button id="controllerSortAsceBtn"onClick={handleAsceSortClick}>Trending!</button>
            <button id="controllerSortDescBtn"onClick={handleDescSortClick}>Controversial</button>
            {currentlyVisibleState}   
          </div>
          <div className="col-right">
            <CommunityPlate />
            <PremiumPlate />
            <CreatePlate />
            <div className="col-item" id="info">

            </div>
          </div>
          <button id='myBtn' onClick={topFunction}>Scroll to Top</button>
        </div>
      </React.Fragment>
    );
  }
}

export default ForumControl;