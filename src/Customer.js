class Customer {
  constructor(customerData, today) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.newBookings;
    this.oldBookings;
    this.totalUpcomingCost = 0;
    this.totalPreviousCost = 0;
  }

  getNewBookings(customerBookings, today) {
    let newBookings = customerBookings.filter(booking => booking.date > today)
    this.newBookings = newBookings
    return newBookings
  }

  getOldBookings(customerBookings, today) {
    let oldBookings = customerBookings.filter(booking => booking.date <= today)
    this.oldBookings = oldBookings
    return oldBookings
  }

  getCostOfEachNewBooking(allRoomsData) {
    let bookingsWithUpcomingCost = this.newBookings.map(booking => {
      let foundRoom = allRoomsData.find(room => room.number === booking.roomNumber)
      booking['price'] = foundRoom.costPerNight
      return booking
    })
    
    return bookingsWithUpcomingCost
  }

  getCostOfEachOldBooking(allRoomsData) {
    let bookingsWithPreviousCost = this.oldBookings.map(booking => {
      let foundRoom = allRoomsData.find(room => room.number === booking.roomNumber)
      booking['price'] = foundRoom.costPerNight
      return booking
    })
    return bookingsWithPreviousCost
  }

  getTotalAmountToSpend() {
    let total = this.newBookings.reduce((acc, booking) => acc + booking.price, 0)
    let finalTotal = parseFloat(total.toFixed(2))
    this.totalUpcomingCost = finalTotal
    return finalTotal
  }

  getTotalAmountSpent() {
    let total = this.oldBookings.reduce((acc, booking) => acc + booking.price, 0)
    let finalTotal = parseFloat(total.toFixed(2))
    this.totalPreviousCost = finalTotal
    return finalTotal
  }
};


export default Customer;