import { TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const RHTextField = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label: string;
  [x: string]: any;
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <>
      <TextField
        {...rest}
        {...register(name)}
        label={label}
        error={!!errors[name]}
        autoComplete="off"
      />
      {
        <Typography variant="caption" color="error">
          {errors[name]?.message?.toString()}
        </Typography>
      }
    </>
  );
};

export default RHTextField;
