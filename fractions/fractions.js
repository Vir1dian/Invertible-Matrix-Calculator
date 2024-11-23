"use strict";
class Fraction {
    constructor(numerator, denominator = 1, precision = 3) {
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
    simplify(precision = 5) {
        const adjusted_numerator = Math.round(this.numerator * Math.pow(10, precision));
        const adjusted_denominator = Math.round(this.denominator * Math.pow(10, precision));
        const common = gcf(adjusted_numerator, adjusted_denominator);
        this.numerator = adjusted_numerator / common;
        this.denominator = adjusted_denominator / common;
    }
    add(otherFraction) {
        const den_common = lcm(this.denominator, otherFraction.denominator);
        const num_sum = (this.numerator * den_common / this.denominator) + (otherFraction.numerator * den_common / otherFraction.denominator);
        return new Fraction(num_sum, den_common);
    }
    subtract(otherFraction) {
        const den_common = lcm(this.denominator, otherFraction.denominator);
        const num_diff = (this.numerator * den_common / this.denominator) - (otherFraction.numerator * den_common / otherFraction.denominator);
        return new Fraction(num_diff, den_common);
    }
    multiply(otherFraction) {
        if (typeof otherFraction === 'number') {
            return new Fraction(this.numerator * otherFraction, this.denominator);
        }
        const num_product = this.numerator * otherFraction.numerator;
        const den_product = this.denominator * otherFraction.denominator;
        return new Fraction(num_product, den_product);
    }
    divide(otherFraction) {
        if (otherFraction.numerator === 0) {
            throw new Error("Division by Zero.");
        }
        const num_quotient = this.numerator * otherFraction.denominator;
        const den_quotient = this.denominator * otherFraction.numerator;
        return new Fraction(num_quotient, den_quotient);
    }
    toString() {
        if (this.denominator === 1) {
            return `${this.numerator}`;
        }
        return `${this.numerator}/${this.denominator}`;
    }
    toDecimal() {
        return this.numerator / this.denominator;
    }
}
function gcf(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}
function lcm(a, b) {
    if (a === 0 || b === 0)
        return 0;
    return (a * b) / gcf(a, b);
}
function parseFraction(input) {
    let numerator, denominator;
    const slash_pos = input.indexOf('/');
    if (slash_pos !== -1) {
        numerator = parseFloat(input.substring(0, slash_pos));
        denominator = parseFloat(input.substring(slash_pos + 1));
        if (!numerator || !denominator) {
            throw new Error("Invalid string, cannot convert as Fraction.");
        }
        return new Fraction(numerator, denominator);
    }
    numerator = parseFloat(input);
    return new Fraction(numerator);
}
// const fracA: Fraction = new Fraction(11, 9);
// const fracB: Fraction = new Fraction(55, 18);
// console.log(fracA.divide(fracB).multiply(-1));
// const testCases = [
//   new Fraction(1, 2),
//   new Fraction(7, 1.4),
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
