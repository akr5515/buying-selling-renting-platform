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
      const data = await ProductController.createCategory(name, productId);

      return data;
    },
  },

  Query: {
    getUsers: async () => {
      const data = await UserController.getAllUsers();
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
  },
};
export default customResolvers;
