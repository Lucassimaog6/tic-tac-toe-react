import { useState } from 'react';
import XImage from './img/x.png';
import OImage from './img/o.png';

enum Valor {
	None,
	X = 'X',
	O = 'O',
}

let nextToPlay = Valor.X;
const X_onRow = Array<number>(3).fill(0);
const O_onRow = Array<number>(3).fill(0);
const X_onCol = Array<number>(3).fill(0);
const O_onCol = Array<number>(3).fill(0);
const X_onDiagonal = Array<number>(3).fill(0);
const O_onDiagonal = Array<number>(3).fill(0);
const X_onDiagonalReverse = Array<number>(3).fill(0);
const O_onDiagonalReverse = Array<number>(3).fill(0);
let jogadas = 0;
export default () => {
	const [victoryMessage, setVictoryMessage] = useState('');
	const [table, setTable] = useState<Array<Array<Valor>>>([
		[Valor.None, Valor.None, Valor.None],
		[Valor.None, Valor.None, Valor.None],
		[Valor.None, Valor.None, Valor.None],
	]);

	const HandleClick = (row: number, col: number) => {
		const newTable = table;
		newTable[row][col] = nextToPlay;
		setTable([...newTable]);
		nextToPlay === Valor.X ? (nextToPlay = Valor.O) : (nextToPlay = Valor.X);
		CheckVictoryCases(row, col, nextToPlay);
	};

	const CheckVictoryCases = (row: number, col: number, nextToPlay: Valor) => {
		jogadas++;
		nextToPlay === Valor.X ? O_onRow[row]++ : X_onRow[row]++;
		if (X_onRow[row] === 3) setVictoryMessage('X ganhou!');
		if (O_onRow[row] === 3) setVictoryMessage('O ganhou!');

		nextToPlay === Valor.X ? O_onCol[col]++ : X_onCol[col]++;
		if (X_onCol[col] === 3) setVictoryMessage('X ganhou!');
		if (O_onCol[col] === 3) setVictoryMessage('O ganhou!');

		if (row === col) {
			nextToPlay === Valor.X ? O_onDiagonal[row]++ : X_onDiagonal[row]++;
			if (!X_onDiagonal.includes(0)) setVictoryMessage('X ganhou!');
			if (!O_onDiagonal.includes(0)) setVictoryMessage('O ganhou!');
		}

		if (row + col === 2) {
			nextToPlay === Valor.X ? O_onDiagonalReverse[row]++ : X_onDiagonalReverse[row]++;
			if (eval(X_onDiagonalReverse.join('+')) === 3) setVictoryMessage('X ganhou!');
			if (eval(O_onDiagonalReverse.join('+')) === 3) setVictoryMessage('O ganhou!');
		}

		if (jogadas === 9) {
			setVictoryMessage('Deu velha!');
		}
	};

	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center bg-slate-700'>
			{victoryMessage !== '' ? (
				<h1 className='my-10 text-4xl text-slate-300'>{victoryMessage}</h1>
			) : (
				<h1 className='my-10 text-4xl text-slate-300'>Proximo a jogar é o {nextToPlay.toString()}</h1>
			)}

			<div className='grid grid-cols-3 w-11/12 gap-3 max-w-lg aspect-square bg-slate-900 items-stretch'>
				{table.map((row, rowIndex) => {
					return row.map((valor, col) => {
						return valor === Valor.None && victoryMessage === '' ? (
							<button
								key={col}
								onClick={() => HandleClick(rowIndex, col)}
								className='w-full aspect-square bg-slate-700 hover:bg-slate-600 transition-all'></button>
						) : (
							<button key={col} className='w-full aspect-square bg-slate-700 grid place-items-center'>
								{valor === Valor.X ? (
									<img src={XImage} />
								) : valor === Valor.O ? (
									<img src={OImage} />
								) : (
									<></>
								)}
							</button>
						);
					});
				})}
			</div>
		</div>
	);
};
