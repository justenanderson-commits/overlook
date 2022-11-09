// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// An example of how you tell webpack to use an 
// image (also need to link to it in the index.html)

//Imports
import './css/styles.css';
import './images/turing-logo.png'
import { getAllCustomers, getSingleCustomer, getAllBookings, addNewBooking } from './api-calls';

//Global Variables
console.log('This is the JavaScript entry file - your code begins here.');

let allCustomers = getAllCustomers()
let customer = getSingleCustomer(1)
let allBookings = getAllBookings()
addNewBooking()


// Query Selectors


// Promises


// Event Listeners


// Helper Functions
const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')
const randomIndex = array => Math.floor(Math.random() * array.length)
// Update this with the correct query selector once it's built
const loadUser = () => userWelcome.innerHTML = `<p>Welcome, ${user.name}!</p>`

// const displayBookingConfirmation = () => {}
// const displayFierceApology = () => console.log('This is a fierce apology.')


// export { displayBookingConfirmation, displayBookingConfirmation }





