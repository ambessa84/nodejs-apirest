const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost/27017";

// Use connect method to connect to the server
mongoose
  .connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: String
});

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true
});

const User = mongoose.model("Users", userSchema);

exports.createUser = userData => {
  const user = new User(userData);
  return user.save();
};

exports.findById = id => {
  return User.findById(id).then(result => {
    const resultJsonify = result.toJSON();
    const { _id, __v, ...rest } = resultJsonify;
    return rest;
  });
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function(err, user) {
      if (err) reject(err);
      const userToUpdate = Object.assign(user, userData);
      userToUpdate.save(function(err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.removeById = userId => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
