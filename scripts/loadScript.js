class PathError extends Error{ };

async function loadScript(src, mode){
    return await new Promise((resolve, reject)=>{
        let script=document.createElement('script');
        script.src=src;

        onload=()=>resolve(script);
        onerror=()=>reject(new PathError('no such path or directory'));

        if(mode==='body'){
            document.body.append(script);
        }
        else{
            document.head.append(script);
        }
    })
}