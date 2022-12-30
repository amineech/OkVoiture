import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {

    // data to store 
    const [ car, setCar ] = useState({
        prenom: '',
        email: '',
        designation: '',
        ville: '',
        prix: '',
    });

    // photo of the car
    const [ file, setFile ] = useState(null);

    // flash messages 
    const [ msg, setMessage ] = useState('');
    const [ err, setError ] = useState('');

    // cities 
    const [ citiesData, setCitiesData ] = useState([]);

    const form = useRef(null);

    // handle the form submission (creation of the car record)
    const handleCarFormSubmit = async (e) =>  {

        try {
            
            e.preventDefault();

            let formdata = new FormData(form.current);

            let response = await axios.post('http://localhost:5000/cars/create', formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            response = await JSON.parse(JSON.stringify(response));

            // display flah messages according to the api response
            if(response.data.message) {
                setMessage('Voiture ajoutée');
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
            if(response.data.email_error) {
                setError('Format d\'email n\'est pas valide');
                setTimeout(() => {
                    setError('')
                }, 5000);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // each time the user enter a value in a field
    const handleValues = (e) => {
        
        // updating state values every time the user enter data
        const newValues = { ...car };
        
        newValues[ e.target.name ] = e.target.value;
        
        setCar( newValues );
    }

    // handle file upload to the form
    function handleFile(e) {
        
        let file = e.target.files[0];
        
        setFile(file);
    }

    // list of cities (GEO api)
    const getCitiesList = async () => {
        
        try {
            
            let response = await fetch('https://geo.api.gouv.fr/departements/987/communes');
            
            let villes = await response.json();
            
            let list = villes.map( ville => <option key={ville.code}>{ ville.nom }</option> );
            
            setCitiesData(list);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        getCitiesList();
    }, []);

    return (
        <div className='form-container'>

            <h2>Ajouter votre voiture</h2>

            <div className='flash-messages'>
                <div className='flash-msg flash-message-green'>
                    { msg }
                </div>
                <div className='flash-msg flash-message-red'>
                    { err }
                </div>
            </div>

            <form ref={form} onSubmit={ (e) => handleCarFormSubmit(e) } encType='multipart/form-data'>
                <label>Prénom</label>
                <input type='text' maxLength='100' name='prenom' onChange={(e) => handleValues(e)} required/>
                <label>Email</label>
                <input type='email' maxLength='100' name='email' onChange={(e) => handleValues(e)} placeholder='example@domain.com' required/>
                <label>Désignantion</label>
                <input type='text' maxLength='100' name='designation' onChange={(e) => handleValues(e)} placeholder='Marque modèle année' required/>
                <label>Ville</label>
                <select name='ville' onChange={(e) => handleValues(e)}>
                    {/* list of cities */}
                    { citiesData }
                </select>
                <label>Prix par jour en EURO</label>
                <input type='number' step='0.01' name='prix' onChange={(e) => handleValues(e)} required/>
                <label>Photo</label>
                <input type='file' accept='image/png, image/jpg, image/jpeg' name='photo' onChange={(e) => handleFile(e)} required/>
                <input type='submit' value='Ajouter' name='send' />
            </form>

        </div>
    )
}

export default Form;