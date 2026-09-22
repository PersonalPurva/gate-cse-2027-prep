// Operating Systems (OS), Databases (DB), Computer Networks (CN)
// ================= OS =================
// ---- 1 mark ----
Q('OS','Deadlock',1,'MCQ','Which of the following is <b>NOT</b> one of the necessary conditions for deadlock?',
  ['Mutual exclusion','Hold and wait','No preemption','Preemption'],3,'The four Coffman conditions are mutual exclusion, hold and wait, no preemption and circular wait. Allowing <b>preemption</b> actually prevents deadlock.');
Q('OS','Processes',1,'NAT','A program executes  fork(); fork(); fork();  in sequence. How many processes exist in total, including the original?',
  null,[8,8],'Each fork doubles the number of processes: 2³ = <b>8</b>. That is 7 new children.');
Q('OS','Page Replacement',1,'MCQ','Belady\'s anomaly can occur with which page replacement algorithm?',
  ['LRU','Optimal','FIFO','LFU with stack property'],2,'<b>FIFO</b> is not a stack algorithm, so adding frames can increase faults. LRU and Optimal are stack algorithms.');
Q('OS','Threads',1,'MCQ','Which of the following is <b>NOT</b> shared among threads of the same process?',
  ['Code section','Global data','Open files','Stack'],3,'Each thread has its own <b>stack</b>, registers and program counter.');
Q('OS','Paging',1,'NAT','A system uses 32-bit logical addresses and a page size of 4 KB. How many bits are used for the page offset?',
  null,[12,12],'4 KB = 2¹² ⇒ <b>12</b> bits.');
Q('OS','CPU Scheduling',1,'MCQ','Which scheduling algorithm can cause <b>starvation</b>?',
  ['FCFS','Round Robin','Shortest Job First','None of these'],2,'Long jobs may wait indefinitely under <b>SJF</b> if short jobs keep arriving.');
// ---- 2 marks ----
Q('OS','CPU Scheduling',2,'NAT','Processes (arrival, burst): P1 (0, 5), P2 (1, 3), P3 (2, 1). They are scheduled with Round Robin, quantum = 2. A process arriving at the same instant another is preempted joins the ready queue <b>before</b> the preempted one. What is the average waiting time? (up to 2 decimals)',
  null,[3.3,3.4],'Gantt chart: P1 0–2, P2 2–4, P3 4–5, P1 5–7, P2 7–8, P1 8–9. Completion times 9, 8, 5 ⇒ TAT 9, 7, 3 ⇒ WT 4, 4, 2. Average = 10/3 ≈ <b>3.33</b>.');
Q('OS','CPU Scheduling',2,'NAT','Processes (arrival, burst): P1 (0, 8), P2 (1, 4), P3 (2, 9), P4 (3, 5). What is the average waiting time under SRTF (preemptive SJF)?',
  null,[6.5,6.5],'Gantt chart: P1 0–1, P2 1–5, P4 5–10, P1 10–17, P3 17–26. WT: P1 = 9, P2 = 0, P3 = 15, P4 = 2 ⇒ 26/4 = <b>6.5</b>.');
Q('OS','Page Replacement',2,'NAT','How many page faults does LRU produce with 3 frames (initially empty) for the reference string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2?',
  null,[9,9],'The faults are at 7, 0, 1, 2, 3, 4, 2, 3, 0. The hits are the 2nd 0, the 3rd 0, and the final 3 and 2 ⇒ <b>9</b> faults.');
Q('OS','Deadlock',2,'NAT','3 processes share identical units of a resource, and each needs at most 4 units. What is the minimum number of units that guarantees deadlock can never occur?',
  null,[10,10],'In the worst case each process holds max − 1 = 3 units. Then one extra unit lets someone finish: 3 × 3 + 1 = <b>10</b>.');
Q('OS','Virtual Memory',2,'NAT','A TLB lookup takes 10 ns, a memory access takes 100 ns and the TLB hit ratio is 90%. The page table has a single level. What is the effective memory access time (in ns)?',
  null,[120,120],'EAT = 0.9(10 + 100) + 0.1(10 + 100 + 100) = 99 + 21 = <b>120</b> ns.');
