// model
const Car = require('../Models/Car');

// to check email format
const emailValidator = require('email-validator');

const addCar = async (req, res) => {
    try {
        
        // extracting data from the requet body (using destructuring)
        let { prenom, email, designation, ville, prix } = req.body;
        // extracting the file 
        let photo = req.files.photo;

        if(!emailValidator.validate(email))
            return res.json({email_error: 'The email format is not valid'});

        let photo_extension = photo.name.substr(photo.name.lastIndexOf('.') + 1); // photo extension 
        let photo_name = photo.name.slice(0, photo.name.lastIndexOf('.')); // photo name
        // creating new photo name to avoid duplicated names
        photo.name = `${photo_name}-${Date.now()}.${photo_extension}`;

        // folder to save photo on the server
        let path = `./client/public/carsPhotos/${photo.name}`;

        // move photo to the folder on the server
        await photo.mv(path, (error) => {
            if(error)
                throw error;
        });

        // create the record in the database
        await Car.create({
            prenom: prenom.trim(),
            email: email.trim(),
            designation: designation.trim(),
            ville: ville,
            prix: prix,
            photo: photo.name
        }, {
            // the values will be inserted in those fields respectively
            fields: ['prenom', 'email', 'designation', 'ville', 'prix', 'photo']
        });

        // confirmation message
        return res.json({message: 'car added !'});

    } catch (error) {
        res.end(error);
    }
}

const displayCars = async (req, res) => {

    try {
        let cars = await Car.findAll();

        cars = await JSON.parse(JSON.stringify(cars));

        return res.send(cars);
        
    } catch (error) {
        res.end(error);
    }
}

const findCarById = async (req, res) => {
    try {
        
        const id = req.params.id;

        let car = await Car.findByPk(id);

        car = await JSON.parse(JSON.stringify(car));

        return car !== null ? res.send(car) : { message: 'car not found' };
    
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    addCar,
    displayCars,
    findCarById
};