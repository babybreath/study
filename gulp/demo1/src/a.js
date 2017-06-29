/* a.js */
(function(){
    console.log('this is a.js');
    var test = 'something';
    function doSomething(test){
        console.log(test);
    }
    doSomething(test);
})();