const express = require("express");
const router = express.Router();
const ChatHistory = require("../models/chatHistory");
const dotenv = require("dotenv");
dotenv.config();
const Router = require("express");
const chatRoute = Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const ObjectId = mongoose.Types.ObjectId;

// Create or update chat history

// chatRoute.post('/history', async (req, res) => {
//     const { user_id, question, answer } = req.body;

//     // Get the current date in 'YYYY-MM-DD' format
//     const today = new Date().toISOString().split('T')[0];

//     try {
//         // Find or create the chat history document for the user
//         let chatHistory = await ChatHistory.findOne({ user_id });

//         if (!chatHistory) {
//             // If no history exists, create a new one with the first section
//             chatHistory = new ChatHistory({
//                 user_id,
//                 sessions: new Map([ // Initialize as a Map
//                     ['section_1', {
//                         date: today,
//                         questions_and_answers: [{ question, answer }],
//                     }],
//                 ]),
//                 current_section: 1, // Track the current section number
//             });
//         } else {
//             // Get the latest section
//             const latestSectionKey = `section_${chatHistory.current_section}`;
//             const latestSection = chatHistory.sessions.get(latestSectionKey); // Use .get to access Map

//             // Check if today's date matches the latest section's date
//             if (latestSection && latestSection.date === today) {
//                 // If today's section exists, add the new question and answer
//                 latestSection.questions_and_answers.push({ question, answer });
//             } else {
//                 // If today's section doesn't exist, increment the section counter and create a new section
//                 chatHistory.current_section += 1;
//                 const newSectionKey = `section_${chatHistory.current_section}`;
//                 chatHistory.sessions.set(newSectionKey, { // Use .set to add to Map
//                     date: today,
//                     questions_and_answers: [{ question, answer }],
//                 });
//             }
//         }

//         // Save the updated chat history
//         await chatHistory.save();

//         return res.status(200).send({ message: 'Chat history updated successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Internal server error' });
//     }
// });

chatRoute.post('/history', async (req, res) => {
    const { user_id, question, answer } = req.body;

    // Get the current date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];

    try {
        // Find or create the chat history document for the user
        let chatHistory = await ChatHistory.findOne({ user_id });

        if (!chatHistory) {
            // If no history exists, create a new one with the first section
            chatHistory = new ChatHistory({
                user_id,
                sessions: {
                    'session_1': {
                        date: today,
                        questions_and_answers: [{ question, answer }],
                    }
                },
                current_section: 1, // Track the current section number
            });
        } else {
            // Get the latest section key
            const latestSectionKey = `session_${chatHistory.current_section}`;
            const latestSection = chatHistory.sessions.get(latestSectionKey); // Use .get() for Map

            // Check if today's date matches the latest section's date
            if (latestSection && latestSection.date === today) {
                // If today's section exists, add the new question and answer
                latestSection.questions_and_answers.push({ question, answer });
            } else {
                // If today's section doesn't exist, increment the section counter and create a new section
                chatHistory.current_section += 1; // Increment section counter
                const newSectionKey = `session_${chatHistory.current_section}`;
                chatHistory.sessions.set(newSectionKey, {
                    date: today,
                    questions_and_answers: [{ question, answer }],
                });
            }
        }

        // Save the updated chat history
        await chatHistory.save();

        return res.status(200).send({ message: 'Chat history updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});






// Fetch chat history
chatRoute.get("/history/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the chat history from the database, lean() makes it a plain JS object
        const chatHistory = await ChatHistory.findOne({ user_id: userId }).lean();

        if (!chatHistory) {
            return res.status(404).json({ message: "Chat history not found" });
        }

        // Access sessions directly (assuming it's an object and not a Map)
        const sessionsObject = chatHistory.sessions;

        // Remove _id fields from sessions and questions_and_answers
        for (const sessionKey in sessionsObject) {
            delete sessionsObject[sessionKey]._id; // Remove _id from session
            sessionsObject[sessionKey].questions_and_answers.forEach((qa) => {
                delete qa._id; // Remove _id from each question/answer
            });
        }

        // Structure the response in the desired format
        const response = {
            chat_history: {
                user_id: chatHistory.user_id,
                sessions: sessionsObject,
            },
        };

        // Send the formatted response
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return res.status(500).json({ message: "Error fetching chat history", error });
    }
});




module.exports = chatRoute;
