# Cloudinary Video Hosting Setup

This guide will help you set up Cloudinary to host your videos for the Clarity Impact Finance website.

## Why Cloudinary?

Vercel has limitations with hosting large media files like videos. Cloudinary is a specialized media hosting service that offers:

- Fast global CDN for video delivery
- Automatic optimization for different devices
- Generous free tier (up to 25GB storage and 25GB bandwidth/month)
- No server setup required

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary's website](https://cloudinary.com/) and sign up for a free account
2. After signing up, you'll be taken to your dashboard
3. Note your **Cloud Name** (shown at the top of the dashboard)

## Step 2: Upload Your Video

### Option 1: Upload via the Dashboard (Easiest)

1. In your Cloudinary dashboard, click on "Media Library" in the top navigation
2. Click the "Upload" button
3. Select or drag your `ribbon-cutting.mp4` file
4. Optional: Create a folder called "clarity-impact" first to keep things organized
5. Wait for the upload to complete
6. Click on the uploaded video to view its details
7. Copy the video URL (it should look something like `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/clarity-impact/ribbon-cutting.mp4`)

### Option 2: Upload via the Cloudinary CLI

If you prefer using the command line:

```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure with your credentials
cloudinary config --cloud_name=YOUR_CLOUD_NAME --api_key=YOUR_API_KEY --api_secret=YOUR_API_SECRET

# Upload the video
cloudinary upload public/videos/ribbon-cutting.mp4 --folder clarity-impact
```

## Step 3: Update the Video URL in Your Code

1. Open `src/components/Hero.js`
2. Find this line:
   ```javascript
   const videoUrl = "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/clarity-impact/ribbon-cutting.mp4";
   ```
3. Replace `YOUR_CLOUD_NAME` with your actual Cloudinary cloud name
4. If your video URL is different, replace the entire URL with the one from your Cloudinary dashboard

## Step 4: Build and Deploy

1. Build your project:
   ```bash
   npm run build
   ```
2. Deploy to Vercel:
   ```bash
   git add .
   git commit -m "Update video to use Cloudinary hosting"
   git push origin main
   ```

## Troubleshooting

- If the video doesn't play, check the browser console for errors
- Verify that the Cloudinary URL is correct and the video is publicly accessible
- The code includes a fallback to the local video file if the Cloudinary video fails to load

## Additional Cloudinary Features

- **Video Transformations**: You can add parameters to the URL to resize, crop, or apply effects
- **Adaptive Streaming**: Set up HLS or DASH streaming for better performance
- **Analytics**: Monitor video views and bandwidth usage in your dashboard

For more information, visit the [Cloudinary documentation](https://cloudinary.com/documentation). 