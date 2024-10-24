import {header, nav, main, footer} from "./components";
import Navigo from "navigo";
import { camelCase } from "lodash";

const router  = new Navigo("/");
import * as store from "./store";
import { viewNotFound } from "./views";

function render(state = store.home){
  console.log(state, "thi is the header");
  document.querySelector("#root").innerHTML =`
  ${header(state)}
  ${nav(store.nav)}
  ${main(state)}
  ${footer()}
  `;
  router.updatePageLinks();
}
render();
// router.on("/", () => render(store.home)).resolve();
router.on({
"/": () => render(),
":view": (match) => {

  const view = match?.data?.view ? camelCase(match.data.view) : "home"

  if(view in store){
    render(store[view]);
  }else {
    render(store.viewNotFount);
    console.log(`view Not Found ${view}`);
  }
}
}
).resolve();
// add menu toggle to bars icon in nav bar
// document.querySelector(".fa-bars").addEventListener("click", () => {
//   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
// });


