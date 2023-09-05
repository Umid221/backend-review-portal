/*
  Warnings:

  - You are about to drop the column `group` on the `Review` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "group",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "ReviewGroupEnum";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
