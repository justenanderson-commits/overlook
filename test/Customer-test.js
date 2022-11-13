import { expect } from 'chai';
import Customer from '../src/Customer';
import { customer48, cust48UpcomingBookings, cust48PreviousBookings, cust48AllBookings } from '../test-data/customer-test-data';


describe('Customer', () => {
  let customer, today;
  beforeEach(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    today = `${year}/${month}/${day}`;

    customer = new Customer(customer48)
    customer.getNewBookings(cust48AllBookings, today)
    customer.getOldBookings(cust48AllBookings, today)
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  })

  it('should return the customer name', () => {
    expect(customer.name).to.equal('Kaylee Hermann')
  })

  it('should return the customerID', () => {
    expect(customer.id).to.equal(48)
  })

  it('should have an array of upcoming bookings', () => {
    expect(customer.newBookings).to.deep.equal(cust48UpcomingBookings)
  })

  it('should have an array of previous bookings', () => {
    expect(customer.oldBookings).to.deep.equal(cust48PreviousBookings)
  })

  it('should have a method that finds all new bookings', () => {
    expect(customer.getNewBookings(cust48AllBookings, today)).to.deep.equal(cust48UpcomingBookings)
  })

  it('should have a method that finds all old bookings', () => {
    expect(customer.getOldBookings(cust48AllBookings, today)).to.deep.equal(cust48PreviousBookings)
  })





  it('should have an array of previous bookings', () => {
    expect(customer.oldBookings).to.deep.equal(cust48PreviousBookings)
  })

  it('should have an array of previous bookings', () => {
    expect(customer.oldBookings).to.deep.equal(cust48PreviousBookings)
  })


})