Q('OS','Paging',2,'NAT','A system has a 32-bit virtual address space, 4 KB pages and 4-byte page table entries. What is the size of a single-level page table in MB?',
  null,[4,4],'2³²/2¹² = 2²⁰ entries × 4 B = 4 MB.');
Q('OS','Synchronization',2,'MCQ','Two processes (i, j ∈ {0, 1}, j = 1 − i) use this code, with flag[] initially false:<pre>while (true) {\n  flag[i] = true;\n  while (flag[j]);   // busy wait\n  /* critical section */\n  flag[i] = false;\n}</pre>Which is true?',
  ['Mutual exclusion and progress are both satisfied','Mutual exclusion is satisfied but progress is not','Progress is satisfied but mutual exclusion is not','Neither is satisfied'],1,
  'Mutual exclusion holds, because a process enters only when the other\'s flag is false. If both set flag = true together, both spin forever. That is a deadlock, so progress fails.');
Q('OS','Disk Scheduling',2,'NAT','The disk head is at cylinder 50. The request queue is 82, 170, 43, 140, 24, 16, 190. What is the total head movement (in cylinders) under SSTF?',
  null,[208,208],'Service order: 43 (7), 24 (19), 16 (8), 82 (66), 140 (58), 170 (30), 190 (20). Total = <b>208</b>.');
Q('OS','File Systems',2,'NAT','An inode has 10 direct pointers, 1 single-indirect and 1 double-indirect pointer. Blocks are 1 KB and a block pointer is 4 bytes. What is the maximum file size in KB?',
  null,[65802,65802],'Pointers per block = 1024/4 = 256. Blocks = 10 + 256 + 256² = 65802 ⇒ <b>65802</b> KB.');

// ================= DB =================
// ---- 1 mark ----
Q('DB','Normalization',1,'MCQ','Which normal form eliminates <b>transitive</b> dependencies of non-prime attributes on candidate keys?',
  ['1NF','2NF','3NF','None'],2,'2NF removes partial dependencies. <b>3NF</b> removes transitive dependencies.');
Q('DB','Relational Algebra',1,'NAT','Relation R has 3 tuples and relation S has 4 tuples. How many tuples are in R × S?',
  null,[12,12],'The Cartesian product has 3 × 4 = <b>12</b> tuples.');
Q('DB','Integrity Constraints',1,'MCQ','"No component of a primary key can be NULL". Which constraint is this?',
  ['Referential integrity','Entity integrity','Domain constraint','Key constraint'],1,'This is the <b>entity integrity</b> constraint.');
Q('DB','Indexing',1,'MCQ','In a B+ tree, pointers to actual data records are found:',
  ['only in internal nodes','only in leaf nodes','in both internal and leaf nodes','only in the root'],1,'Internal nodes hold only keys and child pointers. Record pointers are in the leaves, which are also linked for range scans.');
Q('DB','Transactions',1,'MCQ','Which schedule property guarantees that aborting one transaction never forces other transactions to abort?',
  ['Recoverable','Cascadeless (ACA)','Conflict serializable','View serializable'],1,'In a <b>cascadeless</b> schedule, transactions read only committed data, so there are no cascading rollbacks.');
Q('DB','Keys',1,'NAT','Relation R(A, B, C, D) has A as its only candidate key. How many superkeys does R have?',
  null,[8,8],'Any set containing A is a superkey. The other 3 attributes can be added freely ⇒ 2³ = <b>8</b>.');
// ---- 2 marks ----
Q('DB','Keys',2,'MCQ','For R(A, B, C, D, E) with FDs  A → B,  BC → D,  D → E, the candidate key is:',
  ['A','AC','BC','AD'],1,'A and C never appear on a right-hand side, so both must be in every key. {A,C}⁺ = {A,C,B,D,E} = all attributes ⇒ <b>AC</b>.');
Q('DB','Normalization',2,'MCQ','What is the highest normal form of R(A, B, C, D) with FDs  AB → C,  C → D?',
  ['1NF','2NF','3NF','BCNF'],1,'The key is AB. No attribute depends on A or B alone, so 2NF holds. C → D is transitive (C is not a superkey and D is non-prime), so 3NF fails.');
