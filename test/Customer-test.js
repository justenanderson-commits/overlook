import { expect } from 'chai';
import Customer from '../src/Customer';
import { customer48, cust48UpcomingBookings, cust48PreviousBookings, cust48AllBookings } from '../test-data/customer-test-data';


describe('Customer', () => {
  let customer;
  beforeEach(() => {
    customer = new Customer(customer48)
    customer.getNewBookings(cust48AllBookings)
    customer.getOldBookings(cust48AllBookings)
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
})
