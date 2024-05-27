const Booking = require("./booking")

class BookingService {
    constructor(repository){
        this.repository = repository
    }

    findAllBookings(){
        return this.repository.findAll()
    }

    createBooking({roomId, guestName, checkInDate, checkOutDate}){
        const newBooking = new Booking(roomId, guestName, checkInDate, checkOutDate)


        const overLappingBooking = this.repository.findAll().find((booking) =>{
            return(
                booking.roomId === newBooking.roomId &&
                booking.checkInDate < newBooking.checkOutDate &&
                booking.checkOutDate > newBooking.checkInDate
            )
        })

        if(overLappingBooking){
            throw new Error ("The room is already booked for the selected dates")
        }
        this.repository.create(newBooking)
        return newBooking
    }
}

module.exports = BookingService