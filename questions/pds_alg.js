// Programming & Data Structures (PDS) and Algorithms (ALG)
// ================= PDS =================
// ---- 1 mark ----
Q('PDS','C Pointers',1,'NAT','What does the following C program print?<pre>int main() {\n  int a[] = {10, 20, 30, 40, 50};\n  int *p = a + 1;\n  printf("%d", *(p + 2) - *p);\n  return 0;\n}</pre>',
  null,[20,20],'p points to a[1] = 20. p + 2 points to a[3] = 40. 40 − 20 = <b>20</b>.');
Q('PDS','Stacks',1,'NAT','Evaluate the postfix expression: 6 2 3 + − 3 8 2 / + *',
  null,[7,7],'2 3 + = 5, then 6 − 5 = 1. Next, 8 2 / = 4 and 3 + 4 = 7. Finally 1 × 7 = <b>7</b>.');
Q('PDS','Trees',1,'MCQ','What is the maximum number of nodes in a binary tree of height h? (A tree with only the root has height 0.)',
  ['2ʰ','2ʰ − 1','2ʰ⁺¹ − 1','2ʰ⁺¹'],2,'Level i holds at most 2ⁱ nodes. Σ 2ⁱ for i = 0..h = <b>2ʰ⁺¹ − 1</b>.');
Q('PDS','Heaps',1,'NAT','A min-heap is stored in an array as [1, 3, 6, 5, 9, 8] (0-based indexing). After one delete-min, what element is at index 1?',
  null,[5,5],'8 moves to the root: [8,3,6,5,9]. Sift down: swap with 3 → [3,8,6,5,9], then swap with 5 → [3,5,6,8,9]. Index 1 holds <b>5</b>.');
Q('PDS','BST',1,'MCQ','An inorder traversal of a binary search tree visits the keys in:',
  ['level order','sorted (ascending) order','reverse sorted order','insertion order'],1,'Inorder visits left subtree, root, right subtree. In a BST that is <b>ascending order</b>.');
Q('PDS','Queues',1,'MCQ','A queue is implemented using two stacks. What is the <b>amortized</b> time of a dequeue operation?',
  ['O(1)','O(log n)','O(n)','O(n²)'],0,'Each element moves from the input stack to the output stack at most once, so the amortized cost is <b>O(1)</b>.');
Q('PDS','Recursion',1,'NAT','What does f(5) return?<pre>int f(int n) {\n  if (n &lt;= 1) return 1;\n  return f(n - 1) + f(n - 2);\n}</pre>',
  null,[8,8],'f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=<b>8</b>.');
Q('PDS','Graphs',1,'MCQ','Which data structure is used to implement breadth-first search?',
  ['Stack','Queue','Heap','Hash table'],1,'BFS processes vertices in FIFO order, so it uses a <b>queue</b>. DFS uses a stack.');
Q('PDS','Trees',1,'NAT','How many structurally distinct binary trees can be formed with 4 nodes?',
  null,[14,14],'This is the Catalan number C₄ = (1/5) · C(8,4) = <b>14</b>.');
// ---- 2 marks ----
Q('PDS','C Storage Classes',2,'NAT','What does the following program print?<pre>int f() {\n  static int x = 0;\n  x += 2;\n  return x;\n}\nint main() {\n  int s = 0;\n  for (int i = 0; i &lt; 3; i++) s += f();\n  printf("%d", s);\n}</pre>',
  null,[12,12],'A static variable keeps its value between calls: x = 2, 4, 6 ⇒ s = <b>12</b>.');
Q('PDS','C Pointers',2,'MCQ','What does the following program print?<pre>void swap(int *a, int b) {\n  int t = *a;\n  *a = b;\n  b = t;\n}\nint main() {\n  int x = 5, y = 9;\n  swap(&amp;x, y);\n  printf("%d %d", x, y);\n}</pre>',
  ['9 5','9 9','5 9','5 5'],1,'x is passed by address, so it becomes 9. y is passed by value, so changing b does not affect y ⇒ <b>9 9</b>.');
Q('PDS','BST',2,'NAT','The keys 50, 30, 70, 20, 40, 60, 80, 35, 45, 65 are inserted in this order into an empty BST. What is the height of the resulting tree? (A single node has height 0.)',
  null,[3,3],'The longest path is 50 → 30 → 40 → 35 (or 45), or 50 → 70 → 60 → 65. That is 3 edges ⇒ <b>3</b>.');
Q('PDS','Tree Traversals',2,'MCQ','A binary tree has preorder A B D E C F G and inorder D B E A F C G. What is its postorder?',
  ['D E B F G C A','D B E F C G A','E D B G F C A','D E F G B C A'],0,
  'The root is A. Its left subtree is B(D, E) and its right subtree is C(F, G). Postorder: <b>D E B F G C A</b>.');
