//Imports
import './css/styles.css';
// Image import example
import './images/turing-logo.png';
import { getAllCustomers, getSingleCustomer, getAllBookings, getAllRooms, addNewBooking } from './api-calls';
import Customer from './Customer';
import Booking from './Booking';
import Room from './Room';

//Global Variables
let allCustomersData, singleCustomerData, allBookingsData, allRoomsData, customer, newBookings, today, bookableRooms, userID, selectedDate, bookedRooms, filteredRoomsByDate, filteredRoomsByType;

// Current date finder
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
today = `${year}/${month}/${day}`;

// Query Selectors
const customerDashboard = document.getElementById('section--customer-dashboard')
const newBookingSection = document.getElementById('section--new-booking')
const newBookingContainer = document.getElementById('container--make-new-booking')
const upcomingStaysTable = document.getElementById('table--upcoming-stays-body')
const previousStaysTable = document.getElementById('table--previous-stays-body')
const availableRoomsTable = document.getElementById('table--available-rooms-body')
const customerWelcome = document.getElementById('text--customer-message')
const upcomingTotal = document.getElementById('text--upcoming-total')
const previousTotal = document.getElementById('text--previous-total')
const dateSelector = document.getElementById('input--date-selection')
const selectRoomButton = document.getElementById('button--select-room')
const bookItButton = document.getElementById('button--book-it')
const roomTypeDropDown = document.getElementById('button--room-type-drop-down')
const anyRoomButton = document.getElementById('button--any-room')
const singleRoomButton = document.getElementById('button--single-room')
const juniorSuiteButton = document.getElementById('button--junior-suite')
const regularSuiteButton = document.getElementById('button--regular-suite')
const residentialSuiteButton = document.getElementById('button--residential-suite')

//  These 2 event listeners may be unnecessary
const bookRoomButton = document.getElementById('button--book-room')
const filterRoomTypeForm = document.getElementById('form--room-filter')

// Customer inputs
userID = 48


// Promises - REMOVE HARD CODING WHEN THESE ARE WORKING:
const onLoadPromises = () => {
  Promise.all([getSingleCustomer(userID), getAllBookings(), getAllRooms()])
    .then(data => {
      // singleCustomerData is harded-coded
      singleCustomerData = data[0]
      // console.log('Customer Data: ', singleCustomerData)

      allBookingsData = data[1].bookings
      // console.log('All bookings data: ', allBookingsData)
      allRoomsData = data[2].rooms

      let customerBookings = allBookingsData.filter(booking => booking.userID === userID)
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
        room.getDatesBooked(allBookingsData)
        bookableRooms.push(room)
      })
      // console.log('Updated bookable rooms array with dates booked: ', bookableRooms)

      loadCustomer()
      hide(newBookingSection)   
      hide(availableRoomsTable) 
    })
}

// Delete this stuff:
const consoleCheck = () => console.log('This worked')

// Helper Functions
const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')
const loadCustomer = () => customerWelcome.innerHTML = `<p>Welcome, ${customer.name}!</p>`
const displayNewBookingSection = () => {
  hide(customerDashboard)
  hide(filterRoomTypeForm)
  hide(availableRoomsTable)
  show(newBookingSection)
}

// Other functions
const getFilteredRoomsByDate = (event) => {
  let date = event.target.value
  console.log('Filter by date event: ', event.target.value)
  let [year, month, day] = date.split('-');
  let selectedDate = [year, month, day].join('/');
  filteredRoomsByDate = bookableRooms.filter(room => !room.datesBooked.includes(selectedDate))
  console.log(filteredRoomsByDate)
  return filteredRoomsByDate
}

const showAvailableRooms = (event) => {
  getFilteredRoomsByDate(event)
  show(availableRoomsTable)
  show(filterRoomTypeForm)
  filteredRoomsByDate.forEach(room => {
    availableRoomsTable.innerHTML += `
        <tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet}</td>
          <td>${room.BedSize}</td>
          <td>${room.numBeds}</td>
          <td>$${room.costPerNight}</td>
          <td><button id="button--select-room">Select</button></td>
        </tr>
  `
  })
}

const getFilteredRoomsByType = (event) => {
  // console.log(event.target.value)
  let roomType = event.target.value
  // console.log('Room type: ,', roomType)
  // let roomType = 'suite'
  filteredRoomsByType = filteredRoomsByDate.filter(room => roomType === room.roomType)
  // console.log('Filtered rooms by type: ', filteredRoomsByType)
  return filteredRoomsByType
}

const showFilteredRoomsByType = (event) => {
  getFilteredRoomsByType(event)
  if (event.target.value != 'any') {
    availableRoomsTable.innerHTML = ''
    filteredRoomsByType.forEach(room => {
      availableRoomsTable.innerHTML += `
        <tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet}</td>
          <td>${room.BedSize}</td>
          <td>${room.numBeds}</td>
          <td>$${room.costPerNight}</td>
          <td><button id="button--select-room">Select</button></td>
        </tr>
  `
    })
  } else {
    availableRoomsTable.innerHTML = ''
    showAvailableRooms(event)
  }
}



// Event Listeners
window.addEventListener('load', onLoadPromises)
bookRoomButton.addEventListener('click', displayNewBookingSection)
// selectRoomButton.addEventListener('click', consoleCheck)
// bookItButton.addEventListener('click', consoleCheck)
dateSelector.addEventListener('input', (event) => {
  showAvailableRooms(event)
});

function consoleCheck2() {
  console.log('This button works')
}


roomTypeDropDown.addEventListener('change', showFilteredRoomsByType)





// Delete this:
// hide(customerDashboard)

// Need to figure out why these aren't being imported....?
const displayBookingConfirmation = () => (console.log('This is a confirmation message.'))
const displayFierceApology = () => console.log('This is a fierce apology.')


// Maybe delete this:
export default today;




