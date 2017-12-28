// https://github.com/michael-ciniawsky/postcss-load-config

const browsersMb = [
    "android 4",
    "iOS 6",
    "last 4 version",
    "> 5%",
    "last 5 Safari versions"
]

const browsersPc= [
    "last 3 versions",
    "ie >= 10",
    "Firefox >= 10",
    "last 3 Safari versions"
]

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {
		browsers: browsersPc
	}
  }
}
