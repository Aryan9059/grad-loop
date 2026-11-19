-- Allow referral requests made directly to an alum (not tied to an opportunity)
ALTER TABLE "ReferralRequest" ALTER COLUMN "opportunityId" DROP NOT NULL;
ALTER TABLE "ReferralRequest" ADD COLUMN IF NOT EXISTS "company" TEXT;
ALTER TABLE "ReferralRequest" ADD COLUMN IF NOT EXISTS "message" TEXT;
