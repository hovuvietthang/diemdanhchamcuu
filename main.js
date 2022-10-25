
// Ngày tháng
$("#btn")
var d = new Date;
var m = d.getMonth() +1 ;
console.log(d.getMonth())
$("#btn-diemdanh").text("Điểm danh điều trị ngày " + d.getDate()+ "/" + m + "/" + d.getFullYear());
$("#btn-xuatvien").text("Xuất viện " + d.getDate()+ "/" + m + "/" + d.getFullYear());

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
      $("#btn-diemdanh").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var data = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: d.getDate()+ "/" + m + "/" + d.getFullYear(),
        time : d.getHours() + ":" + d.getMinutes(),
        xuat_vien : "điều trị"
    };
    
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data
    });
    alert ("Điểm danh thành công !")
      })
      $("#btn-xuatvien").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var xuatvien = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: d.getDate()+ "/" + m + "/" + d.getFullYear(),
        time : d.getHours() + ":" + d.getMinutes(),
        xuat_vien : "xuất viện"
    };
    
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: xuatvien
    });
    alert ("Xuất viện")
      })
    }
    )
    
    
  })

  // Diem danh
  