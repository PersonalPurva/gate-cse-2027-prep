# GATE CSE 2027 Prep System

An offline mock-test and practice system for GATE CS/IT 2027, built from the official 2027 syllabus, with a self-study plan and targets.

## How to open it
Double-click **`index.html`**. It opens in Chrome or Edge and works fully offline, with no installation.
Your progress is saved in that browser. Use **Settings → Export progress** to back it up or move it to another computer.

## What's inside
| Section | What it does |
|---|---|
| **Dashboard** | Countdown, this week's topics, today's target, subject mastery (weak/strong), recent test scores, backlog warning |
| **Study Plan** | 20-week roadmap (22 Sep 2026 → exam). Tick tasks off. Stretches to fit if you change the exam date. |
| **Practice** | Learning mode: filter by subject, marks, type, and choose Not attempted, My mistakes or Bookmarked. Shows the answer and explanation immediately. |
| **Mock Tests** | Full GATE-pattern papers (65 Q / 100 marks / 180 min) in a GATE-style CBT interface: question palette, Save & Next, Mark for Review, on-screen calculator, negative marking and auto-submit. Also custom timed subject tests. |
| **Analysis** | Score vs target, subject-wise marks, time per question and subject, and a full solution review |
| **Daily Log** | Hours and PYQs per day, streak, 14-day chart against your target |

## Question bank
201 original GATE-style questions (MCQ, MSQ and NAT), each with a worked explanation:
GA 30 · Discrete Maths 12 · Engineering Maths 14 · Digital Logic 12 · COA 15 · PDS 21 · Algorithms 19 · TOC 19 · Compiler Design 13 · OS 15 · DBMS 15 · CN 16.

**Mock 1, Mock 2 and Mock 3 share no questions.** Each follows the real blueprint (GA 15 marks + CS 85 marks).
The **Random Mock** picks the questions you have seen least.

These questions are for checking yourself. For volume, also solve the **previous-year GATE questions** topic by topic (GATE Overflow, official IIT papers).

## Adding your own questions
Open the file for the subject in `questions/` and **append at the end** (progress is stored against question order):
```js
Q('OS','Deadlock',2,'MCQ','Question text (HTML allowed)', ['opt A','opt B','opt C','opt D'], 1, 'Explanation');
Q('CN','Subnetting',1,'NAT','Question text', null, [62,62], 'Explanation');      // NAT: [min,max]
Q('DB','Transactions',2,'MSQ','Question text', ['A','B','C','D'], [0,2], 'Explanation'); // MSQ: indices
```
Subject codes: GA, DM, EM, DL, COA, PDS, ALG, TOC, CD, OS, DB, CN.

## Files
- `index.html`, `app.js`, `style.css`: the app
- `plan.js`: the study plan (edit the topics and tasks here if you like)
- `questions/*.js`: the question bank
- `Study_Plan.md`: printable version of the plan and targets
