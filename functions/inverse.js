"use strict";
function createAdjoin(matrix) {
    const adjoin = matrix.map(row => [...row]);
    adjoin.forEach((row, index) => {
        const identity_row = Array(row.length).fill(0);
        identity_row[index] = 1;
        row.push(...identity_row);
    });
    console.log(adjoin);
    return adjoin;
}
