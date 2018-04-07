import * as $ from 'jquery';

// CRN container
let CRNS: number[] = [];

// UI tags
const ADD_CRN_BTN: string = '#addCrn';
const RESET_BTN: string = '#reset';
const RUN_BTN: string = '#run';
const CRN_INPUT: string = '#newCrn';
const CRN_UL: string = '#crns';

// Templated li format
function liItem(data: number) {
    return $(`<li class="list-group-item">${data}</li>`);
}

// Set focus to the input field
function focusInput() {
    $(CRN_INPUT).focus();
}

// Add a new CRN
function addItem() {
    // Get value from input field
    const crn: number = parseInt($(CRN_INPUT).val() as string, 10);
    if (crn) {
        // Update the view to show the CRN added
        $(CRN_UL).append(liItem(crn));

        // Store the CRN
        CRNS.push(crn);
        chrome.storage.local.set({ CRNS });

        // Update the badge
        chrome.browserAction.setBadgeText({text: `${CRNS.length}`});
    }
    // Set input field to be empty and set it to be focused
    $(CRN_INPUT).val('');
    focusInput();
}

$(function() {
    // Get CRNs from local Chrome Storage and setup the view
    chrome.storage.local.get("CRNS", function(items){
        if (items["CRNS"] !== null && items["CRNS"].length) {
            CRNS = items["CRNS"];
            for(let i = 0; i < CRNS.length; i++) {
                $(CRN_UL).append(liItem(items["CRNS"][i]));
            }
            chrome.browserAction.setBadgeText({text: `${CRNS.length}`});
        }
    });

    // Add a new crn button onClick
    $(ADD_CRN_BTN).click(addItem);

    // Reset button onClick
    $(RESET_BTN).click(() => {
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
        CRNS = [];
        $(CRN_UL).empty();
        chrome.browserAction.setBadgeText({text: '' + 0});
        focusInput();
    });

    // Run button onCLick
    $(RUN_BTN).click(() => {
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
