import { useEffect, useState } from "react";
import db from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';


function PostDetail() {

  const [post, setPost] = useState({});
  const { postId } = useParams();

  const fetchPost = async () => {

    if (!postId) {
      console.log("no postId");
      return false;
    }

    try {
      const docRef = doc(db, "posts", postId);

      // docRef.onSnapshot((snapshot) => {
      //   console.log("snapshot: ", snapshot.data());
      //   setPost(snapshot.data());
      // });

      const docSnapshot = await getDoc(docRef);
      const postData = docSnapshot.data();
      console.log("post data: ", postData);
      setPost(postData);
    } catch (error) {
      console.error("Error getting post document:", error);
    }

  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div className="post-detail">
      hello world!!!
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
