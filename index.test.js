const { Room, Booking } = require("./index.js");
const today = new Date();

const rooms = [
    {
        //room-0
        name: "Room 1",
        rate: "",
        discount: "",
        bookings: [
            {
                name: "Guest",
                email: "guest@gmail.com",
                checkIn: "10/02/2023",
                checkOut: "16/02/2023",
            },
            {
                name: "Guest",
                email: "guest@gmail.com",
                checkIn: "10/03/2023",
                checkOut: "16/04/2023",
            },
            {
                name: "Guest",
                email: "guest@gmail.com",
                checkIn: "02/05/2023",
                checkOut: "12/06/2023",
            },
        ],
    },
];
describe("Room isOccupied", () => {
    it("Should return false when NOT occupied", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(room.isOccupied("1/05/2023")).toBeFalsy();
    });

    it("Should return true when IS occupied", () => {
        const room = new Room("Room 1", rooms[0].bookings);
        expect(room.isOccupied("11/06/2023")).toBeTruthy();
    });
});

describe("Room occupancy percentage", () => {
    it("Should return 0 when there is no booking in range", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(room.occupancyPercentage("01/06/2023", "10/06/2023")).toEqual(0);
    });
});
