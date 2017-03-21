(function(){

    var searchIcon = $("#search-icon");
    var searchBox  = $("#search-box");
    var connect    = $(".connect");
    searchIcon.on("click", function(){
        console.log("clicked");
        connect.fadeToggle();
        setTimeout(function(){
            searchBox.toggleClass("open");
        },500);


    });


})();