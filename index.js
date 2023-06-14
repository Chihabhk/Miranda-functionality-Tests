function formatDate(date) {
    if (!date) {
        return date;
    } else if (date instanceof Date) {
        return date;
    } else if (!date.includes("/")) {
        return date;
    } else {
        const dateParts = date.split("/");
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    }
}

class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = formatDate(checkIn);
        this.checkOut = formatDate(checkOut);
        this.discount = discount;
        this.room = room;
    }
    getFee(roomDiscount, bookingDiscount) {}
}

class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
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
                (!booking.checkOut || formattedDate < booking.checkOut)
            ) {
                return true;
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const msToDays = 1000 * 60 * 60 * 24;
        //Returns integer number of days in the selected range(inclusive)
        const ocuppancyRange =
            1 + Math.floor((formattedEndDate - formattedStartDate) / msToDays);
        let occupiedDays = 0;

        for (
            let currentDay = formattedStartDate;
            currentDay <= formattedEndDate;
            currentDay.setDate(currentDay.getDate() + 1)
        ) {
            if (this.isOccupied(currentDay)) occupiedDays++;
        }
        const percentage = parseFloat(
            ((occupiedDays * 100) / ocuppancyRange).toFixed(2)
        );
        return percentage;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let totalOccupancy = 0;

        for (const room of rooms) {
            const roomOccupancyPercentage = room.occupancyPercentage(
                startDate,
                endDate
            );
            totalOccupancy += roomOccupancyPercentage;
        }

        return parseFloat((totalOccupancy / rooms.length).toFixed(2));
    }

    static availableRooms(rooms, startDate, endDate) {
        let availableRooms = [];

        for (const room of rooms) {
            let isAvailable = true;
            for (
                let currentDay = formatDate(startDate);
                currentDay <= formatDate(endDate);
                currentDay.setDate(currentDay.getDate() + 1)
            ) {
                if (room.isOccupied(currentDay)) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) availableRooms.push(room);
        }

        return availableRooms;
    }
}

module.exports = {
    Room,
    Booking,
};
