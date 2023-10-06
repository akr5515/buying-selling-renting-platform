import prisma from "../config/database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
class userController {
  async createUser(firstName, lastName, email, address, phone, password) {
    try {
      const hashedPassword = await bcrypt
        .hash(password, 10)
        .then((hash) => hash);

      // console.log("Password ", hashedPassword);

      const user = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          phone: phone,
          password: hashedPassword,
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

    const checkedPassword = await bcrypt.compare(password, user.password);
    console.log("The checkedPassword ", checkedPassword);
    // will add bcrypt & jwt later
    if (!checkedPassword) {
      throw new Error("Invalid password");
    }

    delete user.password;

    const jwt = jsonwebtoken.sign(user, "jsonwebtoken", { expiresIn: "1h" });

    console.log("The user ", { ...user, token: jwt });

    return { ...user, token: jwt };
  }
}

const UserController = new userController();
export default UserController;
