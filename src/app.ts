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
	res.send('Hello World! Node');
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
