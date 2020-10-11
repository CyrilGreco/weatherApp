var mymap = L.map('mapid', {
	center: [48.866667, 2.333333],
	zoom: 4,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
		'(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

var cities = document.getElementsByClassName('cityDiv');

var customIcon = L.icon({
	iconUrl: '../images/leaf-green.png',
	shadowUrl: '../images/leaf-shadow.png',

	iconSize: [38, 95],
	shadowSize: [50, 64],

	iconAnchor: [22, 94],
	shadowAnchor: [4, 62],

	popupAnchor: [-3, -76],
});

for (let i = 0; i < cities.length; i++) {
	var lon = cities[i].dataset.lon;
	var lat = cities[i].dataset.lat;
	var name = cities[i].dataset.name;

	var customIcon = L.icon({
		iconUrl: './images/leaf-green.png',
		shadowUrl: './images/leaf-shadow.png',

		iconSize: [38, 95],
		shadowSize: [50, 64],

		iconAnchor: [22, 94],
		shadowAnchor: [4, 62],

		popupAnchor: [-3, -76],
	});

	L.marker([lat, lon], { icon: customIcon })
		.addTo(mymap)
		.bindPopup(cities[i].dataset.name);
}
