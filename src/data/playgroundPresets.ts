import { PlaygroundPreset } from '../types';

export const playgroundPresets: PlaygroundPreset[] = [
  {
    id: 'js-binary-search',
    language: 'javascript',
    title: 'Binary Search (JS)',
    description: 'Finds target in sorted array in O(log N) time with low and high pointers.',
    code: `// Binary Search Algorithm in JavaScript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let iterations = 0;

  console.log("Searching for target:", target);
  console.log("Array elements:", arr.join(", "));

  while (low <= high) {
    iterations++;
    const mid = Math.floor(low + (high - low) / 2);
    console.log(\`Iteration \${iterations}: checking index \${mid} (value: \${arr[mid]})\`);

    if (arr[mid] === target) {
      console.log(\`Target \${target} found at index \${mid} after \${iterations} checks!\`);
      return mid;
    } else if (arr[mid] < target) {
      console.log(\`\${arr[mid]} < \${target} -> searching right half\`);
      low = mid + 1;
    } else {
      console.log(\`\${arr[mid]} > \${target} -> searching left half\`);
      high = mid - 1;
    }
  }

  console.log(\`Target \${target} was not found in the array.\`);
  return -1;
}

const numbers = [4, 8, 15, 16, 23, 42, 55, 68, 79, 91];
const targetToFind = 42;
const result = binarySearch(numbers, targetToFind);
console.log("Result index:", result);`
  },
  {
    id: 'js-reverse-linked-list',
    language: 'javascript',
    title: 'Reverse Linked List (JS)',
    description: 'Constructs a singly linked list and reverses it iteratively in O(N).',
    code: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}

function printList(head) {
  const values = [];
  let curr = head;
  while (curr !== null) {
    values.push(curr.val);
    curr = curr.next;
  }
  return values.join(" -> ") + " -> NULL";
}

// Build 10 -> 20 -> 30 -> 40
const head = new ListNode(10);
head.next = new ListNode(20);
head.next.next = new ListNode(30);
head.next.next.next = new ListNode(40);

console.log("Original List:", printList(head));
const reversedHead = reverseList(head);
console.log("Reversed List:", printList(reversedHead));`
  },
  {
    id: 'js-fibonacci-dp',
    language: 'javascript',
    title: 'Fibonacci DP with Memo (JS)',
    description: 'Compares recursive vs dynamic programming memoization.',
    code: `// Memoized Dynamic Programming
function fibDP(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 0) return 0;
  if (n === 1) return 1;

  memo[n] = fibDP(n - 1, memo) + fibDP(n - 2, memo);
  return memo[n];
}

console.log("Computing Fibonacci Sequence with Memoization:");
for (let i = 0; i <= 12; i++) {
  console.log(\`F(\${i}) = \${fibDP(i)}\`);
}

console.log("\\nTesting large Fibonacci number F(45):", fibDP(45));`
  },
  {
    id: 'cpp-binary-search',
    language: 'cpp',
    title: 'Binary Search (C++)',
    description: 'Standard C++ implementation using vector, cout, and stdin target lookup.',
    defaultStdin: '28',
    code: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    int step = 0;
    
    while (low <= high) {
        step++;
        int mid = low + (high - low) / 2;
        std::cout << "Pass " << step << ": mid index = " << mid << ", value = " << arr[mid] << std::endl;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

int main() {
    std::vector<int> data = {5, 12, 19, 28, 35, 47, 56, 68, 81};
    int target = 28;
    
    std::cout << "--- CS STUDY HUB: C++ BINARY SEARCH ---" << std::endl;
    std::cout << "Searching for target: " << target << std::endl;
    
    int result = binarySearch(data, target);
    if (result != -1) {
        std::cout << "Success! Element found at index: " << result << std::endl;
    } else {
        std::cout << "Element not found in vector." << std::endl;
    }
    return 0;
}`
  },
  {
    id: 'cpp-bubble-sort',
    language: 'cpp',
    title: 'Bubble Sort Tracing (C++)',
    description: 'Bubble sort with step-by-step swaps and pass visualization.',
    code: `#include <iostream>
#include <vector>

void printArray(const std::vector<int>& arr) {
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> arr = {64, 25, 12, 22, 11};
    int n = arr.size();
    
    std::cout << "Initial Array: ";
    printArray(arr);
    std::cout << "-----------------------------------" << std::endl;
    
    int totalSwaps = 0;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        std::cout << "--- Pass " << (i + 1) << " ---" << std::endl;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
                totalSwaps++;
                std::cout << "Swapped (" << arr[j+1] << ", " << arr[j] << ") -> ";
                printArray(arr);
            }
        }
        
        if (!swapped) {
            std::cout << "Early exit: Array is already sorted!" << std::endl;
            break;
        }
    }
    
    std::cout << "-----------------------------------" << std::endl;
    std::cout << "Sorted Array: ";
    printArray(arr);
    std::cout << "Total swap operations performed: " << totalSwaps << std::endl;
    return 0;
}`
  },
  {
    id: 'cpp-stack-simulation',
    language: 'cpp',
    title: 'Stack ADT Implementation (C++)',
    description: 'Custom Stack class with push, pop, peek, and underflow/overflow checks.',
    code: `#include <iostream>
#include <vector>

class Stack {
private:
    std::vector<int> elements;
    int maxCapacity;
public:
    Stack(int cap = 5) : maxCapacity(cap) {}

    bool push(int val) {
        if (elements.size() >= maxCapacity) {
            std::cout << "[ERROR] Stack Overflow! Capacity " << maxCapacity << " reached." << std::endl;
            return false;
        }
        elements.push_back(val);
        std::cout << "Pushed: " << val << " (Size: " << elements.size() << ")" << std::endl;
        return true;
    }

    int pop() {
        if (isEmpty()) {
            std::cout << "[ERROR] Stack Underflow! Stack is empty." << std::endl;
            return -1;
        }
        int topVal = elements.back();
        elements.pop_back();
        std::cout << "Popped: " << topVal << " (Remaining: " << elements.size() << ")" << std::endl;
        return topVal;
    }

    int peek() const {
        if (isEmpty()) return -1;
        return elements.back();
    }

    bool isEmpty() const {
        return elements.empty();
    }
};

int main() {
    Stack myStack(4);
    std::cout << "=== CS Study Hub: Stack ADT Demo ===" << std::endl;
    myStack.push(10);
    myStack.push(20);
    myStack.push(30);
    std::cout << "Current Top Element: " << myStack.peek() << std::endl;
    myStack.push(40);
    myStack.push(50); // Demonstrates overflow protection!
    myStack.pop();
    myStack.pop();
    std::cout << "New Top Element: " << myStack.peek() << std::endl;
    return 0;
}`
  }
];
