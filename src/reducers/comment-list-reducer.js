const reducer = (state={}, action) => {
  const {id, userName, content, date} = action;
  switch(action.type) {
    case "ADD_COMMENT":
      return Object.assign({}, state, {
        [id]: {
          userName: userName,
          content: content,
          date: date,
          id: id,
        }
      });
    case "DELETE_COMMENT":
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
}

export default reducer;