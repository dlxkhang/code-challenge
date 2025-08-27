import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.user.deleteMany()

  // Create demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        fullName: 'John Doe',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        fullName: 'Jane Smith',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.johnson@example.com',
        fullName: 'Mike Johnson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.wilson@example.com',
        fullName: 'Sarah Wilson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david.brown@example.com',
        fullName: 'David Brown',
      },
    }),
  ])

  console.log(`✅ Seeded ${users.length} users`)
  
  users.forEach(user => {
    console.log(`- ${user.fullName} (${user.email})`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
