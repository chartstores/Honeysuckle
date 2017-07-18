var level=[];
function traverse(node,counter) {
    var children = node.children;
    // console.log("counter="+counter);
    // console.info("value="+node.value+",code="+node.code);

    try{
        if(level[counter]){
            if(node.children&&node.children.length>0){
                level[counter][node.code]=node.children.map(function(row,index){
                    return ({value:row.value,code:row.code});
                });
            }
        }else{
            level[counter]={};
            if(node.children&&node.children.length>0){
                level[counter][node.code]=node.children.map(function(row,index){
                    return ({value:row.value,code:row.code});
                });
            }
        }
    }catch(e){
        console.info(e);
    }
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
    console.log(level);
}

traverseTree();
