
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.createMany({
    data: [
      {
        name: "Jane Doe",
        comment: "Is this still available?",
        timestamp: new Date().toISOString(),
        isInterested: true,
        repliedText: null,
      },
      {
        name: "John Smith",
        comment: "Can I see more photos?",
        timestamp: new Date().toISOString(),
        isInterested: false,
        repliedText: null,
      },
    ],
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
