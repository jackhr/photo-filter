import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
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
    const HBIconOpen = document.getElementById('hamburger-icon-open');
    const HBIconClose = document.getElementById('hamburger-icon-close');
    if (menuIsOpen) {
      navEl.className = "";
      linkDivEl.style.display = "none";
      evt.target.style.display = "none";
      HBIconOpen.style.display = "inherit";
    } else {
      navEl.className = "open-menu";
      linkDivEl.style.display = "flex";
      evt.target.style.display = "none"
      HBIconClose.style.display = "inherit";
    }
    setMenuIsOpen(!menuIsOpen);
  }

  function handleCloseMenu() {
    const navEl = document.getElementsByTagName('nav')[0];
    const HBIconOpen = document.getElementById('hamburger-icon-open');
    const HBIconClose = document.getElementById('hamburger-icon-close');
    const linkDivEl = document.getElementById('hamburger-links-div');
    setMenuIsOpen(false);
    navEl.className = "";
    linkDivEl.style.display = "none";
    HBIconClose.style.display = "none";
    HBIconOpen.style.display = "inherit";
  }

  function handleClickLogOut() {
    handleLogOut();
    handleCloseMenu();
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
      <img
        id="hamburger-icon-open"
        className="hamburger-icon"
        onClick={handleHamburgerMenu}
        src="hamburger-icon-open.svg.png"
        alt="Hamburger menu icon."
      />
      <img
        id="hamburger-icon-close"
        className="hamburger-icon"
        onClick={handleHamburgerMenu}
        style={
          { display: "none" }
        }
        src="hamburger-icon-close.webp"
        alt="Hamburger menu icon."
      />
      <div id="hamburger-links-div">
        <Link onClick={handleCloseMenu} className="nav-link" to="/photos">All Photos</Link>
        {user ? (
          <>
            <Link onClick={handleCloseMenu} className="nav-link" to="/photos/new">New Photo</Link>
            <Link onClick={handleCloseMenu} className="nav-link" to="" onClick={handleClickLogOut}>Log Out</Link>
          </>
        ) : (
          <Link onClick={handleCloseMenu} className="nav-link" to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
}