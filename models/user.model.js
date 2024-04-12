const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a User name"],
    },

    email : {
      type: String,
      required: [true, "Please enter a email id"],
    },

    password: {
      type: String,
      required: true,
      default: 0,
    },

    notes_list : {
      type : Array,
      required : false,
      default:[],
    }

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;