/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,jobId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Application" ADD COLUMN     "resume" TEXT,
ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."CandidateProfile" ADD COLUMN     "education" TEXT,
ADD COLUMN     "exprerience" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "skills" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "jobtype" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "skillsrequired" TEXT;

-- CreateTable
CREATE TABLE "public"."savedjobs" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "savedjobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_candidateId_jobId_key" ON "public"."Application"("candidateId", "jobId");

-- AddForeignKey
ALTER TABLE "public"."savedjobs" ADD CONSTRAINT "savedjobs_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."savedjobs" ADD CONSTRAINT "savedjobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
