import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/Product/";

@Component({
    templateUrl: './app.add-menu-items.html'
})
export class AddMenuItemsComponent {  
    _productsArray: Array<any>;
    _http:HttpClient;
    _id:Number;
    _productName:String;
    _price:Number;
    _errorMessage:String = "";

    // Since we are using a provider above we can receive 
    // an instance through a constructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllProducts();
    }

    getAllProducts() {
      let url = BASE_URL + 'Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._productsArray = result.products;
          }, 

          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    createProduct() {
        // This free online service receives post submissions.
        this.http.post(BASE_URL + "CreateProduct",
            {
                _id:  this._id,
                productName:   this._productName,
                price: this._price
            })
        .subscribe(
            // Data is received from the post request.
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProducts();
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = error;                
            });
    }

    deleteProduct(_id) {

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
        "body": { _id:_id}
      };
    
      let url = BASE_URL + "Delete"
      this.http.delete(  url , httpOptions) 
      .subscribe(
          // Data is received from the post request.
          (data) => {
              this._errorMessage = data["errorMessage"];
              this.getAllProducts(); 
          },
          // An error occurred. Data is not received. 
          error  => {
            this._errorMessage = error; 
          });
    }
}
