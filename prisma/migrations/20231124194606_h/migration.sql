-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "answered_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_answered_id_fkey" FOREIGN KEY ("answered_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
