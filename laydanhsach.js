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
  text += a+1 + ") "+ results[a].ho_va_ten + "/"+ results[a].phan_loai+"<br>";}
  document.getElementById("p-ds-dieutri").innerHTML=text;
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
  text += a+1 + ") "+ results[a].ho_va_ten +"/"+ results[a].phan_loai+"<br>";}
  document.getElementById("p-ds-nhapvien").innerHTML=text;
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
  text += a+1 + ") "+ results[a].ho_va_ten +"/"+ results[a].phan_loai+"<br>";}
  document.getElementById("p-ds-xuatvien").innerHTML=text;
    })
    
  })