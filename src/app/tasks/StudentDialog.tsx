"use client";
import theme from "@/theme";
import { supabase } from "@/utils/supabase/client";
import { Close, Person } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type StudentDialogProps = {
  open: boolean;
  onClose: () => void;
};
const emails = ["username@gmail.com", "user02@gmail.com"];

const StudentDialog = ({ open, onClose }: StudentDialogProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const route = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return console.error("User not found");
      const { data, error } = await supabase
        .from("student")
        .select("name,id")
        .order("created_at", { ascending: false })
        .eq("created_by", user.id);
      if (error) console.error("Error fetching students", error);
      if (data) setStudents(data);
    };
    fetchData();
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: "80vw", maxHeight: "80vh" } }}
    >
      <DialogTitle
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 10,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <>Select student</>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {students.map((student) => (
          <ListItem disableGutters key={student.id}>
            <ListItemButton
              onClick={() => {
                route.push(`/student/${student.id}/tasks/new`);
                onClose();
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={student.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default StudentDialog;
