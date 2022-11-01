
// Ngày tháng
var d = new Date ();
var day = d.getDate(); //ngày hiện tại
var daystr = day.toString();
//var d_daystr= daystr.length;
if (daystr.length === 1 ) {
 daystr = "0"+daystr;
 console.log(daystr);
} else {
  console.log("sai");
}

var m = d.getMonth() +1; // tháng hiện tại [0-11] phải cộng cho 1
var mstr = m.toString();
console.log(mstr.length);
if (mstr.length === 1) {
   mstr = "0"+mstr;
  console.log(mstr);
  console.log("đk dung")
} else {
  console.log("thang có 2 so");
}


//console.log(d.getMonth())
$("#btn-diemdanh").text("Châm cứu " + daystr+ "/" + mstr + "/" + d.getFullYear());
$("#btn-xuatvien").text("Xuất viện " + daystr+ "/" + mstr + "/" + d.getFullYear());
$("#btn-nhapvien").text("Nhập viện " + daystr+ "/" + mstr + "/" + d.getFullYear());

// lấy ID
$("#btn-tracuu").click(function(){
  let nhapvao = $("#tags").val();
  let vitri1 = nhapvao.indexOf(":")+1;
  let vitri2 = nhapvao.indexOf("/");
  var maID = nhapvao.slice(vitri1,vitri2).trim();
  console.log(maID);
})
var postAPI = "https://script.google.com/macros/s/AKfycbxH-wJUqFE_2Q9Fta3DpgsUsqkRxQUi3kjQJjg_oTHbTF_s0i0hCuOCTlijU_FgEG_cDg/exec";
fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (post) {
    
    $("#btn-tracuu").click(function(){
      let nhapvao = $("#tags").val();
  let vitri1 = nhapvao.indexOf(":")+1;
  let vitri2 = nhapvao.indexOf("/");
  var maID = nhapvao.slice(vitri1,vitri2).trim();
  console.log(maID);
      $("#fullname").text(post[maID-1].ho_va_ten)
      $("#yearsold").text(post[maID-1].tuoi)
      $("#gender").text(post[maID-1].gioi_tinh)
      $("#dayon").text(post[maID-1].ngay_nhap_vien)
      $("#dien_bien").text(post[maID-1].nhap_xuat)
      $("#days").text(post[maID-1].lich_su)
      $("#bacsi").text(post[maID-1].phan_loai)
      $("#btn-diemdanh").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var data = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: "Châm cứu " + daystr + "/" + mstr + "/" + d.getFullYear(), //châm cứu ngày tháng năm
        time : d.getHours() + ":" + d.getMinutes(),
        cham_cuu : "Điều trị"
    };
    console.log(data)
    
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data
    });
    alert ("Điểm danh châm cứu thành công !")
    location.reload();
      })
      $("#btn-xuatvien").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var xuatvien = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: "Xuất viện " + daystr+ "/" + mstr + "/" + d.getFullYear(),
        time : d.getHours() + ":" + d.getMinutes(),
        xuat_vien : "Xuất viện "
    };
    
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: xuatvien
    });
    alert ("Ghi xuất viện thành công !");
    location.reload();
      })
      $("#btn-nhapvien").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var nhapvien = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: "Nhập viện " + daystr+ "/" + mstr + "/" + d.getFullYear(),
        time : d.getHours() + ":" + d.getMinutes(),
        nhap_vien : "Nhập viện "
    };
    
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: nhapvien
    });
    alert ("Ghi nhập viện thành công !");
    location.reload();
      })
    }
    )
    
    
  })
  $("#btn-dong").click(function(){
    location.reload();
  })
  $("#btn-dong2").click(function(){
    location.reload();
  })

  // Diem danh
  // Tổng số hồ sơ
  var postAPI = "https://script.google.com/macros/s/AKfycbxH-wJUqFE_2Q9Fta3DpgsUsqkRxQUi3kjQJjg_oTHbTF_s0i0hCuOCTlijU_FgEG_cDg/exec";
fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (post) {
  var results = [];
  var searchField = "nhap_xuat";
  var searchVal = "Đang điều trị";
  for (var i=0 ; i < post.length ; i++)
{
  if (post[i][searchField] == searchVal) {
      results.push(post[i]);
  }
}
console.log(results);

 document.getElementById("total_profile").innerHTML = results.length;
  })