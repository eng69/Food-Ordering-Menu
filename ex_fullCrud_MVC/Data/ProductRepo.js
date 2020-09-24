const Product = require('../Models/Product');
const Order   = require('../Models/Order');

class ProductRepo {
    
    // This is the constructor.
    ProductRepo() {        
    }

    async allOrders() {
        let orders = await Order.find().exec();
        return   orders;
    }

    async addOrder(orderObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await orderObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          orderObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await orderObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          orderObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 

    // Gets all products.
    async allProducts() {     
        let products = await Product.find().exec();
        return   products;
    }

    async getProduct(id) {  
        let product = await Product.findOne({_id:id}).exec();
        return   product;
    }

    async create(productObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await productObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          productObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await productObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          productObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 
    
    async update(editedObj) {   
    
        // Set up response object which contains origianl product object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            // Load the actual corresponding object in the database.
            let productObject = await this.getProduct(editedObj.id);
    
            // Check if product exists.
            if(productObject) {
    
                // Product exists so update it.
                let updated = await Product.updateOne(
                    { _id: editedObj.id}, // Match id.
    
                    // Set new attribute values here.
                    {$set: { productName: editedObj.productName,
                             price: editedObj.price }}); 
    
                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    respons.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                
            // Product not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    
                    // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  
    
    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem =  await Product.deleteOne({_id:id})
        console.log(deletedItem);
        return deletedItem;
    }
    
}


module.exports = ProductRepo;
