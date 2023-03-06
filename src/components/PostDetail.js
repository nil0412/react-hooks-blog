import { useEffect, useState } from "react";
import db from '../firebase';
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from 'firebase/firestore';


function PostDetail() {

  const [post, setPost] = useState({});
  const { postId } = useParams();

  const fetchPost = async () => {

    if (!postId) {
      console.log("no postId");
      return false;
    }

    try {
      const unsub = onSnapshot(doc(db, "posts", postId), (post) => {
        console.log("Current data: ", post.data());
        setPost(post.data());
      });
    } catch (error) {
      console.error("Error getting post document:", error);
    }

  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
