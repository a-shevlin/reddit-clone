const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        count: state.count+1
      };
    case "DECREMENT":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
};

export default reducer;