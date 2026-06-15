# capsuleautomaat — headless WooCommerce webshop

Projectdirectory: `/var/www/capsuleautomaat`
Live URL: `https://funnelvisionstrategies.com/richard`
GitHub: `github.com/serdartufan/capsuleautomaat` (branch `main`)

B2B groothandel-webshop voor capsuleautomaat.nl (onderdeel Team Priceking.nl). Zie `PROJECTINFO.md` voor design, content en openstaande features.

---

## Stack

| Laag | Keuze |
|---|---|
| Framework | Next.js 16 — App Router, TypeScript, `src/`, alias `@/*` |
| Styling | Tailwind CSS v4 |
| Font | Inter via `next/font/google` |
| Backend | WordPress + WooCommerce (REST API via `src/lib/woocommerce.ts`) |
| Node | 22 |

---

## Deployment & infra

- **Server**: Hetzner VPS 46.225.5.91, user `serdar`
- **Process manager**: PM2, naam `capsuleautomaat`, poort **3005**
- **basePath**: `/richard` in `next.config.ts` (vereist voor het subpad — assets breken zonder)
- **Nginx config**: `/etc/nginx/sites-enabled/funnelvisionstrategies.com` (`location /richard` → `localhost:3005`)
- **Deploy**: `npm run build && pm2 restart capsuleautomaat`
- **GitHub Actions**: push naar `main` → `.github/workflows/deploy.yml` deployt automatisch naar de VPS (SSH-secrets `SERVER_HOST`/`SERVER_USER`/`SERVER_SSH_KEY`; cold-start fallback start expliciet op `-p 3005`)
- **Health check**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3005`

### Poortoverzicht server

| App | Poort |
|---|---|
| stackwerk | 3000 |
| mymiracle | 3002 |
| funnelvision | 3003 |
| sharm | 3004 |
| **capsuleautomaat** | **3005** |

---

## Secrets

`.env.local` voor WooCommerce-credentials (`WOOCOMMERCE_URL/KEY/SECRET`). Nooit committen.

@AGENTS.md
