/*
  Warnings:

  - The `education` column on the `CandidateProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `exprerience` column on the `CandidateProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `CandidateProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."CandidateProfile" DROP COLUMN "education",
ADD COLUMN     "education" JSONB,
DROP COLUMN "exprerience",
ADD COLUMN     "exprerience" JSONB,
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[];
