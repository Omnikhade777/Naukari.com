/*
  Warnings:

  - Added the required column `apply` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Application" ADD COLUMN     "apply" BOOLEAN NOT NULL;
