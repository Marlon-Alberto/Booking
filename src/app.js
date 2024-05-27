const fastify = require("fastify")
const BookingRepository = require("./bookings/bookingRepository")
const BookingService = require("./bookings/bookingService")
const BookingController = require("./bookings/BookingController")

const app = fastify({logger: true})

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)

app.get("/api/bookings",(request, reply)=>{
    const {code, body} = bookingController.index(request)
    reply.code(code).send(body)
})

app.post("/api/bookings", (request, reply) => {
    const{code, body} = bookingController.save(request)

    reply.code(code).send(body)
})

module.exports = app