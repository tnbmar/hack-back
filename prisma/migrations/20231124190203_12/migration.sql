/*
  Warnings:

  - Made the column `answered_id` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_answered_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "answered_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
