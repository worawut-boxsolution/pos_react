// tailwind.config.js
/*export default {
  content:  
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: { themes: ['light','dark','cupcake'] }
};
*/
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: { themes: ["cupcake"] }, // or any theme you like
}