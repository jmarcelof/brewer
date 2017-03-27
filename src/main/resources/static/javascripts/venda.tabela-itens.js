Brewer.TabelaItens = (function() {

	function TabelaItens(autocomplete) {
		this.autocomplete = autocomplete;
		this.tabelaCervejasContainer = $('.js-tabela-cervejas-container');
	}

	TabelaItens.prototype.inicar = function() {
		this.autocomplete.on('item-selecionado', onItemSelecionado.bind(this));
	}

	function onItemSelecionado(evento, item) {
		var resposta = $.ajax({
			url : 'item',
			method : 'POST',
			data : {
				codigoCerveja : item.codigo
			}
		});

		resposta.done(onItemAtualizadoNoServidor.bind(this));
	}

	function onItemAtualizadoNoServidor(html) {
		this.tabelaCervejasContainer.html(html);
		$('.js-tabela-cerveja-quantidade-item').on('change',
				onQuantidadeItemAlterado.bind(this));
		$('.js-tabela-item').on('dblclick', onDoubleClick);
	}

	function onQuantidadeItemAlterado(evento) {
		var input = $(evento.target);
		var quantidade = input.val();
		var codigoCerveja = input.data('codigo-cerveja');

		var resposta = $.ajax({
			url : 'item/' + codigoCerveja,
			method : 'PUT',
			data : {
				quantidade : quantidade
			}
		});
		resposta.done(onItemAtualizadoNoServidor.bind(this));
	}

	function onDoubleClick(evento) {
		$(this).toggleClass('solicitando-exclusao');
	}

	return TabelaItens;
}());

$(function() {
	var autocomplete = new Brewer.Autocomplete();
	autocomplete.iniciar();

	var tabelaItens = new Brewer.TabelaItens(autocomplete);
	tabelaItens.inicar();
});
