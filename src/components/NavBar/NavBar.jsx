import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function handleHamburgerMenu(evt) {
    const navEl = document.getElementsByTagName('nav')[0];
    const linkDivEl = document.getElementById('hamburger-links-div');
    const HBIcon = evt.target
    if (menuIsOpen) {
      navEl.className = "";
      linkDivEl.style.display = "none";
      HBIcon.src = "hamburger-icon-open.svg.png";
    } else {
      navEl.className = "open-menu";
      linkDivEl.style.display = "flex";
      HBIcon.src = "hamburger-icon-close.webp";
    }
    setMenuIsOpen(!menuIsOpen);
  }

  function handleCloseMenu() {
    const navEl = document.getElementsByTagName('nav')[0];
    const HBIcon = document.getElementById('hamburger-icon');
    const linkDivEl = document.getElementById('hamburger-links-div');
    setMenuIsOpen(false);
    navEl.className = "";
    linkDivEl.style.display = "none";
    HBIcon.src = "hamburger-icon-open.svg.png"
  }

  return (
    <nav>
      <div>
        <img className="logo" src="photo-filter-logo.png" alt="Photo Filter logo: Multi-coloured apeture whit text 'Photo Filter' written below." />
        {user && <span>Welcome, <span>{user.name}</span>&nbsp;</span>}
      </div>
      <div id="desktop-links-div">
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
      <img onClick={handleHamburgerMenu} id="hamburger-icon" src="hamburger-icon-open.svg.png" alt="Hamburger menu icon." />
      <div id="hamburger-links-div">
        <Link onClick={handleCloseMenu} className="nav-link" to="/photos">All Photos</Link>
        {user ? (
          <>
            <Link onClick={handleCloseMenu} className="nav-link" to="/photos/new">New Photo</Link>
            <Link onClick={handleCloseMenu} className="nav-link" to="" onClick={handleLogOut}>Log Out</Link>
          </>
        ) : (
          <Link onClick={handleCloseMenu} className="nav-link" to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
}