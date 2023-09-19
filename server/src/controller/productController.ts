import prisma from "../config/database";

class productController {
  async createProduct(title, price, rent, rentInterval, categories) {
    // const chats = await prisma.chat.findMany({});
    const product = await prisma.product.create({
      data: {
        title,
        price,
        rent,
        rentInterval,
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
        },
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
