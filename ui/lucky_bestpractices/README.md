# Scenes Demo Application Tutorial

See [https://youtu.be/vQAk7fC_no4](https://youtu.be/vQAk7fC_no4) for a code walkthrough!

This is an example similar to [Basic_Scenes](https://github.com/jamisonderek/flipper-zero-tutorials/tree/main/ui/basic_scenes) but with the files broken out into separate .c and .h files.

- The ``static`` keyword is used on functions that do not need to be visible beyond their own .c file.
- ``#pragma once`` is used to prevent the header file from being imported multiple times.
- We don't use the typical ``typedef struct App App`` pattern in ``basic_scenes_split.h`` because the various scenes access properties of the ``App`` object.
