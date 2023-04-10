// Ngày tháng
var d = new Date();
var day = d.getDate(); //ngày hiện tại
var daystr = day.toString();
//var d_daystr= daystr.length;
if (daystr.length === 1) {
  daystr = "0" + daystr;
  //  console.log(daystr);
} else {
  // console.log("sai");
}

var m = d.getMonth() + 1; // tháng hiện tại [0-11] phải cộng cho 1
var mstr = m.toString();
// console.log(mstr.length);
if (mstr.length === 1) {
  mstr = "0" + mstr;
  // console.log(mstr);
  // console.log("đk dung")
} else {
  // console.log("thang có 2 so");
}

//console.log(d.getMonth())
// $("#btn-diemdanh").text("Châm cứu " + daystr+ "/" + mstr + "/" + d.getFullYear());
// $("#btn-xuatvien").text("Xuất viện " + daystr+ "/" + mstr + "/" + d.getFullYear());
// $("#btn-nhapvien").text("Nhập viện " + daystr+ "/" + mstr + "/" + d.getFullYear());

// lấy ID
$("#btn-tracuu").click(function () {
  let nhapvao = $("#tags").val();
  let vitri1 = nhapvao.indexOf(":") + 1;
  let vitri2 = nhapvao.indexOf("/");
  var maID = nhapvao.slice(vitri1, vitri2).trim();
  //console.log(maID);
});
var postAPI =
  "https://script.google.com/macros/s/AKfycbxH-wJUqFE_2Q9Fta3DpgsUsqkRxQUi3kjQJjg_oTHbTF_s0i0hCuOCTlijU_FgEG_cDg/exec";
fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (post) {
    $("#id-benh-nhan").text("Mã số hồ sơ : " + " " + (post.length + 1));
    $("#btn-them-du-lieu").click(function () {
      let hovaTen = document.getElementById("form-ho-va-ten");
      let tuoiBn = document.getElementById("form-tuoi");
      let gioitinhBn = document.getElementById("form-gioi-tinh");
      let dateNhapvien = document.getElementById("form-date");
      let phanloaiBN = document.getElementById("form-phan-loai");
      let ghichutrieuchung = document.getElementById("form-ghi-chu-2");
      let vaLhovaTen = hovaTen.value;
      let vaLtuoiBn = tuoiBn.value;
      let vaLgioitinhBn = gioitinhBn.value;
      let vaLdateNhapvien = dateNhapvien.value;
      let vaLphanloaiBn = phanloaiBN.value;
      let vaLghichu2 = ghichutrieuchung.value;

      if (
        vaLhovaTen === "" ||
        vaLtuoiBn === "" ||
        vaLgioitinhBn === "" ||
        vaLdateNhapvien === "" ||
        vaLphanloaiBn === ""
      ) {
        alert("Vui lòng điền đầy đủ và chính xác thông tin bệnh nhân !");
      } else {
        var urlthemthongtin =
          "https://script.google.com/macros/s/AKfycbxODN-dswG9JQbvvGKEDDBAUD3xP-TA-zWgHajLlb3R82TR7mxMiGL7SMU90hHvnzGWKg/exec";
        var data_benhnhanmoi = {
          id: post.length + 1,
          ho_va_ten: vaLhovaTen,
          tuoi: vaLtuoiBn,
          gioi_tinh: vaLgioitinhBn,
          ngay_nhap_vien: vaLdateNhapvien,
          phan_loai: vaLphanloaiBn,
          ghi_chu_2: vaLghichu2,
          lich_su:
            '=ARRAYFORMULA(TEXTJOIN(" | ";TRUE;IF(diemdanh!$B:B = B' +
            (post.length + 2) +
            ' ; diemdanh!C:C ; "")))',
          nhap_xuat:
            "=IF(left(RIGHT(J" +
            (post.length + 2) +
            ';19);8)="Châm cứu";"Đang điều trị";if(left(right(J' +
            (post.length + 2) +
            ';20);9) = "Xuất viện";right(J' +
            (post.length + 2) +
            ';20);"Nhập viện không châm cứu"))',
            bacsidieutri : '=CONCATENATE(G'+(post.length + 2)+';'+'"'+' | '+'"'+';'+'ARRAYFORMULA(TEXTJOIN(" | ";TRUE;IF(diemdanh!$A:A = A' +
            (post.length + 2) +
            ' ; diemdanh!K:K ; ""))))',
            chandoan : '=CONCATENATE(I'+(post.length + 2)+';'+'"'+' | '+'"'+';'+'ARRAYFORMULA(TEXTJOIN(" | ";TRUE;IF(diemdanh!$A:A = A' +
            (post.length + 2) +
            ' ; diemdanh!L:L ; ""))))',
            hosobenhan : '=VLOOKUP(A'+(post.length + 2)+';'+'khobenhanvaphieudieutri!A:C;2;0)'
        };
        $.ajax({
          url: urlthemthongtin,
          method: "GET",
          dataType: "json",
          data: data_benhnhanmoi,
        });
        
        alert("Ghi dữ liệu bệnh nhân mới thành công !");
        //console.log (data_benhnhanmoi)
        location.reload();
      }
    });

    $("#btn-tracuu").click(function () {
      let nhapvao = $("#tags").val();
      let vitri1 = nhapvao.indexOf(":") + 1;
      let vitri2 = nhapvao.indexOf("/");
      var maID = nhapvao.slice(vitri1, vitri2).trim();
      // console.log(maID);
      $("#fullname").text(post[maID - 1].ho_va_ten);
      $("#yearsold").text(post[maID - 1].tuoi);
      $("#gender").text(post[maID - 1].gioi_tinh);
      // $("#dayon").text(post[maID-1].ngay_nhap_vien)
      $("#dien_bien").text(post[maID - 1].nhap_xuat);
      $("#days").text(post[maID - 1].lich_su);
      $("#chan-doan").text(post[maID - 1].ghi_chu_2);
      // $("#bacsi").text(post[maID - 1].phan_loai);
      $("#masohoso").text("Mã số : " + post[maID - 1].id);
      // document.getElementById("phieudieutri-1").innerHTML = post[maID-1].phieudieutri
      $("#hosobenhan").attr("href", post[maID - 1].hosobenhan);
      $("#phieudieutri").attr("href", post[maID - 1].phieudieutri);
      var lichsuDieutri = document.getElementById("days").innerText;
      var positionDieutrigannhat = lichsuDieutri.lastIndexOf("Nhập viện"); //Nhập viện 08/10/2022 : 20 ký tự
      var dieutriGannhat = lichsuDieutri.slice(positionDieutrigannhat);
      $("#dieutrigannhat").text(dieutriGannhat);
      var ngay_nhap_vien_gan_nhat = dieutriGannhat.slice(0, 20);
      // Lịch sử bác sĩ điều trị
      var lichsuBacsi = post[maID-1].bacsidieutri;
      var positionBacsigannhat = lichsuBacsi.lastIndexOf("Bác sĩ");
      var bacsiGannhat = lichsuBacsi.slice(positionBacsigannhat);
      // Sửa chẩn đoán
      var lichsuChandoan = post[maID-1].chandoan
      var positionChandoangannhat = lichsuChandoan.lastIndexOf("|");
      var chandoanGannhat = lichsuChandoan.slice((positionChandoangannhat+1))
      console.log(chandoanGannhat)
      if(chandoanGannhat === " "){
        console.log('Bieu thuc dung')
        chandoanGannhat = lichsuChandoan.slice(0,positionChandoangannhat)
        $("#chan-doan").text(chandoanGannhat);
      } else {
        console.log('Bieu thuc sai')
        $("#chan-doan").text(chandoanGannhat);
      }
      
      $("#bacsi").text(bacsiGannhat)
      //console.log("Vị trí điều trị gần nhất : "+positionDieutrigannhat+" /Nhập viện :" + ngay_nhap_vien_gan_nhat)
      //console.log("Chuỗi điều trị gần nhất = " + dieutriGannhat)
      $("#dayon").text(ngay_nhap_vien_gan_nhat);
      // console.log(positionDieutrigannhat)
      // console.log(lichsuDieutri);
      if (post[maID - 1].nhap_xuat === "Đang điều trị") {
        $("#dien_bien").css("background-color", "#00ff00");
        // console.log("Đang điều trị")
      } else {
        $("#dien_bien").css("background-color", "#ff2f43");
        $("#dien_bien").css("color", "white");
        // console.log("Nhập viện không châm cứu hoặc đã xuất viện")
      }
      $("#btn-gui-sua-benh-an").click(function()  {
        let bacsi = document.getElementById("form-sua-bacsi")
        let chandoanmoi = document.getElementById("sua-chan-doan")
        let dienbienlamsang = document.getElementById("them-dien-bien-lam-sang");
        let vaLdienbienlamsang = dienbienlamsang.value;
        let vaLbacsi = bacsi.value;
        let vaLchandoanmoi = chandoanmoi.value;
        if (
          vaLbacsi === "" &&
          vaLchandoanmoi === "" &&
          vaLdienbienlamsang === ""
        ) {
          alert("Vui lòng điền đầy đủ và chính xác thông tin bệnh nhân !");
        } else {
          var url =
          "https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec";

        var data = {
          id: maID,
          ho_va_ten: post[maID - 1].ho_va_ten,
          time: d.getHours() + ":" + d.getMinutes(),
          phieudieutri: post[maID - 1].phieudieutri,
          hosobenhan: post[maID - 1].hosobenhan,
          bacsidieutri : vaLbacsi,
          chandoan : vaLchandoanmoi + vaLdienbienlamsang
        };
        // console.log(data)

        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: data,
        });
        alert("Dữ liệu đã được cập nhật");
        }
      }
      );
      $("#btn-diemdanh").click(function () {
        var url =
          "https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec";

        var data = {
          id: maID,
          ho_va_ten: post[maID - 1].ho_va_ten,
          ngay_cham: "Châm cứu " + daystr + "/" + mstr + "/" + d.getFullYear(), //châm cứu ngày tháng năm
          time: d.getHours() + ":" + d.getMinutes(),
          cham_cuu: "Điều trị",
          phieudieutri: post[maID - 1].phieudieutri,
          hosobenhan: post[maID - 1].hosobenhan,
        };
        // console.log(data)

        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: data,
        });
        alert("Điểm danh châm cứu thành công !");
        location.reload();
      });
      $("#btn-xuatvien").click(function () {
        var url =
          "https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec";

        var xuatvien = {
          id: maID,
          ho_va_ten: post[maID - 1].ho_va_ten,
          ngay_cham: "Xuất viện " + daystr + "/" + mstr + "/" + d.getFullYear(),
          time: d.getHours() + ":" + d.getMinutes(),
          xuat_vien: "Xuất viện ",
          phieudieutri: post[maID - 1].phieudieutri,
          hosobenhan: post[maID - 1].hosobenhan,
          bacsidieutri : "Bác sĩ [Chưa chỉ định]",
          chandoan : "Sửa chẩn đoán mới"
        };

        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: xuatvien,
        });
        alert("Ghi xuất viện thành công !");
        location.reload();
      });
      $("#btn-nhapvien").click(function () {
        var url =
          "https://script.google.com/macros/s/AKfycbws243WFFTpVpRNWwrGEjrcWVKlb_4tnlT9BIq_-MpmPCfobbvdu_YehviKypTfZzH2Pw/exec";

        var nhapvien = {
          id: maID,
          ho_va_ten: post[maID - 1].ho_va_ten,
          ngay_cham: "Nhập viện " + daystr + "/" + mstr + "/" + d.getFullYear(),
          time: d.getHours() + ":" + d.getMinutes(),
          nhap_vien: "Nhập viện ",
          phieudieutri: post[maID - 1].phieudieutri,
          hosobenhan: post[maID - 1].hosobenhan,
        };

        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: nhapvien,
        });
        alert("Ghi nhập viện thành công !");
        location.reload();
      });
    });
  });
