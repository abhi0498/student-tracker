"use client";
import { Delete, Save } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useConfirm } from "material-ui-confirm";

const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  batch: yup.string(),
  age: yup.string(),
  email: yup.string().email("Invalid email"),
  phone: yup.string().required("Phone is required"),
});

const RHTextField = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label: string;
  [x: string]: any;
}) => {
  const { register, formState, getValues } = useFormContext();
  const { errors } = formState;
  const value = useWatch({ name });

  return (
    <>
      <TextField
        {...rest}
        {...register(name)}
        label={label}
        error={!!errors[name]}
        autoComplete="off"
        InputLabelProps={{ shrink: value ? true : false }}
      />
      {
        <Typography variant="caption" color="error">
          {errors[name]?.message?.toString()}
        </Typography>
      }
    </>
  );
};

const Student = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const formMethods = useForm({
    resolver: yupResolver(studentSchema),
  });
  const confirm = useConfirm();

  const deleteStudent = useCallback(async (studentId: string) => {
    const { error } = await supabase
      .from("student")
      .delete()
      .eq("id", studentId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Student deleted");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (params.id !== "new") {
      setLoading(true);
      supabase
        .from("student")
        .select("*")
        .eq("id", params.id)
        .single()
        .then((res) => {
          setLoading(false);
          if (res.error) return toast.error(res.error.message);
          formMethods.reset(res.data as any);
        });
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const onSubmit = async (data: any) => {
    console.log(data);
    let res: PostgrestSingleResponse<any> | null = null;
    if (params.id === "new") {
      res = await supabase.from("student").insert(data);
    } else {
      res = await supabase.from("student").update(data).eq("id", params.id);
    }
    if (res?.data?.error) {
      toast.error(res?.data?.error?.message);
    } else {
      toast.success("Student saved");
      router.push("/");
    }
  };
  return (
    <div style={{ margin: "2vw" }}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent={"space-between"}
        sx={{ mb: 6, mt: 3 }}
        px={2}
      >
        <Typography variant="h4" component="h1">
          {params.id !== "new" ? "Update Student" : "Add Student"}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {params.id !== "new" && (
            <IconButton
              color="error"
              onClick={() => {
                confirm({
                  description: "Are you sure you want to delete?",
                  title: "Warning!",
                }).then(async () => {
                  deleteStudent(params.id);
                });
              }}
            >
              <Delete />
            </IconButton>
          )}
          <IconButton
            color="primary"
            onClick={formMethods.handleSubmit(onSubmit)}
          >
            <Save />
          </IconButton>
        </Stack>
      </Stack>

      {loading ? (
        <Grid container spacing={2} px={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="text" height={50} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <FormProvider {...formMethods}>
          <Grid container spacing={2} px={2}>
            <Grid item xs={12} md={6}>
              <RHTextField name="name" label="Name" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHTextField name="batch" label="Batch" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHTextField name="age" label="Age" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHTextField name="email" label="Email" fullWidth type="email" />
            </Grid>

            <Grid item xs={12} md={6}>
              <RHTextField
                name="phone"
                label="Phone"
                fullWidth
                required
                type="number"
              />
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
};

export default Student;
