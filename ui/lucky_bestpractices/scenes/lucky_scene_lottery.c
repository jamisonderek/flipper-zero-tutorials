#include "lucky_app_i.h"
#include "furi_hal_random.h"

void lucky_scene_lottery_on_enter(void* context) {
    LuckyApp* app = context;
    widget_reset(app->widget);
    widget_add_string_element(
        app->widget, 25, 15, AlignLeft, AlignCenter, FontPrimary, "Lotto numbers:");
    FuriString* message = furi_string_alloc();
    furi_hal_random_init();
    furi_string_printf(message, "%ld %ld %ld", furi_hal_random_get() % 10, furi_hal_random_get() % 10,
                       furi_hal_random_get() % 10);
    widget_add_string_element(
        app->widget, 30, 35, AlignLeft, AlignCenter, FontBigNumbers, furi_string_get_cstr(message));
    furi_string_free(message);
    view_dispatcher_switch_to_view(app->view_dispatcher, LuckyViewWidget);
}

bool lucky_scene_lottery_on_event(void* context, SceneManagerEvent event) {
    UNUSED(context);
    UNUSED(event);
    return false; // event not handled.
}

void lucky_scene_lottery_on_exit(void* context) {
    UNUSED(context);
}