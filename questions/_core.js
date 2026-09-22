// Question bank core. Loaded before every subject file.
// Q(subject, topic, marks, type, questionHTML, options, answer, explanation)
//   type 'MCQ' -> answer = index of correct option (0-based)
//   type 'MSQ' -> answer = array of correct option indices
//   type 'NAT' -> options = null, answer = [min, max] accepted range
// IDs are assigned in file order (e.g. OS-7), and your progress is saved against them,
// so ALWAYS ADD NEW QUESTIONS AT THE END of a subject file.
window.QB = [];
window.SUBJECTS = {
  GA: 'General Aptitude',
  DM: 'Discrete Mathematics',
  EM: 'Engineering Mathematics',
  DL: 'Digital Logic',
  COA: 'Computer Organization & Architecture',
  PDS: 'Programming & Data Structures',
  ALG: 'Algorithms',
  TOC: 'Theory of Computation',
  CD: 'Compiler Design',
  OS: 'Operating Systems',
  DB: 'Databases',
  CN: 'Computer Networks'
};
window._qcount = {};
function Q(s, t, m, type, q, o, a, e) {
  _qcount[s] = (_qcount[s] || 0) + 1;
  QB.push({ id: s + '-' + _qcount[s], s: s, t: t, m: m, type: type, q: q, o: o, a: a, e: e });
}
