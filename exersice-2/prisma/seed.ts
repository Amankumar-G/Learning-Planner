import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

type SeedConfig = {
  usersCount: number;
  minTasksPerUser: number;
  maxTasksPerUser: number;
};

const seedConfig: SeedConfig = {
  usersCount: Number(process.env.SEED_USERS_COUNT ?? 8),
  minTasksPerUser: Number(process.env.SEED_MIN_TASKS_PER_USER ?? 3),
  maxTasksPerUser: Number(process.env.SEED_MAX_TASKS_PER_USER ?? 8),
};

const rngSeed = Number(process.env.SEED_RANDOM_SEED ?? 20260317);
faker.seed(rngSeed);

const seedPassword =
  process.env.SEED_USER_PASSWORD ?? faker.internet.password({ length: 12 });

async function seed() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash(seedPassword, 10);

  for (let i = 0; i < seedConfig.usersCount; i += 1) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
      },
    });

    const tasksToCreate = faker.number.int({
      min: seedConfig.minTasksPerUser,
      max: seedConfig.maxTasksPerUser,
    });

    const taskData = Array.from({ length: tasksToCreate }, () => ({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      description: faker.lorem.paragraph(),
      completed: faker.datatype.boolean({ probability: 0.35 }),
      userId: user.id,
    }));

    await prisma.task.createMany({ data: taskData });
  }

  const usersCount = await prisma.user.count();
  const tasksCount = await prisma.task.count();

  console.log(
    `Seed complete: ${usersCount} users and ${tasksCount} tasks. Password used: ${seedPassword}`,
  );
}

async function runSeed() {
  try {
    await seed();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void runSeed();
