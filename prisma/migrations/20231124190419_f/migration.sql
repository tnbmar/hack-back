-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_answered_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "answered_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
