# TOEIC Speaking IH 150 · 4-day intensive study

A mobile-friendly study workbook for **2026-10-08 to 2026-10-11**, with seven complete practice sets.

## What's included

- **77 practice questions:** 7 sets × 11 questions, all five TOEIC Speaking Parts
- **14 picture-description photos:** photographed scenes with sample English answers, Korean explanation, and position phrases
- **Part + question numbers:** e.g. `Part 4 · Q09`
- **True table layouts for Q8–Q10**, with a separate reference sheet in each of the seven practice sets:
  1. Healthy Living Fair (time and pricing exceptions)
  2. Candidate résumé and interview schedule (supplemental practice)
  3. Busan business-trip itinerary (time changes)
  4. Photography workshop (session vs check-in times)
  5. Digital Skills Day (canceled session)
  6. Customer-service training (AM/PM sessions)
  7. Airport shuttle timetable (departure, arrival, fare and cancellations)
- **Dedicated tabs:** 77-question workbook / IH score tips / reusable sentence templates
- **Audio:** English questions and model answers via the browser's speech synthesis, with speed control
- **Practice timer, answer hiding, individual study checkboxes**

## Four-day plan

| Day | Sets | Questions |
|---|---|---:|
| Oct 8 | 1–2 | 22 |
| Oct 9 | 3 | 11 |
| Oct 10 | 4–5 | 22 |
| Oct 11 | 6–7 | 22 |

## Open and publish

The website entry point is **`index.html`** at the repository root. Deploy it together with **`assets/photos/`** and **`sw.js`**; copying index.html alone will omit the photos and offline support. On a static host such as Netlify, import this GitHub repository and leave the build command empty. Set publish directory to `.`.

GitHub Pages is also available: **Settings → Pages → Deploy from a branch → main → /(root)**.

Photos are bundled locally; viewing them does not contact the Pexels image server. Photographer credits and original-page links remain below each photo and in [PHOTO_CREDITS.md](PHOTO_CREDITS.md). Browser voice availability varies across devices.

**Note:** These are original teaching questions rather than official ETS test questions. The candidate résumé exercise is supplemental: official samples focus primarily on event schedules for questions 8–10.

## Offline learning

Local images alone do **not** make the workbook available offline. On HTTPS (or localhost for development), `sw.js` separately caches index.html and all 14 photos. Keep the first visit online until **“문제·사진 14장 오프라인 저장 완료”** appears. Then reopen the same URL in the same browser; unvisited sets are also available offline. All questions, model answers, grammar notes and timers are included in the cached page. Existing `toeic-*` localStorage progress keys are unchanged.

Limits: first access needs internet; `file://` does not support service-worker installation. English TTS stays on the existing speech-synthesis API and may require an installed offline English voice. External source links require internet. Safari can evict website data, and clearing browser data removes the offline cache and progress; this is not a permanent offline download guarantee. Updated versions wait until all workbook tabs close, then activate on reopening. Reconnect periodically for updates. When changing the workbook/photos, bump the cache version in sw.js; do not reuse a version for changed assets.

## Deployment cost

Bundle changes into one commit on the production branch after local checks. Do not deploy each image separately. No build step or external image proxy is required. On Netlify credit-based plans, a successful production deploy currently costs 15 credits; traffic also consumes credits. Actual plan, balance and automatic deployment settings must be checked in the Netlify account. See [Netlify credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/).
