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
const noRoomsAvailableSection = document.getElementById('section--no-rooms-available')
const newBookingContainer = document.getElementById('container--make-new-booking')
const upcomingStaysTable = document.getElementById('table--upcoming-stays-body')
const previousStaysTable = document.getElementById('table--previous-stays-body')
const availableRoomsTableHead = document.getElementById('table--available-rooms-head')
const availableRoomsTableBody = document.getElementById('table--available-rooms-body')
const customerWelcome = document.getElementById('text--customer-message')
const upcomingTotal = document.getElementById('text--upcoming-total')
const previousTotal = document.getElementById('text--previous-total')
const noRoomsMessage = document.getElementById('text--no-rooms-available')
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
      allBookingsData = data[1].bookings
      allRoomsData = data[2].rooms
      let customerBookings = allBookingsData.filter(booking => booking.userID === userID)
      customer = new Customer(singleCustomerData)
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
      bookableRooms = [];
      allRoomsData.forEach(room => {
        room = new Room(room)
        room.getDatesBooked(allBookingsData)
        bookableRooms.push(room)
      })
      loadCustomer()
      hide(newBookingSection)
      hide(availableRoomsTableBody)
    })
}


// Helper Functions
const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')


// Other functions
const loadCustomer = () => customerWelcome.innerHTML = `<p>Welcome, ${customer.name}!</p>`
const displayNewBookingSection = () => {
  hide(customerDashboard)
  hide(filterRoomTypeForm)
  hide(availableRoomsTableBody)
  hide(availableRoomsTableHead)
  hide(noRoomsMessage)
  // hide(noRoomsAvailableSection)
  show(newBookingSection)
}

const getFilteredRoomsByDate = (event) => {
  let date = event.target.value
  let [year, month, day] = date.split('-');
  let selectedDate = [year, month, day].join('/');
  filteredRoomsByDate = bookableRooms.filter(room => !room.datesBooked.includes(selectedDate))
  if (filteredRoomsByDate.length != 0) {
    return filteredRoomsByDate
  } else {
    console.log('This should not be firing but it is for some reason.')
    show(noRoomsAvailableSection)
  }
}

const showAvailableRooms = (event) => {
  getFilteredRoomsByDate(event)
  if (filteredRoomsByDate.length === 0) {
    hide(availableRoomsTableHead)
    hide(availableRoomsTableBody)
    show(noRoomsMessage)
  } else {
    show(availableRoomsTableHead)
    show(availableRoomsTableBody)
    show(filterRoomTypeForm)
    filteredRoomsByDate.forEach(room => {
      availableRoomsTableBody.innerHTML += `
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
}

const getFilteredRoomsByType = (event) => {
  let roomType = event.target.value
  filteredRoomsByType = filteredRoomsByDate.filter(room => roomType === room.roomType)
  // if (filteredRoomsByType.length === 0) {
  //   hide(newBookingContainer)
  //   hide(availableRoomsTableHead)
  //   console.log('Idk what is going on')
  //   show(noRoomsAvailableSection)
  // } else {
  return filteredRoomsByType
  // }
}

const showFilteredRoomsByType = (event) => {
  getFilteredRoomsByType(event)
  if (filteredRoomsByType.length === 0) {
    hide(availableRoomsTableHead)
    hide(availableRoomsTableBody)
    show(noRoomsMessage)

  } else if (event.target.value != 'any') {
    hide(noRoomsMessage)
    show(availableRoomsTableHead)
    show(availableRoomsTableBody)
    availableRoomsTableBody.innerHTML = ''
    filteredRoomsByType.forEach(room => {
      availableRoomsTableBody.innerHTML += `
        <tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet}</td>
          <td>${room.BedSize}</td>
          <td>${room.numBeds}</td>
          <td>$${room.costPerNight}</td>
          <td><button id="button--select-room">Select</button></td>
        </tr>`
    })
  } else {
    availableRoomsTableBody.innerHTML = ''
    showAvailableRooms(event)
  }
}

// Event Listeners
window.addEventListener('load', onLoadPromises)
bookRoomButton.addEventListener('click', displayNewBookingSection)
dateSelector.addEventListener('input', (event) => {
  showAvailableRooms(event)
});
roomTypeDropDown.addEventListener('change', showFilteredRoomsByType)


// Delete this:
// hide(customerDashboard)

// Maybe delete this:
export default today;