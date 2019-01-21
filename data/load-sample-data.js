require("dotenv").config({ path: __dirname + "/../variables.env" });
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const Store = require("../models/Store");
const Review = require("../models/Review");
const User = require("../models/User");

const stores = JSON.parse(fs.readFileSync(__dirname + "/stores.json", "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(__dirname + "/reviews.json", "utf-8")
);
const users = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf-8"));

async function deleteData() {
  console.log("Deleting Data...");
  await Store.remove();
  await Review.remove();
  await User.remove();
  console.log(
    "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
  );
  process.exit();
}

async function loadData() {
  try {
    await Store.insertMany(stores);
    await Review.insertMany(reviews);
    await User.insertMany(users);
    console.log("Loading is Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\nError! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run deletesample\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
