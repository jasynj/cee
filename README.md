# Craig's Events & Entertainment — Website

Marketing and booking website for Craig's Events & Entertainment, a full-service event planning company offering catering, decoration, photography, videography, and coordination.

> **Portfolio project** — Built for a client. Shared here for portfolio purposes. Client details and proprietary assets are not included.

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS v4**
- **React Router v7** — multi-page routing
- **Formspree** — booking inquiry form submissions
- **Swiper** — services carousel
- **AOS** — scroll animations

## Features

- Multi-step booking inquiry form with conditional steps (catering & decoration steps appear only when relevant services are selected)
- Responsive design across all pages (Home, About, Booking)
- Gallery, services carousel, testimonials, and stats sections

## Local Development

```bash
npm install
npm run dev
```

## Notes

- Form submissions are handled via Formspree — a `FORMSPREE_ID` constant in `src/constants/navigation.js` must be set to a valid form ID
