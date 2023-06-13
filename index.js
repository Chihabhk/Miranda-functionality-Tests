function formatDate(date) {
    const dateParts = date.split("/"); // dd/mm/aaaa
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

class Booking {
    constructor(name, email, checkIn, checkOut, discount) {
        this.name = name;
        this.email = email;
        this.checkIn = formatDate(checkIn);
        this.checkOut = formatDate(checkOut);
        this.discount = discount;
    }
    getFee(roomDiscount, bookingDiscount) {}
}

class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings.map(
            (booking) =>
                new Booking(
                    booking.name,
                    booking.email,
                    booking.checkIn,
                    booking.checkOut
                )
        );
        this.rate = rate;
        this.discount = discount;
    }
    isOccupied(date) {
        //en qué formato lo tengo que pasar? 14/02/1999
        //todo: date es cualquier fecha del pasado? futuro? o del día de la consulta
        const formattedDate = formatDate(date);
        for (let i = 0; i < this.bookings.length; i++) {
            const booking = this.bookings[i];
            if (
                formattedDate >= booking.checkIn &&
                formattedDate < booking.checkOut
            ) {
                return true;
            }
        }

        return false;
    }

    occupancyPercentage(startDate, endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        return 0;
    }
}

module.exports = {
    Room,
    Booking,
};
