import React, { Component } from "react";
import SideBar from "./Sidebar";
import SampleList from "./SampleList";

class SampleDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <SampleList />
      </div>
    );
  }
}

export default SampleDisplay;
