const express = require(`express`);
const bodyParser = require(`body-parser`);

const config = import(`${__dirname}/config`);
const spendingsRouter = require(`${__dirname}/routes/savings/SpendingsRouter`);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', spendingsRouter);

app.listen(PORT, ()=> {
    console.log(`Listening from port ${PORT}`);
})