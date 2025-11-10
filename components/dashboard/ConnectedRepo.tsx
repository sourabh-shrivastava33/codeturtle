import { useFetchAllRepo } from "@/hooks/use-repo";
import { UserDataType } from "@/lib/types/user";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";

const ConnectedRepo = ({ user }: { user: UserDataType }) => {
  const { data, isSuccess } = useFetchAllRepo(user?.githubCreds?.id);

  return (
    <div className="flex-1 rounded-xl bg-card border-2 border-border w-full px-4 py-4 ">
      <h3 className="font-semibold tracking-wide text-foreground">
        Connected Repositories
      </h3>
      {data && data.length && (
        <section className="mt-5 flex flex-col justify-center gap-y-1.5 h-[100px]  overflow-y-scroll">
          {data.map((repo) => (
            <div
              key={repo.id}
              className="px-2 py-1 border border-border flex items-center justify-between rounded-lg "
            >
              <div>
                <p className="text-sm text-foreground/80 truncate max-w-[280px]">
                  {repo.fullName}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs  text-muted-foreground">
                    {repo._count.pullRequests} PRs •
                  </span>

                  <span className="text-xs  text-muted-foreground">
                    {formatDistanceToNow(new Date(repo.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ConnectedRepo;
