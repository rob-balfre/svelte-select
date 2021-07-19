import "./reset.css";
import Select from "../../../src/Select.svelte";

const items = [
  { value: "chocolate", label: "Chocolate" },
  { value: "pizza", label: "Pizza" },
  { value: "cake", label: "Cake" },
  { value: "chips", label: "Chips" },
  { value: "ice-cream", label: "Ice Cream" },
];

window.testExports = {
  Select,
  items,
};
