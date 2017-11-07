
var loadingModal = '<div class="modal fade" id="wds-loadingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="vertical-alignment-helper"><div class="modal-dialog vertical-align-center"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><div class="modal-body"><img src="chrome-extension://ccdgjdchfndafmgobbopdmoofbodklmd/UI/img/loading_icon.svg" class="wds-loading-icon"></img><p class="wds-loading-text">Simulerar...</p></div></div></div></div></div>'

$('body').append(loadingModal);

$('#wds-loadingModal').modal('show');

setTimeout(function(){ 
    $('#wds-loadingModal').modal('hide');
    chrome.runtime.sendMessage({type: "modalClosed"});
}, 1500);