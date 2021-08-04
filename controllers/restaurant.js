const Restaurants = require('./../models/restaurant');

//fetch all restaurants from db
exports.getAllRestaurants = async (req, res, next) => {
    //console.log(req);
    const restaurant = await Restaurants.find();
    res.status(200).json(restaurant);
};

//handle inserting restauarants to db
exports.postRestaurants = async (req, res, next) => {
    const newRestaurant = new Restaurants(req.body);
    try {
        const restaurant = await newRestaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


