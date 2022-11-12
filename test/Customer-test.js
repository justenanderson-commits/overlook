import { expect } from 'chai';
import Customer from '../src/Customer';
import { customer48, cust48UpcomingBookings, cust48PreviousBookings} from '../test-data/customer-test-data';


describe('Customer', () => {
  let customer;
  beforeEach(() => {
    customer = new Customer(customer48)
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  })

  it('should return the customer name', () => {
    expect(customer.name).to.equal('Kaylee Hermann')
  })

})
