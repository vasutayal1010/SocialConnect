import { Conversation } from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Message } from "../models/message.model.js";

// for chatting
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    // establish the conversation if not started yet.
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // implement socket io for real time data transfer
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation)
      return res.status(200).json({ success: true, messages: [] });

    return res
      .status(200)
      .json({ success: true, messages: conversation?.messages });
  } catch (error) {
    console.log(error);
  }
};
  
export const sendMessagee = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const textMessage = req.body.textMessage; // ✅ fixed here

    let imageUrl = "";

    if (req.file) {
      const bufferStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload failed:", error);
            return res
              .status(500)
              .json({ success: false, message: "Image upload failed" });
          }

          imageUrl = result.secure_url;

          // Now save the message
          const newMessage = await Message.create({
            senderId,
            receiverId,
            message: textMessage,
            image: imageUrl,
          });

          const receiverSocketId = getReceiverSocketId(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
          }

          res.status(201).json({ success: true, newMessage });
        }
      );

      bufferStream.end(req.file.buffer);
    } else {
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message: textMessage,
      });

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json({ success: true, newMessage });
    }
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ success: false, message: "Message send failed" });
  }
};

