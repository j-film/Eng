# Validation — 2026-10-09

Base commit: `0958426ab077066703aa37db449956dbe25c4d56`.

## Completed locally

- All 77 source question records and final rendered runtime data match the base version, excluding the 14 image paths.
- All 14 bundled JPEGs decode; longest edge ≤1200 px, original aspect ratios preserved; total 1,718,108 bytes. All local paths return HTTP 200 with image/jpeg on a test static server.
- DOM execution checks: 7 × 11 question cards; 14 local image references; grammar examples, tips/templates, English TTS dispatch, timer countdown, answer hiding and `toeic-*` localStorage progress persistence.
- Service-worker logic checks at both root and `/Eng/` scopes: atomic installation of page + 14 images; installation failure does not leave a ready cache; offline entry-point (including query string) and photo responses; cleanup restricted to this workbook's cache prefix; external links and unrelated missing pages are not intercepted.
- JavaScript syntax and git whitespace checks passed.

## Not verified

- Real iPhone Safari rendering, actual English voice audio and airplane-mode reopening.
- Browser-engine integration and viewport screenshots: Playwright browser downloads returned unusable content in this environment. DOM and worker tests above are simulations, not a claim that a real mobile browser was tested.
- Netlify account plan, remaining credits, production branch and deployment outcome. No manual Netlify deploy was triggered. One production-branch ref update may trigger one automatic deploy if the site is connected to main.

## iPhone acceptance check

1. Open the HTTPS site online in Safari and wait for “문제·사진 14장 오프라인 저장 완료”.
2. Check Q3 and Q4 in all seven sets: both photos, original source links and author credits; no clipped image or failed-image message.
3. Mark a question complete; test answer hiding, timer and English TTS.
4. Close the workbook tabs, enable airplane mode, and reopen the same URL in Safari. Visit an unvisited set and check both photos and saved progress. TTS depends on installed offline voices; original source links require internet.
5. If Safari data is cleared or evicted, reconnect and wait for caching to complete again. Local hosting alone does not guarantee offline availability.
