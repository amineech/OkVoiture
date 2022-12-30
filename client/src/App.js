import { Routes, Route } from 'react-router-dom'; 
import Form from './Components/Form';
import CarsList from './Components/CarsList'; 
import ReservationsList from './Components/ReservationsList'; 
import './App.css';

function App() {

  return (
    <div className='container'>

      <Routes>
      
        <Route path='/' element={ <h1>OkVoiture</h1> } />
        
        <Route path='/cars/create' element= { <Form /> } />
        
        <Route path='/cars/list' element= { <CarsList /> } />
        
        <Route path='/reservations/list' element= { <ReservationsList /> } />
      
      </Routes>
    
    </div>
  );
}

export default App;
