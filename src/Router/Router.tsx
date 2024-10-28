import { Route, Routes } from 'react-router-dom'
import SignInSignUpPage from '../pages/SignInSignUpPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import BookingDetails from '../pages/BookingDetails'
import BuyTicket from '../pages/BuyTicket/BuyTicket'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import SignInPage from '../pages/SignInPage'
import BuyFood from '../pages/BuyFood'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<SignInSignUpPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/bookingdetails/:id' element={<BookingDetails/>}/>
        <Route path='/buyticket' element={<BuyTicket/>}/>
        <Route path='/moviedetails/:id' element={<MovieDetailsPage/>}/>
        <Route path='/buyfood' element={<BuyFood/>}/>
    </Routes>
  )
}

export default Router