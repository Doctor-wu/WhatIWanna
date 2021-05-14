
export function isCloseSelf(tagName){
    return cacheFunc(createMap("source,input,area,base,link,img,hr,br"))(tagName);
}

function createMap(str){
    let map = {};
    str.split(',').forEach(key=>{
        map[key] = true;
    });
    return (key) => map[key];
}

function cacheFunc(func){
    let keyMap = {};

    return function(...args){
        if(args.length && keyMap[args]){
            console.log("cache");
            return keyMap[args];
        }
        let res = func.apply(this, args);
        if(args.length){
            keyMap[args] = res;
        }
        return res;
    }
}