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
};

export default Customer;