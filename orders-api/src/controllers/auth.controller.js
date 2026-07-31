const authService = require('../services/auth.service.js');
const usersRepository = require('../repositories/users.repository.js');

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
};


const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        if(result.status === 'failed') {
            return res.status(401).json(result);
        }

        res.cookie('token', result.token, COOKIE_OPTIONS);

        return res.status(201).json({
            status: result.status,
            message: 'Conta criada com sucesso',
            user: result.user,
        });
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        if(result.status === 'failed') {
            return res.status(401).json(result);
        }

        res.cookie('token', result.token, COOKIE_OPTIONS);

        return res.status(200).json({
            status: result.status,
            message: 'Login realizado com sucesso',
            user: result.user,
        });
    } catch(err) {
        return res.status(500).json({ erro: err.message });    
    }
}

const logout = async (_req, res) => {
    res.clearCookie('token', { path: '/' });
    return res.status(200).json({ status: 'success', message: 'Logout realizado com sucesso' });
}

const me = async (req, res) => {
    try {
        const user = await usersRepository.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { register, login, logout, me };