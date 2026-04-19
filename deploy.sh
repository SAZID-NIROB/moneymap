#!/bin/bash

# MoneyMap MERN - Production Deployment Setup Script

echo "🚀 MoneyMap - Production Deployment Setup"
echo "=========================================="
echo ""

echo "✅ Step 1: Checking Git Status..."
git status
echo ""

echo "✅ Step 2: Building Frontend..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
echo "✅ Frontend build successful!"
cd ..
echo ""

echo "✅ Step 3: Verifying Server Configuration..."
if [ ! -f server/.env ]; then
    echo "⚠️  Server .env file not found!"
    echo "Please create server/.env with MongoDB URI and JWT_SECRET"
    exit 1
fi
echo "✅ Server .env found!"
echo ""

echo "✅ Step 4: Dependency Check..."
echo "Server dependencies:"
cd server && npm list --depth=0 && cd ..
echo ""
echo "Client dependencies:"
cd client && npm list --depth=0 && cd ..
echo ""

echo "✅ Step 5: Ready for Deployment!"
echo ""
echo "Next Steps:"
echo "1. Ensure MongoDB Atlas is set up (mongodb.com/cloud/atlas)"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy Backend to Render (render.com)"
echo "4. Deploy Frontend to Vercel (vercel.com)"
echo "5. Add environment variables to both platforms"
echo ""
echo "📚 See DEPLOYMENT_GUIDE.md for detailed instructions"
