class Fraction {
  numerator: number;
  denominator: number;

  constructor(numerator: number, denominator: number = 1, precision: number = 3) {
    if (denominator === 0) {
      throw new Error("Division by Zero");
    }

    // Standardize negative denominators
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }

    this.numerator = numerator;
    this.denominator = denominator;
    this.simplify(precision);
  }

  simplify(precision: number = 5) {
    const adjusted_numerator = Math.round(this.numerator * Math.pow(10, precision));
    const adjusted_denominator = Math.round(this.denominator * Math.pow(10, precision));

    const common = gcf(adjusted_numerator, adjusted_denominator);
    this.numerator = adjusted_numerator / common;
    this.denominator = adjusted_denominator / common;
  }

  add(otherFraction: Fraction): Fraction {
    const den_common = lcm(this.denominator, otherFraction.denominator);
    const num_sum = (this.numerator * den_common / this.denominator) + (otherFraction.numerator * den_common / otherFraction.denominator);

    return new Fraction(num_sum, den_common);
  }
  subtract(otherFraction: Fraction): Fraction {
    const den_common = lcm(this.denominator, otherFraction.denominator);
    const num_diff = (this.numerator * den_common / this.denominator) - (otherFraction.numerator * den_common / otherFraction.denominator);

    return new Fraction(num_diff, den_common);
  }
  multiply(otherFraction: Fraction): Fraction {
    const num_product = this.numerator * otherFraction.numerator;
    const den_product = this.denominator * otherFraction.denominator;
  
    return new Fraction(num_product, den_product);
  }
  divide(otherFraction: Fraction): Fraction {
    if (otherFraction.numerator === 0) {
      throw new Error("Division by Zero");
    }

    const num_quotient = this.numerator * otherFraction.denominator;
    const den_quotient = this.denominator * otherFraction.numerator;
  
    return new Fraction(num_quotient, den_quotient);
  }

  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

}

function gcf(a: number, b: number): number {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return (a * b) / gcf(a, b);
}

// const fracA: Fraction = new Fraction(1e9);
// const fracB: Fraction = new Fraction(3/4);
// console.log(fracA.toString());

// const testCases = [
//   new Fraction(1, 2),
//   new Fraction(1/3),
//   new Fraction(3.5, 7),
//   new Fraction(0.6667, 0.99), 
//   new Fraction(-0.99),
//   new Fraction(-2.5,8),
//   new Fraction(43,-0.8),
//   new Fraction(-8.9,-2.6),
//   new Fraction(123456789, 987654321), // 13717421/109739369
//   new Fraction(1, 2).add(new Fraction(1, 3)),
//   new Fraction(1, 2).add(new Fraction(-1, 2)),
//   new Fraction(1.5, 1).add(new Fraction(0.5, 1)),
//   new Fraction(0.0)
// ];

// testCases.forEach((fraction, index) => {
//   console.log(`Test Case ${index + 1}: ${fraction.toString()}`);
// });