"use client";

import { statuses } from "@/api/enums";
import { fetchStudentById } from "@/api/student";
import { deleteTask } from "@/api/task";
import { supabase } from "@/utils/supabase/client";
import { Add, ArrowBack, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
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

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("student_id", id);
      if (error) console.error("Error fetching tasks", error);
      if (data) setTasks(data);
    };
    fetchTasks();
  }, [id]);

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: any
  ): void => {
    e.stopPropagation();
    confirm({
      title: "Delete Task",
      description: "Are you sure you want to delete?",
    }).then(() => {
      deleteTask(task.id)
        .then(() => {
          toast.success("Task deleted");
          const newTasks = tasks.filter((t) => t.id !== task.id);
          setTasks(newTasks);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} sx={{ mb: 3, my: 3 }}>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Tasks</Typography>
      </Stack>
      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Name: {student.name}
        <br />
        {student.batch ? <>Batch/Class: {student.batch}</> : null}
      </Typography>

      <Grid
        container
        spacing={2}
        style={{
          maxHeight: "70vh",
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
            <Card>
              <CardHeader
                title={task.title}
                action={
                  <>
                    <IconButton
                      onClick={(e) => onDelete(e, task)}
                      aria-label="delete"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              />
              <CardContent>
                <Typography variant="body1" my={2}>
                  {statuses.find((s) => s.value === task.status)?.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.description}
                </Typography>
              </CardContent>
            </Card>
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
