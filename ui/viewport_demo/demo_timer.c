/*

This is an example of using a ViewPort.  It is a simple Hello World program that
allows you to move a cursor around the screen with the arrow keys.  Pressing
the back button will exit the program.  This version also uses a timer to update
the screen 30 times a second, because of that, our event queue is an AppEvent 
instead of an InputEvent.

Uncomment the different view_port_set_orientation() calls to see how the
orientation of the screen and keypad change.

The code is from the Message Queue wiki page 
(https://github.com/jamisonderek/flipper-zero-tutorials/wiki/Message-Queue) and
also the ViewPort section of the User Interface wiki page
(https://github.com/jamisonderek/flipper-zero-tutorials/wiki/User-Interface#viewport).

*/

#include "dolphin/dolphin.h"
#include <furi.h>
#include <gui/gui.h>

typedef enum {
    EventTypeTick,
    EventTypeKey,
} EventType;

typedef struct {
    EventType type;
    InputEvent input;
} AppEvent;

typedef struct AppState AppState;
struct AppState {
    FuriMutex* mutex;
    uint32_t x;
    uint32_t y;
    uint16_t counter;
};

static void viewport_demo_draw_callback(Canvas* canvas, void* context) {
    AppState* data = context;
    canvas_set_font(canvas, FontPrimary);
    canvas_draw_str(canvas, 5, 30, "Hello world");

    furi_mutex_acquire(data->mutex, FuriWaitForever);
    canvas_draw_str(canvas, data->x, data->y, "^");
    char buf[6];
    snprintf(buf, COUNT_OF(buf), "%d", data->counter++);
    canvas_draw_str(canvas, 5, 15, buf);
    canvas_draw_line(canvas, 0, data->counter % 128, 64, data->counter % 128);
    furi_mutex_release(data->mutex);
}

static void viewport_demo_input_callback(InputEvent* input_event, void* context) {
    FuriMessageQueue *queue = context;
    AppEvent event = {.type = EventTypeKey, .input = *input_event};
    furi_message_queue_put(queue, &event, FuriWaitForever);
}

static void viewport_demo_timer_callback(void* ctx) {
    FuriMessageQueue* event_queue = ctx;
    AppEvent event = {.type = EventTypeTick};
    furi_message_queue_put(event_queue, &event, 0);
}

int32_t viewport_demo_timer_app() {
    FuriMessageQueue* queue = furi_message_queue_alloc(8, sizeof(AppEvent));

    AppState* app_state = malloc(sizeof(AppState));
    app_state->mutex = furi_mutex_alloc(FuriMutexTypeNormal);
    // Set initial coordinates for the cursor
    app_state->x = 32;
    app_state->y = 48;
    app_state->counter = 0;

    ViewPort* view_port = view_port_alloc();
    view_port_draw_callback_set(view_port, viewport_demo_draw_callback, app_state);
    view_port_input_callback_set(view_port, viewport_demo_input_callback, queue);
    //view_port_set_orientation(view_port, ViewPortOrientationHorizontal);
    //view_port_set_orientation(view_port, ViewPortOrientationHorizontalFlip); // upside down
    view_port_set_orientation(view_port, ViewPortOrientationVertical); // USB/keypad bottom
    //view_port_set_orientation(view_port, ViewPortOrientationVerticalFlip); // USB/keypad top

    Gui* gui = furi_record_open(RECORD_GUI);
    gui_add_view_port(gui, view_port, GuiLayerFullscreen);

    FuriTimer* timer =
        furi_timer_alloc(viewport_demo_timer_callback, FuriTimerTypePeriodic, queue);
    furi_timer_start(timer, furi_kernel_get_tick_frequency() / 30); // Refresh 30 times per second

    dolphin_deed(DolphinDeedPluginGameStart);
    
    AppEvent event;
    bool keep_processing = true;
    while(keep_processing) {
        if(furi_message_queue_get(queue, &event, FuriWaitForever) == FuriStatusOk) {
            furi_mutex_acquire(app_state->mutex, FuriWaitForever);
            if(event.type == EventTypeKey) {
                if(event.input.type == InputTypeShort || event.input.type == InputTypeRepeat) {
                    switch (event.input.key) {
                        case InputKeyLeft:
                            app_state->x--;
                            break;
                        case InputKeyRight:
                            app_state->x++;
                            break;
                        case InputKeyUp:
                            app_state->y--;
                            break;
                        case InputKeyDown:
                            app_state->y++;
                            break;
                        case InputKeyBack:
                            keep_processing = false;
                            break;
                        default:
                            break;
                    }
                }
            } else if (event.type == EventTypeTick) {
                app_state->counter++;            
            }
            furi_mutex_release(app_state->mutex);

            view_port_update(view_port);
        } else {
            keep_processing = false;
        }
    }

    furi_timer_stop(timer);
    furi_timer_free(timer);
    view_port_enabled_set(view_port, false);
    furi_message_queue_free(queue);
    gui_remove_view_port(gui, view_port);
    view_port_free(view_port);
    furi_record_close(RECORD_GUI);
    furi_mutex_free(app_state->mutex);
    free(app_state);

    return 0;
}