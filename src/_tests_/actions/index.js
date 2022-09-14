export const deletePost = id => ({
  type: 'DELETE_POST',
  id: id
});

export const addPost = post => {
  const {id, heading, userName, content, date} = post;
    return {
      type: 'ADD_POST',
      id: id,
      userName: userName,
      heading: heading,
      content: content,
      date: date
    }
};

export const toggleForm = () => ({
  type: 'TOGGLE_FORM',
});