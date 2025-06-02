#!/bin/bash

echo "🏗️ Setting up City Infrastructure App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Expo CLI if not already installed
echo "🔧 Installing Expo CLI..."
npm install -g @expo/cli

# Create assets directory and placeholder images
echo "🎨 Creating assets..."
mkdir -p assets

# Start the development server
echo "🚀 Starting development server..."
echo "📱 Install Expo Go on your phone and scan the QR code to preview the app!"
echo "🌐 Or press 'w' to open in web browser (limited functionality)"
echo "📱 Press 'a' for Android emulator or 'i' for iOS simulator"

npm start
