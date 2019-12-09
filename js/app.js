const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');
        
        // home page routes
        this.get('#/',handlers.getHome);
        // about
        this.get('#/about', handlers.about);
        // education
        this.get('#/education/softuni',handlers.softuni);
        this.get('#/education/bfu',handlers.bfu);
        this.get('#/education/high-school',handlers.high_school);
        //work
        this.get('#/work/dimiroma',handlers.work_dimiroma);
        this.get('#/work/bisoft',handlers.work_bisoft);
        this.get('#/work/hydrolife',handlers.work_hydrolife);
        this.get('#/work/patstroy',handlers.work_patstroy);
        this.get('#/work/pst',handlers.work_pst);
        this.get('#/work/link',handlers.work_link);
        this.get('#/work/hristodoulu',handlers.work_hristodoulu);
        
    });
    
    app.run('#/');
});