$("#btn-dong").click(function () {
  location.reload();
});
$("#btn-dong2").click(function () {
  location.reload();
});

// Diem danh
// Tổng số hồ sơ
var postAPI =
  "https://script.google.com/macros/s/AKfycbxH-wJUqFE_2Q9Fta3DpgsUsqkRxQUi3kjQJjg_oTHbTF_s0i0hCuOCTlijU_FgEG_cDg/exec";
fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (post) {
    var results = [];
    var searchField = "nhap_xuat";
    var searchVal = "Đang điều trị";
    for (var i = 0; i < post.length; i++) {
      if (post[i][searchField] == searchVal) {
        results.push(post[i]);
      }
    }
    //console.log(results);

    $("#btn-nhiem-vu").click(function () {
      text = "";
      for (let a = 0; a < results.length; a++) {
        text +=
          "<div class=" +
          "'div-xuong-ho-so'" +
          "><div>" +
          (a + 1) +
          ") " +
          results[a].ho_va_ten + " ("+results[a].id+")"+
          "</div>" +
          "<div>"+results[a].tuoi+"</div>"+
          "<div><a class='openHSBA' href=" +
          "'" +
          results[a].hosobenhan +
          "'" +
          "target=" +
          '"_blank"' +
          ">" +
          '<i title = "Mở hồ sơ bệnh án" class="fa-solid fa-id-card"></i>' +
          "</a>" +
          "<a class='openHSBA' href=" +
          "'" +
          results[a].phieudieutri +
          "'" +
          "target=" +
          '"_blank"' +
          ">" +
          '<i title = "Mở phiếu thực hiện kỹ thuật" class="fa-solid fa-calendar-check"></i>' +
          "</a></div></div>" +
          "<hr>";
      }
      //console.log(text)
      document.getElementById("ds-xuong-ho-so").innerHTML = text;
    });
    document.getElementById("total_profile").innerHTML = results.length;
  });
