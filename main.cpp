#include <stdio.h>
#include <emscripten/bind.h>
#include <emscripten/html5_webgl.h>
#include <emscripten/threading.h>

EMSCRIPTEN_WEBGL_CONTEXT_HANDLE createContext() {
    EmscriptenWebGLContextAttributes attr;
    emscripten_webgl_init_context_attributes(&attr);
    attr.minorVersion = 0;
    attr.majorVersion = 2;
    attr.proxyContextToMainThread = EMSCRIPTEN_WEBGL_CONTEXT_PROXY_ALWAYS;

    EMSCRIPTEN_WEBGL_CONTEXT_HANDLE ctx = emscripten_webgl_create_context("#canvas", &attr);
    EMSCRIPTEN_RESULT nctx = emscripten_webgl_make_context_current(ctx);
    return ctx;
}

void testContext() {
    EMSCRIPTEN_WEBGL_CONTEXT_HANDLE ctx = createContext();
    printf("ctx: %d\n", ctx);
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("testGetContext", &testContext);
}
