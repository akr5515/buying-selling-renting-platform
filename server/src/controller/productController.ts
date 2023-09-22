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

  async updateProduct(input) {
    const {
      productId,
      title,
      description,
      categories,
      price,
      rent,
      rentInterval,
    } = input;
    console.log("the input is ", input);
    const product = await prisma.product.update({
      where: { id: productId },

      data: {
        title,
        price,
        description,
        rent,
        rentInterval,
        categories: {
          connect: categories.map((categoryId) => ({
            id: parseInt(categoryId),
          })),
        },
      },
    });
    // console.log("From controller ", product);
    return product;
  }

  async getAllProducts() {
    const productsList = await prisma.product.findMany({
      include: {
        categories: true,
        owner: true,
        purchase: true,
      },
    });
    console.log("Products list is ", productsList);
    return productsList;
  }

  async getProductById(productId) {
    const productData = await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true, owner: true },
    });
    console.log("productData  is ", productData);

    return productData;
  }

  async deleteProduct(productId) {
    const productData = await prisma.product.delete({
      where: { id: productId },
    });
    console.log("productData  is ", productData);

    return productData;
  }

  async createCategory(name) {
    // const chats = await prisma.chat.findMany({});
    const product = await prisma.category.create({
      data: { name },
    });
    console.log("From controller ", product);
    return product;
  }
  async getAllCategories() {
    const categoriesData = await prisma.category.findMany();
    console.log("The categories", categoriesData);
    return categoriesData;
  }

  async buyProduct(input) {
    const { userId, productId } = input;
    const productData = await prisma.purchase.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
      include: {
        user: true,
        product: true,
      },
    });
    console.log("The productData ", productData);
    return productData;
  }

  async rentProduct(input) {
    const { userId, productId, startDate, endDate } = input;
    const productData = await prisma.rental.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        startDate,
        endDate,
      },
      include: {
        user: true,
        product: true,
      },
    });
    console.log("The productData ", productData);
    return productData;
  }

  async productPurchased(userId) {
    const productsList = await prisma.purchase.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            categories: true,
            owner: true,
          },
        },
      },
    });
    console.log("The products list: ", productsList);
    return productsList;
  }

  async productsSoldByUser(userId) {
    const productsList = await prisma.product.findMany({
      where: {
        ownerId: userId,
        purchase: {
          some: {},
        },
      },
      include: {
        categories: true,
        owner: true,
        purchase: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log("The products list: ", productsList);
    return productsList;
  }

  async productsLentByUser(userId) {
    const productsList = await prisma.product.findMany({
      where: {
        ownerId: userId,
        rental: {
          some: {},
        },
      },
      include: {
        categories: true,
        owner: true,
        purchase: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log("The products list: ", productsList);
    return productsList;
  }

  async productsRentedByUser(userId) {
    const productsList = await prisma.rental.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            categories: true,
            owner: true,
            rental: true,
          },
        },
      },
    });
    console.log("The products list: ", productsList);
    return productsList;
  }
}

const ProductController = new productController();
export default ProductController;
