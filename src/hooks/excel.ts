export const downLoad=(data,name)=>{
    const a=document.createElement('a');
    const result=data.map(v=>{
        return Object.values(v).join('\t');
    }).join('\n');
    a.href=URL.createObjectURL(new Blob([result]))
    a.setAttribute('downLoad',name)
    a.click()
}