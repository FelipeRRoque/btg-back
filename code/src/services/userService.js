const { User } = require("../models");
const bcrypt = require("bcryptjs");

class UserService {
  static async create(data) {
    const { name, email, password, role, age, gender, education_level } = data;

    // Verifica se já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error("Email já cadastrado");
    }

    // Hash da senha
    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash,
      role,
      age,
      gender,
      education_level,
    });

    return user;
  }

  static async findAll() {
    return await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });
  }

  static async findById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  static async update(id, data) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (data.email && data.email !== user.email) {
      const emailAlreadyExists = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (emailAlreadyExists) {
        throw new Error("E-mail já cadastrado por outro usuário.");
      }
    }

    const updateData = {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      role: data.role ?? user.role,
      age: data.age ?? user.age,
      education_level: data.education_level ?? user.education_level,
      gender: data.gender ?? user.gender,
    };

    if (data.password) {
      updateData.password_hash = await bcrypt.hash(data.password, 10);
    }

    await user.update(updateData);

    const updatedUser = user.toJSON();
    delete updatedUser.password_hash;

    return updatedUser;
  }

  static async delete(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await user.destroy();

    return { message: "Usuário removido com sucesso" };
  }
}

module.exports = UserService;
