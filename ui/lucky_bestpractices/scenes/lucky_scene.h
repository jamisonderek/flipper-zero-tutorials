#pragma once

#include <gui/scene_manager.h>

// Generate scene id and total number
#define ADD_SCENE(prefix, name, id) LuckyScene##id,
typedef enum {
#include "lucky_scene_config.h"
    LuckySceneNum,
} LuckyScene;
#undef ADD_SCENE

extern const SceneManagerHandlers lucky_scene_handlers;

// Generate scene on_enter handlers declaration
#define ADD_SCENE(prefix, name, id) void prefix##_scene_##name##_on_enter(void*);
#include "lucky_scene_config.h"
#undef ADD_SCENE

// Generate scene on_event handlers declaration
#define ADD_SCENE(prefix, name, id) \
    bool prefix##_scene_##name##_on_event(void* context, SceneManagerEvent event);
#include "lucky_scene_config.h"
#undef ADD_SCENE

// Generate scene on_exit handlers declaration
#define ADD_SCENE(prefix, name, id) void prefix##_scene_##name##_on_exit(void* context);
#include "lucky_scene_config.h"
#undef ADD_SCENE
