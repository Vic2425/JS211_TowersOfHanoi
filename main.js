'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
    // * Each number represents the largest to smallest tokens: 
    // * 4 is the largest, 
    // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
   // Moving piece from A (far-left) to C(far-right) by grabbing the last element
   // in the A array and placing it on the B array.
const movePiece = (startStack, endStack) => {
  // Your code here
  // This function should move the last item from the array(startStack) and add it to the array(endStack). 
  // use pop to move the the last stack which is the one on top to the end of endStack using push.
 if (isLegal(startStack, endStack)) {
  stacks[endStack].push(stacks[startStack].pop());
  }
}
// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// This function should check if the second move and following moves are legal before allowing the move.  
// Only smaller numbers should be stacked on larger numbers.

const isLegal = (startStack, endStack) => {
  // Your code here
  // created a variable to select the last element from the endStack array 
  let end = Number(stacks[endStack].slice(-1));
  // created a variable to select the last element from the startStack array
  let start = Number(stacks[startStack].slice(-1));
  // console.log("Start", start);
  // console.log("End", end);

  // compare startStack and endStack
  if (end === 0) {
    return true;
  } else if (start < end) {
    return true;
  } else {
    console.log("Invalid Input");
    return false;
  }
 
}

// What is a win in Towers of Hanoi? When should this function run?
// A win in Towers of Hanoi is when all 4 blocks have been legally moved 
// from one tower to one of the other towers 
// and are in order according to their weight 
const checkForWin = () => {
  // Your code here
  // Use if statement to check for winner if all the blocks 
  //has been legally moved from startStack to endStack by blocks' sizes.
if(stacks.a.length === 0 && stacks.b.length === 4 || stacks.c.length === 4) {
  // alert('You win this game!')
  return true
} else {
  return false;
}
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  movePiece(startStack, endStack);
  checkForWin();
  if (checkForWin === true) {
    alert('You won the game!')
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

if (typeof describe === 'function') {
// Test for movePiece
describe('#movePiece', () => {
    it('stack.a should start with all 4 pieces', () => {
    stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
    };
    });
    });

    // unit test for printStacks
  describe('#printStacks()', () => {
    it('should print out all stacks', () => {
    console.log("a: " + stacks.a);
    console.log("b: " + stacks.b);
    console.log("c: " + stacks.c);
    });
  });

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);  
      // unite test
      stacks = { a: [1], b: [], c: [4, 3, 2] };
      assert.equal(checkForWin(), false);
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true); });
  });

} else {

  getPrompt();

}
