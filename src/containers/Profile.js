import React, { Component } from "react";

import robotImg from  '../assets/images/robot.svg'

class Profile extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <img src={robotImg} alt="Robot" width="100px" />
      </div>
    );
  }
}

export default Profile;
