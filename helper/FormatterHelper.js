const database = require(`${__dirname}/../database`);

module.exports = class FormatterHelper {
    getSavingsData(value) {
        let data = [];

        if (value == null) return data;

        Object.keys(value).forEach((key) => {
            data.push({
                'date': key,
                'spendings': value[key],
                'length': value[key].length
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
}