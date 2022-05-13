Robo Battery Cafe Midterm 🤖
=========

Battery ordering/pick-up experience for a fictitious restaurant catered to hungry robots. Yum! 🔋

## Final Product

![Home Page Header](public/docs/header.png?raw=true "Header")
![Home Page Menu](public/docs/menu.png?raw=true "Menu")
![Order Form](public/docs/orderForm.png?raw=true "Order Form")
![Track Order Page](public/docs/trackOrder.png?raw=true "Track Order")
![Admin Page](public/docs/admin.png?raw=true "Admin")

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

* Body-parser
* Chalk
* Cookie Session
* dotenv
* EJS
* Express
* Morgan
* PG
* Twilio

## Roadmap

- Menu 
  * Flip menu cards on click to display additional product information
  * Select product cards to add to order rather than select checkbox in form

- Orders
  * Customer can cancel their order
  * Integrate a sandbox payment provider (e.g. Stripe)
  * Switch time to 12 hour clock as add AM/PM
  * Prep time count down

- Admin
  * Display active orders as individual cards (rather than in a table) and 
  * Drag & drop orders to the completed section

- Authentication & Security
  * Login functionality for customers and admins
  * Limit public access to admin page

- Add a footer w/ social links
