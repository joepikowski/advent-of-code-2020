const input = require('./input');

function inputToSeats(input){
    const rows = input.split('\n');
    const grid = rows.map(row => row.split(''));
    return grid;
}

function countStablizedSeats(seats){
    let count = 0;
    let repeat = false;
    let prevCount = -1;
    let prevSeats = [];

    while (!repeat){
        prevSeats = seats;
        prevCount = count;

        seats = stepSeating(seats);
        count = countSeatsOccupied(seats);

        if (count === prevCount){ //Could have truly checked array equality but this worked (twice now!)  O:)
            repeat = true;
        }
    }
    return countSeatsOccupied(seats);
}

function stepSeating(seats){
    seats = seats.map((row, rowIndex) => {
        return row.map((seat, colIndex) => {
            switch (seat) {
                case '.':
                    break;
                case '#':
                    if (sumOccupiedSurroundingSeats(rowIndex,colIndex,seats) >= 5){
                        seat = 'L';
                    }
                case 'L':
                    if (sumOccupiedSurroundingSeats(rowIndex,colIndex,seats) === 0){
                        seat = '#';
                    }
                    break;
            }

            return seat;
        });
    })
    return seats;
}

function sumOccupiedSurroundingSeats(row, col, seats){
    let count = 0;
    const slopes = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];

    slopes.forEach((slope,i) => {
        let testRow = row + slope[0], testCol = col + slope[1];
        let found = false;
        while (!found && testRow >= 0 && testCol >= 0 && testRow < seats.length && testCol < seats[0].length){

            switch (seats[testRow][testCol]){
                case '#':
                    ++count; found = true;
                    break;
                case 'L':
                    found = true;
                    break;
                case '.':
                    testRow += slope[0];
                    testCol += slope[1];
                    break;
            }
        }
    });

    return count;
}

function countSeatsOccupied(seats){
    let count = 0;
    seats.forEach(row => {
        row.forEach(seat => {
            if (seat === '#'){ count++; }
        })
    })
    return count;
}

const seats = inputToSeats(input.full);

const result = countStablizedSeats(seats);

console.log(result);
