import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './Box';
import mapsIcon from '../resources/maps-icon.png'; 
import euroIcon from '../resources/euro-icon.png'; 
import './CarsList.css';

function List() {

    const [ carsData, setCarsData ] = useState([]);

    // to handle modal box opening and closing 
    const [ openBox, setOpenBox ] = useState(false);

    // to handle the data of the car chosen by the user 
    const [ chosenCarData, setChosenCarData ] = useState({});

    // handle the click on the "Reserver" button
    const handleClick = async (id) => {

        let car = await axios.get(`http://localhost:5000/cars/detail/${id}`);

        setChosenCarData(car.data); 

        setOpenBox(true); // open the modal
    }

    // to get the list of all cars
    const getCarsList = async () => {

        try {
            
            let cars = await axios.get('http://localhost:5000/cars/list');
        
            // sorting cars by price (low to high)
            cars.data = cars.data.sort( (car1, car2) => car1.prix - car2.prix );

            // mapping the list to display in the page
            let list = cars.data.map( (car, index) => {

                return (
                    <React.Fragment>                    
                        <div key={index} className='offer'>
                            <div className='image'>
                                <img src={`../carsPhotos/${car.photo}`} alt='Car'/>
                            </div>
                            <div className='infos'>
                                <h2>{car.designation}</h2>
                                <span><img src={ mapsIcon } alt='Ville' /> { car.ville }</span>
                                <span>Prix par jour: { car.prix } <img src={euroIcon} alt='EUR' /></span>
                            </div>
                            <button onClick={ () => { handleClick(car.id) } }>
                                Réserver
                            </button>
                        </div>  
                    </React.Fragment> 
                )
            });

            setCarsData(list);

        } catch (error) {
            console.log(error);            
        }
    }

    useEffect( () => {
        getCarsList();
    }, []);

    return (
        <React.Fragment>
            
            {/* list of cars */}
            <div className='list-container'>
                { carsData }
            </div>

            {/* a shadow box to prevent user from chosing something else if the modal box is still open */}
            { openBox && <div className='shadow-box'></div>}
            
            {/* the box will be hidden till the user click the button "Reserver" */}
            { openBox && <Box openBox={ openBox } setOpenBox={ setOpenBox } chosenCarData={ chosenCarData } setChosenCarData={ setChosenCarData } />}
        
        </React.Fragment>

    )
}

export default List;