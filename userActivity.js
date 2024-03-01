const endpoint = "https://lichess.org/api/user/";

const button = document.getElementById("send");
const textbox = document.getElementById("selector");
const root = document.getElementById("parsed");

button.addEventListener("click", (e) => {
	console.log(textbox.value);
	console.log(endpoint + textbox.value);
    clearResults();
	fetchAndDisplay(endpoint + textbox.value + "/activity");
});

const clearResults = () => {
    root.innerHTML = '';
}

const fetchAndDisplay = (endpoint) => {
	fetch(endpoint)
		.then((response) => {
			if (!response.ok) {
				console.error("error");
			}
			return response.json();
		})
		.then((data) => {
			//if API responds, display raw and parsed JSON
			loadImages().then((images) => {
				console.log(images);
				parseResult(data, images);
			});
			// parseResult(data, images);
		});
};

	const parseResult = (data) => {
		//destructure JSON; for each gamemode, record type + rating and put it in a paragraph
		for (const type in data.interval) {
			const str = `${type} : ${data.interval[type].start}`;
			const paragraph = document.createElement("h2");
			paragraph.innerHTML = str;
			root.appendChild(paragraph);
		}
};