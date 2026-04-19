#!/bin/bash

# Render Deployment Test Script
# Run this locally to verify your setup before deploying

echo "🔍 MoneyMap - Render Deployment Test"
echo "======================================"
echo ""

# Check if we're in the server directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: Run this script from the server directory"
    echo "   cd server && bash ../test-render.sh"
    exit 1
fi

echo "✅ Step 1: Checking Node.js version..."
node --version
echo ""

echo "✅ Step 2: Checking package.json..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi
echo "✅ package.json found"
echo ""

echo "✅ Step 3: Checking start script..."
START_SCRIPT=$(node -p "require('./package.json').scripts.start")
if [ "$START_SCRIPT" != "node server.js" ]; then
    echo "❌ Error: start script should be 'node server.js'"
    echo "   Current: $START_SCRIPT"
    exit 1
fi
echo "✅ Start script is correct: $START_SCRIPT"
echo ""

echo "✅ Step 4: Checking dependencies..."
echo "Installing production dependencies..."
npm ci --only=production
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install production dependencies"
    exit 1
fi
echo "✅ Production dependencies installed"
echo ""

echo "✅ Step 5: Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "   Make sure to set environment variables in Render dashboard:"
    echo "   - NODE_ENV=production"
    echo "   - PORT=5000"
    echo "   - MONGO_URI=<your MongoDB URI>"
    echo "   - JWT_SECRET=<strong secret>"
    echo "   - CLIENT_URL=<your Vercel URL>"
else
    echo "✅ .env file found"
fi
echo ""

echo "✅ Step 6: Testing server startup (without database)..."
echo "Setting test environment variables..."
export NODE_ENV=test
export PORT=5001
export MONGO_URI=mongodb://127.0.0.1:27017/test
export JWT_SECRET=test_secret
export CLIENT_URL=http://localhost:5173

echo "Starting server for 5 seconds..."
timeout 5s npm start &
SERVER_PID=$!
sleep 3

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server started successfully"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
    echo "   Check the error messages above"
    exit 1
fi
echo ""

echo "🎉 All tests passed!"
echo ""
echo "Next steps for Render deployment:"
echo "1. Push your code to GitHub"
echo "2. Create Render Web Service:"
echo "   - Repository: SAZID-NIROB/moneymap"
echo "   - Root Directory: server"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "3. Add environment variables in Render dashboard"
echo "4. Deploy!"
echo ""
echo "📚 See DEPLOYMENT_GUIDE.md for detailed instructions"