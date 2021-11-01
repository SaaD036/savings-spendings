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

const getTotalSavingsByID = async(req, res) => {
    if (!validator.isDate(req.params.id)) {
        return res.status(404).json({
            error: 'invalid date'
        });
    }

    const totalSavingsTable = database.ref('totalSavings').child(req.params.id);
    const totalSavingSnapshot = await totalSavingsTable.once('value');
    const totalSavingsData = totalSavingSnapshot.val();

    const savingsTable = database.ref('savings').child(req.params.id);
    const savingSnapshot = await savingsTable.once('value');
    const savingsData = savingSnapshot.val();

    return res.status(200).json({
        'totalSaving': totalSavingsData,
        'savings': savingsData
    })
}

const getTotalSavings = async(req, res) => {
    const totalSavingsTable = database.ref('totalSavings');
    const totalSavingSnapshot = await totalSavingsTable.once('value');
    const totalSavingsData = totalSavingSnapshot.val();

    return res.status(200).json({
        'data': totalSavingsHelper.getTotalSavingsSpendings(totalSavingsData)
    });
}

module.exports = {
    getTotalSavings,
    getTotalSavingsByID
}