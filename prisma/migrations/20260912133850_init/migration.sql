-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'HYBRID', 'ON_SITE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'INTERVIEWING', 'OFFERED', 'REJECTED', 'STALLED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "url" TEXT,
    "salary" TEXT,
    "location" TEXT,
    "workMode" "WorkMode" NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalSettings" (
    "id" TEXT NOT NULL,
    "stalledThresholdDays" INTEGER NOT NULL DEFAULT 14,

    CONSTRAINT "GlobalSettings_pkey" PRIMARY KEY ("id")
);
