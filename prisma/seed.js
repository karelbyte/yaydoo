const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@yaydoo.com";
  await prisma.user.delete({ where: { email } }).catch(() => {});

  const hashedPassword = await bcrypt.hash("1234", 10);

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
      id: 'cl6znm2f7001456jch8dqmcs3',
      name: "Tenis Addidas",
      img: "/img/cl6znm2f7001456jch8dqmcs3.jpg",
      sku: "SJDUD",
      quantity: 10,
      price: 800.5,
      userId: user.id,
    },
    {
      id: 'cl6zqpbur0012x8jcqdqro7in',
      name: "Tenis Pumas",
      img: "/img/cl6zqpbur0012x8jcqdqro7in.jpg",
      sku: "SADUDA",
      quantity: 20,
      price: 1200.0,
      userId: user.id,
    },
    {
      id: 'cl6zqpbur0011x8jcel4v0zj2',
      name: "Tenis Rebook",
      img: "/img/cl6zqpbur0011x8jcel4v0zj2.jpg",
      sku: "SOSJD-D",
      quantity: 40,
      price: 1300.0,
      userId: user.id,
    },
    {
      id:'cl6zqpbur0013x8jcne6pzpwg',
      name: "Tenis Nike",
      img: "/img/cl6zqpbur0013x8jcne6pzpwg.webp",
      sku: "AAJDUD",
      quantity: 10,
      price: 1400.0,
      userId: user.id,
    },
    {
      id: 'cl6zqpbur0017x8jcf1xoenny',
      name: "Tenis Lacoste",
      img: "/img/cl6zqpbur0017x8jcf1xoenny.jpg",
      sku: "AASJD12D",
      quantity: 50,
      price: 1560.0,
      userId: user.id,
    },
    {
      id: 'cl6zqpbur0017x8jcf1xoennd',
      name: "Tenis Gucci",
      img: "/img/cl6zqpbur0017x8jcf1xoennd.webp",
      sku: "GJD12D",
      quantity: 50,
      price: 1160.0,
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
