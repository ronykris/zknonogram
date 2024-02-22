'use client'

import { useState } from 'react';

interface Cell {
  filled: boolean;
}

const createInitialGrid = (): Cell[][] =>
  Array(5)
    .fill(null)
    .map(() => Array(5).fill(null).map(() => ({ filled: false })));

const GridPage = () => {
  const [grid, setGrid] = useState<Cell[][]>(createInitialGrid());
  const [rowClues, setRowClues] = useState<number[][]>([])
  const [colClues, setColClues] = useState<number[][]>([])

  const fetchNewNonogram = async () => {
    const response = await fetch('/api/nonogram');
    const data = await response.json();
    console.log(data)
    const { nonogram, rowClues, colClues } = data
    
    setGrid(nonogram.map((row: any[]) => row.map(cell => ({ filled: cell }))));
    setRowClues(rowClues);
    setColClues(colClues);
  }

  const toggleCellFilled = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return { ...cell, filled: !cell.filled };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const resetGrid = () => {
    setGrid(createInitialGrid());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {/* Column Clues */}
        <div className="flex justify-center mb-2">
          {colClues.map((colClue, index) => (
            <div key={index} className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center">
              {colClue.join(',')}
            </div>
          ))}
        </div>
        <div className="flex">
          {/* Row Clues */}
          <div className="mr-2">
            {rowClues.map((rowClue, index) => (
              <div key={index} className="w-10 h-10 md:w-14 md:h-14 flex justify-end items-center pr-1">
                {rowClue.join(',')}
              </div>
            ))}
          </div>
          {/* Nonogram Grid */}
          <div className="grid grid-cols-5 gap-2">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 md:w-14 md:h-14 border-2 transition duration-500 ease-in-out ${cell.filled ? 'bg-black' : 'bg-transparent'} border-blue-500 rounded-lg`}
                  onClick={() => toggleCellFilled(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={fetchNewNonogram}>New</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={resetGrid}>Reset</button>
      </div>
    </div>
  );
};

export default GridPage;
