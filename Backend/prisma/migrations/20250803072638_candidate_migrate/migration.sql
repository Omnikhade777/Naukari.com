/*
  Warnings:

  - You are about to drop the column `description` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Candidate" DROP COLUMN "description",
DROP COLUMN "profilePhoto";
