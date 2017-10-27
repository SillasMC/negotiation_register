var campos = [
	document.querySelector('#data'),
	document.querySelector('#valor'),
	document.querySelector('#quantidade')
];

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', (event) => {
	event.preventDefault();// Prevent the action of reloading the page

	var tr = document.createElement('tr');

	campos.forEach((campo) => {
		var td = document.createElement('td');
		td.textContent = campo.value;
		tr.appendChild(td);
	});

	var tdVolume = document.createElement('td');
	tdVolume.textContent = campos[1].value * campos[2].value;

	tr.appendChild(tdVolume);

	tbody.appendChild(tr);

	campos[0].value = '';
	campos[1].value = 1;
	campos[2].value = 0;

	campos[0].focus();

});