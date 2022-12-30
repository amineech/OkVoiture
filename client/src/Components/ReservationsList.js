import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import './ReservationsList.css';


function ReservationsList() {

    const [ reservationsData, setReservationsData ] = useState([]);

    // get the list of all reservations
    const getReservationsList = async () => {

        let reservations = await axios.get('http://localhost:5000/reservations/list');  

        // display the list in a table
        reservations = <Table 
                        headers={['Numéro', 'Email', 'Désignation', 'Date début', 'Date fin', 'Date de réservation', 'Actions']} 
                        dataList={ reservations.data } />

        setReservationsData(reservations);
    }

    useEffect(() => {
        getReservationsList();
    }, []);

    return (
        <React.Fragment>
            
            <h1>Liste des réservations</h1>
            
            <div className='reservations-container'>
                { reservationsData }
            </div>
        
        </React.Fragment>
    )
}

export default ReservationsList;