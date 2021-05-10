import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <span>Welcome, "user name goes here"{""}</span>
      &nbsp; | &nbsp;
      <Link to="/photos">All Photos</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/photos/new">New Photo</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
        ) : (
        <>
          <Link to="/login">Log In</Link>
        </>
      )}
    </nav>
  );
}