$(function(){
    $("#searchBtn").click(function(){
    
        $.get("/scrape", function(data){
        
        for(var i=0; i<5; i++){
            var html = "<div id=''><a href ="+data[i].link+" ><h3>"+data[i].title+"</h3></a></div><button titleData="+"'"+data[i].title+"'"+" linkData="+data[i].link+">Save This Article</button>";
            $("#displayLinks").append(html);
        }

        $("button").click(function(){
            
            var data = {"articleName" : $(this).attr("titleData"),
                        "linkName" : $(this).attr("linkData")};
            var testdata = {
                "dataName1" : "this is test1"
            };
             
            $.post("/saveData", data);

        console.log(data);
        });
    });
});

});