// Are imports going to be necessary here?
// customerId

const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      console.log(data)
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}

const getSingleCustomer = (customerId) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerId}`)
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      console.log(data)
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
      console.log(data)
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}

const addNewBooking = () => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userID": 48, "date": "2022/12/01", "roomNumber": 4 })
  })
    .then(response => response.json())
    .then(data => {
      // Add callback function here
      console.log(data)
    })
    .catch(error => {
      // Add callback function here
      console.log(error)
    });
}


export { getAllCustomers, getSingleCustomer, getAllBookings, addNewBooking }
