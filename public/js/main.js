var tempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao");

$(function () {
	
	atualizaTamanhoFrase();
	inicializaCronometro();
	inicializaContadores();
	inicializaMarcores();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();
});


function atualizaTamanhoFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
	$("#tempo-digitacao").text(tempo);
	tempoRestante = tempo;
	
}

function inicializaCronometro() {

	var tempoRestante = $("#tempo-digitacao").text();
	campo.one("focus", function () {

		$("#botao-reiniciar").attr("disabled",true);
		var cronometroId = setInterval(function() {

			tempoRestante--;

			$("#tempo-digitacao").text(tempoRestante);

			if (tempoRestante == 0) {

				clearInterval(cronometroId);
				finalizaJogo();
			}

		}, 1000);
	});

}

function inicializaContadores() {
	campo.on("input", function () {
		
		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		var qtdCaracteres = conteudo.length;
		
		$("#contador-palavras").text(qtdPalavras);
		$("#contador-caracteres").text(qtdCaracteres);

	});
}

function reiniciaJogo() {

	campo.toggleClass('campo-desativado');
	campo.attr("disabled", false);
	campo.val('');
	$("#contador-palavras").text('');
	$("#contador-caracteres").text('');
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass('bordavermelha');
	campo.removeClass('bordaverde');
	inicializaCronometro();

}

function inicializaMarcores() {
	campo.on("input", function () {
	var frase = $('.frase').text();
		var digitado   = campo.val();
		var comparavel = frase.substr(0, digitado.length);

		var ehCorreto = (digitado == comparavel);

		campo.toggleClass("bordaverde", ehCorreto);
		campo.toggleClass("bordavermelha", !ehCorreto);

	});	
}

function finalizaJogo() {
	campo.attr("disabled", true);
	$("#botao-reiniciar").attr("disabled",false);
	campo.toggleClass('campo-desativado');
	inserePlacar();
}

