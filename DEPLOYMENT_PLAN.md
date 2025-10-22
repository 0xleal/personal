# 0xleal Landing Page - Deployment Plan

Complete guide to set up a minimal landing page with Vite, deploy to Hetzner, and configure Cloudflare DNS.

## 1. Bootstrap Vite Project

```bash
# Create new Vite project
npm create vite@latest 0xleal-landing -- --template vanilla

# Or with TypeScript
npm create vite@latest 0xleal-landing -- --template vanilla-ts

cd 0xleal-landing
npm install
```

**Configure `vite.config.js` for production:**
- Set base path if needed
- Configure build output directory
- Enable compression

## 2. Hetzner VPS Setup

**Server Requirements:**
- Smallest VPS tier (CX11 or similar) - ~€4/month
- Ubuntu 22.04 LTS recommended
- Choose datacenter closest to your target audience

**Initial Server Setup:**
```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Create non-root user
adduser deploy
usermod -aG sudo deploy

# Set up SSH keys for secure access
```

## 3. Install & Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Configure firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

# Create site configuration
sudo nano /etc/nginx/sites-available/0xleal
```

**Nginx config structure:**
- Point to `/var/www/0xleal` or similar
- Configure server blocks for HTTP (will redirect to HTTPS)
- Set up proper caching headers for static assets

## 4. SSL/TLS with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (after DNS is configured)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 5. Deployment Strategy

**Option A - Manual (simplest to start):**
```bash
# Local: Build project
npm run build

# Upload to server
scp -r dist/* deploy@your-server-ip:/var/www/0xleal/
```

**Option B - GitHub Actions (automated):**
- Set up SSH keys as GitHub secrets
- Create workflow to build and deploy on push to main
- Use rsync for efficient transfers

## 6. Cloudflare DNS Configuration

**In Cloudflare Dashboard:**
1. Add A record: `@` → `your-hetzner-ip`
2. Add A record: `www` → `your-hetzner-ip` (if desired)
3. Ensure proxy status (orange cloud) is enabled
4. SSL/TLS mode: **Full (strict)** recommended

**Additional Cloudflare Settings:**
- Enable HTTP/3
- Configure caching rules for static assets
- Consider Page Rules for `www` redirect if needed

## 7. Cloudflare + Let's Encrypt Consideration

Since you're using Cloudflare proxy:
- **Option A:** Use Cloudflare SSL (simpler) - set to "Full" mode
- **Option B:** Use Let's Encrypt on server (more control) - set to "Full (strict)" mode

Option B is recommended for better security and full E2E encryption.

## Post-Deployment Checklist

- [ ] Test HTTPS redirect works
- [ ] Verify DNS propagation
- [ ] Check page load speed
- [ ] Test from different locations
- [ ] Set up monitoring (optional: UptimeRobot)

---

**Estimated Time:** 1-2 hours for full setup
**Monthly Cost:** ~€4-5 (Hetzner VPS only)

## Design Notes

The landing page will be:
- Clean, dark-mode first, centered vertically
- Single column layout
- Monospace or geometric sans font
- Small accent color (cyan or blue)
- No animations, no gradients, no images
- Terminal-meets-portfolio aesthetic: fast, quiet, and personal

**Content:**
- Short intro: "Hey, I'm 0xleal — currently building Talent Protocol."
- Note: "This domain also hosts my personal self-hosted software."
- Simple text links to Twitter, GitHub, and Farcaster
