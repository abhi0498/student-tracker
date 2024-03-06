import {
  Autocomplete,
  AutocompleteProps,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHSelect = ({
  options = [],
  defaultValue,
  name,
  label,
  ...rest
}: {
  options: any[];
  defaultValue?: any;
  name: string;
  label: string;
} & Omit<AutocompleteProps<any, false, false, false>, "renderInput">) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ ...props }) => (
        <Autocomplete
          options={options}
          renderInput={(params) => <TextField label={label} {...params} />}
          {...props.field}
          {...rest}
        />
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
};

export default RHSelect;
