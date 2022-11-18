# Webshop project - frontend

This is a simple webshop application that is meant to be a learning project to gain more knowledge in both Front- and Backend development.

## Availability

The webshop has been deployed with Heroku and can be accessed via https://niklas-webshop-frontend.herokuapp.com/.
Alternatively the project can be set up locally by following the instructions below.

## Setting the project up locally

1. Clone both the [frontend](https://github.com/niklas-jacobsen/webshop) and [backend](https://github.com/niklas-jacobsen/webshop-backend) repositories.
2. Set up the backend server as explained in the [backend README](https://github.com/niklas-jacobsen/webshop-backend/blob/main/README.md)

3. Create a .env file and write into it:

```sh
BACKEND_URL=http://localhost:5000
```

4. run `npm install` to install all necessary dependencies.

5. run `npm run dev` to start the frontend express server.

## Documentation

### Interface

The webshop is navigated using the navbar on the top of each page. Its content changes depending on the page and whether the user is logged in or not. If logged in, a shopping cart icon is visible with an indicator of the amount of items in the shopping cart.

In order to dynamically generate frontend pages [ejs](https://www.npmjs.com/package/ejs) is used. Also, content changes dynamically depending on the data that is available. For example, if no address is attached to a user ID, the address section is not rendered on the `/account` page of this user.

Shopping items are displayed using fully clickable cards oriented in a grid. Their shape and size changes depending on screen size and device used to view the webshop. When clicked, the corresponding `/product/id` page is opened which contains more information such as a description and info on item stock.

### Responsive CSS

Although only present in a basic form, the webshop features some implementations of responsive web design.
Media queries are used to ensure that the item lists on the home page and in the shopping cart are correctly shown on desktop and mobile devices.

### Login and Register

Users can create an account on `/register` by entering their first-, lastname, email and password.
Logging in is done via `/login`.

This project uses [bcrypt](https://www.npmjs.com/package/bcrypt) to ensure that when a new user registers an account his password is hashed before it is stored in the user database. After logging in, a token is created using [jsonwebtoken](https://jwt.io/) ([JWT on npm](https://www.npmjs.com/package/jsonwebtoken)) and then stored in a cookie which gets sent with every request to keep the user logged in until the token expires.

Pages such as the user account settings `/account` or the shopping cart `/cart` cannot be viewed when not logged in and in that case redirect to the login page.
Similarly the login and register pages cannot be accessed when logged **in**.

When logging out the user is redirected to the home page regardless of where he was before that.

### Buying items

When logged in users can add any item to their shopping card which they can then view by clicking the icon located on the top right inside the navbar. Items added to cart are saved in an array stored in a cookie which gets deleted when logging out.
The ability to go to checkout with the items in cart being sent to the database as an order is not yet implemented.
