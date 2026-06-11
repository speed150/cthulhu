-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "occupation" TEXT,
    "age" INTEGER,
    "residence" TEXT,
    "birthplace" TEXT,
    "userId" TEXT NOT NULL,
    "HP" INTEGER NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "mjWound" BOOLEAN NOT NULL,
    "MP" INTEGER NOT NULL,
    "maxMP" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,
    "sanity" INTEGER NOT NULL,
    "characteristics" JSONB NOT NULL,
    "baseSkills" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
