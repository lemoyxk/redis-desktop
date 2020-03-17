const socket = require("lows");

class Socket {
	app = null;
	ws = null;
	callback = null;

	constructor(app) {
		this.app = app;

		this.ws = new socket({
			host: "http://127.0.0.1",
			port: "12389"
		});

		this.ws.Global = { uuid: "redis-desktop-server" };
		this.ws.OnOpen = () => this.open();
		this.ws.OnError = err => this.error(err);
		this.ws.OnClose = () => this.close();

		this.ws.AddListener("/redis/login/login", (e, data) => this.login(e, data));
	}

	open() {
		console.log("on open");
		this.ws.Emit("/redis/login/login", {});
	}

	error(err) {
		console.log("on error", err.toString());
	}

	close() {
		console.log("on close");
	}

	login(e, data) {
		this.callback && this.callback();
	}

	start(callback) {
		this.callback = callback;
		this.ws.Start();
	}
}

module.exports = Socket;
