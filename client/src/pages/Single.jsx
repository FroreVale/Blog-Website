
import Edit from '../images/edit.png';
import Delete from '../images/delete.png';
import { Link, useLocation, useNavigate } from 'react-router';
import Menu from '../components/Menu';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {AuthContext} from '../context/authContext.jsx'

const Single = () => {

  const anonymousImg = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg";

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete  = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");  
    } catch (error) {
      console.log(error);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent
  }


  return (
    <div className='single'>
      <div className="content">
      <img src={`/uploads/${post.img}`} alt="post image" />
        <div className="user">
          <img src={post.userimg ? post.userimg : anonymousImg} alt="user image" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {(currentUser?.username === post.username) && 
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt="edit" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="delete" />
          </div>
          } 
        </div>
        <h1>{post.title}</h1>
         {getText(post.desc)}
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single