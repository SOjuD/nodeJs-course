import express, { Router } from "express";
import { startApp } from './services/user.services';

const port = process.env.PORT || 3000;

const app = express();
const router = Router();

app.use(express.json());
app.use(router);

startApp(router);


app.listen(port, () => {
	console.log(`App running on http://localhost:${port}`)
})