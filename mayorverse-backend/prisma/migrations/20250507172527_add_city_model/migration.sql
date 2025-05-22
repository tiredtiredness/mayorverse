-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creationDate" TIMESTAMP(3),
    "map" TEXT,
    "population" INTEGER,
    "avatarUrl" TEXT,
    "mayorId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_mayorId_fkey" FOREIGN KEY ("mayorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
