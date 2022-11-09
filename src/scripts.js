//Imports
import './css/styles.css';
import './images/turing-logo.png'
import { getAllCustomers, getSingleCustomer, getAllBookings, addNewBooking } from './api-calls';

//Global Variables
let allCustomers, customer, allBookings

// addNewBooking()


// Query Selectors


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:
// Currently I have an async problem. I can't utilize the variables assigned in the Promise.all because they are returning undefined when I do. I need to find a way to delay the continued execution of code until they are all resolved. My console logs show this very clearly in the dev tools because I am getting undefined for all variable assignments, but the api-calls console logs are working just fine...once they resolve. 
const allPromises = () => { 
  Promise.all([getAllCustomers(), getSingleCustomer(48), getAllBookings()])
  .then(data => {
    allCustomers = data[0]
    customer = data[1]
    allBookings = data[2]
  })
}

window.addEventListener('load', allPromises)

console.log('This should be allCustomer data: ', allCustomers)
console.log('Customer 48 data on line 46: ', customer)
console.log('All bookings: ', allBookings)

// Event Listeners

// Helper Functions

const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')
const randomIndex = array => Math.floor(Math.random() * array.length)
// Update this with the correct query selector once it's built
const loadUser = () => userWelcome.innerHTML = `<p>Welcome, ${user.name}!</p>`

// Need to figure out why these aren't being imported
const displayBookingConfirmation = () => (console.log('This is a confirmation message.'))
const displayFierceApology = () => console.log('This is a fierce apology.')


// export { displayBookingConfirmation, displayBookingConfirmation }





