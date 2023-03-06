import db from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useFormInput } from "../hooks";
import { useNavigate } from 'react-router-dom';


function CreatePost() {

  const title = useFormInput("");
  const subTitle = useFormInput("");
  const content = useFormInput("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.value,
        subTitle: subTitle.value,
        content: content.value,
        createdAt: new Date()
      });

      console.log(docRef);

      navigate('/');

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Title</label>
          <input className='formField' {...title} required></input>
        </div>

        <div className="form-field">
          <label>Sub Title</label>
          <input className='formField' {...subTitle} required></input>
        </div>

        <div className="form-field">
          <label>Content</label>
          <textarea className='formField' {...content} required></textarea>
        </div>

        <button className="create-post-btn">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
