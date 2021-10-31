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
                spendings: this.getSingleSavingSpending(value[key]),
                length: value[key].length,
                comments: token.isAdmin ? userHelper.formatCommentForAdmin(comments[key]) : userHelper.formatComment(comments[key], token.email)
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

    getUserDataWithToken(value, token) {
        let data = { key: "", token: "" };
        let all = [];

        Object.keys(value).forEach((key) => {
            if (value[key].token == token) {
                data.key = key;
                data.token = value[key].token;
            }
        });

        return data;
    }

    getSingleSavingSpending(value) {
        let data = [];
        if (!value) return data;

        value.forEach((eachValue) => {
            if (eachValue != null) {
                data.push(eachValue);
            }
        })

        return data;
    }
}