const handlers = {};


$(() => {
    const app = Sammy('#container', function() {
        this.use('Handlebars', 'hbs');

        // home page routes
        this.get('#/', handlers.getHome);
        // about
        this.get('#/about', handlers.about);
        // education
        this.get('#/education/softuni', handlers.softuni);
        this.get('#/education/bfu', handlers.bfu);
        this.get('#/education/high-school', handlers.high_school);
        //work
        this.get('#/work/dimiroma', handlers.work_dimiroma);
        this.get('#/work/bisoft', handlers.work_bisoft);
        this.get('#/work/hydrolife', handlers.work_hydrolife);
        this.get('#/work/patstroy', handlers.work_patstroy);
        this.get('#/work/pst', handlers.work_pst);
        this.get('#/work/link', handlers.work_link);
        this.get('#/work/hristodoulu', handlers.work_hristodoulu);
        //skills
        this.get('#/skills/langs', handlers.skills_langs);
        this.get('#/skills/frameworks', handlers.skills_frameworks);
        this.get('#/skills/orm', handlers.skills_orm);
        this.get('#/skills/db', handlers.skills_db);
        this.get('#/skills/others', handlers.skills_others);
        //languages
        this.get('#/langs/all', handlers.langs_all);
        //disciplines
        this.get('#/operating_systems', handlers.os);
        this.get('#/operation_investigation', handlers.iop);

        //Numerical Methods
        this.get('#/numerical-methods/fixed-point', handlers.numericalMethodsFixedPoint);
        this.get('#/numerical-methods/halving-method', handlers.numericalMethodsHalving);
        this.get('#/numerical-methods/chords-method', handlers.numericalMethodsChords);

        //#region IoT
        this.get('#/iot/ESP32-DevKit-Schema', handlers.iotSchema);
        //#endregion

        //#region Linux System Programming
        this.get('#/linux-system-programming/linux-basics', handlers.linuxBasics);
        this.get('#/linux-system-programming/programing', handlers.programming);
        this.get('#/linux-system-programming/file-system-and-files', handlers.fsf);
        this.get('#/linux-system-programming/processes', handlers.processes);
        this.get('#/linux-system-programming/interprocess-communication', handlers.interProcessCommunication);
        this.get('#/linux-system-programming/ipc-synchronization', handlers.ipcSynch);
        this.get('#/linux-system-programming/sockets', handlers.sockets);
        this.get('#/linux-system-programming/threads', handlers.threads);
        this.get('#/linux-system-programming/threads-synchronization', handlers.threadsSynch);
        this.get('#/linux-system-programming/deamons', handlers.deamons);
        this.get('#/linux-system-programming/course-work', handlers.courseWork);
        //#endregion

        // $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
        //     console.log(JSON.stringify(data, null, 2));
        // });
    });

    app.run('#/');
});