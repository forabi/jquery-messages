function setProperDirection(elem, text, auto_default){
	text = text.replace(/(<([^>]+)>)/ig,"");
	if (elem instanceof jQuery)
		elem.css('direction', isRTL(text, auto_default === true ? elem.css('direction') === 'rtl' : false) ? 'rtl' : 'ltr');
	else
		elem.style.direction = isRTL(text, auto_default === true ? elem.style.direction === 'rtl' : false) ? 'rtl' : 'ltr';
}

var	a = 'أابتثجحخدذرزسشصضطظعغفقكلمنهويء؟ئؤ',
	aLength = a.length;
function isRTL(text, isRTLDefault){	
	var k = 0;
	var textLength = text.length;
	if (textLength === 0){return isRTLDefault;}

	for (var i = 0; i < textLength; i++){
		for (var j = 0; j < aLength; j++){
			if (a[j] === text[i]){
				k++;
			}
		}
	}
	return (k >= (textLength/2) || isRTLDefault);
}