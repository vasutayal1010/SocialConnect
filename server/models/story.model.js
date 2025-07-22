import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 20 }, // auto-deletes in 24 hrs
});

export const Story = mongoose.model("Story", storySchema);


/*
STEPS To Change TTL time of story :
 1. db.stories.dropIndex({ createdAt: 1 })
 2. db.stories.createIndex({ createdAt: 1 }, { expireAfterSeconds: 20(or how much time you allow your story to exist) })
 3. db.stories.getIndexes()

*/