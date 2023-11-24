-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "answered_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
