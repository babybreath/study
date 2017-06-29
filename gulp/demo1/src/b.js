/* b.js */
(function(){
    console.log('this is b.js');
    var test = 'one more';
    function doSomething(test){
        console.log(test);
    }
    doSomething(test);
})();