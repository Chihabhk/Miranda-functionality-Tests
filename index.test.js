const { Room } = require("./index.js");

const rooms = [
    {
        //room-0
        name: "Room 1",
        rate: "",
        discount: "",
        bookings: [
            {
                name: "John Doe",
                email: "johndoe@example.com",
                checkIn: "03/02/2023",
                checkOut: "06/02/2023",
            },
            {
                name: "Alice Smith",
                email: "alicesmith@example.com",
                checkIn: "12/02/2023",
                checkOut: "15/02/2023",
            },
            {
                name: "Bob Johnson",
                email: "bobjohnson@example.com",
                checkIn: "22/02/2023",
                checkOut: "26/02/2023",
            },
            {
                name: "Emma Davis",
                email: "emma.davis@example.com",
                checkIn: "05/03/2023",
                checkOut: "10/03/2023",
            },
            {
                name: "Max Wilson",
                email: "max.wilson@example.com",
                checkIn: "18/03/2023",
                checkOut: "22/03/2023",
            },
        ],
    },
];
describe("Room isOccupied", () => {
    it("isOccupied returns false when NOT occupied", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(room.isOccupied("11/03/2023")).toBeFalsy();
    });

    it("isOccupied returns true when IS occupied", () => {
        const room = new Room("Room 1", rooms[0].bookings);
        expect(room.isOccupied("18/03/2023")).toBeTruthy();
    });
});

describe("Room occupancy percentage", () => {
    it("Should return 0% when there is no booking in range", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(room.occupancyPercentage("10/03/2023", "17/03/2023")).toEqual(0);
    });
    it("Should return 100% occupancy when fully booked", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(room.occupancyPercentage("18/03/2023", "21/03/2023")).toEqual(
            100
        );
    });
    it("Should return the correct % for various booking dates ", () => {
        const room = new Room(rooms[0].name, rooms[0].bookings);
        expect(
            room.occupancyPercentage("18/03/2023", "22/03/2023")
        ).toBeCloseTo(80);
        expect(
            room.occupancyPercentage("09/03/2023", "21/03/2023")
        ).toBeCloseTo(38.46);
        expect(
            room.occupancyPercentage("14/03/2023", "22/03/2023")
        ).toBeCloseTo(44.44);
    });
});
