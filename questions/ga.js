// General Aptitude — 15 one-mark + 15 two-mark
// ---- 1 mark ----
Q('GA','Verbal',1,'MCQ','Choose the word that is most nearly <b>opposite</b> in meaning to <i>ephemeral</i>.',
  ['transient','permanent','fleeting','brief'],1,
  '<i>Ephemeral</i> means lasting a very short time. Its opposite is <b>permanent</b>. The other three are synonyms.');
Q('GA','Verbal',1,'MCQ','Neither the students nor the teacher ______ aware of the change in schedule.',
  ['were','was','are being','have been'],1,
  'With "neither…nor", the verb agrees with the nearer subject ("the teacher", singular), so <b>was</b>.');
Q('GA','Quantitative',1,'NAT','3 workers can build a wall in 12 days. Working at the same rate, how many days will 4 workers take to build the same wall?',
  null,[9,9],'Total work = 3 × 12 = 36 worker-days. 36 / 4 = <b>9</b> days.');
Q('GA','Analogy',1,'MCQ','Pen : Writer :: Scalpel : ______',
  ['Knife','Hospital','Surgeon','Patient'],2,'A pen is the tool of a writer; a scalpel is the tool of a <b>surgeon</b>.');
Q('GA','Series',1,'MCQ','Find the next term: 2, 6, 12, 20, 30, ___',
  ['40','42','44','36'],1,'Terms are n(n+1): 1·2, 2·3, 3·4, 4·5, 5·6, next 6·7 = <b>42</b>.');
Q('GA','Quantitative',1,'NAT','A shirt marked at Rs. 800 is sold at a discount of 15%. What is the selling price (in Rs.)?',
  null,[680,680],'SP = 800 × 0.85 = <b>680</b>.');
Q('GA','Verbal',1,'MCQ','His argument was so ______ that even his harshest critics were convinced.',
  ['specious','cogent','tenuous','fallacious'],1,'<b>Cogent</b> = clear, logical and convincing. The others all suggest weak or false reasoning.');
Q('GA','Quantitative',1,'NAT','The ratio of the present ages of A and B is 3 : 5. After 10 years the ratio will be 5 : 7. What is the present age of A (in years)?',
  null,[15,15],'(3x+10)/(5x+10) = 5/7 ⇒ 21x+70 = 25x+50 ⇒ x = 5. A = 3x = <b>15</b>.');
Q('GA','Verbal',1,'MCQ','Which of the following words is spelt correctly?',
  ['Accomodate','Accommodate','Acommodate','Acomodate'],1,'Correct spelling: <b>Accommodate</b> (double c, double m).');
Q('GA','Quantitative',1,'NAT','What is the average of the first 10 odd natural numbers?',
  null,[10,10],'Sum of first n odd numbers = n² = 100. Average = 100/10 = <b>10</b>.');
Q('GA','Spatial',1,'MCQ','Ravi walks 4 km north, turns right and walks 3 km, then turns right again and walks 4 km. Where is he now with respect to his starting point?',
  ['3 km East','3 km West','5 km North-East','4 km South'],0,'North 4, East 3, South 4 ⇒ net displacement is <b>3 km East</b>.');
Q('GA','Verbal',1,'MCQ','The idiom "to bite the bullet" means:',
  ['to act rashly','to face a painful situation bravely','to be very angry','to eat quickly'],1,'"Bite the bullet" = to endure or face something unpleasant with courage.');
Q('GA','Quantitative',1,'NAT','How many three-digit natural numbers are divisible by 7?',
  null,[128,128],'⌊999/7⌋ − ⌊99/7⌋ = 142 − 14 = <b>128</b>.');
Q('GA','Quantitative',1,'MCQ','Two fair dice are thrown. The probability that the sum of the numbers is 7 is:',
  ['1/12','1/6','5/36','7/36'],1,'Favourable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 of 36 ⇒ <b>1/6</b>.');
Q('GA','Quantitative',1,'MCQ','What is the angle between the hour and minute hands of a clock at 3:30?',
  ['90°','75°','60°','82.5°'],1,'Hour hand = 30×3 + 0.5×30 = 105°, minute hand = 180°. Difference = <b>75°</b>.');
// ---- 2 marks ----
Q('GA','Quantitative',2,'NAT','Pipe A can fill a tank in 12 hours and pipe B in 15 hours. Pipe C can empty the full tank in 20 hours. If all three are opened together on an empty tank, how many hours will it take to fill it?',
  null,[10,10],'Net rate = 1/12 + 1/15 − 1/20 = (5+4−3)/60 = 1/10 ⇒ <b>10</b> hours.');
