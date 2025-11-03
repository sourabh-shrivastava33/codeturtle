import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GithubIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { SYSTEM_OPERATION_MESSAGE } from "../../constants/systemStatus";

const SignIn = async () => {
  const systemStatus: Response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/health`,
    {
      method: "GET",
    }
  );
  const { data } = await systemStatus.json();
  const isAllRunning = data.every((d: { status: boolean }) => d.status) ? 0 : 1;

  debugger;
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div>
        <Card className="relative md:min-w-xl shadow-2xl shadow-secondary bg-linear-to-br from-bg-background via-bg-background-80 to-background">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={200}
            height={0}
            className="absolute top-0 left-[35%]"
          />
          <CardHeader className=" flex flex-col items-center mt-[130px]">
            <CardTitle className="text-primary/80 ">
              Your personal code reviewer
            </CardTitle>
            <p className="text-muted-foreground font-light text-sm">
              AI powered code reviewer for your repositories
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-3">
            <SignInButton mode="modal">
              <Button className="bg-primary text-primary-foreground  hover:text-secondary-foreground hover:bg-secondary  transition-all duration-500  px-7 py-2 text-xs font-bold ">
                <GithubIcon size={20} />
                <span>Continue with Github</span>
              </Button>
            </SignInButton>
          </CardContent>
          <CardFooter className="text-center flex items-center justify-center ">
            <p className="text-xs font-normal text-muted-foreground/70">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div
            className={`w-3 h-3 ${
              isAllRunning == 0 ? " bg-green-600" : "bg-yellow-600"
            } rounded-4xl`}
          ></div>
          <p className="text-muted-foreground font-lighter text-xs">
            {SYSTEM_OPERATION_MESSAGE?.[isAllRunning]?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
