import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from '../firebase'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import moment from 'moment';
import styled from "styled-components";

const HomeContainer = styled.div`
  h1{
    text-align: center;
    color: #2196f3;
    margin-bottom: 2px;
  }

  .post{
    border: 1px solid #e1e1e1;
    padding: 10px 10px;
    border-radius: 5px;
    margin-top: 10px;
  }

  .post a {
    text-decoration: none;
  }

  .post h3 {
    margin: 0;
    padding: 0;
    font-size: 25px;
    font-weight: bold;
    color: black;
  }

  .post h3:hover {
    color: #2196f3;
  }

  .post p {
    font-size: 13px;
  }

  #blog-by {
    text-align: center;
    font-style: italic;
    margin-bottom: 20px;
  }

  .homeEnd {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .homeEnd i {
    padding: 5px;
  }
`;

function Home() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc")), (snapshot) => {
      const posts = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
    });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <HomeContainer>
      <h1>Tech Blog</h1 >
      <div id="blog-by">Nilesh Patil</div>

      {posts.map((post, index) => (
        <div className="post" key={`post-${index}`}>
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <h5>{post.subTitle}</h5>
          <p className="timeStamp">{moment(post.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
      ))}

      <div className="homeEnd">
        <i class="fa-solid fa-circle green"></i>
        <i class="fa-solid fa-circle red  "></i>
        <i class="fa-solid fa-circle blue"></i>
      </div>


    </HomeContainer>
  );
}

export default Home;
