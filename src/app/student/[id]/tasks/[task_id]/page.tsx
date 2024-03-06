"use client";
import { statuses } from "@/api/enums";
import { fetchStudentById } from "@/api/student";
import { createTask, getTaskById, updateTask } from "@/api/task";
import RHSelect from "@/components/form/RHSelect";
import RHTextField from "@/components/form/RHTextField";
import { supabase } from "@/utils/supabase/client";
import { ArrowBack, ArrowLeft, Save } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Task = ({ params }: { params: { id: string; task_id: string } }) => {
  const route = useRouter();
  const formMethods = useForm();
  const [student, setStudent] = React.useState<any>({});

  useEffect(() => {
    if (params.id !== "new") {
      fetchStudentById(params.id)
        .then((data) => {
          setStudent(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.task_id !== "new") {
      getTaskById(params.task_id)
        .then((data) => {
          formMethods.reset({
            ...data,
            status: statuses.find((status) => status.value === data.status),
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [params.task_id]);

  const onSubmit = (data: any) => {
    console.log({ data });
    data.status = data.status.value;
    console.log({ data });

    if (params.task_id === "new") {
      createTask({ ...data, student_id: params.id })
        .then((data) => {
          toast.success("Task created");
          route.push(`/student/${params.id}/tasks`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      updateTask(data)
        .then((data) => {
          toast.success("Task updated");
          route.push(`/student/${params.id}/tasks`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <div style={{ paddingInline: "4vw" }}>
      <Stack direction={"row"} alignItems={"center"} sx={{ mb: 3, my: 3 }}>
        <IconButton
          onClick={() => {
            route.back();
          }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h4">
          {params.task_id === "new" ? "New Task" : "Edit Task"}
        </Typography>

        <IconButton
          color="primary"
          onClick={formMethods.handleSubmit(onSubmit)}
          style={{ marginLeft: "auto" }}
          sx={{ mr: 1 }}
        >
          <Save />
        </IconButton>
      </Stack>

      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Name: {student.name}
        <br />
        {student.batch ? <>Batch/Class: {student.batch}</> : null}
      </Typography>

      <FormProvider {...formMethods}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <RHTextField name="title" label="Title" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHTextField
              name="description"
              label="Description"
              fullWidth
              multiline
              minRows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHSelect
              name="status"
              getOptionLabel={(option) => option.label}
              getOptionKey={(option) => option.value}
              fullWidth
              options={statuses}
              label="Status"
              defaultValue={statuses[0]}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default Task;
