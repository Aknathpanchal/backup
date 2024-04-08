require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bycrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const adminModel = require("./models/user");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const connectionparams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.post("/signup", async (req, res) => {
  try {
    let { name, age, email, password } = req.body;
    if (email == "" || password == "" || name == "" || age == "") {
      return res.status(400).send({
        success: false,
        message: `All fields are required`,
      });
    }

    if (password.length > 14 || password.length < 9) {
      return res.status(400).send({
        success: false,
        message: `password must be with charector between 8 to 15`,
      });
    } else if (/[a-z]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one lower case letter `,
      });
    } else if (/[A-Z]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one upper case letter`,
      });
    } else if (/[0-9]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one numeric charector`,
      });
    }

    const existuser = await adminModel.findOne({ email });
    if (existuser) {
      return res.status(400).send({
        success: false,
        message: `User is already present`,
      });
    }

    const myencpassword = await bycrypt.hash(password, 10);

    const user = await adminModel.create({
      name: name,
      age: age,
      email: email.toLowerCase(),
      password: myencpassword,
      role: "user",
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.end("Some Error Occured");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == "" && password == "") {
      return res.status(400).send({
        success: false,
        message: `please fill all fields`,
      });
    }

    const user = await adminModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: `Please Regiser First`,
      });
    }

    if (email && (await bycrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          uid: user._id,
          email,
          role: user.role,
        },
        process.env.SECRET,
        {
          expiresIn: "2d",
        }
      );

      user.token = token;
      user.password = undefined;
      return res.status(201).json({ token });
    }
    return res.status(400).send({
      success: false,
      message: `Invalid Credentials`,
    });
  } catch (error) {
    console.log(error);
    res.end("error occured");
  }
});


// app.post("/article/bycategory", async (req, res) => {
//   const { category } = req.body;
//   const data = await article.find({ category });
//   return res.status(200).json(data);
// });

app.get("/", (req, res) => {
  res.end("Homepage");
});


app.listen(process.env.PORT || 3000, async(req, res) => {
    try {
    await  mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("conneted to db");
  })
  .catch((err) => {
    console.log(err);
  });

    } catch (error) {
        console.log(error)
    }
  console.log("server started successfully");
});
