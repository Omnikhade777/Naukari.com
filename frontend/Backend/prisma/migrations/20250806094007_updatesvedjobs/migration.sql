/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,jobId]` on the table `savedjobs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "savedjobs_candidateId_jobId_key" ON "public"."savedjobs"("candidateId", "jobId");
