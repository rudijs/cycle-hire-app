import React from "react";
import history from '../containers/Auth/history'

import robotImg from "../assets/images/robot.svg";

const profilePage = () => {
  return (
    <div>
      <h1>My Profile</h1>
      <ul>
        <li>Recent History</li>
        <li>Favorites</li>
      </ul>
      <img src={robotImg} alt="Robot" width="100px" />
      <br />
      <br />
      <button type="button" onClick={() => history.replace('/signout')}>Sign Out</button>
    </div>
  );
};

export default profilePage;
