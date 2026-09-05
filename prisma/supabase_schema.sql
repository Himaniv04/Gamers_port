-- ============================================================
-- GAMERS PORT - PostgreSQL Schema for Supabase
-- Run this entire script in:
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('PC', 'CONSOLE', 'VR', 'SIMULATOR');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('TOURNAMENT', 'OFFER', 'ANNOUNCEMENT');

-- CreateTable: Gaming Stations
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StationType" NOT NULL DEFAULT 'PC',
    "specs" TEXT[],
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Bookings
-- NOTE: startTime/endTime can exceed "23:00" for overnight slots (e.g. "26:00" = 2 AM next day)
-- bookingDate always holds the session-origin date (may be the previous day for overnight continuations)
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "durationHours" INTEGER NOT NULL DEFAULT 1,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "lockExpiresAt" TIMESTAMP(3) NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Blog Posts / Events
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "bannerUrl" TEXT NOT NULL,
    "bannerPublicId" TEXT NOT NULL DEFAULT '',
    "eventDate" TIMESTAMP(3),
    "category" "PostCategory" NOT NULL DEFAULT 'ANNOUNCEMENT',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Gallery Photos
CREATE TABLE "gallery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Ambience',
    "tags" TEXT[],
    "uploadedBy" TEXT NOT NULL DEFAULT 'Admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Newsletter Subscribers
CREATE TABLE "subscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- ============================================================
-- NEW: Operating Hours (per day of week)
-- dayOfWeek: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday,
--            4=Thursday, 5=Friday, 6=Saturday
-- closeHour: 1-23 for same-day close, 24-47 for overnight
--   e.g. closeHour=46 means 10 PM the next day (22 + 24 = 46)
-- isOvernight: true when the session continues past midnight
-- isClosed: true when shop is fully closed that day
-- ============================================================
CREATE TABLE "operating_hours" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openHour" INTEGER NOT NULL DEFAULT 8,
    "closeHour" INTEGER NOT NULL DEFAULT 22,
    "isOvernight" BOOLEAN NOT NULL DEFAULT false,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "operating_hours_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX "bookings_stationId_bookingDate_status_idx"
  ON "bookings"("stationId", "bookingDate", "status");

CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");
CREATE UNIQUE INDEX "operating_hours_dayOfWeek_key" ON "operating_hours"("dayOfWeek");

-- Foreign Key
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_stationId_fkey"
  FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ============================================================
-- Default Operating Hours Seed
-- Mon–Fri: 8 AM to 10 PM (same day)
-- Saturday: 8 AM to Sunday 10 PM (overnight, closeHour=46)
-- Sunday: Closed (continuation of Saturday overnight session)
-- ============================================================
INSERT INTO "operating_hours" ("dayOfWeek", "openHour", "closeHour", "isOvernight", "isClosed", "updatedAt") VALUES
  (0, 8, 22, false, true,  NOW()),  -- Sunday:    CLOSED
  (1, 8, 22, false, false, NOW()),  -- Monday:    8 AM – 10 PM
  (2, 8, 22, false, false, NOW()),  -- Tuesday:   8 AM – 10 PM
  (3, 8, 22, false, false, NOW()),  -- Wednesday: 8 AM – 10 PM
  (4, 8, 22, false, false, NOW()),  -- Thursday:  8 AM – 10 PM
  (5, 8, 22, false, false, NOW()),  -- Friday:    8 AM – 10 PM
  (6, 8, 46, true,  false, NOW());  -- Saturday:  8 AM → Sunday 10 PM (overnight)