Q('PDS','Linked Lists',2,'NAT','What does fun(head) return for the list 1 → 2 → 3 → 4 → 5 → 6 → 7?<pre>int fun(struct node *h) {\n  if (h == NULL) return 0;\n  if (h-&gt;next == NULL) return h-&gt;val;\n  return h-&gt;val + fun(h-&gt;next-&gt;next);\n}</pre>',
  null,[16,16],'The function adds every alternate node: 1 + 3 + 5 + 7 = <b>16</b>.');
Q('PDS','Recursion',2,'NAT','How many times is printf executed when p(4) is called?<pre>void p(int n) {\n  if (n &gt; 0) {\n    p(n - 1);\n    printf("%d", n);\n    p(n - 1);\n  }\n}</pre>',
  null,[15,15],'T(n) = 2T(n−1) + 1 with T(0) = 0 ⇒ T(n) = 2ⁿ − 1 = <b>15</b>.');
Q('PDS','Stacks',2,'MCQ','The numbers 1, 2, 3, 4, 5 are pushed onto a stack in that order, and pops may happen at any time. Which output sequence is <b>impossible</b>?',
  ['3 2 1 5 4','1 2 3 4 5','4 5 3 2 1','3 1 2 4 5'],3,'After 3 is popped, 2 is on top of 1. So 1 cannot come out before 2, and <b>3 1 2 4 5</b> is impossible.');
Q('PDS','Arrays',2,'NAT','int A[10][20] is stored in row-major order starting at address 1000, with sizeof(int) = 4. What is the address of A[5][8]?',
  null,[1432,1432],'1000 + (5 × 20 + 8) × 4 = 1000 + 432 = <b>1432</b>.');
Q('PDS','Heaps',2,'MSQ','For a binary max-heap containing n elements, which of the following are true?',
  ['Finding the maximum takes O(1)','Searching for an arbitrary element takes O(log n)','Insertion takes O(log n)','Building the heap from n unordered elements takes O(n)'],[0,2,3],
  'A heap has no ordering between siblings, so searching takes O(n), not O(log n). The other three are standard results.');
Q('PDS','Trees',2,'NAT','A binary tree has 15 nodes with two children and 10 nodes with exactly one child. How many nodes does it have in total?',
  null,[41,41],'Leaves = (nodes with two children) + 1 = 16. Total = 15 + 10 + 16 = <b>41</b>.');
Q('PDS','C Strings',2,'MCQ','What does the following code print?<pre>char s[] = "GATE2027";\nchar *p = s;\np += 4;\nprintf("%c%s", *s, p + 2);</pre>',
  ['G27','G2027','GATE27','A27'],0,'*s is \'G\'. p points to "2027", so p + 2 points to "27" ⇒ <b>G27</b>.');
Q('PDS','Trees',2,'NAT','What is the minimum number of nodes in an AVL tree of height 4? (A single node has height 0.)',
  null,[12,12],'N(h) = N(h−1) + N(h−2) + 1 with N(0)=1, N(1)=2 ⇒ N(2)=4, N(3)=7, N(4)=<b>12</b>.');

// ================= ALG =================
// ---- 1 mark ----
Q('ALG','Sorting',1,'MCQ','What is the worst-case time complexity of quicksort (with a fixed pivot choice)?',
  ['O(n)','O(n log n)','O(n²)','O(log n)'],2,'Already sorted input with the first or last element as pivot gives maximally unbalanced partitions ⇒ <b>O(n²)</b>.');
Q('ALG','Recurrences',1,'MCQ','The solution of T(n) = 2T(n/2) + n is:',
  ['Θ(n)','Θ(n log n)','Θ(n²)','Θ(log n)'],1,'Master theorem case 2: n^(log₂2) = n equals f(n) ⇒ <b>Θ(n log n)</b>.');
Q('ALG','Searching',1,'NAT','Binary search is run on a sorted array of 1000 elements. What is the maximum number of element comparisons (three-way comparisons) needed?',
  null,[10,10],'⌊log₂ 1000⌋ + 1 = 9 + 1 = <b>10</b>.');
Q('ALG','Sorting',1,'MCQ','Which of the following sorting algorithms is <b>stable</b> in its standard implementation?',
  ['Quick sort','Heap sort','Selection sort','Merge sort'],3,'<b>Merge sort</b> keeps equal keys in their original order. The standard versions of the other three do not.');
Q('ALG','Hashing',1,'NAT','A hash table has 10 slots (0–9) and uses h(k) = k mod 10 with linear probing. The keys 12, 22, 32, 5, 15 are inserted in this order. In which slot does 15 end up?',
  null,[6,6],'12→2, 22→3, 32→4, 5→5. 15 hashes to 5, which is full, so it goes to <b>6</b>.');
