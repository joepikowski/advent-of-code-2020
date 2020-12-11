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

        if (count === prevCount){ //Could have truly checked array equality but this worked O:)
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
                    if (sumOccupiedSurroundingSeats(rowIndex,colIndex,seats) >= 4){
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

    const coordinates = getCoordinatesToCheck(row, col, seats);

    coordinates.forEach((coordinate, i) => {
        if (seats[coordinate[0]][coordinate[1]] === '#'){ ++count; }
    });

    return count;
}

function getCoordinatesToCheck(row, col, seats){
    let coordinates = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1]
    ];

    coordinates = coordinates.filter(pair => pair[0] >= 0 && pair[1] >= 0 && pair[0] < seats.length && pair[1] < seats[0].length);

    return coordinates;
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
