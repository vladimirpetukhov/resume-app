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