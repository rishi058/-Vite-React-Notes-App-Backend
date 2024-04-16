import mongoose from "mongoose";

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

export const Note = mongoose.model("Note", NoteSchema);