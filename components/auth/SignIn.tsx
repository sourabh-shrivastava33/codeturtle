import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GithubIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-secondary">
      <div className="md:min-w-xl shadow-2xl shadow-secondary">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <GithubIcon size={40} />
            <CardTitle className="text-primary/80 ">
              Your personal code reviewer
            </CardTitle>
            <p className="text-slate-700 font-bold">
              AI powered code reviewer for your repositories
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-3">
            <SignInButton mode="modal">
              <Button className="bg-primary text-secondary hover:bg-muted-foreground  transition-all duration-300 uppercase px-2 py-1">
                Sign In
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
