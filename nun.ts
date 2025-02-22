export {};
const hed = new Headers();
hed.set("referer", "https://www.pixiv.net/");
Bun.write("./a.png",await fetch("https://i.pximg.net/user-profile/img/2022/09/16/12/57/06/23338940_18bdcce0784794e3004b31f5a4033380_170.png"
    ,{headers:hed}).then((res)=>res.arrayBuffer())
)