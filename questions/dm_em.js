// Discrete Mathematics (DM) and Engineering Mathematics (EM: Linear Algebra, Calculus, Probability)
// ================= DM =================
// ---- 1 mark ----
Q('DM','Propositional Logic',1,'MCQ','Which of the following is a <b>tautology</b>?',
  ['p → (p ∧ q)','(p → q) ∨ (q → p)','(p ∨ q) → p','p ∧ ¬p'],1,
  '(p→q)∨(q→p) = ¬p∨q∨¬q∨p, which is always true. The others fail: (A) at p=T,q=F; (C) at p=F,q=T; (D) is a contradiction.');
Q('DM','Relations',1,'NAT','How many <b>reflexive</b> relations are possible on a set with 4 elements?',
  null,[4096,4096],'The n diagonal pairs are fixed; each of the other n² − n pairs is either in or out: 2^(16−4) = 2¹² = <b>4096</b>.');
Q('DM','Groups',1,'MCQ','Which of the following is <b>NOT</b> a group?',
  ['(ℤ, +)','(ℚ \\ {0}, ×)','(ℤ, ×)','(ℝ, +)'],2,'In (ℤ, ×), 2 has no inverse in ℤ (1/2 ∉ ℤ), so it is <b>not a group</b>.');
Q('DM','Graph Colouring',1,'NAT','What is the chromatic number of the cycle graph C₇?',
  null,[3,3],'Odd cycles need 3 colours; even cycles need 2. C₇ is odd ⇒ <b>3</b>.');
Q('DM','Graphs',1,'NAT','How many edges does the complete graph K₁₀ have?',
  null,[45,45],'n(n−1)/2 = 10·9/2 = <b>45</b>.');
Q('DM','Partial Orders',1,'MSQ','Which of the following relations are <b>partial orders</b>?',
  ['≤ on integers','Divisibility on positive integers','< on integers','⊆ on the power set of a set'],[0,1,3],
  'A partial order must be reflexive, antisymmetric and transitive. "<" is not reflexive, so (C) is out. The rest qualify.');
// ---- 2 marks ----
Q('DM','Recurrence Relations',2,'NAT','Let aₙ = 5aₙ₋₁ − 6aₙ₋₂ for n ≥ 2, with a₀ = 1 and a₁ = 4. Find a₄.',
  null,[146,146],'Roots 2 and 3: aₙ = A·2ⁿ + B·3ⁿ. From a₀, a₁: A = −1, B = 2. a₄ = −16 + 162 = <b>146</b>. Check: a₂=14, a₃=46, a₄=146.');
Q('DM','Combinatorics',2,'NAT','How many <b>onto</b> (surjective) functions are there from a set of 4 elements to a set of 3 elements?',
  null,[36,36],'Inclusion–exclusion: 3⁴ − C(3,1)2⁴ + C(3,2)1⁴ = 81 − 48 + 3 = <b>36</b>.');
Q('DM','First Order Logic',2,'MCQ','Let L(s, c) mean "student s likes course c". Which formula expresses "<i>Not every student likes every course</i>"?',
  ['∀s ∃c ¬L(s,c)','∃s ∀c ¬L(s,c)','∃s ∃c ¬L(s,c)','¬∃s ∃c L(s,c)'],2,
  '¬∀s∀c L(s,c) ≡ ∃s∃c ¬L(s,c): at least one student dislikes at least one course.');
Q('DM','Combinatorics',2,'NAT','In how many ways can 10 identical balls be placed into 4 distinct boxes, if boxes may be empty?',
  null,[286,286],'Stars and bars: C(10+4−1, 4−1) = C(13,3) = <b>286</b>.');
Q('DM','Lattices',2,'MCQ','Consider the poset ({1, 2, 3, 4, 6, 12}, | ) where | means "divides". Which statement is true?',
  ['It is a distributive lattice but not complemented','It is complemented but not distributive','It is a Boolean algebra','It is not a lattice'],0,
  'Divisor lattices are always distributive. 2 has no complement: we need gcd(2,x)=1 and lcm(2,x)=12, and no divisor of 12 satisfies both. D₁₂ is not a Boolean algebra because 12 is not square-free.');
Q('DM','Graphs',2,'MCQ','Which of the following degree sequences can be realized by a <b>simple</b> graph on 6 vertices?',
  ['3, 3, 3, 3, 3, 3','5, 5, 4, 3, 2, 1','4, 4, 4, 1, 1, 1','5, 4, 3, 2, 1, 0'],0,
  '(C) and (D) have odd sums. For (B), Havel–Hakimi: remove 5 → 4,3,2,1,0; remove 4 → 2,1,0,−1, which is invalid. (A) is realized by K₃,₃.');

// ================= EM =================
// ---- 1 mark ----
Q('EM','Linear Algebra',1,'NAT','Find the determinant of the matrix<br><pre>| 2 1 0 |\n| 1 3 1 |\n| 0 1 2 |</pre>',
  null,[8,8],'2(3·2 − 1·1) − 1(1·2 − 0) + 0 = 10 − 2 = <b>8</b>.');
