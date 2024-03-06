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
		.then(function (data) {
			console.log(data);
			parseResult(data);
		});
};

	const parseResult = (data) => {
		let mainContainer = document.getElementById("parsed");
		//destructure JSON; for each gamemode, record type + rating and put it in a paragraph
		for (const type of data) {
			console.log(type);
			let div = document.createElement("div");
			div.id = "div-act";
			var utcSeconds = type.interval.start;
			var d = new Date(0);
			d.setUTCMilliseconds(utcSeconds);
			var utcSeconds2 = type.interval.end;
			var d2 = new Date(0);
			d2.setUTCMilliseconds(utcSeconds2);
			console.log(d);
			console.log(d2);
			div.innerHTML = `<strong>Interval:</strong><br/>
			<strong>Start:</strong> ${d}<br/>
			<strong>End:</strong> ${d2},<br/>
			`;
			for (const g in type.games) {
				let div2 = document.createElement("div");
				div2.id = "div-act2";
				div2.innerHTML = `<strong>Game: ${g}</strong> <br/><em>Wins:</em> ${type.games[g].win} <em>Losses:</em> ${type.games[g].loss} <em>Draws:</em> ${type.games[g].draw}<br/>`;
				div.appendChild(div2);
			}
			if (type.puzzles != undefined) {
				let div3 = document.createElement("div");
				div3.id = "div-act2";
				div3.innerHTML = `
				<strong>Puzzles:</strong> <br/>
				<em>Wins:</em> ${type.puzzles.score.win} <em>Losses:</em> ${type.puzzles.score.loss} <em>Draws:</em> ${type.puzzles.score.draw}
				`;
				div.appendChild(div3);
			}
			if (type.studies != undefined) {
				for (const s in type.studies) {
					let div4 = document.createElement("div");
					div4.id = "div-act2";
					div4.innerHTML = `<strong>Studies:</strong><br/>Name: ${type.studies[s].name}<br/>ID: ${type.studies[s].id}`;
					div.appendChild(div4);
				}
			}
			if (type.correspondenceMoves != undefined) {
				for (const game in type.correspondenceMoves.games) {
					let div5 = document.createElement("div");
					div5.id = "div-act2";
					div5.innerHTML = `<strong>Faced:</strong><br/>Opponent: ${type.correspondenceMoves.games[game].opponent.user}`;
					div.appendChild(div5);
				}
			}
			if (type.tournaments != undefined) {
				for (const b in type.tournaments.best) {
					let div10 = document.createElement("div");
					div10.id = "div-act2";
					div10.innerHTML = `<strong>Tournament</strong>:<br/><em>Score:</em> ${type.tournaments.best[b].score} <em>Rank</em>: ${type.tournaments.best[b].rank}`;
					div.appendChild(div10);
				}
			}
			if (type.teams != undefined) {
				let div11 = document.createElement("div");
				div11.id = "div-act2";
				div11.innerHTML = `<strong>Teams Joined:</strong><br/>`;
				for (const t in type.teams) {
					let div12 = document.createElement("div");
					div12.innerHTML = `${type.teams[t].name}`;
					div11.appendChild(div12);
				}
				div.appendChild(div11);
			}
			if (type.follows != undefined) {
				if (type.follows.in != undefined) {
					let div6 = document.createElement("div");
					div6.id = "div-act2";
					div6.innerHTML = `<strong>Players Followed:</strong><br/>`;
					for (const i in type.follows.in.ids) {
						let div7 = document.createElement("div");
						div7.id = "follow";
						div7.innerHTML = `${type.follows.in.ids[i]} `;
						div6.appendChild(div7);
					}
					div.appendChild(div6);
				}
				if (type.follows.out != undefined) {
					let div9 = document.createElement("div");
					div9.id = "div-act2";
					div9.innerHTML = `<strong>Players Unfollowed:</strong><br/>`
					for (const o in type.follows.out.ids) {
						let div8 = document.createElement("div");
						div8.id = "unfollow";
						div8.innerHTML = `${type.follows.out.ids[o]}<br/>`;
						div9.appendChild(div8);
					}
					div.appendChild(div9);
				}
			}
			mainContainer.appendChild(div);
		}
};