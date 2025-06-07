export {};
const hed = new Headers();
hed.set("referer", "https://www.pixiv.net/");
Bun.write("./a.txt",await fetch("https://www.pixiv.net/novel/show.php?id=24976565#2"
    ,{headers:hed}).then((res)=>res.arrayBuffer())
)