const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@yaydoo.com";
  await prisma.user.delete({ where: { email } }).catch(() => {});

  const hashedPassword = await bcrypt.hash("karel", 10);

  const user = await prisma.user.create({
    data: {
      email,
      role: "admin",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });



  const products = [
    {
      name: "Zapatos Flexi",
      img: "",
      sku: "SJDUD",
      quantity: 10,
      price: 800.5,
      userId: user.id,
    },
    {
      name: "Tenis Pumas",
      img: "",
      sku: "SADUDA",
      quantity: 20,
      price: 1200.0,
      userId: user.id,
    },
    {
      name: "Tenis Rebook",
      img: "",
      sku: "SOSJD-D",
      quantity: 40,
      price: 1300.0,
      userId: user.id,
    },
    {
      name: "Tenis Nike",
      img: "",
      sku: "AAJDUD",
      quantity: 10,
      price: 1400.0,
      userId: user.id,
    },
    {
      name: "Tenis Rebook",
      img: "",
      sku: "SJDUS11D",
      quantity: 60,
      price: 1700.0,
      userId: user.id,
    },
    {
      name: "Tenis Lacoste",
      img: "",
      sku: "AASJD12D",
      quantity: 50,
      price: 1560.0,
      userId: user.id,
    },
  ];

  products.forEach(async (product) => {
    await prisma.product.create({
      data: product
    })
  });

  console.log(`Database has been seeded.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
