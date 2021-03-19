import View from './view.mjs'
import Media from "./util/media.mjs";
import Controller from "./controller.mjs";

const view = new View();
const media = new Media();

Controller.initialize({
	view,
	media
})
