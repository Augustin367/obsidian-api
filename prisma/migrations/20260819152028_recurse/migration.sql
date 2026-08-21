/*
  Migration:
  - Brand enum -> TEXT
  - ProductCategory old values -> new values
  - memory -> storage
  - Add model and ram
*/

BEGIN;

-- ============================================================
-- 1. Alter ProductCategory safely
-- ============================================================

CREATE TYPE "ProductCategory_new" AS ENUM (
  'TABLET',
  'NOTEBOOK',
  'HEADPHONE',
  'ACCESSORY',
  'SMARTPHONE',
  'SMARTWATCH'
);

ALTER TABLE "Product"
ALTER COLUMN "category" TYPE "ProductCategory_new"
USING (
  CASE "category"::text
    WHEN 'IPHONE' THEN 'SMARTPHONE'
    WHEN 'IPAD' THEN 'TABLET'
    WHEN 'MACBOOK' THEN 'NOTEBOOK'
    WHEN 'APPLE_WATCH' THEN 'SMARTWATCH'
    WHEN 'AIRPODS' THEN 'HEADPHONE'
    WHEN 'ACCESSORY' THEN 'ACCESSORY'
  END
)::"ProductCategory_new";

ALTER TYPE "ProductCategory" RENAME TO "ProductCategory_old";

ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";

DROP TYPE "public"."ProductCategory_old";


-- ============================================================
-- 2. Change brand from enum -> TEXT
-- ============================================================

ALTER TABLE "Product"
ALTER COLUMN "brand" TYPE TEXT
USING "brand"::text;


-- ============================================================
-- 3. Add new product fields
-- ============================================================

ALTER TABLE "Product"
ADD COLUMN "model" TEXT,
ADD COLUMN "ram" TEXT,
ADD COLUMN "storage" TEXT;


-- ============================================================
-- 4. Migrate existing memory data -> storage
-- ============================================================

UPDATE "Product"
SET "storage" = "memory"
WHERE "memory" IS NOT NULL;


-- ============================================================
-- 5. Remove old memory field
-- ============================================================

ALTER TABLE "Product"
DROP COLUMN "memory";


-- ============================================================
-- 6. Remove old Brand enum
-- ============================================================

DROP TYPE "Brand";

COMMIT;