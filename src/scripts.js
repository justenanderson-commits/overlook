//Imports
import './css/styles.css';
// Image import example
import './images/turing-logo.png';
import { getAllCustomers, getSingleCustomer, getAllBookings, getAllRooms, addNewBooking } from './api-calls';
import Customer from './Customer';
import Booking from './Booking';
import Room from './Room';

//Global Variables
let allCustomersData, singleCustomerData, allBookingsData, allRoomsData, customer, newBookings, today;

// Current date finder
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
today = `${year}/${month}/${day}`;

// Query Selectors
const customerWelcome = document.getElementById('text--customer-message')

const upcomingStaysTable = document.getElementById('table--upcoming-stays-body')
const previousStaysTable = document.getElementById('table--previous-stays-body')


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:

// UPDATE: The solution is to instantiate a new class within the promise.all. I just gotta figure out how to do it.
const onLoadPromises = () => {
  Promise.all([getSingleCustomer(48), getAllBookings(), getAllRooms()])
    .then(data => {
      // singleCustomerData should now be hard-coded for Kaylee Herman. Remove the (48) and pass in the userID to make it dynamic.
      singleCustomerData = data[0]
      // console.log('Customer Data: ', singleCustomerData)

      allBookingsData = data[1]
      // console.log('All bookings data: ', allBookingsData)
      let customerBookings = allBookingsData.bookings.filter(booking => booking.userID === 48)
      // console.log('Customer Bookings: ', customerBookings)

      customer = new Customer(singleCustomerData)
      // console.log('New Customer Object: ', customer)
      customer.getNewBookings(customerBookings)
      customer.getOldBookings(customerBookings)
      customer.newBookings.forEach(booking => {
        upcomingStaysTable.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>Add room</td>
        <td>${booking.id}</td>
        <td>Add price</td>
        </tr>`
      })

      customer.oldBookings.forEach(booking => {
        previousStaysTable.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>Add room</td>
        <td>${booking.id}</td>
        <td>Add price</td>
        </tr>`
      })

      // console.log('Customer newBookings property: ', customer.newBookings)
      // console.log('Customer oldBookings property: ', customer.oldBookings)

      allRoomsData = data[2]
      // console.log('All rooms data: ', allRoomsData)
      allRoomsData.rooms.forEach(room => {
        room = new Room(room)
        loadCustomer()
      })
    })
}

// Event Listeners
window.addEventListener('load', onLoadPromises)

// Helper Functions
const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')
const loadCustomer = () => customerWelcome.innerHTML = `<p>Welcome, ${customer.name}!</p>`







// Need to figure out why these aren't being imported
const displayBookingConfirmation = () => (console.log('This is a confirmation message.'))
const displayFierceApology = () => console.log('This is a fierce apology.')

export default today;




