/*
  Warnings:

  - The values [TYPE_ONE,TYPE_TWO] on the enum `TaskTypeName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskTypeName_new" AS ENUM ('DEFAULT', 'DRAGABLE', 'CODE');
ALTER TABLE "Task" ALTER COLUMN "type" TYPE "TaskTypeName_new" USING ("type"::text::"TaskTypeName_new");
ALTER TYPE "TaskTypeName" RENAME TO "TaskTypeName_old";
ALTER TYPE "TaskTypeName_new" RENAME TO "TaskTypeName";
DROP TYPE "TaskTypeName_old";
COMMIT;