Q('ALG','Shortest Paths',1,'MCQ','Dijkstra\'s algorithm can give incorrect results when the graph has:',
  ['cycles','negative edge weights','multiple edges','disconnected components'],1,'Dijkstra assumes that once a vertex is finalized its distance can never decrease. <b>Negative edge weights</b> break that assumption.');
Q('ALG','MST',1,'MCQ','What is the time complexity of Kruskal\'s algorithm on a graph with E edges (using union–find)?',
  ['O(E)','O(E log E)','O(E²)','O(V²)'],1,'Sorting the edges dominates the cost ⇒ <b>O(E log E)</b>.');
Q('ALG','Greedy',1,'MCQ','Which of the following problems is <b>NOT</b> solved optimally by a greedy algorithm?',
  ['Fractional knapsack','Huffman coding','0/1 knapsack','Activity selection'],2,'<b>0/1 knapsack</b> needs dynamic programming. Picking greedily by value/weight can be suboptimal.');
Q('ALG','Complexity',1,'NAT','What is the minimum number of comparisons needed to find the maximum of 100 distinct elements?',
  null,[99,99],'Every element except the maximum must lose at least one comparison ⇒ <b>99</b>.');
// ---- 2 marks ----
Q('ALG','Recurrences',2,'MCQ','The solution of T(n) = 3T(n/4) + n log n is:',
  ['Θ(n)','Θ(n log n)','Θ(n^(log₄3))','Θ(n log² n)'],1,
  'n^(log₄3) ≈ n^0.79, which is polynomially smaller than n log n. The regularity condition holds, so case 3 gives <b>Θ(n log n)</b>.');
Q('ALG','Dynamic Programming',2,'NAT','Matrices A (10×20), B (20×30) and C (30×40) are to be multiplied. What is the minimum number of scalar multiplications needed to compute ABC?',
  null,[18000,18000],'(AB)C = 6000 + 12000 = 18000. A(BC) = 24000 + 8000 = 32000. Minimum = <b>18000</b>.');
Q('ALG','MST',2,'NAT','An undirected weighted graph has edges AB=4, AC=1, BC=2, BD=5, CD=8, CE=10, DE=2, BE=6. What is the weight of its minimum spanning tree?',
  null,[10,10],'Kruskal: AC(1), BC(2), DE(2), skip AB(4) (it forms a cycle), BD(5). Total = <b>10</b>.');
Q('ALG','Dynamic Programming',2,'NAT','What is the length of the longest common subsequence of "ABCBDAB" and "BDCABA"?',
  null,[4,4],'One LCS is "BCBA" (another is "BDAB"). Length = <b>4</b>.');
Q('ALG','Shortest Paths',2,'NAT','A directed graph has edges S→A (2), S→B (5), A→B (1), A→C (4), B→C (1), C→T (3), B→T (7). What is the shortest distance from S to T?',
  null,[7,7],'d(A)=2, d(B)=3 (via A), d(C)=4 (via B). d(T) = min(3+7, 4+3) = <b>7</b>.');
Q('ALG','Sorting',2,'MCQ','How many comparisons does merging two sorted lists of sizes m and n need in the worst case?',
  ['m + n','m + n − 1','max(m, n)','m × n'],1,'Each comparison outputs one element, and the last element needs no comparison ⇒ <b>m + n − 1</b>.');
Q('ALG','Dynamic Programming',2,'NAT','A 0/1 knapsack has capacity 7. The items (weight, value) are (1,1), (3,4), (4,5), (5,7). What is the maximum total value?',
  null,[9,9],'The best choice is items (3,4) + (4,5): weight 7, value 9. (5,7) + (1,1) gives only 8 ⇒ <b>9</b>.');
Q('ALG','Graph Traversal',2,'MSQ','Which of the following statements are true?',
  ['BFS on an unweighted graph gives shortest paths (in number of edges) from the source','DFS can detect a cycle in a directed graph','Every directed graph has a topological ordering','Bellman–Ford detects negative-weight cycles reachable from the source'],[0,1,3],
  'A topological order exists only for DAGs, so (C) is false. The rest are standard facts.');
Q('ALG','Sorting',2,'NAT','How many swaps does insertion sort (adjacent swaps) perform on the array [4, 3, 1, 5, 2]?',
  null,[6,6],'Swaps = inversions. From 4: 3 (with 3, 1, 2). From 3: 2 (with 1, 2). From 5: 1 (with 2). Total = <b>6</b>.');
Q('ALG','Asymptotics',2,'MCQ','Let f(n) = n^(log n), g(n) = 2ⁿ and h(n) = n¹⁰⁰. Which is the correct increasing order of growth?',
  ['h, f, g','f, h, g','h, g, f','g, f, h'],0,'Taking logs: log h = 100 log n, log f = (log n)², log g = n. So <b>h &lt; f &lt; g</b>.');
