"use client";

import { fetchCompletedTasks, fetchPendingTasks } from "@/api/task";
import { Fab, Grid, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TaskCard from "../student/[id]/tasks/TaskCard";
import { Add } from "@mui/icons-material";
import StudentDialog from "./StudentDialog";

const Tasks = () => {
  const [tab, setTab] = useState("pending");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fetchTasks = async () => {
    setLoading(true);
    try {
      if (tab === "pending") {
        const data = await fetchPendingTasks();
        if (data) setTasks(data);
      }
      if (tab === "completed") {
        const data = await fetchCompletedTasks();
        if (data) setTasks(data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tab]);

  return (
    <div style={{ margin: "1.5rem" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Tasks 📋
      </Typography>

      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        aria-label="Task Status Tabs"
      >
        <Tab value="pending" label="Pending &nbsp; ⚠️" />
        <Tab value="completed" label="Completed &nbsp; ✅" />
      </Tabs>
      {loading ? (
        <Grid container spacing={2} my={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={250} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          my={2}
          style={{
            maxHeight: "80vh",
            overflowY: "scroll",
            paddingBottom: "10vh",
          }}
        >
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} fetchTasks={fetchTasks} />
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        sx={{ position: "absolute", bottom: "8vh", right: "2vw" }}
        color="primary"
        aria-label="add"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <Add />
      </Fab>
      <StudentDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Tasks;
