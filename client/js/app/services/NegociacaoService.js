class NegociacaoService {
	constructor(){
		this._http = new HttpService();
	}

	obterNegociacoes(){
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()
		])
		.then(periodos => {
			return periodos.reduce((arrayFlatened, array) => arrayFlatened.concat(array), []);
		})
		.catch(erro => {
			throw new Error(erro);
		});
	}

	obterNegociacoesDaSemana(){
		let url = 'negociacoes/semana';

		return this._http
			.get(url)
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana');
			});
	}

	obterNegociacoesDaSemanaAnterior(){
		let url = 'negociacoes/anterior';

		return this._http
			.get(url)
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana anterior');
			});
	}

	obterNegociacoesDaSemanaRetrasada(){
		let url = 'negociacoes/retrasada';

		return this._http
			.get(url)
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível obter as negociações da semana retrasada');
			});
	}
}
