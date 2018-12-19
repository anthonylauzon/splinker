inlets = 1;
outlets = 2;

var ME = this.box;
var CHANNEL = 0;
var NOTE = 36;
var OFFSET = 0;
var OFFSET_INCR = 105;
var NAME = this.script_name;
var MAX_CHANNELS = 16;

var cur_channel = CHANNEL;
var cur_note = NOTE;
var cur_offset = OFFSET;

$.immediate = 1;
function $(stringref){
    return this.patcher.getnamed(stringref);
}

message_inlet.immediate = 1;
function message_inlet(mobj, inlet, msg) {
    this.patcher.connect(ME, 1, mobj, inlet);
    outlet(1, msg);
    this.patcher.disconnect(ME, 1, mobj, inlet);
} 

add_channels.immediate = 1;
function add_channels(n) {
    for (i = 0; i < n; i++) {
        add_channel();
    }
}

add_channel.immediate = 1;
function add_channel() {
    var midi_sink = this.patcher.newdefault(
        cur_offset, 15,
        "bpatcher",
        "@name", "midi_sink.maxpat",
        "@varname", "midi_sink" + cur_channel.toString(),
        "@presentation", 1,
        "@presentation_rect", cur_offset, 0, 105, 170,
        "@patching_rect", cur_offset, 0, 105, 170
    );
    
    message_inlet(midi_sink, 0, cur_note);
    message_inlet(midi_sink, 1, cur_channel);
    
    cur_channel++;
    cur_note++;
    cur_offset += OFFSET_INCR;
}

remove_channels.immediate = 1;
function remove_channels() {
    var nchannels = cur_channel;
    for (i = 0; i < nchannels; i++) {
        remove_channel(i);
    }
    cur_channel = CHANNEL;
    cur_note = NOTE;
    cur_offset = OFFSET;
}

remove_channel.immediate = 1;
function remove_channel(channel) {
    var midi_sink = $("midi_sink" + channel.toString());
    
    if (midi_sink) {
        this.patcher.remove(midi_sink);
    }
}

reset.immediate = 1;
function reset() {
    cur_channel = CHANNEL;
    cur_note = NOTE;
    cur_offset = OFFSET;
}
