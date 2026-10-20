# AT WebLab — Creator Growth Redesign
Status: In development on `creator-growth-redesign`. Never merge or deploy to production without approval.

## Brand and audience
- Preserve the original `public/logo.png` and its AT monogram inside the wireframe globe.
- Target Moroccan photographers, videographers, and creative studios.
- Noir #101010, Ivory #F1EEE7, Stone #A59A89, Graphite #77736D.
- Bilingual French-first and English; accessible language switch.
- Premium cinematic editorial design with meaningful, spatial interactions.

## Approved homepage journey
1. Arrival: bold 'Créez au-delà du cadre / Create Beyond the Frame' with authentic creator imagery, a subtle but high-fidelity interactive 3D wireframe globe inspired by the official logo, clear CTAs.
2. What we create: explain Creator Launch in plain language.
3. Selected Experiences: Prodyous and Studio DIFAF. Studio DIFAF is a prototype, not a delivered case study. Remove Doumi Physio from featured portfolio.
4. Creator Launch Playground: three connected modes: portfolio, simulated inquiry, simulated lead tracking. Clearly label all demonstration data. No real booking from demo.
5. Explore Creators: only creator profiles with permission, never invented testimonials.
6. Journal & Creator Tools: useful editorial content and portfolio assessment.
7. Creator Care: recurring service explained without implying unbuilt features are available.
8. Closing invitation: project inquiry and WhatsApp.

## Interaction direction
- Use GSAP + ScrollTrigger for intentional scroll reveals and image transitions.
- Use Three.js + React Three Fiber + Drei for the signature globe where supported; dynamic import, lazy loading, device-aware rendering, reduced-motion fallback, no blocking intro.
- Optionally use custom shaders only where they measurably improve visual quality; avoid gratuitous effects.
- Don't force horizontal scrolling or hijack scroll. Preserve normal browser behavior.
- Mobile-first; accessible keyboard controls and semantic HTML.
- Keep text content outside WebGL canvas so it remains indexable.

## SEO and performance
- Preserve existing indexed URLs and avoid breaking redirects, canonical URLs, robots and sitemap.
- Localized routes and proper hreflang, translated titles and descriptions, structured data grounded in real content.
- LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75 real user data targets; optimize media, use poster frames for video, lazy-load optional 3D.
- Verify Open Graph assets, metadata, mobile Lighthouse and real device UX.
- Maintain existing contact API and test actual email delivery and rate limiting.
- Do not publish fake testimonials, fabricated projects or misleading claims.

## Implementation milestones
0. Audit + establish baseline and preview deployment.
1. Tokens, typography, responsive navigation, bilingual routing.
2. Cinematic hero with official logo and responsive 3D fallback.
3. Experience Gallery and authentic work details.
4. Creator Launch interactive demo and product page.
5. Creator Journal and Tools, content publishing workflow.
6. QA, accessibility, SEO regression, Core Web Vitals and conversion tests.

## Approval gates
- Every milestone must pass lint/build and visual mobile/desktop QA.
- No changes to main, production domain, Vercel production deployment or live SEO settings until explicitly approved.
