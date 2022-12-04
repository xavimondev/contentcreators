/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Creator" ALTER COLUMN "username" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Creator_username_key" ON "Creator"("username");
