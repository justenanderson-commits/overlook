class Customer {
  constructor(customerData, customerBookings) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.newBookings;
    this.oldBookings;
  }

  getNewBookings(customerBookings) {
    this.newBookings = customerBookings.filter(booking => booking.date >= '2022/11/11')
    console.log('Upcoming bookings ', this.newBookings)
  }

  getOldBookings(customerBookings) {
    this.oldBookings = customerBookings.filter(booking => booking.date <= '2022/11/11')
    console.log('Old bookings ', this.oldBookings)
  }
}

export default Customer