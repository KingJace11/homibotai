import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveUserToDb(user: { name?: string | null; email?: string | null }) {
  if (!user.email) return;

  // Only create the user if they don’t already exist
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: user.name || 'Unnamed Agent',
        email: user.email,
      },
    });
  }
}