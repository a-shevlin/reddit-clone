export const deletePost = id => ({
  type: 'DELETE_POST',
  id: id
});

export const addPost = (post) => {
  const {id, heading, userName, content, date} = post;
  console.log(id);
    return {
      type: 'ADD_POST',
      heading: heading,
      content: content,
      userName: userName,
      date: date,
      id: id
    }
};

export const increment = (id) => {
  return {
    type: "INCREMENT",
    id
  };
};
export const decrement = (id) => {
  return {
    type: "DECREMENT",
    id
  };
};

export const toggleForm = () => ({
  type: 'TOGGLE_FORM',
});