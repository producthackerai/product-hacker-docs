# TaskCrush Product Documentation

> Complete reference for every feature, page, integration, and system in TaskCrush.

---

## Table of Contents

1. [What is TaskCrush?](#what-is-taskcrush)
2. [Workspaces](#workspaces)
3. [Goals](#goals)
4. [Tasks](#tasks)
5. [Recurring Tasks & Habits](#recurring-tasks--habits)
6. [Pages & Views](#pages--views)
   - [Dashboard](#dashboard)
   - [Board (Kanban)](#board-kanban)
   - [AI Chat](#ai-chat)
   - [Guide (Product Hacker Framework)](#guide-ralph-wiggum-framework)
   - [Platform Overview](#platform-overview)
   - [Profile & Settings](#profile--settings)
   - [App Docs](#app-docs)
   - [Admin Dashboard](#admin-dashboard)
   - [Automation Control Panel](#automation-control-panel)
7. [AI Chat Tools Reference](#ai-chat-tools-reference)
8. [Activity Feedback System](#activity-feedback-system)
9. [Aurora Forecast Widget](#aurora-forecast-widget)
10. [Onboarding System](#onboarding-system)
11. [Feedback System](#feedback-system)
12. [API Keys](#api-keys)
13. [Automation Pipeline](#automation-pipeline)
14. [GitHub Workflows](#github-workflows)
15. [Tao Data Integration](#tao-data-integration)
16. [User Roles & Permissions](#user-roles--permissions)
17. [Data & Security](#data--security)

---

## What is TaskCrush?

TaskCrush is an AI-powered task and goal management application. It combines structured project management with conversational AI to help users organize their personal life, career, and development work.

**Core principles:**
- **AI-first interaction** - Talk to the AI chat to create, organize, and manage tasks and goals using natural language
- **Hierarchical goal tracking** - Parent goals break into sub-goals, which break into tasks. Progress rolls up automatically.
- **Multi-workspace organization** - Separate personal, work, and app development contexts with workspace-specific fields
- **Feedback-driven improvement** - Activity suggestions learn from your thumbs up/down feedback over time
- **Automation pipeline** - User feedback can trigger automated code changes via Claude Code + GitHub Actions

**Tip: The AI chat knows everything in this document.** You can ask it about any feature, capability, or how something works instead of reading through the docs. Try questions like "What tools do you have?", "How does the automation pipeline work?", or "What can I do in the Personal workspace?"

---

## Workspaces

Workspaces are the core organizational concept in TaskCrush. Everything - tasks, goals, chat history, and dashboard widgets - is scoped to a workspace. Switch between them using the workspace buttons in the top navigation bar (Personal, Work, App).

**Why workspaces matter:** They keep your personal life separate from your career goals and your dev work. Each workspace has its own AI chat personality, task fields, and dashboard layout. When you switch workspaces, the entire app changes context.

### Personal Workspace

Your space for personal life, health, home projects, hobbies, and individual goals. The AI here is encouraging and supportive.

**Task fields:**
| Field | Type | Description |
|-------|------|-------------|
| title | string | What needs to be done |
| category | enum | `health`, `home`, `fun`, `finance`, `learning` |
| priority | enum | `high`, `medium`, `low` |
| dueDate | date | When it should be completed |
| energyLevel | enum | `low`, `medium`, `high` - helps match tasks to your energy |
| notes | string | Additional context |
| tags | array | Tags for filtering |
| goalId | string | Link to a goal |

**What makes Personal special:**
- **Daily Habits Section** on the dashboard - See all your recurring tasks with streaks, progress bars, and one-tap completion. Great for building consistent routines.
- **Activity Suggestions Widget** - AI-powered local event and activity recommendations that learn from your feedback (see [Activity Feedback System](#activity-feedback-system))
- **Aurora Forecast Widget** - Northern lights visibility prediction based on your ZIP code
- **Category-based organization** - Filter and view tasks by life area (health, home, fun, finance, learning)

### Work Workspace (Career Development)

Your space for job searching, skill building, career strategy, and professional growth. The AI here acts as a strategic career partner.

**Task fields:**
| Field | Type | Description |
|-------|------|-------------|
| title | string | Task description |
| client | string | Company name (for job applications) |
| project | string | Initiative name (e.g., "Job Application", "AI Learning") |
| priority | enum | `high`, `medium`, `low` |
| dueDate | date | Target date |
| estimatedHours | number | Time investment expected |
| billable | boolean | Time tracking flag |
| meetingLink | string | Video call URL for interviews/networking |
| notes | string | Preparation notes, key details |
| tags | array | e.g., `job-search`, `learning`, `networking` |
| goalId | string | Link to a goal |

### App Workspace (Shared Development)

For software development tasks using the Product Hacker framework. This workspace is **shared among super_admins** - all super_admins see the same tasks and goals. The AI here is technical and emphasizes acceptance criteria and task decomposition.

**Task fields:**
| Field | Type | Description |
|-------|------|-------------|
| title | string | Action-oriented task title |
| description | string | Detailed context and approach |
| acceptanceCriteria | array | 3-7 specific, testable criteria |
| priority | enum | `high`, `medium`, `low` |
| dependsOn | array | Task IDs this depends on |
| tags | array | Tags and categories |
| estimatedHours | number | Time estimate |
| goalId | string | Goal assignment (strongly recommended) |
| technicalNotes | string | Implementation details, PR links |

**Access:** Only users with `super_admin` role can see or use the App workspace.

---

## Goals

Goals are larger objectives that tasks work toward. They support hierarchical nesting.

### Goal Hierarchy

- **Parent Goals** - Top-level objectives (e.g., "Get Healthier", "Ship v2.0")
- **Sub-Goals** - Nested under parents (e.g., "Run a 5K", "Build Auth System")
- **Tasks** - Actionable items assigned to any goal level

Progress rolls up automatically: completing tasks under a sub-goal updates the sub-goal's progress, which in turn updates the parent goal.

### Goal Fields

| Field | Type | Description |
|-------|------|-------------|
| title | string | Goal name |
| description | string | What success looks like |
| status | enum | `planned`, `in_progress`, `completed`, `on_hold` |
| progress | number | 0-100% (auto-calculated from tasks) |
| targetDate | date | Target completion |
| color | string | Hex color for visual identification |
| parentGoalId | string | Parent goal ID (for sub-goals) |
| sortOrder | number | Display order (drag-and-drop reordering) |

### Creating Goals

**Via AI Chat:**
```
"Create a goal for learning Spanish with sub-goals for vocabulary and conversation practice"
```

**Via Board View:** Click the "+" button in the Goals Panel sidebar.

**Via Dashboard:** Click any goal to open the Goal Modal, where you can add sub-goals and tasks.

---

## Tasks

Tasks are the actionable items in TaskCrush. Every task has a status, priority, and can be linked to a goal.

### Task Statuses

| Status | Description |
|--------|-------------|
| `todo` | Not started |
| `in-progress` | Currently being worked on |
| `done` | Completed |

### Task Priorities

| Priority | When to use |
|----------|-------------|
| `high` | Urgent or blocking other work |
| `medium` | Important but not urgent |
| `low` | Nice to have, do when time allows |

### Common Operations

- **Create** - Via AI chat, Board view, or Goal Modal
- **Update status** - Drag between Kanban columns, click checkboxes, or tell the AI
- **Edit** - Click a task card to open inline editing
- **Delete** - Click the trash icon on a task card or ask the AI
- **Filter** - By tags, goal, or status
- **Search** - Use the search bar on the Board view

---

## Recurring Tasks & Habits

Recurring tasks are habits and routines that repeat on a schedule. They're one of the most powerful features in TaskCrush for building consistency - they track your streaks, show progress bars, and make it easy to check things off every day.

### Daily Habits on the Dashboard

In the **Personal workspace**, your recurring tasks appear in a dedicated **Daily Habits Section** on the dashboard. This is designed for quick, satisfying interaction:

- **One-tap completion** - Click the circle next to any habit to mark it done for today. The circle fills and a progress bar updates instantly.
- **Progress bars** - Each habit shows how far you are toward your daily/weekly target (e.g., "2/3 done this week")
- **Streak counter** - A flame icon shows how many consecutive days/weeks you've completed the habit. Streaks are motivating - don't break the chain!
- **Checklists** - Expand a habit to see its checklist items (e.g., grocery list). Check items off one by one.
- **Snooze** - Not today? Snooze a habit to temporarily skip it without breaking your streak.
- **Time-of-day sorting** - Habits tagged as "morning" appear first in the morning, "evening" ones later. This keeps your dashboard relevant throughout the day.

### Recurrence Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `daily` | Every day | "Meditate", "Drink Water" |
| `weekly` | Every week (specific days optional) | "Grocery Shopping" on Saturdays |
| `monthly` | Every month | "Budget Review" |

### Features

- **Frequency** - How many times per period (e.g., "3x per week" means you need to complete it 3 separate times that week)
- **Specific days** - Pin weekly tasks to certain days (Mon/Wed/Fri). The dashboard highlights which days are due.
- **Preferred time** - `morning`, `afternoon`, `evening`, `anytime` - affects sort order on the dashboard
- **Checklists** - Reusable checklists that reset each period (e.g., a grocery list resets every week)
- **Streak tracking** - Shows consecutive days/weeks of completion with a flame icon
- **Progress bars** - Visual progress toward period target (e.g., 2/3 done this week)
- **Inline editing** - Click the settings icon on any recurring task to change its pattern, frequency, or specific days

### Creating Recurring Tasks

**Via AI Chat:**
```
"Create a daily meditation habit for mornings"
"Add weekly grocery shopping on Saturdays with a checklist: milk, eggs, bread, vegetables"
"I want to exercise 3 times a week"
```

**Via Onboarding:** New users can select from suggested habits during the setup wizard.

**Via the dashboard:** Recurring tasks created via any method appear automatically in the Daily Habits section.

### Pre-built Suggestions

These are available during onboarding:

**Health:** Exercise, Meditate, Drink Water, Sleep 7+ Hours, Get Outside
**Personal:** Journal, Read, Gratitude Practice, Connect with Someone
**Productivity:** Plan Your Day, Review Goals, Clear Inbox

---

## Pages & Views

### Dashboard

Your command center. The Dashboard is the first thing you see when you log in and is designed for quick scanning and fast action. Every widget is interactive - you can complete tasks, expand goals, and chat with the AI without leaving the page.

**All workspaces show:**
- **AI Daily Suggestions** - Time-aware task recommendations that change throughout the day. In the morning you'll see high-priority tasks to tackle while fresh; in the afternoon it surfaces in-progress work; in the evening it helps you plan tomorrow. Also flags urgent tasks, quick wins, and stuck goals.
- **Goal Tree View** - Interactive hierarchical visualization of all your goals, sub-goals, and tasks. Click to expand/collapse, see progress bars at every level, and **check off tasks with one click** directly in the tree. Click any goal to open its detail modal.
- **Goals Progress** - Overview cards for each goal showing completion percentage, task counts, and AI-generated next-step suggestions.
- **High Priority Tasks** - Your most important tasks, grouped by goal hierarchy so you see context (which goal each task serves).
- **Due This Week** - Sticky sidebar that stays visible as you scroll. Shows upcoming deadlines sorted by date so nothing slips through.
- **In Progress** - Tasks you're actively working on with estimated hours remaining. One-click to mark done.
- **Embedded Chat** - Collapsible AI chat panel for quick interactions without navigating to the full chat page.

**Personal workspace also shows:**
- **Daily Habits Section** - All your recurring tasks with streaks, progress bars, and one-tap completion. See [Recurring Tasks & Habits](#recurring-tasks--habits) for the full experience.
- **Activity Suggestions Widget** - AI-powered personalized local event and activity recommendations. Give thumbs up/down feedback to improve future suggestions. See [Activity Feedback System](#activity-feedback-system).
- **Aurora Forecast Widget** - Northern lights visibility prediction for your area based on your ZIP code.

**Dashboard widgets are configurable** via Profile & Settings (toggle aurora and activity widgets on/off).

### Board (Kanban)

The Board is a traditional Kanban-style view for hands-on task planning and organization. If you prefer visual project management over chat-based interaction, this is your primary workspace.

**Three columns:** **To Do** | **In Progress** | **Done**

**How to use it:**
- **Drag & drop tasks** between columns to change their status. Grab a task card and drop it in a new column - the status updates instantly.
- **Goals Panel (left sidebar)** - Shows all your goals in a list. Click a goal to filter the board to only show that goal's tasks. Click "Floating Tasks" to see tasks not assigned to any goal. Drag goals up and down to reorder them.
- **Tag filtering** - A filter bar at the top shows all tags in use. Click tags to filter the board (e.g., show only tasks tagged `urgent` or `backend`). Combine multiple tags.
- **Task cards** show: title, priority badge (color-coded), tags, due date, and a description preview. Everything you need at a glance.
- **Inline editing** - Click any task card to expand it and edit fields directly (title, description, priority, tags, due date, goal assignment, etc.). No modal needed.
- **Search** - Find specific tasks quickly across all columns.

**The Board + Dashboard combo:** Use the Dashboard for quick daily check-ins and completing habits, and the Board when you need to plan, reorganize, or get a full picture of everything in a workspace.

**Automation features (App workspace, super_admin):**
- Tasks with `user-feedback` tag can be triggered for automated processing
- Color-coded tags show automation status: `automation-processing`, `pr-pending`, `pr-merged`

### AI Chat

Full-screen conversational interface with the AI assistant.

**How it works:**
1. You type a message in natural language
2. The AI reads your message, checks your existing tasks/goals, and uses tools to take action
3. When tasks or goals are created, interactive widgets appear below the AI's response
4. Chat history is saved per workspace and persists across sessions

**What you can do:**
- Create, update, delete tasks and goals
- Ask for prioritization advice ("What should I focus on today?")
- Break down complex projects ("Help me plan a home renovation")
- Create recurring habits ("Add daily meditation")
- Update your personal context ("I just moved to Denver")
- Get information about your goals and progress
- **Ask about any app feature or capability** - The AI has full access to this documentation and can explain how anything in TaskCrush works, what tools it has, how the activity feedback system learns, how the automation pipeline processes tasks, and more. Just ask!

**Important behaviors:**
- The AI always checks your existing data before responding
- Tasks are almost always linked to a goal (AI creates one if needed)
- The AI executes all tool calls to completion before responding
- Responses reference actual IDs and titles from the database

**Chat is also available via the Floating Chat Button** (bottom-right corner on every page) for quick interactions without navigating away.

**Workspace-specific personality:**
- **Personal** - Encouraging, supportive, focused on life organization and habits
- **Work** - Strategic partner for career growth, breaks down applications and interviews
- **App** - Technical, follows Product Hacker framework, emphasizes acceptance criteria

### Guide (Product Hacker Framework)

A reference page explaining the Product Hacker framework for the App workspace.

**Framework principles:**
1. **Single Responsibility** - Each task focuses on one concern
2. **Testable Criteria** - 3-7 specific, verifiable acceptance criteria per task
3. **Small Units** - Break work into the smallest independently testable pieces
4. **Explicit Dependencies** - Declare which tasks depend on others
5. **Clear Context** - Provide detailed descriptions explaining purpose

**Sections:**
- Philosophy and Mental Model (think of the AI as a junior developer)
- The Iteration Model (Read State -> Implement -> Verify -> Update -> Commit)
- Capabilities and limitations
- Best practices for writing good tasks

### Platform Overview

Information about the broader Product Hacker Platform ecosystem that TaskCrush is part of.

**Features:**
- Architecture overview
- Available and upcoming apps in the ecosystem
- Shared auth, data, and services documentation
- Embedded platform-specific chat for Q&A

### Profile & Settings

Manage your account and preferences. You can update any of these at any time - you don't have to go through onboarding again (though you can if you want to).

**Editable fields:**
- **Display Name** - Your name shown in the app and used by the AI when addressing you
- **Location (ZIP Code)** - Powers activity suggestions (local events near you) and aurora forecasts. Set this to get the most out of the Personal dashboard.
- **Personal Context** - Free-text description of your interests, family, hobbies, wellness goals, dietary preferences, etc. **The AI reads this to personalize every response**, so the more you share, the better the experience. For example: "I have two kids under 5, I'm into trail running and cooking, and I'm trying to reduce screen time."

**Dashboard preferences:**
- Toggle Aurora Forecast widget on/off
- Toggle Activity Suggestions widget on/off

**Actions:**
- **Run Setup Wizard** - Re-run the full onboarding wizard anytime to reset your habits, goals, or preferences from scratch
- **Save** profile changes

**Tip:** You don't need to use the wizard to update things. Edit your display name, location, context, or dashboard toggles right here and hit Save. The AI and activity suggestions will pick up the changes immediately.

### App Docs

This page. A comprehensive reference for every feature, integration, and system in TaskCrush. The AI chat also has access to this documentation via the `get_app_docs` tool and can answer questions about any feature described here.

### Admin Dashboard

Available to users with `admin` or `super_admin` role.

**Tabs:**

**Stats & Data:**
- Total users, tasks, goals, chat messages
- Browse any database table (tc_tasks, tc_goals, tc_chat_messages, etc.)
- Expandable rows with full record details
- Search and filter

**User Management:**
- Search users by email
- View any user's goals and tasks
- Create goals/tasks for a user
- Delete goals/tasks
- Populate standard workspace data for new users
- AI-powered data population (generates personalized goals/tasks)
- Set user roles (user, admin, super_admin)

**AI Costs:**
- View total AI generation costs, token usage, and web search counts
- Summary cards: total cost, generations, cache hits, cache hit rate, avg cost per generation, unique users, total suggestions
- Daily breakdown table with per-day cost and generation counts
- Per-user cost breakdown
- Recent generations table with model, tokens, cost per call
- Filter by time range (7/14/30/90 days)
- Toggle to hide cached/$0 rows

**AI Provider:**
- Switch default AI provider between Google (Gemini) and Anthropic (Claude)
- All AI calls (chat, activities, onboarding, admin) route through the centralized provider
- Automatic fallback: if the primary provider fails, the other is tried automatically
- Provider preference is stored in `tc_app_settings` and cached in memory (60s TTL)

**Activity Tester:**
- Test activity suggestions with different parameters
- Simulate suggestions for test user profiles
- Debug AI suggestion quality

**Automation:**
- View pending feedback tasks
- Trigger automation pipeline manually
- Monitor feedback task status

### Automation Control Panel

Available to `super_admin` only. Configures the feedback-to-PR automation pipeline.

**Sections:**

**Lifecycle:**
- Visual 7-step flow: User Feedback -> Task Created -> AI Evaluates -> Auto-Implement -> PR Created -> Human Review -> Task Done
- Tag lifecycle: `user-feedback` -> `automation-processing` -> `pr-pending` -> `pr-merged`
- PR-Task linking details (branch naming, body format, merge workflow)
- Workflow files reference

**Eval Prompt:**
- Edit the exact prompt sent to Claude Code during automation
- Manage off-limits files (paths automation cannot modify)
- Preview assembled prompt with all injected context

**Settings:**
- Max tasks per run (1-10)
- Max AI turns per task (5-50)
- Allowed Claude Code tools
- Cron schedule for automated runs
- Setup status checklist

---

## AI Chat Tools Reference

The AI chat has access to 15 tools that let it take real actions on your behalf and answer questions about the app. You don't need to memorize these - just describe what you want in natural language and the AI will pick the right tool. You can also ask the AI "What tools do you have?" or "What can you help me with?" and it will look up this reference and explain its full capabilities.

### Task Management Tools

**create_task**
Create a new task with workspace-appropriate fields.
- Required: `title`, `priority`
- Optional: `description`, `acceptanceCriteria`, `dependsOn`, `goalId`, `category`, `dueDate`, `notes`, `energyLevel`, `client`, `project`, `billable`, `meetingLink`, `estimatedHours`, `tags`

**create_recurring_task**
Create a recurring/habit task with optional checklist.
- Required: `title`, `pattern` (daily/weekly/monthly)
- Optional: `frequency`, `daysOfWeek`, `preferredTime`, `checklistItems`, `category`, `goalId`, `notes`

**update_task**
Update any field on an existing task.
- Required: `taskId`, `updates` (object with fields to change)
- Updatable: `title`, `description`, `status`, `priority`, `acceptanceCriteria`, `dependsOn`, `tags`, `goalId`, `estimatedHours`

**delete_task**
Remove a task by ID.
- Required: `taskId`

**list_tasks**
Get tasks, optionally filtered.
- Optional: `status` (todo/in-progress/done/all), `goalId`

### Goal Management Tools

**create_goal**
Create a goal or sub-goal.
- Required: `title`, `description`
- Optional: `targetDate`, `color`, `parentGoalId`

**list_goals**
Get all goals with optional hierarchy.
- Optional: `includeHierarchy` (boolean)

**update_goal_progress**
Set a goal's progress percentage.
- Required: `goalId`, `progress` (0-100)

**update_goal**
Update goal fields.
- Required: `goalId`, `updates`
- Updatable: `title`, `description`, `targetDate`, `color`, `status`, `parentGoalId`

**delete_goal**
Delete a goal and optionally its sub-goals.
- Required: `goalId`
- Optional: `deleteSubGoals` (boolean, default false)

### Calendar Tools (Coming Soon)

**check_calendar**
Check Google Calendar for events. Currently returns a placeholder - Google OAuth integration is pending.

**add_calendar_event**
Add a time block to Google Calendar. Currently returns a placeholder - Google OAuth integration is pending.

### User Profile Tools

**get_user_profile**
Retrieve the current user's profile including display name, location, personal context, and preferences.

**update_personal_context**
Update the user's personal context text. The AI uses this to personalize responses.
- Required: `personalContext`
- Optional: `appendMode` (boolean - append vs. replace)

### Documentation Tool

**get_app_docs**
Retrieve TaskCrush product documentation. Use this when users ask about features, how things work, or what the app can do. Supports querying specific sections by topic.
- Optional: `topic` - specific section to retrieve (e.g., "activity feedback", "automation", "recurring tasks")
- Returns the full documentation or a relevant section

---

## Activity Feedback System

The Personal workspace includes an AI-powered activity suggestion system that **learns from your feedback** to recommend better activities over time. The more you interact with it, the better it gets.

### How It Works

1. **AI generates suggestions** using Claude with web search, considering your location, time of day, category preferences, and all your past feedback
2. **You see 3-5 activity cards** on your Personal dashboard, each with a title, description, category, and link
3. **You give feedback** with thumbs up (liked it) or thumbs down (not for me) on each suggestion
4. **For negative feedback**, you can optionally explain why: "not interested", "too far", "too expensive", "bad timing", "already done", or type a custom reason
5. **The AI learns** - all feedback is stored and included in future AI prompts, so suggestions improve over time

### Why Your Feedback Matters

Every thumbs up and thumbs down is stored and fed back into the AI prompt the next time suggestions are generated. This means:
- **Thumbs up** on a hiking suggestion? You'll see more outdoor activities.
- **Thumbs down** with "too expensive"? Future suggestions will lean toward free/cheap options.
- **Custom reasons** give the AI even more context to work with.
- Combined with **category boosts** (see below), the system builds a rich picture of what you actually want to do.

### Category Preferences

You can set boost levels (-2 to +3) for each of 9 activity categories:

| Category | Examples |
|----------|----------|
| **Outdoor** | Hiking, parks, nature walks |
| **Concerts & Music** | Live music, festivals, open mics |
| **Wellness** | Yoga, spa, meditation classes |
| **Happy Hours & Social** | Bar events, meetups, social gatherings |
| **Sports & Fitness** | Gym, rec leagues, group fitness |
| **Classes & Learning** | Workshops, lectures, cooking classes |
| **Food & Dining** | Restaurant openings, food festivals, tastings |
| **Arts & Culture** | Museums, galleries, theater, film |
| **Family Activities** | Kid-friendly events, family outings |

**Boost levels:**
- **-2** = Block this category entirely
- **-1** = Show less often
- **0** = Neutral (default)
- **+1 to +3** = Prioritize this category more

Access preferences via the **gear icon** on the Activity Suggestions widget.

### Caching

Suggestions are cached locally per user for the day. Click the refresh button to force new suggestions. The cache is user-specific (keyed by user ID) to prevent cross-user data leakage.

### Activity Notes

You can add free-text notes about your activity preferences (e.g., "I prefer outdoor activities in the morning" or "I'm vegetarian so skip meat-focused food events"). These notes are included in the AI prompt when generating suggestions.

---

## Aurora Forecast Widget

The Personal dashboard includes an aurora borealis (northern lights) forecast widget.

### How It Works

1. Uses your **ZIP code** from Profile settings to determine your location
2. Fetches aurora forecast data via the backend API
3. Shows **visibility probability**, **Kp index**, and **best viewing conditions**
4. Cached for 1 hour per user to reduce API calls

### Requirements

- You must have a ZIP code set in your Profile
- If no location is set, the widget shows a prompt to update your profile

### What It Shows

- Current aurora visibility probability for your area
- Kp index (geomagnetic activity level)
- Best times and conditions for viewing
- Link to more detailed forecasts

---

## Onboarding System

New users see a setup wizard on their first login. **Completing onboarding is the best way to get the most out of TaskCrush** - it sets up your profile, habits, and goals so the AI and activity suggestions are personalized from day one.

### Steps

1. **Welcome** - Introduction to TaskCrush
2. **About You** - Name, location, personal context (the AI uses all of this to personalize responses and suggestions)
3. **Daily Habits** - Select from suggested recurring items or add custom ones. These become recurring tasks that track your streaks.
4. **Goals** - Choose from suggested goals or create your own. These give structure to everything you do in the app.
5. **All Set!** - Confirmation and redirect to your personalized dashboard

### AI Quick Setup Mode

Don't want to click through steps? Choose the AI-powered quick setup instead:
1. Type a freeform description of yourself, your goals, and habits (e.g., "I'm a 32-year-old software engineer in Denver. I want to exercise more, read 2 books a month, and learn Spanish. I like hiking and cooking.")
2. The AI parses it into structured profile data, goals, and recurring tasks
3. Preview and confirm before saving
4. Everything is created for you in seconds

### Re-running Onboarding

Changed your mind? Life circumstances different? You can re-run the onboarding wizard anytime:
1. Go to **Profile & Settings**
2. Click **Run Setup Wizard**
3. Walk through the steps again (your existing data won't be deleted - new items are added)

You can also skip the wizard entirely and just update individual settings in Profile & Settings whenever you want. Edit your name, location, or personal context and hit Save - the AI picks up changes immediately.

### Suggested Items

**Recurring habits:** Exercise, Meditate, Drink Water, Sleep 7+ Hours, Get Outside, Journal, Read, Gratitude Practice, Connect with Someone, Plan Your Day, Review Goals, Clear Inbox

**Goals:** Get in better shape, Read more books, Learn a new skill, Improve work-life balance, Save money, Be more present

---

## Feedback System

Your feedback directly shapes TaskCrush. There are multiple ways to give feedback, and actionable feedback can be automatically implemented via the automation pipeline.

### How to Give Feedback

**From the user menu (any page):**
1. Click your profile icon in the top-right corner
2. Click **Give Feedback** in the dropdown
3. Choose positive or negative sentiment (optional)
4. Write your feedback text and submit

**From the AI Chat:**
1. Click the **speech bubble icon** in the chat header (top-right of the chat panel)
2. This opens the same feedback modal, pre-tagged as "chat" feedback so the team knows it's about the AI experience

**Via the Floating Chat Button:**
The floating chat (bottom-right on every page) also has the feedback icon in its header.

### What Happens With Your Feedback

1. **Stored in the database** - Every piece of feedback is saved with your user ID, timestamp, sentiment, and context
2. **Visible to admins** - Super_admins can view all feedback in the Admin Dashboard
3. **Converted to tasks** - Actionable feedback gets created as a task on the App board with the `user-feedback` tag
4. **Automatically implemented** - The automation pipeline picks up `user-feedback` tasks, evaluates if they're automatable, and if so, Claude Code writes the fix and opens a PR. See [Automation Pipeline](#automation-pipeline) for the full lifecycle.
5. **Quality checked** - Every automated implementation is scored by the Tao evaluation system. Low-quality results trigger remediation tasks.

This means your feedback can go from "I wish the button was bigger" to a merged PR **without any human writing code** - though a human always reviews and approves the PR before it merges.

### Feedback Categories

| Source | Tag | Description |
|--------|-----|-------------|
| User menu | `general` | General app feedback |
| AI Chat header | `chat` | Feedback about the AI chat experience |
| Activity thumbs down | `activity` | Negative feedback on activity suggestions (see [Activity Feedback System](#activity-feedback-system)) |

---

## API Keys

Users can create API keys for programmatic access to TaskCrush.

### Managing API Keys

Available in Profile & Settings (for users with API access).

**Features:**
- Create new API keys with custom names
- Set permissions and expiration dates
- Revoke keys at any time
- Keys use `tc_` prefix for identification
- Keys are hashed before storage (original shown only once)

### Authentication

API keys can be used as Bearer tokens:
```
Authorization: Bearer tc_your_api_key_here
```

They support the same endpoints as JWT authentication.

---

## Automation Pipeline

The automation pipeline converts user feedback into code changes automatically.

### Complete Lifecycle

```
User Feedback → Task Created → AI Evaluates → Auto-Implement → PR Created → Human Review → Task Done
```

**Step by step:**

1. **User submits feedback** via the feedback modal or chat
2. **Task is created** on the App board with `user-feedback` tag
3. **GitHub Action triggers** (on schedule or manually)
4. **`fetch-feedback-tasks.js`** queries Supabase for pending `user-feedback` tasks
5. **Claude Code evaluates** each task for scope, complexity, and safety
6. **If automatable**, Claude reads the codebase, implements the fix, and commits
7. **PR is created** with branch name `feedback/<task-id>` and `Task-ID: <id>` in the body
8. **Task is updated**: `pr-pending` tag added, PR link stored in `technicalNotes`
9. **Human reviews and merges** the PR in GitHub
10. **Merge workflow** fires: parses `Task-ID` from PR body, moves task to `done`, swaps `pr-pending` to `pr-merged`

### Tag Lifecycle

| Tag | Meaning |
|-----|---------|
| `user-feedback` | Task was created from user feedback, waiting for processing |
| `automation-processing` | Claude Code is actively working on this task |
| `pr-pending` | A PR has been created, awaiting human review |
| `pr-merged` | PR was merged, task is done |
| `automation-skipped` | Task was not suitable for automation |
| `automation-error` | Processing encountered an error |
| `automation-remediation` | This task was auto-created to fix a poor-quality automation result |

### Safety Measures

- PRs **never auto-merge** - human review is always required
- Automation **cannot modify** workflow files or its own scripts (off-limits list)
- Configurable **max tasks per run** (default 3)
- Configurable **max AI turns per task** (default 20)
- **30-minute timeout** per workflow run
- **Off-limits files** list prevents modifications to critical paths

### Configuration

Super_admins can configure automation via the **Automation Control Panel** page:
- Edit the evaluation prompt sent to Claude Code
- Manage off-limits files
- Adjust max tasks, max turns, allowed tools
- Set cron schedule

### Workflow Files

See [GitHub Workflows](#github-workflows) for detailed documentation of every workflow, trigger, step, and script.

---

## GitHub Workflows

TaskCrush uses three GitHub Actions workflows that work together to automate the full lifecycle from feedback to merged code to updated tasks and docs. All workflow files live in `.github/workflows/` and their supporting scripts in `scripts/`.

### 1. Process User Feedback (`process-feedback.yml`)

The main automation engine. Takes user feedback tasks from the app board and has Claude Code implement fixes automatically.

**Triggers:**
| Trigger | When |
|---------|------|
| Cron schedule | Every 12 hours (midnight and noon UTC) |
| Manual dispatch | From GitHub Actions UI — optionally specify a task ID and max tasks |
| Repository dispatch | From the app via API call (`process-feedback` event type) |

**What it does (step by step):**

1. **Fetch automation config** — Reads `tc_automation_config` from Supabase for the eval prompt, max tasks, max turns, allowed tools, and off-limits files
2. **Fetch pending feedback tasks** — Queries `tc_tasks` for tasks with `automation-pending` status in the app workspace (up to `max_tasks`, default 3). Can target a specific task ID if provided.
3. **Process with Claude Code** — Invokes `anthropics/claude-code-action@beta` in agent mode. Claude receives the eval prompt + task data and uses allowed tools (default: Bash, Read, Write, Edit, Glob, Grep) to implement the fix. Max turns configurable (default 20).
4. **Update task status** — Runs `scripts/update-task-status.js`:
   - On success: status → `in-progress`, adds `pr-pending` tag
   - On skip: keeps `todo`, adds `automation-skipped` tag
   - On error: keeps `todo`, adds `automation-error` tag
   - Logs a trace to Tao for observability
   - Runs Tao evaluation (scores 1-5 on correctness, quality, security, completeness)
   - If eval score ≤ 2: auto-creates a high-priority `automation-remediation` task
5. **Create Pull Request** — Uses `peter-evans/create-pull-request@v5` to create a PR on branch `feedback/<task-id>` with:
   - Title: `[task-id] Task Title`
   - Body includes `Task-ID: <id>` marker for the merge workflow
   - Review checklist for humans
6. **Update task with PR link** — Runs `scripts/update-task-pr.js` to store the PR URL and number in the task's `technicalNotes`

**Timeout:** 30 minutes per run.

**Permissions:** `contents: write`, `pull-requests: write`, `id-token: write`

**Required secrets:** `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`, plus optional `TAO_API_URL`, `TAO_API_KEY`, `TAO_JUDGE_PROMPT_ID` for observability.

### 2. Auto-Complete Tasks on Push/Merge (`auto-complete-tasks.yml`)

AI-powered workflow that analyzes every push or merge to main, matches work to open tasks/goals, and keeps the product docs up to date.

**Triggers:**
| Trigger | When |
|---------|------|
| Push to main/master | Any direct push (including fast-forward merges) |
| PR merge to main/master | When a PR is merged (not just closed) |

**Skip condition:** Commits with `[skip ci]` in the message are ignored (prevents infinite loops from the docs auto-update step).

**Phase 1 — Task & Goal Completion:**

1. **Gather commit info** — Extracts full commit messages (subject + body, not just subject lines) and code diffs. Commit bodies are the primary data source because auto-generated PRs from Claude Code often have sparse PR bodies like "See commit messages for details."
2. **Fetch open tasks & goals** — Queries Supabase for all app workspace tasks with status `todo` or `in-progress`, and goals with status `planned` or `in_progress`
3. **AI analysis** — Sends commit messages, diff stats, and the task/goal list to Claude (Sonnet 4.5). Claude returns structured JSON identifying:
   - `completedTaskIds` — tasks that these commits clearly completed
   - `completedGoalIds` — goals that can be marked done
   - `newTask` — if substantial work (new feature, significant fix, 3+ file refactor) was done but no existing task matches, Claude describes a new task to create
4. **Update tasks** — Matched tasks get: status → `done`, tags `auto-completed` + `pr-merged` or `push-merged`, merge note with PR/commit link appended to `technicalNotes`
5. **Update goals** — Matched goals get status → `completed`. For goals linked to completed tasks: recalculates progress, auto-promotes `planned` → `in_progress`, and auto-completes goals where all tasks are now done
6. **Create untracked task** — If Claude identified substantial untracked work, creates a new `app-NNN` task marked immediately as `done` with a description and commit/PR link. Trivial changes (typo fixes, dep bumps, CI tweaks) are ignored.

**Phase 2 — Docs Auto-Update:**

1. **Read current docs** — Loads `src/data/app-docs.md` (this file) from the repo
2. **AI comparison** — Sends the full code diff + current docs to Claude. Claude checks whether any user-visible behavior changed, new features were added, workflows modified, or functionality deprecated
3. **Write updates** — If docs are stale, Claude outputs the complete updated file. The script writes it to disk with sanity checks (must be >500 chars, must contain `# TaskCrush` heading)
4. **Commit and push** — The workflow detects changes to `app-docs.md` and commits them with `[skip ci]` to prevent re-triggering itself, then pushes to the default branch

**What triggers a docs update:**
- New user-visible features or pages
- Changed API tools or endpoints
- Modified workflow behavior
- Deprecated functionality

**What does NOT trigger a docs update:**
- Internal refactors with no user-visible impact
- CI/CD pipeline-only changes
- Dependency bumps
- Bug fixes that don't change documented behavior
- Changes to the docs file itself (prevents circular updates)

**Timeout:** 5 minutes. **Permissions:** `contents: write`

**Required secrets:** `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `ANTHROPIC_API_KEY`

### 3. Move Task to Done on PR Merge (`pr-merged.yml`) — Legacy

A simple, fast fallback workflow for PRs that include an explicit `Task-ID:` marker in the body.

**Trigger:** PR closed (merged) to main/master.

**What it does:**
1. Extracts task ID(s) from the PR body using regex patterns:
   - `Task-ID: app-001`
   - `**Task ID:** app-001`
   - `Task ID: app-001`
2. For each found task: sets status → `done`, removes `pr-pending` tag, adds `pr-merged` tag, appends merge note to `technicalNotes`

**Why it still exists:** The `auto-complete-tasks` workflow handles AI-powered matching for all merges, but this workflow provides a deterministic fast-path for PRs generated by the automation pipeline (which always include `Task-ID:` in the body). Both can fire on the same PR merge — they're idempotent (marking an already-done task as done is a no-op).

**Timeout:** 5 minutes.

**Required secrets:** `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`

### How the Workflows Connect

```
User Feedback
     │
     ▼
┌─────────────────────────────┐
│  process-feedback.yml       │  (scheduled / manual / app-triggered)
│  Claude Code implements fix │
│  Creates PR with Task-ID    │
└──────────────┬──────────────┘
               │ PR created on feedback/<task-id> branch
               ▼
        Human reviews & merges PR
               │
               ▼
┌──────────────────────────────────┐     ┌─────────────────────────────┐
│  auto-complete-tasks.yml         │     │  pr-merged.yml (legacy)     │
│  Phase 1: AI matches commits    │     │  Regex matches Task-ID      │
│           to tasks/goals → done │     │  from PR body → task done   │
│  Phase 2: Updates product docs  │     └─────────────────────────────┘
│           if needed             │
└──────────────────────────────────┘
```

Both merge workflows fire in parallel. `pr-merged.yml` is fast and deterministic (regex). `auto-complete-tasks.yml` is smarter (AI-powered) and also handles direct pushes, untracked work, goal updates, and docs maintenance.

### Scripts Reference

| Script | Called by | Purpose |
|--------|-----------|---------|
| `scripts/auto-complete-tasks.js` | `auto-complete-tasks.yml` | AI analysis of commits → complete tasks/goals, create untracked tasks, update docs |
| `scripts/fetch-automation-config.js` | `process-feedback.yml` | Read eval prompt, max tasks, allowed tools from `tc_automation_config` |
| `scripts/fetch-feedback-tasks.js` | `process-feedback.yml` | Query pending `automation-pending` tasks from app workspace |
| `scripts/update-task-status.js` | `process-feedback.yml` | Update task status + tags after Claude Code processing, log Tao trace, run eval |
| `scripts/update-task-pr.js` | `process-feedback.yml` | Store PR URL/number in task's `technicalNotes`, add `pr-pending` tag |
| `scripts/complete-task-on-merge.js` | `pr-merged.yml` | Parse `Task-ID:` from PR body, move task to done |
| `scripts/taoLogger.js` | `update-task-status.js` | Log automation trace to Tao `/ingest` endpoint |
| `scripts/taoEvaluator.js` | `update-task-status.js` | Evaluate trace via Tao judge prompt, return score/category/reasoning |

### Required GitHub Secrets

| Secret | Used by | Purpose |
|--------|---------|---------|
| `SUPABASE_URL` | All workflows | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | All workflows | Supabase service role key (bypasses RLS) |
| `ANTHROPIC_API_KEY` | `process-feedback`, `auto-complete-tasks` | Claude API access |
| `GITHUB_TOKEN` | `process-feedback`, `auto-complete-tasks` | Create PRs and push commits |
| `TAO_API_URL` | `process-feedback` (optional) | Tao observability endpoint |
| `TAO_API_KEY` | `process-feedback` (optional) | Tao API authentication |
| `TAO_JUDGE_PROMPT_ID` | `process-feedback` (optional) | Tao evaluation judge prompt |

---

## Tao Data Integration

TaskCrush integrates with [Tao Data](https://taodata.io) for AI observability, trace logging, and automated quality evaluation.

### What Gets Logged

**Chat traces** (every AI chat interaction):
- User message (input)
- AI response (output)
- Success/error status
- Response latency
- Workspace and tools used
- User ID

**Automation traces** (every automation pipeline run):
- Task details (input)
- Processing result (output)
- Success/skipped/error status
- Execution latency
- Metadata: has_changes, pr_created, allowed_tools

### Tao Evaluation Loop

After automation runs complete, traces are evaluated by a Tao judge prompt.

**How it works:**
1. `taoLogger.js` logs the automation trace to Tao `/ingest` and returns the trace UUID
2. `taoEvaluator.js` calls Tao `/evaluate` with the trace ID and a judge prompt
3. The judge scores the automation on **correctness, code quality, security, and completeness** (1-5 scale)
4. Evaluation results are appended to the task notes with tags like `eval:good`, `eval-score:4`
5. **If score is 2 or below**, a remediation task is automatically created with `automation-remediation` tag and high priority

**Evaluation fields:**
| Field | Description |
|-------|-------------|
| `score` | 1-5 quality score |
| `category` | Result category (e.g., "good", "needs_improvement", "poor") |
| `reasoning` | Judge's explanation |
| `confidence` | Confidence level in the evaluation |

### Technical Details

- Chat tracing: `backend/taoClient.js` - fire-and-forget, never blocks responses
- Automation tracing: `scripts/taoLogger.js` - returns trace UUID for evaluation
- Evaluation: `scripts/taoEvaluator.js` - 30-second timeout, non-blocking
- Task update: `scripts/update-task-status.js` - orchestrates trace -> evaluate -> update -> remediate

---

## User Roles & Permissions

### Role Hierarchy

| Role | Access |
|------|--------|
| `user` | Personal and Work workspaces only |
| `admin` | Above + Admin Dashboard |
| `super_admin` | Above + App workspace (shared) + Automation Control Panel + View As User + Trigger automation |

### How Shared Workspaces Work

The App workspace is a **truly shared** workspace:
- All super_admins see the **same** tasks and goals (no user_id filtering)
- Any super_admin can create, edit, or delete items
- The `user_id` field records who created it (for audit) but doesn't restrict access
- Personal and Work workspaces remain strictly private (user_id filtered)

### Impersonation

Super_admins can "View As" any user to see the app from their perspective. This is useful for debugging and support. An impersonation banner appears at the top of the page when active.

---

## Data & Security

### Data Isolation

- All personal/work data is filtered by `user_id` at the API level
- App workspace data requires `super_admin` role verification
- localStorage cache keys include user ID to prevent cross-user leakage
- API key hashes are stored (not plaintext keys)

### Authentication

- **JWT tokens** via Supabase Auth (primary)
- **API keys** with `tc_` prefix (programmatic access)
- Both methods supported on all endpoints

### Database

All tables use the `tc_` prefix:
- `tc_tasks` - Tasks across all workspaces
- `tc_goals` - Goals across all workspaces
- `tc_chat_messages` - Chat history per workspace
- `tc_user_preferences` - User profiles, roles, preferences
- `tc_activity_feedback` - Activity suggestion feedback
- `tc_activity_preferences` - Category boost levels
- `tc_api_keys` - API key hashes and metadata
- `tc_automation_config` - Automation pipeline settings
