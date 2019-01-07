import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import user from './routes/user.routes';

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(user);

server.use((e, req, res, next) => {
	console.error(e);
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error',
	})
});

server.listen(3000, () => {
    console.log('Server started at: 3000');
});

