import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from '../firebase'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import moment from 'moment';

function Home() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy("createdAt")), (snapshot) => {
      const posts = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
    });
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
          <h5>{post.subTitle}</h5>
          <p className="timeStamp">{moment(post.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
