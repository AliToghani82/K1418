const admin = require('firebase-admin');
const fs = require('fs');

// Initialize your Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create a Firestore instance
const db = admin.firestore();

// Path to your JSON file
const jsonFilePath = './AllTimeMain.json';

// Read the JSON file
const jsonData = fs.readFileSync(jsonFilePath, 'utf8');

// Parse the JSON data
const data = JSON.parse(jsonData);

// Function to import JSON data to Firestore
async function importDataToFirestore() {
  try {
    for (const document of data) {
      const {Id} = document;
      // Add each document to a collection
      console.log(Id)
      await db.collection('AllTime').doc(String(Id)).set(document);
    }

    console.log('Data import complete!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Run the data import function
importDataToFirestore();