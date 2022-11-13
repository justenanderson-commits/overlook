//Imports
import './css/styles.css';
// Image import example
import './images/turing-logo.png';
import { getAllCustomers, getSingleCustomer, getAllBookings, getAllRooms, addNewBooking } from './api-calls';
import Customer from './Customer';
import Booking from './Booking';
import Room from './Room';

//Global Variables
let allCustomersData, singleCustomerData, allBookingsData, allRoomsData, customer, newBookings, today, bookableRooms, userID;

// Current date finder
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
today = `${year}/${month}/${day}`;

// Query Selectors
const upcomingStaysTable = document.getElementById('table--upcoming-stays-body')
const previousStaysTable = document.getElementById('table--previous-stays-body')
const customerWelcome = document.getElementById('text--customer-message')
const upcomingTotal = document.getElementById('text--upcoming-total')
const previousTotal = document.getElementById('text--previous-total')
const selectedDate = document.getElementById('input--date-selection')

// Customer inputs
userID = 48
// selectedDate


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:
const onLoadPromises = () => {
  Promise.all([getSingleCustomer(userID), getAllBookings(), getAllRooms()])
    .then(data => {
      // singleCustomerData is harded-coded
      singleCustomerData = data[0]
      // console.log('Customer Data: ', singleCustomerData)

      allBookingsData = data[1]
      allRoomsData = data[2].rooms
      // console.log('All bookings data: ', allBookingsData)

      let customerBookings = allBookingsData.bookings.filter(booking => booking.userID === userID)
      // console.log('Customer Bookings: ', customerBookings)

      customer = new Customer(singleCustomerData)
      // console.log('New Customer Object: ', customer)
      customer.getNewBookings(customerBookings, today)
      customer.getOldBookings(customerBookings, today)
      customer.getCostOfEachNewBooking(allRoomsData)
      customer.getCostOfEachOldBooking(allRoomsData)
      customer.getTotalAmountToSpend()
      customer.getTotalAmountSpent()
      customer.newBookings.forEach(booking => {
        upcomingStaysTable.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.id}</td>
        <td>${booking.price}</td>
        </tr>`
      })

      customer.oldBookings.forEach(booking => {
        previousStaysTable.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.id}</td>
        <td>${booking.price}</td>
        </tr>`
      })

      upcomingTotal.innerText += ` $${customer.totalUpcomingCost}`
      previousTotal.innerText += ` $${customer.totalPreviousCost}`
      // console.log('Customer newBookings property: ', customer.newBookings)
      // console.log('Customer oldBookings property: ', customer.oldBookings)

      bookableRooms = [];
      // console.log('All rooms data: ', allRoomsData)
      allRoomsData.forEach(room => {
        room = new Room(room)
        bookableRooms.push(room)
      })
      // console.log('Bookable rooms : ', bookableRooms)
      
      loadCustomer()
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




