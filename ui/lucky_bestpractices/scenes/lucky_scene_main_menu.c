#include "lucky_app_i.h"

typedef enum {
    LuckySceneMainMenuIndexLottoNumbers,
    LuckySceneMainMenuIndexGreeting,
} LuckySceneMainMenuIndex;

typedef enum {
    LuckySceneMainMenuEventLottoNumbers,
    LuckySceneMainMenuEventGreeting,
} LuckySceneMainMenuEvent;

static void lucky_scene_main_menu_callback(void* context, uint32_t index) {
    LuckyApp* app = context;
    switch(index) {
    case LuckySceneMainMenuIndexLottoNumbers:
        scene_manager_handle_custom_event(
            app->scene_manager, LuckySceneMainMenuEventLottoNumbers);
        break;
    case LuckySceneMainMenuIndexGreeting:
        scene_manager_handle_custom_event(
            app->scene_manager, LuckySceneMainMenuEventGreeting);
        break;
    }
}

void lucky_scene_main_menu_on_enter(void* context) {
    LuckyApp* app = context;
    submenu_reset(app->submenu);
    submenu_set_header(app->submenu, "Lucky Scenes Demo");
    submenu_add_item(
        app->submenu,
        "Lotto Numbers",
        LuckySceneMainMenuIndexLottoNumbers,
        lucky_scene_main_menu_callback,
        app);
    submenu_add_item(
        app->submenu,
        "Greeting",
        LuckySceneMainMenuIndexGreeting,
        lucky_scene_main_menu_callback,
        app);
    view_dispatcher_switch_to_view(app->view_dispatcher, LuckyViewSubmenu);
}

bool lucky_scene_main_menu_on_event(void* context, SceneManagerEvent event) {
    LuckyApp* app = context;
    bool consumed = false;
    switch(event.type) {
    case SceneManagerEventTypeCustom:
        switch(event.event) {
        case LuckySceneMainMenuEventLottoNumbers:
            scene_manager_next_scene(app->scene_manager, LuckySceneLottery);
            consumed = true;
            break;
        case LuckySceneMainMenuEventGreeting:
            scene_manager_next_scene(app->scene_manager, LuckySceneGreetingInput);
            consumed = true;
            break;
        }
        break;
    default:
        break;
    }
    return consumed;
}

void lucky_scene_main_menu_on_exit(void* context) {
    LuckyApp* app = context;
    submenu_reset(app->submenu);
}