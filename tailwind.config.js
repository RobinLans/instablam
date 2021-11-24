module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF1D89",
        bgImg: "#F6F6F6",
        bgImgHov: "#F7F7F7",
      },
      fontFamily: {
        body: ["Nunito"],
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
      borderColor: ["active"],
    },
  },
  plugins: [],
};
