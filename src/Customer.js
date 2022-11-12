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
    this.newBookings = customerBookings.filter(booking => booking.date > today)
  }

  getOldBookings(customerBookings, today) {
    this.oldBookings = customerBookings.filter(booking => booking.date <= '2022/11/11')
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
    let finalTotal = parseFloat(total.toFixed(2))
    this.totalUpcomingCost = finalTotal
  }

  getTotalAmountSpent() {
    let total = this.oldBookings.reduce((acc, booking) => acc + booking.price, 0)
    let finalTotal = parseFloat(total.toFixed(2))
    this.totalPreviousCost = finalTotal
  }
};


export default Customer;