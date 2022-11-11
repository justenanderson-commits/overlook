// Are imports going to be necessary here?
// customerId
// import { displayBookingConfirmation, displayFierceApology } from './scripts'

const getSingleCustomer = (customerId) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerId}`)
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      // console.log('Single customer data from api call: ', data)
      return data;
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}

const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      // console.log('All customer data from api call: ', data)
      return data;
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}


const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      // console.log('Bookings data from api call: ', data)
      return data;
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      console.log('Room data from api call: ', data)
      return data;
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}

// Will need to add parameters to addNewBooking function to make it dynamic
const addNewBooking = () => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Will need to pass in arguments to make the body dynamic
    body: JSON.stringify({ "userID": 48, "date": "2022/11/23", "roomNumber": 4 })
  })
    .then(response => { 
      if (!response.ok) {
        throw new Error('Ah, shucks. The post failed for some reason.')
      }
      return response.json()
  })
    .then(data => {
      // displayBookingConfirmation()
      // Add callback function here
      console.log(data)
      return data;
    })
    .catch(error => {
      // displayFierceApology()
      // Add callback function here
      console.log(error)
    });
}


export { getAllCustomers, getSingleCustomer, getAllBookings, getAllRooms, addNewBooking }
