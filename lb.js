// const rootE = document.getElementById(root);
// console.log(rootE);
const endpoint = "https://lichess.org/api/player";

const fetchAndDisplay = () => {
	fetch(endpoint)
		.then((response) => {
			if (!response.ok) {
				console.error(error);
				return;
			}
			return response.json();
		})
		.then((data) => {
			fetchImages().then((images) => {
				parseJson(data, images);
			});
		});
};

const fetchImages = async () => {
	return fetch("data.json")
		.then((response) => {
			if (!response.ok) {
				console.error(error);
				return;
			}
			return response.json();
		})
		.then((data) => {
			return data;
		});
};

const parseJson = (data, images) => {
    const body = document.querySelector("body");

	const rootE = document.createElement("div");
    rootE.id = "root";

	console.log(rootE);

	console.log(data);
	console.log(images);
	for (const type in data) {
		const rowE = document.createElement("div");
        rowE.className = "row";

		const imgE = document.createElement("img");
		imgE.src = images[type];

		console.log(type);

		//highest rated player for that game type
		console.log(data[type].at(0));
		const leader = data[type].at(0);

		const username = leader.username;
		const rating = leader.perfs[type].rating;

		console.log(username);
		console.log(rating);

		const usernameE = document.createElement("h2");
		usernameE.innerHTML = username;

		const ratingE = document.createElement("h3");
		ratingE.innerHTML = rating;

		rowE.appendChild(imgE);
		rowE.appendChild(usernameE);
		rowE.appendChild(ratingE);

		rootE.appendChild(rowE);
	}

	const rowE = document.createElement("div");
	rowE.innerHTML = "row";
	const imgE = document.createElement("img");
    body.appendChild(rootE);
};

//runner
window.onload = function () {
	fetchAndDisplay();
};
