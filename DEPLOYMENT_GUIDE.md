# Deployment Guide - MoneyMap MERN Application

This guide walks you through deploying your full-stack MERN application to production.

## Prerequisites
- GitHub account (already done ✓)
- MongoDB Atlas account (free tier available)
- Render account
- Vercel account

---

## Part 1: Setup MongoDB Atlas

### Steps:
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up with email or Google
3. Create a **Free Cluster** (M0 tier)
4. Click **Connect** and choose **Connect your application**
5. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
6. Replace `<password>` and database name with your credentials

**Save your MongoDB URI** - you'll need it for Render environment variables.

---

## Part 2: Deploy Backend to Render

### Step 1: Create Render Account
1. Visit [render.com](https://render.com)
2. Click **"Sign up"** and choose **"Continue with GitHub"**
3. Authorize Render to access your GitHub account

### Step 2: Create Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Select your `moneymap` repository
4. Click **"Connect"**

### Step 3: Configure Service Settings
Fill in these fields:
- **Name**: `moneymap-api` (or any name)
- **Environment**: Select `Node`
- **Region**: Choose closest to you (e.g., `Oregon` for US)
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Root Directory**: `server`

### Step 4: Add Environment Variables
Scroll down to **Environment** section and add:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moneymap
JWT_SECRET=sazid_secure_key_2026_!@#_random_or_new_one
CLIENT_URL=https://your-app.vercel.app
```

**Important:** Replace:
- `your-app.vercel.app` with your actual Vercel domain (add this after frontend deployment)
- MongoDB URI with your actual connection string

### Step 5: Deploy
1. Scroll down and click **"Create Web Service"**
2. Render will start building automatically
3. Wait for deployment to complete (check the logs)
4. You'll get a URL like: `https://moneymap-api.onrender.com`
5. **Save this URL** - you'll need it for frontend

### Health Check
Visit `https://your-render-url.onrender.com/api/health` to verify it's working.

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** and choose **"Continue with GitHub"**
3. Authorize and complete setup

### Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Select your `moneymap` repository
3. Click **"Import"**

### Step 3: Configure Project Settings
You'll see a configuration screen:
- **Project Name**: `moneymap` (or your choice)
- **Framework Preset**: Select `Vite` (or `Other` if needed)
- **Root Directory**: Set to `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables
In the **Environment Variables** section, add:

```
VITE_API_URL=https://your-render-api.onrender.com/api
```

**Important:** Replace `your-render-api.onrender.com` with your actual Render URL from Part 2.

### Step 5: Deploy
1. Click **"Deploy"**
2. Vercel will build and deploy automatically
3. Wait for deployment to complete
4. You'll get a URL like: `https://moneymap.vercel.app`
5. **Save this URL**

### Verify Deployment
Visit your Vercel URL and test the application functionality.

---

## Part 4: Connect Frontend & Backend

Now that both are deployed, update your backend environment variables:

### On Render:
1. Go to your Web Service in Render
2. Go to **Settings** → **Environment**
3. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```
4. Click **"Save"** (service will redeploy automatically)

---

## Final Verification

1. **Test Login/Register**: Try creating an account
2. **Add Expenses**: Create some expense entries
3. **Check API**: Visit `/api/health` endpoint
4. **Verify CORS**: Check browser console for any CORS errors
5. **Test Dark Mode**: Ensure theme switching works

---

## Troubleshooting

### "Connection refused" errors
- Check MongoDB URI in `.env` on Render
- Ensure MongoDB allows access from anywhere (IP whitelist in Atlas)

### "CORS error" in console
- Verify `CLIENT_URL` environment variable is correct on Render
- Make sure it includes the full URL (e.g., `https://domain.vercel.app`)

### "Cannot POST /api/..."
- Verify backend is running (check Render logs)
- Check API URL in frontend environment variable
- Ensure it includes `/api` at the end

### Build fails on Vercel
- Check build logs for errors
- Ensure `VITE_API_URL` is set in environment variables
- Verify `client` is set as root directory

---

## Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com)
- Render API URL: `https://your-backend.onrender.com`
- Vercel App URL: `https://your-app.vercel.app`

---

## Environment Variables Summary

### Backend (Render):
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-render-backend.onrender.com/api
```

---

**Note:** Your Render service may go to sleep after 15 minutes of inactivity (free tier). The first request will take longer to respond. Upgrade to a paid plan for always-on service.
