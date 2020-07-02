# e-Commerce Bukapedia
Bukapedia is an ecommerce application to buy products. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

> Demo app : 


&nbsp;

## RESTful endpoints

### Global Response
_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```
---
### POST /register

> Register new account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<name>"
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (201 - Created)_
```
{
    "id": <user id>,
    "email": "<user email>",
    "name": "<user name>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name can't be empty. Name must be 2-30 characters. Email can't be empty. Wrong email format. Password can't be empty. Password must be 8-20 characters"
}
```


---
### POST /login

> Login 

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (200 - OK)_
```
{
    "id": <user id>,
    "name": "<user name>",
    "email": "<user email>",
    "role": "<user role>"
    "access_token": "<access token>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Incorrect password"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Email not found"
}
```


---
### GET /products

> List product

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
[
    {
        "id": <product id>,
        "name": "<product name>",
        "category": "<product category>",
        "description": "<product description>",
        "img_url": "<product img url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "createdAt": "<product created datetime>",
        "updatedAt": "<product updated datetime>"
    }, {
        ...
    }
]
```


---
### POST /products

> Add new product

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "name": "<product name>",
    "category": "<product category>",
    "description": "<product description>",
    "img_url": "<product img url>",
    "price": "<product price>",
    "stock": "<product stock>"
}
```

_Response (201 - Created)_
```
{
    "id": "<product id>",
    "name": "<product name>",
    "category": "<product category>",
    "description": "<product description>",
    "img_url": "<product img url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "<product created datetime>",
    "updatedAt": "<product updated datetime>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Product already exist. Product name can't be empty. Product name must be 2-30 characters. Category can't be empty. Category must be 2-20 characters. Description can't be empty. Description must be 5-100 characters. Img url can't be empty. Price minimum 100."
}
```


---
### GET /products/:id

> Get product data by id

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": "<product id>",
    "name": "<product name>",
    "category": "<product category>",
    "description": "<product description>",
    "img_url": "<product img url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "<product created datetime>",
    "updatedAt": "<product updated datetime>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Product Not Found"
}
```


---
### PUT /products/:id

> Edit product data by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "name": "<product name>",
    "category": "<product category>",
    "description": "<product description>",
    "img_url": "<product img url>",
    "price": "<product price>",
    "stock": "<product stock>"
}
```

_Response (200 - OK)_
```
{
    "id": "<product id>",
    "name": "<product name>",
    "category": "<product category>",
    "description": "<product description>",
    "img_url": "<product img url>",
    "price": "<product price>",
    "stock": "<product stock>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name can't be empty. Please input category. Description can't be empty. Img url can't be empty. Price can't be empty. Stock can't be empty."
}
```


---
### DELETE /products/:id

> Delete product from database by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Successfully delete product"
}
```




---
### GET /my-cart

> List user carts

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
[
    {
        "id": <Cart id>,
        "UserId": <User id>,
        "ProductId": <Product id>,
        "quantity": <quantity>,
        "total_price": <total_price>,
        "status": "unpaid",
        "createdAt": "<cart created datetime>",
        "updatedAt": "<cart updated datetime>",
        "Product": {
            "id": "<product id>",
            "name": "<product name>",
            "category": "<product category>",
            "description": "<product description>",
            "img_url": "<product img url>",
            "price": "<product price>",
            "stock": "<product stock>",
            "createdAt": "<product created datetime>",
            "updatedAt": "<product updated datetime>"
        }
    }, 
    {
        ...
    }
]
```


---
### POST /my-cart

> Add cart

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "ProductId": "<product id>",
    "quantity": "<quantity>"
}
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (201 - Created)_
```
{
    "id": <Cart id>,
    "UserId": <User id>,
    "ProductId": <Product id>,
    "quantity": <quantity>,
    "total_price": <total_price>,
    "status": "<status>",
    "createdAt": "<cart created datetime>",
    "updatedAt": "<cart updated datetime>"
} 
```



---
### PUT /my-cart

> Edit cart

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "id": "<cart id>",
    "quantity": "<quantity>",
    "total_price": "<total_price>",
}
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
{
    "id": <Cart id>,
    "UserId": <User id>,
    "ProductId": <Product id>,
    "quantity": <quantity>,
    "total_price": <total_price>,
    "status": "<status>",
    "createdAt": "<cart created datetime>",
    "updatedAt": "<cart updated datetime>"
} 
```


---
### DELETE /my-cart

> Delete cart

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
{
    "message": "Successfully removed cart"
} 
```


---
### PUT /my-cart/pay

> Checkout cart

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
{
    "message": "All Products has been paid",
} 
```



---
### GET /histories

> List user transactions

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
[
    {
        "id": <Cart id>,
        "UserId": <User id>,
        "ProductId": <Product id>,
        "quantity": <quantity>,
        "total_price": <total_price>,
        "status": "paid",
        "createdAt": "<cart created datetime>",
        "updatedAt": "<cart updated datetime>",
        "Product": {
            "id": "<product id>",
            "name": "<product name>",
            "category": "<product category>",
            "description": "<product description>",
            "img_url": "<product img url>",
            "price": "<product price>",
            "stock": "<product stock>",
            "createdAt": "<product created datetime>",
            "updatedAt": "<product updated datetime>"
        }
    }, 
    {
        ...
    }
]
```