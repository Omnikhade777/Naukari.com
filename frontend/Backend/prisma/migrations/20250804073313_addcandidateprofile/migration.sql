-- CreateTable
CREATE TABLE "public"."CandidateProfile" (
    "id" TEXT NOT NULL,
    "profielphoto" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_userId_key" ON "public"."CandidateProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."CandidateProfile" ADD CONSTRAINT "CandidateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
