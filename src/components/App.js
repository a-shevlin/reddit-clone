import React from 'react';
//import Search from './Search';
//import { useState } from 'react';
import ForumControl from './ForumController';
// import Header from "./Header"

function App() {
  // const posts = [
  //   { id: '1', name: 'This first post' },
  //   { id: '2', name: 'This second post' },
  //   { id: '3', name: 'This third post' },
  //   { id: '4', name: 'This fourth post' },
  // ];

  // const { search } = window.location;
  // const query = new URLSearchParams(search).get('s');
  // const [searchQuery, setSearchQuery] = useState(query || '');
  // const filteredPosts = filteredPosts(posts, searchQuery);

  return (
    <div className="Controller">
      {/* <div>
        <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        <ul>
            {filteredPosts.map(post => (
                <li key={post.key}>{post.name}</li>
            ))}
        </ul>
      </div> */}
      <ForumControl />
    </div>
  );
}

export default App;


// const filterPosts = (posts, query) => {
//   if (!query) {
//       return posts;
//   }

//   return posts.filter((post) => {
//       const postName = post.name.toLowerCase();
//       return postName.includes(query);
//   });
// };
