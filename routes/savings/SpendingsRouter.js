const express = require(`express`);
const router = express.Router();

const spendingsController = require(`${__dirname}/../../controllers/spendings/SpendingsController`);
const totalSpendingController = require(`${__dirname}/../../controllers/spendings/TotalSpendingsController`);
const savingsController = require(`${__dirname}/../../controllers/savings/SavingsController`);
const totalSavingController = require(`${__dirname}/../../controllers/savings/TotalSavingController`);

router.route('/spendings')
    .get(spendingsController.getSpendings)
    .post(spendingsController.storeSpendings)
    .put(spendingsController.updateSpendings)
    .delete(spendingsController.deleteSpendings)

router.route('/savings')
    .get(savingsController.getSavings)
    .post(savingsController.storeSavings)
    .put(savingsController.updateSavings)

router.route('/total-savings')
    .get(totalSavingController.getTotalSavings)

router.route('/total-spendings')
    .get(totalSpendingController.getTotalSpendings)

module.exports = router;