Q('EM','Linear Algebra',1,'MCQ','The eigenvalues of the matrix [[4, 1], [2, 3]] are:',
  ['1 and 6','2 and 5','3 and 4','−2 and −5'],1,'Trace = 7 and det = 10, so λ² − 7λ + 10 = 0 ⇒ λ = <b>2, 5</b>.');
Q('EM','Calculus',1,'NAT','Evaluate lim<sub>x→0</sub> sin(3x) / x.',
  null,[3,3],'sin(3x)/x = 3 · sin(3x)/(3x) → 3 · 1 = <b>3</b>.');
Q('EM','Probability',1,'MCQ','For a Poisson random variable with mean λ, the variance is:',
  ['√λ','λ²','λ','1/λ'],2,'For a Poisson distribution, mean = variance = <b>λ</b>.');
Q('EM','Linear Algebra',1,'NAT','What is the rank of the matrix [[1, 2, 3], [2, 4, 6], [1, 1, 1]]?',
  null,[2,2],'Row 2 = 2 × Row 1. Row 3 is not a multiple of Row 1, so rank = <b>2</b>.');
Q('EM','Calculus',1,'MCQ','The function f(x) = |x| at x = 0 is:',
  ['differentiable but not continuous','continuous but not differentiable','both continuous and differentiable','neither continuous nor differentiable'],1,
  'The limit exists and equals f(0) = 0, so it is continuous. The left derivative is −1 and the right derivative is +1, so it is not differentiable.');
Q('EM','Linear Algebra',1,'MCQ','The Doolittle LU decomposition of A = [[2, 3], [4, 7]] has L = [[1, 0], [2, 1]]. What is U?',
  ['[[2, 3], [0, 1]]','[[2, 3], [0, 7]]','[[1, 3], [0, 1]]','[[2, 0], [0, 1]]'],0,
  'Row 2 − 2 × Row 1: [4, 7] − [4, 6] = [0, 1]. So U = [[2, 3], [0, 1]]. Check: LU = [[2,3],[4,7]] ✓.');
Q('EM','Statistics',1,'NAT','Find the population standard deviation of the data: 2, 4, 4, 4, 5, 5, 7, 9.',
  null,[2,2],'Mean = 40/8 = 5. Squared deviations: 9,1,1,1,0,0,4,16, which sum to 32. Variance = 32/8 = 4 ⇒ SD = <b>2</b>.');
// ---- 2 marks ----
Q('EM','Probability',2,'NAT','1% of a population has a disease. A test detects it in 99% of those who have it, and gives a false positive for 5% of those who do not. If a random person tests positive, what is the probability they have the disease? (up to 2 decimal places)',
  null,[0.16,0.17],'Bayes: 0.01·0.99 / (0.01·0.99 + 0.99·0.05) = 0.0099/0.0594 ≈ <b>0.167</b>.');
Q('EM','Calculus',2,'NAT','Find the maximum value of f(x) = x³ − 6x² + 9x + 1 on the interval [0, 4].',
  null,[5,5],'f\'(x) = 3(x−1)(x−3). f(0)=1, f(1)=5, f(3)=1, f(4)=5 ⇒ max = <b>5</b>.');
Q('EM','Calculus',2,'NAT','Evaluate ∫<sub>0</sub><sup>1</sup> x eˣ dx.',
  null,[1,1],'By parts: [x eˣ − eˣ]₀¹ = (e − e) − (0 − 1) = <b>1</b>.');
Q('EM','Linear Algebra',2,'MCQ','The system  x + y + z = 6,  x + 2y + 3z = 10,  x + 2y + λz = μ  has <b>infinitely many</b> solutions when:',
  ['λ = 3, μ = 10','λ = 3, μ ≠ 10','λ ≠ 3, μ = 10','λ ≠ 3, any μ'],0,
  'R3 − R2 gives (λ−3)z = μ − 10. Infinitely many solutions need 0 = 0, i.e. λ = 3 and μ = 10. λ = 3 with μ ≠ 10 gives no solution; λ ≠ 3 gives a unique solution.');
Q('EM','Probability',2,'NAT','X is uniformly distributed on (0, 10). Find P(X > 7 | X > 5). (up to 2 decimal places)',
  null,[0.59,0.61],'P(X>7)/P(X>5) = 0.3/0.5 = <b>0.6</b>.');
Q('EM','Linear Algebra',2,'MSQ','For every real <b>symmetric</b> matrix, which of the following are always true?',
  ['All eigenvalues are real','Eigenvectors for distinct eigenvalues are orthogonal','The matrix is invertible','The matrix is diagonalizable'],[0,1,3],
  'These follow from the spectral theorem. A symmetric matrix can still be singular (e.g. the zero matrix), so (C) is false.');
