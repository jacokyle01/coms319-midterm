const endpoint = "https://lichess.org/api/user/";

const button = document.getElementById("send");
const textbox = document.getElementById("selector");
const root = document.getElementById("parsed");

button.addEventListener("click", (e) => {
	console.log(textbox.value);
	console.log(endpoint + textbox.value);
    clearResults();
	fetchAndDisplay(endpoint + textbox.value);
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
			parseResult(data);
		});

	const parseResult = (data) => {
		//destructure JSON; for each gamemode, record type + rating and put it in a paragraph
		for (const type in data.perfs) {
			const str = `${type} : ${data.perfs[type].rating}`;
			const paragraph = document.createElement("p");
			paragraph.innerHTML = str;
			root.appendChild(paragraph);
		}
	};
};