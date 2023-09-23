import prisma from "../config/database";

class userController {
  async createUser(firstName, lastName, email, address, phone, password) {
    try {
      const user = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          phone: phone,
          password: password,
        },
      });
      console.log("From controller ", user);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAllUsers() {
    const usersList = await prisma.user.findMany();
    return usersList;
  }

  async loginUser(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // will add bcrypt & jwt later
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  }
}

const UserController = new userController();
export default UserController;
