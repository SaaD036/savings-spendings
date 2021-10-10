const express = require(`express`);
const router = express.Router();

const spendingsController = require(`${__dirname}/../../controllers/spendings/SpendingsController`);
const totalSpendingController = require(`${__dirname}/../../controllers/spendings/TotalSpendingsController`);
const savingsController = require(`${__dirname}/../../controllers/savings/SavingsController`);
const totalSavingController = require(`${__dirname}/../../controllers/savings/TotalSavingController`);

//spending routes
router.route('/spendings')
    .get(spendingsController.getSpendings)
    .post(spendingsController.storeSpendings)
    .put(spendingsController.updateSpendings)
    .delete(spendingsController.deleteSpendings)

router.route('/spendings/download')
    .get(spendingsController.downloadAll)

//saving routes
router.route('/savings')
    .get(savingsController.getSavings)
    .post(savingsController.storeSavings)
    .put(savingsController.updateSavings)

router.route('/savings/download')
    .get(savingsController.downloadAll)

//total saving routes
router.route('/total-savings')
    .get(totalSavingController.getTotalSavings)

router.route('/total-savings/:id')
    .get(totalSavingController.getTotalSavingsByID)

//total spending routes
router.route('/total-spendings')
    .get(totalSpendingController.getTotalSpendings)

router.route('/total-spendings/:id')
    .get(totalSpendingController.getTotalSpendingsByID)

module.exports = router;