const User = require("../models/User");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const resolvers = {
    Query: {
        getUserById: async (_, args, contextValue) => {
            contextValue.auth();
            const { _id } = args;
            if (!_id) throw new Error("Id User is required");
            
            const user = await User.findById(_id)
            return user
        },

        getAllUser: async (_, args, contextValue) => {
            contextValue.auth();
            const users = await User.getAllUser();
            return users
        },

        getUserByUsername: async (_, args, contextValue) => {
            contextValue.auth();
            const { username } = args
            const user = await User.findByUname(username);
            return user;
        },

        getUserByEmail: async (_, args, contextValue) => {
            contextValue.auth();
            const { email } = args
            const user = await User.findByEmail(email);
            return user;
        }
    },

    Mutation: {
        register: async (_, args) => {
            const { name, username, email, password } = args;
            if (password.length < 6) throw new Error('Password must be at least 6 characters');
            if (!username) {
                throw new Error("Username is required");
            }
            if (!password) {
                throw new Error("Password is required");
            }

            const checkEmail = await User.findByEmail(email);
            if (checkEmail) throw new Error(`Email already exist`);

            const checkUsername = await User.findByUname(username);
            if (checkUsername) throw new Error("Username already exist");

            const newUser =
            {
                name,
                username,
                email,
                password
            }
            await User.create(newUser)
            return "Success register";
        },

        login: async (_, args) => {
            const { email, password } = args;
            const user = await User.findByEmail(email)

            if (!user) throw new Error("Email/Password invalid");

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) throw new Error("Email/Password invalid");

            const token = {
                accessToken: signToken({ id: user._id, email: user.email, username: user.username }),
                userId: user._id,
                username: user.username
            }


            return token;
        },
    },
};

module.exports = resolvers;