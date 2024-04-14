/*
  Warnings:

  - You are about to drop the column `fileName` on the `prefectureImages` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `prefectureImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prefectureImages" DROP COLUMN "fileName",
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL;
