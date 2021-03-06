const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");

//Router Import
const userRouter = require("./routes/auth");
const adminRouter = require("./routes/admin/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const rechargeRoute = require("./routes/recharge");
const adminOrderRoute = require("./routes/admin/order.routes");
const adminRechargeRoute = require("./routes/admin/recharges");
const adminTicketRoute=require('./routes/admin/ticket')
const userTicketRoute=require('./routes/ticket')
const couponRoute=require('./routes/coupon')

env.config();

const URI = process.env.MONGO_URI;
mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database is connected");
	});

//Server Config
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "uploads")));

//Routes Config
app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRouter);
app.use("/api", orderRouter);
app.use("/api", adminOrderRoute);
app.use("/api", rechargeRoute);
app.use("/api", adminRechargeRoute);
app.use("/api", adminTicketRoute);
app.use("/api", userTicketRoute);
app.use("/api", couponRoute);
app.get("/", (req, res) => {
	res.json({
		message: "hello",
	});
});

if(process.env.NODE_ENV==='production'){
	
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`App is listening on port:${PORT}`);
});
