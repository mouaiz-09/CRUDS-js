console.log("wii sl3 cv alg");

/* the  المتغيرات: */
let nameprodact = document.getElementById("titel");
let pris = document.getElementById("pris");
let ads = document.getElementById("ads");
let discount = document.getElementById("diss");
let total = document.getElementById("total");
let counet = document.getElementById("count");

let submit = document.getElementById("smbt");
total.innerHTML = " ";
let removs = document.getElementById("clera");
let all_remove = document.getElementById("remove");
let cate = "";

onload = function name(params) {
  showdata();
  nemberprodect();
};

//تحديد نوع المنتج
function cat(id) {
  sessionStorage.setItem("categoury", JSON.stringify(id));
  dz = sessionStorage.getItem("categoury");
  console.log(dz);
}
//عدد المنتوجات
function nemberprodect() {
     all_remove.innerHTML += `  "${prodect.length}"`;
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
    name: nameprodact.value,
    prise: total.innerHTML,
    category: sessionStorage.getItem("categoury"),
    counet: counet.value,
  };
  /*التحقق من ان اسم المنتج غير فاضي */

  if (nameprodact.value != "") {
    //انشاء عدد من المنتوجات حسب مايدخله المستخدم
    if (newprodect.counet > 1) {
      for (let i = 0; i < newprodect.counet; i++) {
        prodect.push(newprodect);
      }
    } else {
      prodect.push(newprodect);
    }

    localStorage.setItem("prodect", JSON.stringify(prodect));
  } else {
    console.log(" دخل معلومات ياوسمك");
  }

  // تحديث البيانات  وحذف المعلونات الحالية من الانتبوت
  showdata();
  cleredata();
  //عدد المنتوجات
  nemberprodect()
 
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
                <td>${i+1}</td>
                <td id="">${prodect[i].name}</td>
                <td id="df">${prodect[i].prise}</td>
              
                <td id="">${prodect[i].category}</td>
                <td class="ac">
                <button id="updet">updet</button>
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
  console.log(i);
  prodect.splice(i, 1);
  localStorage.prodect = JSON.stringify(prodect);
  showdata();
}
