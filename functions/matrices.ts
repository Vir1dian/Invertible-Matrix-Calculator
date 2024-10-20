interface Matrix {
  name: string;
  values: number[][];
  steps: string;
}

const matrices: Matrix[] = [
  {
    name: 'A',
    values: [
      [1, 0, -3, -2],
      [3, 1, -2, 5],
      [2, 2, 1, 4]
    ],
    steps: ''
  },
  {
    name: 'B',
    values: [
      [1, 1, 1, 500000],
      [3/100, 4/100, 5/100, 20500],
      [-5/2, 1, 0, 0]
    ],
    steps: ''
  },
  {
    name: 'C',
    values: [
      [0, 0, 2, -2],
      [0, 1, -7, 3],
      [5, 0, 4, 0]
    ],
    steps: ''
  },
  {
    name: 'D',
    values: [
      [0, 2, 4, 4, -8],
      [2, 4, -3, -5, 4],
      [5, 0, 1, -3, -4],
      [1, 1, 0, 1, 5]
    ],
    steps: ''
  },
  {
    name: 'E',
    values: [
      [2, 0, 7],
      [3, 4, 4],
      [0, 1, 0]
    ],
    steps: ''
  }
];
