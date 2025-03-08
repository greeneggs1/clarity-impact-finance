// Simple script to test if environment variables are being loaded correctly
require('dotenv').config();

console.log('Environment Variables Test:');
console.log('---------------------------');
console.log('REACT_APP_OPENAI_API_KEY exists:', Boolean(process.env.REACT_APP_OPENAI_API_KEY));
console.log('REACT_APP_OPENAI_API_KEY length:', process.env.REACT_APP_OPENAI_API_KEY ? process.env.REACT_APP_OPENAI_API_KEY.length : 0);
console.log('REACT_APP_ENABLE_LLM:', process.env.REACT_APP_ENABLE_LLM);
console.log('---------------------------');
console.log('Note: In React, environment variables must be prefixed with REACT_APP_');
console.log('Note: You need to restart your React app after changing environment variables'); 