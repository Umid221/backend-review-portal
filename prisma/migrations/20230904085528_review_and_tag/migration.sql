-- CreateEnum
CREATE TYPE "ReviewGroupEnum" AS ENUM ('movies', 'books', 'games');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "reviewedArt" TEXT NOT NULL,
    "group" "ReviewGroupEnum" NOT NULL,
    "reviewText" TEXT NOT NULL,
    "image" TEXT,
    "grade" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReviewTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewTags_AB_unique" ON "_ReviewTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewTags_B_index" ON "_ReviewTags"("B");

-- AddForeignKey
ALTER TABLE "_ReviewTags" ADD CONSTRAINT "_ReviewTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewTags" ADD CONSTRAINT "_ReviewTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
