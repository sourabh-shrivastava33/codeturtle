import { CircleCheck, GitForkIcon, Star } from "lucide-react";
import React from "react";
import ConnectedFlag from "./ConnectedFlag";
import { LANGUAGE_COLOR } from "@/constants/dashboard";
import PrivateFlag from "./PrivateFlag";
interface RepoListPropsInterface {
  id: string | number;
  fullName: string;
  description: string | null;
  connected: boolean;
  isPrivate: boolean;
  language: string | null;
  star: number;
  forksCount: number;
  selectedRepoId: string | number | null;
  handleSelectRepo: (repoId: string | number) => void;
}
const RepoList = ({
  fullName,
  id,
  handleSelectRepo,
  selectedRepoId,
  connected,
  forksCount,
  language,
  star,
  isPrivate,
  description,
}: RepoListPropsInterface) => {
  const languageColor =
    language && LANGUAGE_COLOR[language] ? LANGUAGE_COLOR[language] : "#ffffff";
  const isSelectedRepo = id == selectedRepoId;
  return (
    <div
      onClick={() => handleSelectRepo(id)}
      className={`relative px-5 py-4 border-2 mb-2 rounded-lg 
    ${isSelectedRepo ? "border-blue-500" : "border-border"}
    hover:bg-primary/15 
    ${connected ? "cursor-not-allowed bg-primary/10" : "bg-card"}
    min-h-[110px] flex flex-col justify-between
  `}
    >
      <div
        className={`absolute flex items-center justify-center top-4 left-4 w-5 h-5 border-2 ${
          connected
            ? "border-green-500"
            : isSelectedRepo
            ? "border-blue-500"
            : "border-border"
        } rounded-sm `}
      >
        {connected ? (
          <CircleCheck className="w-4 h-4 text-green-500" />
        ) : isSelectedRepo ? (
          <CircleCheck className="w-4 h-4 text-blue-500" />
        ) : (
          ""
        )}
      </div>
      <div className="ml-8 ">
        {/* Name and flages */}
        <div className="flex items-center gap-2">
          <p className="font-light text-sm text-foreground text-nowrap  text-ellipsis overflow-hidden">
            {fullName}
          </p>
          {connected && <ConnectedFlag />}
          {isPrivate && <PrivateFlag />}
        </div>

        {/* Description */}
        <p className="text-muted-foreground tracking-normal text-sm line-clamp-1">
          {description || "No description available."}
        </p>

        {/* language stars and forks count */}
        <div className="flex items-center gap-3 mt-2">
          {/* Language with a circular dot */}
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full `}
              style={{ backgroundColor: languageColor }}
            ></div>
            <span className="text-xs font-extralight text-muted-foreground/70 tracking-tight">
              {language || "..."}
            </span>
          </div>

          {/* star counts */}
          <div className="flex items-center gap-1">
            <Star className="w-[11.5px] h-[11.5px] text-muted-foreground/80" />
            <span className="text-xs text-muted-foreground/70">{star}</span>
          </div>

          {/* forks count */}
          <div className="flex items-center gap-1">
            <GitForkIcon className="w-3 h-3 text-muted-foreground/80" />
            <span className="text-xs text-muted-foreground/70">
              {forksCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
