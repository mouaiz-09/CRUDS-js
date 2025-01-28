console.log("wii sl3 cv alg");

/* the  المتغيرات: */
let nameprodact = document.getElementById("titel");
let pris = document.getElementById("pris");
let ads = document.getElementById("ads");
let discount = document.getElementById("diss");
let total = document.getElementById("total");
let counet = document.getElementById("count");
let submit = document.getElementById("smbt");
let upd = document.getElementById("upd");
total.innerHTML = " ";
let removs = document.getElementById("clera");
let all_remove = document.getElementById("remove");
let cate = "";
let mod = "creat";
let tmp;

//المنتجات انواع
let phon = document.getElementById("phone");
let tv = document.getElementById("tv");
let laptop = document.getElementById("laptop");
let tec = document.getElementById("tec");

onload = function name(params) {
  showdata();
  nemberprodect();
  sessionStorage.clear();
  if (sessionStorage.categoury == null) {
    console.log("framam");
    sessionStorage.categoury = "";
  }
};

//تحديد نوع المنتج
function cat(id) {
  sessionStorage.setItem("categoury", JSON.stringify(id));
  dz = sessionStorage.getItem("categoury");
  console.log(dz);
}
//عدد المنتوجات
function nemberprodect() {
  all_remove.innerHTML = `remove all"${prodect.length}"`;
}

// حفظ ادا كان 'add new prodect'مفتوحه او مغلوق
function save(params) {
  let show = document.getElementById("show");
  let hide = document.getElementById("hide");
  let div = document.getElementById("div");
  if (localStorage.length > 0) {
    if (localStorage.dz == "clos") {
      div.classList.add("h");
      hide.classList.add("h");
      show.classList.remove("none");
    } else {
      div.classList.remove("h");
      hide.classList.remove("h");
      show.classList.add("none");
    }
  }
  hide.onclick = function name(params) {
    div.classList.add("h");
    hide.classList.add("h");
    show.classList.remove("none");
    localStorage.setItem("dz", "clos");
  };
  show.onclick = function name(params) {
    div.classList.remove("h");
    hide.classList.remove("h");
    show.classList.add("none");
    localStorage.setItem("dz", "open");
  };
}
save();

/*get totel   حساب اجمالي السعر/*/
function totalcal(params) {
  if (pris.value != "") {
    let result = +pris.value + +ads.value + +discount.value;
    total.innerHTML = result;
    if (result > 0) {
      localStorage.clear();

      total.style.background = "rgb(60, 255, 0)";
    } else {
      total.style.background = "rgb(255, 0, 0)";
    }
  } else {
    total.style.background = "rgb(255, 166, 0)";
    total.innerHTML = " ";
  }
}
total.style.background = "rgb(255, 166, 0)";

/* حفظ الداتا فيlocalstoreg  */

let prodect;
if (localStorage.prodect != null) {
  prodect = JSON.parse(localStorage.prodect);
} else {
  prodect = [];
}

// البيانات
submit.onclick = function (params) {
  let newprodect = {
    name: nameprodact.value.toLowerCase(),
    ads: ads.value,
    discount: discount.value,
    prise: total.innerHTML,
    category: sessionStorage.getItem("categoury"),
    counet: counet.value,
  };

  /*التحقق من ان اسم المنتج غير فاضي */

  if (nameprodact.value != "" && total.innerHTML != "" && newprodect.counet <=100) {
    if (mod === "creat") {
      if (newprodect.counet > 1) {
        //انشاء عدد من المنتوجات حسب مايدخله المستخدم
        for (let i = 0; i < newprodect.counet; i++) {
          prodect.push(newprodect);
        }
      } else {
        prodect.push(newprodect);
      }
    } else {
      prodect[tmp] = newprodect;
      submit.innerHTML = "creat";
      counet.style.display = "block";
    }

    // حفظ البيانات
    localStorage.setItem("prodect", JSON.stringify(prodect));
  } else {
    console.log(" دخل معلومات ياوسمك");
  }

  // تحديث البيانات  وحذف المعلونات الحالية من الانتبوت
  showdata();

  //عدد المنتوجات
  nemberprodect();
};

// clear datat:   حذف البيانات داخل input
function cleredata() {
  nameprodact.value = "";
  pris.value = "";
  counet.value = "";
  total.innerHTML = "";
  total.style.background = "rgb(255, 166, 0)";
}

