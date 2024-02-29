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
	root.innerHTML = "";
};

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

const loadImages = async () => {
	try {
		const response = await fetch("data.json");
		const json = await response.json();
		console.log(json);
		return json;
	} catch (error) {
		console.error(error);
	}
};

const parseResult = (data, images) => {
	//destructure JSON; for each gamemode, record type + rating and put it in a paragraph
	//TODO refactor: one option- SWITCH perf: either negative, positive, or non-existant, handle cases individually
	for (const type in data.perfs) {
		const str = `${type} : ${data.perfs[type].rating}`;
		const typeE = document.createElement("h3");
		const topWrap = document.createElement("div");
		topWrap.id = "top-wrap";

		typeE.innerHTML = type;
		const ratingE = document.createElement("h4");
		ratingE.innerHTML = !!data.perfs[type].rating
			? data.perfs[type].rating
			: "?";

		if (data.perfs[type].prov) {
			ratingE.innerHTML += "?";
		}
		const progress = document.createElement("span");
		progress.innerHTML = !!data.perfs[type].prog ? data.perfs[type].prog : "0";
		if (progress.innerHTML > 0) {
			progress.innerHTML = "+" + progress.innerHTML;
		}
		//really hacky
		progress.className =
			"type" +
			(progress.innerHTML.charAt(0) == "+"
				? "Pos"
				: progress.innerHTML.charAt(0));
		const paragraph = document.createElement("p");

		const image = document.createElement("img");
		console.log(images);
		image.src = images[type];

		topWrap.appendChild(image);
		topWrap.appendChild(typeE);
		paragraph.appendChild(topWrap);

		const wrapper = document.createElement("div");
		wrapper.className = "rating-wrap";

		wrapper.appendChild(ratingE);
		wrapper.appendChild(progress);
		paragraph.appendChild(wrapper);
		root.appendChild(paragraph);
	}
};

// function openNav() {
//     document.getElementById("mynavbar").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";
//     document.body.style.backgroundColor = "#280035";
// }

// function closeNav() {
//     document.getElementById("mynavbar").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
//     document.body.style.backgroundColor = "#280035";
// }
