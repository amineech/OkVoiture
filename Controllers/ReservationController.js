// model
const Reservation = require('../Models/Reservation');

const addReservation = async (req, res) => {
    try {

        // get data from request body 
        let { email, designation, date_debut, date_fin } = req.body;
        
        // converting entered dates to valid js date values
        date_debut = new Date(date_debut);
        date_fin = new Date(date_fin);

        // converting dates to milliseconds
        let newDateDebutMs = date_debut.getTime();
        let newDateFinMs = date_fin.getTime();
        
        // dates validation
        if( newDateDebutMs < Date.now() || newDateFinMs < Date.now() || newDateDebutMs >= newDateFinMs ) {
            return res.send({ dates_error: 'invalid dates' });
        }
        
        // getting all reservations of the chosen car
        let reservations = await Reservation.findAll({
            where: {
                email: email.trim(),
                designation: designation.trim()
            }
        });

        reservations = await JSON.parse(JSON.stringify(reservations));

        // checking the availability of the car 

        let reserved = false; 

        for(let res of reservations) {

            // converting db dates to valid js dates
            let dateDebut = new Date(res.date_debut);
            let dateFin = new Date(res.date_fin);

            // convert dates to milliseconds (for every reservaion)
            let dateDebutMs = dateDebut.getTime(); 
            let dateFinMs = dateFin.getTime(); 

            // test over the dates
            if ( 
                newDateDebutMs >= dateDebutMs && newDateDebutMs <= dateFinMs ||
                newDateFinMs >= dateDebutMs && newDateFinMs <= dateFinMs || 
                newDateDebutMs <= dateDebutMs && newDateFinMs >= dateFinMs ) {
                    // car is already reserved in the entered dates => break oout of the loop
                    reserved = true;
                    break;
                }
        }

        if(reserved)
            return res.send({ dispo_error: 'already reserved' });

        // the car is available => save the reservation
        await Reservation.create({
            email: email,
            designation: designation,
            date_debut: date_debut,
            date_fin: date_fin
        }, {
            // the values will be inserted in those fields respectively
            fields: ['email', 'designation', 'date_debut', 'date_fin']
        });

        // confirmation message
        return res.send({ message: 'reservation added' });

    } catch (error) {
        res.end(error);
    }
}

const displayReservations = async (req, res) => {
    try {
        
        let reservations = await Reservation.findAll({
            // specify the field to get from database
            attributes: ['id', 'email', 'designation', 'date_debut', 'date_fin', 'created_at']
        });

        reservations = await JSON.parse(JSON.stringify(reservations));

        // reversing dates format (from 'yyyy-mm-dd' to 'dd-mm-yyyy')
        for(let rsv of reservations){
            for(let key in rsv){
                if(key === 'date_debut' || key === 'date_fin' || key === 'created_at'){
                    if(rsv[key] !== null){
                        rsv[key] = rsv[key].split('-').reverse().join('-');
                    }
                }
            }
        }

        return res.send(reservations);

    } catch (error) {
        res.end(error);
    }
}

const deleteReservation = async (req, res) => {
    try {
        
        let id = req.body.id;

        await Reservation.destroy({
            where: {
                id: id
            }
        });

        res.send({ deleted: 'reservation deleted' });

    } catch (error) {
        res.end(error);
    }
}

const clearFilter = () => {
    try {
        
        
    } catch (error) {
        console.log(error);
    }
}

const findReservationsByDesignation = async (req, res) => {
    try {
        
        let designation = req.params.designation;

        let reservations = await Reservation.findAll({
            where: {
                designation: designation
            }, attributes: [ 'id', 'email', 'designation', 'date_debut', 'date_fin', 'created_at' ]
        });

        reservations = await JSON.parse(JSON.stringify(reservations));

        res.send(reservations);

    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    addReservation,
    displayReservations,
    deleteReservation,
    findReservationsByDesignation
};