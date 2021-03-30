const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const shortid = require("shortid");
const nodemailer = require("nodemailer");

exports.userRegister = (req, res) => {

  const { name, email, password, phone } = req.body;
  User.findOne({ phone }).exec(async (error, user) => {
		if (error) {
			return res.status(400).json({
				error,
			});
		}
		if (user) {
			res.status(400).json({
				message: "User Already Registered",
			});
		}
		if (!user) {
			const hash = await bcrypt.hash(password, 9);

			const _user = new User({
				name,
				email,
				userName: shortid.generate(),
				phone,
				password: hash,
			});

			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASS,
				},
			});
			console.log(process.env.EMAIL);
			let mailOptions = {
				from: process.env.EMAIL,
				to: email,
				subject: "New account Registration",
				text: "Successfully registered your account.......",
			};
			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					console.log(err);
					return res.status(400).json({ err });
				} else {
					// const token = jwt.sign(
					// 	{ _id: user._id, role: user.role },
					// 	process.env.JWT_SECRET,
					// 	{
					// 		expiresIn: "7 day",
					// 	}
					// );
					_user.save((error, data) => {
						if (error) {
							return res.status(400).json({
								error,
							});
						}

						return res.status(201).json({
							user: data,
						});
					});
				}
			});
		}
	});
};

//Login Config
exports.userLogin = async (req, res) => {
  const { phone, password } = req.body;

  console.log(req.body);
  try{  User.findOne({ phone })
		.then(async (user) => {
			console.log(user);

			if (!user) {
				console.log("User not found");
				return res.status(400).json({
					message: "User not found",
				});
			}

			if (user) {
				const { role } = user;
				if (role == "admin") {
					return res.status(400).json({
						message: "Only user Can login",
					});
				}

				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					return res.status(400).json({
						message: "Password doesn't match",
					});
				}

				if (match) {
					const token = jwt.sign(
						{ _id: user._id, role: user.role },
						process.env.JWT_SECRET,
						{
							expiresIn: "7 day",
						}
					);
					const { _id, name, email, role, balance } = user;

					return res.status(200).json({
						token,
						message: "Login successfull",
						user: { _id, name, email, role, balance },
					});
				}
			}
		})
		.catch((error) => {
			console.log(error);
		});

  }catch(error){
	  console.log(error)

  }

};



