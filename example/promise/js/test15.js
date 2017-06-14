//# 15 es6和jq中的异同
//jquery
(function(){
    var deferred = $.Deferred();
    var promise = deferred.promise();
})();

//es6
(function(){
    var deferred = Promise.defer();
    var promise= defered.promise;
})();