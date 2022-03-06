-- CreateTable
CREATE TABLE "Consult" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "hospital_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "health_condition" TEXT NOT NULL,
    "prescription_image" TEXT NOT NULL,
    "prescription_date" TIMESTAMP(3) NOT NULL,
    "user_email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Consult_id_key" ON "Consult"("id");

-- AddForeignKey
ALTER TABLE "Consult" ADD CONSTRAINT "Consult_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
