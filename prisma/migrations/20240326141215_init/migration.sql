/*
  Warnings:

  - You are about to drop the `Sample` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sample";

-- CreateTable
CREATE TABLE "Prefecture" (
    "prefecture_id" SERIAL NOT NULL,
    "prefecture_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("prefecture_id")
);

-- CreateTable
CREATE TABLE "PrefectureImage" (
    "user_id" TEXT NOT NULL,
    "prefecture_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "PrefectureImage_pkey" PRIMARY KEY ("user_id","prefecture_id")
);

-- AddForeignKey
ALTER TABLE "PrefectureImage" ADD CONSTRAINT "PrefectureImage_prefecture_id_fkey" FOREIGN KEY ("prefecture_id") REFERENCES "Prefecture"("prefecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;
