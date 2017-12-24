// Module Pattern for ConnectionFactory
var ConnectionFactory = (function () {
	const stores		= ['negociacoes'];
	const version		= 4;
	const dbName		= 'aluraframe';

	var connection		= null;
	var close			= null;

	return class ConnectionFactory {
		constructor() {
			throw new Error('Não é possível criar instâncias de ConnectionFactory');
		}

		static getConnection() {
			return new Promise((resolve, reject) => {
				let openRequest = window.indexedDB.open(stores, version);

				// IDB is created or updated
				openRequest.onupgradeneeded = e => {
					ConnectionFactory._createStores(e.target.result);
				};

				// Successfully connects to IDB
				openRequest.onsuccess = e => {
					if(!connection) {
						connection = e.target.result;

						// Throw an error if the user wants to close the connection
						close = connection.close.bind(connection);
						connection.close = function() {
							throw new Error('Você não pode fechar diretamente a conexão');
						};
					}

					resolve(connection);
				};

				// Connection to IDB failed
				openRequest.onerror = e => {
					console.log(e.target.error);
					reject(e.target.error.name);
				};
			});
		}

		static _createStores(connection) {
			stores.forEach(store => {
				if(connection.objectStoreNames.contains(store)) {
					connection.deleteObjectStore(store);
				}

				connection.createObjectStore(store, { autoIncrement: true });
			});

		}

		static closeConnection() {
			if (connection) {
				close();
				connection = null;
			}
		}
	}

})();
