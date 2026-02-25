# Rally Distribution Channels — Cost, Feasibility & Monetization Analysis

**Generated:** 2026-02-24
**Status:** Active Reference
**Related:** [Goal-026: Rally Headless Agent](../goals/goal-026.md), [OpenClaw Research](../../product-hacker/internal-docs/openclaw-integration-research.md)

---

## Summary

Rally's headless agent (standup engine) produces structured JSON that can be delivered through any channel. This document analyzes each distribution channel for cost, setup effort, and monetization strategy.

**The key question for each channel:** Can we pass the cost to the user, or is it a platform cost we absorb?

---

## Channel Comparison Matrix

| Channel | API Cost | Cost/Interaction | Setup | Eng. Effort | User BYOK? | Platform Cost? |
|---------|----------|-----------------|-------|-------------|------------|----------------|
| **Telegram** | Free | $0 | Easy | 1-2 days | N/A (free) | $0 — just hosting |
| **Discord** | Free | $0 | Easy | 1-2 days | N/A (free) | $0 — just hosting |
| **Email (SES)** | Per-email | $0.0001/email | Medium | 1-2 days | Yes (easy) | ~$0.10/1K emails |
| **Slack** | Free | $0 | Medium | 3-5 days | N/A (free) | $0 — Marketplace approval needed |
| **SMS (Twilio)** | Per-msg | ~$0.011/msg | Medium | 2-3 days | Yes (subaccounts) | $330/mo at 1K msgs/day |
| **Voice (Twilio)** | Per-min | ~$0.014/min out | Med-Hard | 1-2 weeks | Yes (subaccounts) | Expensive at scale |
| **WhatsApp** | Per-msg | ~$0.02-0.03/msg | Hard | 1-2 weeks | Difficult | $600-900/mo at 1K msgs/day |

---

## Detailed Channel Analysis

### 1. Telegram Bot — RECOMMENDED FIRST

