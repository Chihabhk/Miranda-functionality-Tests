const { Room, Booking } = require("./index.js");

const rooms = [
    { name: "Room 1", bookings: [], rate: 1500, discount: 0 },
    { name: "Room 2", bookings: [], rate: 1200, discount: 10 },
    { name: "Room 3", bookings: [], rate: 1800, discount: 15 },
];
const bookings0 = [
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
const bookings1 = [
    new Booking(
        "Sarah ohnson",
        "sarahjohnson@example.com",
        "05/02/2023",
        "08/02/2023",
        0,
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
const bookings2 = [
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

describe("Room isOccupied()", () => {
    it("Returns false when NOT occupied", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        expect(room.isOccupied("02/02/2023")).toBeFalsy();
    });

    it("Returns true when IS occupied", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        expect(room.isOccupied("03/02/2023")).toBeTruthy();
    });

    it("Returns true when there is no checkOut in the booking", () => {
        const room = new Room(rooms[0]);
        room.bookings = [
            new Booking(
                "Max Wilson",
                "max.wilson@example.com",
                "18/03/2023",
                "",
                20,
                rooms[0]
            ),
        ];
        // room.bookings[4].checkOut = null;
        expect(room.isOccupied("20/03/2023")).toBeTruthy();
    });
});

describe("Room occupancy percentage", () => {
    it("Should return 0% when there is no booking in range", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        expect(room.occupancyPercentage("06/02/2023", "11/02/2023")).toEqual(0);
    });
    it("Should return 100% occupancy when fully booked", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        expect(room.occupancyPercentage("18/03/2023", "21/03/2023")).toEqual(
            100
        );
    });
    it("Should return the correct % for various booking dates ", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
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

describe("Rooms totalOccupancyPercentage()", () => {
    it("Should return 0% when there is no booking in a given range", () => {
        const room0 = new Room(rooms[0]);
        room0.bookings = bookings0;
        const room1 = new Room(rooms[1]);
        room1.bookings = bookings1;
        const room2 = new Room(rooms[2]);
        room2.bookings = bookings2;
        const roomsArray = [room0, room1, room2];
        expect(
            Room.totalOccupancyPercentage(roomsArray, "06/04/2023", "11/4/2023")
        ).toBeCloseTo(0);
    });

    it("Should return 100% when all rooms are fully booked in a given range", () => {
        const room0 = new Room(rooms[0]);
        room0.bookings = bookings0;
        const room1 = new Room(rooms[1]);
        room1.bookings = bookings1;
        const room2 = new Room(rooms[2]);
        room2.bookings = bookings2;
        const roomsArray = [room0, room1, room2];
        expect(
            Room.totalOccupancyPercentage(
                roomsArray,
                "18/03/2023",
                "21/03/2023"
            )
        ).toBeCloseTo(100);
    });

    it("totalOccupancyPercentage returns the correct % for various booking dates ", () => {
        const room0 = new Room(rooms[0]);
        room0.bookings = bookings0;
        const room1 = new Room(rooms[1]);
        room1.bookings = bookings1;
        const room2 = new Room(rooms[2]);
        room2.bookings = bookings2;
        const roomsArray = [room0, room1, room2];
        expect(
            Room.totalOccupancyPercentage(
                roomsArray,
                "03/02/2023",
                "10/03/2023"
            )
        ).toBeCloseTo(37.96);
        expect(
            Room.totalOccupancyPercentage(
                roomsArray,
                "09/03/2023",
                "21/03/2023"
            )
        ).toBeCloseTo(76.92);
        expect(
            Room.totalOccupancyPercentage(
                roomsArray,
                "14/03/2023",
                "22/03/2023"
            )
        ).toBeCloseTo(74.07);
    });
});

describe("Available Rooms", () => {
    it("Returns empty array when no rooms are available", () => {
        const room0 = new Room(rooms[0]);
        room0.bookings = bookings0;
        const room1 = new Room(rooms[1]);
        room1.bookings = bookings1;
        const room2 = new Room(rooms[2]);
        room2.bookings = bookings2;
        const roomsArray = [room0, room1, room2];
        expect(
            Room.availableRooms(roomsArray, "18/03/2023", "21/03/2023")
        ).toEqual([]);
    });
    it("Returns available rooms array in given range", () => {
        const room0 = new Room(rooms[0]);
        room0.bookings = bookings0;
        const room1 = new Room(rooms[1]);
        room1.bookings = bookings1;
        const room2 = new Room(rooms[2]);
        room2.bookings = bookings2;
        const roomsArray = [room0, room1, room2];
        expect(
            Room.availableRooms(roomsArray, "06/04/2023", "11/4/2023")
        ).toEqual([roomsArray[0], roomsArray[1], roomsArray[2]]);
        expect(
            Room.availableRooms(roomsArray, "15/02/2023", "17/02/2023")
        ).toEqual([roomsArray[0], roomsArray[2]]);
    });
});

describe("Booking getFee() should return the discounted room.rate", () => {
    it("when there is no discount, returns the original room.rate", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        room.bookings[0].discount = 0;
        expect(room.bookings[0].getFee()).toBeCloseTo(1500);
    });
    it("when there is a room discount only", () => {
        const room = new Room(rooms[1]);
        room.bookings = bookings1;
        room.bookings[0].discount = 0;
        expect(room.bookings[0].getFee()).toBeCloseTo(1080);
    });
    it("when there is a booking discount only", () => {
        const room = new Room(rooms[0]);
        room.bookings = bookings0;
        room.bookings[0].discount = 10;
        expect(room.bookings[0].getFee()).toBeCloseTo(1350);
    });
    it("when there is a Room && Booking discounts", () => {
        const room = new Room(rooms[2]);
        room.bookings = bookings2;
        room.bookings[0].discount = 20;
        expect(room.bookings[0].getFee()).toBeCloseTo(1170);
    });
    it("when discounts exceed 100% return 0.00€ fee", () => {
        const room = new Room(rooms[2]);
        room.bookings = bookings2;
        room.bookings[0].discount = 100;
        expect(room.bookings[0].getFee()).toBeCloseTo(0);
    });
});
