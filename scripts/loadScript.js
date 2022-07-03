class PathError extends Error{ };

function loadScript(src, mode){
    return new Promise((resolve, reject)=>{
        let script=document.createElement('script');
        script.src=src;
        if(mode==='body'){
            document.body.append(script);
        }
        else{
            document.head.append(script);
        }

        onload=()=>resolve(script);
        onerror=()=>reject(new PathError('no such path or directory'));
    })
}

loadScript('scripts/class-table.js');