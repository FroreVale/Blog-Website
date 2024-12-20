import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router";

const Write = () => {

  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put(`/api/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img:file ? imgUrl : "", 
      }) : await axios.post(`/api/posts`, {
        title,
        desc: value,
        cat,
        img:file ? imgUrl : "", 
        date: new Date().toISOString(),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" name="file" id="file" onChange={e=>setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "love"} name="cat" value="love" id="love" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="love">Love</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "faith"} name="cat" value="faith" id="faith" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="faith">Faith</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "humility"} name="cat" value="humility" id="humility" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="humility">Humility</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
