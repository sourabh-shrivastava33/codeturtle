"use client";
import { NavLinks } from "@/constants/NavLinks";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import NavButton from "./NavButton";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  console.log(resolvedTheme);
  return (
    <div className="absolute top-0 right-0 left-0 px-4 py-3 flex items-center justify-between bg-sidebar-primary/10 border border-sidebar-accent z-100">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Image
            src={"/nav_logo.png"}
            alt="logo"
            width={60}
            height={60}
            onClick={() => redirect("/dashboard")}
          />
        </div>
        <div className="flex items-center gap-4">
          {NavLinks.map((link) => (
            <NavButton key={link.title} title={link.title} link={link.link} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          className="cursor-pointer"
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        >
          {resolvedTheme === "light" ? (
            <Moon className="text-muted-foreground" size={20} />
          ) : (
            <Sun className="text-yellow-300" size={20} />
          )}
        </button>
        <UserButton appearance={{ theme: "simple" }} />
      </div>
    </div>
  );
};

export default Navbar;
