"use client";
import { Activity, LayoutDashboard, Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";

interface NavButtonProps {
  title: "dashboard" | "activity" | "settings";
  link: string;
}

const NavIcons = {
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
};

const NavButton = ({ link, title }: NavButtonProps) => {
  const path = usePathname();
  const router = useRouter();

  const isActivePath = path === link;
  return (
    <Button
      onClick={() => router.push(link)}
      className={`${
        isActivePath
          ? "bg-muted-foreground text-white hover:bg-muted-foreground hover:text-white"
          : "bg-background text-muted-foreground hover:bg-muted-foreground hover:text-white"
      } flex items-center gap-2 transition-colors duration-300 font-semibold`}
    >
      {NavIcons[title]}
      <span className="capitalize hidden md:block">{title}</span>
    </Button>
  );
};

export default NavButton;
