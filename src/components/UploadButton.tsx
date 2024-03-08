"use client";

import { Add, UploadFile } from "@mui/icons-material";
import {
  Backdrop,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const UploadButton = () => {
  const matches = useMediaQuery("(min-width:600px)");
  console.log(matches);

  const router = useRouter();
  const actions = [
    {
      icon: <UploadFile />,
      name: "Upload",
      onClick: () => {
        if (!matches) {
          alert("Upload works best on desktop devices.");
          return;
        }
        router.push("/upload");
      },
    },
    { icon: <Add />, name: "Add", onClick: () => router.push("/student/new") },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Add/Upload Student Data"
        sx={{ position: "absolute", bottom: "10vh", right: "2vw" }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UploadButton;
