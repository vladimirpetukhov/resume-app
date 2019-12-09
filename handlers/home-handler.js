handlers.getHome = async function(ctx) {
	document.title='Home';

	try {
		ctx.loadPartials({}).then(function() {
			this.partial('./templates/home.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.about = async function(ctx) {
    document.title='About';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/about/about.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.softuni = async function(ctx) {
    document.title='Education|SoftUni';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/education/softuni.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.bfu = async function(ctx) {
    document.title='Education|Burgas Free University';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/education/bfu.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.high_school = async function(ctx) {
    document.title='Education|Lubor Bayer';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/education/high-school.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_dimiroma = async function(ctx) {
    document.title='Work|Dimiroma Group';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/dimiroma.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_bisoft = async function(ctx) {
    document.title='Work|Dimiroma Group';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/bisoft.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_hydrolife = async function(ctx) {
    document.title='Work|Hidrolife Ltd';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/hydrolife.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_patstroy = async function(ctx) {
    document.title='Work|Patstroy Ltd ';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/patsrtoy.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_pst = async function(ctx) {
    document.title='Work|PST Group Ltd ';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/pst.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_link = async function(ctx) {
    document.title='Work|Link Ltd ';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/link.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};

handlers.work_hristodoulu = async function(ctx) {
    document.title='Work|Hristodoulu Paphos ';
	try {
		ctx.loadPartials({
			home: './templates/home.hbs',
		}).then(function() {
			this.partial('./templates/work/hristodoulu.hbs');
		});
	} catch (err) {
		console.log(err);
	}
};