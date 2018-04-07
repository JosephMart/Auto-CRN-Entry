import * as moment from 'moment';
import * as $ from 'jquery';

let count: number = 0;
var CRNS: (string|number)[] = [];

// Templated li format
function liItem(data: number) {
    return $(`<li class="list-group-item">${data}</li>`);
}

// Add a new CRN
function addItem() {
    // Get value from input field
    var crn: number = parseInt($('#newCrn').val() as string, 10);
    if (crn) {
        // Update the view to show the CRN added
        $('#crns').append(liItem(crn));

        // Store the CRN
        CRNS.push(crn);
        chrome.storage.local.set({ CRNS });

        // Update the badge
        chrome.browserAction.setBadgeText({text: `${CRNS.length}`});
    }
    // Set input field to be empty and set it to be focused
    $('#newCrn').val('');
    focusInput();
}

// Set focus to the input field
function focusInput() {
    $('#newCrn').focus();
}

$(function() {
    // Get CRNs from local Chrome Storage and setup the view
    chrome.storage.local.get("CRNS", function(items){
        if (items["CRNS"] !== null && items["CRNS"].length) {
            CRNS = items["CRNS"];
            for(let i = 0; i < CRNS.length; i++) {
                $('#crns').append(liItem(items["CRNS"][i]));
            }
            chrome.browserAction.setBadgeText({text: `${CRNS.length}`});
        }
    });

    // Add a new crn button click
    $('#addCrn').click(addItem);

    // Reset
    $('#reset').click(() => {
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
        CRNS = [];
        $('#crns').empty();
        chrome.browserAction.setBadgeText({text: '' + 0});
        focusInput();
    });

    // Set an input field to a value
    $('#run').click(() => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                run: true,
                CRNS
            },
            function(msg) {
                console.log("result message:", msg);
            });
        });
    });

    // Add CRN if user presses enter
    $(document).keypress(function(e) {
        if(e.which == 13) {
            addItem();
        }
    });
    focusInput();
});
