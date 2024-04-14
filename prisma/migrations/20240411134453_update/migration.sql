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
    "fileName" VARCHAR(255) NOT NULL DEFAULT '',
    "contentType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

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
