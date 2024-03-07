"use client";

import { fetchStudentById } from "@/api/student";
import { deleteTask } from "@/api/task";
import { supabase } from "@/utils/supabase/client";
import { Add, ArrowBack, Mail, Phone } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TaskCard from "./TaskCard";

const TasksList = ({ id }: { id: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [student, setStudent] = React.useState<any>({});
  const router = useRouter();
  const confirm = useConfirm();
  useEffect(() => {
    if (id !== "new") {
      fetchStudentById(id)
        .then((data) => {
          setStudent(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [id]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("student_id", id)
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching tasks", error);
    if (data) setTasks(data);
  };
  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} sx={{ mb: 3, my: 3 }}>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Tasks</Typography>
      </Stack>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Student Name: <br />
              {student.name}
              <br />
              {student.batch ? <>Batch/Class: {student.batch}</> : null}
            </Typography>
          }
          action={
            <Stack direction={"row"} spacing={1}>
              <IconButton
                aria-label="mail"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!student.email) {
                    return toast.error("No email found for this student");
                  }
                  const a = document.createElement("a");
                  a.href = `mailto:${student.email}`;
                  a.click();
                }}
              >
                <Mail />
              </IconButton>
              <IconButton
                aria-label="call"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!student.phone) {
                    return toast.error("No phone found for this student");
                  }
                  const a = document.createElement("a");
                  a.href = `tel:${student.phone}`;
                  a.click();
                }}
              >
                <Phone />
              </IconButton>
            </Stack>
          }
        />
      </Card>

      <Typography variant="h5" my={2}>
        Tasks List
      </Typography>
      <Grid
        container
        spacing={2}
        my={2}
        style={{
          maxHeight: "60vh",
          overflowY: "scroll",
          paddingBottom: "10vh",
        }}
      >
        {tasks.map((task) => (
          <Grid
            item
            xs={12}
            md={6}
            key={task.id}
            onClick={() => {
              router.push(`/student/${id}/tasks/${task.id}`);
            }}
          >
            <TaskCard task={task} fetchTasks={fetchTasks} />
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={{ position: "absolute", bottom: "10vh", right: "2vw" }}
        color="primary"
        aria-label="add"
        href={`/student/${id}/tasks/new`}
      >
        <Add />
      </Fab>
    </>
  );
};

export default TasksList;
