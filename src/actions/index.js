export const deletePost = id => ({
  type: 'DELETE_POST',
  id: id
});

export const addPost = (post) => {
  const {id, heading, userName, content, date, count} = post;
    return {
      type: 'ADD_POST',
      heading: heading,
      content: content,
      userName: userName,
      count: count,
      date: date,
      id: id
    }
};

export const increment = (id, count) => {
  return {
    type: "INCREMENT",
    id: id,
    count: count
  };
};
                          // downVote 0
export const decrement = (id, count) => {
  return {
    type: "DECREMENT",
    count: count, //0 from 1
    id: id
  };
};

export const toggleForm = () => ({
  type: 'TOGGLE_FORM',
});