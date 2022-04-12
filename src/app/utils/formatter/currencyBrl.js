const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2
});

const currencyString = new Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2
});

export { currencyString };

export default formatter;
