import * as Operations from "./lib/operations.js";

// function Node(element,value=element.querySelector(".node_name").innerHTML,link=element.href){
//     this.element = element;
//     this.value = value;
//     this.link = link;
//     this.children = [];
//     this.push = function(node){
//         this.children.push(node);
//     }
//     this.push_all = function(node_list){
//         this.children = this.children.concat(node_list);
//     }
//     this.push_element = function(element){
//         this.push(new Node(element));
//     }
//     this.push_all_elements = function(element_list){
//         element_list.forEach(element => {
//             this.push_element(element);
//         });
//     }
//     this.get_display = function(){
//         let display_n = new Node(this.element, this.value);
//         display_n.children = this.children;
//         display_n.value.classList.remove("node_attr");
//         display_n.value.classList.remove("node_attr");
//         return display_n;
//     }
// }

// async function create_tree(path){
//     let head;
//     await fetch(path)
//     .then(response => response.text())
//     .then(data => {
//         let html = document.createElement("html");
//         html.innerHTML= data;
//         head = new Node(html,html.querySelector(".node_name"),html.querySelector(".node_box"));

//         head.push_all_elements(html.querySelectorAll("body>.tree_node"));
//         let que = [head];
//         for (let top = 0; top < que.length; top++) {
//             let children_element = que[top].element.querySelectorAll(".tree_node");
//             if(children_element == null){
//                 continue;
//             }
            
//             children_element.forEach(element => {
//                 let child_node = new Node(element);
//                 que[top].push(child_node);
//                 que.push(child_node);
//             });
//         }
//     });
//     return head;
// }

// async function creat_trees(path){
//     let nav_links = document.querySelectorAll("nav a");
//     let f_path_list = [];
//     nav_links.forEach(link => {
//         f_path_list.push(link.href);
//     });
//     let res = [];
//     for (let index = 0; index < f_path_list.length; index++) {
//         const f = f_path_list[index];
//         res.push(await create_tree(f));
//     }
//     return res;
// }
function create_link(name, link_href){
    return Operations.parseDOM(
            '<li>'+
                '<a href="'+link_href+'">'+name+'</a>'+
            '</li>'
        )[0];
}

export async function make_nav(selector,path){
    return Operations.load(selector,path).then(res=>{
        let tar = document.querySelector(selector + " .menu_content ul");
        let nav_links = document.querySelectorAll("nav ul a");
        nav_links.forEach(element => {
            tar.appendChild(create_link(element.innerHTML,element.href))
        });
    });
}