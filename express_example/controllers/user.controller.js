import User from '../models/user';
import MD5 from 'md5';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserController = {};
const secretToken = '77yIw21VsG';


UserController.getAll = async (req, res, next) => {
    try {
        const { token } = req.headers;
        // const token = req.headers.token;
        if (!token) {
            return next(new Error('Not found authentication'));
        }

        const data = await JWT.verify(token, secretToken);
        const _id = data._id;
        const user = await User.findById(_id);
        if (!user) {
            return next(new Error('Cannot authenticate user!'));
        }

        // Authenticate user.
        const users = await User.find();
        return res.json({
            isSuccess: true,
            users
        });
    } catch (err) {
        return next(err);
    }
};

UserController.get = async (req, res, next) => {
    try {
        const { token } = req.headers;
        // const token = req.headers.token;
        if (!token) {
            return next(new Error('Not found authentication'));
        }

        const data = await JWT.verify(token, secretToken);
        const _id = data._id;
        const user = await User.findById(_id);
        if (!user) {
            return next(new Error('Cannot authenticate user!'));
        }

        const searchId = req.params.id;
        const result = await User.findById({
            searchId,
        });
        if (!user) {
            return next(new Error('No result!'));
        }
        return res.json({
            isSuccess: true,
            user
        });
    } catch(e) {
        return next(e);
    }
};

UserController.create = async (req, res, next) => {
    try {
        const { password, fullName, gender, email } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            password: hashedPassword,
            gender,
            email,
            fullName
        });

        await user.save();
        delete user._doc.password;

        return res.json({
            isSuccess: true,
            user
        });
    } catch (e) {
        return next(e);
    }
};

UserController.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error('User is not found'));
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        // Login successfully -> gen token and return token to client.
        delete user._doc.password;
        const token = await JWT.sign(user._doc, secretToken);
        return res.json({
            isSuccess: true,
            user,
            token
        });
    } catch (e) {
        return next(e);
    }
};


UserController.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await User.findById(id);
        if (!user) {
            return next(new Error('User is not found'));
        }
        // Hash password
        if (data.password !== undefined) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        }
        delete data.deletedAt;
        user.set(data);
        await user.save();
        return res.json({
            isSuccess: true,
            user: user
        });
    } catch (e) {
        return next(e);
    }
};

UserController.delete = async (req, res, next) => {
    try {
        const { token } = req.headers;
        // const token = req.headers.token;
        if (!token) {
            return next(new Error('Not found authentication'));
        }

        const data = await JWT.verify(token, secretToken);
        const _id = data._id;
        const user = await User.findById(_id);
        if (!user) {
            return next(new Error('Cannot authenticate user!'));
        }

        const searchId = req.params.id;
        const searchUser = await User.findById(searchId);
        if (!searchUser) {
            return next(new Error('User is not found'));
        }
        searchUser.deletedAt = new Date();
        await searchUser.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Deleted user'
        });
    } catch (e) {
        return next(e);
    }
};

export default UserController;
