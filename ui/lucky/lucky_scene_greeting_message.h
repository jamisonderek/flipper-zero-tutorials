#pragma once

#include <gui/scene_manager.h>

void lucky_scene_greeting_message_on_enter(void* context);
bool lucky_scene_greeting_message_on_event(void* context, SceneManagerEvent event);
void lucky_scene_greeting_message_on_exit(void* context);
