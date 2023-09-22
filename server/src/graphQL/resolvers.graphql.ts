import prisma from "../config/database";
import ProductController from "../controller/productController";
import UserController from "../controller/userController";

const customResolvers = {
  Mutation: {
    createProduct: async (parent, { input }) => {
      // console.log(parent);
      // return { name, price };

      const data = await ProductController.createProduct(input);
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
    createCategory: async (parent, { name, productId }) => {
      const data = await ProductController.createCategory(name);

      return data;
    },
  },

  Query: {
    getUsers: async () => {
      const data = await UserController.getAllUsers();
      return data;
    },
    loginUser: async (_, args) => {
      console.log("The email", args);
      const { email } = args;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // will add bcrypt & jwt later
      if (user.password !== args.password) {
        throw new Error("Invalid password");
      }

      return user;
    },
    getProducts: async () => {
      const data = await ProductController.getAllProducts();
      return data;
    },
    getCategories: async () => {
      const data = await ProductController.getAllCategories();
      return data;
    },
  },
};
export default customResolvers;
