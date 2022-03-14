let tip = 12.00 * (20 / 100);
let tax = 12.00 * (8 / 100);
console.log(12.00 + tip + tax);
console.log((12.00 + tip + tax) - Math.floor(12.00 + tip + tax));
if (((12.00 + tip + tax) - Math.floor(12.00 + tip + tax)) > 0.5) {

    console.log(Math.ceil(12 + tip + tax));
} else {
    console.log(Math.floor(12 + tip + tax));
}