"use client";
import NoData from "@/components/NoData";
import UploadButton from "@/components/UploadButton";
import { supabase } from "@/utils/supabase/client";
import {
  Assessment,
  Assignment,
  Delete,
  Edit,
  Mail,
  Phone,
  Sort,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  Modal,
  Select,
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

export default function Home() {
  const matches = useMediaQuery("(min-width:600px)");

  const [students, setStudents] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [search] = useDebounce(searchText, 1500);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return toast.error("User not found");

    const { data, error } = await supabase
      .from("student")
      .select("*")
      .eq("created_by", user.id)
      .ilike("name", `%${searchText}%`)
      .order("created_at", { ascending: false });

    if (error) {
      setLoading(false);
      return toast.error(error.message);
    }
    if (data) setStudents(data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ margin: "1.5rem" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Students 🧑‍🎓
      </Typography>
      <Stack
        justifyContent={"end"}
        direction={"row"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <TextField
          id="outlined-required"
          label="Search"
          placeholder="Search by name"
          sx={{ width: matches ? "30vw" : "100%", ml: "auto" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>

      {loading ? (
        <Grid
          container
          spacing={3}
          pb={10}
          sx={{ overflowY: "scroll", maxHeight: "80vh" }}
          alignItems={"center"}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" width={"100%"} height={200} />
            </Grid>
          ))}
        </Grid>
      ) : students.length === 0 ? (
        <NoData height={"65vh"} />
      ) : (
        <Grid
          container
          spacing={3}
          pb={10}
          px={1}
          sx={{ overflowY: "scroll", maxHeight: "80vh" }}
          alignItems={"center"}
        >
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card>
                <CardHeader
                  title={student.name}
                  action={
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"end"}
                      pr={1}
                    >
                      <IconButton
                        onClick={() => {
                          router.push(`/student/${student.id}/tasks`);
                        }}
                      >
                        <Assignment />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          router.push(`/student/${student.id}`);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Stack>
                  }
                />
                <CardContent>
                  <Stack direction={"row"} spacing={2}>
                    <Stack direction={"column"} flex={1}>
                      <Typography variant="body1">
                        Class/Batch: {student.batch || " - "}
                      </Typography>
                      <Typography variant="body1">
                        Age: {student.age || " - "}
                      </Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      alignItems={"end"}
                      justifyContent={"end"}
                    >
                      <IconButton
                        aria-label="Mail"
                        onClick={() => {
                          if (!student.email) {
                            return toast.error(
                              "No email found for this student"
                            );
                          }
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
      )}
      <UploadButton />
    </div>
  );
}
