default:
	emcc -lembind ./main.cpp -o out.js -MJ compile_commands.json -s USE_WEBGL2=1 -s MIN_WEBGL_VERSION=2 -s MAX_WEBGL_VERSION=2 -s OFFSCREENCANVAS_SUPPORT=1

run:
	python3 -m http.server
