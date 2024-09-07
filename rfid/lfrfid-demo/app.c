#include <furi.h>

#include "lfrfid_reader.h"

#define TAG "lfrfid-demo"

 void tag_callback(uint8_t* data, uint8_t length, void* context) {
    UNUSED(context);
    FURI_LOG_I(TAG, "Tag detected. Length: %d", length);
    if(length == 5) {
        FURI_LOG_I(
            TAG, "data: %02x %02x %02x %02x %02x", data[0], data[1], data[2], data[3], data[4]);
        if((data[0] != 0x13) || (data[1] != 0x37)) {
            FURI_LOG_W(TAG, "Tag is not for game");
            return;
        }
        FURI_LOG_W(TAG, "TODO: Process tag...");
        // TODO: Process tag.
    }
}

int32_t lfrfid_demo_app(void* _p) {
    UNUSED(_p);
    LFRFIDReader* reader = lfrfid_reader_alloc();
    lfrfid_reader_set_tag_callback(reader, "EM4100", tag_callback, NULL);
    lfrfid_reader_start(reader);
    furi_delay_ms(45000);
    lfrfid_reader_stop(reader);
    furi_delay_ms(5000);
    lfrfid_reader_free(reader);
    return 0;
}
