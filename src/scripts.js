//Imports
import './css/styles.css';
// Image import example
import './images/turing-logo.png';
// Will I need to add an API call for Rooms? Probably yes. A class? Maybe...
import { getAllCustomers, getSingleCustomer, getAllBookings, addNewBooking } from './api-calls';
import Customer from './Customer';
import Booking from './Booking';

//Global Variables
let allCustomersData, customerData, allBookingsData, customer, booking;

// addNewBooking()


// Query Selectors


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:
// Currently I have an async problem. I can't utilize the variables assigned in the Promise.all because they are returning undefined when I do. I need to find a way to delay the continued execution of code until they are all resolved. My console logs show this very clearly in the dev tools because I am getting undefined for all variable assignments, but the api-calls console logs are working just fine...once they resolve.

// UPDATE: The solution is to instantiate a new class within the promise.all. 
const allPromises = () => { 
  Promise.all([getAllCustomers(), getSingleCustomer(48), getAllBookings()])
  .then(data => {
    allCustomersData = data[0]
    // customerData should now be hard-coded for Kaylee Herman. Remove the [47] and pass in the userID to make it dynamic.
    customerData = data[1][47]
    allBookingsData = data[2]
    // Fix this instantiation of customer
    // customer = new Customer(allCustomersData[randomIndex(allCustomersData)]);
    booking = new Booking();
  })
}


console.log('This should be allCustomer data: ', allCustomersData)
console.log('Customer 48 data on line 46: ', customerData)
console.log('All bookings: ', allBookingsData)

// Event Listeners
window.addEventListener('load', allPromises)

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





