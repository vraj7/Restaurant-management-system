# Nodejs Expressjs MongoDB restaurant listing app rest api implementation

## Getting started

This is restaurant listing app on node js ,express js,mongodb to show rest api implementation 

## Software Requirements

- Node.js 
- MongoDB 

## How to install

### Install npm dependencies after installing (Git or manual download)
Clone the repository.
cd directory
npm install
```
## How to run

type command : node app.js or npm start
http://localhost:5000/ to access 

Press CTRL + C to stop the process.
```

REST API lists
-http://localhost:5000/api/users/register
-http://localhost:5000/api/users/login
-http://localhost:5000/api/restaurant
http://localhost:5000/api/users/logout


Sample restauarant structure data
.................................
{
    "name": "malabar",
    "description": "test",
    "type": "non-veg",
    "Menus": 
        [{
            "menuName": "menuName",
            "menuDescription": "test2",
            "Items": 
                [{
                    "itemName": "kabab",
                    "itemDescription": "test3",
                    "image": "Imageurlhere"
                }]
            
        }]
}
.......................................
Register Data
.............
{
    "firstName": "sanjay",
    "lastName": "kumar",
    "email": "sanjay@gmail.com",
    "password": "pass123"
}