const DateLibrary = require('../../lib/DateLibrary');
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const SpendingsHelper = require(`${__dirname}/../../helper/SpendingsHelper`);
const TotalSavingsHelper = require(`${__dirname}/../../helper/TotalSavingsHelper`);

const database = require('../../database');

const dateLibrary = new DateLibrary();
const formatterHelper = new FormatterHelper();
const spendingsHelper = new SpendingsHelper();
const totalSavingsHelper = new TotalSavingsHelper();

const getSavings = async(req, res) => {
    const databaseRef = database.ref('savings');
    const snapshot = await databaseRef.once('value');
    const commentSnapshot = await database.ref('comments').once('value');
    let data = formatterHelper.getSavingsData(snapshot.val(), commentSnapshot.val(), req.token);

    if (req.query.name) data = spendingsHelper.searchSpendingByName(data, req.query.name);
    if (req.query.amount) data = spendingsHelper.searchSpendingByAmount(data, req.query.amount);


    return res.status(200).json({
        'data': data
    });
}

const storeSavings = async(req, res) => {
    if (validator.isEmpty(req.body.name) || validator.isEmpty(req.body.ammount)) {
        return res.status(200).json({
            error: 'empty name or amount'
        });
    }

    const databaseRef = database.ref('savings');
    let date = req.body.date ? req.body.date : dateLibrary.getDate();
    let time = req.body.time ? req.body.time : dateLibrary.getTime();

    const snapshot = await databaseRef.child(date).once('value');
    let dataLength = formatterHelper.getLength(snapshot);

    await databaseRef.child(date).child(dataLength.toString()).set({
        id: dataLength,
        name: req.body.name,
        amount: req.body.ammount,
        time: time
    });

    const total = await totalSavingsHelper.setTotalSavings(date, 'totalSavings');

    return res.status(200).json({
        'message': 'data inserted successfully',
        'data': req.body,
        'total': total
    });
}

const updateSavings = async(req, res) => {
    if (!validator.isDate(req.body.date) || validator.isEmpty(req.body.row)) {
        return res.status(200).json({
            error: 'invalid date or row'
        });
    }

    const databaseRef = database.ref('savings').child(req.body.date).child(req.body.row);
    let snapshot = await databaseRef.once('value');
    let data = snapshot.val();

    let newSavings = {
        'id': data.id,
        'name': req.body.name ? req.body.name : data.name,
        'amount': req.body.amount ? req.body.amount : data.amount,
        'time': req.body.time ? req.body.time : data.time
    }

    await databaseRef.update(newSavings);
    await totalSavingsHelper.setTotalSavings(req.body.date, 'totalSavings');

    snapshot = await databaseRef.once('value');
    data = snapshot.val();

    return res.status(200).json({
        'data': data
    });
}

const deleteSavings = async(req, res) => {
    if (!validator.isDate(req.body.date) || validator.isEmpty(req.body.row)) {
        return res.status(200).json({
            error: 'invalid date or row'
        });
    }

    const databaseRef = database.ref('savings').child(req.body.date).child(req.body.row);

    await databaseRef.update({
        'amount': 0
    });
    await totalSavingsHelper.setTotalSavings(req.body.date, 'totalSavings');

    return res.status(200).json({
        'message': 'spendings deleted successfully'
    });
}

const downloadAll = async(req, res) => {
    const databaseRef = database.ref('savings');
    const snapshot = await databaseRef.once('value');
    let data = formatterHelper.getSavingsData(snapshot.val());
    let excelRows = formatterHelper.formatExcelData(data);

    data = totalSavingsHelper.saveExcel(excelRows, 'saving');

    return res.status(200).json({
        'message': 'file saved'
    });
}

const getSavingByDate = async(req, res) => {
    if (!validator.isDate(req.params.date)) {
        return res.status(404).json({
            error: 'invalid date'
        });
    }

    const databaseRef = database.ref('savings').child(req.params.date);
    const snapshot = await databaseRef.once('value');
    const commentSnapshot = await database.ref('comments').child(req.params.date).once('value');

    return res.status(200).json({
        spending: formatterHelper.getSingleSavingSpending(snapshot.val()),
        comment: formatterHelper.getSingleSavingSpending(commentSnapshot.val()),
    });
}

module.exports = {
    getSavings,
    storeSavings,
    updateSavings,
    deleteSavings,
    downloadAll,
    getSavingByDate
}