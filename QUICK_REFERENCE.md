# Quick Deployment Reference

## Your Deployment URLs (Update after deployment)

```
Frontend (Vercel):  https://moneymap.vercel.app
Backend (Render):   https://moneymap-api.onrender.com
Database (MongoDB): [Your MongoDB Atlas cluster]
```

## Environment Variables

### Backend (Render) - `server/.env`
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/moneymap
JWT_SECRET=your_strong_secret_key
CLIENT_URL=https://moneymap.vercel.app
```

### Frontend (Vercel) - Build Environment
```
VITE_API_URL=https://moneymap-api.onrender.com/api
```

## Quick Setup Commands

```bash
# Install all dependencies
npm run install:all

# Local development (both client and server)
npm run dev

# Build frontend for production
npm run build --workspace client

# Check frontend build
npm run build

# Test frontend preview
npm run preview:client
```

## File Structure

```
moneymap/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   ├── dist/                  # Build output (deployed to Vercel)
│   ├── .env.production        # Production env template
│   ├── package.json
│   └── vercel.json            # Vercel config
│
├── server/                    # Node.js Backend (Express)
│   ├── .env                   # Environment variables (NOT in git)
│   ├── .env.example           # Template (IN git)
│   ├── package.json
│   └── server.js              # Entry point
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD Pipeline
│
├── DEPLOYMENT_GUIDE.md        # Detailed deployment steps
├── PRODUCTION_CHECKLIST.md    # Pre-deployment checklist
├── render.yaml                # Render config template
└── deploy.sh                  # Local deployment helper script
```

## Deployment Workflow

### 1. Local Development
```bash
npm install:all    # Install dependencies
npm run dev        # Start both client and server
```

### 2. Before Deployment
```bash
npm run build:all  # Build frontend and prep server
git add .
git commit -m "Ready for production"
git push origin main
```

### 3. Deploy Backend (Render)
1. Push to GitHub
2. Render auto-deploys from main branch
3. Add environment variables in Render dashboard
4. Note the backend URL

### 4. Deploy Frontend (Vercel)
1. Import from GitHub
2. Set root directory to `client`
3. Add `VITE_API_URL` environment variable
4. Vercel auto-deploys

### 5. Connect Them
Update `CLIENT_URL` on Render to your Vercel URL

## Important Files

| File | Purpose |
|------|---------|
| `server/.env` | Backend configuration (secrets) - **NOT in git** |
| `server/.env.example` | Backend template (IN git) |
| `client/.env.production` | Frontend production template |
| `render.yaml` | Render deployment config |
| `client/vercel.json` | Vercel deployment config |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

## Common Issues & Solutions

### CORS Errors
**Cause:** Frontend URL not in backend's `CLIENT_URL` env var
**Fix:** Update `CLIENT_URL` on Render to match Vercel URL

### API Connection Fails
**Cause:** Wrong `VITE_API_URL` on frontend
**Fix:** Update in Vercel environment variables to backend URL + `/api`

### MongoDB Connection Fails
**Cause:** Invalid connection string or IP whitelist
**Fix:** 
1. Verify connection string format
2. Whitelist Render IP in MongoDB Atlas settings
3. Check database name in connection string

### Build Fails on Vercel
**Cause:** Missing dependencies or wrong root directory
**Fix:**
1. Set root directory to `client`
2. Ensure all deps installed: `npm install`
3. Check build command output in Vercel logs

## Monitoring Commands

```bash
# Check git status
git status

# View recent commits
git log --oneline -5

# Check environment variables on Render
# (Via Render Dashboard: Settings > Environment)

# Test backend health
curl https://moneymap-api.onrender.com/api/health
```

## Useful Links

- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub Repo:** https://github.com/SAZID-NIROB/moneymap
- **GitHub Actions:** Check `.github/workflows/deploy.yml`

## Performance Notes

### Render (Free Tier)
- Service goes to sleep after 15 min inactivity
- First request after sleep takes ~30 seconds
- Upgrade for always-on service

### Vercel
- Very fast CDN deployment
- Automatic scaling
- Great for static React builds

### MongoDB (Free Tier)
- 512MB storage limit
- Good for prototyping
- Upgrade as data grows

## Version Information

```
Node.js: 20.x (Render)
React: 18.3.1
Vite: 6.2.1
Express: 4.21.2
Mongoose: 8.11.0
```

## Next Steps

1. ✅ Read `DEPLOYMENT_GUIDE.md` for detailed instructions
2. ✅ Complete `PRODUCTION_CHECKLIST.md` before deploying
3. ✅ Set up MongoDB Atlas
4. ✅ Create Render account and deploy backend
5. ✅ Create Vercel account and deploy frontend
6. ✅ Connect frontend and backend URLs
7. ✅ Test all functionality in production
8. ✅ Monitor logs and performance

## Support

- Review error logs in Render dashboard
- Check Vercel deployment logs
- Monitor MongoDB connection issues
- Check browser console for frontend errors

---

**Ready to deploy? Start with DEPLOYMENT_GUIDE.md**
