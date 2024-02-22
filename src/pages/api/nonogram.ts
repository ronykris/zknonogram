import { NextApiRequest, NextApiResponse } from 'next';

const generateNonogram = (size: number): boolean[][] => {
  let nonogram = new Array<boolean[]>(size);

  for (let i = 0; i < size; i++) {
      nonogram[i] = new Array<boolean>(size);
      for (let j = 0; j < size; j++) {
          nonogram[i][j] = Math.random() > 0.5;
      }
  }
  return nonogram;
}
 
const computeClues = (nonogram: boolean[][]): { rowClues: number[][], colClues: number[][] } => {
  const size = nonogram.length;
  let rowClues = new Array<number[]>(size);
  let colClues = new Array<number[]>(size);

  // Compute row clues
  for (let i = 0; i < size; i++) {
      rowClues[i] = [];
      let count = 0;
      for (let j = 0; j < size; j++) {
          if (nonogram[i][j]) {
              count++;
          } else if (count > 0) {
              rowClues[i].push(count);
              count = 0;
          }
      }
      if (count > 0) rowClues[i].push(count); // Add remaining count if any
  }

  // Compute column clues
  for (let j = 0; j < size; j++) {
      colClues[j] = [];
      let count = 0;
      for (let i = 0; i < size; i++) {
          if (nonogram[i][j]) {
              count++;
          } else if (count > 0) {
              colClues[j].push(count);
              count = 0;
          }
      }
      if (count > 0) colClues[j].push(count); // Add remaining count if any
  }
  return { rowClues, colClues };
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const size = 5; // Nonogram size
      const grid  = generateNonogram(size)
      const { rowClues, colClues } = computeClues(grid)
      
      res.status(200).json({ nonogram: grid, rowClues, colClues });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

  export default handler