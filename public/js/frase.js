$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

var spinner = $("#spinner");

function fraseAleatoria() {

	toogleSpinner();
	$.get('http://localhost:3000/frases', trocaFraseAleatoria).fail(toggleErro).always(toogleSpinner);

}

function toggleErro () {
	$("#erro").show();
	setTimeout(function () {
		
		$("#erro").toggle();
		
	}, 1500);
}

function trocaFraseAleatoria(data) {
	
	var frase = $('.frase');

	var rand = Math.floor(Math.random() * data.length);

	frase.text(data[rand].texto);

	atualizaTamanhoFrase();
	atualizaTempoInicial(data[rand].tempo);

}

function toogleSpinner() {
	
	spinner.toggle();
	
}

function buscaFrase() {


	var id = $("#frase-id").val();

	var params = {id: id};

	toogleSpinner();
	$.get('http://localhost:3000/frases', params, trocaFrase).fail(toggleErro).always(toogleSpinner);
}

function trocaFrase(data) {
	
	var frase = $('.frase');

	frase.text(data.texto);

	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);

}