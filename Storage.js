var Storage = {
    "RESTAURANTS": "restaurants",
    "FROM_STARS": "fromStars",
    "TO_STARS": "toStarts",
    load:function(key){
     return JSON.parse(sessionStorage.getItem(key));
    },
    save:function(key, json){
        sessionStorage.setItem(key, JSON.stringify(json));
    },
    clear:function (key){
        sessionStorage.removeItem(key);
    },
    memoryDump:function(key){
        console.log(key, sessionStorage.getItem(key));
    },
    empty:function(){
        sessionStorage.clear();
    }

};
