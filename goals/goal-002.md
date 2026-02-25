# Publish Google App (OAuth Verification)

**Status:** active
**Priority:** high

## Description

## Google OAuth App Verification Checklist

Rally uses Gmail (read + send) and Google Calendar (read + write) scopes. Since gmail.send is a **restricted scope**, full verification including security assessment is required.

---

### Brand Verification (Required for all apps)

- [ ] **Homepage on verified domain** — rally.producthacker.ai exists but loads the login page. Google says homepage CANNOT be only a login page. May need a public landing page or make the marketing sidebar accessible without login.
- [ ] **Homepage describes app functionality** — Auth page marketing panel describes Rally but it's part of login, not standalone.
- [ ] **Privacy policy linked on homepage** — Add a visible link to /privacy on the auth/landing page.
- [ ] **Privacy policy link matches consent screen** — Set https://rally.producthacker.ai/privacy as privacy policy URL in Google Console.
- [x] **Privacy policy hosted on same domain** — /privacy on rally.producthacker.ai. Covers Gmail read/send, Calendar read/write, token storage.
- [ ] **Domain ownership verified in Search Console** — A project owner/editor must verify producthacker.ai in Google Search Console (https://search.google.com/search-console).
- [x] **Google branding on sign-in button** — Standard 4-color G logo button added.
- [ ] **Project contact info up to date** — Verify in Google Cloud Console > IAM & Admin.

### Sensitive/Restricted Scope Requirements

Rally requests these scopes:
- gmail.readonly — Sensitive
- gmail.send — **Restricted** (triggers security assessment requirement)
- calendar — Sensitive
- calendar.events — Sensitive

- [ ] **Demonstration video** — Record video showing full OAuth flow, consent screen in English, and how Rally uses Gmail/Calendar data.
- [ ] **Scope justification** — Write detailed justification for each scope explaining why narrower scopes won't work.
- [x] **Limited use compliance** — Rally only uses data for user-facing CRM features, doesn't sell/share data.
- [ ] **Annual security assessment** — Required for gmail.send (restricted). Must use a Google-approved assessor. Takes weeks and costs money.

### Decision Point

**Consider dropping gmail.send** to avoid the restricted scope security assessment. Without it, Rally would only need sensitive scope verification (no security assessment, faster approval). Users could send emails from their own Gmail client instead.

### Google Console URLs
- OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent
- Credentials: https://console.cloud.google.com/apis/credentials
- Search Console (domain verification): https://search.google.com/search-console

### Redirect URIs (already configured)
- Production: https://rally.producthacker.ai/api/gmail/callback
- Supabase: https://tdjyqykkngyflqkjuzai.supabase.co/auth/v1/callback
- JavaScript Origin: https://rally.producthacker.ai

---
*Last synced: 2026-02-25*
