const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');
const usersRepository = require('../repositories/users.repository.js');

const register = async ({ name, email, password }) => {
    const existingUser = await usersRepository.findByEmail(email);

    if(existingUser) {
        return { status: 'failed', message: 'Email já cadastrado' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    return { status: 'created', token, user };
};

const login = async ({ email, password }) => {
    const user = await usersRepository.findByEmail(email);

    if(!user) {
        return { status: 'failed', message: 'Email ou senha inválidos.' };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return { status: 'failed', message: 'Email ou senha inválidos' };
    }

    const token = jwt.sign(
        {id: user.id, email: user.email},
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    return { status: 'success', token, user: { id: user.id, name: user.name, email: user.email } };
};

module.exports = { register, login };