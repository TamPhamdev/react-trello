import "./App.css";
import React from "react";
import "antd/dist/antd.css";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Template from "./components/Template";
import GroupList from "./components/GroupList";

function App() {

  return (
    <div className="App">
      <Template>
          <GroupList />
      </Template>
    </div>
  );
}

export default App;
