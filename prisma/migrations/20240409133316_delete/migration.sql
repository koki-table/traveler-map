/*
  Warnings:

  - You are about to drop the `prefectureImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prefectures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "prefectureImages" DROP CONSTRAINT "prefectureImages_prefectureId_fkey";

-- DropForeignKey
ALTER TABLE "prefectureImages" DROP CONSTRAINT "prefectureImages_userId_fkey";

-- DropTable
DROP TABLE "prefectureImages";

-- DropTable
DROP TABLE "prefectures";

-- DropTable
DROP TABLE "users";
