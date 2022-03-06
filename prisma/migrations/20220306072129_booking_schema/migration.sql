-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "hospital_name" TEXT NOT NULL,
    "prescription_image" TEXT NOT NULL,
    "prescription_date" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "labs_available" INTEGER,
    "labId" INTEGER
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_id_key" ON "Lab"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;
