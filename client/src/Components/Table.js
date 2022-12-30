import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

function Table({ headers, dataList}) {
    /**
     * == Table component ==
     * => headers: array of all  headers (th or columns titles)
     * => dataList: the array of object to display in the table
     */

    // flash message
    const [ msg, setMessage ] = useState('');

    // data to display in the table (initialized to the list passed as argument which contains all reservations)
    const [ listData, setListData ] = useState(dataList);

    // filter by model ('véhicule')
    const [ filterData, setFilterData ] = useState([]);

    const [ firstLoad, setFirstLoad ] = useState(true);

    // handle removing a rervation (deleting)
    const handleDeleteClick = async (id, index, e) => {

        try {
            
            e.preventDefault();
            
            let response = await axios.post(`http://localhost:5000/reservations/delete`, { id: id });

            response = await JSON.parse(JSON.stringify(response));
                        
            // remove the deleted item from the original list and display flash message without refreshing the page 
            if(response.data.deleted) {
            
                dataList.splice(index, 1);

                setMessage('Réservation supprimée !')
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // handle the change of value in the select filter
    const handleChange = async (e) => {

        try {
            
            const designation = e.target.value;

            let reservations = await axios.get(`http://localhost:5000/reservations/filter/${designation}`);

            reservations = await JSON.parse(JSON.stringify(reservations));
            
            setFirstLoad(false);

            setListData(reservations.data);

        } catch (error) {
            console.log(error);
        }
    }

    //  clear the filter and display the full list of reservations simply by reloading the page
    const clearFilter = () => {
        try {

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    // fill the select tag by deignations values (cars) 
    const getFilterData = async () => {

        try {
            
            let cars = await axios.get('http://localhost:5000/cars/list');

            cars = await JSON.parse(JSON.stringify(cars));
            
            setFilterData(cars.data);

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getFilterData();
    })

    return (
        <React.Fragment>
            <div className='filtre'>
                <select onChange={ (e) => handleChange(e) }>
                    { firstLoad ? <option>Selectionner une désignation...</option> : null }
                    { filterData.map( car => {
                        return ( <option value={car.designation}>{ car.designation }</option> )
                    }) }
                </select>
                <input type='submit' value='Annuler le filtre' onClick={ clearFilter } />
            </div>
            
            <div className='flash-msg flash-message-red'>
                 { msg }
            </div>
            
            <table>
                <thead>
                    <tr>
                        {/* titles of columns (headers) */}
                        { headers.map( header => {
                            return ( <th>{ header }</th> )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* if the list contains objects, display then, else display a simple message to indicate that there is no data */}
                    { listData.length > 0 ? listData.map( (row, index) => {
                        return (  
                            <tr key={ index }>
                                {/* display values of each row in columns  */}
                                { Object.keys(row).map( (item, index) => {
                                    return (
                                        <td key={ index }>{ row[item] }</td>
                                )} ) }
                                <td>
                                    {/* to handle delete (row.id is the id value of each reservation) */}
                                    <form onSubmit={ (e) => handleDeleteClick(row.id, index, e) }>
                                        <input type='submit' title='Supprimer la réservation' value='X' />
                                    </form>   
                                </td>
                            </tr> 
                        )}) : <tr className='data-empty'>Pas de réservations...</tr>
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Table;