//shwo data   جلب الall_remove.innerHTML += بينات وعرضهم في الجدول
function showdata() {
  let tabel = "";

  for (let i = 0; i < prodect.length; i++) {
    tabel += `
   <tr>
                <td>${i + 1}</td>
                <td id="">${prodect[i].name.toUpperCase()}</td>
                <td id="df">${prodect[i].prise}</td>
                <td id="">${prodect[i].category}</td>
                <td class="ac">
                <button onclick="updet(${i})"     id="updet">updet</button>
                <button onclick=" remdata( ${i}) " id="delet">delet</button>
                </td>
                </tr>
                `;
  }

  document.getElementById("tbody").innerHTML = tabel;
  if (prodect.length > 0) {
    removs.classList.remove("h");
  } else {
    removs.classList.add("h");
  }
}

//حذف كل  البيانات من localstorgتماما
function alldelet() {
  localStorage.clear();
  prodect.splice(0);
  showdata();
}

//حذف منتج معين من البيانات
function remdata(i) {
  prodect.splice(i, 1);
  localStorage.prodect = JSON.stringify(prodect);
  showdata();
  nemberprodect();
}
function updet(i) {
  cleredata();
  tmp = i;
  //جلب البيانت
  nameprodact.value = prodect[i].name;
  discount.value = prodect[i].discount;
  ads.value = prodect[i].ads;
  pris.value = prodect[i].prise;
  total.innerHTML = prodect[i].prise;
  totalcal();
  counet.style.display = "none";

  //تغير خلفية  لااجمالي حسب السعر
  console.log();
  if (prodect[i].prise > 10) {
    total.style.background = "rgb(60, 255, 0)";
  } else {
    if (prodect[i].prise > 0) {
      total.style.background = "rgb(255, 196, 0)";
    } else {
      total.innerHTML = "... ";
    }
  }

  //انواع المنتجات تحديد
  if (prodect[i].category == `"phone"`) {
    phon.click();
  }
  if (prodect[i].category == `"laptop"`) {
    laptop.click();
  }
  if (prodect[i].category == `"tv"`) {
    tv.click();
  }
  if (prodect[i].category == `"tec"`) {
    tec.click();
  }
  //تغير الزر
  submit.innerHTML = "update";

  //تغير المود
  mod = "upd";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//mod serch
let sermod = "titel";
let btn_serch = document.getElementById("serch");
function serch(id) {
  showdata();
}
//btn serch
function cl() {
  let bytetel = document.getElementById("bytetel");
  let by_category = document.getElementById("by-category");
  let div = document.getElementById("divs");

  bytetel.onclick = function () {
    by_category.classList.remove("h");
    bytetel.classList.add("h");
    div.classList.add("h");
    btn_serch.classList.remove("h");
  };

  by_category.onclick = function (params) {
    by_category.classList.add("h");
    bytetel.classList.remove("h");
    div.classList.remove("h");
    btn_serch.classList.add("h");
  };
}

//تحديد نوع المنتج
function fat(id) {
  sessionStorage.setItem("cat", JSON.stringify(id));
  dz = sessionStorage.getItem("cat");
}

//serche
function serchdata(value) {
  let tabel = "";
  for (let i = 0; i < prodect.length; i++) {
    if (prodect[i].name.includes(value.toLowerCase())) {
      tabel += `
      <tr>
                   <td>${i + 1}</td>
                   <td id="">${prodect[i].name.toUpperCase()}</td>
                   <td id="df">${prodect[i].prise}</td>
                   <td id="">${prodect[i].category}</td>
                   <td class="ac">
                   <button onclick="updet(${i})"     id="updet">updet</button>
                   <button onclick=" remdata( ${i}) " id="delet">delet</button>
                   </td>
                   </tr>
                   `;
    }
  }
  btn_serch.focus();
  document.getElementById("tbody").innerHTML = tabel;
}

function srx(value) {
  let tabel = "";
  for (let i = 0; i < prodect.length; i++) {
    if (prodect[i].category.includes(value.toLowerCase())) {
      tabel += `
    <tr>
                 <td>${i + 1}</td>
                 <td id="">${prodect[i].name.toUpperCase()}</td>
                 <td id="df">${prodect[i].prise}</td>
                 <td id="">${prodect[i].category}</td>
                 <td class="ac">
                 <button onclick="updet(${i})"     id="updet">updet</button>
                 <button onclick=" remdata( ${i}) " id="delet">delet</button>
                 </td>
                 </tr>
                 `;
    }
  }
  document.getElementById("tbody").innerHTML = tabel;
}
