export class LocalStorageJSONModel {
    key = "LocalStorageModel";
    constructor() {
        this.data = this.readFormStorage();
    }
    addEntry(location, value) {
        let x = this.data;
        for (let i = 0; i < location.length; i++) {
            let key = location[i];
            if (!x.hasOwnProperty(key)) {
                let data;
                data = {};
                if (i == location.length - 1) data = value;
                x[key] = data;
            }
            x = x[key];
        }
        this.writeToStorage();
    }
    updateEntry(location, value) {
        let newLoc = [...location];
        let lastKey = newLoc.pop();
        let vals = this.readEntry(newLoc);
        vals[lastKey] = value;
        this.writeToStorage();
    }
    deleteEntry(location) {
        let newLoc = location.slice(0, location.length - 1);
        let data = this.readEntry(newLoc);
        let lastKey = location[location.length - 1];
        delete data[lastKey];
        this.writeToStorage();
    }
    readEntry(location) {
        let x = this.data;
        for (let i = 0; i < location.length; i++) {
            let key = location[i];
            x = x[key];
        }
        return x;
    }
    readFormStorage() {
        let x = localStorage.getItem(this.key);
        if (x) return JSON.parse(x);
        return {};
    }
    writeToStorage() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }
    get_keys(location) {
        return Object.keys(this.readEntry(location));
    }
}