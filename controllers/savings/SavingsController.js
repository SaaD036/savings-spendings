const DateLibrary = require('../../lib/DateLibrary');
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const SpendingsHelper = require(`${__dirname}/../../helper/SpendingsHelper`);
const TotalSavingsHelper = require(`${__dirname}/../../helper/TotalSavingsHelper`);

const database = require('../../database');

const dateLibrary = new DateLibrary();
const formatterHelper = new FormatterHelper();
const spendingsHelper = new SpendingsHelper();
const totalSavingsHelper = new TotalSavingsHelper();

const getSavings = async (req, res) => {
    const databaseRef = database.ref('savings');
    const snapshot = await databaseRef.once('value');
    let data = formatterHelper.getSavingsData(snapshot.val());

    if(req.query.name) data = spendingsHelper.searchSpendingByName(data, req.query.name);
    if(req.query.amount) data = spendingsHelper.searchSpendingByAmount(data, req.query.amount);


    res.send({
        'data': data
    });
}

const storeSavings = async (req, res) => {
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

    res.send({
        'message': 'data inserted successfully',
        'data': req.body,
        'total': total
    });
}

const updateSavings = async (req, res) => {
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

    res.send({
        'data': data
    });
}

module.exports = {
    getSavings,
    storeSavings,
    updateSavings
}