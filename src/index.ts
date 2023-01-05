import express, { Router } from "express"
import { ValidatedRequest } from "express-joi-validation";
import { createUser, editUser, getUserById, getUsersByLogin, removeUser } from "./users.methods";
import { validator, createUserSchema, ICreateUserSchema, getUserScheme, IGetUserSchema, editUserSchema, IEditUserSchema, getUserByLoginScheme, IGetUserByLoginSchema } from "./validation";

const port = process.env.PORT || 3000;
const userPath = '/user/:id?';
const userloginPath = '/users';

const app = express();
const router = Router();

app.use(express.json());
app.use(router);

router.route(userPath)
    .post(validator.body(createUserSchema), (req: ValidatedRequest<ICreateUserSchema>, res) => {
        try {
            const user = createUser(req.body);

            res.json(user)
        } catch (e) {
            res.end(e.message)
        }
    })
    .get(validator.query(getUserScheme), (req: ValidatedRequest<IGetUserSchema>, res) => {
        try {
            const user = getUserById(req.query.id);

            res.json(user)
        } catch (e) {
            res.end(e.message)
        }
    })
    .put(validator.body(editUserSchema), (req: ValidatedRequest<IEditUserSchema>, res) => {
        try {
            const user = editUser(req.body)

            res.json(user)
        } catch (e) {
            res.end(e.message)
        }
    })
    .delete(validator.query(getUserScheme), (req: ValidatedRequest<IGetUserSchema>, res) => {
        try {
            res.end(removeUser(req.query.id))
        } catch (e) {
            res.end(e.message)
        }
    })

router.route(userloginPath)
    .get(validator.query(getUserByLoginScheme), (req: ValidatedRequest<IGetUserByLoginSchema>, res) => {
        try {
            const user = getUsersByLogin(req.query.login);

            res.json(user)
        } catch (e) {
            res.end(e.message)
        }
    })

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})