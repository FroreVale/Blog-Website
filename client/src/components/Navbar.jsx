
import Logo from '../images/logo.png';
import { Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=love">
            <h6>LOVE</h6>
          </Link>
          <Link className='link' to="/?cat=faith">
            <h6>FAITH</h6>
          </Link>
          <Link className='link' to="/?cat=humility">
            <h6>HUMILITY</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ?  <span onClick={logout}>Logout</span> : <Link className='link' to="/login" >Login</Link>}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar