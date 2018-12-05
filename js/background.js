(($) => {
    var methods = {
        init: function(options){
            var settings = $.extend({
                elements: [],
                time: 5,
                playend: false
            }, options);
            return this.each(() => {
                if(this.data("bgtime") == undefined){
                    var globalTime = settings.time;
                }else{
                    var globalTime = this.data("bgtime");
                };
                if(this.data("bgplayend") == undefined){
                    var globalPlayend = settings.playend;
                }else{
                    var globalPlayend = this.data("bgplayend");
                };
                let elements = settings.elements;
                for(let i = 0; i < elements.length; i ++){
                    if(elements[i].time == undefined){
                        var localTime = globalTime;
                    }else{
                        var localTime = elements[i].time;
                    };
                    if(elements[i].playend == undefined){
                        var localPlayend = globalPlayend;
                    }else{
                        var localPlayend = elements[i].playend;
                    };
                    let child = $("<div>", {
                        "class": elements[i].type,
                        "data-bgtime": localTime,
                        "data-bgplayend": localPlayend
                    });
                    if(elements[i].type == "img"){
                        $(child).append($('<img src="' + elements[i].url + '" />'));
                    }else if(elements[i].type == "video"){
                        $(child).append($('<video poster="' + elements[i].poster + '">'));
                        let video = child.children();
                        $(video).append($('<source src="' + elements[i].url + '" />'));
                    };
                    this.append(child);
                };
                let children = this.children();
                for(let i = 0; i < children.length; i ++){
                    if($(children[i]).attr("data-bgtime") == undefined){
                        $(children[i]).attr("data-bgtime", globalTime);
                    };
                    if($(children[i]).attr("data-bgplayend") == undefined){
                        $(children[i]).attr("data-bgplayend", globalPlayend);
                    };
                    if(i == 0){
                        $(children[i]).css({
                            "z-index": -1 * i -1,
                            "opacity": 1
                        });
                    }else{
                        $(children[i]).css({
                            "z-index": -1 * i -1,
                            "opacity": 0
                        });
                    };
                };
                let childrenVideo = this.children(".video");
                for(let i = 0; i < childrenVideo.length; i ++){
                    if($(childrenVideo[i]).data("bgplayend") == false){
                        $(childrenVideo[i]).find("video")[0].loop = true;
                        $(childrenVideo[i]).find("video")[0].autoplay = true;
                        $(childrenVideo[i]).find("video")[0].muted = true;
                        $(childrenVideo[i]).find("video")[0].play();
                    }else{
                        $(childrenVideo[i]).find("video")[0].loop = false;
                        $(childrenVideo[i]).find("video")[0].autoplay = false;
                        $(childrenVideo[i]).find("video")[0].muted = true;
                    };
                };
            });
        },
        run: function(){
            return this.each(() => {
                let globalTime = this.data("bgtime");
                let globalPlayend = this.data("bgplayend");
                let elements = this.children();
                console.log(elements);
                let numberOfElement = elements.length;
                let pointer = 0;
                let previousPointer = numberOfElement - 1;
                var next = function(element){
                    if($(element).data("bgtime") == undefined){
                        var localTime = globalTime;
                    }else{
                        var localTime = $(element).data("bgtime");
                    };
                    if($(element).data("bgplayend") == undefined){
                        var localPlayend = globalPlayend;
                    }else{
                        var localPlayend = $(element).data("bgplayend");
                    };
                    $(elements[previousPointer]).find("video").off("ended");
                    $(elements[previousPointer]).css("opacity", 0);
                    previousPointer = pointer;
                    pointer ++;
                    pointer %= numberOfElement;
                    $(element).css("opacity", 1);
                    if(localPlayend && element.className.includes("video") && $(element).find("video")[0].readyState == 4){
                        clearTimeout(timer);
                        $(element).find("video")[0].play();
                        $(element).find("video").on("ended",function(){
                            $(element).find("video")[0].currentTime = 0;
                            next(elements[pointer]);
                        })
                    }else{
                        var timer = setTimeout(next, localTime * 1000, elements[pointer]);
                    };
                };
                next(elements[pointer]);
            });
        }
    };
    $.fn.background = function(method){
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
          }else if(typeof method === 'object' || !method){
            return methods.init.apply(this, arguments);
          };
    };
})(jQuery);