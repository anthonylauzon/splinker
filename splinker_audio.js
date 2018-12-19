inlets = 1;
outlets = 2;

var ME = this.box;
var CHANNEL = 0;
var NAME = this.script_name
var MAX_CHANNELS = 16;
var cur_channel = CHANNEL;

$.immediate = 1;
function $(s){
    return this.patcher.getnamed(s);
}

message_inlet.immediate = 1;
function message_inlet(mobj, inlet, msg) {
    this.patcher.connect(ME, 1, mobj, inlet);
    outlet(1, msg);
    this.patcher.disconnect(ME, 1, mobj, inlet);
} 

add_channels.immediate = 1;
function add_channels(n) {
    var cur_channel = 0;

    for (cur_channel = 0;
         cur_channel < n && cur_channel < MAX_CHANNELS; 
         cur_channel++) {
        var recv_panel = $("recv_panel" + cur_channel.toString());
        this.patcher.sendtoback(recv_panel);
        recv_panel.hidden = 1;
        var audio_source = $("audio_source" + cur_channel.toString());
        audio_source.ignoreclick = 0;
        message_inlet(audio_source, 1, cur_channel);
    }
    for (; cur_channel < MAX_CHANNELS; cur_channel++) {
        var recv_panel = $("recv_panel" + cur_channel.toString());
        recv_panel.hidden = 0;
        var audio_source = $("audio_source" + cur_channel.toString());
        audio_source.ignoreclick = 1;
        this.patcher.bringtofront(recv_panel);
    }
}

reset.immediate = 1;
function reset() {
    cur_channel = CHANNEL;
}
