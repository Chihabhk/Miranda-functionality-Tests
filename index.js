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
    getFee() {
        const totalDiscount = (this.discount + this.room.discount) / 100;
        return parseFloat(
            (totalDiscount >= 0 && totalDiscount <= 1
                ? this.room.rate * (1 - totalDiscount)
                : 0
            ).toFixed(2)
        );
    }
}

class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        /*
         The check-out date is not considered as occupied.
         */
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
        const occupancyPercentage = parseFloat(
            ((occupiedDays * 100) / ocuppancyRange).toFixed(2)
        );
        return occupancyPercentage;
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

        const totalOccupancyPercentage = parseFloat(
            (totalOccupancy / rooms.length).toFixed(2)
        );
        return totalOccupancyPercentage;
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
