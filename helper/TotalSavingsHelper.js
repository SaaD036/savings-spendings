const database = require(`${__dirname}/../database`);

module.exports = class TotalSavingsHelper {
    async setTotalSavings(date, table){
        let total=0;

        const databaseRef = table==='totalSpendings' ? database.ref('spendings').child(date) : database.ref('savings').child(date);
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
}