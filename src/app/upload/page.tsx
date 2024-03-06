"use client";
import { supabase } from "@/utils/supabase/client";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const keysinTable = [
  {
    label: "Name",
    key: "name",
    required: true,
  },
  {
    label: "Batch",
    key: "batch",
  },
  {
    label: "Age",
    key: "age",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Phone",
    key: "phone",
    required: true,
  },
];

const Upload = () => {
  const [uploadedKeys, setUploadedKeys] = React.useState<string[]>([]);
  const [uploadedData, setUploadedData] = React.useState<any[]>([]);
  const [fieldColumnMapping, setFieldColumnMapping] = React.useState<
    Record<string, string>
  >({});
  const router = useRouter();

  console.log({ fieldColumnMapping });

  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Upload Student Data 📂
      </Typography>
      <TextField
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          //if excel file
          if (
            e.target.files[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            console.log("Excel file");
            //e.target.files[0] convert to array buffer

            const data = await e.target.files[0].arrayBuffer();
            const workbook = await XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const raw_data = XLSX.utils.sheet_to_json(worksheet);

            const uploadedKeys = Object.keys(raw_data?.[0] || {});

            setUploadedData(raw_data);
            setUploadedKeys(uploadedKeys);

            //set default feild mapping
            const defaultFieldMapping: Record<string, string> = {};
            keysinTable.forEach((key) => {
              const value = uploadedKeys.find((k) =>
                k.toLowerCase().includes(key.key.toLowerCase())
              );
              if (value) {
                defaultFieldMapping[key.key] = value;
              }
            });

            // setFieldColumnMapping(defaultFieldMapping);
            console.log(raw_data);
            toast.success("File imported successfully");
          }
        }}
        type="file"
        inputProps={{
          accept:
            ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        }}
        variant="outlined"
        sx={{ mb: 3, width: "100%", ml: "auto" }}
      />

      <Stack justifyContent={"end"}>
        <Button
          sx={{ ml: "auto" }}
          onClick={() => {
            //create a template
            const ws = XLSX.utils.json_to_sheet([
              {
                Name: "",
                Batch: "",
                Age: "",
                Email: "",
                Phone: "",
              },
            ]);

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "student_data_template.xlsx");
          }}
        >
          Download Template
        </Button>
      </Stack>

      {uploadedKeys.length !== 0 && (
        <>
          <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
            Choose the columns in excel which corresponds to the following:
          </Typography>

          <Grid
            container
            spacing={3}
            sx={{ overflowY: "scroll", maxHeight: "60vh" }}
          >
            {
              //show the keys in the table
              keysinTable.map((key) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body1" flex={1} mb={1}>
                    {key.label} {key.required ? "*" : ""}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Column
                    </InputLabel>
                    <Select
                      value={fieldColumnMapping[key.key] || ""}
                      label="Select Column"
                      style={{
                        flex: 1,
                      }}
                      onChange={(e) => {
                        setFieldColumnMapping((prev) => ({
                          ...prev,
                          [key.key]: e.target.value,
                        }));
                      }}
                    >
                      {uploadedKeys.map((uploadedKey) => (
                        <MenuItem
                          key={uploadedKey}
                          value={uploadedKey}
                          disabled={Object.values(fieldColumnMapping).includes(
                            uploadedKey
                          )}
                        >
                          {uploadedKey}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))
            }
          </Grid>
        </>
      )}
      <Button
        style={{
          position: "fixed",
          bottom: "10vh",
          right: "2vw",
        }}
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("Submit");
          //all require keys should be present
          for (const key of keysinTable) {
            if (key.required && !fieldColumnMapping[key.key]) {
              toast.error(`Please map the ${key.label} column`);
              return;
            }
          }

          //form array of objects
          const data = [];
          for (let i = 0; i < uploadedData.length; i++) {
            const obj: Record<string, string> = {};
            for (const key in fieldColumnMapping) {
              obj[key] = uploadedData[i][fieldColumnMapping[key]];
            }
            data.push(obj);
          }

          supabase
            .from("student")
            .insert([...(data as any[])])
            .then((res) => {
              console.log(res);
              if (res.error) {
                toast.error(res.error.message);
                return;
              } else {
                toast.success("Data uploaded successfully");
                router.push("/");
              }
            });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Upload;