// Điều trị hôm nay
var dieutri_nhap_xuatvienAPI =
  "https://script.google.com/macros/s/AKfycbw2s39jhczVuMCcdTCW4xIUcMFhKKvIPj4e1KttKJQLtik1Z9R9nA0hroSD9iv-PL5GJg/exec";
fetch(dieutri_nhap_xuatvienAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (dieutri_nhap_xuatvien) {
    var dieutri = [];
    var nhapvien_today = [];
    var xuatvien_today = [];
    var searchField = "ngay_cham";
    var search_dieutri =
      "Châm cứu " + daystr + "/" + mstr + "/" + d.getFullYear();
    var search_nhapvien =
      "Nhập viện " + daystr + "/" + mstr + "/" + d.getFullYear();
    var search_xuatvien =
      "Xuất viện " + daystr + "/" + mstr + "/" + d.getFullYear();
    for (var i = 0; i < dieutri_nhap_xuatvien.length; i++) {
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
    let uniqueResult_dieutrihomnay =  [];
      let ids = [];
      for(let i = 0; i < dieutri.length; i++) {
        let currentID = dieutri[i].id;
        if(!ids.includes(currentID)) {
          uniqueResult_dieutrihomnay.push(dieutri[i]);
          ids.push(currentID);
        }
      }
    document.getElementById("total_profile_dieutri").innerHTML = uniqueResult_dieutrihomnay.length;
    document.getElementById("total_profile_nhap").innerHTML =
      nhapvien_today.length;
    document.getElementById("total_profile_xuat").innerHTML =
      xuatvien_today.length;
  });
