/**
 * This file have functions to create and update progress bars.
 * Also create controls like buttons and select box
 */
var selectControls, buttonsControl, progressBar, progressControl = [],
    progressBars = [];

// Button values
var updateButtons = ["-25", "-10", "+10", "+25"];

/**
 * Generic function for creating progress bar
 * @param1: name (name of the progress bar)
 * @param2: value (initial value of the progress bar)
 * @param3: container-id (id selector of container in which progress bar will render)
 */
function createProgressBar(name, value, container) {
    
    // Load progress bar template
    Ractive.load('templates/progress.html').then(function (progressObject) {
        var progressName = name;
        var progressValue = value;

        if (progressValue < 0) {

            progressValue = 0;

        }

        var progressClass = 'progress-bar-success';
        if (progressValue > 75) {
            progressClass = 'progress-bar-warning';
        }
        if (progressValue > 99) {
            progressClass = 'progress-bar-danger';
        }
        var data = {
            progressId: name,
            progress: progressValue,
            progressClass: progressClass
        };
        
        // Create progress bar object
        progressBar = new progressObject({
            el: container,
            append: true,
            data: data
        });

        progressBars.push(name);
        progressControl.push(progressBar);

    });
    createControls();
}

/**
 * Create controls for controlling progress bar value
 */
function createControls() {
    
    // Load control select box template
    Ractive.load('templates/controls.html').then(function (controls) {

        selectControls = new controls({
            el: 'controls',
            data: {
                progressBars: progressBars
            }
        });

    });
    createButtons();
}

/**
 * Create buttons for update progress bar value
 */
function createButtons() {

    // Load control button template
    Ractive.load('templates/buttons.html').then(function (buttonControl) {

        buttonsControl = new buttonControl({
            el: 'buttonControl',
            data: {
                controlButton: updateButtons
            }
        });

        // Added listener to update progress bar value
        buttonsControl.on('upadateBar', function (event) {
            var selectedbar = selectControls.find("#selectProgress").value;
            var valueUpdate = parseInt(this.get(event.keypath));
            updateProgressBar(selectedbar, valueUpdate);
        });

    });
}

/**
 * Generic function for updating progress bar
 * @param1: barId (Id of the progress bar)
 * @param2: value (Value to be added/subtracted to the progress bar)
 */
function updateProgressBar(barId, value) {
    var progressObj = progressControl[barId];
    var currentValue = parseInt(progressObj.get('progress'));
    var updatedValue = parseInt(currentValue) + parseInt(value);
    var progressClass = 'progress-bar-success';
    if (updatedValue < 0) {
        updatedValue = 0;
    }
    if (updatedValue > 75) {
        progressClass = 'progress-bar-warning';
    }
    if (updatedValue > 99) {
        progressClass = 'progress-bar-danger';
    }
    
    // Setting progress bar properties
    progressObj.set('progress', updatedValue);
    progressObj.set('progressClass', progressClass);

}