// Theory of Computation (TOC) and Compiler Design (CD)
// ================= TOC =================
// ---- 1 mark ----
Q('TOC','Regular Languages',1,'MCQ','Which of the following languages is <b>not</b> regular?',
  ['{ aⁿ | n ≥ 0 }','{ aⁿbⁿ | n ≥ 0 }','{ w ∈ {a,b}* | w ends with ab }','{ aᵐbⁿ | m, n ≥ 0 }'],1,'Recognizing aⁿbⁿ requires unbounded counting, which a finite automaton cannot do. The pumping lemma proves it.');
Q('TOC','Finite Automata',1,'NAT','What is the minimum number of states in a DFA over {0,1} that accepts strings in which the number of 1s is divisible by 3?',
  null,[3,3],'The DFA only needs to track (number of 1s) mod 3, which has 3 values ⇒ <b>3</b> states.');
Q('TOC','Regular Expressions',1,'MCQ','Which regular expression denotes all strings over {a, b} that end in "ab"?',
  ['(a+b)*ab','ab(a+b)*','(ab)*','a*b*ab'],0,'Any prefix followed by ab ⇒ <b>(a+b)*ab</b>. Option (D) misses strings like "baab".');
Q('TOC','PDA',1,'MCQ','The class of languages accepted by nondeterministic pushdown automata is:',
  ['regular languages','context-free languages','context-sensitive languages','recursive languages'],1,'NPDAs recognize exactly the <b>context-free languages</b>.');
Q('TOC','Undecidability',1,'MCQ','The halting problem for Turing machines is:',
  ['decidable','undecidable but recursively enumerable','not recursively enumerable','regular'],1,'HALT is semi-decidable (simulate the machine and accept if it halts) but not decidable.');
Q('TOC','Finite Automata',1,'NAT','What is the minimum number of states in a DFA that accepts binary strings (read MSB first) whose value is divisible by 5?',
  null,[5,5],'The DFA tracks the value mod 5, which has 5 distinct residues ⇒ <b>5</b> states.');
Q('TOC','Closure Properties',1,'MSQ','Which of the following language classes are closed under <b>complementation</b>?',
  ['Regular languages','Context-free languages','Deterministic context-free languages','Recursive languages'],[0,2,3],
  'CFLs are not closed under complement. The other three are.');
Q('TOC','Pumping Lemma',1,'MCQ','The pumping lemma for regular languages is typically used to show that:',
  ['a language is regular','a language is not regular','a grammar is ambiguous','a DFA is minimal'],1,'The lemma states a property every regular language has. It is used by contradiction to prove a language is <b>not regular</b>.');
Q('TOC','CFG',1,'MCQ','The grammar S → aSb | ε generates:',
  ['{ aⁿbⁿ | n ≥ 0 }','{ aⁿbⁿ | n ≥ 1 }','(ab)*','a*b*'],0,'Each step adds a matching a…b pair, and ε ends the derivation ⇒ <b>{aⁿbⁿ | n ≥ 0}</b>.');
// ---- 2 marks ----
Q('TOC','Finite Automata',2,'NAT','What is the minimum number of states in a DFA over {a, b} that accepts strings whose 3rd symbol from the end is \'a\'?',
  null,[8,8],'The DFA must remember the last 3 symbols, all of which are distinguishable ⇒ 2³ = <b>8</b> states.');
Q('TOC','CFL',2,'MCQ','The language L = { aⁱbʲcᵏ | i = j or j = k } is:',
  ['regular','deterministic context-free','context-free but not deterministic context-free','not context-free'],2,
  'L is the union of two CFLs, so it is a CFL. It is inherently ambiguous: the machine must guess which equality to check, so no DPDA exists.');
Q('TOC','Chomsky Hierarchy',2,'MCQ','The language { aⁿbⁿcⁿ | n ≥ 1 } is:',
  ['context-free','regular','context-sensitive but not context-free','not recursively enumerable'],2,'The CFL pumping lemma shows it is not context-free. A linear bounded automaton decides it, so it is <b>context-sensitive</b>.');
