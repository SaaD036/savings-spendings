const DateLibrary = require('../../lib/DateLibrary');
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const SpendingsHelper = require(`${__dirname}/../../helper/SpendingsHelper`);
const TotalSavingsHelper = require(`${__dirname}/../../helper/TotalSavingsHelper`);

const database = require('../../database');

const dateLibrary = new DateLibrary();
const formatterHelper = new FormatterHelper();
const spendingsHelper = new SpendingsHelper();
const totalSavingsHelper = new TotalSavingsHelper();

const getTotalSavings = async (req, res) => {
    const totalSavingsTable = database.ref('totalSavings').child(req.query.date);
    const totalSavingSnapshot = await totalSavingsTable.once('value');
    const totalSavingsData = totalSavingSnapshot.val();

    const savingsTable = database.ref('savings').child(req.query.date);
    const savingSnapshot = await savingsTable.once('value');
    const savingsData = savingSnapshot.val();

    res.send({
        'totalSaving': totalSavingsData,
        'savings': savingsData
    })
}

module.exports = {
    getTotalSavings
}