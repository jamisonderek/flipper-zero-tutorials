#include "lucky_app_i.h"
#include "lucky_scene_greeting_input.h"

typedef enum {
    LuckyGreetingInputEventSceneSave,
} LuckyGreetingInputEvent;

static bool lucky_scene_greeting_input_validator(const char* text, FuriString* error, void* context) {
    UNUSED(context);
    if(strlen(text) < 3) {
        furi_string_set(
            error, "Enter at least\n3 characters\nfor name!");
        return false;
    }

    return true;
}

static void lucky_scene_greeting_input_callback(void* context) {
    LuckyApp* app = context;
    scene_manager_handle_custom_event(app->scene_manager, LuckyGreetingInputEventSceneSave);
}

void lucky_scene_greeting_input_on_enter(void* context) {
    LuckyApp* app = context;
    bool clear_text = true;
    text_input_reset(app->text_input);
    text_input_set_header_text(app->text_input, "Enter your name");
    text_input_set_validator(app->text_input, lucky_scene_greeting_input_validator, app);
    text_input_set_result_callback(
        app->text_input,
        lucky_scene_greeting_input_callback,
        app,
        app->user_name,
        app->user_name_size,
        clear_text);
    view_dispatcher_switch_to_view(app->view_dispatcher, LuckyViewTextInput);
}

bool lucky_scene_greeting_input_on_event(void* context, SceneManagerEvent event) {
    LuckyApp* app = context;
    bool consumed = false;
    if(event.type == SceneManagerEventTypeCustom) {
        if(event.event == LuckyGreetingInputEventSceneSave) {
            scene_manager_next_scene(app->scene_manager, LuckySceneGreetingMessage);
            consumed = true;
        }
    }
    return consumed;
}

void lucky_scene_greeting_input_on_exit(void* context) {
    UNUSED(context);
}