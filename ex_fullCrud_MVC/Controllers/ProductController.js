const ProductRepo   = require('../Data/ProductRepo');
const _productRepo  = new ProductRepo();
const Product       = require('../Models/Product');
const Order         = require('../Models/Order');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.OrdersIndex = async function(request, response){
    let orders = await _productRepo.allOrders();
    if(orders!= null) {
        response.json({orders:orders});
    }
    else {
        response.json({orders:[]});
    }
};

exports.CreateOrder = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempOrderObj  = new Order( {
        "dateTime": request.body.dateTime,
        "serverName":    request.body.serverName,
        "total": request.body.total
    });

    // Call Repo to save 'Product' object.
    let responseObject = await _productRepo.addOrder(tempOrderObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        response.json({ order:responseObject.obj, errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        response.json({ order:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};

exports.Index = async function(request, response){
    let products = await _productRepo.allProducts();
    if(products!= null) {
        response.json({products:products});
    }
    else {
        response.json({products:[]});
    }
};

// Shows one single object at a time. 
exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let productID  = request.query._id; 
    
    let productObj = await _productRepo.getProduct(productID);
    response.json({ product:productObj});
}

// Receives POST data and tries to save it.
exports.CreateProduct = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempProductObj  = new Product( {
        "_id": request.body._id,
        "productName":    request.body.productName,
        "price": request.body.price
    });

    // Call Repo to save 'Product' object.
    let responseObject = await _productRepo.create(tempProductObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        response.json({ product:responseObject.obj, errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        response.json({ product:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};

// Receives posted data that is used to update the item.
exports.Update = async function(request, response) {
    let productID = request.body._id;
    console.log("The posted product id is: " + productID);

    // Parcel up data in a 'Product' object.
    let tempProductObj  = new Product( {
        _id: productID,
        productName:    request.body.productName,
        price: request.body.price
    });

    // Call update() function in repository with the object.
    let responseObject = await _productRepo.update(tempProductObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        response.json({ product:responseObject.obj, errorMessage:"" });
    }

    // Update not successful. Show edit form again.
    else {
        response.json({ product:      responseObject.obj, 
                        errorMessage: responseObject.errorMessage });
    }
}

// This function receives an id with the delete request. 
exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let products     = await _productRepo.delete(id);
    response.json({products:products});
}