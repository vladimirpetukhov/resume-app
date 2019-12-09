const homeService = (() => {
	function getLocation() {
		$.ajax('http://ip-api.com/json').then(
			function success(response) {
                console.log(response);
				localStorage.setItem('COUNTRY_CODE', response.countryCode);
			},
			function fail(data, status) {
				console.log('Request failed.  Returned status of', status);
			}
		);
		
	}

	return {
		getLocation,
	};
})();
