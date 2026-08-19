import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

const products = [
	{ id: 1, name: 'Keyboard', price: 1200 },
	{ id: 2, name: 'Mouse', price: 700 },
	{ id: 3, name: 'Monitor', price: 4500 },
	{ id: 4, name: 'Headphones', price: 950 },
	{ id: 5, name: 'USB cable', price: 400 },
	{ id: 6, name: 'Printer', price: 18500 },
	{ id: 7, name: 'Router', price: 2100 },
	{ id: 8, name: 'Computer desk', price: 7500 },
];

app.get('/', (req: Request, res: Response) => {
	res.send(`<style>
			.box {
				width: 260px;
				height: 160px;
				background-color: #4CAF50;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 12px;
				font-family: sans-serif;
				text-align: center;
				margin: 50px auto;
				border-radius: 12px;
			}
			.buttons {
				display: flex;
				flex-direction: row;
				gap: 12px;
			}
			.box button {
				padding: 8px 16px;
				border: none;
				border-radius: 6px;
				background-color: #ffffff;
				color: #4CAF50;
				font-weight: bold;
				cursor: pointer;
			}
		</style>
		<div class="box">
			Перевір ендпоінти на проді
			<div class="buttons">
				<button onclick="window.open('/health', '_blank')">Health</button>
				<button onclick="window.open('/products', '_blank')">Products</button>
			</div>
		</div>
		<script>
			window.onload = () => {
				alert('Вітаємо на сторінці!');
			};
		</script>`
	);
});

app.get('/health', (req: Request, res: Response) => {
	res.json(true);
});

app.get('/products', (req: Request, res: Response) => {
	res.json(products);
});

if (!process.env.VERCEL) {
	app.listen(3000);
}

export default app;
