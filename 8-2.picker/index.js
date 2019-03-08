
const cityCode = require('./m.js');
const Picker = require('./picker.js')
console.log(cityCode)
require('./index.css')
new Picker({
    "defaultValue": '内蒙古 兴安盟 突泉县',
    "data": cityCode,
    "type": 3,
    "keys": {
        "id": "zipcode",
        "value": "name",
        "childData": "child"
    },
    "callBack": function(val,m) {
        let addressArr = val.split(/\s+/g);
        console.log(addressArr)
    
    }
});