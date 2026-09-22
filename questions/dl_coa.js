// Digital Logic (DL) and Computer Organization & Architecture (COA)
// ================= DL =================
// ---- 1 mark ----
Q('DL','Minimization',1,'MCQ','The minimal sum-of-products form of F(A,B,C) = Σm(0, 1, 2, 3, 7) is:',
  ['A\' + BC','A\' + B','A\'B + BC','A + BC'],0,
  'm0–m3 are exactly A\'. m7 (ABC) pairs with m3 (A\'BC) to give BC. So F = <b>A\' + BC</b>.');
Q('DL','Number Representation',1,'NAT','What decimal value does the 8-bit two\'s complement number 11110110 represent?',
  null,[-10,-10],'MSB is 1, so the number is negative. Invert and add 1: 00001001 + 1 = 00001010 = 10 ⇒ <b>−10</b>.');
Q('DL','Combinational Circuits',1,'MCQ','How many select lines does a 16 : 1 multiplexer need?',
  ['2','3','4','16'],2,'2ˢ = 16 ⇒ s = <b>4</b>.');
Q('DL','Boolean Algebra',1,'MSQ','Which of the following sets of gates are <b>functionally complete</b>?',
  ['{NAND}','{NOR}','{AND, OR}','{AND, NOT}'],[0,1,3],
  'NAND and NOR are universal on their own. {AND, NOT} is complete by De Morgan. {AND, OR} cannot produce NOT because it is monotone.');
Q('DL','Sequential Circuits',1,'NAT','What is the minimum number of flip-flops needed to build a mod-12 counter?',
  null,[4,4],'We need 2ⁿ ≥ 12 ⇒ n = <b>4</b>.');
Q('DL','Number Representation',1,'MCQ','The binary number (1011.101)₂ in decimal is:',
  ['11.625','11.5','13.625','11.875'],0,'1011 = 11, and .101 = 0.5 + 0.125 = 0.625 ⇒ <b>11.625</b>.');
// ---- 2 marks ----
Q('DL','Floating Point',2,'NAT','A 32-bit register holds the IEEE-754 single-precision pattern 0x41200000. What decimal value does it represent?',
  null,[10,10],'0 | 10000010 | 0100…0. Exponent = 130 − 127 = 3, significand = 1.01₂ = 1.25. Value = 1.25 × 2³ = <b>10</b>.');
Q('DL','Boolean Algebra',2,'NAT','How many Boolean functions of 3 variables are <b>self-dual</b>?',
  null,[16,16],'A self-dual function is fixed by its values on half of the 2ⁿ input combinations (complementary inputs get complementary outputs). So there are 2^(2^(n−1)) = 2⁴ = <b>16</b>.');
Q('DL','Minimization',2,'MCQ','The minimal SOP of F(A,B,C,D) = Σm(0, 2, 5, 7, 8, 10, 13, 15) is:',
  ['B\'D\' + BD','BD\' + B\'D','A\'B\' + CD','B\'D + AC'],0,
  'On the K-map, the four corners (0,2,8,10) give B\'D\', and the centre quad (5,7,13,15) gives BD. So F = B XNOR D.');
Q('DL','Computer Arithmetic',2,'MSQ','Which of the following additions cause <b>overflow</b> in 8-bit two\'s complement arithmetic (range −128 to +127)?',
  ['100 + 50','(−100) + (−50)','100 + (−50)','(−64) + (−64)'],[0,1],
  '150 > 127 and −150 < −128 both overflow. 50 is in range. −128 is in range, so (D) does not overflow.');
Q('DL','Combinational Circuits',2,'NAT','A 16-bit ripple-carry adder uses full adders with a carry-out delay of 2 ns and a sum delay of 3 ns. All inputs, including c₀, are available at t = 0. What is the worst-case time (in ns) until all outputs are stable?',
  null,[33,33],'The carry into the last stage (bit 15) arrives at 15 × 2 = 30 ns. Its sum is ready 3 ns later ⇒ <b>33</b> ns.');
Q('DL','Sequential Circuits',2,'MCQ','A circuit has two D flip-flops A and B with D<sub>A</sub> = B and D<sub>B</sub> = A\'. Starting from AB = 00, what is the state AB after 3 clock pulses?',
  ['00','01','10','11'],2,'Next state = (B, A\'): 00 → 01 → 11 → <b>10</b>.');

// ================= COA =================
// ---- 1 mark ----
Q('COA','Addressing Modes',1,'MCQ','In which addressing mode is the effective address the contents of a register plus a constant given in the instruction?',
  ['Immediate','Register indirect','Displacement (base/indexed)','Direct'],2,'EA = [R] + constant is <b>displacement</b> (base or indexed) addressing.');
Q('COA','Memory',1,'NAT','A byte-addressable memory has a capacity of 4 GB. What is the minimum number of address bits required?',
  null,[32,32],'4 GB = 2³² bytes ⇒ <b>32</b> bits.');
