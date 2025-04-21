import * as Operations from "./lib/operations.js";
import * as Threads from "./lib/threads.js";
import * as Nav from "./nav.js";

// Private
function select_page(){
    let link_list = document.querySelectorAll("nav a");
    link_list.forEach(link => {
        let path = window.location.href.split("/");
        let page_name = path[path.length-1];
        if(link.href.includes(page_name)) Operations.activate(link);
    });
}

// Public
async function init(){
    let thread1 = new Threads.Thread();

    thread1.register(Operations.load_elements,true);
    thread1.register(select_page,false,1);
    await thread1.run();
}
window.init=init;

function modify_nav(){
    if(window.location.href.includes("index.html")) return;
    let nav = document.querySelectorAll("nav a");
    nav.forEach(element => {
        element.href = "."+element.getAttribute("href");
    });
}
window.modify_nav = modify_nav;

function update_style(style_id,content){
    let new_style = document.createElement("style");
    new_style.id=style_id;
    new_style.appendChild(document.createTextNode(content));
    let old_style = document.querySelector("#"+style_id);
    if(old_style!=null) old_style.replaceWith(new_style); else document.head.appendChild(new_style);
}

var show_citation = false;
function toggle_citations(){
    show_citation = !show_citation;
    if(show_citation) update_style("citations",".citation{display:inline !important;}");
    else update_style("citations","");
}
window.toggle_citations = toggle_citations;

window.load = Operations.load;
window.activate = Operations.activate;
window.deactivate = Operations.deactivate;
window.toggle_activity = Operations.toggle_activity;
window.make_nav = Nav.make_nav;