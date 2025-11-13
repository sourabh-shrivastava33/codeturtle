import { useFetchAllRepo } from "@/hooks/use-repo";
import { UserDataType } from "@/lib/types/user";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import EmptyState from "@/components/dashboard/EmtpyStateComponent"; // Add this import
import { useTheme } from "next-themes"; // If you're using next-themes
// OR import { useTheme } from "@/hooks/use-theme"; // If you have a custom hook

const ConnectedRepo = ({ user }: { user: UserDataType }) => {
  const { data, isSuccess } = useFetchAllRepo(user?.githubCreds?.id);
  const { theme } = useTheme(); // Get current theme
  const isDark = theme === "dark";

  return (
    <div className="flex-1 rounded-xl bg-card border-2 border-border w-full px-4 py-4 lg:flex lg:flex-col lg:min-h-0">
      <h3 className="font-semibold tracking-wide text-foreground">
        Connected Repositories
      </h3>

      {/* Show count */}
      <p className="text-sm text-muted-foreground mt-1">
        {data?.length || 0} repositories connected
      </p>

      {/* Empty State or Repository List */}
      {data && data.length > 0 ? (
        <section className="mt-5 flex flex-col gap-y-1.5 overflow-y-auto lg:flex-1 lg:min-h-0">
          {data.map((repo) => (
            <div
              key={repo.id}
              className="px-2 py-1 border border-border flex items-center justify-between rounded-lg transition-all duration-200 hover:bg-accent/50 hover:border-accent hover:shadow-sm cursor-pointer flex-shrink-0"
            >
              <div className="min-w-0">
                <p
                  className="text-sm text-foreground/80 truncate max-w-[280px]"
                  title={repo.fullName}
                >
                  {repo.fullName}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {repo._count.pullRequests} PRs •
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(repo.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 block flex-shrink-0"></span>
            </div>
          ))}
        </section>
      ) : (
        <div className="mt-5 lg:flex-1 lg:min-h-0 flex items-center justify-center">
          <EmptyState
            type="repository"
            isDark={isDark}
            onAction={() => {
              // Handle add repository action
              // You can navigate to add repo page or open a modal
              window.location.href = "/add-repository"; // or use router.push()
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ConnectedRepo;
