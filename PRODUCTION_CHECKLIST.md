# Production Deployment Checklist

Complete this checklist before deploying your MoneyMap application to production.

## Pre-Deployment Setup

### Environment Configuration
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Strong JWT_SECRET generated (not the development one)
- [ ] Backend `.env` file configured with production values
- [ ] Frontend `VITE_API_URL` set to production backend URL
- [ ] All sensitive keys removed from source code

### Code Quality
- [ ] No `console.log()` statements in production code (Vite removes in build)
- [ ] Error handling implemented for all API calls
- [ ] Input validation working on both client and server
- [ ] No hardcoded API URLs in code

### Frontend Optimization
- [ ] `npm run build` completes without warnings
- [ ] Build output in `client/dist` verified
- [ ] Bundle size reasonable (check with `npm run build`)
- [ ] Sourcemaps disabled in production build
- [ ] CSS and JS minified

### Backend Optimization
- [ ] Helmet security middleware enabled
- [ ] Compression middleware enabled
- [ ] CORS configured for production domain only
- [ ] Rate limiting considered (optional but recommended)
- [ ] All dependencies up to date
- [ ] No dev dependencies in production

### Database
- [ ] MongoDB connection string verified
- [ ] Database name correct (e.g., `moneymap` or `expense_tracker`)
- [ ] MongoDB Atlas IP whitelist updated to allow Render servers
- [ ] Backup strategy in place

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] No authentication credentials in git history
- [ ] HTTPS enforced (Vercel and Render provide this)
- [ ] CORS origin restricted to frontend URL
- [ ] Environment variables not logged

## Deployment Steps

### 1. Backend Deployment (Render)

**Setup:**
- [ ] Create Render account (render.com)
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Set start command to `npm start`

**Environment Variables:**
```
NODE_ENV=production
PORT=5000
MONGO_URI=[Your MongoDB connection string]
JWT_SECRET=[Your strong secret]
CLIENT_URL=[Your Vercel frontend URL - add after frontend deployment]
```

**Post-Deploy:**
- [ ] Test `/api/health` endpoint
- [ ] Check Render logs for errors
- [ ] Note your backend URL (e.g., https://moneymap-api.onrender.com)

### 2. Frontend Deployment (Vercel)

**Setup:**
- [ ] Create Vercel account (vercel.com)
- [ ] Import GitHub repository
- [ ] Set root directory to `client`
- [ ] Framework preset: `Vite`

**Environment Variables:**
```
VITE_API_URL=[Your Render backend URL]/api
```
Example: `https://moneymap-api.onrender.com/api`

**Post-Deploy:**
- [ ] Frontend builds successfully
- [ ] Note your frontend URL (e.g., https://moneymap.vercel.app)

### 3. Connect Frontend & Backend

- [ ] Update Render backend `CLIENT_URL` to your Vercel URL
- [ ] Render service automatically redeploys

## Post-Deployment Testing

### Functionality Tests
- [ ] Can navigate to login page
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens are issued and stored
- [ ] Can add new expenses
- [ ] Can view expenses list
- [ ] Can filter expenses
- [ ] Can delete expenses
- [ ] Charts render correctly
- [ ] Dark mode toggle works
- [ ] Logout works and clears auth

### API Tests
- [ ] `/api/health` returns 200
- [ ] `/api/auth/register` works
- [ ] `/api/auth/login` works
- [ ] `/api/expenses` returns 200 with valid token
- [ ] `/api/expenses` returns 401 without token

### Browser Tests
- [ ] No console errors
- [ ] No CORS errors
- [ ] Network requests show correct backend URL
- [ ] Responsive design works on mobile
- [ ] All images load correctly

### Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] API responses within 500ms
- [ ] No network timeouts

## Monitoring & Maintenance

### Daily
- [ ] Check Render logs for errors
- [ ] Check Vercel deployment status

### Weekly
- [ ] Monitor API error rates
- [ ] Check database storage usage
- [ ] Review user reports

### Monthly
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Backup MongoDB data
- [ ] Check cost estimates

## Troubleshooting

### "Cannot connect to backend"
1. Check `VITE_API_URL` in Vercel environment
2. Verify Render backend is running (`/api/health`)
3. Check browser CORS error details

### "MongoDB connection failed"
1. Verify connection string in `.env`
2. Check MongoDB Atlas IP whitelist
3. Ensure database name is correct

### "Authorization errors"
1. Check `JWT_SECRET` matches on both frontend and backend
2. Verify token is being sent with requests
3. Check token expiration logic

### "Build failed on Vercel"
1. Check build logs for specific errors
2. Verify `client` is set as root directory
3. Ensure all dependencies are installed

### "Slow API responses"
1. Check Render logs for performance issues
2. Optimize MongoDB queries
3. Consider upgrading Render plan

## Rollback Plan

If issues occur:
1. Keep previous git commits accessible
2. Render: Use "Rollback" feature in dashboard
3. Vercel: Revert to previous deployment
4. Update environment variables as needed

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Last Updated:** April 2026
**Status:** ✅ Ready for Production
