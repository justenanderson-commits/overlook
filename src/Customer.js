import today from './scripts'

class Customer {
  constructor(customerData, today) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.newBookings;
    this.oldBookings;
    this.totalUpcomingCost = 0;
    this.totalPreviousCost = 0;
  }

  getNewBookings(customerBookings) {
    this.newBookings = customerBookings.filter(booking => booking.date > today)
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
  }

  getCostOfEachOldBooking(allRoomsData) {
    this.oldBookings.map(booking => {
      let foundRoom = allRoomsData.rooms.find(room => room.number === booking.roomNumber)
      booking['price'] = foundRoom.costPerNight
      return booking
    })
  }

  getTotalAmountToSpend() {
    let total = this.newBookings.reduce((acc, booking) => acc + booking.price, 0)
    this.totalUpcomingCost = total
  }

  getTotalAmountSpent() {
    let total = this.oldBookings.reduce((acc, booking) => acc + booking.price, 0)
    this.totalPreviousCost = total
  }
};


export default Customer;