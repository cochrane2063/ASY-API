## API 设计文档

- Template: https://gist.github.com/azagniotov/a4b16faf0febd12efbc6c3d7370383a6

------------------------------------------------------------------------------------------

#### Product API

<details>
 <summary><code>POST</code> <code><b>/api/v1/product/create</b></code> <code>Creates new product with name,price,stock</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name     |  required | string   | Product name  |
> | price     |  required | number   | Product price  |
> | stock     |  required | number   | Number of products in stock  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"code":"201", "name":"name", "message":"Product created"}`                                |
> | `409`         | `application/json`                | `{"code":"409","message":"Product with the same name alread exists"}`                            |

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/v1/product/update</b></code> <code>Update the product name and/or price</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name     |  required | string   | Product name  |
> | price     |  optional | number   | New product price  |
> | stock     |  optional | number   | Updated product stock  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"code":"200", "name":"name", "message":"Product updated"}`                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Product not found"}`                            |

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/product/{name}</b></code> <code>Get product</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"code":"200", "product": {"name","price","stock"}, "message":"Product retrieved"}`                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Product not found"}`                            |

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/products</b></code> <code>Get all the products</code></summary>

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"code":"200", "products": Array of <product object>, "message":"Products retrieved"}`                                |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/v1/product/{name}</b></code> <code>Delete a product</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"code":"200", "name":"name", "message":"Product deleted"}`                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Product not found"}`                            |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/v1/products</b></code> <code>Delete all products</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"code":"200", "message":"All products deleted"}`                                |

</details>

#### Java 实现
In java we would have created a product class, with all the name/price/stock as its fields. Then instead of an array of Products, we would create a Product repository to store the Product objects. <br><br>
Next we will create a Product service, similar to the functions in our expressjs implementation. The services will be in charge of the program logic. <br><br>
Finally we create a ProductController as the entrypoint to our springboot application. The Controller will be in charge of parsing the request parameters and passing it to Product serivce. After all the processing is done, the Controller will get the results from the services and put them in a proper format before sending them back to the client.