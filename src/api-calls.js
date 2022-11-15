import displayNetworkError from './scripts'

const getSingleCustomer = (customerId) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ah, shucks. The fetch failed for some reason.')
      }
      return response.json()
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      // Add callback function here
      displayNetworkError()
      console.log('Error message: ', error)
    });
}

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Ah, shucks. The fetch failed for some reason.')
      }
      return response.json()
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      // Add callback function here
      displayNetworkError()
      console.log('Error message: ', error)
    });
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Ah, shucks. The fetch failed for some reason.')
      }
      return response.json()
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      // Add callback function here
      displayNetworkError()
      console.log('Error message: ', error)
    });
}

const addNewBooking = (newBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ah, shucks. The post failed for some reason.')
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      return data;
    })
    .catch(error => {
      displayNetworkError()
      console.log('Error message: ', error)
    });
}


export { getSingleCustomer, getAllBookings, getAllRooms, addNewBooking }
