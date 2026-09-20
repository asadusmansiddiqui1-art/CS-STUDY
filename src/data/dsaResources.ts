import { StudyResource } from '../types';

export const dsaResources: StudyResource[] = [
  {
    id: 'arrays-linked-lists',
    title: 'Arrays & Linked Lists',
    category: 'Fundamental Linear Structures',
    readTime: '15 min read',
    slideCount: 28,
    badgeColor: 'blue',
    summary: 'Master contiguous memory vs node-pointer chaining. Understand Singly, Doubly, and Circular linked lists with pointer operations.',
    keyConcepts: [
      'Contiguous vs Non-contiguous memory allocation',
      'Dynamic Array resizing factor (Amortized O(1))',
      'Singly Linked List: Head, Tail, Next pointers',
      'Doubly Linked List: Prev and Next bidirectional navigation',
      'Circular Linked List: Ring buffers and round-robin scheduling',
      'Fast & Slow Pointer technique (Floyd’s Cycle Detection)'
    ],
    asciiDiagram: `[ CONTIGUOUS ARRAY (Indexed 0..N-1) ]
+-------+-------+-------+-------+-------+
| arr[0]| arr[1]| arr[2]| arr[3]| arr[4]|
+-------+-------+-------+-------+-------+
0x1000  0x1004  0x1008  0x100C  0x1010  (Address offset = base + index * size)

[ SINGLY LINKED LIST (Node with data & next pointer) ]
Head -> [ Val: 10 | Next ] ---> [ Val: 25 | Next ] ---> [ Val: 40 | NULL ]
        (0x2040)                 (0x3100)                 (0x1520)

[ DOUBLY LINKED LIST (Prev & Next pointers) ]
NULL <- [ Prev | 10 | Next ] <===> [ Prev | 25 | Next ] <===> [ Prev | 40 | Next ] -> NULL`,
    complexity: {
      best: 'Array Access: O(1) | LL Prepend: O(1)',
      average: 'Array Search: O(N) | LL Search: O(N)',
      worst: 'Array Insert/Delete: O(N) | LL Search: O(N)',
      space: 'Array: O(1) auxiliary | LL: O(N) pointer overhead',
      notes: 'Arrays grant random access O(1) by index; Linked lists excel at O(1) insertions/deletions once pointer is positioned.'
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++: Reverse a Singly Linked List',
        code: `#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Reverses a linked list iteratively in O(N) time and O(1) space
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next; // Store next node
        curr->next = prev;               // Invert pointer
        prev = curr;                     // Move prev forward
        curr = nextTemp;                 // Move curr forward
    }
    return prev; // New head
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    
    std::cout << "Original: 1 -> 2 -> 3" << std::endl;
    ListNode* reversed = reverseList(head);
    
    std::cout << "Reversed: ";
    for (ListNode* p = reversed; p != nullptr; p = p->next) {
        std::cout << p->val << (p->next ? " -> " : "\\n");
    }
    return 0;
}`,
        explanation: 'Three-pointer technique: prev, curr, and nextTemp. Safely reverses pointer direction without losing subsequent node references.'
      },
      {
        language: 'javascript',
        title: 'JavaScript: Dynamic Array & Two Pointers (Detect Cycle)',
        code: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Floyd's Tortoise and Hare Cycle Detection Algorithm
function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;         // 1 step
    fast = fast.next.next;    // 2 steps
    
    if (slow === fast) {
      return true; // Cycle detected!
    }
  }
  return false;
}

// Demo
const n1 = new ListNode(10);
const n2 = new ListNode(20);
const n3 = new ListNode(30);
n1.next = n2;
n2.next = n3;
n3.next = n2; // Creates loop 30 -> 20

console.log("Has cycle in list:", hasCycle(n1)); // Output: true`,
        explanation: 'Floyds cycle-finding algorithm uses two runners at different speeds (1x and 2x). If there is a loop, fast will inevitably lap slow in O(N) time and O(1) space.'
      }
    ],
    commonPitfalls: [
      'Memory Leaks in C++: Always delete deallocated nodes or utilize std::unique_ptr.',
      'Dangling Pointers: Dereferencing nullptr after removing or modifying list nodes.',
      'Off-by-One in Array Bounds: Accessing index >= length throws segmentation fault or undefined behavior.',
      'Losing List Head: Overwriting head pointer during traversal instead of using a temporary cursor.'
    ],
    practiceProblems: [
      {
        title: 'Reverse Linked List (LeetCode #206)',
        difficulty: 'Easy',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        approachHint: 'Use 3 pointers (prev, curr, nextTemp) to flip pointers in one pass.'
      },
      {
        title: 'Merge Two Sorted Lists (LeetCode #21)',
        difficulty: 'Easy',
        description: 'Merge two sorted linked lists and return it as a new sorted list.',
        approachHint: 'Use a dummy node and attach the smaller value between both lists at each iteration.'
      },
      {
        title: 'LRU Cache (LeetCode #146)',
        difficulty: 'Medium',
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
        approachHint: 'Combine a Hash Map for O(1) lookup with a Doubly Linked List for O(1) eviction/insertion.'
      }
    ],
    downloadFileName: 'CS_Study_Hub_Arrays_and_Linked_Lists_Notes.md'
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    category: 'LIFO & FIFO Abstract Data Types',
    readTime: '12 min read',
    slideCount: 22,
    badgeColor: 'amber',
    summary: 'In-depth breakdown of Last-In-First-Out (LIFO) and First-In-First-Out (FIFO) paradigms. Expression evaluation, call stacks, and BFS queues.',
    keyConcepts: [
      'LIFO (Last-In-First-Out) stack operations: push, pop, peek (O(1))',
      'FIFO (First-In-First-Out) queue operations: enqueue, dequeue, front (O(1))',
      'Circular Queue & Ring Buffers (eliminates shifting overhead)',
      'Double-Ended Queue (Deque) and Monotonic Stack patterns',
      'Application: Parentheses matching & Infix to Postfix conversion',
      'Application: Operating System process scheduling & BFS queue'
    ],
    asciiDiagram: `[ STACK: LIFO (Last-In First-Out) ]
        Push |   ^ Pop
             v   |
        +-------------+
  TOP ->| Element 3   |
        +-------------+
        | Element 2   |
        +-------------+
        | Element 1   |
        +=============+ (Base)

[ QUEUE: FIFO (First-In First-Out) ]
  Enqueue                 Dequeue
  (REAR)                  (FRONT)
    v                       ^
  +-----+-----+-----+-----+ |
  |  4  |  3  |  2  |  1  |---> 出
  +-----+-----+-----+-----+`,
    complexity: {
      best: 'Push / Pop / Enqueue / Dequeue: O(1)',
      average: 'All standard access at ends: O(1)',
      worst: 'Search: O(N) | Resizing backing array: O(N) amortized O(1)',
      space: 'O(N) for storing elements',
      notes: 'Stacks and Queues provide strict O(1) time guarantees when implemented with linked nodes or circular arrays.'
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++: Valid Parentheses Checker using std::stack',
        code: `#include <iostream>
#include <stack>
#include <string>

bool isValid(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    std::string test1 = "{[()]}";
    std::string test2 = "{[(])}";
    std::cout << test1 << " -> " << (isValid(test1) ? "VALID" : "INVALID") << std::endl;
    std::cout << test2 << " -> " << (isValid(test2) ? "VALID" : "INVALID") << std::endl;
    return 0;
}`,
        explanation: 'Push opening brackets onto stack. For each closing bracket, check if it matches the current stack top. If stack is empty at the end, parentheses are balanced.'
      },
      {
        language: 'javascript',
        title: 'JavaScript: Circular Queue (Ring Buffer)',
        code: `class CircularQueue {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  enqueue(val) {
    if (this.size === this.capacity) return false; // Full
    this.queue[this.tail] = val;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
    return true;
  }

  dequeue() {
    if (this.size === 0) return null; // Empty
    const val = this.queue[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return val;
  }

  peek() {
    return this.size === 0 ? null : this.queue[this.head];
  }
}

const q = new CircularQueue(3);
q.enqueue("Task A");
q.enqueue("Task B");
console.log("Dequeued:", q.dequeue()); // Task A
q.enqueue("Task C");
console.log("Peek Front:", q.peek());   // Task B`,
        explanation: 'Circular queues use modulo arithmetic (tail + 1) % capacity to reuse vacated positions without shifting array items.'
      }
    ],
    commonPitfalls: [
      'Stack Overflow: Exceeding call stack limit through unbounded recursive calls.',
      'Popping from Empty Stack / Queue: Always check .empty() or size > 0 before calling pop() or front().',
      'Queue Underflow in Arrays: Forgetting to reset indices when size reaches 0 in naive implementations.'
    ],
    practiceProblems: [
      {
        title: 'Valid Parentheses (LeetCode #20)',
        difficulty: 'Easy',
        description: 'Determine if an input string of brackets is valid and properly matched.',
        approachHint: 'Use a stack to pair every closing bracket with the most recent open bracket.'
      },
      {
        title: 'Implement Queue using Stacks (LeetCode #232)',
        difficulty: 'Easy',
        description: 'Implement a FIFO queue using only two LIFO stacks.',
        approachHint: 'Maintain an input stack and an output stack. Transfer elements when output stack is empty to invert order.'
      },
      {
        title: 'Daily Temperatures (LeetCode #739)',
        difficulty: 'Medium',
        description: 'Find number of days you have to wait after the i-th day to get a warmer temperature.',
        approachHint: 'Use a monotonic decreasing stack storing indices of unresolved temperatures.'
      }
    ],
    downloadFileName: 'CS_Study_Hub_Stacks_and_Queues_Notes.md'
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    category: 'Core Algorithmic Paradigms',
    readTime: '18 min read',
    slideCount: 34,
    badgeColor: 'emerald',
    summary: 'Compare Divide-and-Conquer, Comparison Sorts, and Logarithmic Searching. Detailed traces for Merge Sort, Quick Sort, and Binary Search.',
    keyConcepts: [
      'Binary Search: O(log N) on sorted collections via mid calculation',
      'Merge Sort: Stable O(N log N) divide-and-conquer with recursive merge',
      'Quick Sort: In-place partitioning around a pivot (Hoare / Lomuto)',
      'Bubble, Selection, and Insertion Sort: O(N^2) foundational algorithms',
      'Stability in Sorting: Preserving relative order of duplicate keys',
      'Lower Bound Theorem: Any comparison-based sort requires Omega(N log N)'
    ],
    asciiDiagram: `[ BINARY SEARCH ON SORTED ARRAY ]
Target = 23
Indexes:   0    1    2    3    4    5    6
Values:  [ 2,   5,   8,  12,  16,  23,  38 ]
           ^              ^              ^
          Low            Mid            High
Step 1: Mid=3 (val 12) < 23 -> Search right half!
New Low = Mid + 1 = 4

Indexes:   4    5    6
Values:  [ 16,  23,  38 ]
           ^    ^    ^
          Low  Mid  High
Step 2: Mid=5 (val 23) == 23 -> Found at Index 5! (2 comparisons vs 6)

[ MERGE SORT: DIVIDE & CONQUER TREE ]
             [ 38, 27, 43, 3, 9, 82, 10 ]
                    /             \\
         [ 38, 27, 43 ]         [ 3, 9, 82, 10 ]
           /       \\               /         \\
       [ 38 ]    [ 27, 43 ]     [ 3, 9 ]    [ 82, 10 ]
Merge: [ 27, 38, 43 ]            [ 3, 9, 10, 82 ]
Final: [ 3, 9, 10, 27, 38, 43, 82 ]`,
    complexity: {
      best: 'Binary Search: O(1) | Quick Sort: O(N log N)',
      average: 'Binary Search: O(log N) | Merge/Quick: O(N log N)',
      worst: 'Binary Search: O(log N) | Quick Sort: O(N^2) (bad pivot)',
      space: 'Merge Sort: O(N) | Quick Sort: O(log N) recursion',
      notes: 'Merge Sort guarantees O(N log N) worst-case and stability; Quick Sort is faster in practice due to cache locality and low overhead.'
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++: Robust Binary Search (Overflow-Safe)',
        code: `#include <iostream>
#include <vector>

// Overflow-safe Binary Search: mid = low + (high - low) / 2
int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow
        
        if (arr[mid] == target) {
            return mid; // Found
        } else if (arr[mid] < target) {
            low = mid + 1; // Discard left half
        } else {
            high = mid - 1; // Discard right half
        }
    }
    return -1; // Not found
}

int main() {
    std::vector<int> nums = {3, 9, 14, 19, 25, 33, 42, 56, 70};
    int target = 33;
    int index = binarySearch(nums, target);
    
    std::cout << "Target " << target << " found at index: " << index << std::endl;
    return 0;
}`,
        explanation: 'Always use low + (high - low) / 2 instead of (low + high) / 2 to prevent 32-bit signed integer overflow when low + high > 2,147,483,647.'
      },
      {
        language: 'javascript',
        title: 'JavaScript: Quick Sort with In-Place Partitioning',
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Lomuto partition
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

const list = [64, 34, 25, 12, 22, 11, 90];
console.log("Sorted:", quickSort([...list]));`,
        explanation: 'Lomuto partition scheme reorganizes elements smaller than the pivot to the left side and places pivot in its final sorted position.'
      }
    ],
    commonPitfalls: [
      'Integer Overflow in Binary Search: Using (low + high) / 2 causes negative mid values in large arrays.',
      'Infinite Loop in Binary Search: Forgetting low = mid + 1 or high = mid - 1 when target is not equal.',
      'Worst-Case Quick Sort: Sorting an already sorted array with naive first/last pivot produces O(N^2) execution. Use randomized pivot.',
      'Unstable Sort Usage: Using an unstable sort when ordering objects by multiple fields.'
    ],
    practiceProblems: [
      {
        title: 'Search in Rotated Sorted Array (LeetCode #33)',
        difficulty: 'Medium',
        description: 'Given an array sorted in ascending order and rotated at some unknown pivot, find a target in O(log N).',
        approachHint: 'Check which half (left or right) is normally sorted, then determine if target lies in that range.'
      },
      {
        title: 'Kth Largest Element in an Array (LeetCode #215)',
        difficulty: 'Medium',
        description: 'Find the kth largest element in an unsorted array without full sorting.',
        approachHint: 'Use QuickSelect (average O(N)) or a Min-Heap of size K.'
      },
      {
        title: 'Merge Sorted Array (LeetCode #88)',
        difficulty: 'Easy',
        description: 'Merge nums2 into nums1 as one sorted array in-place.',
        approachHint: 'Iterate backwards from the end of both arrays to avoid overwriting elements.'
      }
    ],
    downloadFileName: 'CS_Study_Hub_Sorting_and_Searching_Notes.md'
  },
  {
    id: 'trees-bst',
    title: 'Trees & Binary Search Trees',
    category: 'Non-Linear Hierarchical Structures',
    readTime: '16 min read',
    slideCount: 30,
    badgeColor: 'purple',
    summary: 'Traversals (Inorder, Preorder, Postorder, Level-order), BST properties, AVL rotations, and balanced search trees.',
    keyConcepts: [
      'Root, Edge, Leaf, Depth, Height, and Degree definitions',
      'BST Invariant: Left subtree < Root < Right subtree',
      'Inorder traversal of BST yields strictly sorted sequence',
      'Breadth-First Search (BFS) / Level-Order using Queue',
      'Depth-First Search (DFS) using Call Stack',
      'Self-Balancing Trees (AVL & Red-Black) guarantee O(log N) operations'
    ],
    asciiDiagram: `[ BINARY SEARCH TREE (BST) ]
               50
             /    \\
           30      70
          /  \\    /  \\
         20  40  60   80

Traversals:
- Inorder   (L, Root, R): 20, 30, 40, 50, 60, 70, 80  [SORTED!]
- Preorder  (Root, L, R): 50, 30, 20, 40, 70, 60, 80  [Copy tree]
- Postorder (L, R, Root): 20, 40, 30, 60, 80, 70, 50  [Delete tree]
- Level-Order (BFS)     : 50 | 30, 70 | 20, 40, 60, 80`,
    complexity: {
      best: 'Search / Insert / Delete: O(log N)',
      average: 'Search / Insert / Delete: O(log N)',
      worst: 'Unbalanced Skewed Tree: O(N)',
      space: 'O(H) where H is tree height (log N to N)',
      notes: 'Balanced trees ensure height H = floor(log2 N). Degenerate skewed trees behave like singly linked lists.'
    },
    codeSnippets: [
      {
        language: 'cpp',
        title: 'C++: BST Node Insertion & Inorder Traversal',
        code: `#include <iostream>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* insertBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) {
        root->left = insertBST(root->left, val);
    } else if (val > root->val) {
        root->right = insertBST(root->right, val);
    }
    return root;
}

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    std::cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = nullptr;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) root = insertBST(root, v);
    
    std::cout << "BST Inorder Traversal: ";
    inorder(root);
    std::cout << std::endl;
    return 0;
}`,
        explanation: 'Recursive insertion maintains the BST invariant. Inorder traversal visits left, root, then right nodes.'
      },
      {
        language: 'javascript',
        title: 'JavaScript: Maximum Depth of Binary Tree',
        code: `function maxDepth(root) {
  if (!root) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return 1 + Math.max(leftDepth, rightDepth);
}

