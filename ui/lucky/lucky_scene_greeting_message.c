#include "lucky_app_i.h"
#include "lucky_scene_greeting_message.h"

void lucky_scene_greeting_message_on_enter(void* context) {
    LuckyApp* app = context;
    widget_reset(app->widget);
    FuriString* message = furi_string_alloc();
    furi_string_printf(message, "I wish you luck\n%s!", app->user_name);
    widget_add_string_multiline_element(
        app->widget, 5, 15, AlignLeft, AlignCenter, FontPrimary, furi_string_get_cstr(message));
    furi_string_free(message);
    view_dispatcher_switch_to_view(app->view_dispatcher, LuckyViewWidget);
}

bool lucky_scene_greeting_message_on_event(void* context, SceneManagerEvent event) {
    UNUSED(context);
    UNUSED(event);
    return false; // event not handled.
}

void lucky_scene_greeting_message_on_exit(void* context) {
    LuckyApp* app = context;
    widget_reset(app->widget);
}