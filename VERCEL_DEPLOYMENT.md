# Vercel Deployment Instructions

This document provides instructions for deploying the Clarity Impact Finance website to the correct Vercel project.

## Current Setup

- **Domain**: `clarityimpactfinance.com` is linked to the Vercel project `clarity-impact-finance2`
- **GitHub Repository**: https://github.com/greeneggs1/clarity-impact-finance

## Deployment Steps

1. **Access the Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com) and log in
   - Navigate to the `clarity-impact-finance2` project

2. **Connect GitHub Repository**:
   - In the project settings, ensure that the GitHub repository `greeneggs1/clarity-impact-finance` is connected to this project
   - If not, go to "Git Integration" and connect the repository

3. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Environment Variables**:
   - Make sure the following environment variables are set:
     - `REACT_APP_VERCEL`: `true`
     - `CI`: `false`

5. **Trigger a Deployment**:
   - You can trigger a deployment by:
     - Making a commit to the `main` branch
     - Using the "Deploy" button in the Vercel dashboard
     - Running `vercel --prod` from the command line (if you haven't reached the deployment limit)

## Troubleshooting

- If you encounter the "Resource is limited" error (more than 100 deployments per day), wait until the next day to deploy
- If the GitHub integration is not working, you can manually upload the `build` directory to Vercel

## Checking Deployment Status

- Visit `clarityimpactfinance.com` to see the live site
- Check the deployment logs in the Vercel dashboard for any errors

## Note

The latest changes include:
- Updated favicon and app icons
- Reduced resources from 19 to 4 in the Resources section
- Increased width of the contact form
- Various styling improvements

Make sure these changes are reflected in the deployed version. 