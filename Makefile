all:
	yarn install
	rm -rf build
	mkdir build
	./node_modules/.bin/browserify main.js -o build/main.min.js
