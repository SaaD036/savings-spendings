var validator = require('validator');

const DateLibrary = require('../../lib/DateLibrary');
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const SpendingsHelper = require(`${__dirname}/../../helper/SpendingsHelper`);
const TotalSavingsHelper = require(`${__dirname}/../../helper/TotalSavingsHelper`);

const database = require('../../database');

const dateLibrary = new DateLibrary();
const formatterHelper = new FormatterHelper();
const spendingsHelper = new SpendingsHelper();
const totalSavingsHelper = new TotalSavingsHelper();

const getTotalSpendingsByID = async(req, res) => {
    if (!validator.isDate(req.params.id)) {
        return res.status(404).json({
            error: 'invalid date'
        });
    }

    const totalSpendingsTable = database.ref('totalSpendings').child(req.params.id);
    const totalSpendingsSnapshot = await totalSpendingsTable.once('value');
    const totalSpendingsData = totalSpendingsSnapshot.val();

    const spendingsTable = database.ref('spendings').child(req.params.id);
    const spendingsSnapshot = await spendingsTable.once('value');
    const spendingsData = spendingsSnapshot.val();

    res.send({
        'totalSpending': totalSpendingsData,
        'spendings': spendingsData
    })
}

const getTotalSpendings = async(req, res) => {
    const totalSavingsTable = database.ref('totalSpendings');
    const totalSavingSnapshot = await totalSavingsTable.once('value');
    const totalSavingsData = totalSavingSnapshot.val();

    res.send({
        'data': totalSavingsHelper.getTotalSavingsSpendings(totalSavingsData)
    });
}

module.exports = {
    getTotalSpendings,
    getTotalSpendingsByID
}