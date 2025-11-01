-- CreateTable
CREATE TABLE "GithubCreds" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GithubCreds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GithubCreds" ADD CONSTRAINT "GithubCreds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
