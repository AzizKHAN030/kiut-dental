# Deployment Guide

This guide covers deploying both the Sanity CMS Studio and the Next.js frontend application.

## Project Overview

- **Sanity Studio**: Content management system (root directory)
- **Next.js Frontend**: Web application (`/web` directory)
- **Sanity Project ID**: `mh9vfjvg`
- **Dataset**: `production`

---

## Part 1: Deploy Sanity Studio

Sanity Studio can be deployed to Sanity's hosting service or any static hosting platform.

### Option A: Deploy to Sanity Hosting (Recommended)

1. **Install Sanity CLI** (if not already installed):
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login to Sanity**:
   ```bash
   sanity login
   ```

3. **Deploy Studio**:
   ```bash
   # From the root directory
   yarn deploy
   ```
   
   Or using npm:
   ```bash
   npm run deploy
   ```

4. **Access your Studio**:
   - After deployment, you'll get a URL like: `https://your-project-name.sanity.studio`
   - This URL is where content editors will manage your content

### Option B: Deploy to Vercel/Netlify

1. **Build the Studio**:
   ```bash
   yarn build
   ```

2. **Deploy the `/dist` folder** to your hosting platform:
   - **Vercel**: Connect your repo and set build command to `yarn build` and output directory to `dist`
   - **Netlify**: Set build command to `yarn build` and publish directory to `dist`

---

## Part 2: Deploy Next.js Frontend

### Option A: Deploy to Vercel (Recommended for Next.js)

Vercel is the recommended platform for Next.js applications as it's built by the Next.js team.

#### Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket repository (or use Vercel CLI)

#### Method 1: Deploy via Vercel Dashboard

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - **Important**: Set the **Root Directory** to `web` (not the project root)

3. **Configure build settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `web`
   - **Build Command**: `cd web && npm run build` (or `yarn build` if using yarn)
   - **Output Directory**: `.next` (default for Next.js)
   - **Install Command**: `cd web && npm install` (or `yarn install`)

4. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard
   - Currently, your Sanity config uses hardcoded project ID, so no env vars are required
   - If you want to use environment variables, add:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `mh9vfjvg`
     - `NEXT_PUBLIC_SANITY_DATASET`: `production`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a URL like: `https://your-project.vercel.app`

#### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the web directory**:
   ```bash
   cd web
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option B: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build configuration** (create `netlify.toml` in the `web` directory):
   ```toml
   [build]
     base = "web"
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy**:
   ```bash
   cd web
   netlify deploy --prod
   ```

### Option C: Deploy to Other Platforms

#### Railway
1. Connect your repository
2. Set root directory to `web`
3. Build command: `npm run build`
4. Start command: `npm start`

#### Render
1. Create a new Web Service
2. Set root directory to `web`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

#### Self-hosted (VPS/Server)

1. **Build the application**:
   ```bash
   cd web
   npm install
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Use a process manager** (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "kiut-dental" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up a reverse proxy** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Part 3: Post-Deployment Configuration

### 1. Update CORS Settings in Sanity

If your frontend is hosted on a different domain, you may need to configure CORS in Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (`mh9vfjvg`)
3. Go to **API** → **CORS origins**
4. Add your frontend domain(s):
   - `https://your-domain.vercel.app`
   - `https://your-domain.com`
   - `http://localhost:3000` (for local development)

### 2. Environment Variables (Optional)

If you want to use environment variables instead of hardcoded values:

1. **Update `sanity.config.ts`**:
   ```typescript
   projectId: process.env.SANITY_PROJECT_ID || 'mh9vfjvg',
   dataset: process.env.SANITY_DATASET || 'production',
   ```

2. **Update `web/lib/sanity.ts`**:
   ```typescript
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mh9vfjvg',
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
   ```

