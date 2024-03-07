"use client";
import { statuses } from "@/api/enums";
import { fetchStudentById } from "@/api/student";
import { createTask, getTaskById, updateTask } from "@/api/task";
import RHSelect from "@/components/form/RHSelect";
import RHTextField from "@/components/form/RHTextField";
import { supabase } from "@/utils/supabase/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack, ArrowLeft, Save } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.object().required(),
  due_date: yup.date().required(),
});

const Task = ({ params }: { params: { id: string; task_id: string } }) => {
  const route = useRouter();
  const formMethods = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      status: statuses[0],
      description: " ",
      title: " ",
      due_date: dayjs().utc().toDate(),
    },
  });
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
          if (!data) return;
          formMethods.reset({
            ...data,
            status:
              statuses.find((status) => status.value === data.status) ||
              statuses[0],
          } as any);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      formMethods.reset({
        status: statuses[0],
        description: "",
        title: "",
        due_date: dayjs().utc().toDate(),
      });
    }
  }, [params.task_id]);

  const onSubmit = (data: any) => {
    data.status = data.status.value;

    if (params.task_id === "new") {
      createTask({ ...data, student_id: params.id })
        .then((data) => {
          toast.success("Task created");
          route.back();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      updateTask(data)
        .then((data) => {
          toast.success("Task updated");
          route.back();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const values = formMethods.watch();
  console.log(values);

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
        Task for {student.name}
        <br />
        {student.batch ? <>Batch/Class: {student.batch}</> : null}
      </Typography>

      <FormProvider {...formMethods}>
        <Grid container spacing={4}>
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
              // defaultValue={statuses[0]}
              isOptionEqualToValue={(option, value) => {
                console.log({
                  option,
                  value,
                  result: option.value === value.value,
                });

                return option.value === value.value;
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Due Date"
              value={dayjs(values.due_date)}
              sx={{ width: "100%" }}
              onChange={(date: Dayjs | null) => {
                if (!date) return;
                console.log({ date });
                formMethods.setValue("due_date", date.utc().toDate());
              }}
              format="DD/MM/YYYY"
            />
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default Task;
