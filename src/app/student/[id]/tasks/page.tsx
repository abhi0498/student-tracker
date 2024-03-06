import { Typography } from "@mui/material";
import React from "react";
import TasksList from "./TasksList";

const Tasks = ({ params }: { params: { id: string } }) => {
  return (
    <div style={{ margin: "4vw" }}>
      <TasksList id={params.id} />
    </div>
  );
};

export default Tasks;
