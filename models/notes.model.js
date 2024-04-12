const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title : {
      type: String,
      required: false,
    },

    content : {
      type: String,
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;