Q('COA','I/O',1,'MCQ','In DMA mode of data transfer:',
  ['the CPU executes an instruction for every word transferred','data moves between the device and memory without the CPU executing instructions for each word','the device interrupts the CPU after every byte','the CPU polls the device status continuously'],1,
  'The DMA controller takes over the bus (by burst or cycle stealing), so the CPU does not execute an instruction for each word. It is interrupted only once, when the whole block is done.');
Q('COA','Cache',1,'NAT','A direct-mapped cache has a capacity of 32 KB and a block size of 64 bytes. How many cache lines does it have?',
  null,[512,512],'32 KB / 64 B = 2¹⁵/2⁶ = <b>512</b>.');
Q('COA','Pipelining',1,'MCQ','An instruction needs the result of an earlier instruction that is still in the pipeline. What kind of hazard is this?',
  ['Structural hazard','Data hazard','Control hazard','Memory hazard'],1,'A dependence on an earlier result (RAW) is a <b>data hazard</b>.');
Q('COA','Control Unit',1,'MSQ','Compared to a microprogrammed control unit, which statements about a <b>hardwired</b> control unit are true?',
  ['It is generally faster','It is easier to modify','It is typically used in RISC processors','It uses a control memory'],[0,2],
  'Hardwired control is fast and common in RISC designs. It is hard to modify, and it is the microprogrammed unit that uses control memory.');
// ---- 2 marks ----
Q('COA','Pipelining',2,'NAT','A 5-stage pipeline has stage delays of 150, 120, 160, 140 and 130 ps. Each inter-stage latch adds 10 ps. How long (in ns) does it take to execute 1000 instructions with no stalls? (up to 2 decimals)',
  null,[170.6,170.8],'Cycle time = max stage + latch = 160 + 10 = 170 ps. Time = (k + n − 1) × 170 = 1004 × 170 = 170680 ps = <b>170.68</b> ns.');
Q('COA','Cache',2,'NAT','A cache has a hit time of 1 ns, a miss rate of 5% and a miss penalty of 80 ns. What is the average memory access time (in ns)?',
  null,[5,5],'AMAT = 1 + 0.05 × 80 = <b>5</b> ns.');
Q('COA','Cache',2,'NAT','A 64 KB direct-mapped cache has 32-byte blocks. The machine uses 32-bit byte addresses. How many bits wide is the tag field?',
  null,[16,16],'Offset = 5 bits. Lines = 2¹⁶/2⁵ = 2¹¹ ⇒ index = 11 bits. Tag = 32 − 11 − 5 = <b>16</b>.');
Q('COA','Cache',2,'NAT','A 256 KB, 4-way set-associative cache has 64-byte blocks and 32-bit addresses. Each tag entry also stores 1 valid bit and 1 dirty bit. What is the total size of the tag directory in <b>Kbits</b>?',
  null,[72,72],'Lines = 2¹⁸/2⁶ = 4096. Sets = 1024 ⇒ index = 10, offset = 6, tag = 16. Each entry = 18 bits. 4096 × 18 = 73728 bits = <b>72</b> Kbits.');
Q('COA','Pipelining',2,'NAT','In a pipelined processor with an ideal CPI of 1, 20% of instructions are branches. Each branch causes a 3-cycle stall. What is the effective CPI?',
  null,[1.6,1.6],'CPI = 1 + 0.2 × 3 = <b>1.6</b>.');
Q('COA','Instruction Format',2,'NAT','A processor has 32-bit instructions and 32 general-purpose registers. One instruction format has an opcode, two register fields and a 12-bit immediate. What is the maximum number of distinct opcodes this format can support?',
  null,[1024,1024],'Register fields = 5 + 5 bits. Opcode = 32 − 10 − 12 = 10 bits ⇒ 2¹⁰ = <b>1024</b>.');
Q('COA','Secondary Storage',2,'NAT','A disk rotates at 7200 RPM, has an average seek time of 4 ms and 400 sectors per track. What is the average time (in ms) to read one sector? (up to 2 decimals)',
  null,[8.15,8.22],'One rotation = 60000/7200 = 8.333 ms. Average rotational latency = 4.167 ms. Transfer = 8.333/400 = 0.021 ms. Total = 4 + 4.167 + 0.021 ≈ <b>8.19</b> ms.');
Q('COA','I/O',2,'NAT','A 1 GHz processor handles a device with interrupt-driven I/O. The device transfers 4 × 10⁶ bytes/s and raises one interrupt per 4-byte word. Each interrupt costs 100 CPU cycles. What <b>percentage</b> of CPU time goes to servicing this device?',
  null,[10,10],'Interrupts/s = 4×10⁶/4 = 10⁶. Cycles = 10⁸ out of 10⁹ available ⇒ <b>10%</b>.');
Q('COA','Memory Hierarchy',2,'MCQ','In a two-level hierarchy, cache access time is 10 ns, main memory access time is 100 ns and the hit ratio is 0.9. On a miss, the cache is checked first and then main memory is accessed. The average access time is:',
  ['19 ns','20 ns','11 ns','110 ns'],1,'T = 0.9 × 10 + 0.1 × (10 + 100) = 9 + 11 = <b>20</b> ns.');
