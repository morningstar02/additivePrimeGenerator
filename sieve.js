var apString = '';

function listPrimes( max ) {
    // Start with an empty list of primes
    var primes2 = [];
    // Initialize the sieve - each number is prime unless proven otherwise
    var sieve = [];
    for( var i = 1;  i <= max;  i++ ) {
        sieve[i] = true;
    }
    // Now check each number from 2 through max
    for( var p = 2;  p <= max;  p++ ) {
        if( sieve[p] ) {
            // p is prime, save it in the output list
            primes2.push( p );
            // Mark p * 2, p * 3, p * 4, etc. as non-prime
            for( var t = p * 2;  t <= max;  t += p ) {
                sieve[t] = false;
            }
        }
    }
    return primes2;
}

function addDigits( value ) {
    sum = 0;

    while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }

    return sum; 
}

function isPrime( n ) {
    if ( n%1 || n<2 ) return false;
    let max = Math.sqrt(n);
    for( let i = 2;  i <= max;  i++ ) {
        if( n % i === 0 )
            return false;
    }
    return true;
}

function computeAdditivePrimes() {
    const primeNumbers = listPrimes(endNumber);

    const additiveCandidates = [];
    
    const primeToSumMap = new Map();
    
    primeNumbers.forEach(function(element) {
        if(element >= startNumber){
            primeToSumMap.set(element, addDigits(element));
        }
    });
    
    const additivePrimes = [];
    
    primeToSumMap.forEach((sum, prime) => {
        if(isPrime(sum)) {
            additivePrimes.push(prime);
        }
    });
    
    var computedString = additivePrimes.join(' ');

    return computedString;
}


const startNumber = Number(process.argv[2]);
const endNumber = Number(process.argv[3]); 


if(startNumber == undefined) {
    process.stdout.write('first number is missing')
}else if(isNaN(startNumber)) {
    process.stdout.write('first argument should be a number')
}else if(endNumber == undefined) {
    process.stdout.write('second number is missing')
}else if(isNaN(endNumber)) {
    process.stdout.write('second argument should be a number')
}else if(startNumber > endNumber) {
    process.stdout.write('first number should be less than equal to second number')
}else{
    var apString = computeAdditivePrimes();
    if(apString.length == 0) {
        process.stdout.write('not found');
    } else {
        process.stdout.write(apString);
    }
}
