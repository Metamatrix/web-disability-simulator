 
$.get(chrome.extension.getURL('/simulations/general/loading/loadingModal.html'), data => {
    
    $(data).appendTo('body');

    $('#wds-loadingModal').modal('show');

    setTimeout(() => { 
        $('#wds-loadingModal').modal('hide');
        chrome.runtime.sendMessage({type: "modalClosed"});
    }, 1500);
    
});