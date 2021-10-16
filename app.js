const express = require(`express`);
const bodyParser = require(`body-parser`);
const dotenv = require(`dotenv`);

const spendingRouter = require(`${__dirname}/routes/savings/SpendingsRouter`);
const authRouter = require(`${__dirname}/routes/auth/AuthRouter`);
const authMiddleware = require(`${__dirname}/middlewares/auth/Auth`);
const adminRouter = require(`${__dirname}/routes/admin/AdminRouter`);
const userRouter = require(`${__dirname}/routes/user/UserRouter`);

const app = express();
const PORT = 3000;

app.use(express.json());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', authMiddleware, spendingRouter);
app.use('/auth', authRouter);
app.use('/admin', authMiddleware, adminRouter);
app.use('/user', authMiddleware, userRouter);

app.listen(PORT, () => {
    console.log(`Listening from port ${ PORT }`);
})