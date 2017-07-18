function traverse(node,counter) {
    var children = node.children;
    console.log("counter="+counter);
    console.info("value="+node.value+",code="+node.code);

    if (children != null) {
        children.map(function(row,index){
            var children = row.children;
            if(children!=null){
                traverse(row,counter+1);
            }else{
                traverse(row,counter+1);
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
    traverse(tree,0);
}

traverseTree();
