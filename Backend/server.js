const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully!"
  });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 