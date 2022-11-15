//Imports
import './css/styles.css';
import './images/turing-logo.png';
import { getSingleCustomer, getAllBookings, getAllRooms, addNewBooking } from './api-calls';
import Customer from './Customer';
import Room from './Room';


//Global Variables
let singleCustomerData, allBookingsData, allRoomsData, customer, today, bookableRooms, userID, selectedDate, filteredRoomsByDate, filteredRoomsByType, customerBookings


// Current date finder
const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
today = `${year}/${month}/${day}`


// Query Selectors
const customerDashboard = document.getElementById('section--customer-dashboard')
const newBookingSection = document.getElementById('section--new-booking')
const noRoomsAvailableSection = document.getElementById('section--no-rooms-available')
const loginPageSection = document.getElementById('section--login-page')

const upcomingStaysTableBody = document.getElementById('table--upcoming-stays-body')
const upcomingStaysTableHead = document.getElementById('table--upcoming-stays-head')

const previousStaysTableBody = document.getElementById('table--previous-stays-body')
const previousStaysTableHead = document.getElementById('table--previous-stays-head')


const availableRoomsTableHead = document.getElementById('table--available-rooms-head')
const availableRoomsTableBody = document.getElementById('table--available-rooms-body')
const customerWelcome = document.getElementById('text--customer-message')
const upcomingTotal = document.getElementById('text--upcoming-total')
const previousTotal = document.getElementById('text--previous-total')
const noRoomsMessage = document.getElementById('text--no-rooms-available')
const dateSelector = document.getElementById('input--date-selection')
const usernameInput = document.getElementById('input--username')
const passwordInput = document.getElementById('input--password')
const roomTypeDropDown = document.getElementById('button--room-type-drop-down')
const bookRoomButton = document.getElementById('button--book-room')
const filterRoomTypeForm = document.getElementById('form--room-filter')
const headerSection = document.getElementById('section--header')
const loginButton = document.getElementById('button--login')
const loginError = document.getElementById('error--login-page')
const loginContainer = document.getElementById('container--log-in')


// Promises
const onLoadPromises = () => {
  Promise.all([getSingleCustomer(userID), getAllBookings(), getAllRooms()])
    .then(data => {
      singleCustomerData = data[0]
      allBookingsData = data[1].bookings
      allRoomsData = data[2].rooms
      customerBookings = allBookingsData.filter(booking => booking.userID == userID)
      customer = new Customer(singleCustomerData)
      customer.getNewBookings(customerBookings, today)
      customer.getOldBookings(customerBookings, today)
      customer.getCostOfEachNewBooking(allRoomsData)
      customer.getCostOfEachOldBooking(allRoomsData)
      customer.getTotalAmountToSpend()
      customer.getTotalAmountSpent()
      upcomingStaysTableBody.innerHTML = ''
      customer.newBookings.forEach(booking => {
        upcomingStaysTableBody.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.id}</td>
        <td>${booking.price}</td>
        </tr>`
      })
      previousStaysTableBody.innerHTML = ''
      customer.oldBookings.forEach(booking => {
        previousStaysTableBody.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.id}</td>
        <td>${booking.price}</td>
        </tr>`
      })
      upcomingTotal.innerText = ` $${customer.totalUpcomingCost}`
      previousTotal.innerText = ` $${customer.totalPreviousCost}`
      bookableRooms = [];
      allRoomsData.forEach(room => {
        room = new Room(room)
        room.getDatesBooked(allBookingsData)
        bookableRooms.push(room)
      })
      loadCustomer()
      hide(loginContainer)
      hide(loginPageSection)
      hide(newBookingSection)
      hide(availableRoomsTableBody)
      hide(loginError)
      show(customerDashboard)
      show(headerSection)
      dateSelector.min = `${year}-${month}-${day}`
    })
}


// Helper Functions
const show = element => element.classList.remove('hidden')
const hide = element => element.classList.add('hidden')


// Other functions


const loadCustomer = () => customerWelcome.innerHTML = `<p>Welcome, ${customer.name}!</p>`

const displayNewBookingSection = () => {
  hide(loginContainer)
  hide(loginPageSection)
  hide(loginError)
  hide(customerDashboard)
  hide(filterRoomTypeForm)
  hide(availableRoomsTableBody)
  hide(availableRoomsTableHead)
  hide(noRoomsMessage)
  show(newBookingSection)
}

const getFilteredRoomsByDate = (event) => {
  let date = event.target.value
  let [year, month, day] = date.split('-');
  selectedDate = [year, month, day].join('/');
  filteredRoomsByDate = bookableRooms.filter(room => !room.datesBooked.includes(selectedDate))
  if (filteredRoomsByDate.length != 0) {
    return filteredRoomsByDate
  } else {
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
    availableRoomsTableBody.innerHTML = ''
    filteredRoomsByDate.forEach(room => {
      availableRoomsTableBody.innerHTML += `
        <tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet}</td>
          <td>${room.BedSize}</td>
          <td>${room.numBeds}</td>
          <td>$${room.costPerNight}</td>
          <td><button id="button--select-room" data-room="${room.number}">Select</button></td>
        </tr>
        `
    })
  }
}

const getFilteredRoomsByType = (event) => {
  let roomType = event.target.value
  filteredRoomsByType = filteredRoomsByDate.filter(room => roomType === room.roomType)
  return filteredRoomsByType
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
          <td><button id="button--select-room" data-room="${room.number}">Select</button></td>`
    })

  } else {
    availableRoomsTableBody.innerHTML = ''
    showAvailableRooms(event)
  }
}

const createNewBooking = (event) => {
  let newBooking = {
    'userID': +userID,
    'date': selectedDate,
    'roomNumber': +event.target.dataset.room
  }
  Promise.all([addNewBooking(newBooking)])
    .then(data => onLoadPromises())
  
  // show(customerDashboard)
}

const customerLogin = () => {
  let username = usernameInput.value
  let nameOnly = username.slice(0, 8)
  userID = username.slice(8)
  if (nameOnly === 'customer' && userID < 51 && userID > 0 && passwordInput.value === 'overlook2021') {
    onLoadPromises()
    hide(loginPageSection)
    show(customerDashboard)
  } else {
    show(loginError)
  }
}


const displayLoginSection = () => {
show(loginPageSection)
show(loginContainer)
hide(headerSection)
hide(loginError)
hide(customerDashboard)
hide(filterRoomTypeForm)
hide(availableRoomsTableBody)
hide(availableRoomsTableHead)
hide(noRoomsMessage)
hide(newBookingSection)
}

// Event Listeners
window.addEventListener('load', displayLoginSection)
bookRoomButton.addEventListener('click', displayNewBookingSection)
dateSelector.addEventListener('input', (event) => {
  showAvailableRooms(event)
});
roomTypeDropDown.addEventListener('change', showFilteredRoomsByType)
availableRoomsTableBody.addEventListener('click', createNewBooking)
loginButton.addEventListener('click', customerLogin)