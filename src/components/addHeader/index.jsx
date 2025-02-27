import React, { useEffect } from "react";
import "./style.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Auth from "../propsAuthModal";
import axios from "axios";

import { useState } from "react";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get("/protected-route")
    .then((response) => {
      console.log(response.data);
      setUser(response.data.user);
    })
    .catch((error) => console.error("Auth error", error));
  }, []);

  return (
    <div>
      <nav className="nav">
        <ul>
          <img src="./img-pack/logo_white.png" alt="Logo" id="Logo"/>
          {[
            { to: "/", label: "Homepage" },
            { to: "/trainers", label: "Trainers" },
            { to: "/newsandinf", label: "News & Info" },
            { to: "/layout", label: "Layout" },
            { to: "/workoutpage", label: "Workout" },
          ].map((item) => (
            <Link to={item.to} id="navLink">
              <li id="navElement" key={item.label}>{item.label}</li>
            </Link>
          ))}
          <li
            onClick={() => setIsOpen(!isOpen)}
            className="dropDownButton"
            style={{ cursor: "pointer", paddingInline: "50px" }}
            id="moreBtn"
          >
            More {isOpen ? "▲" : "▼"}
            {isOpen && (
              <div className="dropdownBlock">
                <Link to="#"><div id="DRPLink">codes</div></Link>
                <Link to="#"><div id="DRPLink">Пополнение</div></Link>
                <Link to="#"><div id="DRPLink">Руководство</div></Link>
              </div>
            )}
          </li>
          <li><Auth user={user}/></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Header;