Q('TOC','Undecidability',2,'MSQ','Which of the following problems are <b>undecidable</b>?',
  ['Does a given TM halt on blank tape?','Does a given CFG generate the empty language?','Do two given CFGs generate the same language?','Does a given DFA accept an infinite language?'],[0,2],
  'CFG emptiness is decidable (check whether S is generating). DFA infiniteness is decidable (look for a reachable cycle that can reach a final state). Blank-tape halting and CFG equivalence are undecidable.');
Q('TOC','Regular Expressions',2,'NAT','How many strings of length 4 over {a, b} are in the language of (a+b)* b (a+b)?',
  null,[8,8],'The regex describes strings whose second-to-last symbol is b. That fixes 1 of the 4 positions ⇒ 2³ = <b>8</b>.');
Q('TOC','Closure Properties',2,'MCQ','If L₁ is regular and L₂ is context-free, then L₁ ∩ L₂ is always:',
  ['regular','context-free','deterministic context-free','not necessarily recursive'],1,'Run the PDA for L₂ and the DFA for L₁ in parallel (product construction). The result is <b>context-free</b>.');
Q('TOC','Regular Languages',2,'MCQ','Which one of the following languages is <b>regular</b>?',
  ['{ aⁿbᵐ | n, m ≥ 0 }','{ aⁿbⁿ | n ≥ 0 }','{ ww | w ∈ {a,b}* }','{ aᵖ | p is prime }'],0,'aⁿbᵐ with independent n and m is just a*b*. The other three need counting or memory.');
Q('TOC','Ambiguity',2,'NAT','Consider the grammar E → E + E | E * E | a. How many distinct parse trees does the string a + a * a have?',
  null,[2,2],'The trees are (a + a) * a and a + (a * a) ⇒ <b>2</b>. The grammar is ambiguous.');
Q('TOC','Rice\'s Theorem',2,'MCQ','By Rice\'s theorem, which of the following is undecidable for an arbitrary Turing machine M?',
  ['Whether M has more than 10 states','Whether L(M) is regular','Whether M ever moves its head left on input ε within 100 steps','Whether M\'s description has an even length'],1,
  '"L(M) is regular" is a non-trivial property of the language, so Rice applies. The other options are about the machine\'s description or bounded behaviour, which are decidable.');
Q('TOC','Regular Expressions',2,'MSQ','Which of the following pairs of regular expressions are equivalent?',
  ['(a*b*)* and (a+b)*','(ab)*a and a(ba)*','(a+b)* and a* + b*','a*(ba*)* and (a+b)*'],[0,1,3],
  'a* + b* does not contain "ab", so (C) is not equivalent. The other three pairs describe the same language.');

// ================= CD =================
// ---- 1 mark ----
Q('CD','Lexical Analysis',1,'MCQ','A lexical analyzer is usually built using:',
  ['pushdown automata','finite automata derived from regular expressions','Turing machines','LR parsing tables'],1,'Token patterns are regular, so they are recognized with a DFA. Lex/Flex work this way.');
Q('CD','Lexical Analysis',1,'NAT','How many tokens are in the C statement:  printf("x=%d", x+1);',
  null,[9,9],'printf, (, "x=%d", ",", x, +, 1, ), ; ⇒ <b>9</b>.');
Q('CD','Parsing',1,'MCQ','Which of the following parsers is the most powerful (accepts the largest class of grammars)?',
  ['LL(1)','SLR(1)','LALR(1)','Canonical LR(1)'],3,'LL(1) ⊂ SLR(1) ⊂ LALR(1) ⊂ <b>CLR(1)</b>.');
