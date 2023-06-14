const { Room, Booking } = require("./index.js");

const rooms = [
    new Room("Room 1", [], 1500, 10),
    new Room("Room 2", [], 1200, 5),
    new Room("Room 3", [], 1800, 15),
];
rooms[0].bookings = [
    new Booking(
        "John Doe",
        "johndoe@example.com",
        "03/02/2023",
        "06/02/2023",
        20,
        rooms[0]
    ),
    new Booking(
        "Alice Smith",
        "alicesmith@example.com",
        "12/02/2023",
        "15/02/2023",
        20,
        rooms[0]
    ),
    new Booking(
        "Bob Johnson",
        "bobjohnson@example.com",
        "22/02/2023",
        "26/02/2023",
        20,
        rooms[0]
    ),
    new Booking(
        "Emma Davis",
        "emma.davis@example.com",
        "05/03/2023",
        "10/03/2023",
        20,
        rooms[0]
    ),
    new Booking(
        "Max Wilson",
        "max.wilson@example.com",
        "18/03/2023",
        "22/03/2023",
        20,
        rooms[0]
    ),
];
rooms[1].bookings = [
    new Booking(
        "Sarah ohnson",
        "sarahjohnson@example.com",
        "05/02/2023",
        "08/02/2023",
        60,
        rooms[1]
    ),
    new Booking(
        "David Brown",
        "davidbrown@example.com",
        "15/02/2023",
        "18/02/2023",
        17,
        rooms[1]
    ),
    new Booking(
        "Emily Wilson",
        "emilywilson@example.com",
        "01/03/2023",
        "22/03/2023",
        45,
        rooms[1]
    ),
];
rooms[2].bookings = [
    new Booking(
        "Michael Johnson",
        "michaeljohnson@example.com",
        "10/02/2023",
        "15/02/2023",
        20,
        rooms[2]
    ),
    new Booking(
        "Sophia Brown",
        "sophiabrown@example.com",
        "18/02/2023",
        "22/02/2023",
        25,
        rooms[2]
    ),
    new Booking(
        "Oliver Wilson",
        "oliverwilson@example.com",
        "10/03/2023",
        "22/03/2023",
        40,
        rooms[2]
    ),
];

describe("Room isOccupied", () => {
    it("isOccupied returns false when NOT occupied", () => {
        const room = rooms[0];
        expect(room.isOccupied("02/02/2023")).toBeFalsy();
    });

    it("isOccupied returns true when IS occupied", () => {
        const room = rooms[0];
        expect(room.isOccupied("03/02/2023")).toBeTruthy();
    });
});

describe("Room occupancy percentage", () => {
    it("Should return 0% when there is no booking in range", () => {
        const room = rooms[0];
        expect(room.occupancyPercentage("06/02/2023", "11/02/2023")).toEqual(0);
    });
    it("Should return 100% occupancy when fully booked", () => {
        const room = rooms[0];
        expect(room.occupancyPercentage("18/03/2023", "21/03/2023")).toEqual(
            100
        );
    });
    it("Should return the correct % for various booking dates ", () => {
        const room = rooms[0];
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

describe("Rooms totalOccupancyPercentage", () => {
    it("Should return 0% when there is no booking in a given range", () => {
        expect(
            Room.totalOccupancyPercentage(rooms, "06/04/2023", "11/4/2023")
        ).toBeCloseTo(0);
    });

    it("Should return 100% when all rooms are fully booked in a given range", () => {
        expect(
            Room.totalOccupancyPercentage(rooms, "18/03/2023", "21/03/2023")
        ).toBeCloseTo(100);
    });

    it("totalOccupancyPercentage returns the correct % for various booking dates ", () => {
        expect(
            Room.totalOccupancyPercentage(rooms, "03/02/2023", "10/03/2023")
        ).toBeCloseTo(37.96);
        expect(
            Room.totalOccupancyPercentage(rooms, "09/03/2023", "21/03/2023")
        ).toBeCloseTo(76.92);
        expect(
            Room.totalOccupancyPercentage(rooms, "14/03/2023", "22/03/2023")
        ).toBeCloseTo(74.07);
    });
});

describe("Available Rooms", () => {
    it("Returns empty array when no rooms are available", () => {
        expect(Room.availableRooms(rooms, "18/03/2023", "21/03/2023")).toEqual(
            []
        );
    });
    it("Returns available rooms array in given range", () => {
        expect(Room.availableRooms(rooms, "06/04/2023", "11/4/2023")).toEqual([
            rooms[0],
            rooms[1],
            rooms[2],
        ]);
        expect(Room.availableRooms(rooms, "15/02/2023", "17/02/2023")).toEqual([
            rooms[0],
            rooms[2],
        ]);
    });
});
