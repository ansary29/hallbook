import express, { request, response } from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT||5000;


//Local variable to store rooms data
const rooms = [
  {
    roomID: 0,
    roomName: "786",
    noOfSeatsAvailable: "1",
    amenities: [" shower", "WIFI", "pushion bed","ott movies available"],
    pricePerHr: 400,
    bookedStatus: true,
    customerDetails: {
      customerName: "ansary",
      date: "05-1-2022",
      startTime: "10:00pm",
      endTime: "10:00am",
    },
  },
  {
    roomID: 1,
    roomName: "787",
    noOfSeatsAvailable: "2",
    amenities: ["WIFI", "Entertainment", "Room service"],
    pricePerHr: 100,
    bookedStatus: true,
    customerDetails: {
      customerName: "Gowtham",
      date: "06-1-2022",
      startTime: "11:00pm",
      endTime: "11:00am",
    },
  },
  {
    roomID: 2,
    roomName: "788",
    noOfSeatsAvailable: "3",
    amenities: ["Hot shower", "WIFI", "Entertainment", "Room service"],
    pricePerHr: 100,
    bookedStatus: true,
    customerDetails: {
      customerName: "Akshay",
      date: "07-1-2022",
      startTime: "12:00 pm",
      endTime: "12:00 am",
    },
  },
  {
    roomID: 3,
    roomName: "789",
    noOfSeatsAvailable: "1",
    amenities: ["cold shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 1000,
    bookedStatus: false,
    customerDetails: {
      customerName: "medona",
      date: "08/01/2022",
      startTime: "1:00 pm",
      endTime: "1: 00 pm",
    },
  },
  {
    roomID: 4,
    roomName: "790",
    noOfSeatsAvailable: "1",
    amenities: [ "WIFI", "Intercom", "Room service"],
    pricePerHr: 1000,
    bookedStatus: true,
    customerDetails: {
      customerName: "fazil",
      date: "09-1-2022",
      startTime: "02:00 pm",
      endTime: "02:00 pm",
    },
  },
];

//Home page route
app.get("/", (request, response) => {
  response.send("Hall Booking API");
});

// Booking a room
app.post("/rooms", (request, response) => {
  const booking = request.body;

    rooms.map((room) => {
        if (room.roomID == booking.roomID) {
          console.log(room);
            if (room.customerDetails.date != booking.date) {
                room.customerDetails.customerName = booking.customerName;
                room.customerDetails.date = booking.date;
                room.customerDetails.startTime = booking.startTime;
                room.customerDetails.endTime = booking.endTime;
                room.bookedStatus = !room.bookedStatus;
                response.send("Room booked successfully")
            } else {
                response.send("Room already booked for that date. Please choose another room")
            }
        }
        return room;
    })

})

//List all rooms with booked data
app.get("/rooms", (request, response) => {
  response.send(
    rooms.map((room) => {
      if (room.bookedStatus == true) {
        return {
          "Room name": room.roomName,
          "Booked Status": "Booked",
          "Customer Name": room.customerDetails.customerName,
          "Date": room.customerDetails.date,
          "Start Time": room.customerDetails.startTime,
          "End Time": room.customerDetails.endTime,
        };
      } else {
        return { "Room name": room.roomName, "Booked Status": "Vacant" };
      }
    })
  );
});

//List all customers with booked data
app.get("/customers", (request, response) => {
  response.send(rooms.filter((room) => {
              if (room.bookedStatus === true) {
               return room;
        }
      })
      .map((room) => {
        return {
          "Customer name": room.customerDetails.customerName,
          "Room name": room.roomName,
          Date: room.customerDetails.date,
          "Start Time": room.customerDetails.startTime,
          "End Time": room.customerDetails.endTime,
        };
      })
  );
});

app.listen(PORT, () =>
           console.log("server has started at:", PORT));
