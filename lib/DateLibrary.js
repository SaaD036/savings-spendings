class DateLibrary {
    constructor(){}

    getDate(){
        let date = new Date();
        date = date.toISOString().substring(0, 10);
        
        return date.toString();
    }
    getTime(){
        let date = new Date().toLocaleTimeString();
        
        return date.toString();
    }
}

module.exports = DateLibrary;