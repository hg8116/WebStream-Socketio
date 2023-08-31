const express = require("express")
const http = require("http")
// const socketIo = require("socket.io")
const cors = require("cors")

const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
})

const PORT = process.env.PORT || 5000

// Define your CORS configuration
const corsOptions = {
  origin: "*", // Replace with the appropriate origin(s) as needed
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
}

// Apply the CORS middleware
app.use(cors(corsOptions))

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.on("capture-frame", (frameData) => {
    // Emit the frame data to all clients
    io.emit("stream-frame", frameData)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
