"use client";
import {
  AccountCircle,
  Assessment,
  Assignment,
  Group,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const BottomTabs = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const currentPath = usePathname();

  const items = [
    {
      label: "Students",
      icon: <Group />,
      path: "/",
    },
    {
      label: "Tasks",
      icon: <Assignment />,
      path: "/reports",
    },
    {
      label: "Reports",
      icon: <Assessment />,
      path: "/reports",
    },
    {
      label: "Profile",
      icon: <AccountCircle />,
      path: "/profile",
    },
  ];

  console.log(currentPath);
  useEffect(() => {
    if (currentPath === "/") setValue(0);
    if (currentPath === "/reports") setValue(1);
    if (currentPath === "/profile") setValue(2);
  }, [currentPath]);

  if (currentPath === "/login") return null;
  return (
    <BottomNavigation
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        //shadow
        boxShadow: "0px 0px 5px 0px #000",
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {items.map((item, index) => (
        <BottomNavigationAction
          key={index}
          label={item.label}
          icon={item.icon}
          onClick={() => router.push(item.path)}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomTabs;
