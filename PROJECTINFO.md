# capsuleautomaat.nl

## Project overzicht
Headless WooCommerce webshop voor capsuleautomaat.nl gebouwd met Next.js 16, 
TypeScript en Tailwind CSS.

## Stack
- Frontend: Next.js 16 (App Router), TypeScript, Tailwind CSS
- Backend: WordPress + WooCommerce (bestaande installatie op capsuleautomaat.nl)
- Deployment: Vercel
- Font: Inter

## Design
- Kleurenpalet: antraciet (#1C1C1E), groen (#16A34A), lichtgrijs (#F9FAFB)
- Stijl: clean en zakelijk, B2B groothandel
- Taal: Nederlands, u-vorm, geen em dashes, geen hyphens

## Wat er staat
- Homepage met header, hero, categorie grid, producten grid, USP balk en footer
- Mockdata met echte content van capsuleautomaat.nl
- WooCommerce API client klaar in src/lib/woocommerce.ts

## Wat nog gebouwd moet worden
- [ ] Productpagina (/products/[slug])
- [ ] Categoriepagina (/categorie/[slug])
- [ ] Contactpagina (/contact)
- [ ] Echte WooCommerce API credentials invullen in .env.local
- [ ] Winkelwagen functionaliteit
- [ ] Checkout

## WooCommerce API koppelen
Vul in .env.local:
WOOCOMMERCE_URL=https://capsuleautomaat.nl
WOOCOMMERCE_KEY=ck_xxxxxxxxxxxxxxxx
WOOCOMMERCE_SECRET=cs_xxxxxxxxxxxxxxxx

Keys aanmaken via: WooCommerce > Instellingen > Geavanceerd > REST API

## Contactgegevens klant
- Telefoonnummer: 06-54643232
- Onderdeel van: Team Priceking.nl (priceking.nl)

## Lokaal draaien
npm run dev → http://localhost:3000

## Deployment
Vercel, gekoppeld aan GitHub repository capsuleautomaat
