class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.newBookings;
    this.oldBookings;
  }

  getNewBookings(customerBookings) {
    this.newBookings = customerBookings.filter(booking => booking.date >= '2022/11/11')
  }

  getOldBookings(customerBookings) {
    this.oldBookings = customerBookings.filter(booking => booking.date <= '2022/11/11')
  }
};

export default Customer;