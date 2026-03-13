# Copilot / AI agent instructions

Summary
- Short: This repo contains multiple services (API backend, admin/server, and React frontends). Focus on the specific files referenced below when making changes.

Architecture & Big Picture
- `backend/`: Main REST API for users, courses, payments and file uploads. Entry: `backend/server.js` (listens on PORT || 4000). Connects to MongoDB and Cloudinary.
- `server/`: Separate admin-like service with Socket.IO and its own `index.js` (PORT || 5000). Uses `server/build` and may contain admin-specific routes.
- `client/` and `frontend/`: Two Vite React apps (both use ESM). They expect `VITE_BACKEND_URL` in env and run with `npm run dev`.

Key workflows & commands
- Run backend (dev):
  - `cd backend && npm run server` (nodemon)
  - Production: `cd backend && npm start`
- Run frontend(s):
  - `cd client && npm run dev`
  - `cd frontend && npm run dev` (another front-end copy)
- Admin/server service:
  - `cd server && npm start`
- Build frontend from `server` (helper): `cd server && npm run build` (runs `frontend` build inside)

Project-specific conventions and patterns
- ESM modules everywhere (`type: "module"` in package.json). Use `import`/`export default` style.
- Auth header: the backend expects a header named `token` (not `Authorization`). See `backend/middlewares/authUser.js` which verifies JWT and injects `req.body.userId`.
- DB connection appends a hardcoded DB name: `process.env.MONGODB_URI` + `/kirct` — see `backend/config/mongodb.js`.
- Cloudinary: configured via env vars in `backend/config/cloudinary.js` and `server/utils/cloudinary.js`. Uploads are often first saved to disk by `multer` then pushed to Cloudinary.
- File upload middleware: `backend/middlewares/multer.js` uses disk storage and `upload.single('image')` in routes like `backend/routes/userRouter.js`.
- Webhooks: Stripe and Paystack webhook endpoints require the raw body. See `backend/server.js` routes:
  - `app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhook)`
  - `app.post('/paystack', express.raw({type: 'application/json'}), paystackWebhook)`
  When testing webhooks use a tunneling tool (ngrok) and ensure raw body is forwarded.
- Payments: Primary Paystack integration occurs in `backend/controllers/userController.js` (methods `purchaseCourse` and `verifyPayment`). Tests and changes to payment code should respect the reference/metadata flow (`reference`, `callback_url`, `metadata`).

Integration points & env vars
- Required env vars discovered in code: `JWT_SECRET`, `MONGODB_URI`, `CLOUDINARY_*` (`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`), `PAYSTACK_SECRET_KEY`, Stripe keys. Frontends need `VITE_BACKEND_URL`.
- Ports: backend default 4000, server default 5000. Update CORS origins (see `server/index.js` Socket.IO config) when deploying to production.

Files to consult for context/examples
- API entry: `backend/server.js`
- Routes example: `backend/routes/userRouter.js`
- Auth middleware: `backend/middlewares/authUser.js`
- DB & Cloudinary: `backend/config/mongodb.js`, `backend/config/cloudinary.js`
- Payment & user flows: `backend/controllers/userController.js`
- React context showing backend usage: `client/src/context/AppContext.jsx` (uses `VITE_BACKEND_URL` and stores `token` in localStorage)
- Admin server entry: `server/index.js`

Agent Guidance (concise rules)
1. Prefer small, targeted edits. When changing API contracts update route and related controller and any frontend call site (`client/src/` or `frontend/src/`).
2. Preserve ESM imports/exports and existing runtime assumptions (e.g., `req.body.userId` set by auth middleware).
3. When editing payment/webhook code: do not replace `express.raw` with `express.json` for webhook endpoints — they rely on raw body parsing.
4. When adding env vars, list them in the PR description and update any README or deployment files.
5. File uploads are two-step (disk via `multer`, then Cloudinary). Keep that pattern unless refactoring the whole flow.

If anything seems missing or ambiguous, ask the maintainer to point to which frontend (`client/` vs `frontend/`) is the canonical app. I can iterate on this doc after that confirmation.

-- End
