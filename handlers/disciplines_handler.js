handlers.os = async function(ctx) {
    document.title = 'Disciplines|Operating Systems';

    try {
        ctx.loadPartials({}).then(function() {
            this.partial('../templates/education/disciplines/os.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

handlers.iop = async function(ctx) {
    document.title = 'Disciplines|Operations Investigation';

    try {
        ctx.loadPartials({}).then(function() {
            this.partial('../templates/education/disciplines/iop.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

//#region Numerical Methods

/**
 * @summary "Fixed Point"
 * 
 */
handlers.numericalMethodsFixedPoint = async function(ctx) {
    document.title = 'Disciplines|Numerical Methods|Fixed Point';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('../templates/education/disciplines/numerical-methods/fixed-point.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Halving Method"
 * 
 */
handlers.numericalMethodsHalving = async function(ctx) {
    document.title = 'Disciplines|Numerical Methods|Halving Method';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/numerical-methods/halving-method.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Numerical Methods"
 * @summary "Chords Method"
 * 
 */
handlers.numericalMethodsChords = async function(ctx) {
    document.title = 'Disciplines|Numerical Methods?Chords Method';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/numerical-methods/chords-method.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

//#endregion

//#region IoT


/**
 * @summary "IoT"
 * @summary "ESP32 DevKit schema"
 * 
 */
handlers.iotSchema = async function(ctx) {
    document.title = 'Disciplines|IoT|ESP32 DevKit schema';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/iot/schema.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region Linux System Programming
/**
 * @summary "Linux Basics"
 * 
 */
handlers.linuxBasics = async function(ctx) {
    document.title = 'Disciplines|Linux|Linux Basics';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/linux-basics.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Programming"
 * 
 */
handlers.programming = async function(ctx) {
    document.title = 'Disciplines|Linux|Programming';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/programming.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "File Systems and files"
 * 
 */
handlers.fsf = async function(ctx) {
    document.title = 'Disciplines|Linux|File Systems and files';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/file-systems-and-files.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Processes"
 * 
 */
handlers.processes = async function(ctx) {
    document.title = 'Disciplines|Linux|Processes';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/processes.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Interprocess Communication"
 * 
 */
handlers.interProcessCommunication = async function(ctx) {
    document.title = 'Disciplines|Linux|Inter Process Comunication';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/interprocess-communication.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "IPC Synchronization"
 * 
 */
handlers.ipcSynch = async function(ctx) {
    document.title = 'Disciplines|Linux|IPC Synchronization';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/ipc-synchronization.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "C"
 * 
 */
handlers.sockets = async function(ctx) {
    document.title = 'Disciplines|Linux|Sockets';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/sockets.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Threads"
 * 
 */
handlers.threads = async function(ctx) {
    document.title = 'Disciplines|Linux|Threads';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/threads.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Threads Synchronization"
 * 
 */
handlers.threadsSynch = async function(ctx) {
    document.title = 'Disciplines|Linux|Threads Synchronization';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/threads-synchronization.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * @summary "Linux"
 * @summary "Deamons"
 * 
 */
handlers.deamons = async function(ctx) {
    document.title = 'Disciplines|Linux|Deamons';

    try {
        ctx.loadPartials({
            home: './templates/home.hbs',
        }).then(function() {
            this.partial('./templates/education/disciplines/linux/deamons.hbs');
        });
    } catch (err) {
        console.log(err);
    }
};
//#endregion