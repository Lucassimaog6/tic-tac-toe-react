import { useState } from 'react';
import XImage from './img/x.png';
import OImage from './img/o.png';

enum Valor {
	None,
	X = 'X',
	O = 'O',
}

let nextToPlay = Valor.X;

export default () => {
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
	};
	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center bg-slate-700'>
			<h1 className='my-10 text-4xl text-slate-300'>Proximo a jogar é o {nextToPlay.toString()}</h1>

			<div className='grid grid-cols-3 w-11/12 gap-3 max-w-lg aspect-square bg-slate-900 items-stretch'>
				{table.map((row, rowIndex) => {
					return row.map((valor, col) => {
						return valor === Valor.None ? (
							<button
								key={col}
								onClick={() => HandleClick(rowIndex, col)}
								className='w-full aspect-square bg-slate-700 hover:bg-slate-600 transition-all'></button>
						) : (
							<button key={col} className='w-full aspect-square bg-slate-700 grid place-items-center'>
								{valor === Valor.X ? <img src={XImage} /> : <img src={OImage} />}
							</button>
						);
					});
				})}
			</div>
		</div>
	);
};
