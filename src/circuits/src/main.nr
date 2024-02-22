use dep::std;

struct Clues {
    row_clues: [[u8; 2];5], // Each row has up to 2 clues, for simplicity
    col_clues: [[u8; 2];5], // Each column has up to 2 clues
}

fn main(solution_grid: [[bool; 5]; 5], clues: Clues) {
    // Iterate over each row and column to apply verification logic
    let transposed_grid = transpose(solution_grid);
    for i in 0..5 {
        verify_row(solution_grid[i], clues.row_clues[i]);
        verify_col(transposed_grid[i], clues.col_clues[i]);
    }
}

fn transpose(sol_grid: [[bool; 5]; 5]) -> [[bool; 5]; 5] {
    let mut transposed_grid = [[false; 5]; 5];
    for i in 0..5 {
        for j in 0..5 {
            transposed_grid[j][i] = sol_grid[i][j];
        }
    }
    transposed_grid
}

// Function to verify a single row against its clues
fn verify_row(row: [bool; 5], clues: [u8; 2]) {
    // Apply constraints for the row based on the clues
    // Constraints should ensure the pattern of true/false matches the clues, including the required gaps
    let mut total_filled = 0;
    for z in 0..5 {
        total_filled += row[z] as u8;
    }
    assert(total_filled == clues[0] + clues[1]); //constraint #1

    // start pos of first run

    let mut sequence: [bool; 5] = [false; 5];
    for i in 0..5 {
        sequence[i] = false;
    }

    let mut sequence_count: u32 = 0;
    let mut sequence_array: [[bool; 5]; 100] = [[false; 5]; 100];
    for i in 0..(5 - clues[0] - clues[1] - 1) {
        sequence[i] = true;
        if (clues[0] > 1) {
            for clue_1 in i + 1..(i + clues[0]) {
                sequence[clue_1] = true;
            }
        };
        for j in (i + clues[0] + 1)..(5 - clues[1]) {
            sequence[j] = true;
            if (clues[1] > 1) {
                for clue_2 in j + 1..(j + clues[1]) {
                    sequence[clue_2] = true;
                }
            };
        }

        sequence_array[sequence_count] = sequence;
        sequence_count += 1;
    }
    //Constraint#2 verify the 'row' is in the 'sequence' array.
    let mut is_in_array = false;
    for seq in sequence_array {
        if seq == row {
            is_in_array = true;
            //break; // Optimization: No need to check further if found
        };
    }
    // Assert based on the result
    assert(is_in_array);
}

fn verify_col(col: [bool; 5], clues: [u8; 2]) {
    // Apply constraints for the row based on the clues
    // Constraints should ensure the pattern of true/false matches the clues, including the required gaps
    let mut total_filled = 0;
    for z in 0..5 {
        total_filled += col[z] as u8;
    }
    assert(total_filled == clues[0] + clues[1]); //constraint #1

    // start pos of first run

    let mut sequence: [bool; 5] = [false; 5];
    for i in 0..5 {
        sequence[i] = false;
    }

    let mut sequence_count: u32 = 0;
    let mut sequence_array: [[bool; 5]; 100] = [[false; 5]; 100];
    for i in 0..(5 - clues[0] - clues[1] - 1) {
        sequence[i] = true;
        if (clues[0] > 1) {
            for clue_1 in i + 1..(i + clues[0]) {
                sequence[clue_1] = true;
            }
        };
        for j in (i + clues[0] + 1)..(5 - clues[1]) {
            sequence[j] = true;
            if (clues[1] > 1) {
                for clue_2 in j + 1..(j + clues[1]) {
                    sequence[clue_2] = true;
                }
            };
        }

        sequence_array[sequence_count] = sequence;
        sequence_count += 1;
    }
    //Constraint#2 verify the 'row' is in the 'sequence' array.
    let mut is_in_array = false;
    for seq in sequence_array {
        if seq == col {
            is_in_array = true;
            //break; // Optimization: No need to check further if found
        };
    }
    // Assert based on the result
    assert(is_in_array);
}
