# Heroku Deployment Setup Guide for YogiTrack Prototype

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- GitHub account with repository access
- MongoDB Atlas account (for cloud database)

## Step 1: Create a Heroku Account & App

1. Sign up at [Heroku](https://www.heroku.com)
2. Create a new app from your Heroku dashboard or using CLI:
   ```bash
   heroku create your-app-name
   ```

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database user
3. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/`)

## Step 3: Configure Environment Variables

Set environment variables on Heroku using the CLI or dashboard:

```bash
heroku config:set DB_CONNECTION="mongodb+srv://username:password@cluster.mongodb.net/yogitrack"
heroku config:set NODE_ENV="production"
```

Or through the Heroku Dashboard:
1. Go to your app's Settings tab
2. Click "Reveal Config Vars"
3. Add the variables

## Step 4: GitHub Actions Setup

1. Go to your GitHub repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `HEROKU_API_KEY`: Get from Heroku Account Settings → API Key
   - `HEROKU_APP_NAME`: Your Heroku app name (e.g., "your-app-name")
   - `HEROKU_EMAIL`: Your Heroku account email

## Step 5: Deploy

The deployment pipeline is now set up to automatically deploy when you push to the `main` branch.

To manually deploy:
```bash
git push origin main
```

Or using Heroku CLI:
```bash
heroku login
git push heroku main
```

## Step 6: Verify Deployment

```bash
# Check deployment logs
heroku logs --tail

# Visit your app
heroku open
```

## Key Files for Heroku Deployment

- **Procfile**: Tells Heroku how to start the application
- **.github/workflows/deploy.yml**: Automatic deployment pipeline
- **package.json**: Updated with `heroku-postbuild` script for client build
- **.env.example**: Template for environment variables

## Build Process

The deployment follows this process:

1. GitHub Actions triggers on push to `main` branch
2. Installs root and backend dependencies
3. Builds the React client (`npm run build` → `client/dist/`)
4. Deploys to Heroku using the Procfile
5. Express serves the built React app and API routes

## Troubleshooting

### Build fails with "client/dist not found"
- Ensure `npm run build` completes successfully locally
- Check that Vite is configured correctly in `client/vite.config.js`

### MongoDB connection fails
- Verify `DB_CONNECTION` environment variable is set correctly
- Ensure MongoDB Atlas cluster allows connections from Heroku (IP whitelist)
- Check network access settings in MongoDB Atlas

### Application crashes after deployment
```bash
heroku logs --tail
```
Review logs for specific errors.

### Clear Heroku build cache
```bash
heroku builds:cancel
heroku builds:delete
```

## Local Testing Before Deployment

1. Build the client:
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. Test production build locally:
   ```bash
   npm start
   ```

3. Visit `http://localhost:5000`

## Additional Heroku Commands

```bash
# View app info
heroku apps:info

# Check resources
heroku ps

# Scale dynos
heroku ps:scale web=1

# View environment variables
heroku config

# SSH into the dyno
heroku ps:exec

# View application logs
heroku logs --tail

# Restart app
heroku restart
```

## Environment-Specific Notes

- **Development**: Uses local MongoDB and separate frontend/backend servers
- **Production (Heroku)**: Uses MongoDB Atlas and single Express server serving both API and static React app

## Additional Resources

- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [MongoDB Atlas Connection](https://docs.mongodb.com/manual/reference/connection-string/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
