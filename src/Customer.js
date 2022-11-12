import today from './scripts'

class Customer {
  constructor(customerData, today) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.newBookings;
    this.oldBookings;
  }

  getNewBookings(customerBookings) {
    this.newBookings = customerBookings.filter(booking => booking.date >= today)
  }

  getOldBookings(customerBookings) {
    this.oldBookings = customerBookings.filter(booking => booking.date <= today)
  }

  getCostOfEachNewBooking(allRoomsData) {
    this.newBookings.map(booking => {
      let foundRoom = allRoomsData.rooms.find(room => room.number === booking.roomNumber)
      booking['price'] = foundRoom.costPerNight
      return booking
    })



    console.log('newBookings after: ', this.newBookings)

  }
    // this.newBookings.forEach(booking => {
    //   allRoomsData.rooms.find(room => booking.roomNumber === room.number).push(this.costOfNewBookings)
    // })
  
  // getCostOfEachOldBooking() {}

  // getTotalAmountToSpend() {}

  // getTotalAmountSpent() {}
};

// Look at the newBookings array
// For each newBooking, search through the allRoomsData for the costPerNight (find) and return it
// Push the found costPerNight into an empy array
// Use reduce to find the total amount spent and assign it to the new customer object

export default Customer;