Q('GA','Logical',2,'MCQ','<b>Statements:</b> All roses are flowers. Some flowers fade quickly.<br><b>Conclusions:</b> I. Some roses fade quickly. II. All flowers are roses.',
  ['Only I follows','Only II follows','Both I and II follow','Neither I nor II follows'],3,
  'The flowers that fade quickly may not include any roses, so I does not follow. "All roses are flowers" does not reverse, so II does not follow either. Answer: <b>neither</b>.');
Q('GA','Quantitative',2,'NAT','A sum of money invested at compound interest doubles itself in 5 years. In how many years will it become 8 times itself?',
  null,[15,15],'8 = 2³, so it takes three doubling periods: 3 × 5 = <b>15</b> years.');
Q('GA','Verbal',2,'MCQ','"Although the city has built more roads every year for a decade, the average commute time has steadily increased." Which inference is <b>best supported</b> by this statement?',
  ['Building roads alone has not reduced commute time.','Building roads causes traffic congestion.','The city should stop building roads.','Commute time will continue to increase.'],0,
  'Only (A) stays within the facts. (B) claims causation, (C) is a recommendation, and (D) is a prediction. None of these three is supported.');
Q('GA','Quantitative',2,'NAT','A train 240 m long passes a pole in 12 seconds. How many seconds will it take to cross a platform 360 m long?',
  null,[30,30],'Speed = 240/12 = 20 m/s. Distance = 240 + 360 = 600 m ⇒ 600/20 = <b>30</b> s.');
Q('GA','Logical',2,'MCQ','Five people A, B, C, D, E sit in a row facing north. C is in the middle. A is immediately to the left of C. E is at the right end. B is not adjacent to A. Who is at the left end?',
  ['A','B','D','E'],2,'Positions 1–5 from the left: C=3, A=2, E=5. B and D take 1 and 4. B cannot be next to A (positions 1, 3), so B=4 and <b>D=1</b>.');
Q('GA','Quantitative',2,'NAT','In a class of 60 students, 35 like tea, 30 like coffee, and 10 like neither. How many students like both tea and coffee?',
  null,[15,15],'At least one = 60 − 10 = 50. Both = 35 + 30 − 50 = <b>15</b>.');
Q('GA','Logical',2,'MCQ','If CODE is written as DPEF in a certain code, how is GATE written in that code?',
  ['HBUF','HBVF','FZSD','HCUF'],0,'Each letter is shifted forward by 1: G→H, A→B, T→U, E→F ⇒ <b>HBUF</b>.');
Q('GA','Quantitative',2,'NAT','A can finish a job in 10 days and B in 15 days. They work together for 4 days, after which A leaves. How many more days will B take to finish the remaining work?',
  null,[5,5],'Together: 1/10 + 1/15 = 1/6 per day. 4 days ⇒ 2/3 done. Remaining 1/3 at 1/15 per day ⇒ <b>5</b> days.');
Q('GA','Data Interpretation',2,'MCQ','Annual sales (units) of a company: 2021: 400, 2022: 500, 2023: 450, 2024: 600. In which year was the percentage increase over the previous year the highest?',
  ['2022','2023','2024','Same in 2022 and 2024'],2,'2022: +25%, 2023: −10%, 2024: +150/450 = +33.3% ⇒ <b>2024</b>.');
Q('GA','Quantitative',2,'NAT','A 40-litre mixture contains milk and water in the ratio 3 : 1. How many litres of water must be added to make the ratio 3 : 2?',
  null,[10,10],'Milk = 30, water = 10. For 3:2, water must be 20 ⇒ add <b>10</b> L.');
Q('GA','Spatial',2,'MCQ','How many squares of all sizes are there on a standard 8 × 8 chessboard?',
  ['64','196','204','256'],2,'Σk² for k=1..8 = 8·9·17/6 = <b>204</b>.');
Q('GA','Quantitative',2,'MSQ','Which of the following numbers are divisible by <b>both</b> 4 and 6?',
  ['36','60','84','90'],[0,1,2],'A number divisible by both 4 and 6 must be divisible by lcm = 12. 36, 60 and 84 are; 90 is not divisible by 4.');
Q('GA','Quantitative',2,'NAT','Two fair dice are rolled. What is the probability that the product of the two numbers is even? (Answer up to 2 decimal places.)',
  null,[0.74,0.76],'P(product odd) = P(both odd) = (1/2)(1/2) = 1/4. So P(even) = <b>0.75</b>.');
Q('GA','Series',2,'MCQ','Find the next term: 1, 4, 27, 256, ___',
  ['625','1024','3125','3025'],2,'Terms are nⁿ: 1¹, 2², 3³, 4⁴, next 5⁵ = <b>3125</b>.');
