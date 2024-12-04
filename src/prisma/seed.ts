import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const habitId = '575818d6-9044-4553-aafd-8b885f6a02b2';

  const generateUniqueDates = (count: number) => {
    const now = new Date();
    const yearAgo = new Date();
    yearAgo.setFullYear(now.getFullYear() - 1);

    const uniqueDates = new Set<string>();

    while (uniqueDates.size < count) {
      const randomDate = new Date(
        yearAgo.getTime() + Math.random() * (now.getTime() - yearAgo.getTime()),
      );
      uniqueDates.add(randomDate.toISOString());
    }

    return Array.from(uniqueDates).map((date) => new Date(date));
  };

  const uniqueDates = generateUniqueDates(10);

  const habitEntries = uniqueDates.map((date) => ({
    habitId,
    createdAt: date,
  }));

  // Insert habit entries into the database
  await prisma.habitEntries.createMany({
    data: habitEntries,
  });

  console.log(
    `Seeded ${habitEntries.length} unique habit entries for habitId ${habitId}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
