import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from '../firebase'
import { collection, getDocs } from "firebase/firestore";

function Home() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {

    await getDocs(collection(db, "posts"))
      .then((querySnapshot) => {
        const posts = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(posts);
        console.log(posts, posts);
      })

  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h1>Tech Blog</h1>
      <div id="blog-by">Nilesh</div>

      {posts.map((post, index) => (
        <div className="post" key={`post-${index}`}>
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.subTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
