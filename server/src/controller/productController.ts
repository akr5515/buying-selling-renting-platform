import prisma from "../config/database";

class productController {
  async createProduct(input) {
    const {
      title,
      description,
      categories,
      price,
      rent,
      rentInterval,
      ownerId,
    } = input;
    console.log("the input is ", input);
    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        rent,
        rentInterval,
        ownerId,
        categories: {
          connect: categories.map((categoryId) => ({
            id: parseInt(categoryId),
          })),
        },
      },
      include: {
        categories: true,
        owner: true,
        purchase: true,
        rental: true,
      },
    });
    // console.log("From controller ", product);
    return product;
  }

  async getAllProducts() {
    const productsList = await prisma.product.findMany();
    return productsList;
  }

  async createCategory(name, productId) {
    // const chats = await prisma.chat.findMany({});
    const product = await prisma.category.create({
      data: { name, productId },
    });
    console.log("From controller ", product);
    return product;
  }
  async getAllCategories() {
    const categories = await prisma.category.findMany();
    return categories;
  }
}

const ProductController = new productController();
export default ProductController;
