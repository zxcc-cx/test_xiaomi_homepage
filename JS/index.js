(function fn() {
  console.log("此页面仅模仿小米首页，2022-1-29完成");
  console.log("未实现：下拉列表动画过渡");
})();

// 轮播图相关函数
let carousel = document.querySelector(".carousel");
const mylist = [...document.getElementsByClassName("img_list")];
let left_point = document.querySelector(".left_point");
let right_point = document.querySelector(".right_point");
let ul = document.querySelector(".carousel>ul");
let ol = document.querySelector(".carousel>ol");
// 侧边工具栏
let totop = document.getElementsByClassName("back_top")[0];
// 懒加载图片
let imgarr = document.querySelectorAll("img");
imgarr = [...imgarr];
function calTop(e) {
  let distance = e.offsetTop;
  do {
    distance += e.offsetTop;
  } while ((e = e.offsetParent));
  return distance;
}

// 圆点跟随轮播图数量插入
for (let i = 0; i < mylist.length; i++) {
  let custom_li = document.createElement("li");
  custom_li.innerHTML = `<a href='#${i + 1}' target='blank'></a>`;
  ol.appendChild(custom_li);
}
// 初始化数据
let NUM = 0;
let timeout;
mylist[NUM].className += " " + "show_detail";
ol.children[NUM].className = "current";

// 切换轮播图函数,根据NUM值显示图片
function run(num) {
  NUM = num || NUM;
  if (num == 0) {
    NUM = 0;
  }
  if (NUM < mylist.length) {
    for (let i = 0; i < mylist.length; i++) {
      mylist[i].className = "img_list";
      ol.children[i].className = "";
    }
    if (NUM < 0) {
      NUM = mylist.length - 1;
    }
    mylist[NUM].className += " " + "show_detail";
  } else {
    NUM = 0;
    for (let i = 0; i < mylist.length; i++) {
      mylist[i].className = "img_list";
      ol.children[i].className = "";
    }
    mylist[NUM].className += " " + "show_detail";
  }
  ol.children[NUM].className = "current";
  // console.log(`》》目前在${NUM + 1}的位置《《`);
}
// TODO:自动播放事件
// 自动播放
clearInterval(timer);
var timer = setInterval(() => {
  run(++NUM);
}, 3500);
// 鼠标移入，取消播放
carousel.addEventListener("mouseenter", function (e) {
  // console.log("鼠标移入");
  clearInterval(timer);
});
// 鼠标移出，继续
carousel.addEventListener("mouseleave", function (e) {
  // console.log("鼠标移出");
  clearInterval(timer);
  timer = setInterval(() => {
    run(++NUM);
  }, 3500);
});

let begin = null;
// 左点击显示上一幅
left_point.addEventListener("click", function (e) {
  let after = new Date().getTime();
  if (after - begin >= 800) {
    run(--NUM);
    begin = after;
  }
});
// 右点击显示下一幅
right_point.addEventListener("click", function (e) {
  let after = new Date().getTime();
  if (after - begin >= 800) {
    run(++NUM);
    begin = after;
  }
});

// 圆点点击事件
[...ol.children].forEach((item, index) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    run(index);
  });
});

// EXTRA:练习正则表达式
// myBaseURI = document.baseURI;
// if (/(#\d*)/gi.test(myBaseURI)) {
//   // var myBaseURI = myBaseURI.replace(/(#\d*)/gi, "");
//   var myBase = myBaseURI.replace(/(#\d*)/gi, "");
//   var pai = /(#\d*)/gi.exec(myBaseURI)[0];
//   console.log(`》》${myBaseURI}路径中含有${pai},`);
// }
// `<a href='${
//     custom_li.baseURI
//   }img/carousel_Xiaomi_0${i + 1}.png' target='blank'></a>`

// "智能穿戴"部分盒子的单选显示列表
let active_focus = document.getElementsByClassName("table_list")[0];
let active_show_list = [...document.querySelector("#zncd>.box_main").children];
active_show_list.shift();
// console.log(active_show_list);
[...active_focus.children].forEach((el, index) => {
  el.addEventListener("mouseenter", function (e) {
    for (const key in [...active_focus.children]) {
      active_focus.children[key].className = "";
      active_show_list[key].className = "detail_list";
    }
    this.className = "active_focus";
    active_show_list[index].className += " " + "active_show_list";
  });
});

window.onscroll = function () {
  let normalTop = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(
  //   normalTop,
  //   window.innerHeight == document.documentElement.clientHeight
  // );
  normalTop > 1000
    ? (totop.style.display = "block")
    : (totop.style.display = "none");

  imgarr.forEach((item) => {
    if (item.hasAttribute("data-src")) {
      // console.log("有data-src属性存在");
      if (normalTop + window.innerHeight > calTop(item)) {
        item.src = item.getAttribute("data-src");
      }
    }
  });
  normalTop = null;
};
totop.onclick = function (e) {
  scrollTo({
    top: 0,
    left: 0,
  });
};
