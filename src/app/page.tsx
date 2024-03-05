"use client";
import UploadButton from "@/components/UploadButton";
import { supabase } from "@/utils/supabase/client";
import { Mail, Phone } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const matches = useMediaQuery("(min-width:600px)");

  const [students, setStudents] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [search] = useDebounce(searchText, 1500);

  React.useEffect(() => {
    // fetch students
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return console.error("User not found");

      const { data, error } = await supabase
        .from("student")
        .select("*")
        .eq("created_by", user.id)
        .ilike("name", `%${searchText}%`);

      if (error) return console.error(error);
      if (data) setStudents(data);
    })();
  }, [search]);

  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Students 🧑‍🎓
      </Typography>
      <Stack justifyContent={"end"}>
        <TextField
          id="outlined-required"
          label="Search"
          placeholder="Search by name"
          sx={{ mb: 3, width: matches ? "30vw" : "100%", ml: "auto" }}
          value={searchText}
          //debounce search
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>
      <Grid
        container
        spacing={3}
        pb={10}
        sx={{ overflowY: "scroll", maxHeight: "80vh" }}
        alignItems={"center"}
      >
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card>
              <CardHeader title={student.name} />
              <CardContent>
                <Stack direction={"row"} spacing={2}>
                  <Stack direction={"column"} flex={1}>
                    <Typography variant="body1">
                      Class/Batch: {student.batch}
                    </Typography>
                    <Typography variant="body1">Age: {student.age}</Typography>
                  </Stack>

                  <Stack
                    direction={"row"}
                    alignItems={"end"}
                    justifyContent={"end"}
                  >
                    <IconButton
                      aria-label="Mail"
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = `mailto:${student.email}`;
                        a.click();
                      }}
                    >
                      <Mail />
                    </IconButton>
                    <IconButton
                      aria-label="Call"
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = `tel:${student.phone}`;
                        a.click();
                      }}
                    >
                      <Phone />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UploadButton />
    </div>
  );
}
