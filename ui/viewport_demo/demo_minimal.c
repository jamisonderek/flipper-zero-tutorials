/*

Please see demo.c for the recommended way to write this app.

This is NOT the recommended way to write an app, but rather an example that would work:
- It is not recommended to use global variables for the x and y coordinates.
- The x and y coordinates are not protected by a mutex, so they could be modified by the input callback and the draw callback at the same time.
- The draw callback should only access state using the context pointer.
- The input callback should queue the input events, for processing in the main loop.

*/
#include "dolphin/dolphin.h"
#include <furi.h>
#include <gui/gui.h>

static int x = 32;
static int y = 48;

static void my_draw_callback(Canvas* canvas, void* context) {
    UNUSED(context);
    canvas_set_font(canvas, FontPrimary);
    canvas_draw_str(canvas, 5, 30, "Hello, world");
    canvas_draw_str(canvas, x, y, "^");
}

static void my_input_callback(InputEvent* event, void* context) {
    FuriMessageQueue *queue = context;
    if(event->type == InputTypeShort || event->type == InputTypeRepeat) {
        if (event->key == InputKeyLeft) x--;
        if (event->key == InputKeyRight) x++;
        if (event->key == InputKeyUp) y--;
        if (event->key == InputKeyDown) y++;
    }
    furi_message_queue_put(queue, event, FuriWaitForever);
}

int32_t viewport_demo_minimal_app() {
    FuriMessageQueue* queue = furi_message_queue_alloc(8, sizeof(InputEvent));
    ViewPort* view_port = view_port_alloc();
    view_port_draw_callback_set(view_port, my_draw_callback, NULL);
    view_port_input_callback_set(view_port, my_input_callback, queue);
    view_port_set_orientation(view_port, ViewPortOrientationVertical); // USB/keypad bottom
    Gui* gui = furi_record_open(RECORD_GUI);
    gui_add_view_port(gui, view_port, GuiLayerFullscreen);
    dolphin_deed(DolphinDeedPluginGameStart);
    InputEvent event;
    bool running = true;
    while(running) {
        if(furi_message_queue_get(queue, &event, FuriWaitForever) == FuriStatusOk) {
            if(event.type == InputTypeShort && event.key == InputKeyBack) {
                running = false;
            }
        }
        view_port_update(view_port);
    }

    view_port_enabled_set(view_port, false);
    furi_message_queue_free(queue);
    gui_remove_view_port(gui, view_port);
    view_port_free(view_port);
    furi_record_close(RECORD_GUI);
    return 0;
}