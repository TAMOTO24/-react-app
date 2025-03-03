import React, { useState, useEffect, useContext } from "react";
import AuthModal from "../addAuthorizationModal";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../authprovider.js";
import "./style.css";
import axios from "axios";


const Auth = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(undefined);
  const { logout } = useContext(AuthContext);

  // const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/protected-route")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => console.error("Auth error", error));
  }, []);
  const handleAuthClick = async () => {
    await logout(navigate);
  };

  return (
    <>
      <div id="authblockdropdown">
        <a>
          <img
            id="userIcon"
            onClick={() =>
              !user ? setIsModalVisible(!isModalVisible) : setIsOpen(!isOpen)
            }
            src="./img-pack/user.png"
            alt="userImg"
          />
          {isOpen && (
            <div className="dropdownAuthBlock">
              <p>@{user.username}</p>
              <a onClick={handleAuthClick}>
                <div id="DPAuthLink">Exit</div>
              </a>
              <Link to="/account">
                <div id="DPAuthLink">Account</div>
              </Link>
            </div>
          )}
        </a>
      </div>

      <AuthModal visible={isModalVisible} onCancel={hideModal} />
    </>
  );
};

export default Auth;
