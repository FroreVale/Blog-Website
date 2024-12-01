import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router';


// eslint-disable-next-line react/prop-types
const Menu = ({cat}) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts?cat=${cat}`);
        setPosts(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);


  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={`/uploads/${post.img}`} alt="post image" />
                <h2>{post.title}</h2>
                <Link to={`/post/${post.id}`}>
                <button>Read More</button>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Menu