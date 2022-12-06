
// Ngày tháng
var d = new Date ();
var day = d.getDate(); //ngày hiện tại
var daystr = day.toString();
//var d_daystr= daystr.length;
if (daystr.length === 1 ) {
 daystr = "0"+daystr;
//  console.log(daystr);
} else {
  // console.log("sai");
}

var m = d.getMonth() +1; // tháng hiện tại [0-11] phải cộng cho 1
var mstr = m.toString();
// console.log(mstr.length);
if (mstr.length === 1) {
   mstr = "0"+mstr;
  // console.log(mstr);
  // console.log("đk dung")
} else {
  // console.log("thang có 2 so");
}

$("#lichsudieutri-name").click(function(){
  $("#days").show()
})
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
    $("#id-benh-nhan").text("Số hồ sơ : "+" "+(post.length+1))
    $("#btn-them-du-lieu").click (function (){
      let hovaTen = document.getElementById("form-ho-va-ten");
      let tuoiBn = document.getElementById("form-tuoi");
      let gioitinhBn = document.getElementById("form-gioi-tinh");
      let dateNhapvien = document.getElementById("form-date");
      let phanloaiBN = document.getElementById("form-phan-loai");
  
      let vaLhovaTen = hovaTen.value;
      let vaLtuoiBn = tuoiBn.value;
      let vaLgioitinhBn = gioitinhBn.value;
      let vaLdateNhapvien = dateNhapvien.value;
      let vaLphanloaiBn = phanloaiBN.value;
     
      if (vaLhovaTen === "" || vaLtuoiBn === "" || vaLgioitinhBn ==="" || vaLdateNhapvien === "" || vaLphanloaiBn ===""){
          alert("Vui lòng điền đầy đủ và chính xác thông tin bệnh nhân !")
      } else {
          var urlthemthongtin = "https://script.google.com/macros/s/AKfycbxODN-dswG9JQbvvGKEDDBAUD3xP-TA-zWgHajLlb3R82TR7mxMiGL7SMU90hHvnzGWKg/exec";
          var data_benhnhanmoi = {
              id : (post.length+1),
              ho_va_ten : vaLhovaTen,
              tuoi : vaLtuoiBn,
              gioi_tinh : vaLgioitinhBn,
              ngay_nhap_vien : vaLdateNhapvien,
              phan_loai : vaLphanloaiBn,
      
          };
          $.ajax({
              url: urlthemthongtin,
              method: "GET",
              dataType: "json",
              data: data_benhnhanmoi,
          });
          alert ("Ghi dữ liệu bệnh nhân mới thành công !")
          console.log (data_benhnhanmoi)
          location.reload();
      }
      
  })



    
    $("#btn-tracuu").click(function(){
      let nhapvao = $("#tags").val();
  let vitri1 = nhapvao.indexOf(":")+1;
  let vitri2 = nhapvao.indexOf("/");
  var maID = nhapvao.slice(vitri1,vitri2).trim();
  // console.log(maID);
      $("#fullname").text(post[maID-1].ho_va_ten)
      $("#yearsold").text(post[maID-1].tuoi)
      $("#gender").text(post[maID-1].gioi_tinh)
      $("#dayon").text(post[maID-1].ngay_nhap_vien)
      $("#dien_bien").text(post[maID-1].nhap_xuat)
      $("#days").text(post[maID-1].lich_su)
      $("#bacsi").text(post[maID-1].phan_loai)
      var lichsuDieutri = document.getElementById("days").innerText;
      var positionDieutrigannhat = lichsuDieutri.lastIndexOf("Nhập viện");
      var dieutriGannhat = lichsuDieutri.slice(positionDieutrigannhat);
      $("#dieutrigannhat").text(dieutriGannhat)
      // console.log(positionDieutrigannhat)
      // console.log(lichsuDieutri);
      $("#btn-diemdanh").click(function(){
        var url ="https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec"
        
    
    var data = {
        id: maID,
        ho_va_ten: post[maID-1].ho_va_ten,
        ngay_cham: "Châm cứu " + daystr + "/" + mstr + "/" + d.getFullYear(), //châm cứu ngày tháng năm
        time : d.getHours() + ":" + d.getMinutes(),
        cham_cuu : "Điều trị"
    };
    // console.log(data)
    
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
  // Điều trị hôm nay
  var dieutri_nhap_xuatvienAPI = "https://script.google.com/macros/s/AKfycbw2s39jhczVuMCcdTCW4xIUcMFhKKvIPj4e1KttKJQLtik1Z9R9nA0hroSD9iv-PL5GJg/exec";
fetch(dieutri_nhap_xuatvienAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (dieutri_nhap_xuatvien) {
  
  var dieutri = [];
  var nhapvien_today = [];
  var xuatvien_today = [];
  var searchField = "ngay_cham";
  var search_dieutri = "Châm cứu " + daystr + "/" + mstr + "/" + d.getFullYear() ;
  var search_nhapvien = "Nhập viện " + daystr + "/" + mstr + "/" + d.getFullYear() ;
  var search_xuatvien = "Xuất viện " + daystr + "/" + mstr + "/" + d.getFullYear() ;
  for (var i=0 ; i < dieutri_nhap_xuatvien.length ; i++)
{
  if (dieutri_nhap_xuatvien[i][searchField] == search_dieutri) {
      dieutri.push(dieutri_nhap_xuatvien[i]);
  }
  if (dieutri_nhap_xuatvien[i][searchField] == search_nhapvien) {
    nhapvien_today.push(dieutri_nhap_xuatvien[i]);
}
if (dieutri_nhap_xuatvien[i][searchField] == search_xuatvien) {
  xuatvien_today.push(dieutri_nhap_xuatvien[i]);
}

}
// console.log(dieutri);

 document.getElementById("total_profile_dieutri").innerHTML = dieutri.length;
 document.getElementById("total_profile_nhap").innerHTML = nhapvien_today.length;
 document.getElementById("total_profile_xuat").innerHTML = xuatvien_today.length;
  })


