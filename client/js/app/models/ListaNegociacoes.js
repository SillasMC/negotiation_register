class ListaNegociacoes {
	constructor(trigger) {
		this._negociacoes	= [];
		this._trigger 	= trigger;
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);
		this._trigger(this);
	}

	get negociacoes() {
		return new Array(...this._negociacoes);
	}

	esvazia() {
		this._negociacoes = [];
		this._trigger(this);
	}
}
