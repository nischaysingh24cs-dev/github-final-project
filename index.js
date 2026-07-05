// Task 8 Requirement: Import the natural npm package
const natural = require('natural');

// Initialize a standard tokenizer from the natural package
const tokenizer = new natural.WordTokenizer();

// Sample string to test natural language processing features
const testText = "The DevOps capstone project enables hands-on CI/CD pipeline automation.";

// Tokenize the text into an array of words
const tokens = tokenizer.tokenize(testText);

console.log("=========================================");
console.log("NATURAL NLP PACKAGE INITIALIZED SUCCESSFULLY");
console.log("=========================================");
console.log("Original Text:", testText);
console.log("Tokenized Output:", tokens);

// Exporting natural for utilization across other modules if required
module.exports = { natural, tokens };
