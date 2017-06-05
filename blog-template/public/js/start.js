(function() {
	var jsArr = ['public/js/jquery-1.9.0.min.js','public/js/js.js'];
	var ga = '';
	var s = '';
	var i = 0;
	for(;i<jsArr.length;i++){
		ga = document.createElement('script');
		ga.type = 'text/javascript'; 
		ga.async = true;
		ga.src = jsArr[i];
		s = document.getElementsByTagName('script')[0]; 
		s.parentNode.insertBefore(ga, s);
	}


})();
