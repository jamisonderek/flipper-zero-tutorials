#include "lucky_app_i.h"

static void (*const lucky_scene_on_enter_handlers[])(void*) = {
    lucky_scene_main_menu_on_enter,
    lucky_scene_lottery_on_enter,
    lucky_scene_greeting_input_on_enter,
    lucky_scene_greeting_message_on_enter,
};

static bool (*const lucky_scene_on_event_handlers[])(void*, SceneManagerEvent) = {
    lucky_scene_main_menu_on_event,
    lucky_scene_lottery_on_event,
    lucky_scene_greeting_input_on_event,
    lucky_scene_greeting_message_on_event,
};

static void (*const lucky_scene_on_exit_handlers[])(void*) = {
    lucky_scene_main_menu_on_exit,
    lucky_scene_lottery_on_exit,
    lucky_scene_greeting_input_on_exit,
    lucky_scene_greeting_message_on_exit,
};

static const SceneManagerHandlers lucky_scene_manager_handlers = {
    .on_enter_handlers = lucky_scene_on_enter_handlers,
    .on_event_handlers = lucky_scene_on_event_handlers,
    .on_exit_handlers = lucky_scene_on_exit_handlers,
    .scene_num = LuckySceneNum,
};

static bool lucky_app_custom_callback(void* context, uint32_t custom_event) {
    furi_assert(context);
    LuckyApp* app = context;
    return scene_manager_handle_custom_event(app->scene_manager, custom_event);
}

static bool lucky_app_back_event_callback(void* context) {
    furi_assert(context);
    LuckyApp* app = context;
    return scene_manager_handle_back_event(app->scene_manager);
}

static LuckyApp* lucky_app_alloc() {
    LuckyApp* app = malloc(sizeof(LuckyApp));
    app->user_name_size = 16;
    app->user_name = malloc(app->user_name_size);
    app->scene_manager = scene_manager_alloc(&lucky_scene_manager_handlers, app);
    app->view_dispatcher = view_dispatcher_alloc();
    view_dispatcher_enable_queue(app->view_dispatcher);
    view_dispatcher_set_event_callback_context(app->view_dispatcher, app);
    view_dispatcher_set_custom_event_callback(app->view_dispatcher, lucky_app_custom_callback);
    view_dispatcher_set_navigation_event_callback(
        app->view_dispatcher, lucky_app_back_event_callback);
    app->submenu = submenu_alloc();
    view_dispatcher_add_view(
        app->view_dispatcher, LuckyViewSubmenu, submenu_get_view(app->submenu));
    app->widget = widget_alloc();
    view_dispatcher_add_view(
        app->view_dispatcher, LuckyViewWidget, widget_get_view(app->widget));
    app->text_input = text_input_alloc();
    view_dispatcher_add_view(
        app->view_dispatcher, LuckyViewTextInput, text_input_get_view(app->text_input));
    return app;
}

static void lucky_app_free(LuckyApp* app) {
    furi_assert(app);
    view_dispatcher_remove_view(app->view_dispatcher, LuckyViewSubmenu);
    view_dispatcher_remove_view(app->view_dispatcher, LuckyViewWidget);
    view_dispatcher_remove_view(app->view_dispatcher, LuckyViewTextInput);
    scene_manager_free(app->scene_manager);
    view_dispatcher_free(app->view_dispatcher);
    submenu_free(app->submenu);
    widget_free(app->widget);
    text_input_free(app->text_input);
    free(app);
}

int32_t lucky_app(void* p) {
    UNUSED(p);
    LuckyApp* app = lucky_app_alloc();

    Gui* gui = furi_record_open(RECORD_GUI);
    view_dispatcher_attach_to_gui(app->view_dispatcher, gui, ViewDispatcherTypeFullscreen);
    scene_manager_next_scene(app->scene_manager, LuckySceneMainMenu);
    view_dispatcher_run(app->view_dispatcher);

    lucky_app_free(app);
    return 0;
}
