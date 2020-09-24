var HomeController    = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
const cors = require('cors');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);    
    app.get('/Product/Index', cors(), ProductController.Index);
    app.get('/Product/Detail', cors(), ProductController.Detail);
    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.put('/Product/Update', cors(), ProductController.Update);
    app.delete('/Product/Delete', cors(), ProductController.Delete);
    
    app.get('/Product/OrdersIndex', cors(), ProductController.OrdersIndex);
    app.post('/Product/CreateOrder', cors(), ProductController.CreateOrder);
};
