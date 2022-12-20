var postAPI = "https://script.google.com/macros/s/AKfycbw2s39jhczVuMCcdTCW4xIUcMFhKKvIPj4e1KttKJQLtik1Z9R9nA0hroSD9iv-PL5GJg/exec";
fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (post) { 
    $("#btn-ds-dieutri").click(function(){
        var date_filter = $("#date-filter").val(); //dữ liệu trả về 2022-10-04
        var year = date_filter.slice(0,4); // trả về 2022
        var month = date_filter.slice(5,7) // trả về 10
        var day = date_filter.slice(8,10); // trả về 04
        var ngayloc = day+"/"+month+"/"+year;
        var results = [];
    var searchField = "ngay_cham";
    var searchVal = "Châm cứu "+ ngayloc;
    for (var i=0 ; i < post.length ; i++)
{
    if (post[i][searchField] == searchVal) {
        results.push(post[i]);
    }
}
console.log(results)
text = "";
for (let a = 0; a < results.length; a++) {
  text += a+1 + ") "+ "<a href="+"'"+results[a].phieudieutri+"'"+"target="+'"_blank"'+">"+results[a].ho_va_ten+"</a>" + "<br>";}
  // text += a+1 + ") "+ results[a].ho_va_ten + "/"+ results[a].phan_loai+  "<br>";}
  document.getElementById("p-ds-dieutri").innerHTML=text;
  $("#copy_ds_dieutri").click(function(){
    let copyDieutri = document.getElementById("p-ds-dieutri").innerText;
    navigator.clipboard.writeText(copyDieutri)
    $("#copy_ds_dieutri").text("copied")
    copyDieutri.setSelectionRange(0, 99999)
    // <a href="+results[a].phieudieutri+" target="_blank">+results[a].ho_va_ten+</a>
  })
 

    })
    $("#btn-ds-nhapvien").click(function(){
        var date_filter = $("#date-filter").val();
        var year = date_filter.slice(0,4); //2022-10-04
        var month = date_filter.slice(5,7)
        var day = date_filter.slice(8,10);
        var ngayloc = day+"/"+month+"/"+year;
        var results = [];
    var searchField = "ngay_cham";
    var searchVal = "Nhập viện "+ ngayloc;
    console.log("Ngày lọc " + searchVal)
    for (var i=0 ; i < post.length ; i++)
{
    if (post[i][searchField] == searchVal) {
        results.push(post[i]);
    }
}
console.log(results)
text = "";
for (let a = 0; a < results.length; a++) {
  text += a+1 + ") "+ "<a href="+"'"+results[a].phieudieutri+"'"+"target="+'"_blank"'+">"+results[a].ho_va_ten+"</a>" + "<br>";}
  document.getElementById("p-ds-nhapvien").innerHTML=text;
  $("#copy_ds_nhapvien").click(function(){
    let copyNhapvien = document.getElementById("p-ds-nhapvien").innerText;
    navigator.clipboard.writeText(copyNhapvien)
    $("#copy_ds_nhapvien").text("copied")
    copyNhapvien.setSelectionRange(0, 99999)
    
  })
    })
    $("#btn-ds-xuatvien").click(function(){
        var date_filter = $("#date-filter").val();
        var year = date_filter.slice(0,4); //2022-10-04
        var month = date_filter.slice(5,7)
        var day = date_filter.slice(8,10);
        var ngayloc = day+"/"+month+"/"+year;
        var results = [];
    var searchField = "ngay_cham";
    var searchVal = "Xuất viện "+ ngayloc;
    for (var i=0 ; i < post.length ; i++)
{
    if (post[i][searchField] == searchVal) {
        results.push(post[i]);
    }
}
console.log(results)
text = "";
for (let a = 0; a < results.length; a++) {
  text += a+1 + ") "+ "<a href="+"'"+results[a].phieudieutri+"'"+"target="+'"_blank"'+">"+results[a].ho_va_ten+"</a>" + "<br>";}
  document.getElementById("p-ds-xuatvien").innerHTML=text;
  $("#copy_ds_xuatvien").click(function(){
    let copyXuatvien = document.getElementById("p-ds-xuatvien").innerText
    navigator.clipboard.writeText(copyXuatvien);
    $("#copy_ds_xuatvien").text("copied")
    copyXuatvien.setSelectionRange(0, 99999)
    
  })
    })
    
  })

  