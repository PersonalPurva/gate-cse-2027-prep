(function () {
'use strict';

// ======================= state =======================
var KEY = 'gate27_progress_v1';
var BLUEPRINT = { GA: [5, 5], DM: [2, 2], EM: [2, 2], DL: [2, 2], COA: [2, 3], PDS: [3, 4], ALG: [3, 3], TOC: [3, 3], CD: [2, 2], OS: [2, 3], DB: [2, 3], CN: [2, 3] };
var LET = 'ABCDEFGH';
var QMAP = {};
QB.forEach(function (q) { QMAP[q.id] = q; });
var SUBJ_KEYS = Object.keys(SUBJECTS);

function defaults() {
  return {
    settings: { name: 'Candidate', start: PLAN_DEFAULTS.start, exam: PLAN_DEFAULTS.exam, weeklyHours: PLAN_DEFAULTS.weeklyHours, theme: 'auto' },
    plan: {}, stats: {}, attempts: [], log: {}, bookmarks: {}, exam: null
  };
}
var S;
try { S = JSON.parse(localStorage.getItem(KEY)) || defaults(); } catch (e) { S = defaults(); }
S = Object.assign(defaults(), S);
S.settings = Object.assign(defaults().settings, S.settings);
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full or blocked */ } }

// ======================= helpers =======================
var app = document.getElementById('app');
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function parseDate(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function fmt(d) { return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); }
function fmtY(d) { return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
function daysBetween(a, b) { return Math.round((b - a) / 864e5); }
function pct(x) { return x == null ? '—' : Math.round(x * 100) + '%'; }
function r2(x) { return Math.round(x * 100) / 100; }
function mmss(sec) { sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + 'm ' + String(s).padStart(2, '0') + 's'; }
function hms(sec) { sec = Math.max(0, Math.floor(sec)); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rng) { rng = rng || Math.random; for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
function clone(v) { return v == null ? null : JSON.parse(JSON.stringify(v)); }
function applyTheme() {
  var t = S.settings.theme;
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

// ======================= scoring =======================
function hasAns(q, r) {
  if (r == null) return false;
  if (q.type === 'MSQ') return Array.isArray(r) && r.length > 0;
  if (q.type === 'NAT') return String(r).trim() !== '' && !isNaN(parseFloat(r));
  return typeof r === 'number';
}
function evaluate(q, r) {
  if (!hasAns(q, r)) return { st: 'na', marks: 0 };
  var ok;
  if (q.type === 'MCQ') ok = r === q.a;
  else if (q.type === 'MSQ') ok = r.slice().sort().join() === q.a.slice().sort().join();
  else { var v = parseFloat(r); ok = v >= q.a[0] - 1e-9 && v <= q.a[1] + 1e-9; }
  if (ok) return { st: 'c', marks: q.m };
  return { st: 'w', marks: q.type === 'MCQ' ? -q.m / 3 : 0 };
}
function fmtAns(q, r) {
  if (!hasAns(q, r)) return '—';
  if (q.type === 'MCQ') return LET[r];
  if (q.type === 'MSQ') return r.slice().sort().map(function (i) { return LET[i]; }).join(', ');
  return esc(r);
}
function correctAns(q) {
  if (q.type === 'MCQ') return LET[q.a];
  if (q.type === 'MSQ') return q.a.slice().sort().map(function (i) { return LET[i]; }).join(', ');
  return q.a[0] === q.a[1] ? String(q.a[0]) : q.a[0] + ' to ' + q.a[1];
}
function negText(q) { return q.type === 'MCQ' ? '−' + (q.m === 1 ? '1/3' : '2/3') : 'No negative'; }
function recordAnswer(id, ok) {
  var s = S.stats[id] || (S.stats[id] = { n: 0, c: 0, last: 0 });
  s.n++; if (ok) s.c++; s.last = ok ? 1 : 0; s.t = Date.now();
}
function subjStats(sub) {
  var total = 0, att = 0, ok = 0;
  QB.forEach(function (q) { if (q.s !== sub) return; total++; var s = S.stats[q.id]; if (s) { att++; if (s.last) ok++; } });
  return { total: total, att: att, ok: ok, acc: att ? ok / att : null };
}
function overallStats() {
  var att = 0, ok = 0;
  QB.forEach(function (q) { var s = S.stats[q.id]; if (s) { att++; if (s.last) ok++; } });
  return { att: att, ok: ok, acc: att ? ok / att : null };
}

// ======================= question rendering =======================
// mode: 'live' (interactive) | 'review' (show correct/wrong, disabled)
function qBody(q, resp, mode, name) {
  var h = '<div class="qtext">' + q.q + '</div>';
  if (q.type === 'NAT') {
    var v = resp == null ? '' : esc(resp);
    h += '<div class="row"><input class="nat" type="text" inputmode="decimal" autocomplete="off" data-nat="1" value="' + v + '" ' + (mode === 'review' ? 'disabled' : '') + ' placeholder="Enter numeric answer"></div>';
    if (mode === 'live') h += '<div class="hint" style="margin-top:6px">Numerical Answer Type: type a number (integer or decimal). No options.</div>';
    return h;
  }
  var multi = q.type === 'MSQ';
  q.o.forEach(function (o, i) {
    var checked = multi ? (Array.isArray(resp) && resp.indexOf(i) >= 0) : resp === i;
    var cls = 'opt';
    if (mode === 'review') {
      var isCorrect = multi ? q.a.indexOf(i) >= 0 : q.a === i;
      if (isCorrect) cls += ' correct'; else if (checked) cls += ' wrong';
    }
    h += '<label class="' + cls + '"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + name + '" value="' + i + '" ' + (checked ? 'checked' : '') + ' ' + (mode === 'review' ? 'disabled' : '') + '><span class="ol">' + LET[i] + '.</span><span>' + o + '</span></label>';
  });
  return h;
}
function readResp(q, root) {
  if (q.type === 'NAT') { var inp = root.querySelector('[data-nat]'); var v = inp ? inp.value.trim() : ''; return v === '' ? null : v; }
  var boxes = [].slice.call(root.querySelectorAll('input[type=radio]:checked, input[type=checkbox]:checked')).map(function (x) { return +x.value; });
  if (q.type === 'MSQ') return boxes.length ? boxes : null;
  return boxes.length ? boxes[0] : null;
}
function metaPills(q) {
  return '<span class="pill">' + esc(SUBJECTS[q.s]) + '</span><span class="pill grey">' + esc(q.t) + '</span><span class="pill grey">' + q.type + '</span><span class="pill grey">' + q.m + ' mark' + (q.m > 1 ? 's' : '') + '</span>';
}

// ======================= plan schedule =======================
function schedule() {
  var st = parseDate(S.settings.start), ex = parseDate(S.settings.exam);
  var n = PLAN.length, len = Math.max(7, Math.floor(daysBetween(st, ex) / n));
  return PLAN.map(function (w, i) {
    var from = addDays(st, i * len), to = addDays(from, len - 1);
    if (i === n - 1 && ex > to) to = ex;
    return Object.assign({}, w, { i: i, from: from, to: to, len: len });
  });
}
function blockLabel(w) { return (w.len === 7 ? 'Week ' : 'Block ') + (w.i + 1); }
function currentIdx(sch) {
  var t = today();
  if (t < sch[0].from) return 0;
  for (var i = 0; i < sch.length; i++) if (t >= sch[i].from && t <= sch[i].to) return i;
  return sch.length - 1;
}
function taskKey(wi, ti) { return wi + '.' + ti; }
function weekProgress(w) {
  var d = 0; w.tasks.forEach(function (_, ti) { if (S.plan[taskKey(w.i, ti)]) d++; });
  return { done: d, total: w.tasks.length };
}
function planProgress() {
  var d = 0, t = 0; schedule().forEach(function (w) { var p = weekProgress(w); d += p.done; t += p.total; });
  return { done: d, total: t };
}
function backlog(sch) {
  var t = today(), n = 0;
  sch.forEach(function (w) { if (w.to < t) { var p = weekProgress(w); n += p.total - p.done; } });
  return n;
}

// ======================= log helpers =======================
function streak() {
  var d = today(), n = 0;
  if (!(S.log[iso(d)] && S.log[iso(d)].h > 0)) d = addDays(d, -1); // today not logged yet doesn't break streak
  while (S.log[iso(d)] && S.log[iso(d)].h > 0) { n++; d = addDays(d, -1); }
  return n;
}
function hoursLast7() { var s = 0; for (var i = 0; i < 7; i++) { var e = S.log[iso(addDays(today(), -i))]; if (e) s += +e.h || 0; } return s; }

// ======================= shell & router =======================
var NAV = [['dashboard', 'Dashboard'], ['plan', 'Study Plan'], ['practice', 'Practice'], ['mocks', 'Mock Tests'], ['log', 'Daily Log'], ['settings', 'Settings']];
function shell(page) {
  var days = daysBetween(today(), parseDate(S.settings.exam));
  var nav = NAV.map(function (n) { return '<a href="#' + n[0] + '" class="' + (page === n[0] ? 'on' : '') + '">' + n[1] + '</a>'; }).join('');
  var banner = '';
  if (S.exam) banner = '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)"><div class="row"><b>A test is in progress: ' + esc(S.exam.name) + '</b><span class="muted small">(the timer keeps running)</span><span class="spacer"></span><a class="btn" href="#exam">Resume test</a></div></div>';
  app.innerHTML = '<header class="topbar"><div class="logo">GATE CSE 2027</div><nav>' + nav + '</nav><div class="countdown">' + (days >= 0 ? days + ' days to exam' : 'Exam date passed') + '</div></header><main>' + banner + '<div id="view"></div></main>';
  return document.getElementById('view');
}
function route() {
  applyTheme();
  var h = (location.hash.slice(1) || 'dashboard').split('/');
  var page = h[0], arg = h[1];
  if (page === 'exam') { if (!S.exam) { location.hash = 'mocks'; return; } renderExam(); return; }
  stopTimer();
  document.body.classList.remove('examMode');
  var v = shell(page);
  var fn = { dashboard: viewDashboard, plan: viewPlan, practice: viewPractice, mocks: viewMocks, log: viewLog, settings: viewSettings, result: viewResult }[page] || viewDashboard;
  fn(v, arg);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

// ======================= dashboard =======================
function viewDashboard(v) {
  var sch = schedule(), ci = currentIdx(sch), w = sch[ci], wp = weekProgress(w);
  var pp = planProgress(), os = overallStats(), bl = backlog(sch);
  var days = daysBetween(today(), parseDate(S.settings.exam));
  var mocks = S.attempts.filter(function (a) { return a.kind === 'mock'; });
  var best = mocks.reduce(function (m, a) { return Math.max(m, a.score); }, -Infinity);
  var dow = new Date().getDay();
  var routine = dow === 0 ? DAILY_ROUTINE[2] : dow === 6 ? DAILY_ROUTINE[1] : DAILY_ROUTINE[0];
  var notStarted = today() < sch[0].from;

  var h = '<h1>Hello, ' + esc(S.settings.name) + '</h1><p class="sub">' + (days >= 0 ? '<b>' + days + ' days</b> left until GATE CSE 2027 (' + fmtY(parseDate(S.settings.exam)) + '). You can change this date in Settings.' : 'The exam date has passed. Update it in Settings.') + '</p>';
  if (bl > 0) h += '<div class="card" style="border-color:var(--bad);background:var(--bad-soft)"><b>Backlog: ' + bl + ' task' + (bl > 1 ? 's' : '') + '</b> from earlier weeks are unchecked. Clear them this weekend, or use the Buffer week. <a href="#plan">Open plan →</a></div>';

  h += '<div class="grid g2"><div class="card"><div class="row"><h2 style="margin:0">' + (notStarted ? 'Starts ' + fmt(sch[0].from) + ': ' : 'This ' + (w.len === 7 ? 'week' : 'block') + ': ') + esc(blockLabel(w)) + ', ' + esc(w.title) + '</h2></div>'
    + '<p class="muted small" style="margin:4px 0 10px">' + fmt(w.from) + ' – ' + fmt(w.to) + ' · ' + wp.done + '/' + wp.total + ' tasks done</p>'
    + '<div class="bar"><i style="width:' + (wp.total ? wp.done / wp.total * 100 : 0) + '%"></i></div>'
    + '<h3 style="margin-top:14px">Topics to finish</h3><ul class="clean">' + w.topics.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
    + '<div class="row" style="margin-top:10px"><a class="btn" href="#plan">Tick off tasks</a><button class="btn ghost" data-act="practiceWeek" data-w="' + ci + '">Practise this week\'s subjects</button></div></div>'
    + '<div class="card"><h2>Today\'s target</h2><p>' + esc(routine) + '</p><p class="small muted">' + esc(DAILY_ROUTINE[3]) + '</p>'
    + '<p class="small">Target this week: <b>' + S.settings.weeklyHours + ' h</b> of study. You have logged <b>' + r2(hoursLast7()) + ' h</b> in the last 7 days.</p>'
    + '<a class="btn ghost" href="#log">Log today\'s study</a></div></div>';

  h += '<div class="grid g4" style="margin-bottom:16px">'
    + tile('Plan completed', Math.round(pp.total ? pp.done / pp.total * 100 : 0) + '%', pp.done + ' of ' + pp.total + ' tasks')
    + tile('Questions practised', os.att + ' / ' + QB.length, 'unique questions attempted')
    + tile('Current accuracy', pct(os.acc), 'based on your latest attempt at each question')
    + tile('Full mocks taken', mocks.length, mocks.length ? 'best: ' + r2(best) + ' / 100' : 'first mock in Week 18')
    + tile('Study streak', streak() + ' day' + (streak() === 1 ? '' : 's'), 'from the Daily Log')
    + '</div>';

  h += '<div class="card"><h2>Subject mastery</h2><p class="muted small">Aim for at least 70% on every subject before moving on. Anything below 50% counts as a weak area.</p><div class="tablewrap"><table><thead><tr><th>Subject</th><th class="num">Attempted</th><th style="width:35%">Accuracy</th><th>Status</th><th></th></tr></thead><tbody>';
  SUBJ_KEYS.forEach(function (k) {
    var s = subjStats(k), cls = s.acc == null ? '' : s.acc >= 0.7 ? 'ok' : s.acc >= 0.5 ? 'warn' : 'bad';
    var pill = s.acc == null ? '<span class="pill grey">Not started</span>' : s.acc >= 0.7 ? '<span class="pill ok">Strong</span>' : s.acc >= 0.5 ? '<span class="pill warn">Needs work</span>' : '<span class="pill bad">Weak</span>';
    h += '<tr><td>' + esc(SUBJECTS[k]) + '</td><td class="num">' + s.att + ' / ' + s.total + '</td><td><div class="row" style="flex-wrap:nowrap"><div class="bar ' + cls + '" style="flex:1"><i style="width:' + (s.acc == null ? 0 : s.acc * 100) + '%"></i></div><span class="small" style="width:40px;text-align:right">' + pct(s.acc) + '</span></div></td><td>' + pill + '</td><td><button class="btn sm ghost" data-act="practiceSubj" data-s="' + k + '">Practise</button></td></tr>';
  });
  h += '</tbody></table></div></div>';

  if (S.attempts.length) {
    h += '<div class="card"><h2>Recent tests</h2>' + attemptsTable(S.attempts.slice(-5).reverse()) + '</div>';
  }
  v.innerHTML = h;
}
function tile(k, val, hint) { return '<div class="tile"><div class="k">' + k + '</div><div class="v">' + val + '</div><div class="h">' + hint + '</div></div>'; }
function attemptsTable(list) {
  return '<div class="tablewrap"><table><thead><tr><th>Date</th><th>Test</th><th class="num">Score</th><th class="num">Target</th><th class="num">Correct / Wrong / Skipped</th><th class="num">Time used</th><th></th></tr></thead><tbody>'
    + list.map(function (a) {
      var tgt = MOCK_TARGETS[a.name];
      var sc = r2(a.score) + ' / ' + a.max;
      var met = tgt != null ? (a.score >= tgt ? '<span class="pill ok">' + tgt + ' ✓</span>' : '<span class="pill bad">' + tgt + '</span>') : '—';
      return '<tr><td>' + fmtY(new Date(a.date)) + '</td><td>' + esc(a.name) + '</td><td class="num"><b>' + sc + '</b></td><td class="num">' + met + '</td><td class="num">' + a.correct + ' / ' + a.wrong + ' / ' + a.na + '</td><td class="num">' + mmss(a.duration) + '</td><td><a class="btn sm ghost" href="#result/' + a.id + '">Analysis</a></td></tr>';
    }).join('') + '</tbody></table></div>';
}

// ======================= study plan =======================
function viewPlan(v) {
  var sch = schedule(), ci = currentIdx(sch), pp = planProgress(), t = today();
  var h = '<h1>Study Plan</h1><p class="sub">A ' + sch.length + '-' + (sch[0].len === 7 ? 'week' : 'block') + ' self-study roadmap from ' + fmtY(sch[0].from) + ' to the exam on ' + fmtY(parseDate(S.settings.exam)) + '. Tick tasks off as you finish them. Your progress is saved in this browser.</p>';
  h += '<div class="card"><div class="row"><b>Overall progress</b><span class="spacer"></span><span>' + pp.done + ' / ' + pp.total + ' tasks</span></div><div class="bar ok" style="margin-top:8px"><i style="width:' + (pp.total ? pp.done / pp.total * 100 : 0) + '%"></i></div>'
    + '<h3 style="margin-top:16px">Daily routine</h3><ul class="clean">' + DAILY_ROUTINE.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>'
    + '<h3 style="margin-top:12px">Rules for moving on</h3><ul class="clean"><li>Only move to the next week when that week\'s subject is at 70% or more accuracy in Practice.</li><li>Solve the <b>previous-year GATE questions</b> for every topic (free: GATE Overflow, official IIT papers). The questions in this app are for checking yourself; PYQs give you volume.</li><li>If you fall behind, use the Week 10 buffer. Do not skip Revision weeks 18–19.</li></ul></div>';
  sch.forEach(function (w) {
    var p = weekProgress(w), past = w.to < t, cur = w.i === ci;
    var status = p.done === p.total ? '<span class="pill ok">Done</span>' : cur ? '<span class="pill">Current</span>' : past ? '<span class="pill bad">' + (p.total - p.done) + ' pending</span>' : '<span class="pill grey">Upcoming</span>';
    var acc = w.subjects.length <= 3 ? w.subjects.map(function (s) { var st = subjStats(s); return '<span class="pill ' + (st.acc == null ? 'grey' : st.acc >= 0.7 ? 'ok' : st.acc >= 0.5 ? 'warn' : 'bad') + '">' + s + ' ' + pct(st.acc) + '</span>'; }).join(' ') : '';
    h += '<details class="week' + (cur ? ' current' : '') + '"' + (cur ? ' open' : '') + '><summary><span class="wn">' + blockLabel(w) + '</span><b style="flex:1;min-width:180px">' + esc(w.title) + '</b><span class="muted small">' + fmt(w.from) + ' – ' + fmt(w.to) + '</span>' + acc + status + '<span class="small muted">' + p.done + '/' + p.total + '</span></summary><div class="body">'
      + '<div class="grid g2" style="margin-top:10px"><div><h3>Topics</h3><ul class="clean">' + w.topics.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div><div><h3>Tasks</h3>'
      + w.tasks.map(function (x, ti) { var k = taskKey(w.i, ti), d = !!S.plan[k]; return '<label class="task' + (d ? ' done' : '') + '"><input type="checkbox" data-task="' + k + '" ' + (d ? 'checked' : '') + '><span>' + esc(x) + '</span></label>'; }).join('')
      + '</div></div><div class="row" style="margin-top:8px"><button class="btn sm ghost" data-act="practiceWeek" data-w="' + w.i + '">Practise ' + esc(w.subjects.length > 3 ? 'all subjects' : w.subjects.join(', ')) + '</button></div></div></details>';
  });
  v.innerHTML = h;
}

// ======================= practice =======================
var P = null; // practice session
var practicePreset = null;
function viewPractice(v) {
  if (P) return drawPractice(v);
  var pre = practicePreset || { subjects: SUBJ_KEYS.slice(1), source: 'unattempted' };
  practicePreset = null;
  var h = '<h1>Practice</h1><p class="sub">Answer one question at a time in learning mode. You get the correct answer and a full explanation straight away. For timed, exam-style tests, use <a href="#mocks">Mock Tests</a>.</p><div class="card"><h2>Choose questions</h2>'
    + '<div class="field"><span>Subjects</span><div>' + SUBJ_KEYS.map(function (k) { var s = subjStats(k); return '<label class="chk"><input type="checkbox" name="ps" value="' + k + '" ' + (pre.subjects.indexOf(k) >= 0 ? 'checked' : '') + '>' + esc(SUBJECTS[k]) + ' <span class="muted small">(' + s.att + '/' + s.total + ')</span></label>'; }).join('')
    + '</div><div class="row small" style="margin-top:4px"><a href="javascript:void 0" data-act="psAll">Select all</a><a href="javascript:void 0" data-act="psNone">Clear</a></div></div>'
    + '<div class="grid g4">'
    + sel('Which questions', 'psrc', [['all', 'All'], ['unattempted', 'Not attempted yet'], ['mistakes', 'My mistakes'], ['bookmarked', 'Bookmarked']], pre.source)
    + sel('Marks', 'pm', [['any', 'Any'], ['1', '1 mark'], ['2', '2 marks']], 'any')
    + sel('Type', 'pt', [['any', 'Any'], ['MCQ', 'MCQ'], ['MSQ', 'MSQ'], ['NAT', 'NAT']], 'any')
    + sel('How many', 'pn', [['10', '10'], ['20', '20'], ['40', '40'], ['9999', 'All matching']], '10')
    + '</div><button class="btn" data-act="startPractice">Start practice</button></div>';
  v.innerHTML = h;
}
function sel(label, id, opts, val) {
  return '<label class="field"><span>' + label + '</span><select id="' + id + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === val ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>';
}
function startPractice() {
  var subs = [].slice.call(document.querySelectorAll('input[name=ps]:checked')).map(function (x) { return x.value; });
  var src = document.getElementById('psrc').value, m = document.getElementById('pm').value, t = document.getElementById('pt').value, n = +document.getElementById('pn').value;
  var pool = QB.filter(function (q) {
    if (subs.indexOf(q.s) < 0) return false;
    if (m !== 'any' && q.m !== +m) return false;
    if (t !== 'any' && q.type !== t) return false;
    var st = S.stats[q.id];
    if (src === 'unattempted' && st) return false;
    if (src === 'mistakes' && !(st && st.last === 0)) return false;
    if (src === 'bookmarked' && !S.bookmarks[q.id]) return false;
    return true;
  });
  if (!pool.length) { alert(src === 'unattempted' ? 'You have attempted every question that matches these filters. Choose "All" or "My mistakes".' : 'No questions match these filters.'); return; }
  P = { ids: shuffle(pool.map(function (q) { return q.id; })).slice(0, n), i: 0, res: {}, checked: false };
  route();
}
function startPracticeWith(subjects, source) {
  practicePreset = { subjects: subjects, source: source || 'unattempted' };
  P = null;
  if (location.hash === '#practice') route(); else location.hash = 'practice';
}
function drawPractice(v) {
  v = v || document.getElementById('view');
  if (P.i >= P.ids.length) return practiceSummary(v);
  var q = QMAP[P.ids[P.i]], done = P.res[q.id];
  var h = '<div class="row"><h1 style="margin:0">Practice</h1><span class="spacer"></span><span class="muted">Question ' + (P.i + 1) + ' of ' + P.ids.length + '</span><button class="btn sm ghost" data-act="endPractice">End session</button></div>'
    + '<div class="bar" style="margin:10px 0 16px"><i style="width:' + (P.i / P.ids.length * 100) + '%"></i></div>'
    + '<div class="card" id="pq"><div class="row"><div class="meta">' + metaPills(q) + '</div><span class="spacer"></span><button class="btn sm ghost" data-act="bookmark" data-id="' + q.id + '">' + (S.bookmarks[q.id] ? '★ Bookmarked' : '☆ Bookmark') + '</button></div>'
    + qBody(q, done ? done.resp : null, done ? 'review' : 'live', 'pq');
  if (done) {
    h += '<div class="verdict ' + (done.ok ? 'ok' : 'bad') + '">' + (done.ok ? '✓ Correct' : done.resp == null ? 'Skipped' : '✗ Incorrect') + '</div>'
      + '<div class="small">Your answer: <b>' + fmtAns(q, done.resp) + '</b> · Correct answer: <b>' + correctAns(q) + '</b></div>'
      + '<div class="expl"><b>Explanation.</b> ' + q.e + '</div>'
      + '<div class="row" style="margin-top:14px"><button class="btn" data-act="nextPractice">' + (P.i + 1 < P.ids.length ? 'Next question →' : 'See summary') + '</button></div>';
  } else {
    h += '<div class="row" style="margin-top:14px"><button class="btn" data-act="checkPractice">Check answer</button><button class="btn ghost" data-act="skipPractice">Skip and show solution</button></div>';
  }
  v.innerHTML = h + '</div>';
}
function checkPractice(skip) {
  var q = QMAP[P.ids[P.i]];
  var r = skip ? null : readResp(q, document.getElementById('pq'));
  if (!skip && !hasAns(q, r)) { alert('Pick or type an answer first, or choose "Skip and show solution".'); return; }
  var ev = evaluate(q, r), ok = ev.st === 'c';
  P.res[q.id] = { resp: r, ok: ok };
  recordAnswer(q.id, ok); save();
  drawPractice();
}
function practiceSummary(v) {
  var ids = P.ids.filter(function (id) { return P.res[id]; });
  var ok = ids.filter(function (id) { return P.res[id].ok; }).length;
  var wrong = ids.filter(function (id) { return !P.res[id].ok; });
  var h = '<h1>Session summary</h1><div class="grid g4" style="margin:14px 0">' + tile('Answered', ids.length, 'questions') + tile('Correct', ok, pct(ids.length ? ok / ids.length : null) + ' accuracy') + tile('To review', wrong.length, 'wrong or skipped') + '</div>'
    + '<div class="card"><div class="tablewrap"><table><thead><tr><th>#</th><th>Subject</th><th>Topic</th><th>Result</th></tr></thead><tbody>'
    + ids.map(function (id, i) { var q = QMAP[id]; return '<tr><td>' + (i + 1) + '</td><td>' + esc(SUBJECTS[q.s]) + '</td><td>' + esc(q.t) + '</td><td>' + (P.res[id].ok ? '<span class="pill ok">Correct</span>' : '<span class="pill bad">Wrong / skipped</span>') + '</td></tr>'; }).join('')
    + '</tbody></table></div><div class="row" style="margin-top:14px">' + (wrong.length ? '<button class="btn" data-act="redoWrong">Retry the ' + wrong.length + ' I got wrong</button>' : '') + '<button class="btn ghost" data-act="endPractice">New practice session</button></div></div>';
  v.innerHTML = h;
}

// ======================= mocks =======================
function viewMocks(v) {
  var byName = {};
  S.attempts.forEach(function (a) { if (!byName[a.name] || a.score > byName[a.name]) byName[a.name] = a.score; });
  function card(name, key, desc) {
    var tgt = MOCK_TARGETS[name], b = byName[name];
    return '<div class="tile"><h3>' + name + '</h3><p class="small muted" style="min-height:40px">' + desc + '</p><p class="small">Target: <b>' + tgt + '+</b> · Best: <b>' + (b == null ? '—' : r2(b)) + '</b></p><button class="btn" data-act="startMock" data-k="' + key + '"' + (S.exam ? ' disabled' : '') + '>Start</button></div>';
  }
  var h = '<h1>Mock Tests</h1><p class="sub">Full-length tests with the same pattern and interface as the real GATE CBT: 65 questions, 100 marks, 3 hours.</p>'
    + '<div class="card"><h2>Exam pattern and marking</h2><div class="grid g2"><ul class="clean">'
    + '<li><b>General Aptitude:</b> 10 questions (5 × 1 mark + 5 × 2 marks) = 15 marks</li>'
    + '<li><b>Computer Science & IT:</b> 55 questions (25 × 1 mark + 30 × 2 marks) = 85 marks (Engineering Maths is about 13 of these)</li>'
    + '<li><b>Duration:</b> 180 minutes. The test submits itself when time runs out.</li></ul><ul class="clean">'
    + '<li><b>MCQ:</b> one correct option. A wrong answer costs <b>1/3</b> mark (1-mark questions) or <b>2/3</b> mark (2-mark questions).</li>'
    + '<li><b>MSQ:</b> one or more correct options. You score only if you select exactly the right set. No negative marks.</li>'
    + '<li><b>NAT:</b> type a numeric answer. No negative marks.</li>'
    + '<li>As in the real exam, an answer counts only after <b>Save &amp; Next</b> or <b>Mark for Review &amp; Next</b>.</li></ul></div></div>'
    + '<div class="grid g4" style="margin-bottom:16px">'
    + card('Mock 1', '0', 'A fixed paper covering the whole syllabus. Planned for Week 18.')
    + card('Mock 2', '1', 'A fixed paper with no questions shared with Mock 1. Planned for Week 18.')
    + card('Mock 3', '2', 'A fixed paper with no questions shared with Mocks 1 and 2. Planned for Week 19.')
    + card('Random Mock', 'r', 'Drawn from the whole bank with the same blueprint, using questions you have seen least first.')
    + '</div>'
    + '<div class="card"><h2>Custom timed test</h2><p class="muted small">Use this for the Sunday weekly tests. It runs in the same exam interface, with about 2.8 minutes per question (the real GATE pace).</p>'
    + '<div class="field"><span>Subjects</span><div>' + SUBJ_KEYS.map(function (k) { return '<label class="chk"><input type="checkbox" name="cs" value="' + k + '">' + esc(SUBJECTS[k]) + '</label>'; }).join('') + '</div></div>'
    + '<div class="row">' + sel('Questions', 'cn', [['10', '10'], ['15', '15'], ['20', '20'], ['30', '30'], ['40', '40']], '15') + '<button class="btn" data-act="startCustom" style="margin-top:8px"' + (S.exam ? ' disabled' : '') + '>Start timed test</button></div></div>';
  h += '<div class="card"><h2>All attempts</h2>' + (S.attempts.length ? attemptsTable(S.attempts.slice().reverse()) : '<p class="muted">You haven\'t taken any tests yet.</p>') + '</div>';
  v.innerHTML = h;
}
function seenCount(q) { var s = S.stats[q.id]; return s ? s.n : 0; }
function buildMock(k) {
  var rng = mulberry32(k >= 0 ? 2027 + k * 97 : Date.now());
  var ga = [], cs1 = [], cs2 = [];
  Object.keys(BLUEPRINT).forEach(function (s) {
    [[1, BLUEPRINT[s][0]], [2, BLUEPRINT[s][1]]].forEach(function (mn) {
      var m = mn[0], n = mn[1];
      var pool = QB.filter(function (q) { return q.s === s && q.m === m; }), pick;
      if (k >= 0) {
        pick = pool.slice(k * n, k * n + n);
        if (pick.length < n) pick = pick.concat(shuffle(pool.filter(function (q) { return pick.indexOf(q) < 0; }), rng).slice(0, n - pick.length));
      } else {
        pick = shuffle(pool.slice(), rng).sort(function (a, b) { return seenCount(a) - seenCount(b); }).slice(0, n);
      }
      (s === 'GA' ? ga : m === 1 ? cs1 : cs2).push.apply(s === 'GA' ? ga : m === 1 ? cs1 : cs2, pick);
    });
  });
  return {
    ids: ga.concat(shuffle(cs1, rng), shuffle(cs2, rng)).map(function (q) { return q.id; }),
    sections: [{ name: 'General Aptitude', from: 0, to: ga.length - 1 }, { name: 'Computer Science & IT', from: ga.length, to: ga.length + 54 }]
  };
}
function confirmStart(name, minutes, n, onGo) {
  modal('<h2>' + esc(name) + '</h2><ul class="clean"><li>' + n + ' questions · ' + minutes + ' minutes</li><li>The timer keeps running if you close the tab. You can resume from this browser.</li><li>Use the question palette to move between questions. Only <b>saved</b> answers are evaluated.</li><li>A calculator is available from the top bar, as in the real GATE.</li></ul>'
    + '<label class="field"><span>Candidate name</span><input type="text" id="cname" value="' + esc(S.settings.name) + '"></label>'
    + '<div class="row"><button class="btn" id="goBtn">I am ready, begin</button><button class="btn ghost" data-act="closeModal">Cancel</button></div>');
  document.getElementById('goBtn').onclick = function () {
    var nm = document.getElementById('cname').value.trim(); if (nm) S.settings.name = nm;
    closeModal(); onGo();
  };
}
function launchExam(name, kind, ids, sections, minutes) {
  var status = ids.map(function () { return 'nv'; }); status[0] = 'na';
  S.exam = { name: name, kind: kind, ids: ids, sections: sections, resp: {}, status: status, spent: ids.map(function () { return 0; }), cur: 0, startAt: Date.now(), endAt: Date.now() + minutes * 60000, minutes: minutes, enterT: Date.now() };
  save(); location.hash = 'exam';
}
function startMock(k) {
  var name = k === 'r' ? 'Random Mock' : 'Mock ' + (+k + 1);
  var b = buildMock(k === 'r' ? -1 : +k);
  confirmStart(name, 180, b.ids.length, function () { launchExam(name, 'mock', b.ids, b.sections, 180); });
}
function startCustom() {
  var subs = [].slice.call(document.querySelectorAll('input[name=cs]:checked')).map(function (x) { return x.value; });
  if (!subs.length) { alert('Choose at least one subject.'); return; }
  var n = +document.getElementById('cn').value;
  var pool = shuffle(QB.filter(function (q) { return subs.indexOf(q.s) >= 0; })).sort(function (a, b) { return seenCount(a) - seenCount(b); }).slice(0, n);
  pool = shuffle(pool);
  var min = Math.max(5, Math.round(pool.length * 2.8));
  var name = 'Test: ' + subs.join(', ');
  confirmStart(name, min, pool.length, function () { launchExam(name, 'custom', pool.map(function (q) { return q.id; }), [{ name: subs.length === 1 ? SUBJECTS[subs[0]] : 'Mixed Subjects', from: 0, to: pool.length - 1 }], min); });
}

// ======================= exam interface =======================
var timerId = null, draft = null, calcOpen = false;
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
function E() { return S.exam; }
function secOf(i) { var ss = E().sections; for (var k = 0; k < ss.length; k++) if (i >= ss[k].from && i <= ss[k].to) return k; return 0; }
function renderExam() {
  var e = E();
  if (Date.now() >= e.endAt) { finishExam(true); return; }
  document.body.classList.add('examMode');
  draft = clone(e.resp[e.cur]);
  e.enterT = Date.now();
  app.innerHTML = '<div class="exam"><div class="exhead"><div><div class="t">GATE 2027 · CS: ' + esc(e.name) + '</div><div class="cand">Candidate: ' + esc(S.settings.name) + '</div></div><span class="spacer"></span>'
    + '<button class="btn sm" style="background:#fff;color:#0d3b73" data-act="ex-calc">Calculator</button><div>Time left: <span class="timer" id="timer">--:--:--</span></div></div>'
    + '<div class="extabs" id="extabs"></div><div class="exbody"><div class="qpane"><div class="qhead" id="qhead"></div><div class="qscroll" id="qscroll"></div>'
    + '<div class="qfoot"><button class="btn purple" data-act="ex-mark">Mark for Review &amp; Next</button><button class="btn ghost" data-act="ex-clear">Clear Response</button><span class="spacer"></span><button class="btn ok" data-act="ex-save">Save &amp; Next</button></div></div>'
    + '<div class="side"><div class="legend" id="legend"></div><div id="secname" style="font-weight:700;margin-bottom:8px"></div><div class="pal" id="pal"></div><div class="row" style="margin-top:16px"><button class="btn bad" style="width:100%" data-act="ex-submit">Submit test</button></div><p class="hint">Tip: moving to another question from the palette without saving throws away the answer you selected, just as in the real exam.</p></div></div></div>'
    + '<div id="calcHost"></div>';
  drawExam();
  tick(); stopTimer(); timerId = setInterval(tick, 1000);
  if (calcOpen) drawCalc();
}
function tick() {
  var e = E(); if (!e) { stopTimer(); return; }
  var left = (e.endAt - Date.now()) / 1000, el = document.getElementById('timer');
  if (el) { el.textContent = hms(left); el.classList.toggle('low', left < 300); }
  if (left <= 0) { stopTimer(); alert('Time is up. Your test is being submitted.'); finishExam(true); }
}
function drawExam() {
  var e = E(), i = e.cur, q = QMAP[e.ids[i]], si = secOf(i), sec = e.sections[si];
  document.getElementById('extabs').innerHTML = e.sections.map(function (s, k) { return '<button class="' + (k === si ? 'on' : '') + '" data-act="ex-sec" data-k="' + k + '">' + esc(s.name) + '</button>'; }).join('');
  document.getElementById('qhead').innerHTML = '<b>Question ' + (i - sec.from + 1) + '</b><span class="pill grey">' + q.type + '</span><span class="pill grey">Marks: +' + q.m + '</span><span class="pill grey">Negative: ' + negText(q) + '</span><span class="spacer"></span><span class="small muted">' + (q.type === 'MSQ' ? 'Select ONE OR MORE options' : q.type === 'MCQ' ? 'Select ONE option' : 'Enter a number') + '</span>';
  var qs = document.getElementById('qscroll');
  qs.innerHTML = qBody(q, draft, 'live', 'exq');
  qs.scrollTop = 0;
  var c = { nv: 0, na: 0, a: 0, m: 0, am: 0 };
  e.status.forEach(function (s) { c[s]++; });
  document.getElementById('legend').innerHTML =
    '<div><span class="pb a lg">' + c.a + '</span>Answered</div><div><span class="pb na lg">' + c.na + '</span>Not Answered</div>'
    + '<div><span class="pb lg">' + c.nv + '</span>Not Visited</div><div><span class="pb m lg">' + c.m + '</span>Marked for Review</div>'
    + '<div style="grid-column:1/-1"><span class="pb am lg">' + c.am + '</span>Answered &amp; Marked (will be evaluated)</div>';
  document.getElementById('secname').textContent = sec.name;
  var p = '';
  for (var k = sec.from; k <= sec.to; k++) p += '<button class="pb ' + (e.status[k] === 'nv' ? '' : e.status[k]) + (k === i ? ' cur' : '') + '" data-act="ex-go" data-i="' + k + '">' + (k - sec.from + 1) + '</button>';
  document.getElementById('pal').innerHTML = p;
}
function accrue() { var e = E(); var now = Date.now(); e.spent[e.cur] += (now - (e.enterT || now)) / 1000; e.enterT = now; }
function exGo(i) {
  var e = E(); accrue();
  e.cur = i; if (e.status[i] === 'nv') e.status[i] = 'na';
  draft = clone(e.resp[i]); save(); drawExam();
}
function exCommit(markReview) {
  var e = E(), q = QMAP[e.ids[e.cur]];
  draft = readResp(q, document.getElementById('qscroll'));
  if (hasAns(q, draft)) { e.resp[e.cur] = clone(draft); e.status[e.cur] = markReview ? 'am' : 'a'; }
  else { delete e.resp[e.cur]; e.status[e.cur] = markReview ? 'm' : 'na'; }
  save();
  exGo(e.cur + 1 < e.ids.length ? e.cur + 1 : 0);
}
function exClear() {
  var e = E(); draft = null; delete e.resp[e.cur]; e.status[e.cur] = 'na'; save(); drawExam();
}
function exSubmitAsk() {
  var e = E();
  var rows = e.sections.map(function (s) {
    var c = { nv: 0, na: 0, a: 0, m: 0, am: 0 };
    for (var k = s.from; k <= s.to; k++) c[e.status[k]]++;
    return '<tr><td>' + esc(s.name) + '</td><td class="num">' + (s.to - s.from + 1) + '</td><td class="num">' + c.a + '</td><td class="num">' + c.na + '</td><td class="num">' + c.m + '</td><td class="num">' + c.am + '</td><td class="num">' + c.nv + '</td></tr>';
  }).join('');
  modal('<h2>Submit test?</h2><div class="tablewrap"><table><thead><tr><th>Section</th><th class="num">Qs</th><th class="num">Ans.</th><th class="num">Not ans.</th><th class="num">Marked</th><th class="num">Ans.+Marked</th><th class="num">Not visited</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="small muted">Time left: ' + hms((e.endAt - Date.now()) / 1000) + '. Once you submit, you cannot change your answers.</p><div class="row"><button class="btn bad" data-act="ex-confirm">Yes, submit</button><button class="btn ghost" data-act="closeModal">Back to test</button></div>');
}
function finishExam(auto) {
  var e = E(); if (!e) return;
  stopTimer(); closeModal();
  if (!auto || document.getElementById('qscroll')) accrue();
  var bySubj = {}, correct = 0, wrong = 0, na = 0, neg = 0, score = 0, max = 0, results = [];
  e.ids.forEach(function (id, i) {
    var q = QMAP[id], r = e.resp[i], ev = evaluate(q, r);
    var b = bySubj[q.s] || (bySubj[q.s] = { n: 0, c: 0, w: 0, na: 0, marks: 0, max: 0, time: 0 });
    b.n++; b.max += q.m; b.marks += ev.marks; b.time += e.spent[i] || 0; max += q.m; score += ev.marks;
    if (ev.st === 'c') { correct++; b.c++; } else if (ev.st === 'w') { wrong++; b.w++; if (ev.marks < 0) neg -= ev.marks; } else { na++; b.na++; }
    if (ev.st !== 'na') recordAnswer(id, ev.st === 'c');
    results.push(ev.st);
  });
  var a = {
    id: String(Date.now()), name: e.name, kind: e.kind, date: Date.now(), ids: e.ids, sections: e.sections, resp: e.resp, spent: e.spent.map(Math.round),
    results: results, score: r2(score), max: max, correct: correct, wrong: wrong, na: na, neg: r2(neg), bySubj: bySubj,
    duration: Math.min(e.minutes * 60, Math.round((Date.now() - e.startAt) / 1000)), minutes: e.minutes
  };
  S.attempts.push(a); S.exam = null; calcOpen = false; save();
  document.body.classList.remove('examMode');
  location.hash = 'result/' + a.id;
}

// ---- calculator ----
function drawCalc() {
  var host = document.getElementById('calcHost'); if (!host) return;
  if (!calcOpen) { host.innerHTML = ''; return; }
  var keys = ['sin', 'cos', 'tan', 'ln', 'log', '7', '8', '9', '/', 'sqrt', '4', '5', '6', '*', '^', '1', '2', '3', '-', '(', '0', '.', 'π', '+', ')', 'C', '⌫', 'exp', 'e', '='];
  host.innerHTML = '<div class="calc"><div class="row" style="margin-bottom:6px"><b>Calculator</b><span class="spacer"></span><button class="btn sm ghost" data-act="ex-calc">Close</button></div>'
    + '<input class="disp" id="cdisp" type="text" autocomplete="off" placeholder="e.g. 60000/7200/2"><div class="res" id="cres"></div><div class="keys">'
    + keys.map(function (k) { return '<button class="' + (k === '=' ? 'eq' : '') + '" data-act="ck" data-k="' + k + '">' + k + '</button>'; }).join('') + '</div><div class="hint" style="margin-top:6px">log = base 10, ln = natural log. Trig functions use radians. Press Enter to evaluate.</div></div>';
  var d = document.getElementById('cdisp');
  d.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') calcEval(); });
}
function calcEval() {
  var d = document.getElementById('cdisp'), out = document.getElementById('cres');
  try {
    var ex = d.value.replace(/π/g, 'PI').replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/().,\s a-zA-Z]*$/.test(ex)) throw 0;
    var ok = ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'exp', 'PI', 'e', 'abs', 'pow'];
    (ex.match(/[a-zA-Z]+/g) || []).forEach(function (w) { if (ok.indexOf(w) < 0) throw 0; });
    var f = new Function('sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'exp', 'PI', 'e', 'abs', 'pow', '"use strict";return (' + ex + ');');
    var v = f(Math.sin, Math.cos, Math.tan, Math.log, Math.log10, Math.sqrt, Math.exp, Math.PI, Math.E, Math.abs, Math.pow);
    if (typeof v !== 'number' || !isFinite(v)) throw 0;
    out.textContent = '= ' + (+v.toPrecision(12));
  } catch (err) { out.textContent = 'Error'; }
}
function calcKey(k) {
  var d = document.getElementById('cdisp');
  if (k === '=') return calcEval();
  if (k === 'C') { d.value = ''; document.getElementById('cres').textContent = ''; return; }
  if (k === '⌫') { d.value = d.value.slice(0, -1); return; }
  d.value += ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'exp'].indexOf(k) >= 0 ? k + '(' : k;
  d.focus();
}

// ======================= results =======================
var resultFilter = 'all';
function viewResult(v, id) {
  var a = S.attempts.filter(function (x) { return x.id === id; })[0];
  if (!a) { v.innerHTML = '<p>Result not found. <a href="#mocks">Back to mocks</a></p>'; return; }
  var tgt = MOCK_TARGETS[a.name], attempted = a.correct + a.wrong;
  var h = '<div class="row"><h1 style="margin:0">' + esc(a.name) + ': Analysis</h1><span class="spacer"></span><a class="btn ghost sm" href="#mocks">All tests</a></div><p class="sub">' + fmtY(new Date(a.date)) + ' · Time used ' + mmss(a.duration) + ' of ' + a.minutes + ' min</p>'
    + '<div class="grid g4" style="margin-bottom:16px">'
    + tile('Score', r2(a.score) + ' / ' + a.max, tgt != null ? (a.score >= tgt ? '<span style="color:var(--ok)">Target ' + tgt + ' reached ✓</span>' : 'Target: ' + tgt + ' (short by ' + r2(tgt - a.score) + ')') : '')
    + tile('Correct', a.correct, 'out of ' + a.ids.length) + tile('Wrong', a.wrong, 'negative marks lost: ' + a.neg)
    + tile('Not attempted', a.na, '') + tile('Accuracy', pct(attempted ? a.correct / attempted : null), 'of questions attempted')
    + '</div>';
  if (a.kind === 'mock') h += '<div class="card small">For reference, the GATE CS general-category qualifying cutoff has been roughly 25–30 marks in recent years, and competitive scores for top institutes are well above 50. The questions in this bank are somewhat easier than the real paper, so hold yourself to the targets.</div>';
  h += '<div class="card"><h2>Subject-wise performance</h2><div class="tablewrap"><table><thead><tr><th>Subject</th><th class="num">Qs</th><th class="num">Correct</th><th class="num">Wrong</th><th class="num">Skipped</th><th class="num">Marks</th><th class="num">Time</th><th>Accuracy</th></tr></thead><tbody>';
  Object.keys(a.bySubj).forEach(function (k) {
    var b = a.bySubj[k], acc = b.c + b.w ? b.c / (b.c + b.w) : null;
    h += '<tr><td>' + esc(SUBJECTS[k]) + '</td><td class="num">' + b.n + '</td><td class="num">' + b.c + '</td><td class="num">' + b.w + '</td><td class="num">' + b.na + '</td><td class="num"><b>' + r2(b.marks) + '</b> / ' + b.max + '</td><td class="num">' + mmss(b.time) + '</td><td>' + (acc == null ? '<span class="pill grey">—</span>' : '<span class="pill ' + (acc >= 0.7 ? 'ok' : acc >= 0.5 ? 'warn' : 'bad') + '">' + pct(acc) + '</span>') + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  var weak = Object.keys(a.bySubj).filter(function (k) { var b = a.bySubj[k]; return b.marks / b.max < 0.5; });
  if (weak.length) h += '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)"><b>Revise next:</b> ' + weak.map(function (k) { return esc(SUBJECTS[k]); }).join(', ') + ' (you scored under 50% of the marks in these). <button class="btn sm" data-act="practiceList" data-s="' + weak.join(',') + '">Practise these</button></div>';

  h += '<div class="card"><div class="row"><h2 style="margin:0">Question review</h2><span class="spacer"></span>'
    + [['all', 'All'], ['w', 'Wrong'], ['na', 'Not attempted'], ['c', 'Correct']].map(function (f) { return '<button class="btn sm ' + (resultFilter === f[0] ? '' : 'ghost') + '" data-act="rfilter" data-f="' + f[0] + '" data-id="' + a.id + '">' + f[1] + '</button>'; }).join(' ') + '</div>';
  a.ids.forEach(function (qid, i) {
    var q = QMAP[qid]; if (!q) return;
    var st = a.results[i];
    if (resultFilter !== 'all' && resultFilter !== st) return;
    var sec = a.sections.filter(function (s) { return i >= s.from && i <= s.to; })[0];
    var pill = st === 'c' ? '<span class="pill ok">Correct +' + q.m + '</span>' : st === 'w' ? '<span class="pill bad">Wrong ' + (q.type === 'MCQ' ? '−' + r2(q.m / 3) : '0') + '</span>' : '<span class="pill grey">Not attempted</span>';
    h += '<details class="week" style="margin-top:10px"><summary><span class="wn">' + esc(sec.name.split(' ')[0]) + ' Q' + (i - sec.from + 1) + '</span><span style="flex:1">' + esc(SUBJECTS[q.s]) + ' · ' + esc(q.t) + ' · ' + q.type + ' · ' + q.m + 'm</span>' + pill + '<span class="small muted">' + mmss(a.spent[i] || 0) + '</span></summary><div class="body"><div style="margin-top:10px">'
      + qBody(q, a.resp[i], 'review', 'r' + i)
      + '<div class="small">Your answer: <b>' + fmtAns(q, a.resp[i]) + '</b> · Correct answer: <b>' + correctAns(q) + '</b></div><div class="expl"><b>Explanation.</b> ' + q.e + '</div>'
      + '<div class="row" style="margin-top:8px"><button class="btn sm ghost" data-act="bookmark" data-id="' + q.id + '">' + (S.bookmarks[q.id] ? '★ Bookmarked' : '☆ Bookmark') + '</button></div></div></div></details>';
  });
  v.innerHTML = h + '</div>';
}

// ======================= daily log =======================
function viewLog(v) {
  var t = iso(today()), cur = S.log[t] || {};
  var dates = Object.keys(S.log).sort().reverse();
  var totalH = 0, totalP = 0; dates.forEach(function (d) { totalH += +S.log[d].h || 0; totalP += +S.log[d].p || 0; });
  var h = '<h1>Daily Log</h1><p class="sub">Log how much you studied each day. When you are studying on your own, this log is what keeps you accountable.</p>'
    + '<div class="grid g4" style="margin-bottom:16px">' + tile('Study streak', streak() + (streak() === 1 ? ' day' : ' days'), 'days in a row with any study') + tile('Last 7 days', r2(hoursLast7()) + ' h', 'target ' + S.settings.weeklyHours + ' h/week') + tile('Total hours', r2(totalH) + ' h', dates.length + ' days logged') + tile('PYQs solved', totalP, 'previous-year questions') + '</div>'
    + '<div class="grid g2"><div class="card"><h2>Add or update an entry</h2>'
    + '<label class="field"><span>Date</span><input type="date" id="ld" value="' + t + '"></label>'
    + '<div class="row"><label class="field" style="flex:1"><span>Hours studied</span><input type="number" id="lh" min="0" max="24" step="0.5" value="' + (cur.h || '') + '"></label><label class="field" style="flex:1"><span>PYQs solved</span><input type="number" id="lp" min="0" step="1" value="' + (cur.p || '') + '"></label></div>'
    + '<label class="field"><span>Topics covered / notes</span><textarea id="ln" placeholder="e.g. K-maps, 25 PYQs, weak at don\'t-care conditions">' + esc(cur.n || '') + '</textarea></label>'
    + '<button class="btn" data-act="saveLog">Save entry</button></div>'
    + '<div class="card"><h2>Last 14 days</h2>' + chart14() + '</div></div>'
    + '<div class="card"><h2>History</h2>' + (dates.length ? '<div class="tablewrap"><table><thead><tr><th>Date</th><th class="num">Hours</th><th class="num">PYQs</th><th>Notes</th><th></th></tr></thead><tbody>' + dates.map(function (d) { var e = S.log[d]; return '<tr><td>' + fmtY(parseDate(d)) + '</td><td class="num">' + (e.h || 0) + '</td><td class="num">' + (e.p || 0) + '</td><td>' + esc(e.n || '') + '</td><td><button class="btn sm ghost" data-act="delLog" data-d="' + d + '">Delete</button></td></tr>'; }).join('') + '</tbody></table></div>' : '<p class="muted">Nothing logged yet.</p>') + '</div>';
  v.innerHTML = h;
  document.getElementById('ld').addEventListener('change', function () {
    var e = S.log[this.value] || {};
    document.getElementById('lh').value = e.h || ''; document.getElementById('lp').value = e.p || ''; document.getElementById('ln').value = e.n || '';
  });
}
function chart14() {
  var target = S.settings.weeklyHours / 7, maxH = Math.max(6, target);
  var days = []; for (var i = 13; i >= 0; i--) { var d = addDays(today(), -i), e = S.log[iso(d)]; days.push({ d: d, h: e ? +e.h || 0 : 0 }); maxH = Math.max(maxH, days[days.length - 1].h); }
  var H = 150;
  var bars = days.map(function (x) {
    var hh = Math.round(x.h / maxH * H);
    return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px" title="' + fmt(x.d) + ': ' + x.h + ' h"><div style="height:' + H + 'px;display:flex;align-items:flex-end;width:100%"><div style="width:100%;height:' + hh + 'px;background:' + (x.h >= target ? 'var(--ok)' : 'var(--brand-2)') + ';border-radius:4px 4px 0 0"></div></div><span style="font-size:10px;color:var(--muted)">' + x.d.getDate() + '</span></div>';
  }).join('');
  var line = H - Math.round(target / maxH * H);
  return '<div style="position:relative"><div style="position:absolute;left:0;right:0;top:' + line + 'px;border-top:1px dashed var(--muted)"></div><div style="display:flex;gap:4px">' + bars + '</div></div><p class="small muted">The dashed line is the daily target (' + r2(target) + ' h). Green bars mean you met it.</p>';
}

// ======================= settings =======================
function viewSettings(v) {
  var s = S.settings;
  v.innerHTML = '<h1>Settings</h1><p class="sub">Everything is stored in this browser only. Export a backup now and then.</p><div class="grid g2"><div class="card"><h2>Profile and dates</h2>'
    + '<label class="field"><span>Your name</span><input type="text" id="sn" value="' + esc(s.name) + '"></label>'
    + '<div class="row"><label class="field" style="flex:1"><span>Plan start date</span><input type="date" id="ss" value="' + s.start + '"></label><label class="field" style="flex:1"><span>GATE exam date</span><input type="date" id="se" value="' + s.exam + '"></label></div>'
    + '<p class="small muted">GATE is usually held in the first two weekends of February. Replace the default date with your paper\'s official date once the organising IIT announces it. If you move the exam date (for example to GATE 2028), the plan stretches to fit.</p>'
    + '<div class="row"><label class="field" style="flex:1"><span>Weekly study target (hours)</span><input type="number" id="sw" min="5" max="80" value="' + s.weeklyHours + '"></label>'
    + '<label class="field" style="flex:1"><span>Theme</span><select id="st"><option value="auto"' + (s.theme === 'auto' ? ' selected' : '') + '>Follow system</option><option value="light"' + (s.theme === 'light' ? ' selected' : '') + '>Light</option><option value="dark"' + (s.theme === 'dark' ? ' selected' : '') + '>Dark</option></select></label></div>'
    + '<button class="btn" data-act="saveSettings">Save</button></div>'
    + '<div class="card"><h2>Backup</h2><p class="small muted">Export your progress (plan ticks, practice stats, mock results, log) to a file. Import it on another computer or browser to continue there.</p><div class="row"><button class="btn ghost" data-act="export">Export progress</button><label class="btn ghost" style="display:inline-block">Import progress<input type="file" id="imp" accept=".json" style="display:none"></label></div>'
    + '<h2 style="margin-top:22px">Question bank</h2><p class="small">' + QB.length + ' questions: ' + SUBJ_KEYS.map(function (k) { return k + ' ' + subjStats(k).total; }).join(' · ') + '</p><p class="small muted">To add your own questions, append them to the files in the <code>questions/</code> folder (see README.md).</p>'
    + '<h2 style="margin-top:22px">Reset</h2><button class="btn bad" data-act="reset">Erase all progress</button></div></div>';
  document.getElementById('imp').addEventListener('change', function () {
    var f = this.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try { var d = JSON.parse(rd.result); if (!d.settings) throw 0; S = Object.assign(defaults(), d); save(); alert('Progress imported.'); route(); }
      catch (e) { alert('That file is not a valid progress export.'); }
    };
    rd.readAsText(f);
  });
}

// ======================= modal =======================
function modal(html) { closeModal(); var d = document.createElement('div'); d.className = 'modal-bg'; d.id = 'modal'; d.innerHTML = '<div class="modal">' + html + '</div>'; document.body.appendChild(d); }
function closeModal() { var m = document.getElementById('modal'); if (m) m.remove(); }

// ======================= events =======================
var ACT = {
  closeModal: closeModal,
  practiceWeek: function (t) { var w = PLAN[+t.dataset.w]; startPracticeWith(w.subjects.slice(), 'unattempted'); },
  practiceSubj: function (t) { startPracticeWith([t.dataset.s], 'all'); },
  practiceList: function (t) { startPracticeWith(t.dataset.s.split(','), 'mistakes'); },
  psAll: function () { document.querySelectorAll('input[name=ps]').forEach(function (x) { x.checked = true; }); },
  psNone: function () { document.querySelectorAll('input[name=ps]').forEach(function (x) { x.checked = false; }); },
  startPractice: startPractice,
  checkPractice: function () { checkPractice(false); },
  skipPractice: function () { checkPractice(true); },
  nextPractice: function () { P.i++; drawPractice(); window.scrollTo(0, 0); },
  endPractice: function () { P = null; route(); },
  redoWrong: function () { var w = P.ids.filter(function (id) { return P.res[id] && !P.res[id].ok; }); P = { ids: shuffle(w), i: 0, res: {} }; drawPractice(); },
  bookmark: function (t) { var id = t.dataset.id; if (S.bookmarks[id]) delete S.bookmarks[id]; else S.bookmarks[id] = 1; save(); t.textContent = S.bookmarks[id] ? '★ Bookmarked' : '☆ Bookmark'; },
  startMock: function (t) { startMock(t.dataset.k); },
  startCustom: startCustom,
  'ex-save': function () { exCommit(false); },
  'ex-mark': function () { exCommit(true); },
  'ex-clear': exClear,
  'ex-go': function (t) { exGo(+t.dataset.i); },
  'ex-sec': function (t) { exGo(E().sections[+t.dataset.k].from); },
  'ex-submit': exSubmitAsk,
  'ex-confirm': function () { finishExam(false); },
  'ex-calc': function () { calcOpen = !calcOpen; drawCalc(); },
  ck: function (t) { calcKey(t.dataset.k); },
  rfilter: function (t) { resultFilter = t.dataset.f; viewResult(document.getElementById('view'), t.dataset.id); },
  saveLog: function () {
    var d = document.getElementById('ld').value; if (!d) return;
    S.log[d] = { h: +document.getElementById('lh').value || 0, p: +document.getElementById('lp').value || 0, n: document.getElementById('ln').value.trim() };
    save(); route();
  },
  delLog: function (t) { if (confirm('Delete this entry?')) { delete S.log[t.dataset.d]; save(); route(); } },
  saveSettings: function () {
    var st = document.getElementById('ss').value, ex = document.getElementById('se').value;
    if (!st || !ex || parseDate(ex) <= parseDate(st)) { alert('The exam date must come after the start date.'); return; }
    S.settings.name = document.getElementById('sn').value.trim() || 'Candidate';
    S.settings.start = st; S.settings.exam = ex;
    S.settings.weeklyHours = +document.getElementById('sw').value || 27;
    S.settings.theme = document.getElementById('st').value;
    save(); route(); alert('Settings saved.');
  },
  export: function () {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'gate27-progress-' + iso(today()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  },
  reset: function () { if (confirm('Erase ALL progress, stats, mock results and log entries? This cannot be undone. Export a backup first if you might want it later.')) { S = defaults(); P = null; save(); route(); } }
};
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-act]'); if (!t) return;
  var fn = ACT[t.dataset.act]; if (fn) { e.preventDefault(); fn(t, e); }
});
document.addEventListener('change', function (e) {
  var t = e.target;
  if (t.dataset && t.dataset.task) {
    if (t.checked) S.plan[t.dataset.task] = 1; else delete S.plan[t.dataset.task];
    save(); t.closest('.task').classList.toggle('done', t.checked);
    var w = schedule()[+t.dataset.task.split('.')[0]], p = weekProgress(w), sm = t.closest('details').querySelector('summary .small.muted:last-child');
    if (sm) sm.textContent = p.done + '/' + p.total;
  }
  if (S.exam && t.closest && t.closest('#qscroll')) { draft = readResp(QMAP[E().ids[E().cur]], document.getElementById('qscroll')); }
});
document.addEventListener('input', function (e) {
  var t = e.target;
  if (t.dataset && t.dataset.nat) {
    var clean = t.value.replace(/[^0-9.\-]/g, '');
    if (clean !== t.value) t.value = clean;
    if (S.exam && t.closest('#qscroll')) draft = t.value.trim() === '' ? null : t.value.trim();
  }
});

route();
})();