Q('DB','SQL',2,'NAT','Emp(name, dept, salary) contains (A, CS, 50), (B, CS, 70), (C, EE, 40), (D, EE, 60), (E, ME, 80). What does this query return?<pre>SELECT COUNT(*) FROM Emp e\nWHERE salary &gt; (SELECT AVG(salary) FROM Emp\n                WHERE dept = e.dept);</pre>',
  null,[2,2],'Department averages: CS 60, EE 50, ME 80. B (70 &gt; 60) and D (60 &gt; 50) qualify. E (80) is not greater than 80 ⇒ <b>2</b>.');
Q('DB','Serializability',2,'MCQ','Consider the schedule  r₁(X), r₂(X), w₁(X), w₂(X). It is:',
  ['conflict serializable','view serializable but not conflict serializable','neither conflict nor view serializable','serial'],2,
  'r₂(X) before w₁(X) gives T2 → T1, and r₁(X) before w₂(X) gives T1 → T2. That is a cycle. In both serial orders one transaction would read the other\'s write, but here both read the initial X, so it is not view serializable either.');
Q('DB','Indexing',2,'NAT','A disk block is 1024 bytes, a search key is 12 bytes and a block pointer is 8 bytes. What is the maximum order p (maximum number of child pointers) of a B+ tree internal node?',
  null,[51,51],'8p + 12(p − 1) ≤ 1024 ⇒ 20p ≤ 1036 ⇒ p = <b>51</b>.');
Q('DB','Relational Algebra',2,'NAT','R(A, B) = {(1,2), (2,3), (3,4), (1,3)} and S(B, C) = {(2,5), (3,6), (3,7)}. How many tuples are in the natural join R ⋈ S?',
  null,[5,5],'B = 2 matches 1 tuple of S. There are two R tuples with B = 3, and each matches 2 tuples of S. B = 4 matches none. Total = 1 + 2 + 2 = <b>5</b>.');
Q('DB','Relational Algebra',2,'MCQ','Which relational algebra operator is naturally used for queries like "find students enrolled in <b>all</b> courses"?',
  ['Union','Natural join','Division','Set difference only'],2,'The <b>division</b> operator (÷) answers "for all" queries.');
Q('DB','Concurrency Control',2,'MSQ','Which of the following statements about two-phase locking (2PL) are true?',
  ['Basic 2PL guarantees conflict serializability','Basic 2PL is free from deadlocks','Strict 2PL avoids cascading rollbacks','2PL may lead to deadlock'],[0,2,3],
  '2PL gives serializability, but transactions can still wait on each other in a cycle, so deadlock is possible. Strict 2PL holds exclusive locks until commit, which makes schedules cascadeless.');
Q('DB','Keys',2,'NAT','Relation R(A, B, C, D) has FDs  A → B,  B → C,  C → D,  D → A. How many candidate keys does R have?',
  null,[4,4],'The FDs form a cycle, so each single attribute determines all the others. There are <b>4</b> candidate keys: A, B, C, D.');

// ================= CN =================
// ---- 1 mark ----
Q('CN','Layering',1,'MCQ','Which OSI layer is responsible for routing packets from source to destination across multiple networks?',
  ['Data link layer','Network layer','Transport layer','Session layer'],1,'Routing and logical (IP) addressing belong to the <b>network layer</b>.');
Q('CN','IP Addressing',1,'NAT','How many usable host addresses are in a /26 subnet?',
  null,[62,62],'2^(32−26) − 2 = 64 − 2 = <b>62</b>.');
Q('CN','IP Support Protocols',1,'MCQ','Which protocol maps an IP address to a MAC address?',
  ['DNS','DHCP','ARP','ICMP'],2,'<b>ARP</b> (Address Resolution Protocol).');
Q('CN','Application Layer',1,'MCQ','Which application protocol uses UDP by default for its ordinary queries?',
  ['HTTP','SMTP','FTP','DNS'],3,'Normal <b>DNS</b> queries use UDP port 53. Zone transfers and large responses use TCP.');
Q('CN','Error Detection',1,'NAT','What is the Hamming distance between 10101010 and 11001100?',
  null,[4,4],'XOR = 01100110, which has four 1s ⇒ <b>4</b>.');
