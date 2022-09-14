const reducer = (state={}, action) => {
  const {id, heading, userName, content, date} = action;
  switch(action.type) {
    case "ADD_POST":
      return Object.assign({}, state, {
        [id]: {
          heading: heading,
          userName: userName,
          content: content,
          date: date,
          id: id,
        }
      });
    case "DELETE_POST":
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
}

export default reducer;