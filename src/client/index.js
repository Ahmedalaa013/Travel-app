import { travelForm } from "./js/app";
import { ui } from "./js/ui";

import "./styles/style.scss";

const button = document.getElementById("generate");
button.addEventListener("click", travelForm);

export { travelForm, ui };
