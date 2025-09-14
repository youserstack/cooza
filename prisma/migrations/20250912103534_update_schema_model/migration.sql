/*
  Warnings:

  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maker` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "category" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "maker" TEXT NOT NULL,
ADD COLUMN     "seller" TEXT NOT NULL;
