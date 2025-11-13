"use client";
import { NavLinks } from "@/constants/NavLinks";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import NavButton from "./NavButton";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute top-0 right-0 left-0 px-4 py-3 flex items-center justify-between bg-sidebar-primary/10 border border-sidebar-accent z-100">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Image
            src={"/navigation_logo-bg.png"}
            alt="logo"
            width={60}
            height={60}
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-4">
          {NavLinks.map((link) => (
            <NavButton key={link.title} title={link.title} link={link.link} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        {mounted && (
          <button
            className="cursor-pointer"
            onClick={() =>
              setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
          >
            {resolvedTheme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        )}
        <UserButton appearance={{ theme: "simple" }} />
      </div>
    </div>
  );
};

export default Navbar;
