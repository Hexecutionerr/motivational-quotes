require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Quote = require('../models/Quote');

const connectDB = require('../config/db');

const categories = [
  {
    name: 'Love',
    slug: 'love',
    displayName: 'Love',
    displayNameHindi: 'प्यार',
    icon: '❤️',
    color: '#FF6B8A',
    description: 'Romantic and affectionate quotes',
    order: 1
  },
  {
    name: 'Motivation',
    slug: 'motivation',
    displayName: 'Motivation',
    displayNameHindi: 'प्रेरणा',
    icon: '🔥',
    color: '#FF9F43',
    description: 'Inspiring quotes to keep you going',
    order: 2
  },
  {
    name: 'Sad',
    slug: 'sad',
    displayName: 'Sad',
    displayNameHindi: 'उदास',
    icon: '😢',
    color: '#7B8CDE',
    description: 'Quotes for tough times',
    order: 3
  },
  {
    name: 'Gym',
    slug: 'gym',
    displayName: 'Fitness',
    displayNameHindi: 'फिटनेस',
    icon: '💪',
    color: '#5F27CD',
    description: 'Workout and fitness motivation',
    order: 4
  },
  {
    name: 'Attitude',
    slug: 'attitude',
    displayName: 'Attitude',
    displayNameHindi: 'रवैया',
    icon: '😎',
    color: '#FF6348',
    description: 'Savage and cool quotes',
    order: 5
  },
  {
    name: 'Study',
    slug: 'study',
    displayName: 'Study',
    displayNameHindi: 'अध्ययन',
    icon: '📚',
    color: '#54A0FF',
    description: 'Student and academic motivation',
    order: 6
  }
];

const quotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    textHindi: "पेड़ लगाने का सबसे अच्छा समय 20 साल पहले था। दूसरा सबसे अच्छा समय अब है।",
    author: "Chinese Proverb",
    category: "motivation",
    platforms: ["general", "instagram", "facebook", "pinterest"],
    language: "both",
    likes: 120,
    isPublic: true,
    tags: ["growth", "action", "time"]
  },
  {
    text: "I didn't come this far to only come this far.",
    author: "Unknown",
    category: "motivation",
    platforms: ["instagram", "pinterest"],
    language: "en",
    likes: 345,
    isPublic: true,
    tags: ["hustle", "grind", "success"]
  },
  {
    text: "We go together like coffee and mornings.",
    textHindi: "हम एक साथ ऐसे लगते हैं जैसे कॉफ़ी और सुबह।",
    author: "Unknown",
    category: "love",
    platforms: ["instagram", "facebook"],
    language: "both",
    likes: 567,
    isPublic: true,
    tags: ["couple", "cute", "morning"]
  },
  {
    text: "Sore today, strong tomorrow.",
    author: "Unknown",
    category: "gym",
    platforms: ["instagram", "facebook"],
    language: "en",
    likes: 89,
    isPublic: true,
    tags: ["workout", "fitness", "gains"]
  },
  {
    text: "Prove them wrong.",
    author: "Unknown",
    category: "attitude",
    platforms: ["instagram", "pinterest"],
    language: "en",
    likes: 210,
    isPublic: true,
    tags: ["savage", "success", "hater"]
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Quote.deleteMany();

    console.log('Data cleared...');

    await Category.insertMany(categories);
    console.log('Categories imported...');

    await Quote.insertMany(quotes);
    console.log('Quotes imported...');

    console.log('✅ Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(`❌ Error importing data: ${err.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Quote.deleteMany();

    console.log('❌ Data destroyed successfully');
    process.exit();
  } catch (err) {
    console.error(`❌ Error destroying data: ${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
