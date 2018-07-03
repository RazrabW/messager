const rnd = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
	return rand;
}

const getTime = () => {
	var date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;

}

const clearHtml = string => {
	string.toString();
	return string.replace(/<[^>]*>/g, '');
}

const scrollEnd = () => {
	document.querySelector('#messages').scrollTop = 9999;
}