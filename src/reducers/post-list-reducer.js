const reducer = (state={}, action) => {
  const {id, heading, userName, content, count, date} = action;
  switch(action.type) {
    case "ADD_POST":
      return Object.assign({}, state, {
        [id]: {
          heading: heading,
          userName: userName,
          content: content,
          date: date,
          count: count,
          id: id,
        }
      });
    case "DELETE_POST":
      let newState = { ...state };
      delete newState[id];
      return newState;
      
    case "INCREMENT":
      const newPostUpvote = { ...state[id], ...{count}};
      const upVotedState = {...state, ...{[id]:newPostUpvote}};
      return upVotedState;
    case "DECREMENT":

      const newPostDownVote = { ...state[id], ...{count}};
      const downVotedState = {...state, ...{[id]:newPostDownVote}};
      return downVotedState;
    default:
      return state;
    }
  };

export default reducer;