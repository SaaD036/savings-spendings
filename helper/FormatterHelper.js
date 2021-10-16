const database = require(`${__dirname}/../database`);
const UserHelper = require(`${__dirname}/user/UserHelper`);

const userHelper = new UserHelper();
module.exports = class FormatterHelper {
    getSavingsData(value, comments, token) {
        let data = [];

        if (value == null) return data;

        Object.keys(value).forEach((key) => {
            data.push({
                date: key,
                spendings: value[key],
                length: value[key].length,
                comments: token.isAdmin ? userHelper.formatCommentForAdmin(comments) : userHelper.formatComment(comments, token.email)
            });
        });

        return data;
    }

    getLength(snapshot) {
        let dataLength = 1;

        snapshot.forEach(doc => {
            dataLength = dataLength + 1;
        });

        return dataLength;
    }

    formatExcelData(value) {
        let excelRows = [];

        value.forEach((key) => {
            let spendings = key.spendings;

            spendings.forEach((spending) => {
                excelRows.push({
                    'date': key.date,
                    'name': spending.name,
                    'amount': spending.amount
                });
            })
        })

        return excelRows;
    }

    getUserData(value) {
        let data = [];

        Object.keys(value).forEach((key) => {
            data.push({
                key: key,
                email: value[key].email,
                name: value[key].name,
                isAdmin: value[key].isAdmin
            });
        });

        return data;
    }
}