Q('CD','Runtime Environments',1,'MCQ','In languages that support recursion, activation records are typically allocated on the:',
  ['heap','stack','static data area','code segment'],1,'Each call pushes an activation record on the control <b>stack</b>, and it is popped on return.');
Q('CD','Intermediate Code',1,'MCQ','Which of the following is a common representation of three-address code?',
  ['Parse tree','Quadruples','Token stream','DFA'],1,'Three-address code is stored as <b>quadruples</b> (op, arg1, arg2, result), triples or indirect triples.');
Q('CD','Data Flow Analysis',1,'MCQ','Live variable analysis is a:',
  ['forward data-flow analysis','backward data-flow analysis','bidirectional analysis','lexical analysis'],1,'Liveness depends on future uses, so information flows backward: IN = use ∪ (OUT − def).');
Q('CD','Optimization',1,'NAT','After constant propagation and constant folding on the code below, what constant is assigned to z?<pre>x = 4;\ny = x * 2;\nz = y + x;</pre>',
  null,[12,12],'y = 8, so z = 8 + 4 = <b>12</b>.');
// ---- 2 marks ----
Q('CD','Parsing',2,'MCQ','For the grammar  S → AB,  A → a | ε,  B → b | ε,  FIRST(S) is:',
  ['{a}','{a, b}','{a, b, ε}','{a, ε}'],2,'FIRST(A) = {a, ε}. Since A ⇒ ε, FIRST(B) = {b, ε} is added. Both can vanish, so ε ∈ FIRST(S) ⇒ <b>{a, b, ε}</b>.');
Q('CD','Parsing',2,'MCQ','For the grammar  S → A a B | B b,  A → c | ε,  B → d | ε  (S is the start symbol), FOLLOW(B) is:',
  ['{b}','{$}','{b, $}','{a, b, $}'],2,'B ends S → AaB, so FOLLOW(S) = {$} ⊆ FOLLOW(B). In S → Bb, b follows B ⇒ <b>{b, $}</b>.');
Q('CD','Syntax Directed Translation',2,'NAT','Consider the SDT:<pre>E → E₁ # T   { E.val = E₁.val * T.val }\nE → T        { E.val = T.val }\nT → T₁ &amp; F   { T.val = T₁.val + F.val }\nT → F        { T.val = F.val }\nF → num      { F.val = num.val }</pre>What is E.val for the input  2 # 3 &amp; 5 # 4 ?',
  null,[64,64],'&amp; binds tighter because it is lower in the grammar, and both operators are left-associative. So the input means (2 # (3 &amp; 5)) # 4 = (2 × 8) × 4 = <b>64</b>.');
Q('CD','Local Optimization',2,'NAT','How many nodes are in the DAG for the following basic block, counting both leaves and interior nodes?<pre>a = b + c\nb = a - d\nc = b + c\nd = a - d</pre>',
  null,[6,6],'Leaves: b₀, c₀, d₀. Interior: +(b₀,c₀) for a; −(a,d₀) for b; +(b,c₀) for c. d = a − d₀ reuses the − node (common subexpression) ⇒ <b>6</b>.');
Q('CD','Liveness Analysis',2,'NAT','How many variables are live immediately after statement 2?<pre>1: a = 1\n2: b = a + 2\n3: c = b * a\n4: a = c + b\n5: return a</pre>',
  null,[2,2],'After 2, both a and b are used in 3 before being redefined, and c is defined in 3 before any use. Live = {a, b} ⇒ <b>2</b>.');
Q('CD','Parsing',2,'MCQ','Consider the grammar  S → L = R | R,  L → * R | id,  R → L. Which is true?',
  ['It is SLR(1) and LALR(1)','It is LALR(1) but not SLR(1)','It is SLR(1) but not LALR(1)','It is not LR(1)'],1,
  'In the SLR table, the state holding [S → L· = R] and [R → L·] has a shift/reduce conflict on "=" because "=" ∈ FOLLOW(R). LALR lookaheads remove the conflict.');
