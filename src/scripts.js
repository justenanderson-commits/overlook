//Imports
import './css/styles.css';
// Image import example
import './images/turing-logo.png';
// Will I need to add an API call for Rooms? Probably yes. A class? Maybe...
import { getAllCustomers, getSingleCustomer, getAllBookings, getAllRooms, addNewBooking } from './api-calls';
import Customer from './Customer';
import Booking from './Booking';
import Room from './Room';

//Global Variables
let allCustomersData, customerData, allBookingsData, allRoomsData, customer, newBooking;

// addNewBooking()


// Query Selectors


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:

// UPDATE: The solution is to instantiate a new class within the promise.all. I just gotta figure out how to do it.
const onLoadPromises = () => { 
  Promise.all([getSingleCustomer(48), getAllBookings(), getAllRooms()])
  .then(data => {
    // customerData should now be hard-coded for Kaylee Herman. Remove the (48) and pass in the userID to make it dynamic.
    customerData = data[0]
    console.log('Customer Data: ', customerData)
    customer = new Customer(customerData)
    console.log('New Customer Object: ', customer)
    // customer.getBookings(allBookingsData)

    allBookingsData = data[1]
    console.log('All bookings data: ', allBookingsData)
    let customerBookings = allBookingsData.bookings.filter(booking => booking.userID === 48)
    console.log('Customer Bookings: ', customerBookings)



    allRoomsData = data[2]
    console.log('All rooms data: ', allRoomsData)
    allRoomsData.rooms.forEach(room => {
      room = new Room(room)
    })
    // Write then Call helper function to find old and new bookings
    // Write then Call helper function to display the updated data
    // console.log('This should be allCustomer data: ', allCustomersData)
  })
}

// Add helper to find old and new bookings for a single customer (as a method on the customer class?)
// Add another helper to display the updated data

// Event Listeners
window.addEventListener('load', onLoadPromises)

// Helper Functions

const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')
const randomIndex = array => Math.floor(Math.random() * array.length)
// Update this with the correct query selector once it's built
const loadCustomer = () => customerWelcome.innerHTML = `<p>Welcome, ${customer.name}!</p>`

// Need to figure out why these aren't being imported
const displayBookingConfirmation = () => (console.log('This is a confirmation message.'))
const displayFierceApology = () => console.log('This is a fierce apology.')


// export { displayBookingConfirmation, displayBookingConfirmation }





