import React from "react";
import PropTypes from "prop-types";
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";
import PostDetail from "./PostDetail";
import { connect } from 'react-redux';
import * as a from '../actions';

class ForumControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      selectedComment: null,
      editing: false,
    };
  };

  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false,
      });
    } else {
      const {dispatch} = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingPostToList = (newPost) => {
    const {dispatch} = this.props;
    const action = a.addPost(newPost);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleEditPost = (postToEdit) => {
    const {dispatch} = this.props;
    const action = a.addPost(postToEdit);
    dispatch(action);
    this.setState({editing: false, selectedPost: null});
  }

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.props.mainPostList[id];
    this.setState({selectedPost: selectedPost})
  }

  handleUpVotes = () => {
    
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    
    if (this.state.selectedPost != null) {
      currentlyVisibleState = (
        <PostDetail 
          post = {this.state.selectedPost}
          //onClickingDelete = {this.handleDeletingPost}
          //onClickingEdit = {this.handleEditPost}
        />
        //show add comment / available comments
      );
      buttonText = "Return To Forum";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewPostForm 
          onNewPostCreation={this.handleAddingPostToList}
        />
      );
      buttonText = "Return To Forum";
      
    } else {
      currentlyVisibleState = (
        <PostList 
        postList={this.props.mainPostList}
        onPostSelection={this.handleChangingSelectedPost}
        />
      );
      buttonText = "Make Post!";
    }
    return (
      <React.Fragment>
        <div className="forum">
          <div className="col-left">
            <button id="controllerBtn"onClick={this.handleClick}>{buttonText}</button>
            {currentlyVisibleState}
          </div>
          <div className="col-right">
            <div class="col-item" id="communities">
              <h6>Top Communities</h6>
              <hr />
              
            </div>
            <div class="col-item" id="premium">

            </div>
            <div class="col-item" id="create">

            </div>
            <div class="col-item" id="info">

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ForumControl.propTypes = {
  mainPostList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    mainPostList: state.mainPostList,
    formVisibleOnPage: state.formVisibleOnPage,
  }
}

ForumControl = connect(mapStateToProps)(ForumControl);

export default ForumControl;