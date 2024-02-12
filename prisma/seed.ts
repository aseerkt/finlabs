import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { users } from './seeds';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started');
  console.time('seed');

  // USERS
  const hash = await bcrypt.hash(process.env.SEED_PASSWORD!, 12);
  await prisma.$transaction(
    users.map((user) =>
      prisma.user.upsert({
        where: {
          username: user.usename,
          email: user.email,
        },
        update: {},
        create: {
          username: user.usename,
          email: user.email,
          name: user.name,
          password: hash,
        },
      })
    )
  );

  console.timeEnd('seed');
  console.log('Seeding started');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
