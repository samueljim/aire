const { get } = require("mongoose");

module.exports = {
  1: {
    get answer() {
      var sum = 0;
      var n = 1000;

      while (n--) {
        if (n % 3 === 0 || n % 5 === 0) {
          sum += n;
        }
      }
      return sum;
    },
    get description() {
      return `<p>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.</p><p>Find the sum of all the multiples of 3 or 5 below 1000.</p>`;
    },
  },
  3: {
    get answer() {
      // starting index (first prime)
      var i = 2;
      var num = 600851475143;

      while (num > i) {
        if (num % i === 0) {
          num = num / i;
        }

        i++;
      }

      return i;
    },
    get description() {
      return `<p>The prime factors of 13195 are 5, 7, 13 and 29.</p> <p>What is the largest prime factor of the number 600851475143 ?</p>`;
    },
  },
};
