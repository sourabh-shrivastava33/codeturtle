-- CreateTable
CREATE TABLE "Repositories" (
    "id" TEXT NOT NULL,
    "githubId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "autoReviewEnabled" BOOLEAN NOT NULL DEFAULT false,
    "webhookId" TEXT,
    "webhookSecret" TEXT,
    "defaultBranch" TEXT NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "cloneUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),
    "lastPrAt" TIMESTAMP(3),

    CONSTRAINT "Repositories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repositories" ADD CONSTRAINT "Repositories_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "GithubCreds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
