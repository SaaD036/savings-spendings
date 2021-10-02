module.exports = class SpendingsHelper {
    searchSpendingByName(value, search){
        let len = value.length;
        search = search.toLowerCase();
        let data = [];

        for(let i=0; i<len; i++){
            let dailySpending = value[i];
            let dailySpendingLen = dailySpending.spendings.length;

            let newDailySpending = {
                'date': dailySpending.date,
                'spendings': []
            };

            let newDailySpendingData = [];

            for(let j=0; j<dailySpendingLen; j++){
                let dailySpendingData = dailySpending.spendings[j];
                
                if(dailySpendingData != null){
                    let name = dailySpendingData.name;
                    name = name.toLowerCase();

                    if(name.includes(search)){
                        newDailySpendingData.push(dailySpendingData);
                    }
                }
            }
            if(newDailySpendingData.length > 0){
                newDailySpending.spendings = newDailySpendingData;
                data.push(newDailySpending);
            }
        }

        return data;
    }

    searchSpendingByAmount(value, search){
        let len = value.length;
        let data = [];

        for(let i=0; i<len; i++){
            let dailySpending = value[i];
            let dailySpendingLen = dailySpending.spendings.length;

            let newDailySpending = {
                'date': dailySpending.date,
                'spendings': []
            };

            let newDailySpendingData = [];

            for(let j=0; j<dailySpendingLen; j++){
                let dailySpendingData = dailySpending.spendings[j];
                
                if(dailySpendingData!=null && dailySpendingData.amount<=search){
                    newDailySpendingData.push(dailySpendingData);
                }
            }
            if(newDailySpendingData.length > 0){
                newDailySpending.spendings = newDailySpendingData;
                data.push(newDailySpending);
            }
        }

        return data;
    }
}