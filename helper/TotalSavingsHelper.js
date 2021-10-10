const ExcelJS = require('exceljs');
const database = require(`${__dirname}/../database`);

module.exports = class TotalSavingsHelper {
    async setTotalSavings(date, table) {
        let total = 0;

        const databaseRef = table === 'totalSpendings' ? database.ref('spendings').child(date) : database.ref('savings').child(date);
        const snapshot = await databaseRef.once('value');
        const data = snapshot.val();

        data.forEach((eachData) => {
            total = total + eachData.amount
        })

        await database.ref(table).child(date).set({
            total: total
        });

        return data;
    }

    getTotalSavingsSpendings(value) {
        let total = 0;
        let data = [];

        Object.keys(value).forEach((key) => {
            total = total + value[key].total;

            data.push({
                'date': key,
                'day_total': value[key]
            });
        });

        return {
            'total': total,
            'data': data
        };
    }

    saveExcel(value, name) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(name);

        worksheet.columns = [
            { header: 'Date', key: 'date', width: 50 },
            { header: 'Name', key: 'name', width: 80 },
            { header: 'Amount.', key: 'amount', width: 40 }
        ];


        value.forEach((key) => {
            worksheet.addRow(key);
        })

        workbook.xlsx.writeFile("./" + name + "s.xlsx").then(function() {
            return 1;
        });
    }
}