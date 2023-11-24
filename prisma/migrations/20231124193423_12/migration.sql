-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "answered_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
