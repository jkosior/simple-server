# simple-server

## to run

```bash
npm install
npm start
```

## paths

```
POST /auth/register - to register user
POST /auth/login - to log in
POST /auth/change-password  - to change password

GET /user/:id/profile - to check profile
POST /user/:id/avatar - to upload avatar
POST /user/:id/file - to upload files
PUT /user/:id - to update user data, except password
DELETE /user/:id - to delete user

GET /product - to get all products
GET /product/:id - to get one products
POST /product - to add product
PUT /product/:id - to update product
DELETE /product/:id - to delete product

GET /cart - to get all carts
GET /cart/:id - to get all carts
POST /cart - to create cart
PUT /cart/:id - to update cart
PUT /cart/:id/products - to add products to cart
DELETE /cart/:id - to delete cart
```

## models

### USER

```ts
class CreateUserDto {
  username: string;
  name: string;
  surname: string;
  password?: string; // password optional so there would not be possibility to update via PUT /user/:id
}
```

### PRODUCT

```ts
class CreateProductDto {
  name: string;
  price: number;
}
```

### CART

```ts
class CartProduct {
  id: string;
  quantity: number;
}

class CreateCartDto {
  products?: {
    [key: string]: CartProduct
  }
} //optional, cart can be created without products, just POST /cart {}

```