**Why Telegram first:**
- Zero API cost forever (Telegram's commitment)
- Easiest integration (BotFather → token → webhooks)
- Rich bot primitives: inline keyboards, commands, payments API
- 950M+ MAU globally
- OpenClaw already supports it via grammY

**Rate Limits:**
- 1 msg/sec per chat
- 20 msgs/min per group
- 30 msgs/sec global per bot token
- Paid broadcasts: up to 1,000 msgs/sec

**Cost Model:**
- API: $0
- Hosting: ~$5-20/mo (shared server)
- AI inference: ~$0.003-0.01 per standup (Haiku for formatting, no LLM needed for raw standup)
- **Total: Effectively $0 per user**

**User BYOK:** Not applicable — nothing for users to pay Telegram for.

**Monetization:** Include in Rally Pro tier. Zero marginal cost means pure value-add.

**Implementation:**
```
User → Telegram Bot → POST /rally/standup → Format response → Reply
                    → Scheduled cron → Push standup at user's preferred time
                    → Inline keyboard "Handle This" → POST /rally/chat with agentPrompt
```

---

### 2. Email (AWS SES)

**Cost Breakdown:**
- $0.10 per 1,000 emails ($0.0001/email)
- Outgoing data: $0.12/GB
- Dedicated IP: $24.95/mo (optional, for deliverability)

**Volume Projections:**
| Users | Emails/day | Monthly Cost |
|-------|-----------|-------------|
| 100 | 100 | ~$3/mo |
| 1,000 | 1,000 | ~$30/mo |
| 10,000 | 10,000 | ~$300/mo |

**User BYOK:** Very feasible. Users provide their own SES credentials or SendGrid API key. Common pattern. Could charge $0 for BYOK and include SES-powered delivery in Pro tier.

**Monetization:**
- Free tier: Weekly digest only
- Pro: Daily standup email
- BYOK: Unlimited, user pays their own SES costs

**Note:** SendGrid eliminated its free tier in mid-2025. AWS SES is the clear winner. Alternatives: MailerSend (3K free/mo), Resend (3K free/mo).

---

### 3. Slack App

**Cost Breakdown:**
- API: $0 (Web API, Events API, Bolt SDK all free)
- Rate limits: 1 msg/sec per channel; 30K events/workspace/app/hour
- **Critical:** Non-Marketplace apps face severe rate limits since May 2025 (conversations.history: 1 req/min, 15 results max)

**Effort:** Medium (3-5 days basic, 1-2 weeks for Marketplace-ready)
- OAuth flow for multi-workspace distribution
- Event subscriptions
- Slack Marketplace review process (calendar time)

**User BYOK:** N/A — users install the app into their Slack workspace. No per-message cost.

**Monetization:** Include in Rally Pro. Good for enterprise/B2B users who live in Slack.

---

### 4. SMS (Twilio)

**Cost Breakdown:**
- $0.0083/msg send + ~$0.003 carrier surcharge = **~$0.011/msg**
- Phone number: ~$1.15/mo (US local)
- A2P 10DLC registration required (compliance overhead)

**Volume Projections:**
| Users | Msgs/day | Monthly Cost |
|-------|---------|-------------|
| 100 | 200 | ~$66/mo |
| 1,000 | 2,000 | ~$660/mo |
| 10,000 | 20,000 | ~$6,600/mo |

**User BYOK:** Yes — Twilio supports subaccounts. User provides their own Twilio Account SID + Auth Token. We could also accept any Twilio-compatible API.

**Monetization Options:**
1. **BYOK (pass-through):** User adds their Twilio credentials in Settings → $0 platform cost
2. **Platform-provided:** Charge per SMS (e.g., $0.03/msg — 3x markup) or include N msgs/mo in Pro tier
3. **Hybrid:** Include 50 SMS/mo in Pro, BYOK for unlimited

**Recommendation:** SMS is expensive at scale. Default to BYOK model. Include small allocation in Pro tier as a taste.

---

### 5. Voice Briefings (Twilio)

**Cost Breakdown:**
- Outbound: $0.014/min
- Inbound: $0.0085/min
- A 2-minute standup call = ~$0.03

**Volume Projections:**
| Users | Calls/day | Monthly Cost |
|-------|----------|-------------|
| 100 | 100 | ~$90/mo |
| 1,000 | 1,000 | ~$900/mo |

**User BYOK:** Same as SMS — Twilio subaccounts or user's own credentials.

**Monetization:** Premium add-on. Voice is a luxury channel. Charge per call or include in enterprise tier.

**Engineering Effort:** 1-2 weeks. Requires TwiML for conversation flows, TTS for standup delivery, and optionally STT for voice commands back.

---

### 6. Discord Bot

**Cost:** $0 (everything free)
**Setup:** Easy (1-2 days)
**Rate limits:** 50 req/sec global, 5 msgs per 5 sec per channel

**User BYOK:** N/A — free. Users add the bot to their server.

**Monetization:** Include in free/Pro tier. Good for community-oriented Rally users.

**Note:** Bots in 2,500+ servers require identity verification. Rich interaction model (slash commands, buttons, threads).

---

### 7. WhatsApp (Twilio/Meta)

**Cost Breakdown:**
- Twilio fee: $0.005/msg + Meta template fees
- Marketing: ~$0.025/msg, Utility: ~$0.015/msg, Auth: ~$0.0135/msg
- Free 24-hour service window (utility templates free on Meta side)
- Effective cost: **~$0.02-0.03/msg**

**Setup:** Hard (1-2 weeks + Meta Business verification + template approval)

**User BYOK:** Technically possible but impractical — WhatsApp Business Account setup is complex.

**Monetization:** Enterprise add-on only. Not worth the setup complexity for MVP.

**Recommendation:** Defer to Phase 3+. WhatsApp has 2B+ users but the setup friction and cost don't justify early investment.

---

## BYOK vs Platform Cost Summary

### Easy to Pass to User (BYOK-friendly)
| Channel | How Users Add Their Key | What They Pay |
|---------|------------------------|---------------|
| **Email (SES/SendGrid)** | API key in Rally Settings | Their own SES costs (~$0.0001/email) |
| **SMS (Twilio)** | Account SID + Auth Token in Settings | Their own Twilio costs (~$0.011/msg) |
| **Voice (Twilio)** | Same Twilio credentials | Their own Twilio costs (~$0.014/min) |
| **Claude API** | Already supported — API key in Settings | Their own Anthropic costs |

### Platform Cost (we absorb, include in tier pricing)
| Channel | Why We Absorb | Monthly Cost at 1K Users |
|---------|--------------|-------------------------|
| **Telegram** | Free API, no per-msg cost | ~$10/mo (hosting only) |
| **Discord** | Free API, no per-msg cost | ~$10/mo (hosting only) |
| **Slack** | Free API, no per-msg cost | ~$10/mo (hosting only) |
| **Email (platform-provided)** | Near-zero cost | ~$30/mo via SES |

---

## Recommended Rollout Order

### Phase 2a — Telegram (1-2 days, $0 cost)
- Zero marginal cost, maximum bang
- Morning standup delivery via cron
- Inline keyboard for "Handle This" actions
- `/status`, `/standup`, `/pipeline` bot commands

### Phase 2b — Email Digest (1-2 days, near-zero cost)
- HTML-formatted standup email
- Daily or weekly frequency
- Action links back to Rally web
- BYOK SES option for power users

### Phase 2c — Slack App (3-5 days, $0 cost)
- Standup posted to a channel
- Slash commands: `/rally standup`, `/rally pipeline`
- DM mode for personal briefings
- Marketplace listing for full rate limits

### Phase 3 — SMS/Voice (2-3 days per channel, per-msg cost)
- BYOK Twilio first
- Platform-provided as Pro add-on with allocation
- Voice as premium/enterprise feature

### Phase 4 — WhatsApp, Discord (deferred)
- WhatsApp when user demand justifies the setup
- Discord when community features are built out

---

## Pricing Model Recommendation

| Tier | Channels Included | Cost Basis |
|------|-------------------|------------|
| **Free** | Web dashboard widget only | $0 |
| **Pro ($X/mo)** | + Telegram, Email (daily), Slack | $0 marginal (all free channels) |
| **Pro + SMS** | + 50 SMS/mo | ~$0.55/mo per user |
| **Enterprise** | + Voice, WhatsApp, unlimited SMS | BYOK or custom pricing |
| **BYOK (any tier)** | User's own keys for any paid channel | $0 to us |

The beauty of starting with Telegram + Email + Slack: **all three are $0 marginal cost**, so they're pure value-add to the Pro tier without eating into margins. SMS/Voice are the only channels that require per-interaction payment, and those can be passed to users via BYOK.
