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
  },
};
export default customResolvers;
