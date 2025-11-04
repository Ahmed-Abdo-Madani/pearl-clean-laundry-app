# Deploying Pearl Clean to Render.com

This guide will help you deploy both the frontend (React app) and backend (JSON Server API) to Render.com for free.

## Prerequisites

- A GitHub account
- A Render.com account (sign up at https://render.com - free tier available)
- Your code pushed to GitHub

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started" and sign up with your GitHub account
3. Authorize Render to access your repositories

## Step 3: Deploy Using Blueprint (Recommended)

This method deploys both services at once using the `render.yaml` file:

### Option A: Deploy via Blueprint

1. Go to your Render dashboard
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository: `pearl-clean-laundry-app`
4. Render will detect the `render.yaml` file
5. Give your blueprint a name: `pearl-clean-app`
6. Click **"Apply"**

Render will automatically:
- Create the backend API service (pearl-clean-api)
- Create the frontend static site (pearl-clean-frontend)
- Link them together with environment variables

### Option B: Manual Deployment (Alternative)

If Blueprint doesn't work, deploy manually:

#### Deploy Backend API First:

1. Click **"New"** → **"Web Service"**
2. Connect your repository
3. Configure:
   - **Name**: `pearl-clean-api`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
4. Click **"Create Web Service"**
5. Wait for deployment to complete (3-5 minutes)
6. **Copy the API URL** (e.g., `https://pearl-clean-api.onrender.com`)

#### Deploy Frontend Next:

1. Click **"New"** → **"Static Site"**
2. Connect your repository again
3. Configure:
   - **Name**: `pearl-clean-frontend`
   - **Region**: Oregon
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: `Free`
4. Add Environment Variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your API URL from step 6 above (e.g., `https://pearl-clean-api.onrender.com`)
5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)

## Step 4: Access Your Deployed App

Once deployment completes, you'll get URLs like:
- **Frontend**: `https://pearl-clean-frontend.onrender.com`
- **Backend API**: `https://pearl-clean-api.onrender.com`

Share the frontend URL with your investor! 🎉

## Step 5: Test Your Deployment

1. Open the frontend URL in your browser
2. Test the language switcher (English/Arabic)
3. Browse services
4. Try creating a booking
5. Test order tracking
6. Test admin login (username: `admin`, password: `pearl123`)

## Important Notes

### Free Tier Limitations:
- **Services sleep after 15 minutes of inactivity**
  - First visit after sleep takes 30-60 seconds to wake up
  - Subsequent visits are instant
  - Perfect for investor demos!

- **Monthly limits**:
  - 750 hours of runtime (more than enough for demos)
  - Services automatically shut down when not in use

### Before Investor Demo:
1. **Wake up the services** 5 minutes before the meeting
   - Open the frontend URL
   - Wait for it to load fully
   - Test all features once
2. Services will stay awake during your demo

### Custom Domain (Optional):
If you want a custom domain like `pearlclean.com`:
1. Purchase a domain from any registrar (Namecheap, GoDaddy, etc.)
2. In Render dashboard → Settings → Custom Domain
3. Add your domain and follow DNS instructions
4. Note: Custom domains require a paid plan ($7/month)

## Troubleshooting

### API Connection Errors:
- Check if `VITE_API_BASE_URL` is set correctly in frontend settings
- Make sure API URL doesn't have a trailing slash
- Verify API service is running (check logs in Render dashboard)

### Build Failures:
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Node version: Render uses Node 18 by default

### Service Won't Start:
- Check the logs in Render dashboard
- Verify `server.js` is in the root directory
- Ensure `start` command is correct: `node server.js`

### CORS Errors:
- The `server.js` file includes CORS headers
- If still having issues, check browser console for specific errors

## Updating Your App

To update your deployed app:

```bash
git add .
git commit -m "Update description"
git push origin main
```

Render will automatically detect the push and redeploy both services!

## Cost Summary

**Current Setup: 100% FREE**
- Backend API: Free tier
- Frontend: Free tier
- Total Monthly Cost: $0

**Optional Upgrades:**
- Custom domain: Requires Starter plan ($7/month per service)
- No sleep (always on): Starter plan ($7/month per service)
- More resources: Professional plan ($25/month per service)

For investor demos, the free tier is perfect!

## Next Steps

1. Test your deployment thoroughly
2. Share the URL with your investor
3. Monitor usage in Render dashboard
4. Consider upgrading if you need always-on services

## Support

- Render Documentation: https://render.com/docs
- Render Status: https://status.render.com
- Render Community: https://community.render.com

---

**Your deployed app is now live and accessible from anywhere! 🚀**

Share this URL with your investor: `https://pearl-clean-frontend.onrender.com`
