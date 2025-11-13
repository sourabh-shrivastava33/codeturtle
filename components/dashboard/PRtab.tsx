import { PullRequest } from "@prisma/client";
import React from "react";
import ReviewStatusBadge from "./ReviewStatusBadge";
import { GitPullRequest } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface PRtabProps extends PullRequest {
  repoName: string;
}

const PRtab = ({ pr }: { pr: PRtabProps }) => {
  return (
    <div className="px-4 py-2 mb-2 mt-1 border-2 border-border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <GitPullRequest size={12} className="text-foreground" />
          <p className="text-foreground text-sm tracking-wide ">
            {pr.description}
          </p>
        </div>
        <ReviewStatusBadge status={pr.reviewStatus} />
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <p>{pr.repoName}</p>
        <span>•</span>
        <p className="px-1 border bg-border/20 text-[10px] text-muted-foreground">
          {pr.title}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs font-light text-muted-foreground">
        <Image
          src={pr.authorAvatar!}
          alt="author avatar"
          width={18}
          height={18}
          className="rounded-full border border-border"
        />
        <span>{pr.author}</span>
        <span>•</span>
        <span>
          {formatDistanceToNow(new Date(pr.createdAt), {
            addSuffix: true,
            locale: enUS,
          })}
        </span>
      </div>
    </div>
  );
};

export default PRtab;
