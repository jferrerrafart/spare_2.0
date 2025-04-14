-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "member_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "surveys_completed" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "surveys_created" INTEGER NOT NULL DEFAULT 0,
    "funds" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "strike_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "surveys_completed_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option_a" TEXT NOT NULL,
    "option_b" TEXT NOT NULL,
    "option_c" TEXT NOT NULL,
    "option_d" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responses_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "survey_id" INTEGER NOT NULL,
    "selected_option" TEXT NOT NULL,
    "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
