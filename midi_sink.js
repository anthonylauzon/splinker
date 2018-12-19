$.immediate = 1;
function $(stringref){
    stringref=stringref.replace(/parent/gi, "parentpatcher")
    var path=stringref.split('.')
    var obj=this.patcher
    for(i in path){
        if(path[i]=='parentpatcher'){ //up 1 level:
            obj=obj.parentpatcher
        }else{
            obj=obj.getnamed(path[i])
            if(i!=path.length-1){ //down 1 level:
                obj=obj.subpatcher()
            }
        }
    }
    return(obj)
}

msg_int.immediate = 1;
function msg_int(a) {
    if (a == 1) {
        $("note_menu").hidden = 1;
        $("velocity_dial").hidden = 1;
        $("velocity_tab").hidden = 1;
        this.patcher.disconnect($("signal"), 0, $("notemaker"), 0);
        
        $("cc_numbox").hidden = 0;
        this.patcher.connect($("signal"), 0, $("ccmaker"), 0);
    } else if (a == 2) {
		$("note_menu").hidden = 0;
        $("velocity_dial").hidden = 0;
        $("velocity_tab").hidden = 0;
		
        this.patcher.connect($("signal"), 0, $("ccmaker"), 0);
        this.patcher.connect($("signal"), 0, $("notemaker"), 0);
    } else {
        $("note_menu").hidden = 0;
        $("velocity_dial").hidden = 0;
        $("velocity_tab").hidden = 0;

        this.patcher.connect($("signal"), 0, $("notemaker"), 0);
        
        $("cc_numbox").hidden = 1;
        
        this.patcher.disconnect($("signal"), 0, $("ccmaker"), 0);
    }
}