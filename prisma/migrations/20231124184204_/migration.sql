-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "answered_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
