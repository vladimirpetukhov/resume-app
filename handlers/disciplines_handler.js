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