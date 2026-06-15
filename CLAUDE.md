# capsuleautomaat — headless WooCommerce webshop

Projectdirectory: `/var/www/capsuleautomaat`
Live URL: `https://funnelvisionstrategies.com/richard`
GitHub: `github.com/serdartufan/capsuleautomaat` (branch `main`)

B2B groothandel-webshop voor capsuleautomaat.nl (onderdeel Team Priceking.nl). Zie `PROJECTINFO.md` voor design, content en openstaande features.

Draait op **echte WooCommerce-data** (geen mockdata meer). Data-laag: `src/lib/woocommerce.ts` (v3 REST, HTTP Basic Auth, ISR `revalidate 300s`) — functies `getProducts`, `getTopLevelCategories`/`getCategories`, `getProduct`, `getProductBySlug`. Routes: `/` (homepage) en `/product/[slug]` (detailpagina, met loading/not-found/error states).

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
- **Deploy**: **push naar `main` = auto-deploy via GitHub Actions** (`.github/workflows/deploy.yml`, SSH-secrets `SERVER_HOST`/`SERVER_USER`/`SERVER_SSH_KEY`; cold-start fallback start expliciet op `-p 3005`). **Niet** tegelijk handmatig `pm2 restart` draaien: Actions doet parallel `npm ci && npm run build` en een handmatige restart pakt dan een half-geschreven `.next` op → 500's (`middleware-manifest.json` ontbreekt). Kies één route: óf pushen (Actions deployt), óf lokaal `npm run build && pm2 restart capsuleautomaat` **zonder** te pushen.
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

`.env.local` (gitignored) met `WOOCOMMERCE_URL` + `WOOCOMMERCE_CONSUMER_KEY` + `WOOCOMMERCE_CONSUMER_SECRET`. Bron: `/home/serdar/.secrets/api-keys.env` (grep `WOOCOMMERCE` ernaartoe). De client accepteert ook de korte namen `WOOCOMMERCE_KEY/SECRET`. **Let op**: `.env.local` gaat niet mee via git/GitHub Actions — de VPS heeft een eigen kopie nodig.

⚠️ **De huidige REST-key is read-only.** Producten ophalen werkt; orders aanmaken (`POST /api/orders` → checkout) geeft **401 "geen schrijf-rechten"**. Voor een werkende checkout moet de klant in WooCommerce (Instellingen → Geavanceerd → REST API) de key op **Read/Write** zetten of een nieuwe Read/Write-key aanmaken.

@AGENTS.md
