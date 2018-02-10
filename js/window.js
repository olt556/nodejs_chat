var count = 0;
var touch_position_h;
var touch_prevent_flag = 0;
document.getElementById("timeline_panel").ontouchstart = function(event){
    if (touch_prevent_flag === 0){  
    }else{
        touch_position_h = event.changedTouches[0];
   　　}
}
window.onload = function(){
    window_getsize();   
}
window.onresize = function(){  
    window_getsize();  
}
document.getElementById("timeline_panel").ontouchmove = function(event){
    if (touch_prevent_flag === 0){
            event.preventDefault();
    }else{
    }
}
document.getElementById("btn_sample").onclick = function(event){
    if (!event){
    } else {
        var element = document.getElementById("textInput_area");
        let send_text = element.value;

        if(element.value!==null && element.value!=false){
            element.value=null;
        }else{
            return;
        }
        setTimeout(sendBroadcast(send_text), 1000);
    }
}
document.getElementById("btn_clean").onclick = function(event){
    if (!event){
    } else {
        localStorage.clear(); 
    }
}
let count_onclick_btnSample = 0;
let messageLast_containerTop = [];
let MakeObjectClass = function(req,text) {
    if(!(this instanceof MakeObjectClass)) {
        return new MakeObjectClass(req, text);
    }
    if(!req &&  req ==='get'){
        this.get = text;
    } else if(!req &&  req ==='send'){
        this.send = text;
    }
};
let mk_oj = MakeObjectClass.prototype;
mk_oj.send = function(text) {
    this.send = object_make_send(text);
};
mk_oj.get = function(text) {
    this.get =  object_make_get(text);
};
function window_getsize(){  
    var size_h = window.innerHeight;
    var size_w = window.innerWidth;

       if(size_h > size_w){
        var element = document.getElementById("window_panel"); 
        element.style.height = size_h + 'px';
        element.style.width = size_w + 'px';

        var element = document.getElementById("headder_panel");
        let headder_size_h = size_h*0.085;//0.2*0.5*0.2
        element.style.height = headder_size_h + 'px';
        element.style.width = size_w + 'px';
        element.style.top = 0 + 'px';

        var element = document.getElementById("btn_clean"); 
        let btncln_size_h = headder_size_h;//0.2*0.5*0.2
        element.style.height = btncln_size_h*0.75 + 'px';
        element.style.width = btncln_size_h*0.75 + 'px';
        element.style.bottom = btncln_size_h*(0.1) + 'px';
        element.style.right = btncln_size_h*(0.4) + 'px';

        var element = document.getElementById("input_panel"); 
        let IPsize_h = size_h*0.14;
        element.style.height = IPsize_h + 'px';
        element.style.width = size_w + 'px';
        element.style.bottom = 0 + 'px';

        var element = document.getElementById("timeline_panel"); 
        let TLsize_h = size_h - IPsize_h - headder_size_h;
        element.style.height = TLsize_h + 'px';
        element.style.width = size_w + 'px';
        element.style.bottom = size_h - TLsize_h - headder_size_h + 'px';

        var element = document.getElementById("btn_sample"); 
        let btn02_size_h = size_h*0.12;
        element.style.height = btn02_size_h*0.85 + 'px';
        element.style.width = btn02_size_h*0.85+ 'px';
        element.style.bottom = btn02_size_h*(0.25/2.5) + 'px';
        element.style.right = btn02_size_h*(0.25) + 'px';

        var element = document.getElementById("textInput_area");
        let textarea_size_h = size_h*0.12;
        element.style.height = textarea_size_h*0.75 + 'px';
        element.style.width = size_w - btn02_size_h*0.85 - btn02_size_h*(0.25)*3  + 'px';
        element.style.bottom = textarea_size_h*(0.25/1.5) + 'px';
        element.style.right = btn02_size_h*0.85+btn02_size_h*(0.25)*2 + 'px';
        element.style.max_height = textarea_size_h*0.75 + 'px';
        element.style.max_width = size_w*0.675 + 'px';
    }
    else if(size_h < size_w){
        var element = document.getElementById("window_panel"); 
        element.style.height = size_h + 'px';
        element.style.width = size_w + 'px';

        var element = document.getElementById("headder_panel");
        let headder_size_h = 0;
        element.style.height = headder_size_h + 'px';
        element.style.width = size_w + 'px';
        element.style.top = 0 + 'px';

        var element = document.getElementById("input_panel"); 
        let IPsize_h = size_h*0.215;
        element.style.height = IPsize_h + 'px';
        element.style.width = size_w + 'px';
        element.style.bottom = 0 + 'px';

        var element = document.getElementById("timeline_panel");    
        let TLsize_h = size_h - IPsize_h - headder_size_h;
        element.style.height = TLsize_h + 'px';
        element.style.width = size_w + 'px';
        element.style.bottom = size_h - TLsize_h - headder_size_h + 'px';

        var element = document.getElementById("btn_sample"); 
        let btn01_size_h = size_h*0.2;
        element.style.height = btn01_size_h*0.85 + 'px';
        element.style.width = btn01_size_h*0.85 + 'px';
        element.style.bottom = btn01_size_h*(0.25/2.75) + 'px';
        element.style.right = btn01_size_h*(0.25) + 'px';

        var element = document.getElementById("btn_clean"); 
        let btncln_size_h = size_h*0.085;
        element.style.height = btncln_size_h*0 + 'px';
        element.style.width = size_w*0 + 'px';
        element.style.bottom = btncln_size_h*(0.075) + 'px';
        element.style.right = btncln_size_h*(0.4) + 'px';

        var element = document.getElementById("textInput_area");
        let textarea_size_h = size_h*0.2;
        element.style.height = textarea_size_h*0.75 + 'px';
        element.style.width = size_w - btn01_size_h*(0.25)*3 - btn01_size_h*0.85 + 'px';
        element.style.bottom = textarea_size_h*(0.25/2) + 'px';
        element.style.right = btn01_size_h*(0.25)*2+btn01_size_h*0.85 + 'px';
        element.style.max_height = textarea_size_h*0.75 + 'px';
        element.style.max_width = size_w*0.675 + 'px';
    }
}
function object_make_send(text){  
    let TLsize_h = document.getElementById("timeline_panel").height; 
    let TLsize_w = document.getElementById("timeline_panel").width;
    var str_tmp_h = 0;
    var str_tmp_t = 0;
    var str_tmp = 0;
    if(count_onclick_btnSample === 0){
        messageLast_containerTop.splice(0,0,0);
    }else if (count_onclick_btnSample === 1) { 
        var tmp_num = count_onclick_btnSample - 1;
        var element = document.getElementById('message_container'+ tmp_num);
        str_tmp_h = element.clientHeight;
        str_tmp = Number(element.clientHeight) + 20;
        messageLast_containerTop.splice(count_onclick_btnSample, 0, str_tmp);
    }else if (count_onclick_btnSample > 1){ 
        var tmp_num = count_onclick_btnSample-1;
        var element = document.getElementById('message_container'+tmp_num);
        str_tmp_h = element.clientHeight;
        str_tmp_t = element.style.top;
        str_tmp =  messageLast_containerTop[tmp_num] + Number(element.clientHeight) + 10;
        messageLast_containerTop.splice(count_onclick_btnSample, 0, str_tmp);
    }
    if (count_onclick_btnSample === 0) {
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:10px; margin:0px; max-width:40%; background:#CCC; left:10px;"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;  
    } else if (count_onclick_btnSample === 1){
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:' + messageLast_containerTop[count_onclick_btnSample] + 'px; margin:0px;  max-width:40%; background:#CCC; left:10px;"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;
    } else if (count_onclick_btnSample > 1) {
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:' + messageLast_containerTop[count_onclick_btnSample] + 'px; margin:0px; max-width:40%; background:#CCC; left:10px;"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;
    }
}
function object_make_get(text){  
    let TLsize_h = document.getElementById("timeline_panel").height; 
    let TLsize_w = document.getElementById("timeline_panel").width;
    var str_tmp_h = 0;
    var str_tmp_t = 0;
    var str_tmp = 0;
    if(count_onclick_btnSample === 0){
        messageLast_containerTop.splice(0,0,0);
    }else if (count_onclick_btnSample === 1) { 
        var tmp_num = count_onclick_btnSample - 1;
        var element = document.getElementById('message_container'+ tmp_num);
        str_tmp_h = element.clientHeight;
        str_tmp = Number(element.clientHeight) + 20;
        messageLast_containerTop.splice(count_onclick_btnSample, 0, str_tmp);
    }else if (count_onclick_btnSample > 1){ 
        var tmp_num = count_onclick_btnSample-1;
        var element = document.getElementById('message_container'+tmp_num);
        str_tmp_h = element.clientHeight;
        str_tmp_t = element.style.top;
        str_tmp =  messageLast_containerTop[tmp_num] + Number(element.clientHeight) + 10;
        messageLast_containerTop.splice(count_onclick_btnSample, 0, str_tmp);
    }
    if (count_onclick_btnSample === 0) {
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:10px; margin:0px; max-width:40%; background:#CCC; right:10px"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;  
    } else if (count_onclick_btnSample === 1){
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:' + messageLast_containerTop[count_onclick_btnSample] + 'px; margin:0px;  max-width:40%; background:#CCC; right:10px;"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;
    } else if (count_onclick_btnSample > 1) {
        var object;
        object = [
            '<div id="message_container'+ count_onclick_btnSample +'" style = "position:absolute; top:' + messageLast_containerTop[count_onclick_btnSample] + 'px; margin:0px; max-width:40%; background:#CCC; right:10px"> '
                + '<p  style="padding-left:5px; padding-right:5px;">'
                +'<font color="black">'+ text + '</font>'
                +'</p>'
                + '</div>'
            + '</div>'];
        document.getElementById("timeline_panel").innerHTML += object;
        count_onclick_btnSample = count_onclick_btnSample + 1;
    }
}