3. **Add to your hosting platform**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `mh9vfjvg`
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`

### 3. Custom Domain Setup

#### Vercel
1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

#### Netlify
1. Go to **Domain settings** in your Netlify dashboard
2. Add custom domain
3. Configure DNS as instructed

### 4. SSL/HTTPS

Most modern hosting platforms (Vercel, Netlify, etc.) automatically provide SSL certificates. For self-hosted solutions, use Let's Encrypt with Certbot.

---

## Part 4: Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: ./web
        run: npm install
      
      - name: Build
        working-directory: ./web
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./web
```

---

## Part 5: Monitoring & Maintenance

### 1. Sanity Studio Updates

When you update your Sanity schema or configuration:
```bash
yarn deploy
```

### 2. Frontend Updates

- **Vercel/Netlify**: Automatically redeploys on git push
- **Manual**: Run deployment commands again

### 3. Health Checks

Set up monitoring for:
- Frontend availability
- Sanity API connectivity
- Build status

---

## Troubleshooting

### Build Failures

1. **Check Node.js version**: Ensure you're using Node.js 18+ (check `package.json` engines if specified)
2. **Clear cache**: Delete `node_modules` and `.next` folders, reinstall
3. **Check build logs**: Review error messages in your hosting platform's dashboard

### Sanity Connection Issues

1. **Verify project ID and dataset**: Check `sanity.config.ts` and `web/lib/sanity.ts`
2. **Check CORS settings**: Ensure your frontend domain is whitelisted
3. **Verify API token**: If using authenticated queries, ensure tokens are set correctly

### Image Loading Issues

1. **Check `next.config.ts`**: Ensure `cdn.sanity.io` is in `remotePatterns`
2. **Verify image URLs**: Check that Sanity images are properly referenced

---

## Quick Reference

### Sanity Studio
```bash
# Deploy Studio
yarn deploy

# Build Studio
yarn build
```

### Next.js Frontend
```bash
# Development
cd web && yarn dev

# Build
cd web && yarn build

# Production
cd web && yarn start
```

### Vercel CLI
```bash
cd web
vercel          # Preview deployment
vercel --prod   # Production deployment
```

---

## Crawler Blocking (Pre-Production)

**⚠️ IMPORTANT**: The site is currently configured to block all web crawlers and prevent indexing. This is intentional for pre-production deployments.

### Current Protection

The following measures are in place to block crawlers:

1. **`robots.txt`** (`/web/public/robots.txt`): Blocks all crawlers
   ```
   User-agent: *
   Disallow: /
   ```

2. **Meta Tags** (`/web/app/layout.tsx`): Prevents indexing via HTML meta tags
   - `noindex, nofollow` for all pages

3. **HTTP Headers** (`/web/next.config.ts`): Adds `X-Robots-Tag` header
   - `noindex, nofollow` for all routes

### Enabling Indexing for Production

When you're ready to go live, you need to:

1. **Update `robots.txt`** (`/web/public/robots.txt`):
   ```txt
   User-agent: *
   Allow: /
   
   Sitemap: https://your-domain.com/sitemap.xml
   ```

2. **Update `layout.tsx`** (`/web/app/layout.tsx`):
   ```typescript
   export const metadata: Metadata = {
     // ... other metadata
     robots: {
       index: true,
       follow: true,
       googleBot: {
         index: true,
         follow: true,
       },
     },
   };
   ```

3. **Update `next.config.ts`** (`/web/next.config.ts`):
   - Remove or comment out the `headers()` function that adds `X-Robots-Tag`

4. **Optional**: Create a `sitemap.xml` for better SEO

After making these changes, redeploy your application.

---

## Recommended Setup

1. **Sanity Studio**: Deploy to Sanity hosting (`yarn deploy`)
2. **Next.js Frontend**: Deploy to Vercel (automatic deployments from Git)
3. **Custom Domain**: Point to Vercel deployment
4. **CORS**: Configure in Sanity dashboard for your domain

This setup provides:
- ✅ Automatic deployments on git push
- ✅ SSL certificates
- ✅ Global CDN
- ✅ Easy rollbacks
- ✅ Preview deployments for pull requests

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Sanity Deployment Guide](https://www.sanity.io/docs/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