Q('CN','Application Layer',1,'MCQ','What is the well-known port number of SMTP?',
  ['21','25','53','110'],1,'SMTP = <b>25</b>. (FTP control = 21, DNS = 53, POP3 = 110.)');
// ---- 2 marks ----
Q('CN','Flow Control',2,'NAT','A 1 Mbps link has a one-way propagation delay of 20 ms. Frames are 1000 bits long. What is the link utilization (in %) of stop-and-wait? (up to 2 decimals)',
  null,[2.4,2.5],'Tt = 1000/10⁶ = 1 ms. U = Tt/(Tt + 2Tp) = 1/41 ≈ <b>2.44%</b>.');
Q('CN','Flow Control',2,'NAT','A 10 Mbps link has a one-way propagation delay of 20 ms, and frames are 1000 bytes. Go-Back-N is used. What is the minimum number of sequence number bits needed to reach 100% utilization?',
  null,[6,6],'Tt = 8000/10⁷ = 0.8 ms. Window = 1 + 2Tp/Tt = 1 + 40/0.8 = 51. GBN needs 2ᵏ − 1 ≥ 51 ⇒ k = <b>6</b>.');
Q('CN','Error Detection',2,'MCQ','The data 1101011011 is sent using CRC with generator 10011 (x⁴ + x + 1). What is the CRC remainder that gets appended?',
  ['1110','0111','1011','0010'],0,'Append 4 zeros and divide 11010110110000 by 10011 using mod-2 division. The remainder is <b>1110</b>.');
Q('CN','Subnetting',2,'NAT','An organization owns 200.10.5.0/24 and needs 6 subnets of equal size. What is the maximum number of usable hosts per subnet?',
  null,[30,30],'6 subnets need 3 borrowed bits ⇒ /27, which leaves 5 host bits ⇒ 2⁵ − 2 = <b>30</b>.');
Q('CN','Fragmentation',2,'NAT','An IPv4 datagram of total length 4000 bytes (20-byte header) is sent over a link with MTU 1500 bytes. What is the fragment offset field value of the <b>last</b> fragment?',
  null,[370,370],'Max data per fragment = 1480, which is a multiple of 8. The data splits as 1480, 1480, 1020. The last fragment starts at byte 2960 ⇒ offset = 2960/8 = <b>370</b>.');
Q('CN','Congestion Control',2,'NAT','TCP starts with cwnd = 1 MSS and ssthresh = 8 MSS. There are no losses. cwnd doubles every RTT in slow start and grows by 1 MSS per RTT once cwnd ≥ ssthresh. What is cwnd (in MSS) after 6 RTTs?',
  null,[11,11],'1 → 2 → 4 → 8 (reaches ssthresh) → 9 → 10 → 11 ⇒ <b>11</b>.');
Q('CN','Routing',2,'MCQ','Which problem is characteristic of distance-vector routing?',
  ['Flooding of link-state packets','Count-to-infinity','Need for a global topology map','Dijkstra computation at every router'],1,'When a link fails, bad news spreads slowly through distance vectors. This is the <b>count-to-infinity</b> problem.');
Q('CN','CIDR',2,'NAT','The networks 172.16.0.0/24, 172.16.1.0/24, 172.16.2.0/24 and 172.16.3.0/24 are aggregated into one route. What is the prefix length of the aggregate?',
  null,[22,22],'The third octets 0–3 differ only in their last 2 bits ⇒ 24 − 2 = /<b>22</b>.');
Q('CN','Transport Layer',2,'MSQ','Which of the following statements are true?',
  ['TCP provides reliable, in-order byte-stream delivery','The UDP header is 8 bytes long','ICMP messages are carried inside TCP segments','NAT lets multiple private hosts share one public IP address'],[0,1,3],
  'ICMP messages are carried directly in IP datagrams (protocol 1), not in TCP. The other three are true.');
Q('CN','Ethernet',2,'NAT','A CSMA/CD network runs at 10 Mbps over a maximum cable length of 2500 m, with a signal speed of 2 × 10⁸ m/s. What is the minimum frame size in bits?',
  null,[250,250],'Tp = 2500/(2×10⁸) = 12.5 µs. Min frame = 2 × Tp × B = 25 µs × 10⁷ bits/s = <b>250</b> bits.');
