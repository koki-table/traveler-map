/*
  Warnings:

  - You are about to drop the `Prefecture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrefectureImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrefectureImage" DROP CONSTRAINT "PrefectureImage_prefectureId_fkey";

-- DropForeignKey
ALTER TABLE "PrefectureImage" DROP CONSTRAINT "PrefectureImage_userId_fkey";

-- DropTable
DROP TABLE "Prefecture";

-- DropTable
DROP TABLE "PrefectureImage";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prefectures" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "prefectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prefectureImages" (
    "userId" INTEGER NOT NULL,
    "prefectureId" INTEGER NOT NULL,

    CONSTRAINT "prefectureImages_pkey" PRIMARY KEY ("userId","prefectureId")
);

-- CreateIndex
CREATE UNIQUE INDEX "prefectureImages_userId_key" ON "prefectureImages"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "prefectureImages_prefectureId_key" ON "prefectureImages"("prefectureId");

-- CreateIndex
CREATE INDEX "prefectureImages_userId_prefectureId_idx" ON "prefectureImages"("userId", "prefectureId");

-- AddForeignKey
ALTER TABLE "prefectureImages" ADD CONSTRAINT "prefectureImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prefectureImages" ADD CONSTRAINT "prefectureImages_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "prefectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
