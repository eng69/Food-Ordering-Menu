var mongoose         = require('mongoose');

var orderSchema    = mongoose.Schema(
    {
        dateTime:       {"type" : "String"},
        serverName:     {"type" : "String"},
        total:          {"type" : Number, min:0, max:1000000}
    },
    { collection: 'orders' }, 
    { versionKey: false }
);
var Order    = mongoose.model('order', orderSchema);
module.exports = Order;
