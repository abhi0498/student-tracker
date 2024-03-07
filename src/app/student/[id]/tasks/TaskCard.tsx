"use client";

import { statuses } from "@/api/enums";
import { deleteTask, updateTask } from "@/api/task";
import { AddAlertRounded, Delete, Mail, Phone } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { confirm } from "material-ui-confirm";
import { MouseEvent, MouseEventHandler } from "react";
import toast from "react-hot-toast";

type TaskCardProps = {
  task: any;
  fetchTasks: () => void;
};

const TaskCard = ({ task, fetchTasks }: TaskCardProps) => {
  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
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
          fetchTasks();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const updateTaskStatus = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    const confirmResult = await confirm({
      title: "Update Task Status",
      description: `Are you sure you want to ${
        task.status === "new" ? "start" : "complete"
      } this task?`,
    });

    updateTask({
      id: task.id,
      status: task.status === "new" ? "in_progress" : "completed",
    })
      .then((res) => {
        toast.success("Task status updated");
        fetchTasks();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Card>
      <CardHeader
        title={task.title}
        action={
          <Stack direction={"row"} spacing={1}>
            <IconButton
              size={"small"}
              aria-label="notify"
              onClick={(e) => {
                e.stopPropagation();
                toast.success("Notified");
              }}
            >
              <AddAlertRounded />
            </IconButton>
            <IconButton
              size={"small"}
              onClick={(e) => onDelete(e, task)}
              aria-label="delete"
              color="error"
            >
              <Delete />
            </IconButton>
          </Stack>
        }
      />
      <CardContent>
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
          <Stack direction="column" flexGrow={1} spacing={1}>
            {task.student_name && (
              <Typography variant="body1" mb={2}>
                For {task.student_name}
              </Typography>
            )}
            <Typography variant="body1">
              {statuses.find((s) => s.value === task.status)?.label}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems={"flex-end"} spacing={1}>
            {task.student_name && (
              <Stack
                direction={"row"}
                alignItems={"end"}
                justifyContent={"end"}
                spacing={1}
              >
                <IconButton
                  size="small"
                  style={{ paddingTop: 0 }}
                  aria-label="Mail"
                  onClick={() => {
                    if (!task.student_email) {
                      return toast.error("No email found for this student");
                    }
                    const a = document.createElement("a");
                    a.href = `mailto:${task.student_email}`;
                    a.click();
                  }}
                >
                  <Mail />
                </IconButton>
                <IconButton
                  size="small"
                  style={{ paddingRight: 0, paddingTop: 0 }}
                  aria-label="Call"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = `tel:${task.student_phone}`;
                    a.click();
                  }}
                >
                  <Phone />
                </IconButton>
              </Stack>
            )}
            <Typography variant="body1">Due On:</Typography>
            <Typography
              variant="body2"
              style={{
                color:
                  dayjs(task.due_date).isBefore(dayjs(), "day") &&
                  task.status !== "completed"
                    ? "red"
                    : "inherit",
              }}
            >
              {dayjs(task.due_date).format("DD MMM, YYYY")}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions>
        {task.status === "completed" ? null : (
          <Button
            style={{ marginLeft: "auto" }}
            size="small"
            onClick={updateTaskStatus}
            href=""
          >
            {task.status === "new" ? "Start" : "Complete"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskCard;
