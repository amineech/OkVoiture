import React, { useState } from 'react';
import axios from 'axios';
import './Box.css';

function Box({ openBox, setOpenBox, chosenCarData, setchosenCarData }) {

    const [ reservation, setReservation ] = useState({
        email: chosenCarData.email,
        designation: chosenCarData.designation,
        date_debut: null,
        date_fin: null,
    });
    
    // flash messages
    const [ msg, setMessage ] = useState('');
    const [ err, setError ] = useState('');

    // handle the form submission (creation of the reservation record)
    const handleFormSubmit = async (e) => {

        try {

            e.preventDefault();

            let response = await axios.post('http://localhost:5000/reservations/add', reservation);
            
            response = await JSON.parse(JSON.stringify(response));
            
            // display flash messages according to the api response
            if(response.data.dates_error) 
                setError('Dates invalides !');
                setTimeout(() => {
                    setError('');
                }, 5000);
            
            if(response.data.dispo_error) 
                setError('Voiture indisponibles pendant ces dates !');
                setTimeout(() => {
                    setError('');
                }, 5000);
            if(response.data.message) 
                setMessage('Réservation enregistrée !');
                setTimeout(() => {
                    setMessage('');
                }, 5000);

        } catch (error) {
            console.log(error);
        }
    }
     
    // updating the state values every time the user enter data
    const handleValues = (e) => {

        const newValues = { ...reservation };

        newValues[e.target.name] = e.target.value;
        
        setReservation( newValues );
    }

    return (
        <div className='modal-box'>
        
            <h4>Effectuer votre réservation</h4>

            <div className='flash-msg box-flash'>
                { msg }
            </div>
            <div className='flash-msg box-flash'>
                { err }
            </div>
            
            <form onSubmit={ (e) => handleFormSubmit(e) }>
                <h4>{ chosenCarData.designation }</h4>
                <label>Date de début</label>
                <input type='date' name='date_debut' onChange={ (e) => handleValues(e) } required />
                <label>Date de fin</label>
                <input type='date' name='date_fin' onChange={ (e) => handleValues(e) } required />
                <input type='submit' value='Réserver' name='send' />
            </form>
            
            <button onClick={ () => { setOpenBox(false) } }>
                Quitter
            </button>
        
        </div>
    )
}

export default Box;