const DateLibrary = require('../../lib/DateLibrary');
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const SpendingsHelper = require(`${__dirname}/../../helper/SpendingsHelper`);
const TotalSavingsHelper = require(`${__dirname}/../../helper/TotalSavingsHelper`);

const database = require('../../database');

const dateLibrary = new DateLibrary();
const formatterHelper = new FormatterHelper();
const spendingsHelper = new SpendingsHelper();
const totalSavingsHelper = new TotalSavingsHelper();

const getTotalSpendings = async (req, res)=> {
    const totalSpendingsTable = database.ref('totalSpendings').child(req.query.date);
    const totalSpendingsSnapshot = await totalSpendingsTable.once('value');
    const totalSpendingsData = totalSpendingsSnapshot.val();

    const spendingsTable = database.ref('spendings').child(req.query.date);
    const spendingsSnapshot = await spendingsTable.once('value');
    const spendingsData = spendingsSnapshot.val();

    res.send({
        'totalSpending': totalSpendingsData,
        'spendings': spendingsData
    })
}

module.exports = {
    getTotalSpendings
}