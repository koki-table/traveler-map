/*
  Warnings:

  - You are about to drop the `Prefecture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrefectureImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- DropForeignKey
ALTER TABLE "public"."PrefectureImage" DROP CONSTRAINT "PrefectureImage_prefecture_id_fkey";

-- DropTable
DROP TABLE "public"."Prefecture";

-- DropTable
DROP TABLE "public"."PrefectureImage";

-- CreateTable
CREATE TABLE "auth"."Prefecture" (
    "prefecture_id" SERIAL NOT NULL,
    "prefecture_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("prefecture_id")
);

-- CreateTable
CREATE TABLE "auth"."PrefectureImage" (
    "user_id" TEXT NOT NULL,
    "prefecture_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "PrefectureImage_pkey" PRIMARY KEY ("user_id","prefecture_id")
);

-- AddForeignKey
ALTER TABLE "auth"."PrefectureImage" ADD CONSTRAINT "PrefectureImage_prefecture_id_fkey" FOREIGN KEY ("prefecture_id") REFERENCES "auth"."Prefecture"("prefecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;
