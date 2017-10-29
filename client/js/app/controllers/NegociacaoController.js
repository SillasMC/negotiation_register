class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade =  $('#quantidade');
		this._inputValor = $('#valor');
	}

	adiciona(event) {
		event.preventDefault();

		let data = new Date(...
			this._inputData.value
			.split('-')
			.map((value, index) => (index === 1) ? value - 1 : value)
		);

		let negociacao = new Negociacao(
			data,
			this._inputQuantidade.value,
			this._inputValor.value
	 	);

		console.log(negociacao);
	}
}
