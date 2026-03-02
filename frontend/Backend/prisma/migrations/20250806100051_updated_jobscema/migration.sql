/*
  Warnings:

  - The `skillsrequired` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "skillsrequired",
ADD COLUMN     "skillsrequired" TEXT[];
