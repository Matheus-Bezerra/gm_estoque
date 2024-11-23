/*
  Warnings:

  - The values [WEITGHT] on the enum `TypeControl` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeControl_new" AS ENUM ('UNIT', 'WEIGHT');
ALTER TABLE "Product" ALTER COLUMN "typeControl" TYPE "TypeControl_new" USING ("typeControl"::text::"TypeControl_new");
ALTER TYPE "TypeControl" RENAME TO "TypeControl_old";
ALTER TYPE "TypeControl_new" RENAME TO "TypeControl";
DROP TYPE "TypeControl_old";
COMMIT;