// Demo
const tree = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

console.log("Max Depth:", maxDepth(tree)); // Output: 3`,
        explanation: 'Postorder DFS calculates maximum depth by taking 1 + max(left, right) heights.'
      }
    ],
    commonPitfalls: [
      'Skewed BST Degradation: Inserting sequentially sorted data into a raw BST creates an O(N) linear chain.',
      'Deleting Nodes with Two Children: Must find either Inorder Predecessor (max of left subtree) or Inorder Successor (min of right subtree).',
      'Forgetting Base Case: Omitting if (root == nullptr) causes segmentation faults.'
    ],
    practiceProblems: [
      {
        title: 'Validate Binary Search Tree (LeetCode #98)',
        difficulty: 'Medium',
        description: 'Determine if a given binary tree is a valid BST.',
        approachHint: 'Pass valid minimum and maximum range constraints down to each child node.'
      },
      {
        title: 'Lowest Common Ancestor of a BST (LeetCode #235)',
        difficulty: 'Medium',
        description: 'Find the lowest node in T that has both p and q as descendants.',
        approachHint: 'If both p and q values are greater than current node, traverse right; if both are smaller, traverse left.'
      },
      {
        title: 'Binary Tree Level Order Traversal (LeetCode #102)',
        difficulty: 'Medium',
        description: 'Return the level order traversal of its nodes values level-by-level.',
        approachHint: 'Use a standard FIFO queue, processing all nodes at current queue size per level.'
      }
    ],
    downloadFileName: 'CS_Study_Hub_Trees_and_BST_Notes.md'
  }
];
