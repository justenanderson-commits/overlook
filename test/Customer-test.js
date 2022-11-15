import { expect } from 'chai';
import Customer from '../src/Customer';
import { customer48, cust48UpcomingBookings, cust48PreviousBookings, cust48AllBookings, allRoomsData, bookingsWithUpcomingCost, bookingsWithPreviousCost, customer60, cust60AllBookings } from '../test-data/customer-test-data';


describe('Customer', () => {
  let customer, customer2, today
  beforeEach(() => {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    today = `${year}/${month}/${day}`

    customer = new Customer(customer48)
    customer.getNewBookings(cust48AllBookings, today)
    customer.getOldBookings(cust48AllBookings, today)

    customer2 = new Customer(customer60)
    customer2.getNewBookings(cust60AllBookings, today)
    customer2.getOldBookings(cust60AllBookings, today)
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  })

  it('should return the customer name', () => {
    expect(customer.name).to.equal('Kaylee Hermann')
    expect(customer2.name).to.equal('John Customer')
  })

  it('should return the customerID', () => {
    expect(customer.id).to.equal(48)
    expect(customer2.id).to.equal(60)
  })

  it('should have an array of upcoming bookings', () => {
    expect(customer.newBookings).to.deep.equal(cust48UpcomingBookings)
    expect(customer2.newBookings).to.deep.equal([])
  })

  it('should have an array of previous bookings', () => {
    expect(customer.oldBookings).to.deep.equal(cust48PreviousBookings)
    expect(customer2.oldBookings).to.deep.equal([])
  })

  it('should have a method that finds all new bookings', () => {
    expect(customer.getNewBookings(cust48AllBookings, today)).to.deep.equal(cust48UpcomingBookings)
    expect(customer2.getNewBookings(cust60AllBookings, today)).to.deep.equal([])
  })

  it('should have a method that finds all old bookings', () => {
    expect(customer.getOldBookings(cust48AllBookings, today)).to.deep.equal(cust48PreviousBookings)
    expect(customer2.getOldBookings(cust60AllBookings, today)).to.deep.equal([])
  })

  it('should have a method that find the cost of upcoming bookings', () => {
    expect(customer.getCostOfEachNewBooking(allRoomsData)).to.deep.equal(bookingsWithUpcomingCost)
    expect(customer2.getCostOfEachNewBooking(allRoomsData)).to.deep.equal([])
  })

  it('should have a method that find the cost of Previous bookings', () => {
    expect(customer.getCostOfEachOldBooking(allRoomsData)).to.deep.equal(bookingsWithPreviousCost)
    expect(customer2.getCostOfEachOldBooking(allRoomsData)).to.deep.equal([])
  })

  it('should have a method that finds the total upcoming cost', () => {
    expect(customer.getTotalAmountToSpend()).to.deep.equal(581.77)
    expect(customer2.getTotalAmountToSpend()).to.deep.equal(0)
  })

  it('should have a method that finds the total amount spent on previous bookings', () => {
    expect(customer.getTotalAmountSpent()).to.deep.equal(5827.02)
    expect(customer2.getTotalAmountSpent()).to.deep.equal(0)
  })
})
