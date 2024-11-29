const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    sessions: {
        type: Map,
        of: {
            date: String,
            questions_and_answers: [{
                question: String,
                answer: String
            }]
        },
        default: {}
    },
    current_section: {
        type: Number,
        default: 1
    }
});

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = ChatHistory;










// // Assuming the fetched response from the server is stored in 'data'
// const chatHistory = data.chat_history.sessions; // Extract sessions from the API response

// // Initialize an empty array to store the formatted chat data
// let chatArray = [];

// // Loop through each session
// Object.values(chatHistory).forEach(session => {
//     session.questions_and_answers.forEach(qa => {
//         // For each question and answer, push objects to the array
//         chatArray.push({ text: qa.question, sender: 'bot' });
//         chatArray.push({ text: qa.answer, sender: 'user' });
//     });
// });

// // Now 'chatArray' contains all the chat history formatted as required
// console.log(chatArray);
