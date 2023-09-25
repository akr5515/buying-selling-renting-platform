import ProductController from "../controller/productController";
import UserController from "../controller/userController";

const customResolvers = {
  Mutation: {
    createProduct: async (
      parent,
      { title, description, categories, price, rent, rentInterval, ownerId }
    ) => {
      // console.log(parent);
      // return { name, price };

      const data = await ProductController.createProduct(
        title,
        description,
        categories,
        price,
        rent,
        rentInterval,
        ownerId
      );
      return data;
    },
    createUser: async (
      parent,
      { firstName, lastName, email, address, phone, password }
    ) => {
      const data = await UserController.createUser(
        firstName,
        lastName,
        email,
        address,
        phone,
        password
      );

      return data;
    },
    createCategory: async (parent, { name }) => {
      const data = await ProductController.createCategory(name);

      return data;
    },
    buyProduct: async (parent, { userId, productId }) => {
      const data = await ProductController.buyProduct(userId, productId);

      return data;
    },
    rentProduct: async (parent, { userId, productId, startDate, endDate }) => {
      const data = await ProductController.rentProduct(
        userId,
        productId,
        startDate,
        endDate
      );

      return data;
    },
  },

  Query: {
    getUsers: async () => {
      const data = await UserController.getAllUsers();
      return data;
    },
    getProductById: async (_, args) => {
      const { productId } = args;
      const data = await ProductController.getProductById(productId);
      return data;
    },
    loginUser: async (_, args) => {
      const { email, password } = args;
      const data = await UserController.loginUser(email, password);
      return data;
    },
    getProducts: async () => {
      const data = await ProductController.getAllProducts();
      return data;
    },
    getCategories: async () => {
      const data = await ProductController.getAllCategories();
      return data;
    },
    productsPurchasedByUser: async (_, args) => {
      const { userId } = args;
      const data = await ProductController.productPurchased(userId);
      return data;
    },
    productsSoldByUser: async (_, args) => {
      const { userId } = args;
      const data = await ProductController.productsSoldByUser(userId);
      return data;
    },
    productsRentedByUser: async (_, args) => {
      const { userId } = args;
      const data = await ProductController.productsRentedByUser(userId);
      return data;
    },
    productsLentByUser: async (_, args) => {
      const { userId } = args;
      const data = await ProductController.productsLentByUser(userId);
      return data;
    },
  },
};
export default customResolvers;
