/*
  Warnings:

  - You are about to drop the column `userId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_userId_fkey";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "userId";
