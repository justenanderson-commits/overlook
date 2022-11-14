class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.BedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
    this.datesBooked = [];
  }

  getDatesBooked(allBookingsData) {
    allBookingsData.forEach(booking => {
      if (booking.roomNumber === this.number) {
        this.datesBooked.push(booking.date)
      }
    })
  }
}

export default Room;
