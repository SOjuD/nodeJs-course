import express, { Router } from "express";
import { userRouter } from './user/user.routes';

const port = process.env.PORT || 3000;

const app = express();
const router = Router();

app.use(express.json());
app.use(router);

userRouter(router);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})