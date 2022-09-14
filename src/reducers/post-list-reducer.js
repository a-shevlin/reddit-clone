import * as a from '../action';

const reducer = (state={}, action) => {
  const {id, heading, userName, content, date} = action;
  switch(action.type) {
    case a.addPost:
      return Object.assign({}, state, {
        [id]: {
          heading: heading,
          userName: userName,
          content: content,
          date: date,
          id: id,
        }
      });
    case a.deletePost:
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
}

export default reducer;