import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div>
        <img className="logo" src="photo-filter-logo.png" />
        {user && <span>Welcome, <span>{user.name}</span>&nbsp;</span>}
      </div>
      <div>
        <Link className="nav-link" to="/photos">All Photos</Link>
        {user ? (
          <>
            <Link className="nav-link" to="/photos/new">New Photo</Link>
            <Link className="nav-link" to="" onClick={handleLogOut}>Log Out</Link>
          </>
        ) : (
          <Link className="nav-link" to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
}