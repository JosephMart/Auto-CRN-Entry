import * as $ from 'jquery';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.run) {
            // Query page dom and add crns to input vals
            // TODO: update query for actual TAMU sign up page
            const { CRNS } = request;
            $('body').find(':input').each(function(i){
                if (i < CRNS.length)
                    $(this).val(CRNS[i]);
            });
            sendResponse('CRNs set' + CRNS);
        }
    }
);