var level=[];
function traverse(node) {
    var children = node.children;
    console.info("value="+node.value+",code="+node.code);

    if (children != null) {
        children.map(function(node,index){
            var children = node.children;
            if(children!=null){
                traverse(node);
            }
        });
    }
}

function traverseTree() {
    var tree={
        value:"root",
        code:'root',
        children:sourceData
    };
    console.log(tree);
    traverse(tree);
}

traverseTree();
