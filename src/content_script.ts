import * as $ from 'jquery';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.run) {
            // Query page dom and add crns to input vals
            request.CRNS.map((crn, i) => {
                $(`#crn_id${i + 1}`).val(crn);
            });
        }
    }
);