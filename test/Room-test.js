import { expect } from 'chai';
import Room from '../src/Room';
import { testRoom1, testRoom2, testRoom26, allBookingsData, testRoom1Bookings, testRoom2Bookings } from '../test-data/Room-test-data';


describe('Room', () => {
  let room1, room2
  beforeEach(() => {
    room1 = new Room(testRoom1)
    room2 = new Room(testRoom2)
  })

  it('should be a function', () => {
    expect(Room).to.be.a('function')
  })

  it('should have a room number', () => {
    expect(room1.number).to.equal(1)
    expect(room2.number).to.equal(2)
  })

  it('should have a room type', () => {
    expect(room1.roomType).to.equal('residential suite')
    expect(room2.roomType).to.equal('suite')
  })

  it('should have bidet', () => {
    expect(room1.bidet).to.equal(true)
    expect(room2.bidet).to.equal(false)
  })

  it('should have a bed size', () => {
    expect(room1.BedSize).to.equal('queen')
    expect(room2.BedSize).to.equal('full')
  })

  it('should have a number of beds', () => {
    expect(room1.numBeds).to.equal(1)
    expect(room2.numBeds).to.equal(2)
  })

  it('should have a cost per night', () => {
    expect(room1.costPerNight).to.equal(358.4)
    expect(room2.costPerNight).to.equal(477.38)
  })

  it('its datesBooked should start as an empty array', () => {
    expect(room1.datesBooked).to.deep.equal([])
    expect(room2.datesBooked).to.deep.equal([])
  })

  it('should have a method that finds the dates booked and assigns them to the datesBooked property', () => {
    room1.getDatesBooked(allBookingsData)
    expect(room1.datesBooked).to.deep.equal(testRoom1Bookings)
    room2.getDatesBooked(allBookingsData)
    expect(room2.datesBooked).to.deep.equal(testRoom2Bookings)

    let room26 = new Room(testRoom26)
    room26.getDatesBooked(allBookingsData)
    expect(room26.datesBooked).to.deep.equal([])
  })
})