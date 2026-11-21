(function(){
"use strict";

/* ===================== DEV LOGO (light/dark) ===================== */
const DEV_LOGO_DARK = "assets/img/dev-logo-dark.png";
const DEV_LOGO_LIGHT = "assets/img/dev-logo-light.png";

/* ===================== DATA ===================== */
const SUBJECTS = [
  {id:"matematika", name:"Matematika", icon:"calculator", mode:"math", color:"edu"},
  {id:"frontend", name:"Frontend", icon:"palette", mode:"category", color:"edu", children:["html","css","js","react"]},
  {id:"html", name:"HTML", icon:"code", mode:"mcq", color:"edu", parent:"frontend"},
  {id:"css", name:"CSS", icon:"palette", mode:"mcq", color:"edu", parent:"frontend"},
  {id:"js", name:"JavaScript", icon:"zap", mode:"mcq", color:"edu", parent:"frontend"},
  {id:"react", name:"React", icon:"atom", mode:"mcq", color:"edu", parent:"frontend"},
  {id:"backend", name:"Backend", icon:"database", mode:"mcq", color:"edu"},
  {id:"flutter", name:"Flutter", icon:"smartphone", mode:"mcq", color:"edu"},
  {id:"kompsavod", name:"Kompyuter savodxonligi", icon:"monitor", mode:"mcq", color:"edu"},
];
const TOP_SUBJECTS = SUBJECTS.filter(s=>!s.parent);
function subjectChildren(catId){ return SUBJECTS.filter(s=>s.parent===catId); }
const DIFFICULTIES = [
  {id:"oson", name:"Oson", time:90, speedTime:70, speedTarget:16, speedLives:3, desc:"Kichik sonlar, +/-"},
  {id:"normal", name:"Normal", time:60, speedTime:50, speedTarget:11, speedLives:3, desc:"Kattaroq, 4 amal"},
  {id:"qiyin", name:"Qiyin", time:45, speedTime:30, speedTarget:6, speedLives:3, desc:"Katta sonlar, tez"},
];

// Built-in fallback / seed question bank (used when db unavailable, and seeded into db otherwise)
const SEED_QUESTIONS = [
["html","oson","<!DOCTYPE nimani bildiradi?",["HTML hujjatining versiyasini","CSS stilini","JavaScript kodini","Faylning nomini"],0],
["html","oson","HTML hujjati qaysi teglardan boshlanadi va tugaydi?",["<head> va </head>","<body> va </body>","<html> va </html>","<meta> va </meta>"],2],
["html","oson","HTMLda elementlarning atributlari nimani bildiradi?",["Elementning nomini","Elementning xossalari va xususiyatlarini","Elementning matnini","Elementning joylashuvini"],1],
["html","oson","HTMLda href atributi qaysi teg bilan ishlatiladi?",["<img>","<a>","<p>","<link>"],1],
["html","oson","HTMLda asosiy sarlavha tegi qaysi?",["<h1>","<h2>","<h3>","<h4>"],0],
["html","oson","HTMLda nechta sarlavha darajasi mavjud?",["3","6","4","5"],1],
["html","oson","HTMLda xatboshi tegi qaysi?",["<p>","<h1>","<div>","<span>"],0],
["html","oson","HTMLda yangi qator yaratish uchun qaysi tegdan foydalaniladi?",["<br>","<hr>","<line>","<p>"],0],
["html","oson","HTMLda inline stil yaratish uchun qaysi atributdan foydalaniladi?",["style","class","id","data"],0],
["css","oson","CSSda matn rangini o'zgartirish uchun qaysi xususiyatdan foydalaniladi?",["color","text-color","font-color","background"],0],
["html","oson","HTMLda matnni qalin qilish uchun qaysi tegdan foydalaniladi?",["<strong>","<em>","<i>","<b>"],0],
["html","oson","HTMLda matnni semantik urg'u bilan (odatda kursiv ko'rinishda) belgilash uchun qaysi teg tavsiya etiladi?",["<em>","<strong>","<i>","<u>"],0],
["html","normal","HTMLda izoh qo'shish uchun qaysi sintaksisdan foydalaniladi?",["<!-- izoh -->","/* izoh */","// izoh","# izoh"],0],
["html","normal","Inline CSS stilini qo'shish uchun to'g'ri sintaksisni ko'rsating:",["<p style=\"color: red;\">Matn</p>","<p class=\"color: red;\">Matn</p>","<p id=\"color: red;\">Matn</p>","<p style=\"color=red\">Matn</p>"],0],
["html","normal","HTMLda havola yaratish uchun qaysi teg ishlatiladi?",["<a>","<link>","<href>","<nav>"],0],
["html","normal","HTMLda havolaning manzilini belgilash uchun qaysi atribut ishlatiladi?",["href","src","link","target"],0],
["html","normal","HTMLda rasm qo'shish uchun qaysi teg ishlatiladi?",["<img>","<picture>","<src>","<image>"],0],
["html","normal","HTMLda rasm manzilini belgilash uchun qaysi atribut ishlatiladi?",["src","href","link","alt"],0],
["html","normal","HTMLda jadval yaratish uchun qaysi teg ishlatiladi?",["<table>","<tab>","<grid>","<div>"],0],
["html","normal","HTMLda jadvalning satrini yaratish uchun qaysi teg ishlatiladi?",["<tr>","<td>","<th>","<thead>"],0],
["html","normal","HTMLda tartibli ro'yxatni yaratish uchun qaysi teg ishlatiladi?",["<ol>","<ul>","<li>","<dl>"],0],
["html","normal","HTMLda tartibsiz ro'yxatni yaratish uchun qaysi teg ishlatiladi?",["<ul>","<ol>","<li>","<dl>"],0],
["css","normal","HTMLda ID selector qanday belgilanadi?",["#",".","!","$"],0],
["html","normal","HTMLda ID atributining qiymati qanday bo'lishi kerak?",["Unikal (sahifada bitta marta)","Takrorlanuvchi","Harf va raqamlardan iborat bo'lishi shart emas","Faqat raqamlardan iborat"],0],
["html","qiyin","HTMLda class selector qanday belgilanadi?",[".","#","!","*"],0],
["html","qiyin","HTMLda bir nechta elementlarga bir xil class qo'llash mumkinmi?",["Ha","Yo'q","Faqat bitta elementga qo'llash mumkin","Faqat <div> elementiga"],0],
["html","qiyin","HTMLda blok elementlar qanday xususiyatga ega?",["Yangi qatorda boshlanadi va butun kenglikni oladi","Yangi qatorda boshlanmaydi va o'z kengligini oladi","Yangi qatorda boshlanadi va faqat matn oladi","Har doim ekran markazida joylashadi"],0],
["html","qiyin","HTMLda inline elementlar qanday xususiyatga ega?",["Yangi qatorda boshlanmaydi va faqat kerakli kenglikni oladi","Yangi qatorda boshlanadi va butun kenglikni oladi","Har doim ekran markazida joylashadi","Har doim yashiringan holatda bo'ladi"],0],
["html","qiyin","HTMLda div tegi nima uchun ishlatiladi?",["Blok element sifatida turli elementlarni guruhlash uchun","Matnni kursiv qilish uchun","Matnni qalin qilish uchun","Sahifani butunlay yangilash uchun"],0],
["html","qiyin","HTMLda span tegi nima uchun ishlatiladi?",["Inline element sifatida turli elementlarni guruhlash uchun","Matnni avtomatik ravishda kursiv shaklga o'tkazadigan teg","Matnni qalin va yorqinroq ko'rinishga keltiradigan teg","Butun sahifaning fon rangini bir martada o'zgartiradigan teg"],0],
["html","qiyin","To'g'ri tuzilgan HTML sahifa qaysi asosiy teglardan iborat bo'ladi?",["<!DOCTYPE html>, <html>, <head> va <body>","Faqat <body> va <div>","<table>, <tr>, <td>","<head> va <footer>"],0],
["html","qiyin","HTML sahifasiga rasm qo'shishda alt atributi nima uchun muhim?",["Rasm yuklanmasa yoki ko'ra olmaydiganlar uchun matnli tavsif beradi","Rasmni ekranga sig'dirish uchun avtomatik kattalashtiradi","Rasmning fayl formatini (jpg, png kabi) brauzerga bildiradi","Rasmni ma'lum burchakka aylantirib ko'rsatadi"],0],
["html","qiyin","Tartiblangan va tartiblanmagan ro'yxatlar mos ravishda qaysi teglar yordamida yaratiladi?",["<ol> va <ul> (ichida <li>)","<table> va <form>","<div> va <span>","<header> va <footer>"],0],
["html","qiyin","To'liq jadval tuzilishi uchun qaysi teglar birgalikda ishlatiladi?",["<table>, <tr>, <th> (sarlavha), <td> (katakcha)","<table>, <div>, <span>","<grid>, <row>, <col>","<list>, <item>, <cell>"],0],
["html","qiyin","Foydalanuvchi ma'lumotlarini kiritish formasi qaysi teglar yordamida to'g'ri tuziladi?",["<form> ichida <label>, <input>, <textarea> kabi teglar joylashtiriladi","Faqat <table> yordamida","Faqat <div> va <span> yordamida","<form> teglarsiz, faqat CSS bilan"],0],
["html","qiyin","HTML5'da video va audio fayllarni qo'shish uchun qanday teglar ishlatiladi?",["<video controls> va <audio controls> teglari, src atributi bilan","<media type=\"video\">...</media>","<img src=\"video.mp4\">","<film> va <sound> teglari"],0],
["css","oson","CSSda comment (izoh) qanday yoziladi?",["/* comment */","// comment","<!-- comment -->","# comment"],0],
["css","oson","Element ichidagi barcha (avlod) elementlarni tanlash uchun qaysi kombinator ishlatiladi?",["+ (bevosita qo'shni birodar)","~ (umumiy birodar elementlar)","bo'sh joy — descendant (avlod) kombinatori","> (bevosita bola elementi)"],2],
["css","oson","Qaysi xossa shriftning qalinligini belgilaydi?",["font-family","font-style","font-weight","font-size"],2],
["css","oson","Qanday qilib ustuvorlikka ega bo'lgan CSS uslubni qo'llash mumkin?",["!override","!important","!force","!priority"],1],
["css","oson","Qaysi xossa shriftning italic (kursiv) yozilishini belgilaydi?",["font-family: italic;","font-style: italic;","font-weight: italic;","text-style: italic;"],1],
["css","oson","Qaysi xossa elementning fon tasvirining hajmini belgilaydi?",["background-size","background-position","background-attachment","background-repeat"],0],
["css","oson","Elementning kengligini belgilash uchun qaysi CSS xossasi ishlatiladi?",["height","width","max-width","margin"],1],
["css","oson","Qaysi display qiymati elementni ko'rinmas (va joy egallamaydigan) qiladi?",["block","inline","none","hidden"],2],
["css","oson","Element ichidagi matnni gorizontal markazlash uchun qaysi xossa ishlatiladi?",["text-align: center;","vertical-align: center;","float: center;","align-content: center;"],0],
["css","oson","text-decoration xossasi nima vazifani bajaradi?",["Matnning rangini belgilaydi","Matn ostiga, ustiga chizish yoki chiziqni olib tashlash","Matnning hajmini belgilaydi","Matn shriftini belgilaydi"],1],
["css","oson","CSSda outline xossasi nima uchun ishlatiladi?",["Elementning ichki bo'sh joyini belgilash uchun","Elementning border atrofidagi tashqi chiziqni belgilash uchun","Matn rangini o'zgartirish uchun","Elementning fon rangini o'zgartirish uchun"],1],
["css","oson","CSSda position xossasi nima uchun ishlatiladi?",["Elementning o'lchamini belgilash uchun","Elementning sahifadagi joylashuvini boshqarish uchun","Elementning rangini o'zgartirish uchun","Elementning shriftini o'zgartirish uchun"],1],
["css","oson","Qaysi position qiymati elementni eng yaqin joylashgan (positioned) ajdodiga nisbatan joylashtiradi?",["absolute","relative","static","fixed"],0],
["css","oson","CSSda position: fixed xossasi nima uchun ishlatiladi?",["Elementni sahifa oqimida qoldiradi","Elementni ekran (viewport)ga nisbatan qat'iy joylashtiradi","Elementni har doim markazda joylashtiradi","Elementni ota elementga nisbatan joylashtiradi"],1],
["css","oson","Elementning fon (orqa foni) rangini belgilash uchun qaysi xossa ishlatiladi?",["background-color","color","border-color","outline-color"],0],
["css","oson","Rasmni konteynerga to'liq moslashtirish uchun qanday CSS kod ishlatiladi?",["width: 100%; height: auto;","height: 100%; width: auto;","width: auto; height: auto;","width: auto; height: 100%;"],0],
["css","oson","Chiziqli (bir yo'nalishli) gradient yaratish uchun qaysi CSS funksiyasi ishlatiladi?",["linear-gradient()","radial-gradient()","gradient()","conic-gradient()"],0],
["css","oson","Quyidagi CSS o'lchov birliklaridan qaysi biri yaroqsiz (mavjud emas)?",["px","em","pg","rem"],2],
["css","oson","% (foiz) o'lchov birligi odatda nimani o'lchaydi?",["Piksel sonini","Ota elementning mos xossasiga nisbatan foizni","Viewportga nisbatan foizni","0 dan 100 gacha bo'lgan ixtiyoriy sonni"],1],
["css","oson","Qaysi o'lchov birligi elementning o'z font-hajmiga nisbatan kattalashadi yoki kichiklashadi?",["px","em","rem","vw"],1],
["css","oson","rem o'lchov birligi nimani anglatadi?",["Elementning o'z font-hajmiga nisbatan","Root (<html>) elementning font-hajmiga nisbatan","Viewportning font-hajmiga nisbatan","Ota elementning kengligiga nisbatan"],1],
["css","oson","Qaysi o'lchov birligi viewport kengligining 1% ga teng?",["vw","vh","vmin","%"],0],
["html","normal","<a> tegidagi target=\"_blank\" atributining vazifasi nima?",["Havolani yangi vkladkada (varaqda) ochib beradi","Turli ekran o'lchamlariga mos uslub belgilaydi","Matn shriftini o'zgartiradi","Havolani o'chirib qo'yadi"],0],
["css","normal","Tashqi (external) CSS qaerga yoziladi?",["Teg ichidagi style atributiga","<head> ichida <style> tegi bilan","Alohida .css fayl ichida, <link> orqali ulanadi","JavaScript fayli ichida"],2],
["html","normal","Qaysi <input> tegining yozilishi to'g'ri?",["<input type=\"text\" name=\"username\">","<input text=\"text\" name=\"username\">","<input type=\"text\" user=\"username\">","<input kind=\"text\" name=\"username\">"],0],
["css","normal","Ichki (internal) CSS qaerga yoziladi?",["Teg ichidagi style atributiga","<head> ichida <style> tegi bilan","Alohida .css fayl ichida","Brauzer sozlamalarida"],1],
["css","normal","text-decoration: overline qiymati matnga qanday ta'sir qiladi?",["Matn ustiga (tepasiga) chiziq tortadi","Matn ostiga chiziq tortadi","Matnni chizib o'tadi (strikethrough)","Matn rangini o'zgartiradi"],0],
["css","normal","filter xossasining qaysi qiymati elementga kulrang (oq-qora) effekt qo'shadi?",["grayscale()","brightness()","blur()","contrast()"],0],
["css","normal","Flex elementlarini gorizontal ravishda, lekin teskari tartibda (o'ngdan chapga) joylashtirish uchun qaysi qiymat ishlatiladi?",["flex-direction: row-reverse","flex-direction: column","flex-direction: column-reverse","flex-direction: row"],0],
["css","normal","<div> elementi uchun display xossasining standart (default) qiymati qanday?",["block","inline","inline-block","none"],0],
["css","normal","CSS transform xossasida elementlarni qiyshaytirish (egish) uchun qaysi funksiya ishlatiladi?",["skew()","rotate()","scale()","translate()"],0],
["css","normal","Flex elementlarini gorizontal o'rniga vertikal (tepadan pastga) joylashtirish uchun qaysi xossa ishlatiladi?",["flex-direction: column","flex-direction: row","justify-content: center","align-items: flex-start"],0],
["css","normal","Flex yoki grid konteynerida 'order' xossasi nima vazifani bajaradi?",["Elementlarning vizual chiqish tartibini HTML tartibidan mustaqil o'zgartiradi","Konteyner ichidagi elementlar sonini avtomatik hisoblab chiqaradi","Elementlarning rangini navbat bilan tartibli ravishda almashtiradi","Elementlarning kengligi va balandligini nisbatan o'zgartiradi"],0],
["css","normal","So'zlar orasidagi masofani (bo'shliqni) sozlash uchun qaysi CSS xossasi ishlatiladi?",["word-spacing","letter-spacing","line-height","text-indent"],0],
["css","normal","Elementni sahifada joy ham egallamaydigan qilib butunlay ko'rinmas holatga keltirish uchun qaysi qiymat ishlatiladi?",["display: none","visibility: hidden","opacity: 0","display: block"],0],
["css","normal","Flex konteyner yaratish uchun qaysi display qiymati ishlatiladi?",["flex","grid","block","table"],0],
["css","normal","Grid layout yaratish uchun qaysi CSS xossasi ishlatiladi?",["display: flex","display: block","display: grid","display: inline-grid"],2],
["css","normal","CSS float xossasi nima qiladi?",["Elementni chapga yoki o'ngga suzdirib, qolgan kontent uni aylanib o'tadi","Elementni faqat o'ngga tekislaydi","Elementni faqat chapga tekislaydi","Elementni markazga joylashtiradi"],0],
["css","normal","Inline qutisining vertikal joylashuvini boshqarish uchun qaysi xossa ishlatiladi?",["text-align","vertical-align","float","line-height"],1],
["css","normal","Matn ostiga chiziq tortish uchun qaysi CSS xossasi ishlatiladi?",["text-decoration","text-align","text-transform","border-bottom"],0],
["css","normal","'overflow' xossasi nima vazifani bajaradi?",["Elementlar orasidagi bo'shliqni belgilaydi","Elementning hajmiga sig'maydigan qismini boshqaradi","Matnning tekislanishini belgilaydi","Elementning burchaklarini yumaloqlaydi"],1],
["html","normal","Qaysi <img> tegining yozilishi to'g'ri (yaxshi amaliyot)?",["<img src=\"image.jpg\" alt=\"Description\">","<img src=\"image.jpg\">","<img alt=\"Description\">","<img source=\"image.jpg\" alt=\"Description\">"],0],
["html","normal","Qaysi <a> tegining yozilishi to'g'ri?",["<a href=\"https://www.example.com\">Example</a>","<a link=\"https://www.example.com\">Example</a>","<a url=\"https://www.example.com\">Example</a>","<a src=\"https://www.example.com\">Example</a>"],0],
["css","normal","Pseudo-klasslardan qaysi biri faqat havola ustiga sichqoncha olib borilganda qo'llaniladi?",[":hover",":active",":link",":focus"],0],
["css","qiyin","Qaysi xossa shriftning qalinligini boshqaradi?",["font-size","font-weight","font-style","letter-spacing"],1],
["css","qiyin","Zamonaviy CSS'da grid qatorlar va ustunlari orasidagi bo'shliqni belgilash uchun tavsiya etilgan xossa qaysi?",["gap","grid-template","grid-area","grid-gap (eskirgan usul)"],0],
["css","qiyin","Qaysi xossa flex elementning asosiy o'qi bo'ylab tekislanishini belgilaydi?",["align-items","justify-content","flex-direction","gap"],1],
["css","qiyin","Qaysi xossa flex elementlarining yo'nalishini belgilaydi?",["flex-direction","align-content","justify-items","flex-wrap"],0],
["css","qiyin","Qaysi xossa animatsiya davomiyligini belgilaydi?",["animation-name","animation-duration","animation-timing-function","animation-delay"],1],
["css","qiyin","Qaysi xossa viewport balandligining 1% ini anglatadi?",["vh","vw","vmin","rem"],0],
["css","qiyin","Elementni sahifada joy egallagan holda, lekin butunlay shaffof (ko'rinmas) qilib ko'rsatish uchun qaysi xossa ishlatiladi?",["visibility","opacity","display","z-index"],1],
["css","qiyin","CSS-da qaysi xossa orqali gradient ranglar (fon sifatida) yaratish mumkin?",["background-color","color","background-image","border-image"],2],
["css","qiyin","Qaysi xossa matnning yuqori qismida chiziq qo'shadi (overline)?",["text-decoration","text-transform","text-align","text-indent"],0],
["css","qiyin","Qaysi xossa shrift turini (fontini) belgilaydi?",["font-family","font-style","font-weight","font-variant"],0],
["css","qiyin","Qaysi xossa matnni katta yoki kichik harflarda ko'rsatadi?",["text-decoration","text-transform","text-align","white-space"],1],
["css","qiyin","Qaysi xossa orqali shrift hajmi belgilanadi?",["font-family","font-size","font-style","line-height"],1],
["css","qiyin","CSS'da 'z-index' xossasi nimani belgilaydi?",["Elementning rangini","Elementning vertikal joylashuvini","Elementlarning ustma-ust (qavat) tartibini","Elementning shaffofligini"],2],
["css","qiyin","Qaysi xossa elementning ramkasi (border) kengligini belgilaydi?",["border-width","border-style","border-color","border-radius"],0],
["css","qiyin","Qaysi xossa elementning ramkasi (border) rangini belgilaydi?",["border-width","border-style","border-color","border-radius"],2],
["css","qiyin","Qaysi xossa elementning ichki bo'shligini (kontent bilan chegara orasini) belgilaydi?",["margin","padding","border","outline"],1],
["css","qiyin","Qaysi xossa elementning tashqi bo'shligini (boshqa elementlar bilan orasini) belgilaydi?",["margin","padding","border","padding"],0],
["css","qiyin","Qaysi xossa elementning shaffofligini belgilaydi?",["opacity","visibility","display","filter"],0],
["css","qiyin","Qaysi xossa elementning o'lchamlarini foizlar bilan belgilash imkonini beradi?",["px","%","em","vh"],1],
["css","qiyin","Qaysi xossa elementning fon tasvirini belgilaydi?",["background-color","background-image","background-repeat","background-position"],1],
["css","qiyin","Qaysi xossa yordamida elementning fon tasviri takrorlanishining oldini olish mumkin?",["background-color","background-image","background-repeat","background-attachment"],2],
["js","oson","JavaScript qayerda ishga tushiriladi?",["Faqat brauzerda","Brauzer va serverda (masalan, Node.js)","Faqat serverda","Faqat mobil qurilmada"],1],
["js","oson","console.log() funksiyasi nima uchun ishlatiladi?",["Konsolga ma'lumot chiqarish uchun","Sahifani ranglash uchun","Faylni saqlash uchun","Serverga so'rov yuborish uchun"],0],
["js","oson","JavaScript'da o'zgaruvchi e'lon qilish uchun qaysi kalit so'zlar ishlatiladi?",["let, const, var","int, string, bool","def, function","class, object"],0],
["js","oson","Qaysi ma'lumot turi JavaScript'da mavjud emas?",["string","number","char","boolean"],2],
["js","oson","typeof operatori nima uchun ishlatiladi?",["O'zgaruvchining ma'lumot turini aniqlash uchun","O'zgaruvchini o'chirish uchun","Massivni saralash uchun","Funksiyani chaqirish uchun"],0],
["js","oson","let va var o'rtasidagi asosiy farq nima?",["let blok doirasiga (block scope) ega, var funksiya doirasiga ega","Farqi yo'q","var doimiy qiymat saqlaydi","let faqat massivlar uchun ishlatiladi"],0],
["js","oson","const bilan e'lon qilingan o'zgaruvchi haqida qaysi fikr to'g'ri?",["Qiymati qayta belgilanmaydi (reassign qilib bo'lmaydi)","Har doim o'zgarmas obyekt bo'ladi","Faqat raqamlar uchun ishlatiladi","var bilan bir xil ishlaydi"],0],
["js","oson","Qo'shish (+) operatori ikkita string ustida qo'llansa nima qiladi?",["Ularni birlashtiradi (concatenation)","Kompilyatsiya vaqtida xatolik yuzaga keltiradi","Ularning belgilarini bir-biridan ayiradi","Har doim NaN qiymatini qaytaradi"],0],
["js","oson","=== va == operatorlari o'rtasidagi farq nima?",["=== tur va qiymatni, == faqat qiymatni solishtiradi","Farqi yo'q","== har doim aniqroq natija beradi","=== faqat massivlar uchun ishlatiladi"],0],
["js","oson","Bitta stringga o'zgaruvchi qiymatini qo'shib yozish (interpolatsiya) uchun zamonaviy JS'da nima ishlatiladi?",["Template literals (``)","Faqat String.concat()","Faqat + operatori","Bunday imkoniyat yo'q"],0],
["js","oson",".length xossasi string uchun nimani qaytaradi?",["Stringdagi belgilar sonini","Stringning tilini","Stringning turini","Birinchi belgini"],0],
["js","oson","Mantiqiy && operatori qanday ishlaydi?",["Ikkala shart ham rost bo'lsagina true qaytaradi","Kamida bitta shart rost bo'lsa true qaytaradi","Har doim true qaytaradi","Faqat raqamlar uchun ishlaydi"],0],
["js","oson","Mantiqiy || operatori qanday ishlaydi?",["Kamida bitta shart rost bo'lsa true qaytaradi","Ikkala shart ham rost bo'lishi shart","Har doim false qaytaradi","Faqat satrlar uchun ishlaydi"],0],
["js","oson","! (NOT) operatori nima qiladi?",["Mantiqiy qiymatni teskarisiga o'zgartiradi","Sonni manfiylashtiradi","Massivni bo'shatadi","Stringni qaytaradi"],0],
["js","oson","Number(\"5\") ifodasining natijasi nima bo'ladi?",["5 (raqam turida)","\"5\" (string)","NaN","undefined"],0],
["js","oson","String(123) ifodasining natijasi nima bo'ladi?",["\"123\" (string turida)","123 (raqam)","true","Xatolik"],0],
["js","oson","Boolean(0) ifodasining natijasi nima bo'ladi?",["false","true","0","undefined"],0],
["js","oson","NaN nimani anglatadi?",["\"Not a Number\" — raqam bo'lmagan natijani","Nolga teng yoki undan katta bo'lgan ixtiyoriy sonni","Ichida hech qanday belgisi yo'q bo'sh matn qatorini","Chegarasiz, cheksiz katta sonni bildiruvchi qiymatni"],0],
["js","oson","JavaScript'da bir qatorlik izoh (comment) qanday yoziladi?",["// izoh","<!-- izoh -->","# izoh","::izoh"],0],
["js","oson","undefined qiymati nimani bildiradi?",["O'zgaruvchiga hali qiymat berilmaganini","O'zgaruvchiga son sifatida nol berilganini","Ichida birorta ham element bo'lmagan bo'sh massivni","Dastur ishlashi davomida yuz bergan xatolikni"],0],
["js","oson","null qiymati odatda nimani anglatadi?",["Ataylab \"bo'sh/yo'q qiymat\" ekanini bildirish uchun ishlatiladi","Kod ijro etilishida yuz bergan jiddiy xatolikni bildiradi","Sonlarning chegarasiz, cheksiz katta ekanini bildiradi","Har doim raqamli 0 qiymatiga aylantirilib hisoblanadi"],0],
["js","oson","Amallar ustuvorligida (operator precedence) 2 + 3 * 4 ifodasi qanday hisoblanadi?",["3*4=12, keyin 2+12=14","2+3=5, keyin 5*4=20","Chapdan o'ngga ketma-ket","Natija aniqlanmaydi"],0],
["js","oson","`%` (modulo) operatori nimani hisoblaydi?",["Bo'lishdan qolgan qoldiqni","Ikki sonni bir-biriga to'liq bo'lgandagi natijani","Sonning umumiy miqdordagi ulushini foiz sifatida","Sonni o'ziga ko'paytirib, kvadratini hisoblaydi"],0],
["js","oson","JavaScript qanday til hisoblanadi?",["Dinamik tiplashtiriladigan (dynamically typed) skript tili","Statik tiplashtiriladigan kompilyatsiya tili","Faqat markup tili","Ma'lumotlar bazasi tili"],0],
["js","normal","Funksiya e'lon qilishning klassik (function declaration) sintaksisi qaysi?",["function nomi(){ }","nomi => { }","let nomi = { }","def nomi():"],0],
["js","normal","Arrow function qanday yoziladi?",["(params) => { }","function => (params)","=> function(params)","arrow(params){ }"],0],
["js","normal","Function expression va function declaration o'rtasidagi farq nima?",["Declaration hoisting qilinadi (oldindan chaqirish mumkin), expression — yo'q","Farqi yo'q","Expression tezroq ishlaydi","Declaration faqat arrow function uchun mumkin"],0],
["js","normal","Massiv (array) elementlariga qanday murojaat qilinadi?",["Indeks (0 dan boshlanadi) orqali, masalan arr[0]","Nomi orqali","Faqat .get() metodi bilan","Massivga murojaat qilib bo'lmaydi"],0],
["js","normal",".push() metodi nima qiladi?",["Massiv oxiriga yangi element qo'shadi","Massivning birinchi elementini o'chiradi","Massivni saralaydi","Massivni bo'shatadi"],0],
["js","normal",".map() metodi nima qiladi?",["Har bir elementni o'zgartirib, yangi massiv qaytaradi","Massivni o'chiradi","Faqat bitta elementni qaytaradi","Massivni stringga aylantiradi"],0],
["js","normal",".filter() metodi nima qiladi?",["Shartga mos elementlardan iborat yangi massiv qaytaradi","Massivni saralaydi","Massiv uzunligini qaytaradi","Elementlarni birlashtiradi"],0],
["js","normal","Obyekt (object) qanday yaratiladi?",["{ key: value } shaklida","[ key: value ] shaklida","( key: value ) shaklida","< key: value > shaklida"],0],
["js","normal","Obyekt xossasiga (property) qanday murojaat qilish mumkin?",["obj.key yoki obj[\"key\"] shaklida","Faqat obj->key shaklida","Faqat obj(key) shaklida","Murojaat qilib bo'lmaydi"],0],
["js","normal","Object.keys() metodi nimani qaytaradi?",["Obyektning barcha kalitlari (key) massivini","Obyektning qiymatlari yig'indisini","Obyektni o'chiradi","Obyektni JSON'ga aylantiradi"],0],
["js","normal","if/else konstruksiyasi nima uchun ishlatiladi?",["Shartga qarab turli kod bloklarini bajarish uchun","Sikl yaratish uchun","Funksiya chaqirish uchun","Massiv yaratish uchun"],0],
["js","normal","switch operatori qachon qulay?",["Bitta qiymatni bir nechta variant bilan solishtirishda","Faqat mantiqiy qiymatlar bilan ishlaganda","Massiv elementlarini o'chirishda","Obyekt yaratishda"],0],
["js","normal","switch blokida break operatori nima uchun kerak?",["Mos case topilgach, qolgan case'larni bajarmay chiqish uchun","Butun siklni to'xtatish uchun","Xatoni ushlash uchun","Kerak emas, ixtiyoriy dekorativ element"],0],
["js","normal","for sikli necha qismdan iborat?",["Boshlang'ich qiymat, shart, qadam (3 qism)","Faqat takrorlanish shartidan iborat, boshqa qism yo'q","Faqat har safar bajariladigan qadam qismidan iborat","Ikki qismdan — boshlang'ich qiymat va shartdan iborat"],0],
["js","normal","while sikli qachon ishlaydi?",["Shart rost (true) bo'lguncha","Faqat bir marta","Hech qachon","Shart false bo'lguncha"],0],
["js","normal","for va while sikllari o'rtasidagi farq nima?",["for odatda takrorlar soni ma'lum bo'lganda, while shart asosida ishlatiladi","Ular bir xil ishlaydi","while faqat massivlar uchun ishlatiladi","for faqat obyektlar uchun ishlatiladi"],0],
["js","normal","DOM (Document Object Model) nima?",["Sahifaning dastur (JS) orqali boshqariladigan daraxtsimon tuzilishi","Veb-sahifalarni yozish uchun mo'ljallangan alohida dasturlash tili","So'rovlarga javob qaytaradigan maxsus server dasturi turi","Elementlarning rangi va shriftini belgilaydigan CSS xossasi"],0],
["js","normal","document.querySelector() nima qiladi?",["CSS selektorga mos birinchi elementni tanlaydi","Barcha elementlarni o'chiradi","Yangi element yaratadi","Sahifani qayta yuklaydi"],0],
["js","normal","document.getElementById() nima qiladi?",["Berilgan id bo'yicha elementni tanlaydi","Barcha elementlarni sanaydi","CSS klass qo'shadi","Elementni o'chiradi"],0],
["js","normal","element.textContent xossasi nima uchun ishlatiladi?",["Elementning matnli mazmunini o'qish yoki o'zgartirish uchun","Elementning rangini o'zgartirish uchun","Elementni yashirish uchun","Elementni o'chirish uchun"],0],
["js","normal","document.createElement() nima qiladi?",["Yangi HTML element yaratadi (hali sahifaga qo'shilmagan)","Mavjud elementni o'chiradi","Elementni nusxalaydi","Sahifani qayta yuklaydi"],0],
["js","normal","Element.remove() metodi nima uchun ishlatiladi?",["Elementni DOM'dan o'chirish uchun","Elementni yashirish uchun","Elementni nusxalash uchun","Elementni markazlash uchun"],0],
["js","normal","addEventListener() metodi nima uchun ishlatiladi?",["Elementga hodisa (event) ishlovchisini bog'lash uchun","Elementni o'chirish uchun","CSS qo'shish uchun","Massiv yaratish uchun"],0],
["js","normal","\"click\" hodisasi qachon ishga tushadi?",["Element sichqoncha bilan bosilganda","Sahifa yuklanganda","Klaviatura tugmasi bosilganda","Sahifa yopilganda"],0],
["js","qiyin","Destructuring nima uchun ishlatiladi?",["Massiv yoki obyektdan qiymatlarni qulay ajratib olish uchun","Massivlarni birlashtirish uchun","Obyektni o'chirish uchun","O'zgaruvchi turini o'zgartirish uchun"],0],
["js","qiyin","Spread operatori (...) nima qiladi?",["Massiv yoki obyekt elementlarini \"yoyib\" ko'rsatadi (nusxalash yoki birlashtirishda)","Massivdagi barcha elementlarni tekshirib, keraksizlarini o'chiradi","Faqat matn (string) qiymatlar ustida ishlaydi, boshqalarda emas","Joriy funksiyaning ishlashini darhol to'xtatib qo'yadi"],0],
["js","qiyin","Rest operatori (...) funksiya parametrlarida nima qiladi?",["Qolgan barcha argumentlarni massiv sifatida yig'adi","Birinchi argumentni o'chiradi","Faqat bitta argumentni oladi","Funksiyani asinxron qiladi"],0],
["js","qiyin","Short-circuit evaluation nima?",["&& va || operatorlarining natija aniq bo'lishi bilan qolgan qismni baholamasdan to'xtashi","Kompilyator kodni oldindan optimallashtirib, tezroq ishlatadigan usul","Kod ichidagi xatolarni avtomatik aniqlab, o'zi tuzatadigan mexanizm","For va while sikllarini birlashtirib ishlatish usuli"],0],
["js","qiyin","Nullish coalescing operatori (??) qachon o'ng tomondagi qiymatni qaytaradi?",["Chap tomon null yoki undefined bo'lganda","Chap tomon false yoki 0 bo'lganda ham","Har doim","Hech qachon"],0],
["js","qiyin","Optional chaining (?.) nima uchun ishlatiladi?",["Obyekt ichki xossasiga xavfsiz murojaat qilish uchun (mavjud bo'lmasa xatolik bermaydi)","Massiv elementlarini o'sish yoki kamayish tartibida saralash uchun","Oddiy funksiyani asinxron (Promise qaytaruvchi) funksiyaga aylantirish uchun","Uzun matn qatorini bir nechta kichik qismlarga ajratish uchun"],0],
["js","qiyin","Map obyekti Object'dan nimasi bilan farqlanadi?",["Map kalit sifatida istalgan turdagi qiymatni qabul qiladi va qo'shish tartibini saqlaydi","Ular aslida bir xil ishlaydi, hech qanday amaliy farqi yo'q","Map faqat butun sonlardan iborat kalitlarnigina saqlay oladi","Object o'zida hech qanday metod yoki funksiyani saqlay olmaydi"],0],
["js","qiyin","Set obyekti nima uchun ishlatiladi?",["Faqat noyob (takrorlanmaydigan) qiymatlarni saqlash uchun","Kalit-qiymat juftlarini saqlash uchun","Tartiblangan raqamlarni saqlash uchun","Faqat stringlarni saqlash uchun"],0],
["js","qiyin","JavaScript Engine (masalan V8) qanday vazifani bajaradi?",["JS kodini brauzer yoki Node.js tushunadigan mashina koduga aylantirib ishga tushiradi","Sahifadagi CSS uslublarini o'qib, ularni ekranga qo'llaydi","HTML kodini o'qib, sahifa tuzilishini ekranga chizadi","Kompyuter xotirasida fayllarni tartiblab saqlab turadi"],0],
["js","qiyin","Event Loop qanday vazifani bajaradi?",["Call stack va callback navbati (queue) orasida vazifalarni boshqarib, asinxron kodni ishga tushiradi","Kod ichida for yoki while kabi takrorlanuvchi sikllarni avtomatik yaratadi","Elementlarga bog'langan hodisa ishlovchilarini butunlay o'chirib tashlaydi","Sahifada yangi HTML elementlarini yaratib, DOM daraxtiga qo'shadi"],0],
["js","qiyin","Hoisting nima?",["O'zgaruvchi va funksiya e'lonlarining ijro vaqtida xotira boshiga \"ko'tarilishi\"","Dasturning ishlash tezligini ataylab pasaytirib qo'yadigan texnika","Yuzaga kelgan xatolarni foydalanuvchidan yashirib qo'yish usuli","Massiv elementlarini kattadan kichikka tartiblab chiqish jarayoni"],0],
["js","qiyin","TDZ (Temporal Dead Zone) nimani anglatadi?",["let/const bilan e'lon qilingan o'zgaruvchining e'londan oldin ishlatib bo'lmaydigan hududini","Dastur kodi ichida hech qachon bajarilmaydigan o'lik qismni","O'zgaruvchi joylashgan funksiya doirasidan tashqaridagi hududni","Brauzer konsolida chiqadigan xato xabarlarining bir turini"],0],
["js","qiyin","Value (primitive) va reference (object) turlari o'rtasidagi asosiy farq nima?",["Primitive qiymat nusxalanadi, object esa xotiradagi manzilga (reference) ishora qiladi","Ular o'rtasida hech qanday amaliy farq mavjud emas","Object turlari primitivlarga qaraganda har doim tezroq ishlaydi","Primitive turlar faqat raqamli qiymatlardangina iborat bo'ladi"],0],
["js","qiyin","\"this\" kalit so'zi odatiy funksiyada nimani bildiradi?",["Funksiya qanday chaqirilishiga bog'liq holda kontekst obyektini","Har doim brauzerning global window obyektini bildiradi","Har doim aniqlanmagan (undefined) qiymatni anglatadi","Funksiyaning o'z nomi va tanasini o'zini bildiradi"],0],
["js","qiyin","Higher Order Function (HOF) nima?",["Boshqa funksiyani argument sifatida oladigan yoki funksiya qaytaradigan funksiya","Faqat matematik hisob-kitoblar uchun mo'ljallangan maxsus funksiya","Obyekt ichida e'lon qilingan, unga tegishli oddiy metod","Yangi obyekt yaratganda avtomatik chaqiriladigan sinf konstruktori"],0],
["js","qiyin","call() va apply() metodlari o'rtasidagi farq nima?",["call argumentlarni birma-bir, apply massiv sifatida qabul qiladi","Farqi yo'q","apply faqat arrow function uchun ishlaydi","call \"this\" qiymatini o'zgartira olmaydi"],0],
["js","qiyin","bind() metodi nima qiladi?",["Funksiyaning \"this\" qiymatini doimiy belgilab, yangi funksiya qaytaradi (darhol chaqirmaydi)","Funksiyani hech qanday shart-sharoitsiz darhol ishga tushiradi","Xotiradan berilgan funksiyani butunlay o'chirib tashlaydi","Ikkita alohida massivni bitta massiv sifatida bog'lab qo'yadi"],0],
["js","qiyin","Event propagation (hodisa tarqalishi)da \"bubbling\" nimani anglatadi?",["Hodisaning ichki elementdan tashqi elementlarga tomon tarqalishini","Hodisaning tashqaridan ichkariga tarqalishini","Hodisaning umuman tarqalmasligini","Faqat click hodisasiga tegishli tushunchani"],0],
["js","qiyin","DOM daraxtini aylanib chiqishda parentNode, children kabi xossalar nima uchun ishlatiladi?",["Elementlar orasidagi ota-bola munosabatlarini aniqlash uchun","Elementga yangi CSS uslublarini kod orqali qo'shish uchun","Kerak bo'lmagan elementni sahifadan butunlay o'chirish uchun","Elementning fon yoki matn rangini dinamik o'zgartirish uchun"],0],
["js","qiyin","Prototip (prototype) JavaScript'da nima uchun kerak?",["Obyektlar orasida xossa va metodlarni meros qilib olish (inheritance) uchun","Obyektni matnli JSON formatiga aylantirib saqlash uchun","Ishlatilmay qolgan xotira joylarini avtomatik tozalash uchun","Massiv elementlarini o'sish tartibida saralab chiqish uchun"],0],
["js","qiyin","ES6 class sintaksisi nimani anglatadi?",["Prototip asosidagi meros olishning qulayroq, o'qilishi oson yozilishini","Yangi dasturlash tilini","Faqat React uchun maxsus sintaksisni","Obyektlarni butunlay bekor qilishni"],0],
["js","qiyin","Inheritance (meros olish) nima uchun ishlatiladi?",["Bir klass boshqasining xossa va metodlarini qayta ishlatishi uchun","Klassni o'chirish uchun","Xotirani tozalash uchun","Massivlarni birlashtirish uchun"],0],
["js","qiyin","Promise nima?",["Kelajakda bajariladigan (yoki xato beradigan) asinxron amal natijasini ifodalovchi obyekt","Darhol va ketma-ket, kutishsiz ishlaydigan oddiy sinxron funksiya","Elementga harakat effekti qo'shadigan CSS animatsiyasining bir turi","Sahifada ko'rinadigan oddiy HTML DOM elementining nomi"],0],
["js","qiyin","async/await nima uchun ishlatiladi?",["Promise'lar bilan ishlashni sinxron kodga o'xshab, o'qilishi qulayroq yozish uchun","Dasturning ishlash tezligini ataylab pasaytirib qo'yish uchun","Faqat qo'shish, ayirish kabi matematik amallarni bajarish uchun","Sahifaga yangi HTML DOM elementlarini yaratib qo'shish uchun"],0],
["react","oson","React nima?",["UI (foydalanuvchi interfeysi) qurish uchun JavaScript kutubxonasi","O'z sintaksisi va qoidalariga ega mustaqil dasturlash tili","Ma'lumotlarni tartibli saqlaydigan alohida ma'lumotlar bazasi","Kompyuter apparatini boshqaradigan operatsion tizim turi"],0],
["react","oson","React'da UI qanday qismlardan quriladi?",["Komponentlardan (component)","Alohida HTML sahifalarining o'zidan","Tashqi kutubxona modullarining to'plamidan","Loyihadagi oddiy matn fayllaridan"],0],
["react","oson","JSX nima?",["JavaScript ichida HTML'ga o'xshash sintaksis yozish imkonini beruvchi kengaytma","Faqat stil yozish uchun mo'ljallangan CSS kengaytmasi","JSON kabi ma'lumotlarni saqlash uchun ishlatiladigan format","Komponentlarni sinovdan o'tkazish uchun ishlatiladigan test kutubxonasi"],0],
["react","oson","TSX JSX'dan nimasi bilan farq qiladi?",["TypeScript bilan birga ishlatiladi (tur tekshiruvi bilan)","Farqi yo'q","Faqat CSS uchun ishlatiladi","Faqat class komponentlar uchun"],0],
["react","oson","React loyihasini yaratishning zamonaviy usullaridan biri qaysi?",["Vite yoki Create React App kabi vositalar","Faqat qo'lda HTML yozish","Faqat Photoshop","Faqat Figma"],0],
["react","oson","Class komponent qanday e'lon qilinadi?",["React.Component'dan meros oluvchi klass sifatida","Oddiy funksiya sifatida","Obyekt literal sifatida","Massiv sifatida"],0],
["react","oson","Funksional komponent nima?",["Oddiy JavaScript funksiyasi ko'rinishida yozilgan React komponenti","Faqat class ko'rinishida bo'ladigan komponent","CSS fayli","HTML fayli"],0],
["react","oson","Zamonaviy React'da qaysi komponent turi ko'proq tavsiya etiladi?",["Funksional komponentlar (hooks bilan)","Class komponentlar","Farqi yo'q, ikkalasi teng tavsiya etiladi","Hech biri tavsiya etilmaydi"],0],
["react","oson","Komponent hayot davri (lifecycle) nimani anglatadi?",["Komponentning yaratilishi, yangilanishi va o'chirilishi bosqichlarini","Loyiha faylining qachon yaratilgani haqidagi sanani","Komponentga CSS orqali berilgan rang qiymatini","Komponentning ekranda egallagan hajmi va o'lchamini"],0],
["react","oson","Komponent holati (state) nima uchun ishlatiladi?",["Vaqt o'tishi bilan o'zgarishi mumkin bo'lgan ma'lumotlarni saqlash va UI'ni shu asosda yangilash uchun","Hech qachon o'zgarmaydigan, doimiy va qat'iy qiymatlarni saqlash uchun","Komponentga faqat rang va shakl kabi tashqi ko'rinishni berish uchun","Sahifalar orasida almashish (navigatsiya) jarayonini boshqarish uchun"],0],
["react","oson","useState hook nima qiladi?",["Funksional komponentga holat (state) qo'shish imkonini beradi","Komponentni o'chiradi","CSS qo'shadi","Faqat class komponentlarda ishlaydi"],0],
["react","oson","React'da hodisalarni (masalan onClick) qanday ulaymiz?",["JSX ichida atribut sifatida: onClick={handler}","addEventListener orqali har doim qo'lda","Faqat CSS orqali","Hodisalarni ulab bo'lmaydi"],0],
["react","oson","Props nima?",["Komponentga tashqaridan uzatiladigan (faqat o'qish uchun) ma'lumotlar","Komponentning ichki o'zgaruvchan holati","CSS xossasi","Marshrut nomi"],0],
["react","oson","Props va state o'rtasidagi asosiy farq nima?",["Props tashqaridan keladi va o'zgarmas, state komponent ichida boshqariladi va o'zgaruvchan","Ular aslida bir xil vazifani bajaradi, oradagi farq shartli","State tashqi komponentdan uzatilib, ichkarida o'zgartirilmaydi","Props har doim komponent ichida erkin o'zgartirilishi mumkin"],0],
["react","oson","React komponentini eksport qilish uchun odatda nima ishlatiladi?",["export default","import","require","include"],0],
["react","oson","Bitta React komponenti nimani qaytarishi kerak?",["Bitta ildiz elementni (yoki fragment ichida bir nechta elementni)","Faqat matnni","Hech narsa qaytarmasligi kerak","Faqat massivni"],0],
["react","oson","React Fragment (<>...</>) nima uchun ishlatiladi?",["Qo'shimcha DOM elementi yaratmasdan bir nechta elementni birlashtirish uchun","Komponentga CSS orqali maxsus stil va ko'rinish berish uchun","Serverga API so'rovi orqali ma'lumot yuborish uchun","Ilova ichida yangi sahifa marshrutini belgilash uchun"],0],
["react","oson","key atributi ro'yxat (list) render qilishda nima uchun kerak?",["React'ga har bir elementni noyob aniqlash va samarali yangilash uchun yordam beradi","Elementga fon yoki matn rangini belgilash uchun ishlatiladi","Ro'yxatdagi elementni ekrandan butunlay o'chirib tashlaydi","Hech qanday amaliy vazifasi bo'lmagan, faqat bezak uchun atribut"],0],
["react","oson","Shartli ko'rsatish (conditional rendering) uchun JSX'da odatda nima ishlatiladi?",["Oddiy JS shart operatorlari (masalan && yoki ternary ?:)","React'ning o'ziga xos maxsus <if> nomli tegi","Faqat ekran o'lchamiga qarab ishlaydigan CSS media query","JSX'da bunday narsani amalga oshirib bo'lmaydi"],0],
["react","oson","Controlled component (boshqariladigan komponent) nima?",["Qiymati React state orqali boshqariladigan forma elementi","Hech qanday state'i bo'lmagan komponent","Faqat class komponent","Server tomonidan boshqariladigan komponent"],0],
["react","normal","Component Composition nimani anglatadi?",["Kichik komponentlarni birlashtirib kattaroq komponent yaratishni","Komponentni o'chirishni","CSS uslublarini birlashtirishni","Fayllarni siqishni"],0],
["react","normal","Context API nima uchun ishlatiladi?",["Ma'lumotni komponentlar daraxti bo'ylab props orqali qo'lda uzatmasdan ulashish uchun","Komponentlarga faqat rang va shrift kabi stil berish uchun","Ilova sahifalari orasida almashish (marshrutlash) uchun","Komponentlarni avtomatik tarzda sinovdan o'tkazish uchun"],0],
["react","normal","Error Boundary (xato bilan ishlash komponenti) nima qiladi?",["Bola komponentlaridagi JavaScript xatolarini ushlab, ilovaning butunlay qulashini oldini oladi","Kelajakda yuz berishi mumkin bo'lgan barcha xatolarni oldindan bartaraf etadi","Faqat noto'g'ri yozilgan CSS uslublarini avtomatik tuzatadi","Loyihaga yozilgan barcha avtomatik testlarni ishga tushiradi"],0],
["react","normal","React Router nima uchun ishlatiladi?",["SPA (Single Page Application)da sahifalar orasida marshrutlash (navigatsiya) uchun","Ma'lumotlar bazasi bilan ishlash uchun","Stil yozish uchun","API so'rovlari uchun"],0],
["react","normal","Route parametri (masalan /user/:id) nima uchun ishlatiladi?",["URL orqali dinamik qiymat (masalan ID) uzatish uchun","Sahifa nomini o'zgartirish uchun","CSS klassini belgilash uchun","Marshrutni o'chirish uchun"],0],
["react","normal","Query parametr (masalan ?page=2) nima uchun ishlatiladi?",["URL'ga qo'shimcha, ixtiyoriy ma'lumot (masalan filtr, sahifa raqami) qo'shish uchun","Sahifaning fon va matn rangini o'zgartirib turish uchun","Kerak bo'lmagan komponentni ilovadan butunlay o'chirish uchun","Foydalanuvchini ma'lum marshrutlarga kirishdan bloklash uchun"],0],
["react","normal","Nested routes (ichma-ich marshrutlar) nima?",["Bitta marshrut ichida boshqa marshrutlarni joylashtirish (masalan bo'lim ichidagi kichik sahifalar)","Bir-biriga bog'liq bo'lmagan ikkita mustaqil alohida ilova","Bitta CSS fayli ichiga yana boshqa CSS yozish usuli","Faqat ilovaning asosiy sahifasidagina ishlaydigan maxsus usul"],0],
["react","normal","Route Guard (marshrut qo'riqchisi) nima uchun ishlatiladi?",["Foydalanuvchi ruxsatiga qarab ma'lum sahifalarga kirishni cheklash uchun","Sahifaning yuklanish tezligini sun'iy ravishda oshirish uchun","Serverdan rasmlarni yuklab, ularni ekranga chiqarish uchun","Komponentga tashqi CSS fayllarini ulab qo'llash uchun"],0],
["react","normal","Programmatik navigatsiya nima?",["Kod orqali (masalan tugma bosilganda) foydalanuvchini boshqa sahifaga yo'naltirish","Foydalanuvchi faqat havola bosib o'tishi","Marshrutlarni butunlay o'chirish","Sahifani qayta yuklash"],0],
["react","normal","Redux nima uchun ishlatiladi?",["Ilovaning global holatini (state) markazlashtirilgan tarzda boshqarish uchun","Komponentlarga faqat CSS orqali tashqi ko'rinish berish uchun","Yuklangan rasm fayllarining hajmini kichraytirish uchun","Sahifalar orasida almashish uchun marshrut yaratish maqsadida"],0],
["react","normal","Redux'da \"store\" nima?",["Ilovaning butun holatini saqlaydigan yagona markaziy obyekt","Ma'lumotlar bazasidagi qatorlar va ustunlardan iborat jadval","Stil qoidalarini o'zida jamlagan alohida CSS fayli","Ekranga chiqadigan oddiy React komponentining bir turi"],0],
["react","normal","Action (Redux) nima?",["Holatda nima o'zgarishi kerakligini tasvirlovchi oddiy obyekt","Elementning tashqi ko'rinishini belgilaydigan CSS qoidasi","Sahifada ko'rinadigan oddiy HTML elementining o'zi","Kodni avtomatik sinovdan o'tkazadigan alohida test fayli"],0],
["react","normal","Action Creator nima?",["Action obyektini yaratib qaytaruvchi funksiya","Reducer'ni o'chiruvchi funksiya","Komponentni render qiluvchi funksiya","CSS generatori"],0],
["react","normal","Reducer funksiyasi nima qiladi?",["Joriy holat va action asosida yangi holatni qaytaradi","Serverga so'rov yuboradi","Komponentni o'chiradi","CSS uslubini o'zgartiradi"],0],
["react","normal","Funksional komponentda Redux state'iga qanday murojaat qilinadi?",["useSelector hook orqali","this.state orqali","props.state orqali doim","Murojaat qilib bo'lmaydi"],0],
["react","normal","Redux Thunk nima uchun ishlatiladi?",["Redux'da asinxron amallarni (masalan API so'rovlarini) boshqarish uchun","Faqat kutishsiz, darhol bajariladigan sinxron amallar uchun","Elementlarga harakat effekti beruvchi CSS animatsiyasi yaratish uchun","Yangi funksional yoki class React komponentini yaratish uchun"],0],
["react","normal","Redux Toolkit nima?",["Redux bilan ishlashni soddalashtiruvchi rasmiy tavsiya etilgan vositalar to'plami","Redux'ning endi ishlatilmaydigan, eskirib qolgan eski versiyasi","Redux'dan mustaqil, o'z qoidalariga ega alohida dasturlash tili","Faqat kodni sinovdan o'tkazish uchun mo'ljallangan vosita"],0],
["react","normal","Redux DevTools nima uchun ishlatiladi?",["Ilova holatining o'zgarishlarini brauzerda kuzatish va nosozliklarni topish uchun","Loyiha kodini kichraytirib, hajmini minifikatsiya qilish uchun","Yuklangan rasm fayllarining hajmini siqib kichraytirish uchun","Backend serverining sozlamalarini o'rnatish va boshqarish uchun"],0],
["react","normal","Formalar (forms) React'da controlled tarzda qanday boshqariladi?",["Input qiymati state orqali saqlanib, onChange bilan yangilanadi","Faqat oddiy HTML forma sifatida, JS aralashmaydi","Formalarni React qo'llab-quvvatlamaydi","Faqat class komponentda mumkin"],0],
["react","normal","Ro'yxat (list) render qilishda .map() metodi qanday ishlatiladi?",["Massiv elementlaridan JSX elementlar massivini yaratish uchun","Massivni o'chirish uchun","Faqat obyektlar uchun ishlatiladi","CSS qo'llash uchun"],0],
["react","qiyin","Higher Order Component (HOC) nima?",["Boshqa komponentni argument sifatida olib, yangi komponent qaytaruvchi funksiya","Faqat stil berish uchun mo'ljallangan maxsus CSS komponenti","Holatni o'zgartirish uchun ishlatiladigan Redux action'ning bir turi","Ilovadagi sahifalar orasidagi marshrutning bir turi"],0],
["react","qiyin","Render Props texnikasi nima?",["Komponentga funksiya (prop) uzatib, u orqali qanday render qilishni belgilash","Komponentlarga faqat rang va shakl beruvchi CSS uslubining bir turi","Joriy holat va action asosida yangi holat qaytaruvchi Redux reducer turi","Kodni avtomatik sinovdan o'tkazish uchun ishlatiladigan test metodikasi"],0],
["react","qiyin","React Hooks nima?",["Funksional komponentlarda state va boshqa React xususiyatlaridan foydalanish imkonini beruvchi funksiyalar","Faqat class ko'rinishidagi eski komponentlar uchun mo'ljallangan metodlar","Elementlarga harakat effekti qo'shish uchun ishlatiladigan CSS animatsiya kutubxonasi","Sahifalar orasidagi navigatsiyani ta'minlaydigan alohida marshrutlash vositasi"],0],
["react","qiyin","useEffect hook nima uchun ishlatiladi?",["Yon ta'sirlarni (side effects) — masalan ma'lumot yuklash, obuna bo'lish — boshqarish uchun","Komponentga faqat CSS orqali tashqi ko'rinish qo'shish uchun","Kerak bo'lmagan komponentni ekrandan butunlay o'chirib tashlash uchun","Faqat eski, class ko'rinishidagi komponentlarda ishlaydigan usul sifatida"],0],
["react","qiyin","Custom hook nima?",["Takroriy logikani qayta ishlatish uchun yaratilgan, \"use\" bilan boshlanadigan o'z funksiyangiz","React kutubxonasi ichida tayyor holda kelgan o'rnatilgan hook","Elementga stil berish uchun ishlatiladigan oddiy CSS klassi","Holatni o'zgartirish uchun yuboriladigan Redux action'ning bir turi"],0],
["react","qiyin","React'da keraksiz qayta render(rerender)larning oldini olishda nima yordam beradi?",["React.memo, useMemo, useCallback kabi vositalar","Har doim butun sahifani qayta yuklash","CSS animatsiyasini o'chirish","Barcha state'larni global qilish"],0],
["react","qiyin","Next.js nima?",["React asosidagi, server-side rendering va boshqa imkoniyatlarni qo'shuvchi freymvork","React'dan mustaqil, o'zining alohida sintaksisiga ega dasturlash tili","Ma'lumotlarni jadval ko'rinishida saqlaydigan ma'lumotlar bazasi","Faqat stil yozish uchun mo'ljallangan alohida CSS kutubxonasi"],0],
["react","qiyin","Unit testing nimani tekshiradi?",["Dasturning eng kichik, alohida qismlarini (masalan bitta funksiya yoki komponent)","Butun tizimni foydalanuvchi nuqtai nazaridan","Faqat dizaynni","Faqat serverni"],0],
["react","qiyin","E2E (End-to-End) testing nimani tekshiradi?",["Butun ilovaning boshidan oxirigacha, foydalanuvchi kabi real ish jarayonini","Faqat kod ichidagi bitta alohida funksiyaning to'g'ri ishlashini","Faqat sahifaning tashqi ko'rinishi va CSS uslublarini","Faqat serverdagi ma'lumotlar bazasining holatini"],0],
["react","qiyin","Testing va Debugging o'rtasidagi farq nima?",["Testing xatolarni aniqlaydi, debugging esa topilgan xatoni tuzatish jarayoni","Ular bir xil narsa","Debugging faqat production'da qilinadi","Testing shart emas"],0],
["react","qiyin","Deployment (joylashtirish) nima?",["Tayyor ilovani foydalanuvchilar foydalana oladigan serverga chiqarish jarayoni","Loyihadagi kerak bo'lmagan kod fayllarini butunlay o'chirish","Ilovani foydalanuvchiga chiqarmasdan faqat sinovdan o'tkazish","Ilovaning faqat tashqi ko'rinishini (dizaynini) yaratish jarayoni"],0],
["react","qiyin","Hosting nima?",["Veb-ilovani internetda joylashtirish uchun server xizmati","Dasturchi kod yozishda foydalanadigan tahrirlash dasturi","Ma'lumotlarni jadval shaklida saqlaydigan bazaning bir turi","Tayyor stil qoidalarini taqdim etuvchi CSS freymvorki"],0],
["react","qiyin","User Analytics (foydalanuvchi tahlili) nima uchun ishlatiladi?",["Foydalanuvchilarning ilova bilan qanday ishlashini kuzatish va tahlil qilish uchun","Yozilgan kodning ishlash tezligini sun'iy oshirish uchun","Ilovaning tashqi ko'rinishi va dizaynini chizib yaratish uchun","Ma'lumotlar bazasidagi keraksiz yozuvlarni tozalash uchun"],0],
["react","qiyin","useMemo hook nima uchun ishlatiladi?",["Qimmat hisoblash natijasini keshlab, keraksiz qayta hisoblashning oldini olish uchun","Kerak bo'lmagan komponentni ilovadan butunlay olib tashlash uchun","Komponentga faqat tashqi ko'rinish beruvchi CSS qo'shish uchun","Faqat eski uslubdagi class komponentlarda ishlaydigan hook sifatida"],0],
["react","qiyin","useCallback hook nima qiladi?",["Funksiyani keshlab, qayta render'larda uning qayta yaratilishining oldini oladi","Berilgan funksiyani xotiradan butunlay o'chirib yuboradi","Faqat oddiy obyektlar bilan ishlab, funksiyalarga tegmaydi","Elementga qo'shilgan CSS animatsiyasining tezligini boshqaradi"],0],
["react","qiyin","useContext hook bilan Context API'dan foydalanishda nima o'zgaradi?",["Hook orqali context qiymatiga funksional komponentlarda to'g'ridan-to'g'ri, qulayroq murojaat qilinadi","Context tushunchasi endi umuman ishlatilmaydi, u butunlay bekor qilinadi","Endi faqat eski uslubdagi class komponentlarda ishlay boshlaydi","Context API'ning o'rnini to'liq Redux kutubxonasi egallab oladi"],0],
["react","qiyin","React'da komponent optimallashtirishda \"memoization\" nimani anglatadi?",["Natijani keshlab, bir xil kirish uchun qayta hisoblamaslikni","Xotirani butunlay tozalashni","Komponentni o'chirishni","CSS'ni siqishni"],0],
["react","qiyin","Frontend loyihasini deploy qilishda odatda qanday fayllar serverga yuklanadi?",["Build (ishlab chiqarish uchun optimallashtirilgan) qilingan statik fayllar","Loyihaning butun manba (source) kodi, hech qanday o'zgarishsiz holda","Faqat loyihada ishlatilgan rasm fayllarining o'zi","Faqat maxfiy sozlamalarni saqlovchi .env fayli"],0],
["react","qiyin","Testlarni avtomatlashtirish (masalan CI/CD orqali) nima uchun foydali?",["Har o'zgarishda kodni avtomatik tekshirib, xatolarni erta aniqlash uchun","Kodning ishlash tezligini ataylab pasaytirib qo'yish uchun","Faqat sahifaning tashqi dizaynini tekshirib chiqish uchun","Bunday avtomatlashtirishning amaliyotda hech qanday foydasi yo'q"],0],
["react","qiyin","React ilovasida \"state ko'tarish\" (lifting state up) nima?",["Umumiy holatni bir nechta komponent ishlata olishi uchun ularning umumiy ota-komponentiga ko'chirish","State'ni butunlay o'chirish","State'ni serverda saqlash","Faqat class komponentlarda mumkin bo'lgan amal"],0],
["backend","oson","Backend dasturlash nimaga mas'ul?",["Server tomonidagi mantiq va ma'lumotlarni qayta ishlash","Sahifaning tashqi ko'rinishi","Rasm tahrirlash","Video ko'rish"],0],
["backend","oson","Server nima?",["So'rovlarga javob beruvchi kompyuter yoki dastur","Internet sahifalarini ko'rish uchun ishlatiladigan brauzer turi","Kod yozish uchun mo'ljallangan alohida dasturlash tili","Ma'lumotlarni saqlash uchun ishlatiladigan fayl formati"],0],
["backend","oson","API nima uchun kerak?",["Dasturlar o'rtasida ma'lumot almashish uchun","Rasm chizish uchun","Video montaj uchun","Shrift tanlash uchun"],0],
["backend","oson","Ma'lumotlar bazasi (database) nima?",["Tartiblangan ma'lumotlar to'plami","Dasturlash tili","Kompyuter virusi","Grafik dastur"],0],
["backend","normal","SQL nima uchun ishlatiladi?",["Ma'lumotlar bazasi bilan ishlash uchun","Rasm chizish uchun","Video montaj uchun","Tarmoq sozlash uchun"],0],
["backend","normal","REST API'da 'GET' so'rovi nima uchun ishlatiladi?",["Ma'lumot olish uchun","Ma'lumot o'chirish uchun","Serverni o'chirish uchun","Parol o'zgartirish uchun"],0],
["backend","normal","Autentifikatsiya (authentication) nima?",["Foydalanuvchi shaxsini tasdiqlash jarayoni","Fayl hajmini kichraytirib, ma'lumotni siqish jarayoni","Ishlab turgan serverni butunlay o'chirib qo'yish amali","Elementga fon yoki matn rangini belgilash jarayoni"],0],
["backend","normal","Birlamchi kalit (Primary Key) vazifasi nima?",["Har bir yozuvni yagona aniqlash","Jadvalni rangga bo'yash","Faylni siqish","Zaxira nusxa yaratish"],0],
["backend","qiyin","Load balancing (yuklama balanslash) nima uchun ishlatiladi?",["So'rovlarni bir nechta server o'rtasida taqsimlash","Rasm sifatini oshirish","Shriftni o'zgartirish","Ekran o'lchamini moslashtirish"],0],
["backend","qiyin","Keshlash (caching) nima uchun kerak?",["Tez-tez so'raladigan ma'lumotlarga tezroq murojaat qilish","Ma'lumotni butunlay o'chirish","Serverni o'chirish","Parolni unutish"],0],
["backend","qiyin","Mikroservis arxitekturasi nimani anglatadi?",["Ilovani mustaqil kichik xizmatlarga bo'lish","Bitta katta dastur yaratish","Faqat frontend yozish","Ma'lumotlar bazasisiz ishlash"],0],
["backend","qiyin","SQL in'ektsiyasi (SQL injection) nima?",["Zararli SQL kodini kiritish orqali hujum qilish","Ma'lumotlar bazasini tezlashtirish usuli","Backup yaratish usuli","Server sozlamasi"],0],
["flutter","oson","Flutter nima?",["Mobil va boshqa ilovalar yaratish uchun freymvork","Kompyuter apparatini boshqaradigan operatsion tizimning bir turi","Internet sahifalarini ko'rsatish uchun ishlatiladigan brauzer","Zararli dasturlardan himoya qiluvchi antivirus dasturi"],0],
["flutter","oson","Flutter asosan qaysi dasturlash tilida yoziladi?",["Dart","Python","Java","Swift"],0],
["flutter","oson","Flutter'da interfeys elementlari qanday deyiladi?",["Widget","Modul","Obyekt","Fayl"],0],
["flutter","oson","Flutter yordamida qanday ilovalar yaratish mumkin?",["Bir kod bazasi bilan Android, iOS va boshqalar uchun","Faqat Windows operatsion tizimi uchun mo'ljallangan ilovalar","Faqat Android operatsion tizimida ishlaydigan ilovalar","Faqat brauzerda ochiladigan oddiy veb-sayt sahifalari"],0],
["flutter","normal","Flutter'da 'StatelessWidget' va 'StatefulWidget' o'rtasidagi farq nima?",["StatefulWidget holati o'zgarishi mumkin, Stateless — mumkin emas","Ular aslida bir xil ishlaydi, ular orasida farq yo'q","StatelessWidget faqat rasm ko'rsatish uchun mo'ljallangan","StatefulWidget faqat oddiy matn chiqarish uchun ishlatiladi"],0],
["flutter","normal","Hot reload funksiyasi nima uchun qulay?",["Kod o'zgarishlarini ilovani qayta ishga tushirmasdan darhol ko'rish uchun","Ishlab turgan ilovani butunlay yopib, o'chirib qo'yish uchun","Ilovaning ishlash tezligini ataylab pasaytirib qo'yish uchun","Kod ichidagi xatolarni dasturchidan yashirib qo'yish uchun"],0],
["flutter","normal","Flutter'da layout qurish uchun asosan qaysi widgetlar ishlatiladi?",["Row va Column","Table va Form","Faqat Button va Image","List va Map"],0],
["flutter","normal","pubspec.yaml fayli nima uchun kerak?",["Loyihaning paketlari va sozlamalarini boshqarish uchun","Ilovaning tashqi ko'rinishi va dizaynini chizib yaratish uchun","Loyihaga tegishli rasm fayllarini o'zida saqlash uchun","Ilova uchun avtomatik testlar yozish uchun mo'ljallangan fayl"],0],
["flutter","qiyin","Flutter'da 'BuildContext' qanday vazifani bajaradi?",["Widgetlar daraxtidagi joylashuvni bildiradi","Ma'lumotlar bazasiga ulanadi","Internetga ulanadi","Rasmni siqadi"],0],
["flutter","qiyin","Holatni boshqarish (state management) uchun Flutter'da nima ishlatilishi mumkin?",["Provider, Bloc kabi kutubxonalar","Faqat elementlarga stil beruvchi CSS tili","Faqat ma'lumotlar bazasi bilan ishlash uchun SQL tili","Faqat sahifa tuzilishini belgilaydigan HTML tili"],0],
["flutter","qiyin","Flutter'da 'async/await' nima uchun ishlatiladi?",["Asinxron (kutish talab qiluvchi) amallarni boshqarish uchun","Ilovani tezroq yopish uchun","Rangni o'zgartirish uchun","Shrift tanlash uchun"],0],
["flutter","qiyin","Widget daraxtini qayta qurish (rebuild) qachon sodir bo'ladi?",["setState() chaqirilganda yoki holat o'zgarganda","Faqat ilova yopilganda","Faqat internet uzilganda","Hech qachon"],0],
["kompsavod","oson","Fayl (file) nima?",["Kompyuterda saqlanadigan ma'lumot birligi","Dasturchilar kod yozishda ishlatadigan dasturlash tili","Ma'lumotlarni uzatish uchun ishlatiladigan internet turi","Kompyuter klaviaturasidagi bosiladigan tugmalardan biri"],0],
["kompsavod","oson","Papka (folder) nima uchun kerak?",["Fayllarni tartibli saqlash uchun","Internetga ulanish uchun","Ovoz balandligini sozlash uchun","Ekranni tozalash uchun"],0],
["kompsavod","oson","Klaviaturada nusxa olish (copy) uchun qaysi tugmalar bosiladi?",["Ctrl + C","Ctrl + V","Ctrl + Z","Ctrl + S"],0],
["kompsavod","oson","Operatsion tizim (OS) nima?",["Kompyuter apparat va dasturlarini boshqaruvchi asosiy dastur","Internetdagi sahifalarni ko'rish uchun ishlatiladigan brauzer","Zararli dasturlardan himoya qiluvchi maxsus antivirus dasturi","Fayllarni saqlashda ishlatiladigan formatlardan biri"],0],
["kompsavod","normal","Kuchli parol qanday bo'lishi kerak?",["Uzun, harflar, raqamlar va belgilar aralashmasidan iborat","Faqat foydalanuvchining o'z ismidan iborat bo'lishi kerak","Faqat tug'ilgan sana kabi raqamlardan tashkil topishi kerak","Eslab qolish oson bo'lishi uchun qisqa va oddiy bo'lishi kerak"],0],
["kompsavod","normal","Bulutli saqlash (cloud storage) nima?",["Fayllarni internet orqali masofaviy serverda saqlash","Fayllarni faqat diskda saqlash","Faylni butunlay o'chirish","Kompyuterni tozalash dasturi"],0],
["kompsavod","normal","Antivirus dasturi nima uchun kerak?",["Zararli dasturlardan himoya qilish uchun","Fayllarni siqish uchun","Internetni tezlashtirish uchun","Rasm tahrirlash uchun"],0],
["kompsavod","normal","Ctrl+Z tugmalari nima qiladi?",["Oxirgi amalni bekor qiladi (undo)","Faylni saqlaydi","Faylni o'chiradi","Ekranni suratga oladi"],0],
["kompsavod","qiyin","Fishing (firibgarlik) hujumidan qanday himoyalanish mumkin?",["Shubhali havola va xabarlarga ishonmaslik","Har qanday havolani bosish","Parolni hammaga aytish","Antivirusni o'chirib qo'yish"],0],
["kompsavod","qiyin","Ikki bosqichli autentifikatsiya (2FA) nima uchun kerak?",["Akkaunt xavfsizligini qo'shimcha himoya qatlami bilan mustahkamlash","Foydalanuvchi parolini ataylab unutib qo'yishi uchun","Internet ulanish tezligini sun'iy ravishda oshirish uchun","Katta hajmli fayllarni siqib, kichikroq qilish uchun"],0],
["kompsavod","qiyin","Rezerv nusxa (backup) nima uchun muhim?",["Ma'lumot yo'qolganda uni tiklash imkonini beradi","Kompyuterni tezlashtiradi","Internetni arzonlashtiradi","Ekranni kattalashtiradi"],0],
["kompsavod","qiyin","Ochiq Wi-Fi tarmog'idan foydalanishda nimaga e'tibor berish kerak?",["Shaxsiy va moliyaviy ma'lumotlarni kiritishdan saqlanish","Hech narsaga e'tibor berish shart emas","Parolni barchaga ko'rsatish","Antivirusni o'chirish"],0],
["kompsavod","oson","Wordda yangi hujjat yaratish uchun qaysi yorliqdan foydalaniladi?",["Файл","Главная","Вставка","Дизайн"],0],
["kompsavod","oson","Microsoft Word dasturida matnni qalin (bold) qilish uchun qaysi tugma ishlatiladi?",["Ctrl + B","Ctrl + I","Ctrl + U","Ctrl + K"],0],
["kompsavod","oson","Wordda matnni o'rtaga joylashtirish uchun qaysi klaviatura kombinatsiyasi ishlatiladi?",["Ctrl + E","Ctrl + A","Ctrl + R","Ctrl + L"],0],
["kompsavod","normal","Word hujjatni gorizontal (albom, Alʼbomnaya) ko'rinishga keltirish uchun qaysi yorliqdan foydalaniladi?",["Макет","Дизайн","Вид","Ссылки"],0],
["kompsavod","oson","Qaysi yorliqdan foydalanib jadval qo'shish mumkin?",["Вставка","Дизайн","Вид","Ссылки"],0],
["kompsavod","oson","Word dasturida matnni (o'ngga, chapga, o'rtaga) tekislash uchun qaysi yorliq ishlatiladi?",["Главная","Разметка страницы","Вставка","Дизайн"],0],
["kompsavod","oson","Matnni yonbosh (kursiv, italic) qilish uchun qaysi tugma ishlatiladi?",["Ctrl + I","Ctrl + B","Ctrl + U","Ctrl + K"],0],
["kompsavod","oson","Word dasturida hujjatni saqlash uchun qaysi yorliq ishlatiladi?",["Файл","Главная","Вид","Вставка"],0],
["kompsavod","oson","Hujjatga rasm qo'shish uchun qaysi buyruq ishlatiladi?",["Рисунок","Таблица","Диаграмма","Символ"],0],
["kompsavod","normal","Microsoft Word dasturida matematik formulalarni yozish uchun qaysi buyruq ishlatiladi?",["Уравнение","Символ","Ссылки","Рисунок"],0],
["kompsavod","oson","Microsoft Word – bu:",["Matn muxarriri","Elektron jadval muxarriri","Ma'lumotlar ombori","Taqdimot dasturi"],0],
["kompsavod","normal","Microsoft Word dasturida CTRL tugmasini bosib sichqoncha g'ildiragi aylantirilsa nima sodir bo'ladi?",["Hujjat masshtabi o'zgaradi","Hujjat varaqlari almashadi","Matn o'lchami o'zgaradi","Hujjat saqlanadi"],0],
["kompsavod","oson","Microsoft Word dasturida klaviaturaning strelkali tugmalari yordamida matnlarni belgilash uchun qo'shimcha qaysi tugmadan foydalaniladi?",["Shift","Tab","Ctrl","Alt"],0],
["kompsavod","oson","Microsoft Word dasturida saqlangan yoki oxirgi marta ko'rilgan fayllarni ochish qaysi klaviatura kombinatsiyasi orqali amalga oshiriladi?",["Ctrl + O","Ctrl + N","Ctrl + U","Ctrl + S"],0],
["kompsavod","normal","Microsoft Word dasturida qator oralig'ini o'zgartirish uchun qaysi buyruqdan foydalaniladi?",["Интервал","Абзац","Эффекты текста","Стиль"],0],
["kompsavod","oson","Microsoft Word dasturida hamma matnni tezkor belgilash qanday amalga oshiriladi?",["Kursorni matnga o'rnatib, «Ctrl+A» tugmalar birikmasini bosish","Gapga sichqoncha chap tugmasi bilan ketma-ket uch marta bosish","CTRL tugmasini bosgan holda ixtiyoriy gapni sichqoncha bilan bosish","Faqat Enter tugmasini bosish"],0],
["kompsavod","oson","Microsoft Word dasturida hujjatni chop etish (print) uchun qaysi yorliq ishlatiladi?",["Файл","Главная","Вставка","Вид"],0],
["kompsavod","normal","Microsoft Word dasturida figuradan nusxa olish (dublikat qilish) uchun qaysi tugma ishlatiladi?",["Ctrl","Shift","Alt","Tab"],0],
["kompsavod","normal","Microsoft Word dasturida «Формат по образцу» buyrug'i qanday vazifani bajaradi?",["Belgilangan matn formatidan nusxa oladi","Matn rangini o'zgartiradi","Matn orqa fonini bo'yaydi","Matnni o'chiradi"],0],
["kompsavod","oson","Microsoft Word dasturida matnni kesib olish (kesish) uchun qaysi tugma ishlatiladi?",["Ctrl + X","Ctrl + C","Ctrl + V","Ctrl + K"],0],
["kompsavod","oson","Microsoft Word dasturida matnni nusxalash uchun qaysi tugma ishlatiladi?",["Ctrl + C","Ctrl + V","Ctrl + X","Ctrl + Z"],0],
["kompsavod","normal","Microsoft Word dasturida figura rangini o'zgartirish uchun qaysi buyruqdan foydalaniladi?",["Заливка фигуры","Контур фигуры","Формат фигуры","Эффекты фигуры"],0],
["kompsavod","normal","Microsoft Word dasturida hujjatga ramka (chegara) qo'shish uchun qaysi yorliq ishlatiladi?",["Дизайн","Вид","Главная","Ссылки"],0],
["kompsavod","oson","Microsoft Word dasturida matnlar ichidan kerakli matnni qidirish uchun qaysi buyruq ishlatiladi?",["Найти","Заменить","Выделить","Перейти"],0],
["kompsavod","oson","Qaysi yorliqdan foydalanib diagramma qo'shish mumkin?",["Вставка","Дизайн","Главная","Вид"],0],
["kompsavod","oson","Microsoft Word dasturida matnni o'ngga tekislash uchun qaysi tugma ishlatiladi?",["Ctrl + R","Ctrl + L","Ctrl + E","Ctrl + J"],0],
["kompsavod","normal","Microsoft Word dasturiga «Выполнить» (Run) oynasidan qaysi buyruq orqali to'g'ri kirish mumkin?",["winword","word","vinword","msword"],0],
["kompsavod","oson","Microsoft Word dasturida avtomatik raqam qo'shish uchun qaysi buyruq ishlatiladi?",["Нумерация","Маркеры","Многоуровневый список","Стиль"],0],
["kompsavod","oson","Microsoft Word dasturida yangi varoq (sahifa) qo'shish uchun qaysi klaviatura kombinatsiyasi ishlatiladi?",["Ctrl + Enter","Ctrl + Shift","Alt + Tab","Ctrl + N"],0],
["kompsavod","oson","Microsoft Word dasturida yangi fayl ochish uchun qaysi klaviatura kombinatsiyasi ishlatiladi?",["Ctrl + N","Ctrl + Shift + N","Alt + N","Ctrl + O"],0],
["kompsavod","oson","Microsoft Excel – bu:",["Elektron jadval muxarriri","Ma'lumotlar bazasi","Elektron pochta","Taqdimot dasturi"],0],
["kompsavod","oson","Microsoft Excel jadvallarida formulalar yozish qaysi belgidan boshlanadi?",["=","+","-","#"],0],
["kompsavod","oson","Microsoft Excel jadvallarida sichqonchaning qaysi harakati katakka o'zgartirish kiritish imkonini beradi?",["Chap tugma bilan ikki marta bosish","Chap tugma bilan bir marta bosish","O'ng tugma bilan ikki marta bosish","G'ildirakni aylantirish"],0],
["kompsavod","oson","Microsoft Excel dasturi yordamida yaratiladigan hujjatlar qanday nomlanadi?",["«Книга»","«Лист»","«Документ»","«Файл»"],0],
["kompsavod","normal","Excel dasturida yangi hujjat yaratish tartibi to'g'ri ko'rsatilgan variantni tanlang.",["«Файл \\ Новая книга»","«Файл \\ Создать»","«Файл \\ Новый»","«Вставка \\ Новая книга»"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi qiymatli (bo'sh bo'lmagan) kataklarni sanang (A1=5, A2=12, A3=\"\", A4=10, A5=15).",["=СЧЁТЗ(A1:A5)","=СЧЁТЗ(A1:A3)","=СЧЁТЗ(A3:A5)","=СЧЁТ(A1:A5)"],0],
["kompsavod","normal","Microsoft Excel dasturida yangi hujjat yaratilganda, dastur tomonidan unga avtomatik qanday nom beriladi?",["«Книга 1»","«Листы 1»","«Документ 1»","«Презентация 1»"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi 10 dan katta va 20 dan kichik qiymatlarni sanang (A1=5, A2=12, A3=18, A4=10, A5=22).",["=СЧЁТЕСЛИМН(A1:A5; \">10\"; A1:A5; \"<20\")","=СЧЁТЕСЛИМН(A1:A5; \">=10\"; A1:A5; \"<=20\")","=СЧЁТЕСЛИМН(A1:A5; \"<10\"; A1:A5; \">20\")","=СЧЁТЕСЛИ(A1:A5; \">10\")"],0],
["kompsavod","qiyin","Agar A1 katakdagi qiymat 10 dan katta bo'lsa \"Katta\", aks holda \"Kichik\" deb chiqarsin (10 ga teng bo'lganda ham \"Kichik\" chiqishi kerak).",["=ЕСЛИ(A1 > 10; \"Katta\"; \"Kichik\")","=ЕСЛИ(A1 >= 10; \"Katta\"; \"Kichik\")","=ЕСЛИ(A1 < 10; \"Katta\"; \"Kichik\")","=ЕСЛИ(A1 = 10; \"Katta\"; \"Kichik\")"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi qiymatlar uchun minimal (eng kichik) qiymatni toping.",["=МИН(A1:A5)","=МАКС(A1:A5)","=МИН(A1:A3)","=СРЗНАЧ(A1:A5)"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi qiymatlar uchun maksimal (eng katta) qiymatni toping.",["=МАКС(A1:A5)","=МИН(A1:A5)","=МАКС(A1:A3)","=СУММ(A1:A5)"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi qiymatlar uchun o'rtacha qiymatni toping.",["=СРЗНАЧ(A1:A5)","=СУММ(A1:A5)","=СРЗНАЧ(A1:A3)","=МЕДИАНА(A1:A5)"],0],
["kompsavod","qiyin","A1 katakda 2023-yil 13-may sanasini hosil qiling.",["=ДАТА(2023;5;13)","=ДАТА(13;5;2023)","=ДАТА(2023;13;5)","=ДАТА(5;13;2023)"],0],
["kompsavod","qiyin","A1:A3 kataklardagi qiymatlarni qo'shing (A1=2, A2=3, A3=5).",["=СУММ(A1:A3)","=СЕГОДНЯ()","=СРЗНАЧ(A1:A3)","=СЧЁТ(A1:A3)"],0],
["kompsavod","qiyin","Bugungi sanani chiqarib beruvchi formula to'g'ri yozilgan javobni belgilang.",["=СЕГОДНЯ()","=СУММ(A1:A2)","=ДАТА()","=ВРЕМЯ()"],0],
["kompsavod","qiyin","A1 va A2 kataklardagi matnlarni bo'sh joy bilan birlashtiring (A1=\"Salom\", A2=\"Dunyo\").",["=СЦЕПИТЬ(A1; \" \"; A2)","=СЦЕПИТЬ(A1; A2)","=СЦЕПИТЬ(A1; \"-\"; A2)","=СУММ(A1; A2)"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi 10 dan katta qiymatlarni qo'shing (A1=5, A2=12, A3=8, A4=10, A5=15).",["=СУММЕСЛИ(A1:A5; \">10\")","=СУММЕСЛИ(A1:A5; \">=10\")","=СУММЕСЛИ(A1:A5; \"<10\")","=СУММ(A1:A5)"],0],
["kompsavod","qiyin","A1:A5 diapazonidagi bo'sh kataklarni sanang (A1=5, A2=\"\", A3=8, A4=\"\", A5=15).",["=СЧИТАТЬПУСТОТЫ(A1:A5)","=СЧЁТЗ(A1:A5)","=СЧИТАТЬПУСТОТЫ(A1:A3)","=СЧЁТ(A1:A5)"],0],
["kompsavod","oson","Qaysi qurilma kompyuterning asosiy ishlash qismlarini o'z ichiga oladi?",["Korpus (sistemali blok)","Ma'lumotlarni ekranga tasvir sifatida chiqaradigan monitor","Matn va buyruqlarni kiritish uchun ishlatiladigan klaviatura","Kursorni boshqarish uchun ishlatiladigan sichqoncha"],0],
["kompsavod","oson","Qaysi qurilma kompyuterga kirish ma'lumotlarini kiritish uchun ishlatiladi?",["Klaviatura","Printer","Monitor","Kolonka"],0],
["kompsavod","oson","Kompyuterning tezkor xotirasi qanday ataladi?",["RAM","ROM","SSD","HDD"],0],
["kompsavod","oson","Qaysi qurilma kompyuterdan chiqish ma'lumotlarini ko'rsatadi?",["Monitor","Klaviatura","Sichqoncha","Skaner"],0],
["kompsavod","oson","Qaysi qurilma ma'lumotlarni bosma shaklda chiqarish uchun ishlatiladi?",["Printer","Skaner","Monitor","Klaviatura"],0],
["kompsavod","normal","Sichqonchani kompyuterga ulash uchun odatda qaysi porttan foydalaniladi?",["USB","HDMI","VGA","LAN"],0],
["kompsavod","oson","Kompyuterdagi ma'lumotlarni doimiy saqlash uchun qaysi qurilmadan foydalangan ma'qul?",["HDD yoki SSD","Vaqtinchalik, tezkor operativ xotira bo'lgan RAM","Hisoblash amallarini bajaradigan protsessor — CPU","Faqat o'qish uchun mo'ljallangan doimiy xotira — ROM"],0],
["kompsavod","oson","Qaysi qurilma audio ma'lumotlarni chiqarish uchun ishlatiladi?",["Kolonka","Klaviatura","Sichqoncha","Skaner"],0],
["kompsavod","normal","Windows operatsion tizimini qaysi kompaniya ishlab chiqargan?",["Microsoft","Apple","Linux jamoasi","Google"],0],
["kompsavod","oson","Qaysi tugmalar kombinatsiyasi bilan hujjatni chop etish (print) mumkin?",["Ctrl + P","Ctrl + S","Ctrl + C","Ctrl + O"],0],
["kompsavod","oson","Kompyuterni to'g'ri o'chirish uchun qaysi amal bajarilishi kerak?",["Windows menyusi orqali «Завершение работы» (o'chirish) buyrug'ini tanlash","Ctrl + Alt + Delete","Ctrl + S","Quvvat tugmasini kutmasdan bosib ushlab turish"],0],
];

/* ===================== I18N ===================== */
const TRANSLATIONS = {
uz:{
  common:{back:"← Orqaga", loading:"Yuklanmoqda...", restart:"Qayta boshlash", pause:"Pauza", resume:"Davom ettirish", pausedTitle:"O'yin pauzada"},
  nav:{home:"Bosh sahifa", foydali:"Foydali o'yinlar", kongilochar:"Ko'ngilochar o'yinlar", savollar:"Savol qo'shish", login:"Kirish", register:"Ro'yxatdan o'tish", logoutConfirm:n=>`${n} sifatida tizimdan chiqmoqchimisiz?`},
  dbBanner:"Ma'lumotlar bazasi ulanmagan holatda — o'yinlar to'liq ishlaydi, lekin ro'yxatdan o'tish va savol qo'shish vaqtincha mavjud emas.",
  footer:"Agame — o'ynang, o'rganing, o'zingizni sinang.", devLabel:"Dasturchi",
  home:{eyebrow:"O'yin platformasi", h1:"Zehningizni charxlang, vaqtingizni esa mazmunli o'tkazing!",
    p:"Agame'da ikki xil turdagi o'yinlar bor: bilim va tezlikni sinab ko'rishga yordam beradigan <b>foydali o'yinlar</b> hamda shunchaki dam olish va vaqtni maroqli o'tkazish uchun <b>ko'ngilochar o'yinlar</b>.",
    eduTag:"Foydali", eduTitle:"Bilim maydoni", eduDesc:"Matematika, HTML, CSS, JavaScript, React, Backend, Flutter va kompyuter savodxonligidan savollarga javob bering. Har bir to'g'ri javob jamoangizga ustunlik beradi. Raqib jamoa bilan arqon tortishuvda kuch sinashib, g'alaba qozoning!", eduBtn:"O'yinlarni ko'rish →",
    funTag:"Ko'ngilochar", funTitle:"Dam olish maydoni", funDesc:"Xotira kartalari, tezkor reaksiya va pazl kabi sodda, qiziqarli o'yinlar bilan vaqtingizni yoqimli o'tkazing.", funBtn:"O'yinlarni ko'rish →",
    statUsers:"Foydalanuvchilar", statQuestions:"Savollar bazasi", statGames:"O'ynalgan o'yinlar",
    whyEyebrow:"Nega Agame?", whyH2:"Agame'da nimalar bor?",
    card1T:"Ro'yxatdan o'tmasdan o'ynang", card1D:"Hisob yaratishga hojat yo'q. Saytga kiring va barcha o'yinlarni bemalol sinab ko'ring.",
    card2T:"O'zingiz savol qo'shing", card2D:"Ro'yxatdan o'tgan bo'lsangiz, o'zingiz bilgan savollarni qo'shing va boshqalar bilan baham ko'ring.",
    card3T:"Turli yo'nalishlarda o'ynang", card3D:"Matematika bilan cheklanib qolmaysiz. HTML, CSS, JavaScript, React, Backend, Flutter va kompyuter savodxonligi bo'yicha ham savollar mavjud.",
},
  badge:{ready:"O'ynash mumkin", soon:"Tez orada"},
  featured:{sectionEyebrow:"Yangi o'yin", eyebrow:"YANGI", title:"AirCanvas",
    desc:"Qo'lingizni havoda harakatlantirib chizing! Veb-kameraga qarab qo'l harakatlaringizni kuzatuvchi va shu asosida ekranda rasm chizish imkonini beruvchi zamonaviy o'yin — hech qanday qalam yoki sichqonchasiz.",
    cta:"O'ynash →", prev:"Oldingi", next:"Keyingi"},
  foydali:{eyebrow:"Foydali o'yinlar", h2:"Aqilni charxlaydigan o'yinlar", lead:"Matematika va boshqa IT yo'nalishlaridan bilimingizni sinab, o'ynab turib o'rganing.",
    arqonN:"Arqon tortish", arqonD:"Ikki jamoa arqon tortish o'yinida bellashing va savollarga javob berib g'olib bo'ling.",
    krossN:"Bilim krossvordi", krossD:"Savollarga javob toping va krossvordni to'ldiring.",
    speedN:"Tezkor test", speedD:"Vaqtni boy bermang. Belgilangan vaqt ichida imkon qadar ko'p savolga javob bering.",
    poygaN:"Formula poygasi", poygaD:"Savolga to'g'ri javob bering va formula poygasida g'olib bo'ling.",
    detN:"Kod detektivi", detD:"Kodda yashiringan xatoni toping va g'olib bo'ling.",
    typingN:"Tez yozish", typingD:"Matnni imkon qadar tez va xatosiz yozib, o'z tezligingizni sinang.",
    tfN:"Rost yoki Yolg'on", tfD:"Dasturlash haqidagi fikrlar rostmi yoki yolg'onmi — top.",
    cqN:"Code Quiz", cqD:"Kodga qarang va uning qanday natija berishini toping."},
  kongilochar:{eyebrow:"Ko'ngilochar o'yinlar", h2:"Dam olish uchun qiziqarli o'yinlar", lead:"Vaqtingizni yoqimli o'tkazish uchun sodda va qiziqarli o'yinlar.",
    memN:"Xotira kartalari", memD:"Juft kartalarni topib, xotirangizni sinang.",
    reactN:"Tezkor reaksiya", reactD:"Yashil tugmani bosish orqali reaksiyangiz qanchalik tez ekanligini sinang.",
    pzN:"15-pazl", pzD:"Raqamlarni tartibga solib, pazlni yeching.",
    targetN:"Nishonga urish", targetD:"Aniqlikni sinovdan o'tkazing.",
    snakeN:"Ilon o'yini", snakeD:"Klassik ilon o'yinining yangicha versiyasi.",
    xoN:"X-0 o'yini", xoD:"Kompyuterga qarshi X-0 o'ynang.",
    farqN:"Farqlarni topish", farqD:"Ikki rasm orasidagi farqlarni toping.",
    tetrisN:"Tetris", tetrisD:"Bloklarni tering va qatorlarni to'ldiring."},
  subjects:{matematika:"Matematika", frontend:"Frontend", html:"HTML", css:"CSS", js:"JavaScript", react:"React", backend:"Backend", flutter:"Flutter", kompsavod:"Kompyuter savodxonligi"},
  difficulties:{oson:{name:"Oson", desc:"Kichik sonlar, +/-", descMcq:"Boshlang'ich savollar"}, normal:{name:"Normal", desc:"Kattaroq, 4 amal", descMcq:"O'rta darajadagi savollar"}, qiyin:{name:"Qiyin", desc:"Katta sonlar, tez", descMcq:"Chuqurroq savollar"}},
  arqonSetup:{eyebrow:"Arqon tortish", h2:"O'yinni sozlang", step1:"1. Fan", step2:"2. Qiyinlik", step3:"3. Jamoalar",
    subjAuto:"Avtomatik generatsiya", subjMcq:"Tanlov savollari", subjGroup:"Bir nechta yo'nalish", catBack:"← Fanlar ro'yxatiga",
    teamALabel:"1-jamoa nomi (chap taraf)", teamBLabel:"2-jamoa nomi (o'ng taraf)", teamAPh:"Masalan: Yulduzlar", teamBPh:"Masalan: Sherlar",
    startBtn:"O'yinni boshlash", backSubj:"← Fanni o'zgartirish", backDiff:"← Qiyinlikni o'zgartirish",
    modeLabel:"O'yin rejimi", mode2p:"Ikki kishilik", modeBot:"Kompyuterga qarshi", botName:"Kompyuter"},
  arqonPlay:{answerBtn:"Javob", answerPh:"Javob"},
  arqonResult:{timeUp:"Vaqt tugadi", pulled:"Arqon chegaradan o'tdi", winner:n=>`${n} g'olib!`, draw:"Durrang!", playAgain:"Yana o'ynash", toList:"O'yinlar ro'yxatiga", team1:"1-jamoa", team2:"2-jamoa"},
  savollar:{needLoginT:"Savol qo'shish uchun tizimga kiring", needLoginD:"O'qituvchi sifatida ro'yxatdan o'tgan foydalanuvchilar o'z savollarini qo'shishi mumkin. Bu savollar boshqa o'yinchilarga \"Arqon tortish\", \"Tezkor savollar\" va \"Formula poygasi\" o'yinlarida ko'rinadi.",
    teacherOnlyT:"Bu bo'lim faqat o'qituvchilar uchun", teacherOnlyD:"Siz o'quvchi sifatida ro'yxatdan o'tgansiz, shuning uchun savol qo'sha olmaysiz. Savol qo'shish uchun o'qituvchi sifatida ro'yxatdan o'ting.",
    eyebrow:"Savol qo'shish", h2:"O'z savolingizni qo'shing", lead:"Qo'shgan savolingiz darhol \"Arqon tortish\", \"Tezkor savollar\" va \"Formula poygasi\" o'yinlaridagi tegishli fan va qiyinlik darajasiga qo'shiladi.",
    fanLabel:"Fan", qiyinlikLabel:"Qiyinlik", savolLabel:"Savol matni", savolPh:"Savolni yozing...", variantsLabel:"Javob variantlari (to'g'ri javobni belgilang)", variantPh:l=>`${l}-variant`,
    submitBtn:"Savolni qo'shish", myQuestions:"Mening qo'shgan savollarim", myQEmpty:"Hali savol qo'shmagansiz.", myQLoading:"Yuklanmoqda...", myQError:"Yuklashda xatolik.",
    dbDown:"Ma'lumotlar bazasi mavjud emas.", fillAllErr:"Iltimos savol va barcha 4 ta variantni to'ldiring.", dbDownErr:"Ma'lumotlar bazasi ulanmagan.", savedOk:"Savol muvaffaqiyatli qo'shildi!", saveErr:"Saqlashda xatolik yuz berdi.",
    edit:"Tahrirlash", delete:"O'chirish", save:"Saqlash", cancel:"Bekor qilish", deleteConfirm:"Ushbu savolni o'chirmoqchimisiz?", deleteYes:"Ha, o'chirish", deletedOk:"Savol o'chirildi.", deleteErr:"O'chirishda xatolik yuz berdi.", updateErr:"Yangilashda xatolik yuz berdi."},
  xotira:{eyebrow:"Xotira kartalari", h2:"Juftliklarni toping", setupLead:"Qiyinlik darajasini tanlang.",
    diffDesc:d=>`${d.pairs} juft karta · ${d.time} soniya`, changeDiff:"Darajani almashtirish",
    moves:n=>`Harakatlar: ${n}`, winTitle:"Tabriklaymiz!", winSub:(m,s)=>`${m} harakatda, ${s} soniyada yakunladingiz.`,
    timeUpTitle:"Vaqt tugadi!", timeUpSub:"Mag'lub bo'ldingiz. Qayta urinib ko'ring."},
  reaksiya:{eyebrow:"Tezkor reaksiya", h2:"Reaksiya tezligingizni sinang", lead:"Ekran yashil rangga o'tganda tezroq bosing. 3 ta urinish o'rtacha natija beradi.",
    start:"Boshlash uchun bosing", wait:"Kuting...", go:"HOZIR BOSING!", early:"Erta bosdingiz! Qayta urinib ko'ring",
    round:(ms,n)=>`${ms} ms — Yana bosing (${n}/3)`, avg:ms=>`O'rtacha: ${ms} ms`, retryHint:"Qayta urinish uchun qutini bosing",
    r1:"Chaqmoq tezlik!", r2:"Yaxshi", r3:"O'rtacha", r4:"Sekinroq"},
  pazl:{eyebrow:"15-pazl", h2:"Raqamlarni tartiblang", setupLead:"Qiyinlik darajasini tanlang.",
    diffDesc:d=>`${Math.round(d.time/60)} daqiqa davomida 1 dan 15 gacha raqamlarni tartiblang`, changeDiff:"Darajani almashtirish",
    moves:n=>`Harakatlar: ${n}`, hintLabel:n=>`Yordam (${n})`,
    winTitle:"Yechildi!", winSub:(m,s)=>`${m} harakatda, ${s} soniyada yakunladingiz.`,
    timeUpTitle:"Vaqt tugadi!", timeUpSub:"Mag'lub bo'ldingiz. Qayta urinib ko'ring."},
  speed:{eyebrow:"Tezkor test", h2:"Tezlik bilan bilim sinovi", lead:"Vaqt tugaguncha imkon qadar ko'proq savolga to'g'ri javob bering.",
    setupH2:"Testni sozlang", startBtn:"Testni boshlash",
    scoreLabel:"Ball", streakLabel:"Ketma-ket", best:"Rekord",
    finished:"Vaqt tugadi!", yourScore:n=>`Sizning balingiz: ${n}`, newBest:"Yangi rekord!", playAgain:"Yana urinish", toList:"O'yinlar ro'yxatiga",
    won:"G'olib bo'ldingiz!", lost:"Mag'lub bo'ldingiz", targetInfo:n=>`G'alaba uchun kamida ${n} ta to'g'ri javob kerak edi`, targetLabel:"Maqsad",
    wrongStreakHint:n=>`Jami ${n} marta xato qilsangiz — darhol mag'lub bo'lasiz`, eliminatedInfo:n=>`Siz jami ${n} marta xato qildingiz`,
    readyInfo:(diffName,time)=>`Tanlangan qiyinlik: ${diffName} (${time}s). Boshlash tugmasini bosgach, 1-savol chiqadi — vaqt esa shu savolga javob berganingizdan keyin sanala boshlaydi.`},
  poyga:{eyebrow:"Formula poygasi", h2:"Poygani sozlang", lead:"To'g'ri javob mashinangizni oldinga suradi — chiziqqa birinchi yetgan g'olib bo'ladi!",
    startBtn:"Poygani boshlash", winner:n=>`${n} g'olib!`, draw:"Durrang!", timeUp:"Vaqt tugadi", finishLine:"Chiziqqa yetdi!",
    playAgain:"Yana o'ynash", toList:"O'yinlar ro'yxatiga"},
  target:{eyebrow:"Nishonga urish", h2:"Aniqligingizni sinang", setupLead:"Qiyinlik darajasini tanlang.",
    diffDesc:d=>`${d.time} soniyada ${d.hitsNeeded} ta nishonga uring`, changeDiff:"Darajani almashtirish",
    progress:(h,need)=>`Urishlar: ${h}/${need}`,
    winTitle:"Zo'r natija!", winSub:(h,acc,s)=>`${h} ta nishonga urdingiz, ${acc}% aniqlik, ${s} soniyada.`,
    timeUpTitle:"Vaqt tugadi!", timeUpSub:(h,need)=>`Faqat ${h}/${need} ta nishonga urdingiz. Qayta urinib ko'ring.`},
  snake:{eyebrow:"Ilon o'yini", h2:"Ilonni boshqaring", lead:"Ok tugmalar (yoki barmog'ingiz bilan surish) bilan ilonni boshqaring, mevalarni yeb o'sing — devor yoki o'ziga urilib qolmang.",
    setupLead:"Qiyinlik darajasini tanlang.", changeDiff:"Darajani almashtirish",
    diffDesc:{oson:"Ilon sekin yuradi — mashq qilish uchun qulay.", normal:"O'rtacha tezlik.", qiyin:"Ilon juda tez yuradi — diqqat talab qiladi."},
    score:"Ball", best:"Rekord", start:"Boshlash uchun bosing", over:"O'yin tugadi", restart:"Qayta boshlash", swipeHint:"Boshqarish: ok tugmalar yoki surish, P — pauza",
    recordTitle:"Yangi rekord!", recordSub:s=>`Siz ${s} ball bilan yangi rekord o'rnatdingiz!`,
    overSub:s=>`Siz ${s} ball to'pladingiz.`},
  xo:{eyebrow:"X-0 o'yini", h2:"X-0 o'ynang", lead:"Siz — X, kompyuter — 0. Katakni bosib belgingizni qo'ying, uchtasini qatorga tizib g'alaba qiling.",
    leadTwoPlayer:"1-o'yinchi — X, 2-o'yinchi — 0. Navbat bilan katakni bosib belgingizni qo'ying, uchtasini qatorga tizib g'alaba qiling.",
    chooseMode:"O'yin turini tanlang.", modeComputer:"Kompyuterga qarshi", modeComputerDesc:"Sun'iy intellektga qarshi yakka o'zingiz o'ynang.",
    modeTwoPlayer:"Ikki kishi", modeTwoPlayerDesc:"Bir qurilmada do'stingiz bilan navbatma-navbat o'ynang.", changeMode:"O'yin turini almashtirish",
    setupLead:"Qiyinlik darajasini tanlang.", changeDiff:"Darajani almashtirish",
    diffDesc:{oson:"Kompyuter tasodifiy yuradi — yutish oson.", normal:"Kompyuter aqlli o'ynaydi — g'alaba yoki bloklashni biladi.", qiyin:"Kompyuter mukammal o'ynaydi — eng yaxshi natija durrang."},
    yourTurn:"Sizning navbatingiz", computerTurn:"Kompyuter o'ylamoqda...",
    p1Turn:"1-o'yinchi navbati (X)", p2Turn:"2-o'yinchi navbati (0)",
    winTitle:"Siz yutdingiz!", winSub:"Uchtangizni qatorga tizdingiz. Zo'r o'yin!",
    loseTitle:"Siz yutqazdingiz", loseSub:"Kompyuter g'alaba qildi. Yana urinib ko'ring!",
    p1WinTitle:"1-o'yinchi yutdi!", p1WinSub:"X uchtasini qatorga tizdi. Tabriklaymiz!",
    p2WinTitle:"2-o'yinchi yutdi!", p2WinSub:"0 uchtasini qatorga tizdi. Tabriklaymiz!",
    drawTitle:"Durrang", drawSub:"Hech kim yutmadi. Qiziqarli o'yin bo'ldi!"},
  farq:{eyebrow:"Farqlarni topish", h2:"Ikki rasm orasidagi farqni toping", lead:"Ikkala rasmni solishtiring va ular orasidagi farqlarni bosib toping.",
    setupLead:"Qiyinlik darajasini tanlang.", changeDiff:"Darajani almashtirish",
    diffDesc:d=>`${d.time} soniyada ${d.diffCount} ta farqni toping`,
    progress:(f,need)=>`Topildi: ${f}/${need}`,
    winTitle:"Barcha farqlarni topdingiz!", winSub:s=>`Siz hammasini ${s} soniyada topdingiz. Zo'r natija!`,
    timeUpTitle:"Vaqt tugadi!", timeUpSub:(f,need)=>`Siz ${f}/${need} ta farqni topdingiz. Qayta urinib ko'ring.`},
  tetris:{eyebrow:"Tetris", h2:"Bloklarni tering", lead:"Tushayotgan bloklarni chapga-o'ngga surib va aylantirib, pastda to'liq qatorlar hosil qiling — to'lgan qator darhol g'oyib bo'ladi.",
    setupLead:"Qiyinlik darajasini tanlang.", changeDiff:"Darajani almashtirish",
    diffDesc:{oson:"Bloklar sekin tushadi — mashq qilish uchun qulay.", normal:"O'rtacha tezlik, asta-sekin tezlashadi.", qiyin:"Bloklar tez tushadi va juda tez tezlashadi."},
    score:"Ball", best:"Rekord", level:"Daraja", lines:"Qatorlar", next:"Keyingisi",
    start:"Boshlash uchun bosing", hardDrop:"Zudlik bilan tashlash", pause:"Pauza", resume:"Davom ettirish", pausedTitle:"O'yin pauzada",
    keyHint:"Boshqarish: ok tugmalar (aylantirish uchun ↑), bo'sh joy — tashlash, P — pauza",
    over:"O'yin tugadi",
    recordTitle:"Yangi rekord!", recordSub:s=>`Siz ${s} ball bilan yangi rekord o'rnatdingiz!`,
    overSub:s=>`Siz ${s} ball to'pladingiz.`},
  kross:{eyebrow:"Bilim krossvordi", h2:"Krossvordni yeching", lead:"Har bir qatordagi so'zni toping — belgilangan ustundagi harflar yashirin kalit so'zni hosil qiladi.",
    chooseSubj:"Mavzuni tanlang", pickLead:"Avval mavzuni tanlang — shu mavzuga oid krossvord tuziladi.",
    checkBtn:"Tekshirish", playAgain:"Boshqa mavzu", toList:"O'yinlar ro'yxatiga",
    resultAll:"Ajoyib! Barcha so'zlarni to'g'ri topdingiz!", resultPartial:n=>`${n} ta so'zni to'g'ri topdingiz.`, keyword:w=>`Yashirin so'z: ${w}`},
  detektiv:{eyebrow:"Kod detektivi", h2:"Kod ichidagi xatoni toping", lead:"Har bir kod bo'lagida nima xato ekanligini toping — 3 ta joningiz bor, xato qilsangiz izoh chiqadi.",
    chooseSubj:"Mavzuni tanlang", pickLead:"Avval mavzuni tanlang — shu mavzuga oid savollar tuziladi.", changeSubj:"Mavzuni almashtirish",
    start:"Boshlash", prompt:"Bu kodda qanday xato bor?", question:n=>`${n}-savol / 10`, scoreLabel:"To'g'ri", nextBtn:"Keyingisi", finishBtn:"Natijani ko'rish",
    won:"G'olib bo'ldingiz!", lost:"Mag'lub bo'ldingiz", yourScore:(c,tt)=>`${tt} tadan ${c}ta to'g'ri javob`, playAgain:"Yana urinish", toList:"O'yinlar ro'yxatiga"},
  tezyozish:{eyebrow:"Tez yozish", h2:"Matnni tez va aniq yozing", lead:"Rejimni tanlang, matn tasodifiy tanlanadi — uni imkon qadar tez va xatosiz yozib chiqing.",
    step1:"1-qadam: Rejim", step2:"2-qadam: Sozlama",
    modeRandom:"Tasodifiy so'zlar", modeRandomDesc:"Bir-biriga bog'liq bo'lmagan so'zlar tasodifiy tartibda.",
    modePunct:"Belgili matn", modePunctDesc:"Tinish belgilari, raqamlar va maxsus belgilar bilan matn.",
    modeDict:"Oddiy matn (lug'at)", modeDictDesc:"Haqiqiy, ma'noli gaplardan iborat matn.",
    modeCustom:"O'zim yozaman", modeCustomDesc:"O'zingiz istagan matnni kiriting va shuni mashq qiling.",
    lenShort:"Qisqa", lenMedium:"O'rta", lenLong:"Uzun", wordsUnit:"so'z",
    backMode:"← Rejimni almashtirish",
    customLabel:"Matnni shu yerga kiriting (kamida 20 belgi):", customPh:"Masalan: o'zingiz yozgan yoki sevimli matningizni bu yerga joylashtiring...",
    customTooShort:"Matn juda qisqa — kamida 20 belgi kiriting.",
    startBtn:"Boshlash", typingPh:"Shu yerga yozishni boshlang...",
    wpmLabel:"So'z/daq (WPM)", accLabel:"Aniqlik", timeLabel:"Vaqt", mistakeLabel:"Xato",
    ratingGreat:"Zo'r natija! 🚀", ratingGood:"Yaxshi natija!", ratingOk:"Yomon emas, davom eting!", ratingSlow:"Mashq qilishda davom eting.",
    retryBtn:"Qayta urinish", newBtn:"Yangi matn", toList:"O'yinlar ro'yxatiga", leaveBtn:"Chiqish"},
  rostyolgon:{eyebrow:"Rost yoki Yolg'on", h2:"Dasturlash haqida bilimingizni sinang", lead:"Har bir fikr rost yoki yolg'onligini toping — 3 ta joningiz bor, xato qilsangiz izoh chiqadi.",
    chooseSubj:"Mavzuni tanlang", pickLead:"Avval mavzuni tanlang — shu mavzuga oid savollar tuziladi.", changeSubj:"Mavzuni almashtirish",
    start:"Boshlash", question:n=>`${n}-savol / 10`, trueBtn:"Rost", falseBtn:"Yolg'on", scoreLabel:"To'g'ri", nextBtn:"Keyingisi", finishBtn:"Natijani ko'rish",
    won:"G'olib bo'ldingiz!", lost:"Mag'lub bo'ldingiz", yourScore:(c,tt)=>`${tt} tadan ${c}ta to'g'ri javob`, playAgain:"Yana urinish", toList:"O'yinlar ro'yxatiga"},
  kodquiz:{eyebrow:"Code Quiz", h2:"Kod natijasini toping", lead:"Har bir kod bo'lagi nima natija berishini toping — 3 ta joningiz bor, xato qilsangiz izoh chiqadi.",
    chooseSubj:"Mavzuni tanlang", pickLead:"Avval mavzuni tanlang — shu mavzuga oid savollar tuziladi.", changeSubj:"Mavzuni almashtirish",
    start:"Boshlash", resultQ:"Natija nima bo'ladi?", question:n=>`${n}-savol / 10`, scoreLabel:"To'g'ri", nextBtn:"Keyingisi", finishBtn:"Natijani ko'rish",
    won:"G'olib bo'ldingiz!", lost:"Mag'lub bo'ldingiz", yourScore:(c,tt)=>`${tt} tadan ${c}ta to'g'ri javob`, playAgain:"Yana urinish", toList:"O'yinlar ro'yxatiga"},
  auth:{loginTab:"Kirish", registerTab:"Ro'yxatdan o'tish", emailLabel:"Email", passLabel:"Parol", passPh:"Kamida 4 belgi", nameLabel:"Ismingiz",
    roleLabel:"Rol", roleStudent:"O'quvchi", roleTeacher:"O'qituvchi", loginBtn:"Kirish", registerBtn:"Ro'yxatdan o'tish",
    errFill:"Iltimos barcha maydonlarni to'g'ri to'ldiring (parol kamida 4 belgi).", errDbReg:"Ma'lumotlar bazasi ulanmagan — hozircha ro'yxatdan o'tib bo'lmaydi.",
    errTaken:"Bu email bilan allaqachon ro'yxatdan o'tilgan. Kirish qiling.", errGeneric:"Xatolik yuz berdi. Qayta urinib ko'ring.",
    errFillLogin:"Email va parolni kiriting.", errDbLogin:"Ma'lumotlar bazasi ulanmagan — hozircha kirib bo'lmaydi.",
    errNotFound:"Bunday foydalanuvchi topilmadi.", errWrongPass:"Parol noto'g'ri."},
},
ru:{
  common:{back:"← Назад", loading:"Загрузка...", restart:"Начать заново", pause:"Пауза", resume:"Продолжить", pausedTitle:"Игра на паузе"},
  nav:{home:"Главная", foydali:"Полезные игры", kongilochar:"Развлекательные игры", savollar:"Добавить вопрос", login:"Войти", register:"Регистрация", logoutConfirm:n=>`Выйти из аккаунта ${n}?`},
  dbBanner:"База данных не подключена — игры работают полностью, но регистрация и добавление вопросов временно недоступны.",
  footer:"Agame — знания и игра в одном месте · Демо-платформа", devLabel:"Разработчик",
  home:{eyebrow:"Игровая платформа", h1:"Развивайте ум, отдыхайте с удовольствием.",
    p:"Agame — два вида игр в одном месте: <b>полезные игры</b>, проверяющие знания и скорость, и <b>развлекательные игры</b> для отдыха. Играть можно и без регистрации.",
    eduTag:"Полезные", eduTitle:"Арена знаний", eduDesc:"Отвечайте на вопросы по математике, HTML, CSS, JavaScript, React, Backend, Flutter и компьютерной грамотности и побеждайте в перетягивании каната вместе с командой.", eduBtn:"Смотреть игры →",
    funTag:"Развлечения", funTitle:"Зона отдыха", funDesc:"Проведите время приятно с простыми и увлекательными играми: карточки на память, реакция, пазл.", funBtn:"Смотреть игры →",
    statUsers:"Пользователей", statQuestions:"База вопросов", statGames:"Сыграно игр",
    whyEyebrow:"Почему Agame?", whyH2:"Одна платформа, много возможностей",
    card1T:"Играйте как гость", card1D:"Попробуйте все игры без регистрации — без ограничений.",
    card2T:"Добавляйте свои вопросы", card2D:"Каждый зарегистрированный пользователь может добавлять свои вопросы.",
    card3T:"Разные направления IT", card3D:"Не только математика — HTML, CSS, JavaScript, React, Backend, Flutter и другое.",
},
  badge:{ready:"Можно играть", soon:"Скоро"},
  featured:{sectionEyebrow:"Новая игра", eyebrow:"НОВОЕ", title:"AirCanvas",
    desc:"Рисуйте в воздухе движением руки! Современная игра, которая отслеживает движения вашей руки через веб-камеру и позволяет рисовать прямо на экране — без ручки и мышки.",
    cta:"Играть →", prev:"Назад", next:"Далее"},
  foydali:{eyebrow:"Полезные игры", h2:"Игры для развития ума", lead:"Проверяйте свои знания по математике и другим IT-направлениям, играя и обучаясь.",
    arqonN:"Перетягивание каната", arqonD:"2 команды отвечают на вопросы и тянут канат на свою сторону.",
    krossN:"Кроссворд знаний", krossD:"Разгадывание кроссворда по предметам.",
    speedN:"Быстрый тест", speedD:"Гонка на время — кто ответит на больше вопросов?",
    poygaN:"Гонка формул", poygaD:"Правильный ответ — ваша машина едет быстрее.",
    detN:"Детектив кода", detD:"Найдите ошибку в коде и победите.",
    typingN:"Быстрая печать", typingD:"Печатайте текст как можно быстрее и без ошибок, проверьте свою скорость.",
    tfN:"Правда или ложь", tfD:"Определите, верны ли утверждения о программировании.",
    cqN:"Code Quiz", cqD:"Угадайте результат кода и прочитайте объяснение."},
  kongilochar:{eyebrow:"Развлекательные игры", h2:"Игры для приятного отдыха", lead:"Простые и увлекательные игры, чтобы приятно провести время.",
    memN:"Карточки на память", memD:"Находите пары карточек и тренируйте память.",
    reactN:"Быстрая реакция", reactD:"Нажимайте быстрее, когда экран станет зелёным.",
    pzN:"Пазл 15", pzD:"Расставьте числа по порядку и решите пазл.",
    targetN:"Стрельба по мишеням", targetD:"Проверьте свою точность.",
    snakeN:"Игра змейка", snakeD:"Новая версия классической игры змейка.",
    xoN:"Крестики-нолики", xoD:"Играйте в крестики-нолики против компьютера.",
    farqN:"Найди отличия", farqD:"Найдите отличия между двумя картинками.",
    tetrisN:"Тетрис", tetrisD:"Складывайте блоки и заполняйте ряды."},
  subjects:{matematika:"Математика", frontend:"Frontend", html:"HTML", css:"CSS", js:"JavaScript", react:"React", backend:"Backend", flutter:"Flutter", kompsavod:"Компьютерная грамотность"},
  difficulties:{oson:{name:"Лёгкий", desc:"Маленькие числа, +/-", descMcq:"Базовые вопросы"}, normal:{name:"Средний", desc:"Больше, 4 действия", descMcq:"Вопросы среднего уровня"}, qiyin:{name:"Сложный", desc:"Большие числа, быстро", descMcq:"Более глубокие вопросы"}},
  arqonSetup:{eyebrow:"Перетягивание каната", h2:"Настройте игру", step1:"1. Предмет", step2:"2. Сложность", step3:"3. Команды",
    subjAuto:"Автогенерация", subjMcq:"Вопросы с вариантами", subjGroup:"Несколько направлений", catBack:"← К списку предметов",
    teamALabel:"Название 1-й команды (слева)", teamBLabel:"Название 2-й команды (справа)", teamAPh:"Например: Звёзды", teamBPh:"Например: Львы",
    startBtn:"Начать игру", backSubj:"← Изменить предмет", backDiff:"← Изменить сложность",
    modeLabel:"Режим игры", mode2p:"Два игрока", modeBot:"Против компьютера", botName:"Компьютер"},
  arqonPlay:{answerBtn:"Ответить", answerPh:"Ответ"},
  arqonResult:{timeUp:"Время истекло", pulled:"Канат пересёк границу", winner:n=>`${n} побеждает!`, draw:"Ничья!", playAgain:"Играть снова", toList:"К списку игр", team1:"1-я команда", team2:"2-я команда"},
  savollar:{needLoginT:"Войдите, чтобы добавить вопрос", needLoginD:"Пользователи, зарегистрированные как учитель, могут добавлять свои вопросы. Они будут видны другим игрокам в играх «Перетягивание каната», «Быстрые вопросы» и «Гонка формул».",
    teacherOnlyT:"Этот раздел только для учителей", teacherOnlyD:"Вы зарегистрированы как ученик, поэтому не можете добавлять вопросы. Чтобы добавлять вопросы, зарегистрируйтесь как учитель.",
    eyebrow:"Добавить вопрос", h2:"Добавьте свой вопрос", lead:"Ваш вопрос сразу добавляется в соответствующий предмет и уровень сложности игр «Перетягивание каната», «Быстрые вопросы» и «Гонка формул».",
    fanLabel:"Предмет", qiyinlikLabel:"Сложность", savolLabel:"Текст вопроса", savolPh:"Напишите вопрос...", variantsLabel:"Варианты ответа (отметьте правильный)", variantPh:l=>`Вариант ${l}`,
    submitBtn:"Добавить вопрос", myQuestions:"Мои добавленные вопросы", myQEmpty:"Вы ещё не добавили вопросов.", myQLoading:"Загрузка...", myQError:"Ошибка загрузки.",
    dbDown:"База данных недоступна.", fillAllErr:"Пожалуйста, заполните вопрос и все 4 варианта.", dbDownErr:"База данных не подключена.", savedOk:"Вопрос успешно добавлен!", saveErr:"Ошибка при сохранении.",
    edit:"Редактировать", delete:"Удалить", save:"Сохранить", cancel:"Отмена", deleteConfirm:"Удалить этот вопрос?", deleteYes:"Да, удалить", deletedOk:"Вопрос удалён.", deleteErr:"Ошибка при удалении.", updateErr:"Ошибка при обновлении."},
  xotira:{eyebrow:"Карточки на память", h2:"Найдите пары", setupLead:"Выберите уровень сложности.",
    diffDesc:d=>`${d.pairs} пар · ${d.time} сек`, changeDiff:"Сменить уровень",
    moves:n=>`Ходы: ${n}`, winTitle:"Поздравляем!", winSub:(m,s)=>`Вы завершили за ${m} ходов, ${s} сек.`,
    timeUpTitle:"Время вышло!", timeUpSub:"Вы проиграли. Попробуйте снова."},
  reaksiya:{eyebrow:"Быстрая реакция", h2:"Проверьте скорость реакции", lead:"Нажимайте как можно быстрее, когда экран станет зелёным. 3 попытки для среднего результата.",
    start:"Нажмите, чтобы начать", wait:"Ждите...", go:"НАЖМИТЕ СЕЙЧАС!", early:"Слишком рано! Попробуйте снова",
    round:(ms,n)=>`${ms} мс — Нажмите снова (${n}/3)`, avg:ms=>`Среднее: ${ms} мс`, retryHint:"Нажмите на поле, чтобы попробовать снова",
    r1:"Молниеносно!", r2:"Хорошо", r3:"Средне", r4:"Медленнее"},
  pazl:{eyebrow:"Пазл 15", h2:"Расставьте числа по порядку", setupLead:"Выберите уровень сложности.",
    diffDesc:d=>`Расставьте числа от 1 до 15 за ${Math.round(d.time/60)} мин`, changeDiff:"Сменить уровень",
    moves:n=>`Ходы: ${n}`, hintLabel:n=>`Подсказка (${n})`,
    winTitle:"Решено!", winSub:(m,s)=>`Вы завершили за ${m} ходов, ${s} сек.`,
    timeUpTitle:"Время вышло!", timeUpSub:"Вы проиграли. Попробуйте снова."},
  speed:{eyebrow:"Быстрый тест", h2:"Проверка знаний на скорость", lead:"Отвечайте правильно на как можно больше вопросов, пока не закончится время.",
    setupH2:"Настройте тест", startBtn:"Начать тест",
    scoreLabel:"Очки", streakLabel:"Подряд", best:"Рекорд",
    finished:"Время вышло!", yourScore:n=>`Ваш результат: ${n}`, newBest:"Новый рекорд!", playAgain:"Попробовать снова", toList:"К списку игр",
    won:"Вы победили!", lost:"Вы проиграли", targetInfo:n=>`Для победы нужно было минимум ${n} правильных ответов`, targetLabel:"Цель",
    wrongStreakHint:n=>`Всего ${n} неправильных ответа — и вы сразу проиграете`, eliminatedInfo:n=>`Вы ответили неправильно всего ${n} раза`,
    readyInfo:(diffName,time)=>`Выбранная сложность: ${diffName} (${time}с). После нажатия кнопки старта появится 1-й вопрос — таймер начнёт отсчёт только после ответа на него.`},
  poyga:{eyebrow:"Гонка формул", h2:"Настройте гонку", lead:"Правильный ответ продвигает вашу машину вперёд — кто первым доедет до финиша, тот и победил!",
    startBtn:"Начать гонку", winner:n=>`${n} побеждает!`, draw:"Ничья!", timeUp:"Время вышло", finishLine:"Финиш!",
    playAgain:"Играть снова", toList:"К списку игр"},
  target:{eyebrow:"Стрельба по мишеням", h2:"Проверьте свою точность", setupLead:"Выберите уровень сложности.",
    diffDesc:d=>`Попадите по ${d.hitsNeeded} мишеням за ${d.time} сек`, changeDiff:"Сменить уровень",
    progress:(h,need)=>`Попадания: ${h}/${need}`,
    winTitle:"Отличный результат!", winSub:(h,acc,s)=>`Вы попали ${h} раз, точность ${acc}%, за ${s} сек.`,
    timeUpTitle:"Время вышло!", timeUpSub:(h,need)=>`Вы попали только ${h}/${need} раз. Попробуйте снова.`},
  snake:{eyebrow:"Игра змейка", h2:"Управляйте змейкой", lead:"Управляйте змейкой стрелками (или свайпом на телефоне), ешьте фрукты и растите — не врезайтесь в стену или в себя.",
    setupLead:"Выберите уровень сложности.", changeDiff:"Сменить уровень",
    diffDesc:{oson:"Змейка движется медленно — удобно для тренировки.", normal:"Средняя скорость.", qiyin:"Змейка движется очень быстро — нужна концентрация."},
    score:"Очки", best:"Рекорд", start:"Нажмите, чтобы начать", over:"Игра окончена", restart:"Начать заново", swipeHint:"Управление: стрелки или свайп, P — пауза",
    recordTitle:"Новый рекорд!", recordSub:s=>`Вы установили новый рекорд — ${s} очков!`,
    overSub:s=>`Вы набрали ${s} очков.`},
  xo:{eyebrow:"Игра крестики-нолики", h2:"Играйте в крестики-нолики", lead:"Вы — X, компьютер — O. Нажмите на клетку, чтобы поставить свой знак, и соберите три в ряд, чтобы победить.",
    leadTwoPlayer:"Игрок 1 — X, игрок 2 — O. По очереди нажимайте на клетку, чтобы поставить свой знак, и соберите три в ряд, чтобы победить.",
    chooseMode:"Выберите режим игры.", modeComputer:"Против компьютера", modeComputerDesc:"Играйте в одиночку против компьютера.",
    modeTwoPlayer:"Два игрока", modeTwoPlayerDesc:"Играйте по очереди с другом на одном устройстве.", changeMode:"Сменить режим игры",
    setupLead:"Выберите уровень сложности.", changeDiff:"Сменить уровень",
    diffDesc:{oson:"Компьютер ходит случайно — выиграть легко.", normal:"Компьютер играет разумно — умеет побеждать и блокировать.", qiyin:"Компьютер играет безупречно — лучший результат — ничья."},
    yourTurn:"Ваш ход", computerTurn:"Компьютер думает...",
    p1Turn:"Ход игрока 1 (X)", p2Turn:"Ход игрока 2 (O)",
    winTitle:"Вы выиграли!", winSub:"Вы собрали три в ряд. Отличная игра!",
    loseTitle:"Вы проиграли", loseSub:"Победил компьютер. Попробуйте снова!",
    p1WinTitle:"Игрок 1 победил!", p1WinSub:"X выстроил три в ряд. Поздравляем!",
    p2WinTitle:"Игрок 2 победил!", p2WinSub:"O выстроил три в ряд. Поздравляем!",
    drawTitle:"Ничья", drawSub:"Никто не выиграл. Интересная игра!"},
  farq:{eyebrow:"Найди отличия", h2:"Найдите отличия между картинками", lead:"Сравните две картинки и найдите отличия, нажимая на них.",
    setupLead:"Выберите уровень сложности.", changeDiff:"Сменить уровень",
    diffDesc:d=>`Найдите ${d.diffCount} отличий за ${d.time} секунд`,
    progress:(f,need)=>`Найдено: ${f}/${need}`,
    winTitle:"Вы нашли все отличия!", winSub:s=>`Вы справились за ${s} секунд. Отличный результат!`,
    timeUpTitle:"Время вышло!", timeUpSub:(f,need)=>`Вы нашли ${f}/${need} отличий. Попробуйте снова.`},
  tetris:{eyebrow:"Тетрис", h2:"Складывайте блоки", lead:"Двигайте и вращайте падающие блоки, чтобы заполнить ряды внизу — заполненный ряд сразу исчезает.",
    setupLead:"Выберите уровень сложности.", changeDiff:"Сменить уровень",
    diffDesc:{oson:"Блоки падают медленно — удобно для тренировки.", normal:"Средняя скорость, постепенно ускоряется.", qiyin:"Блоки падают быстро и ускоряются очень резко."},
    score:"Очки", best:"Рекорд", level:"Уровень", lines:"Ряды", next:"Далее",
    start:"Нажмите, чтобы начать", hardDrop:"Мгновенно бросить", pause:"Пауза", resume:"Продолжить", pausedTitle:"Игра на паузе",
    keyHint:"Управление: стрелки (↑ — поворот), пробел — бросить, P — пауза",
    over:"Игра окончена",
    recordTitle:"Новый рекорд!", recordSub:s=>`Вы установили новый рекорд — ${s} очков!`,
    overSub:s=>`Вы набрали ${s} очков.`},
  kross:{eyebrow:"Кроссворд знаний", h2:"Решите кроссворд", lead:"Найдите слово в каждой строке — буквы в выделенном столбце образуют скрытое ключевое слово.",
    chooseSubj:"Выберите тему", pickLead:"Сначала выберите тему — кроссворд будет составлен по ней.",
    checkBtn:"Проверить", playAgain:"Другая тема", toList:"К списку игр",
    resultAll:"Отлично! Вы правильно угадали все слова!", resultPartial:n=>`Вы правильно угадали ${n} слов.`, keyword:w=>`Скрытое слово: ${w}`},
  detektiv:{eyebrow:"Детектив кода", h2:"Найдите ошибку в коде", lead:"Определите, что не так в каждом фрагменте кода — у вас 3 жизни, объяснение появится при ошибке.",
    chooseSubj:"Выберите тему", pickLead:"Сначала выберите тему — вопросы будут подобраны по ней.", changeSubj:"Сменить тему",
    start:"Начать", prompt:"Что не так в этом коде?", question:n=>`Вопрос ${n} / 10`, scoreLabel:"Правильно", nextBtn:"Далее", finishBtn:"Посмотреть результат",
    won:"Вы победили!", lost:"Вы проиграли", yourScore:(c,tt)=>`${c} из ${tt} правильных ответов`, playAgain:"Играть снова", toList:"К списку игр"},
  tezyozish:{eyebrow:"Быстрая печать", h2:"Печатайте текст быстро и точно", lead:"Выберите режим, появится текст — напечатайте его максимально быстро и без ошибок.",
    step1:"Шаг 1: Режим", step2:"Шаг 2: Настройка",
    modeRandom:"Случайные слова", modeRandomDesc:"Не связанные между собой слова в случайном порядке.",
    modePunct:"Текст со знаками", modePunctDesc:"Текст со знаками препинания, цифрами и символами.",
    modeDict:"Обычный текст (словарь)", modeDictDesc:"Текст из настоящих, осмысленных предложений.",
    modeCustom:"Свой текст", modeCustomDesc:"Введите свой текст и тренируйтесь на нём.",
    lenShort:"Короткий", lenMedium:"Средний", lenLong:"Длинный", wordsUnit:"слов",
    backMode:"← Сменить режим",
    customLabel:"Введите текст здесь (не менее 20 символов):", customPh:"Например, вставьте сюда свой любимый текст...",
    customTooShort:"Текст слишком короткий — минимум 20 символов.",
    startBtn:"Начать", typingPh:"Начните печатать здесь...",
    wpmLabel:"Слов/мин (WPM)", accLabel:"Точность", timeLabel:"Время", mistakeLabel:"Ошибки",
    ratingGreat:"Отличный результат! 🚀", ratingGood:"Хороший результат!", ratingOk:"Неплохо, продолжайте!", ratingSlow:"Продолжайте тренироваться.",
    retryBtn:"Повторить", newBtn:"Новый текст", toList:"К списку игр", leaveBtn:"Выход"},
  rostyolgon:{eyebrow:"Правда или ложь", h2:"Проверьте свои знания о программировании", lead:"Определите, верно или неверно каждое утверждение — у вас 3 жизни, объяснение появится при ошибке.",
    chooseSubj:"Выберите тему", pickLead:"Сначала выберите тему — вопросы будут подобраны по ней.", changeSubj:"Сменить тему",
    start:"Начать", question:n=>`Вопрос ${n} / 10`, trueBtn:"Правда", falseBtn:"Ложь", scoreLabel:"Правильно", nextBtn:"Далее", finishBtn:"Посмотреть результат",
    won:"Вы победили!", lost:"Вы проиграли", yourScore:(c,tt)=>`${c} из ${tt} правильных ответов`, playAgain:"Играть снова", toList:"К списку игр"},
  kodquiz:{eyebrow:"Code Quiz", h2:"Угадайте результат кода", lead:"Определите, что выведет каждый фрагмент кода — у вас 3 жизни, объяснение появится при ошибке.",
    chooseSubj:"Выберите тему", pickLead:"Сначала выберите тему — вопросы будут подобраны по ней.", changeSubj:"Сменить тему",
    start:"Начать", resultQ:"Каким будет результат?", question:n=>`Вопрос ${n} / 10`, scoreLabel:"Правильно", nextBtn:"Далее", finishBtn:"Посмотреть результат",
    won:"Вы победили!", lost:"Вы проиграли", yourScore:(c,tt)=>`${c} из ${tt} правильных ответов`, playAgain:"Играть снова", toList:"К списку игр"},
  auth:{loginTab:"Вход", registerTab:"Регистрация", emailLabel:"Email", passLabel:"Пароль", passPh:"Минимум 4 символа", nameLabel:"Ваше имя",
    roleLabel:"Роль", roleStudent:"Ученик", roleTeacher:"Учитель", loginBtn:"Войти", registerBtn:"Зарегистрироваться",
    errFill:"Пожалуйста, заполните все поля правильно (пароль минимум 4 символа).", errDbReg:"База данных не подключена — регистрация пока недоступна.",
    errTaken:"Этот email уже зарегистрирован. Войдите в систему.", errGeneric:"Произошла ошибка. Попробуйте снова.",
    errFillLogin:"Введите email и пароль.", errDbLogin:"База данных не подключена — вход пока недоступен.",
    errNotFound:"Пользователь не найден.", errWrongPass:"Неверный пароль."},
},
en:{
  common:{back:"← Back", loading:"Loading...", restart:"Restart", pause:"Pause", resume:"Resume", pausedTitle:"Game paused"},
  nav:{home:"Home", foydali:"Learning games", kongilochar:"Fun games", savollar:"Add question", login:"Log in", register:"Sign up", logoutConfirm:n=>`Log out of ${n}'s account?`},
  dbBanner:"Database is not connected — games work fully, but sign-up and adding questions are temporarily unavailable.",
  footer:"Agame — knowledge and games in one place · Demo platform", devLabel:"Developer",
  home:{eyebrow:"Game platform", h1:"Sharpen your mind, lighten your mood.",
    p:"Agame brings two kinds of games together: <b>learning games</b> that test knowledge and speed, and <b>fun games</b> for relaxing. You can play fully without signing up.",
    eduTag:"Learning", eduTitle:"Knowledge arena", eduDesc:"Answer questions on math, HTML, CSS, JavaScript, React, Backend, Flutter and computer literacy, and win the tug-of-war with your team.", eduBtn:"Browse games →",
    funTag:"Fun", funTitle:"Playground", funDesc:"Spend your time enjoyably with simple, fun games like memory cards, reaction speed and puzzles.", funBtn:"Browse games →",
    statUsers:"Users", statQuestions:"Question bank", statGames:"Games played",
    whyEyebrow:"Why Agame?", whyH2:"One platform, many possibilities",
    card1T:"Play as a guest", card1D:"Try every game with no sign-up and no limits.",
    card2T:"Add your own questions", card2D:"Any signed-up user can add their own questions.",
    card3T:"Many IT subjects", card3D:"Not just math — HTML, CSS, JavaScript, React, Backend, Flutter and more.",
},
  badge:{ready:"Play now", soon:"Coming soon"},
  featured:{sectionEyebrow:"New game", eyebrow:"NEW", title:"AirCanvas",
    desc:"Draw in the air with hand movements! A modern game that tracks your hand through your webcam and lets you draw right on the screen — no pen or mouse needed.",
    cta:"Play →", prev:"Previous", next:"Next"},
  foydali:{eyebrow:"Learning games", h2:"Games that sharpen your mind", lead:"Test your knowledge of math and other IT subjects while playing and learning.",
    arqonN:"Tug of war", arqonD:"2 teams answer questions and pull the rope to their side.",
    krossN:"Knowledge crossword", krossD:"A crossword game based on school subjects.",
    speedN:"Speed quiz", speedD:"A race against time — who answers the most questions?",
    poygaN:"Formula race", poygaD:"A correct answer makes your car go faster.",
    detN:"Code detective", detD:"Find the bug in the code and win.",
    typingN:"Speed typing", typingD:"Type the text as fast and accurately as you can, and test your speed.",
    tfN:"True or False", tfD:"Decide whether programming statements are true or false.",
    cqN:"Code Quiz", cqD:"Guess what the code outputs and read the explanation."},
  kongilochar:{eyebrow:"Fun games", h2:"Fun games to unwind", lead:"Simple, enjoyable games to spend your time pleasantly.",
    memN:"Memory cards", memD:"Find matching pairs and test your memory.",
    reactN:"Quick reaction", reactD:"Click as fast as you can when the screen turns green.",
    pzN:"15 puzzle", pzD:"Arrange the numbers in order to solve the puzzle.",
    targetN:"Target practice", targetD:"Put your accuracy to the test.",
    snakeN:"Snake game", snakeD:"A fresh take on the classic snake game.",
    xoN:"Tic-tac-toe", xoD:"Play tic-tac-toe against the computer.",
    farqN:"Spot the difference", farqD:"Find the differences between two pictures.",
    tetrisN:"Tetris", tetrisD:"Stack the blocks and complete rows."},
  subjects:{matematika:"Math", frontend:"Frontend", html:"HTML", css:"CSS", js:"JavaScript", react:"React", backend:"Backend", flutter:"Flutter", kompsavod:"Computer literacy"},
  difficulties:{oson:{name:"Easy", desc:"Small numbers, +/-", descMcq:"Beginner questions"}, normal:{name:"Normal", desc:"Bigger, 4 operations", descMcq:"Intermediate questions"}, qiyin:{name:"Hard", desc:"Big numbers, fast", descMcq:"Deeper questions"}},
  arqonSetup:{eyebrow:"Tug of war", h2:"Set up the game", step1:"1. Subject", step2:"2. Difficulty", step3:"3. Teams",
    subjAuto:"Auto-generated", subjMcq:"Multiple choice", subjGroup:"Multiple tracks", catBack:"← Back to subjects",
    teamALabel:"Team 1 name (left side)", teamBLabel:"Team 2 name (right side)", teamAPh:"e.g. Stars", teamBPh:"e.g. Lions",
    startBtn:"Start game", backSubj:"← Change subject", backDiff:"← Change difficulty",
    modeLabel:"Game mode", mode2p:"Two players", modeBot:"Vs computer", botName:"Computer"},
  arqonPlay:{answerBtn:"Answer", answerPh:"Answer"},
  arqonResult:{timeUp:"Time's up", pulled:"The rope crossed the line", winner:n=>`${n} wins!`, draw:"Draw!", playAgain:"Play again", toList:"Back to games", team1:"Team 1", team2:"Team 2"},
  savollar:{needLoginT:"Sign in to add a question", needLoginD:"Users registered as a teacher can add their own questions. They'll appear to other players in Tug of War, Speed Quiz, and Formula Race.",
    teacherOnlyT:"This section is for teachers only", teacherOnlyD:"You're signed up as a student, so you can't add questions. Sign up as a teacher to add questions.",
    eyebrow:"Add question", h2:"Add your own question", lead:"Your question is added immediately to the matching subject and difficulty in Tug of War, Speed Quiz, and Formula Race.",
    fanLabel:"Subject", qiyinlikLabel:"Difficulty", savolLabel:"Question text", savolPh:"Write your question...", variantsLabel:"Answer options (mark the correct one)", variantPh:l=>`Option ${l}`,
    submitBtn:"Add question", myQuestions:"Questions I've added", myQEmpty:"You haven't added any questions yet.", myQLoading:"Loading...", myQError:"Error loading.",
    dbDown:"Database unavailable.", fillAllErr:"Please fill in the question and all 4 options.", dbDownErr:"Database not connected.", savedOk:"Question added successfully!", saveErr:"Error saving.",
    edit:"Edit", delete:"Delete", save:"Save", cancel:"Cancel", deleteConfirm:"Delete this question?", deleteYes:"Yes, delete", deletedOk:"Question deleted.", deleteErr:"Failed to delete.", updateErr:"Failed to update."},
  xotira:{eyebrow:"Memory cards", h2:"Find the matching pairs", setupLead:"Choose a difficulty level.",
    diffDesc:d=>`${d.pairs} pairs · ${d.time}s`, changeDiff:"Change difficulty",
    moves:n=>`Moves: ${n}`, winTitle:"Congrats!", winSub:(m,s)=>`You finished in ${m} moves, ${s}s.`,
    timeUpTitle:"Time's up!", timeUpSub:"You lost. Try again."},
  reaksiya:{eyebrow:"Quick reaction", h2:"Test your reaction speed", lead:"Click as fast as you can when the screen turns green. 3 attempts give an average result.",
    start:"Click to start", wait:"Wait...", go:"CLICK NOW!", early:"Too early! Try again",
    round:(ms,n)=>`${ms} ms — Click again (${n}/3)`, avg:ms=>`Average: ${ms} ms`, retryHint:"Click the box to try again",
    r1:"Lightning fast!", r2:"Good", r3:"Average", r4:"Slower"},
  pazl:{eyebrow:"15 puzzle", h2:"Put the numbers in order", setupLead:"Choose a difficulty level.",
    diffDesc:d=>`Arrange numbers 1 to 15 in ${Math.round(d.time/60)} minutes`, changeDiff:"Change difficulty",
    moves:n=>`Moves: ${n}`, hintLabel:n=>`Hint (${n})`,
    winTitle:"Solved!", winSub:(m,s)=>`You finished in ${m} moves, ${s}s.`,
    timeUpTitle:"Time's up!", timeUpSub:"You lost. Try again."},
  speed:{eyebrow:"Speed quiz", h2:"Race against the clock", lead:"Answer as many questions correctly as you can before time runs out.",
    setupH2:"Set up the quiz", startBtn:"Start quiz",
    scoreLabel:"Score", streakLabel:"Streak", best:"Best",
    finished:"Time's up!", yourScore:n=>`Your score: ${n}`, newBest:"New best!", playAgain:"Try again", toList:"Back to games",
    won:"You won!", lost:"You lost", targetInfo:n=>`You needed at least ${n} correct answers to win`, targetLabel:"Target",
    wrongStreakHint:n=>`${n} wrong answers total and you lose instantly`, eliminatedInfo:n=>`You got ${n} answers wrong in total`,
    readyInfo:(diffName,time)=>`Selected difficulty: ${diffName} (${time}s). Question 1 appears once you press start — the timer only starts counting after you answer it.`},
  poyga:{eyebrow:"Formula race", h2:"Set up the race", lead:"A correct answer moves your car forward — whoever crosses the finish line first wins!",
    startBtn:"Start race", winner:n=>`${n} wins!`, draw:"Draw!", timeUp:"Time's up", finishLine:"Finished!",
    playAgain:"Play again", toList:"Back to games"},
  target:{eyebrow:"Target practice", h2:"Put your accuracy to the test", setupLead:"Choose a difficulty level.",
    diffDesc:d=>`Hit ${d.hitsNeeded} targets in ${d.time}s`, changeDiff:"Change difficulty",
    progress:(h,need)=>`Hits: ${h}/${need}`,
    winTitle:"Great job!", winSub:(h,acc,s)=>`You hit ${h} targets, ${acc}% accuracy, in ${s}s.`,
    timeUpTitle:"Time's up!", timeUpSub:(h,need)=>`You only hit ${h}/${need}. Try again.`},
  snake:{eyebrow:"Snake game", h2:"Steer the snake", lead:"Steer the snake with the arrow keys (or swipe on a phone), eat the fruit and grow — don't hit the wall or yourself.",
    setupLead:"Choose a difficulty level.", changeDiff:"Change level",
    diffDesc:{oson:"The snake moves slowly — good for practice.", normal:"Medium speed.", qiyin:"The snake moves very fast — stay focused."},
    score:"Score", best:"Best", start:"Click to start", over:"Game over", restart:"Restart", swipeHint:"Controls: arrow keys or swipe, P — pause",
    recordTitle:"New record!", recordSub:s=>`You set a new record with ${s} points!`,
    overSub:s=>`You scored ${s} points.`},
  xo:{eyebrow:"Tic-tac-toe", h2:"Play tic-tac-toe", lead:"You're X, the computer is O. Click a square to place your mark and line up three to win.",
    leadTwoPlayer:"Player 1 is X, player 2 is O. Take turns clicking a square to place your mark and line up three to win.",
    chooseMode:"Choose a game mode.", modeComputer:"Vs computer", modeComputerDesc:"Play solo against the computer.",
    modeTwoPlayer:"Two players", modeTwoPlayerDesc:"Take turns with a friend on the same device.", changeMode:"Change game mode",
    setupLead:"Choose a difficulty level.", changeDiff:"Change level",
    diffDesc:{oson:"The computer moves randomly — easy to beat.", normal:"The computer plays smart — it knows how to win and block.", qiyin:"The computer plays perfectly — the best you can get is a draw."},
    yourTurn:"Your turn", computerTurn:"Computer is thinking...",
    p1Turn:"Player 1's turn (X)", p2Turn:"Player 2's turn (O)",
    winTitle:"You won!", winSub:"You lined up three in a row. Great game!",
    loseTitle:"You lost", loseSub:"The computer won. Try again!",
    p1WinTitle:"Player 1 wins!", p1WinSub:"X lined up three in a row. Congrats!",
    p2WinTitle:"Player 2 wins!", p2WinSub:"O lined up three in a row. Congrats!",
    drawTitle:"Draw", drawSub:"Nobody won. Good game!"},
  farq:{eyebrow:"Spot the difference", h2:"Find the differences between the pictures", lead:"Compare the two pictures and click on every difference you spot.",
    setupLead:"Choose a difficulty level.", changeDiff:"Change level",
    diffDesc:d=>`Find ${d.diffCount} differences in ${d.time} seconds`,
    progress:(f,need)=>`Found: ${f}/${need}`,
    winTitle:"You found all the differences!", winSub:s=>`You did it in ${s} seconds. Great job!`,
    timeUpTitle:"Time's up!", timeUpSub:(f,need)=>`You found ${f}/${need} differences. Try again.`},
  tetris:{eyebrow:"Tetris", h2:"Stack the blocks", lead:"Move and rotate the falling blocks to fill complete rows at the bottom — a full row disappears right away.",
    setupLead:"Choose a difficulty level.", changeDiff:"Change difficulty",
    diffDesc:{oson:"Blocks fall slowly — good for practice.", normal:"Medium speed, speeds up gradually.", qiyin:"Blocks fall fast and speed up quickly."},
    score:"Score", best:"Best", level:"Level", lines:"Lines", next:"Next",
    start:"Click to start", hardDrop:"Hard drop", pause:"Pause", resume:"Resume", pausedTitle:"Game paused",
    keyHint:"Controls: arrow keys (↑ to rotate), space — hard drop, P — pause",
    over:"Game over",
    recordTitle:"New record!", recordSub:s=>`You set a new record with ${s} points!`,
    overSub:s=>`You scored ${s} points.`},
  kross:{eyebrow:"Knowledge crossword", h2:"Solve the crossword", lead:"Find the word in each row — the letters in the highlighted column spell a hidden keyword.",
    chooseSubj:"Choose a topic", pickLead:"First choose a topic — the crossword will be built around it.",
    checkBtn:"Check", playAgain:"Different topic", toList:"Back to games",
    resultAll:"Great! You got every word right!", resultPartial:n=>`You got ${n} words right.`, keyword:w=>`Hidden word: ${w}`},
  detektiv:{eyebrow:"Code detective", h2:"Find the bug in the code", lead:"Figure out what's wrong with each code snippet — you have 3 lives, and a mistake shows the explanation.",
    chooseSubj:"Choose a topic", pickLead:"First choose a topic — the questions will match it.", changeSubj:"Change topic",
    start:"Start", prompt:"What's wrong with this code?", question:n=>`Question ${n} / 10`, scoreLabel:"Correct", nextBtn:"Next", finishBtn:"See result",
    won:"You won!", lost:"You lost", yourScore:(c,tt)=>`${c} out of ${tt} correct answers`, playAgain:"Play again", toList:"Back to games"},
  tezyozish:{eyebrow:"Speed typing", h2:"Type the text fast and accurately", lead:"Choose a mode, a text appears — type it as fast and accurately as you can.",
    step1:"Step 1: Mode", step2:"Step 2: Settings",
    modeRandom:"Random words", modeRandomDesc:"Unrelated words in random order.",
    modePunct:"Text with symbols", modePunctDesc:"Text with punctuation, numbers and special symbols.",
    modeDict:"Plain text (dictionary)", modeDictDesc:"Text made of real, meaningful sentences.",
    modeCustom:"My own text", modeCustomDesc:"Enter your own text and practice on it.",
    lenShort:"Short", lenMedium:"Medium", lenLong:"Long", wordsUnit:"words",
    backMode:"← Change mode",
    customLabel:"Enter your text here (at least 20 characters):", customPh:"For example, paste your favorite text here...",
    customTooShort:"Text is too short — at least 20 characters.",
    startBtn:"Start", typingPh:"Start typing here...",
    wpmLabel:"Words/min (WPM)", accLabel:"Accuracy", timeLabel:"Time", mistakeLabel:"Mistakes",
    ratingGreat:"Great result! 🚀", ratingGood:"Good result!", ratingOk:"Not bad, keep going!", ratingSlow:"Keep practicing.",
    retryBtn:"Retry", newBtn:"New text", toList:"To game list", leaveBtn:"Leave"},
  rostyolgon:{eyebrow:"True or False", h2:"Test your programming knowledge", lead:"Decide whether each statement is true or false — you have 3 lives, and a mistake shows the explanation.",
    chooseSubj:"Choose a topic", pickLead:"First choose a topic — the questions will match it.", changeSubj:"Change topic",
    start:"Start", question:n=>`Question ${n} / 10`, trueBtn:"True", falseBtn:"False", scoreLabel:"Correct", nextBtn:"Next", finishBtn:"See result",
    won:"You won!", lost:"You lost", yourScore:(c,tt)=>`${c} out of ${tt} correct answers`, playAgain:"Play again", toList:"Back to games"},
  kodquiz:{eyebrow:"Code Quiz", h2:"Guess the code's output", lead:"Work out what each code snippet outputs — you have 3 lives, and a mistake shows the explanation.",
    chooseSubj:"Choose a topic", pickLead:"First choose a topic — the questions will match it.", changeSubj:"Change topic",
    start:"Start", resultQ:"What will the result be?", question:n=>`Question ${n} / 10`, scoreLabel:"Correct", nextBtn:"Next", finishBtn:"See result",
    won:"You won!", lost:"You lost", yourScore:(c,tt)=>`${c} out of ${tt} correct answers`, playAgain:"Play again", toList:"Back to games"},
  auth:{loginTab:"Log in", registerTab:"Sign up", emailLabel:"Email", passLabel:"Password", passPh:"At least 4 characters", nameLabel:"Your name",
    roleLabel:"Role", roleStudent:"Student", roleTeacher:"Teacher", loginBtn:"Log in", registerBtn:"Sign up",
    errFill:"Please fill in all fields correctly (password at least 4 characters).", errDbReg:"Database not connected — sign-up isn't available right now.",
    errTaken:"This email is already registered. Please log in.", errGeneric:"Something went wrong. Please try again.",
    errFillLogin:"Enter your email and password.", errDbLogin:"Database not connected — login isn't available right now.",
    errNotFound:"No user found.", errWrongPass:"Wrong password."},
},
};
function L(){ return TRANSLATIONS[state.lang] || TRANSLATIONS.uz; }

/* ===================== STATE ===================== */

const FEATURED_GAMES = [
  {id:"aircanvas", href:"https://agame.uz/aircanvas/"},
];

const state = {
  route: "home",
  user: loadSession(),
  db: null,
  dbReady: false,
  arqon: null,
  authTab: "login",
  authRole: "oquvchi",
  authErr: "",
  teacherErr: "",
  teacherOk: "",
  teacherForm: {subject:"html", difficulty:"oson", q:"", opts:["","","",""], correct:0},
  myQCache: null,
  myQEditId: null,
  myQEditForm: null,
  myQDeleteId: null,
  myQErr: "",
  myQOk: "",
  lang: loadLang(),
  theme: loadTheme(),
  musicOn: loadMusicPref(),
  mobileNavOpen: false,
};

function loadSession(){
  try{ const raw = localStorage.getItem("aqlarena_session"); return raw? JSON.parse(raw): null; }catch(e){ return null; }
}
function saveSession(u){
  state.user = u;
  try{ if(u) localStorage.setItem("aqlarena_session", JSON.stringify(u)); else localStorage.removeItem("aqlarena_session"); }catch(e){}
}
function loadLang(){
  try{ const v = localStorage.getItem("aqlarena_lang"); if(v==="uz"||v==="ru"||v==="en") return v; }catch(e){}
  return "uz";
}
function setLang(l){ state.lang=l; try{localStorage.setItem("aqlarena_lang",l);}catch(e){} renderNav(); render(); }
function loadTheme(){
  try{ const v = localStorage.getItem("aqlarena_theme"); if(v==="dark"||v==="light") return v; }catch(e){}
  return "auto";
}
function applyTheme(){
  const root = document.documentElement;
  if(state.theme==="dark") root.setAttribute("data-theme","dark");
  else if(state.theme==="light") root.setAttribute("data-theme","light");
  else root.removeAttribute("data-theme");
}
function toggleTheme(){
  const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const effectiveDark = state.theme==="dark" || (state.theme==="auto" && sysDark);
  state.theme = effectiveDark ? "light" : "dark";
  try{ localStorage.setItem("aqlarena_theme", state.theme); }catch(e){}
  applyTheme(); renderNav();
}
/* ===================== MUSIC (Web Audio, synthesized — no external files) ===================== */
function loadMusicPref(){
  try{ const v = localStorage.getItem("aqlarena_music"); if(v==="0") return false; }catch(e){}
  return true;
}
let audioCtx=null;
const SFX_MUSIC_SRC = "assets/audio/music.mp3";
// Real recorded in-game backing track (looped), replacing a synth chiptune loop.
let bgMusicEl = null;
function ensureAudioCtx(){
  try{
    if(!audioCtx){ audioCtx = new (window.AudioContext||window.webkitAudioContext)(); }
    if(audioCtx.state==="suspended") audioCtx.resume();
  }catch(e){ audioCtx=null; }
  return audioCtx;
}
function playTone(freq, time, dur, type, vol){
  if(!audioCtx || !freq) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(vol, time+0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time+dur*0.92);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(time); osc.stop(time+dur+0.02);
}
function ensureBgMusicEl(){
  if(!bgMusicEl){
    bgMusicEl = new Audio(SFX_MUSIC_SRC);
    bgMusicEl.loop = true;
    bgMusicEl.volume = 0.35;
  }
  return bgMusicEl;
}
function startMusic(){
  if(!state.musicOn) return;
  const el = ensureBgMusicEl();
  try{ el.currentTime = 0; }catch(e){}
  el.play().catch(()=>{});
}
function stopMusic(){
  if(bgMusicEl){ try{ bgMusicEl.pause(); }catch(e){} }
}
function toggleMusic(){
  state.musicOn = !state.musicOn;
  try{ localStorage.setItem("aqlarena_music", state.musicOn?"1":"0"); }catch(e){}
  if(state.musicOn && MUSIC_ROUTES.includes(state.route)) startMusic(); else stopMusic();
  const btn = document.getElementById("musicToggle");
  if(btn) btn.innerHTML = state.musicOn ? icon('volume',18) : icon('volumeMute',18);
}
const SFX_VICTORY_SRC = "assets/audio/victory.mp3";
const SFX_DEFEAT_SRC = "assets/audio/defeat.mp3";
let victoryAudioEl = null;
// Real recorded victory cue (replaces a synth fanfare); a draw keeps a short neutral two-note tone instead.
// Every play constructs a brand-new <audio> element straight from the audio file —
// no Blob-URL caching, no "prime the channel first" trick, no reusing one
// long-lived element across plays. Those were all speculative fixes for a bug
// that turned out to be something else entirely (this origin's Sound permission
// was set to Block in the browser — nothing this page's code could control).
// A fresh, plain `new Audio(...)` per play is the simplest, most standard
// pattern and the least likely to interact badly with any single browser's
// quirks; the file is small and cached after the first play.
function playVictoryJingle(isDraw){
  if(isDraw){
    const ctx = ensureAudioCtx();
    if(!ctx) return;
    let t = ctx.currentTime + 0.05;
    [392.00,349.23].forEach(f=>{ playTone(f, t, 0.24, "square", 0.07); t += 0.17; });
    return;
  }
  stopDefeatAudio();
  stopVictoryAudio();
  try{
    const el = new Audio(SFX_VICTORY_SRC);
    el.volume = 0.65;
    el.play().catch(()=>{});
    victoryAudioEl = el;
  }catch(e){}
}
function stopVictoryAudio(){
  if(victoryAudioEl){ try{ victoryAudioEl.pause(); }catch(e){} }
}
let defeatAudioEl = null;
// Real recorded "sad violin" cue for defeat screens (replaces a synth jingle).
// Same plain fresh-element-per-play pattern as the victory cue above.
function stopDefeatAudio(){
  if(defeatAudioEl){ try{ defeatAudioEl.pause(); }catch(e){} }
}
function playDefeatJingle(){
  stopDefeatAudio();
  stopVictoryAudio();
  try{
    const el = new Audio(SFX_DEFEAT_SRC);
    el.volume = 0.6;
    el.play().catch(()=>{});
    defeatAudioEl = el;
  }catch(e){}
}
// Short urgent tick, played once per second during the last few seconds of the Speed Quiz timer.
function playCountdownBeep(){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.02;
  playTone(880.00, t, 0.11, "square", 0.09);
}
function emailKey(email){ return email.trim().toLowerCase().replace(/[^a-z0-9_\-.~:@+]/g,"_"); }
async function sha256(text){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("aqlarena::"+text));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
// Puts any teacher-submitted questions at the front of the pool (shuffled
// among themselves), with the built-in ones shuffled in after. Without this,
// a teacher's own question could sit anywhere in a much larger built-in pool
// and might never actually come up during a short round — this guarantees it
// shows up near the very start of play instead.
function prioritizedShuffle(pool){
  const teacher = pool.filter(q=>q.source==="teacher");
  const overflow = pool.filter(q=>q.source==="overflow");
  const rest = pool.filter(q=>q.source!=="teacher" && q.source!=="overflow");
  return shuffle(teacher).concat(shuffle(rest)).concat(shuffle(overflow));
}
// Reshuffles a question pool for a new lap through it, but makes sure the very
// first question of the new lap isn't the same one that just finished the
// previous lap (a plain reshuffle can otherwise land the same item back at
// index 0, which reads as the game repeating a question).
function reshuffleNoRepeat(pool, lastItem){
  const arr = shuffle(pool);
  if(arr.length>1 && lastItem && arr[0].q===lastItem.q){
    const j = 1 + Math.floor(Math.random()*(arr.length-1));
    [arr[0], arr[j]] = [arr[j], arr[0]];
  }
  return arr;
}
// Re-shuffles an MCQ item's answer options (and remaps the correct index)
// so the correct answer doesn't always land on the same letter, and so
// replaying the same question later shows the options in a new order.
function shuffleOptions(item){
  if(!item || !item.opts) return item;
  const order = shuffle(item.opts.map((_,i)=>i));
  return {q:item.q, opts:order.map(i=>item.opts[i]), correct:order.indexOf(item.correct), source:item.source};
}
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

/* ===================== ICONS (replace emoji with line icons) ===================== */
const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9"/><path d="M9.5 20v-5.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  volume: '<path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z"/><path d="M17 9a4 4 0 0 1 0 6M19.3 6.5a8 8 0 0 1 0 11"/>',
  volumeMute: '<path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z"/><path d="M16.8 9.3l4.7 5.4M21.5 9.3l-4.7 5.4"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 1 1 2.4 5.5"/><path d="M4 17.3v-4.3h4.3"/>',
  trophy: '<path d="M7 4h10v4.2a5 5 0 0 1-10 0V4Z" fill="currentColor" stroke="none"/><path d="M7 5H4.2v1.8a3 3 0 0 0 3 3M17 5h2.8v1.8a3 3 0 0 1-3 3"/><path d="M12 13.2V16M9 20h6M9.3 20a2.7 2.7 0 0 1 5.4 0"/>',
  crown: '<path d="M4 18.5h16l1-9.5-5.2 3.6L12 6l-3.8 6.6L3 9l1 9.5Z" fill="currentColor" stroke="none"/>',
  heart: '<path d="M12 20s-7-4.4-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" fill="currentColor" stroke="none"/>',
  heartBroken: '<path d="M12 20s-7-4.4-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z"/><path d="M13 6.7 10.6 11l3 2-2.2 4.2"/>',
  draw: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
  sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l1.8 1.8M15.7 15.7l1.8 1.8M6.5 17.5l1.8-1.8M15.7 8.3l1.8-1.8"/>',
  frown: '<circle cx="12" cy="12" r="9"/><path d="M8.5 15.7a4 4 0 0 1 7 0"/><circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none"/>',
  meh: '<circle cx="12" cy="12" r="9"/><path d="M8.5 15h7"/><circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 13l4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16 9.3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3.3 20a5.7 5.7 0 0 1 11.4 0"/><circle cx="17.3" cy="9" r="2.3"/><path d="M15 12.3a4.3 4.3 0 0 1 5.7 4"/>',
  teacher: '<rect x="3" y="4" width="14" height="10" rx="1.5"/><path d="M7 20h6M10 14v6"/><circle cx="19.3" cy="18" r="2"/><path d="M19.3 9v6.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
  graduationCap: '<path d="M2 9 12 4l10 5-10 5L2 9Z"/><path d="M6 11.3V17c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5.7M20 9v6"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="7.3" y="5.3" width="9.4" height="4" rx="0.6"/><circle cx="8.3" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15.7" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="8.3" cy="17" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/><circle cx="15.7" cy="17" r="1" fill="currentColor" stroke="none"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18c1.2 0 2-.9 2-2 0-.6-.3-1-.3-1.6 0-.9.7-1.4 1.6-1.4H17a4 4 0 0 0 4-4c0-4.8-4-9-9-9Z"/><circle cx="7.6" cy="11.7" r="1.2" fill="currentColor" stroke="none"/><circle cx="9.6" cy="7.6" r="1.2" fill="currentColor" stroke="none"/><circle cx="14.3" cy="7.2" r="1.2" fill="currentColor" stroke="none"/>',
  atom: '<circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.3" ry="2.6"/><path d="M4.7 5.5V18c0 1.4 3.3 2.6 7.3 2.6s7.3-1.2 7.3-2.6V5.5"/><path d="M4.7 12c0 1.4 3.3 2.6 7.3 2.6s7.3-1.2 7.3-2.6"/>',
  smartphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.2"/><path d="M10.3 18.5h3.4"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8.5 20.5h7M12 16v4.5"/>',
  rope: '<path d="M3.5 12.5c1.7-3.6 3.6-3.6 5.4 0s3.6 3.6 5.4 0 3.6-3.6 5.4 0"/><path d="M3.5 12.5v2M20.5 12.5v2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.3 2"/>',
  flag: '<path d="M5 3v18"/><path d="M5 4.2h14l-2.6 3 2.6 3H5V4.2Z"/><rect x="8" y="4.9" width="2.1" height="2.1" fill="currentColor" stroke="none"/><rect x="12.2" y="4.9" width="2.1" height="2.1" fill="currentColor" stroke="none"/><rect x="10.1" y="7" width="2.1" height="2.1" fill="currentColor" stroke="none"/><rect x="14.3" y="7" width="2.1" height="2.1" fill="currentColor" stroke="none"/>',
  brain: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  gamepad: '<path d="M6.7 8h10.6a4 4 0 0 1 4 4.6l-.5 3a3 3 0 0 1-5.3 1.4l-1.3-1.5h-4.4l-1.3 1.5a3 3 0 0 1-5.3-1.4l-.5-3A4 4 0 0 1 6.7 8Z"/><path d="M7.3 10.8v3.2M5.7 12.4h3.2"/><circle cx="16.2" cy="11" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.2" cy="13" r="0.9" fill="currentColor" stroke="none"/>',
  edit: '<path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20Z"/><path d="M13 7l3.5 3.5"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4.7A1.2 1.2 0 0 1 10.2 3.5h3.6A1.2 1.2 0 0 1 15 4.7V7"/><path d="M6.3 7l.9 12.2A1.5 1.5 0 0 0 8.7 20.6h6.6a1.5 1.5 0 0 0 1.5-1.4L17.7 7"/><path d="M10 11v6M14 11v6"/>',
  puzzle: '<path d="M9 3.5h4v1.9a1.7 1.7 0 1 0 0 3.4v1.7h3.4a1.7 1.7 0 1 1 0 3.4H13v1.7a1.7 1.7 0 1 1-3.4 0V13.9H6v1.7a1.7 1.7 0 1 1-3.4 0V9h1.7a1.7 1.7 0 1 0 0-3.4V3.5h4.7Z"/>',
  search: '<circle cx="10.3" cy="10.3" r="6.3"/><path d="M20 20l-4.8-4.8"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  snake: '<path d="M3.5 7c0-1.8 2.7-1.8 2.7 0s2.7 1.8 2.7 0 2.7-1.8 2.7 0 2.7 1.8 2.7 0 2.7-1.8 2.7 0"/><path d="M19 7v4.5c0 1.8-2 1.8-2 3.5v3.5"/><circle cx="17" cy="18.5" r="1.3" fill="currentColor" stroke="none"/>',
  car: '<path d="M3.3 15.3 5 11a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 11l1.7 4.3"/><rect x="2.3" y="15.3" width="19.4" height="3.6" rx="1.5"/><circle cx="7" cy="19.5" r="1.6"/><circle cx="17" cy="19.5" r="1.6"/>',
  zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" stroke="none"/>',
  turtle: '<path d="M12 4v13.5"/><path d="M6.5 12.5 12 18l5.5-5.5"/>',
  rocket: '<path d="M12 2.2c2.4 2 3.9 5.2 3.9 8.8 0 2-1 4-1 4H9.1s-1-2-1-4c0-3.6 1.5-6.8 3.9-8.8Z"/><circle cx="12" cy="9.5" r="1.4" fill="currentColor" stroke="none"/><path d="M9 15l-2.5 2.5M15 15l2.5 2.5M10 19.3l1-2.3M14 19.3l-1-2.3"/>',
  balloon: '<path d="M12 3a5.3 5.3 0 0 1 5.3 5.3c0 3.8-2.9 6.5-4.2 7.4a1.6 1.6 0 0 1-2.2 0c-1.3-.9-4.2-3.6-4.2-7.4A5.3 5.3 0 0 1 12 3Z"/><path d="M12 15.6v2.4M11 21l1-2.3 1 2.3"/>',
  bee: '<ellipse cx="12" cy="13" rx="4.4" ry="5.3"/><path d="M7.9 11.3h8.2M7.9 14.2h8.2M7.9 17h8.2" opacity="0.55"/><path d="M12 7.7V5.2M9.6 7.1 8.2 5.2M14.4 7.1l1.4-1.9"/><ellipse cx="6.7" cy="10.8" rx="2.3" ry="1.5" transform="rotate(-25 6.7 10.8)" opacity="0.45"/><ellipse cx="17.3" cy="10.8" rx="2.3" ry="1.5" transform="rotate(25 17.3 10.8)" opacity="0.45"/>',
  headphones: '<path d="M4.2 14.2v-2.4a7.8 7.8 0 0 1 15.6 0v2.4"/><rect x="3" y="13.5" width="4" height="6.2" rx="1.5"/><rect x="17" y="13.5" width="4" height="6.2" rx="1.5"/>',
  soccerBall: '<circle cx="12" cy="12" r="9"/><path d="M12 8 15.9 10.8l-1.5 4.6H9.6l-1.5-4.6L12 8Z"/><path d="M12 3.2V8M7.6 10.8 3.6 9.4M9.6 15.4l-2.3 4.4M14.4 15.4l2.3 4.4M16.4 10.8l4-1.4" opacity="0.65"/>',
  donut: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.4"/><circle cx="8.3" cy="8" r="0.9" fill="currentColor" stroke="none"/><circle cx="15.2" cy="7.6" r="0.9" fill="currentColor" stroke="none"/><circle cx="16.2" cy="14" r="0.9" fill="currentColor" stroke="none"/><circle cx="8.8" cy="16.3" r="0.9" fill="currentColor" stroke="none"/>',
  apple: '<path d="M12.3 8.8c-3.6-2.9-7.8 0-7.8 4.9 0 3.9 2.9 7.8 5.4 7.8 1 0 1.5-.5 2.4-.5s1.5.5 2.4.5c2.2 0 5.4-3.4 5.4-7.3 0-4-2.9-5.9-5.3-5.1"/><path d="M12.3 8.8V6.3c0-1.2.8-2 2-2.3"/>',
  code: '<path d="M8.5 8 4 12l4.5 4M15.5 8l4.5 4-4.5 4M13.5 5.5l-3 13"/>',
  cards: '<rect x="3" y="6" width="11" height="15" rx="2" transform="rotate(-8 3 6)"/><rect x="9.2" y="4" width="11" height="15" rx="2"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 21.5h4"/><path d="M15.3 14.2c.2-1 .7-1.8 1.5-2.6A5 5 0 0 0 18 8a6 6 0 0 0-12 0c0 1.1.25 2.4 1.6 3.7a5.1 5.1 0 0 1 1.4 2.5"/>',
  axe: '<path d="M5 21 13.5 12.5"/><path d="M12.3 5.2c1.9-1.9 4.9-2.4 7.2-1.1.5 2.5-.3 5.3-2.2 7.2l-3.6 3.2-4.3-4.3Z"/>',
  grid: '<path d="M9 4v16M15 4v16M4 9h16M4 15h16"/><path d="M6.2 6.2l3.4 3.4M9.6 6.2 6.2 9.6"/><circle cx="18" cy="18" r="2.3"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  tetris: '<rect x="3.5" y="4" width="5.5" height="5.5" rx="1"/><rect x="9.5" y="4" width="5.5" height="5.5" rx="1"/><rect x="15.5" y="4" width="5.5" height="5.5" rx="1"/><rect x="9.5" y="10" width="5.5" height="5.5" rx="1"/>',
  robot: '<rect x="5" y="8.3" width="14" height="10.2" rx="2.5"/><path d="M12 8.3V5.3"/><circle cx="12" cy="3.6" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/><path d="M9.2 16.3h5.6"/><path d="M3 11.3v3M21 11.3v3"/>',
};
function icon(name, size, color){
  const s = size || 18;
  const body = ICONS[name] || "";
  const style = color ? `color:${color};vertical-align:-3px;flex:none` : "vertical-align:-3px;flex:none";
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ic" aria-hidden="true" style="${style}">${body}</svg>`;
}
// Thematic colors for the memory-match game's card icons, echoing each
// object's natural color the way the original emoji set did.
const MEM_ICON_COLOR = {
  apple:"var(--danger)", rocket:"var(--brand)", balloon:"var(--fun)", bee:"var(--brand)",
  moon:"var(--indigo)", headphones:"var(--purple)", soccerBall:"var(--muted)", donut:"var(--fun)",
  sun:"var(--fun)", heart:"var(--danger)", car:"var(--brand)", gamepad:"var(--purple)",
};

const MUSIC_ROUTES = ["arqon-play","speed-play","poyga-play"];
function navigate(route, extra){
  if(MUSIC_ROUTES.includes(state.route) && route!==state.route) stopMusic();
  // Don't kill the result jingle that was just started as part of THIS SAME
  // "game just ended, show its result screen" transition (X-play -> X-result).
  const isOwnResultTransition = route === state.route.replace(/-play$/, "-result");
  if(route!==state.route && !isOwnResultTransition){ stopDefeatAudio(); stopVictoryAudio(); }
  state.route = route;
  state.mobileNavOpen = false;
  if(extra) Object.assign(state, extra);
  window.scrollTo({top:0, behavior:"instant"});
  render();
}

/* ===================== DB INIT ===================== */
// Fill this in with your own Firebase project's web config to make ro'yxatdan o'tish,
// kirish, savol qo'shish va statistika work once this page is deployed to your own domain
// (agame.uz) — outside a Claude artifact, window.claude isn't available, so this is used
// instead. Get it from: Firebase Console → Project settings (gear icon) → Your apps →
// Web app → SDK setup and configuration. Leave as null to keep it guest-only there.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAvIh6McWNnakzsqgR9ezOSdstfPdNLe0Y",
  authDomain: "agameuz.firebaseapp.com",
  projectId: "agameuz",
  storageBucket: "agameuz.firebasestorage.app",
  messagingSenderId: "538084042348",
  appId: "1:538084042348:web:e9bdea0a319445db161a49"
};
/* Example:
const FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "agame-xxxxx.firebaseapp.com",
  projectId: "agame-xxxxx",
  storageBucket: "agame-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
*/
async function initDb(){
  try{
    if(window.claude && window.claude.use){
      const db = await window.claude.use("db");
      state.db = db;
      state.dbReady = !!db;
    } else if(FIREBASE_CONFIG && window.firebase){
      firebase.initializeApp(FIREBASE_CONFIG);
      state.db = firebase.firestore();
      state.dbReady = true;
    }
  }catch(e){ state.db = null; state.dbReady = false; }
  renderDbBanner();
  renderNav();
}
function renderDbBanner(){
  const el = document.getElementById("dbbanner");
  if(!state.dbReady){
    el.innerHTML = `<div class="db-banner">${esc(L().dbBanner)}</div>`;
  } else { el.innerHTML = ""; }
  const f = document.getElementById("footer");
  if(f) f.textContent = L().footer;
}

/* ===================== QUESTION BANK ===================== */
async function getQuestionPool(subject, difficulty){
  let teacherQs = [];
  if(state.dbReady){
    try{
      const snap = await state.db.collection("questions").where("subject","==",subject).where("difficulty","==",difficulty).limit(300).get();
      teacherQs = snap.docs.map(d=>{ const v=d.data(); return {q:v.question, opts:v.options, correct:v.correct, source:v.source||"teacher"}; });
    }catch(e){ teacherQs = []; }
  }
  const builtin = SEED_QUESTIONS.filter(r=>r[0]===subject && r[1]===difficulty).map(r=>({q:r[2], opts:r[3], correct:r[4], source:"builtin"}));
  // Overflow: builtin questions from the SAME subject's OTHER difficulty levels,
  // used only after the round's own pool is fully cycled through (prioritizedShuffle
  // always places it last). Some subjects only have a handful of questions at a given
  // difficulty, so a long or fast round (Arqon/Poyga) can otherwise exhaust the pool
  // and start repeating within a single game. Deduped against the primary pool.
  const seenQ = new Set(teacherQs.concat(builtin).map(q=>q.q));
  const overflow = SEED_QUESTIONS.filter(r=>r[0]===subject && r[1]!==difficulty && !seenQ.has(r[2])).map(r=>({q:r[2], opts:r[3], correct:r[4], source:"overflow"}));
  // Always mix in both sources (not just when teacher supply is thin) — a
  // teacher's questions are prioritized to the front by prioritizedShuffle,
  // so they still show up early even alongside a full built-in set.
  return prioritizedShuffle(teacherQs.concat(builtin).concat(overflow));
}

// Fetching the question pool means a real Firestore round-trip, which can
// make "Boshlash" feel slow to press even with the loading state shown on
// the button. Subject+difficulty are both already known the moment the
// player picks a difficulty on the setup screen (before they confirm team
// names / vs-bot and click Start) — so kick the same fetch off right then
// and cache it, keyed by "subject|difficulty". By the time Start is
// actually pressed the request is usually already finished (or at least
// overlapped with the setup screen), and startArqonGame/startPoygaGame/
// startSpeedGame just await the same cached promise instead of starting a
// fresh query from zero.
const questionPoolCache = new Map();
function getCachedQuestionPool(subject, difficulty){
  const key = subject+"|"+difficulty;
  if(!questionPoolCache.has(key)) questionPoolCache.set(key, getQuestionPool(subject, difficulty));
  return questionPoolCache.get(key);
}
function prefetchQuestionPool(subjectId, difficultyId){
  const subj = SUBJECTS.find(s=>s.id===subjectId);
  if(!subj || subj.mode!=="mcq" || !difficultyId) return;
  getCachedQuestionPool(subjectId, difficultyId);
}

async function seedBuiltinIfNeeded(){
  if(!state.dbReady) return;
  try{
    const existing = await state.db.collection("questions").where("source","==","builtin").limit(1).get();
    if(!existing.empty) return;
  }catch(e){ return; }
}

/* ===================== NAV RENDER ===================== */
function renderNav(){
  const u = state.user;
  const T = L();
  const links = [
    ["home",T.nav.home],
    ["foydali",T.nav.foydali],
    ["kongilochar",T.nav.kongilochar],
    ["savollar",T.nav.savollar],
  ];
  const linkHtml = links.map(([r,label])=>`<button class="navlink ${state.route===r?'active':''}" data-nav="${r}">${esc(label)}</button>`).join("");
  let rightHtml = "";
  if(u){
    rightHtml = `<button class="profile-chip"><span class="avatar">${esc(u.name.slice(0,1).toUpperCase())}</span>${esc(u.name)}</button>`;
  } else {
    rightHtml = `<button class="btn btn-outline" data-auth="login">${esc(T.nav.login)}</button><button class="btn btn-brand" data-auth="register">${esc(T.nav.register)}</button>`;
  }
  const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const effectiveDark = state.theme==="dark" || (state.theme==="auto" && sysDark);
  const langBtns = ["uz","ru","en"].map(l=>`<button class="lang-opt ${state.lang===l?'active':''}" data-lang="${l}">${l.toUpperCase()}</button>`).join("");
  const open = !!state.mobileNavOpen;
  document.getElementById("nav").innerHTML = `
    <div class="topbar"><div class="topbar-inner">
      <div class="logo" data-nav="home"><span class="dot"></span>Agame</div>
      <div class="navwrap">
        <div class="navlinks">${linkHtml}</div>
        <div class="navright">
          <div class="lang-switch">${langBtns}</div>
          <button class="theme-toggle" title="Theme" aria-label="Toggle theme">${effectiveDark?icon('sun',18,'var(--brand)'):icon('moon',18,'var(--indigo)')}</button>
          <a class="dev-icon-btn" href="https://t.me/azbekDev" target="_blank" rel="noopener noreferrer" title="${esc(T.devLabel)}" aria-label="${esc(T.devLabel)}">${icon('code',18)}</a>
          ${rightHtml}
        </div>
      </div>
      <button class="burger" id="burgerBtn" aria-label="Menu" aria-expanded="${open}"><span></span><span></span><span></span></button>
    </div></div>
    <div class="nav-overlay ${open?'open':''}" id="navOverlay"></div>
    <aside class="nav-drawer ${open?'open':''}" id="navDrawer" aria-hidden="${!open}">
      <div class="nav-drawer-head">
        <div class="nav-drawer-title"><span class="dot"></span>Agame</div>
        <button class="nav-drawer-close" id="drawerCloseBtn" aria-label="Close menu">${icon('x',18)}</button>
      </div>
      <div class="nav-drawer-body">${linkHtml}</div>
      <div class="nav-drawer-foot">
        <div class="nav-drawer-foot-row">
          <div class="lang-switch">${langBtns}</div>
          <button class="theme-toggle" title="Theme" aria-label="Toggle theme">${effectiveDark?icon('sun',18,'var(--brand)'):icon('moon',18,'var(--indigo)')}</button>
        </div>
        ${rightHtml}
        <a class="dev-logo-link" href="https://t.me/azbekDev" target="_blank" rel="noopener noreferrer" title="${esc(T.devLabel)}" aria-label="${esc(T.devLabel)}"><img class="dev-logo-img lg" src="${effectiveDark?DEV_LOGO_DARK:DEV_LOGO_LIGHT}" alt="${esc(T.devLabel)}"></a>
      </div>
    </aside>`;
  document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click", ()=>navigate(b.dataset.nav)));
  document.querySelectorAll("[data-auth]").forEach(b=>b.addEventListener("click", ()=>openAuth(b.dataset.auth)));
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click", ()=>setLang(b.dataset.lang)));
  document.querySelectorAll(".theme-toggle").forEach(b=>b.addEventListener("click", toggleTheme));
  const burger = document.getElementById("burgerBtn");
  if(burger) burger.addEventListener("click", (e)=>{
    e.stopPropagation();
    state.mobileNavOpen = !state.mobileNavOpen;
    renderNav();
  });
  const overlay = document.getElementById("navOverlay");
  if(overlay) overlay.addEventListener("click", ()=>{ state.mobileNavOpen = false; renderNav(); });
  const drawerClose = document.getElementById("drawerCloseBtn");
  if(drawerClose) drawerClose.addEventListener("click", ()=>{ state.mobileNavOpen = false; renderNav(); });
  document.querySelectorAll(".profile-chip").forEach(pb=>pb.addEventListener("click", ()=>{
    if(confirm(T.nav.logoutConfirm(u.name))){ saveSession(null); state.mobileNavOpen=false; renderNav(); render(); }
  }));
}

/* ===================== APP ROOT RENDER ===================== */
function render(){
  const app = document.getElementById("app");
  renderNav();
  if(state.route==="home") app.innerHTML = viewHome();
  else if(state.route==="foydali") app.innerHTML = viewFoydali();
  else if(state.route==="kongilochar") app.innerHTML = viewKongilochar();
  else if(state.route==="arqon-setup") app.innerHTML = viewArqonSetup();
  else if(state.route==="arqon-play"){ app.innerHTML = viewArqonPlay(); }
  else if(state.route==="arqon-result") app.innerHTML = viewArqonResult();
  else if(state.route==="speed-setup") app.innerHTML = viewSpeedSetup();
  else if(state.route==="speed-play") app.innerHTML = viewSpeedPlay();
  else if(state.route==="speed-result") app.innerHTML = viewSpeedResult();
  else if(state.route==="poyga-setup") app.innerHTML = viewPoygaSetup();
  else if(state.route==="poyga-play") app.innerHTML = viewPoygaPlay();
  else if(state.route==="poyga-result") app.innerHTML = viewPoygaResult();
  else if(state.route==="target") app.innerHTML = viewTarget();
  else if(state.route==="snake") app.innerHTML = viewSnake();
  else if(state.route==="xo") app.innerHTML = viewXO();
  else if(state.route==="farq") app.innerHTML = viewFarq();
  else if(state.route==="tetris") app.innerHTML = viewTetris();
  else if(state.route==="xotira") app.innerHTML = viewXotira();
  else if(state.route==="reaksiya") app.innerHTML = viewReaksiya();
  else if(state.route==="pazl") app.innerHTML = viewPazl();
  else if(state.route==="kross") app.innerHTML = viewXword();
  else if(state.route==="detektiv") app.innerHTML = viewRoundQuiz("detektiv");
  else if(state.route==="typing-setup") app.innerHTML = viewTypingSetup();
  else if(state.route==="typing-play") app.innerHTML = viewTypingPlay();
  else if(state.route==="typing-result") app.innerHTML = viewTypingResult();
  else if(state.route==="rostyolgon") app.innerHTML = viewRoundQuiz("rostyolgon");
  else if(state.route==="kodquiz") app.innerHTML = viewRoundQuiz("kodquiz");
  else if(state.route==="savollar") app.innerHTML = viewSavollar();
  wireRoute();
  app.classList.remove("page-anim");
  void app.offsetWidth;
  app.classList.add("page-anim");
  fixOrphanGridItems();
}

/* When a .grid with exactly 3 items wraps to 2 columns, the 3rd item ends up
   alone in its own row at half width. Measured live (not guessed from viewport
   width, since page padding can shift the real breakpoint) — if item 2 shares
   its row with item 1 but item 3 doesn't, stretch item 3 to fill the row. */
function fixOrphanGridItems(){
  document.querySelectorAll(".grid").forEach(g=>{
    const items = Array.from(g.children).filter(c=>c.nodeType===1);
    if(items.length!==3) return;
    items[2].style.gridColumn = ""; // reset first so measurement reflects natural flow, not a stale fix
    const tops = items.map(c=>c.offsetTop);
    if(tops[0]===tops[1] && tops[1]!==tops[2]) items[2].style.gridColumn = "1 / -1";
  });
}

/* ===================== FEATURED GAME BANNER (image carousel + explanation) ===================== */
function viewFeaturedCarousel(){
  if(!FEATURED_GAMES.length) return "";
  const g = FEATURED_GAMES[0];
  const t = L().featured;
  // The card as a whole links out to AirCanvas, and the CTA is its own real
  // <a> inside it (for right-click / middle-click / hover-preview to work on
  // the button itself) — an <a> can't be nested inside another <a> (invalid
  // HTML; browsers silently break the markup apart if you try), so the outer
  // card is a <div> that forwards clicks to the same href via JS instead.
  return `
  <div class="wrap section" style="padding-top:8px;padding-bottom:16px">
    <div class="fcarousel" id="featuredCarousel" data-href="${esc(g.href)}">
      <div class="fcarousel-inner">
        <div class="fcarousel-body">
          <span class="fcarousel-badge">${esc(t.eyebrow)}</span>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.desc)}</p>
          <a class="btn btn-brand" href="${esc(g.href)}">${esc(t.cta)}</a>
        </div>
      </div>
    </div>
  </div>`;
}
function wireFeaturedCarousel(){
  const el = document.getElementById("featuredCarousel");
  const g = FEATURED_GAMES[0];
  if(!el || !g) return;
  // The whole card links out to AirCanvas. The CTA button is its own real
  // <a> (so right-click/middle-click work on it specifically); a click
  // anywhere else on the card forwards to the same link.
  el.addEventListener("click", (e)=>{
    if(e.target.closest("a")) return;
    window.location.href = el.dataset.href;
  });
}

/* ===================== HOME ===================== */
function viewHome(){
  const t = L().home;
  const statsHtml = state.dbReady ? `<div class="stats" id="statsRow"><div class="stat"><b class="mono">…</b><span>${esc(t.statUsers)}</span></div><div class="stat"><b class="mono">…</b><span>${esc(t.statQuestions)}</span></div><div class="stat"><b class="mono">…</b><span>${esc(t.statGames)}</span></div></div>` : "";
  return `
  <div class="wrap hero" style="padding-bottom:0">
    <div class="hero-top">
      <div class="eyebrow">${esc(t.eyebrow)}</div>
      <h1>${esc(t.h1)}</h1>
      <p>${t.p}</p>
    </div>
  </div>

  ${viewFeaturedCarousel()}

  <div class="wrap hero" style="padding-top:0">
    <div class="split">
      <div class="split-panel edu">
        <span class="tag">${esc(t.eduTag)}</span>
        <h3>${icon('brain',20,'var(--brand)')} ${esc(t.eduTitle)}</h3>
        <p>${esc(t.eduDesc)}</p>
        <button class="btn btn-edu" data-nav="foydali">${esc(t.eduBtn)}</button>
      </div>
      <div class="split-mid"></div>
      <div class="split-panel fun">
        <span class="tag">${esc(t.funTag)}</span>
        <h3>${icon('gamepad',20,'var(--fun)')} ${esc(t.funTitle)}</h3>
        <p>${esc(t.funDesc)}</p>
        <button class="btn btn-fun" data-nav="kongilochar">${esc(t.funBtn)}</button>
      </div>
    </div>
    ${statsHtml}
  </div>

  <div class="wrap section">
    <div class="section-head">
      <h2>${esc(t.whyH2)}</h2>
    </div>
    <div class="grid">
      <div class="card pad"><h4 style="font-family:Unbounded;font-size:15px;margin:0 0 6px">${icon('users',17,'var(--edu)')} ${esc(t.card1T)}</h4><p style="color:var(--muted);font-size:13.5px;margin:0">${esc(t.card1D)}</p></div>
      <div class="card pad"><h4 style="font-family:Unbounded;font-size:15px;margin:0 0 6px">${icon('edit',17,'var(--purple)')} ${esc(t.card2T)}</h4><p style="color:var(--muted);font-size:13.5px;margin:0">${esc(t.card2D)}</p></div>
      <div class="card pad"><h4 style="font-family:Unbounded;font-size:15px;margin:0 0 6px">${icon('globe',17,'var(--edu)')} ${esc(t.card3T)}</h4><p style="color:var(--muted);font-size:13.5px;margin:0">${esc(t.card3D)}</p></div>
    </div>
  </div>`;
}

async function loadStatsRow(){
  if(!state.dbReady) return;
  try{
    const [users, results, builtinQ, teacherQ] = await Promise.all([
      state.db.collection("users").limit(1000).get(),
      state.db.collection("results").limit(1000).get(),
      state.db.collection("questions").where("source","==","builtin").limit(1000).get(),
      state.db.collection("questions").where("source","==","teacher").limit(1000).get(),
    ]);
    const row = document.getElementById("statsRow");
    if(!row) return;
    const bvals = [users.size, builtinQ.size+teacherQ.size, results.size];
    row.querySelectorAll(".stat b").forEach((b,i)=> b.textContent = bvals[i]);
  }catch(e){}
}

/* ===================== FOYDALI GAMES GRID ===================== */
function viewFoydali(){
  const t = L().foydali, bd = L().badge;
  const cards = [
    {icon:icon('rope',26,'var(--edu)'), name:t.arqonN, desc:t.arqonD, ready:true, route:"arqon-setup", bg:"var(--edu-soft)"},
    {icon:icon('clock',26,'var(--edu)'), name:t.speedN, desc:t.speedD, ready:true, route:"speed-setup", bg:"var(--edu-soft)"},
    {icon:icon('flag',26,'var(--edu)'), name:t.poygaN, desc:t.poygaD, ready:true, route:"poyga-setup", bg:"var(--edu-soft)"},
    {icon:icon('puzzle',26,'var(--edu)'), name:t.krossN, desc:t.krossD, ready:true, route:"kross", bg:"var(--edu-soft)"},
    {icon:icon('search',26,'var(--edu)'), name:t.detN, desc:t.detD, ready:true, route:"detektiv", bg:"var(--edu-soft)"},
    {icon:icon('zap',26,'var(--edu)'), name:t.typingN, desc:t.typingD, ready:true, route:"typing-setup", bg:"var(--edu-soft)"},
    {icon:icon('checkCircle',26,'var(--edu)'), name:t.tfN, desc:t.tfD, ready:true, route:"rostyolgon", bg:"var(--edu-soft)"},
    {icon:icon('code',26,'var(--edu)'), name:t.cqN, desc:t.cqD, ready:true, route:"kodquiz", bg:"var(--edu-soft)"},
  ];
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="grid">
      ${cards.map(c=>`
        <div class="gcard ${c.ready?'':'soon'}" ${c.ready?`data-nav="${c.route}"`:''} style="${c.ready?'cursor:pointer':''}">
          <div class="icon" style="background:${c.bg||'var(--surface-2)'}">${c.icon}</div>
          <h4>${esc(c.name)}</h4>
          <p>${esc(c.desc)}</p>
          <div class="foot"><span class="badge ${c.ready?'ready':'soon'}">${c.ready?esc(bd.ready):esc(bd.soon)}</span></div>
        </div>`).join("")}
    </div>
  </div>`;
}

function viewKongilochar(){
  state.xotira = {difficulty:null};
  state.pazl = {difficulty:null};
  state.target = {difficulty:null};
  state.snake = {difficulty:null};
  state.xo = {mode:null, difficulty:null};
  state.farq = {difficulty:null};
  state.tetris = {difficulty:null};
  const t = L().kongilochar, bd = L().badge;
  const cards = [
    {icon:icon('cards',26,'var(--fun)'), name:t.memN, desc:t.memD, ready:true, route:"xotira", bg:"var(--fun-soft)"},
    {icon:icon('zap',26,'var(--fun)'), name:t.reactN, desc:t.reactD, ready:true, route:"reaksiya", bg:"var(--fun-soft)"},
    {icon:icon('calculator',26,'var(--fun)'), name:t.pzN, desc:t.pzD, ready:true, route:"pazl", bg:"var(--fun-soft)"},
    {icon:icon('target',26,'var(--fun)'), name:t.targetN, desc:t.targetD, ready:true, route:"target", bg:"var(--fun-soft)"},
    {icon:icon('snake',26,'var(--fun)'), name:t.snakeN, desc:t.snakeD, ready:true, route:"snake", bg:"var(--fun-soft)"},
    {icon:icon('grid',26,'var(--fun)'), name:t.xoN, desc:t.xoD, ready:true, route:"xo", bg:"var(--fun-soft)"},
    {icon:icon('eye',26,'var(--fun)'), name:t.farqN, desc:t.farqD, ready:true, route:"farq", bg:"var(--fun-soft)"},
    {icon:icon('tetris',26,'var(--fun)'), name:t.tetrisN, desc:t.tetrisD, ready:true, route:"tetris", bg:"var(--fun-soft)"},
  ];
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="grid">
      ${cards.map(c=>`
        <div class="gcard ${c.ready?'':'soon'}" ${c.ready?`data-nav="${c.route}"`:''} style="${c.ready?'cursor:pointer':''}">
          <div class="icon" style="background:${c.bg||'var(--surface-2)'}">${c.icon}</div>
          <h4>${esc(c.name)}</h4>
          <p>${esc(c.desc)}</p>
          <div class="foot"><span class="badge ${c.ready?'ready':'soon'}">${c.ready?esc(bd.ready):esc(bd.soon)}</span></div>
        </div>`).join("")}
    </div>
  </div>`;
}

/* ===================== ARQON TORTISH: SETUP ===================== */
function subjectPickHtml(currentCat, subjAttr, catAttr, catBackAttr, subjT, t){
  const list = currentCat ? subjectChildren(currentCat) : TOP_SUBJECTS;
  const backHtml = currentCat ? `<div style="margin-bottom:14px"><button class="btn btn-outline" ${catBackAttr}>${esc(t.catBack)}</button></div>` : "";
  const grid = `<div class="pick-grid">
    ${list.map(s=> s.children
      ? `<button class="pick" ${catAttr}="${s.id}"><span class="picon">${icon(s.icon,22,'var(--edu)')}</span><b>${esc(subjT[s.id])}</b><span>${esc(t.subjGroup)}</span></button>`
      : `<button class="pick" ${subjAttr}="${s.id}"><span class="picon">${icon(s.icon,22,'var(--edu)')}</span><b>${esc(subjT[s.id])}</b><span>${s.mode==='math'?esc(t.subjAuto):esc(t.subjMcq)}</span></button>`
    ).join("")}
  </div>`;
  return backHtml + grid;
}
function rqSubjectPickHtml(subjT){
  return `<div class="pick-grid">
    ${RQ_SUBJECTS.map(id=>{
      const s = SUBJECTS.find(x=>x.id===id);
      return `<button class="pick" data-rqsubj="${id}"><span class="picon">${icon(s.icon,22,'var(--edu)')}</span><b>${esc(subjT[id])}</b></button>`;
    }).join("")}
  </div>`;
}
function viewArqonSetup(){
  const t = L().arqonSetup, subjT = L().subjects, diffT = L().difficulties;
  const a = state.arqon || {subject:null, difficulty:null, teamA:"", teamB:"", category:null};
  state.arqon = a;
  const stepNum = !a.subject ? 1 : !a.difficulty ? 2 : 3;
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
    </div>
    <div class="steps">
      <div class="step-pill ${stepNum===1?'active':a.subject?'done':''}">${esc(t.step1)}</div>
      <div class="step-pill ${stepNum===2?'active':a.difficulty?'done':''}">${esc(t.step2)}</div>
      <div class="step-pill ${stepNum===3?'active':''}">${esc(t.step3)}</div>
    </div>

    ${stepNum===1? subjectPickHtml(a.category, "data-subj", "data-cat", "data-catback", subjT, t) : ""}

    ${stepNum===2?`
    <div class="diff-grid">
      ${DIFFICULTIES.map(d=>`<button class="pick" data-diff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc((SUBJECTS.find(o=>o.id===a.subject)||{}).mode==="math"?diffT[d.id].desc:diffT[d.id].descMcq)}</span><span class="mono" style="color:var(--muted)">${d.time}s</span></button>`).join("")}
    </div>
    <div style="margin-top:16px"><button class="btn btn-outline" id="backSubj">${esc(t.backSubj)}</button></div>` : ""}

    ${stepNum===3?`
    <div class="card pad" style="max-width:520px">
      <div class="formrow">
        <label>${esc(t.modeLabel)}</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn ${!a.vsBot?'btn-brand':'btn-outline'}" id="mode2pBtn">${icon('users',16)} ${esc(t.mode2p)}</button>
          <button type="button" class="btn ${a.vsBot?'btn-brand':'btn-outline'}" id="modeBotBtn">${icon('robot',16)} ${esc(t.modeBot)}</button>
        </div>
      </div>
      <div class="formrow"><label>${esc(t.teamALabel)}</label><input type="text" id="teamAInput" placeholder="${esc(t.teamAPh)}" maxlength="20" value="${esc(a.teamA||'')}"></div>
      ${a.vsBot ? "" : `<div class="formrow"><label>${esc(t.teamBLabel)}</label><input type="text" id="teamBInput" placeholder="${esc(t.teamBPh)}" maxlength="20" value="${esc(a.teamB||'')}"></div>`}
      <button class="btn btn-brand btn-block btn-lg" id="startGameBtn">${icon('rope',18)} ${esc(t.startBtn)}</button>
      <button class="btn btn-outline btn-block" id="backDiff" style="margin-top:10px">${esc(t.backDiff)}</button>
    </div>` : ""}
  </div>`;
}

/* ===================== ARQON TORTISH: PLAY ENGINE ===================== */
let ropeTimerHandle = null;
async function startArqonGame(){
  const a = state.arqon;
  const diff = DIFFICULTIES.find(d=>d.id===a.difficulty);
  const subj = SUBJECTS.find(s=>s.id===a.subject);
  a.timeLeft = diff.time;
  a.ropePos = 0;
  a.scoreA = 0; a.scoreB = 0;
  a.wrongA = 0; a.wrongB = 0;
  a.finished = false;
  a.winner = null;

  let poolA=[], poolB=[], idxA=0, idxB=0;
  if(subj.mode==="mcq"){
    const pool = await getCachedQuestionPool(subj.id, diff.id);
    poolA = prioritizedShuffle(pool); poolB = prioritizedShuffle(pool);
    if(poolA.length===0){
      // ultimate fallback
      poolA = poolB = [{q:"Savollar topilmadi. Iltimos boshqa fan tanlang.", opts:["OK","OK","OK","OK"], correct:0}];
    }
  }
  a.mode = subj.mode;
  a.subjName = L().subjects[subj.id];
  a.diffName = L().difficulties[diff.id].name;
  a.totalTime = diff.time;

  function nextQ(team){
    if(subj.mode==="math"){
      return genMathQuestion(diff.id);
    } else {
      const pool = team==="A"?poolA:poolB;
      let i = team==="A"?idxA:idxB;
      if(i>=pool.length){
        const reshuffled = reshuffleNoRepeat(pool, pool[pool.length-1]);
        if(team==="A") poolA=reshuffled; else poolB=reshuffled;
        i=0;
      }
      const item = (team==="A"?poolA:poolB)[i];
      if(team==="A") idxA=i+1; else idxB=i+1;
      return {mcq:true, ...shuffleOptions(item)};
    }
  }
  a.nextQ = nextQ;
  a.curA = nextQ("A");
  a.curB = nextQ("B");

  navigate("arqon-play");
  startMusic();

  if(ropeTimerHandle) clearInterval(ropeTimerHandle);
  ropeTimerHandle = setInterval(()=>{
    if(state.route!=="arqon-play"){ clearInterval(ropeTimerHandle); return; }
    a.timeLeft--;
    updateTimerDisplay();
    if(a.timeLeft>0 && a.timeLeft<=5) playCountdownBeep();
    if(a.timeLeft<=0){
      clearInterval(ropeTimerHandle);
      endArqonGame("time");
    }
  }, 1000);
}

function mathDistractors(answer, count){
  const wrongs = new Set();
  const spread = Math.max(4, Math.round(Math.abs(answer)*0.18)+3);
  let guard = 0;
  while(wrongs.size < count && guard < 80){
    guard++;
    const delta = randInt(1, spread) * (Math.random()<0.5?-1:1);
    const w = answer + delta;
    if(w === answer || w < 0 || wrongs.has(w)) continue;
    wrongs.add(w);
  }
  let extra = 1;
  while(wrongs.size < count){
    const w = answer + extra; extra++;
    if(w!==answer && w>=0 && !wrongs.has(w)) wrongs.add(w);
  }
  return Array.from(wrongs);
}
function genMathQuestion(difficulty){
  let a,b,op,answer;
  const opsBasic = ["+","-"];
  const opsAll = ["+","-","×","÷"];
  if(difficulty==="oson"){
    op = opsBasic[randInt(0,1)];
    a = randInt(1,10); b = randInt(1,10);
    if(op==="-" && b>a){ const t=a; a=b; b=t; }
    answer = op==="+" ? a+b : a-b;
  } else if(difficulty==="normal"){
    op = opsAll[randInt(0,3)];
    if(op==="×"){ a=randInt(2,12); b=randInt(2,12); answer=a*b; }
    else if(op==="÷"){ b=randInt(2,12); answer=randInt(2,12); a=b*answer; }
    else { a=randInt(10,50); b=randInt(10,50); if(op==="-" && b>a){const t=a;a=b;b=t;} answer = op==="+"?a+b:a-b; }
  } else {
    op = opsAll[randInt(0,3)];
    if(op==="×"){ a=randInt(5,25); b=randInt(2,15); answer=a*b; }
    else if(op==="÷"){ b=randInt(2,20); answer=randInt(5,25); a=b*answer; }
    else { a=randInt(20,100); b=randInt(10,100); if(op==="-" && b>a){const t=a;a=b;b=t;} answer = op==="+"?a+b:a-b; }
  }
  const opts = shuffle([answer, ...mathDistractors(answer, 3)]);
  const correct = opts.indexOf(answer);
  return {math:true, text:`${a} ${op} ${b}`, opts: opts.map(String), correct};
}

/* ===================== KOMPYUTERGA QARSHI (bot) — Arqon & Poyga uchun umumiy ===================== */
function botDelayMs(diffId){
  const ranges = {oson:[1100,2200], normal:[1500,3000], qiyin:[2000,3800]};
  const r = ranges[diffId] || ranges.normal;
  return randInt(r[0], r[1]);
}
function botAccuracy(diffId){
  return ({oson:0.55, normal:0.7, qiyin:0.85})[diffId] || 0.7;
}
function botPickIndex(cur, diffId){
  if(!cur || !cur.opts) return 0;
  if(Math.random() < botAccuracy(diffId)) return cur.correct;
  const wrongs = [];
  for(let i=0;i<cur.opts.length;i++){ if(i!==cur.correct) wrongs.push(i); }
  return wrongs.length ? wrongs[randInt(0, wrongs.length-1)] : cur.correct;
}
let arqonBotHandle = null;
function scheduleArqonBot(){
  if(arqonBotHandle){ clearTimeout(arqonBotHandle); arqonBotHandle = null; }
  const a = state.arqon;
  if(!a || !a.vsBot || a.finished) return;
  arqonBotHandle = setTimeout(()=>{
    const cur = state.arqon;
    if(!cur || cur.finished || state.route!=="arqon-play" || !cur.curB) return;
    submitAnswer("B", botPickIndex(cur.curB, cur.difficulty));
  }, botDelayMs(a.difficulty));
}
let poygaBotHandle = null;
function schedulePoygaBot(){
  if(poygaBotHandle){ clearTimeout(poygaBotHandle); poygaBotHandle = null; }
  const p = state.poyga;
  if(!p || !p.vsBot || p.finished) return;
  poygaBotHandle = setTimeout(()=>{
    const cur = state.poyga;
    if(!cur || cur.finished || state.route!=="poyga-play" || !cur.curB) return;
    submitPoygaAnswer("B", botPickIndex(cur.curB, cur.difficulty));
  }, botDelayMs(p.difficulty));
}

function updateTimerDisplay(){
  const a = state.arqon;
  const el = document.getElementById("ropeTimer");
  if(!el) return;
  el.textContent = a.timeLeft + "s";
  el.classList.toggle("low", a.timeLeft<=10);
}
function ropeShiftPct(pos){
  // pos ranges -50..50; shifts the whole rope+kids assembly together.
  return Math.max(-50, Math.min(50, pos)) * 0.9;
}
function updateRopeDisplay(){
  const a = state.arqon;
  const assembly = document.getElementById("ropeAssembly");
  if(!assembly) return;
  assembly.style.transform = `translateX(${ropeShiftPct(a.ropePos)}%)`;
  document.getElementById("scoreADisp").textContent = a.scoreA;
  document.getElementById("scoreBDisp").textContent = a.scoreB;
}
function pulseKids(team){
  const el = document.getElementById(team==="A"?"ropeKidsLeft":"ropeKidsRight");
  if(!el) return;
  el.classList.remove("pulling");
  void el.offsetWidth;
  el.classList.add("pulling");
  setTimeout(()=>el.classList.remove("pulling"), 350);
}

let kidFigCounter = 0;
function kidFigHtml(){
  const id = "kf" + (++kidFigCounter);
  return `<div class="kidfig"><div class="kidfig-inner"><svg class="kidsvg" viewBox="0 0 76 118" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
        <rect width="9" height="9" class="k-fab-a"></rect>
        <rect width="4.5" height="9" class="k-fab-b"></rect>
      </pattern>
    </defs>
    <g class="k-leg-back" transform="rotate(-30 36 68)">
      <rect x="29" y="68" width="13" height="36" rx="6.5" class="k-pants"></rect>
      <ellipse cx="35.5" cy="106" rx="10" ry="5.5" class="k-shoe"></ellipse>
    </g>
    <g class="k-leg-front" transform="rotate(14 36 68)">
      <rect x="29" y="68" width="13" height="34" rx="6.5" class="k-pants"></rect>
      <ellipse cx="35.5" cy="104" rx="10" ry="5.5" class="k-shoe"></ellipse>
    </g>
    <g class="k-upper" transform="rotate(-18 36 68)">
      <rect x="14" y="46" width="20" height="9" rx="4.5" transform="rotate(20 24 50)" class="k-arm-back"></rect>
      <rect x="24" y="30" width="24" height="42" rx="11" class="k-shirt" fill="url(#${id})"></rect>
      <rect x="42" y="42" width="34" height="9.5" rx="4.75" transform="rotate(8 42 46)" class="k-arm-front"></rect>
      <circle cx="73" cy="49" r="5.5" class="k-hand"></circle>
      <circle cx="36" cy="19" r="13" class="k-head"></circle>
      <circle cx="41" cy="20" r="1.7" class="k-eye"></circle>
      <path d="M23,18 Q23,3 36,3 Q49,3 49,18 Q49,21 44,21 L28,21 Q23,21 23,18 Z" class="k-cap"></path>
      <circle cx="30" cy="9" r="1.1" class="k-cap-dot"></circle>
      <circle cx="36" cy="6.5" r="1.1" class="k-cap-dot"></circle>
      <circle cx="42" cy="9" r="1.1" class="k-cap-dot"></circle>
    </g>
  </svg></div></div>`;
}
function viewArqonPlay(){
  const a = state.arqon;
  const rt = L().arqonResult;
  if(!a || !a.mode) return `<div class="center-note">—</div>`;
  return `
  <div class="wrap section" style="padding-top:24px">
    <div class="rope-wrap">
      <div class="rope-hud">
        <div><b style="font-family:Unbounded;font-size:15px">${esc(a.subjName)}</b> <span style="color:var(--muted);font-size:13px">· ${esc(a.diffName)}</span></div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="music-toggle" data-nav="home" title="${esc(L().nav.home)}" aria-label="${esc(L().nav.home)}">${icon('home',18)}</button>
          <button class="music-toggle" id="musicToggle" title="Music" aria-label="Toggle music">${state.musicOn?icon('volume',18):icon('volumeMute',18)}</button>
          <div class="timer mono" id="ropeTimer">${a.timeLeft}s</div>
        </div>
      </div>
      <div class="rope-track">
        <div class="rope-center"></div>
        <div class="rope-assembly" id="ropeAssembly" style="transform:translateX(${ropeShiftPct(a.ropePos)}%)">
          <div class="rope-line"></div>
          <div class="rope-kids left" id="ropeKidsLeft">${kidFigHtml()}${kidFigHtml()}</div>
          <div class="rope-kids right" id="ropeKidsRight">${kidFigHtml()}${kidFigHtml()}</div>
        </div>
      </div>
    </div>

    <div class="qa-cols">
      <div class="team-panel A" id="panelA">
        <div class="team-header-block">
          <div class="team-head">
            <span class="team-name"><span class="team-dot" style="background:var(--edu)"></span>${esc(a.teamA||rt.team1)}</span>
            <span class="team-score mono" id="scoreADisp">${a.scoreA}</span>
          </div>
        </div>
        ${renderQBlock("A", a.curA)}
      </div>
      <div class="team-panel B" id="panelB">
        <div class="team-header-block">
          <div class="team-head">
            <span class="team-name"><span class="team-dot" style="background:var(--fun)"></span>${a.vsBot?icon('robot',15)+' ':''}${esc(a.teamB||rt.team2)}</span>
            <span class="team-score mono" id="scoreBDisp">${a.scoreB}</span>
          </div>
        </div>
        ${renderQBlock("B", a.curB, a.vsBot)}
      </div>
    </div>
  </div>`;
}

function renderQBlock(team, cur, locked){
  if(!cur) return "";
  const dis = locked ? " disabled" : "";
  // Team B gets on-screen 1-4 keyboard hints so two people can play on one
  // computer without fighting over the single mouse: Team A clicks, Team B
  // presses 1-4 (see teamBKeyHandler). Skipped when locked (vs-bot) since
  // there's no human on that side to press anything.
  const kbd = (team==="B" && !locked) ? (i)=>`<span class="mcq-key">${i+1}</span>` : ()=>"";
  if(cur.math){
    return `
    <div class="q-text mono">${esc(cur.text)} = ?</div>
    <div class="mcq-opts mcq-opts-num">
      ${cur.opts.map((o,i)=>`<button class="mcq-opt mcq-opt-num" data-mcq="${team}:${i}"${dis}>${kbd(i)}${esc(o)}</button>`).join("")}
    </div>`;
  } else {
    const letters = ["A","B","C","D"];
    return `
    <div class="q-text" style="font-size:16px;line-height:1.35">${esc(cur.q)}</div>
    <div class="mcq-opts">
      ${cur.opts.map((o,i)=>`<button class="mcq-opt" data-mcq="${team}:${i}"${dis}>${kbd(i)}${letters[i]}. ${esc(o)}</button>`).join("")}
    </div>`;
  }
}

function submitAnswer(team, given){
  const a = state.arqon;
  if(a.finished) return;
  const cur = team==="A" ? a.curA : a.curB;
  const correct = Number(given) === cur.correct;

  const panel = document.getElementById(team==="A"?"panelA":"panelB");
  if(panel){
    panel.querySelectorAll("[data-mcq]").forEach(b=>b.disabled=true);
    const chosenBtn = panel.querySelector(`[data-mcq="${team}:${given}"]`);
    if(chosenBtn) chosenBtn.classList.add(correct?"opt-correct":"opt-wrong");
  }

  const step = correct ? 5 : 3;
  if(team==="A") a.ropePos += correct ? -step : step;
  else a.ropePos += correct ? step : -step;
  a.ropePos = Math.max(-50, Math.min(50, a.ropePos));

  if(correct){ if(team==="A") a.scoreA++; else a.scoreB++; }
  else { if(team==="A") a.wrongA++; else a.wrongB++; }

  if(panel){
    panel.classList.remove("flash-ok","flash-bad");
    void panel.offsetWidth;
    panel.classList.add(correct?"flash-ok":"flash-bad");
  }
  updateRopeDisplay();
  pulseKids(correct ? team : (team==="A"?"B":"A"));

  setTimeout(()=>{
    if(a.finished) return;
    if(Math.abs(a.ropePos)>=50){
      endArqonGame("pull");
      return;
    }
    const nq = a.nextQ(team);
    if(team==="A") a.curA = nq; else a.curB = nq;
    const qHtml = renderQBlock(team, nq, team==="B" && a.vsBot);
    const teamHeadHtml = panel.querySelector(".team-header-block").outerHTML;
    panel.innerHTML = teamHeadHtml + qHtml;
    wireQBlock(team);
  }, 500);
}

function wireQBlock(team){
  if(team==="B" && state.arqon && state.arqon.vsBot){ scheduleArqonBot(); return; }
  const panel = document.getElementById(team==="A"?"panelA":"panelB");
  if(!panel) return;
  panel.querySelectorAll("[data-mcq]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const [t,i] = btn.dataset.mcq.split(":");
      submitAnswer(t, i);
    });
  });
}

function endArqonGame(reason){
  const a = state.arqon;
  if(a.finished) return;
  a.finished = true;
  if(ropeTimerHandle) clearInterval(ropeTimerHandle);
  if(arqonBotHandle){ clearTimeout(arqonBotHandle); arqonBotHandle = null; }
  let winner;
  if(a.ropePos <= -50) winner = "A";
  else if(a.ropePos >= 50) winner = "B";
  else if(a.ropePos < 0) winner = "A";
  else if(a.ropePos > 0) winner = "B";
  else winner = "draw";
  a.winner = winner;
  a.reason = reason;
  stopMusic();
  playVictoryJingle(winner==="draw");

  // Fire-and-forget: never let a slow/hanging DB write block the result screen.
  if(state.dbReady){
    const rt = L().arqonResult;
    try{
      state.db.collection("results").add({
        subject: a.subjName, difficulty: a.diffName,
        teamA: a.teamA||rt.team1, teamB: a.teamB||rt.team2,
        scoreA: a.scoreA, scoreB: a.scoreB,
        winner: winner==="A" ? (a.teamA||rt.team1) : winner==="B" ? (a.teamB||rt.team2) : rt.draw,
        playedAt: Date.now(),
      }).catch(()=>{});
    }catch(e){}
  }
  navigate("arqon-result");
}

function viewArqonResult(){
  const a = state.arqon;
  const t = L().arqonResult;
  if(!a || !a.finished) return `<div class="center-note">—</div>`;
  const winName = a.winner==="A" ? (a.teamA||t.team1) : a.winner==="B" ? (a.teamB||t.team2) : null;
  const reasonText = a.reason==="time" ? t.timeUp : t.pulled;
  return `
  <div class="wrap section">
    <div class="card result-banner">
      <span class="trophy">${a.winner==="draw"?icon('draw',34,'var(--muted)'):icon('trophy',34,'var(--brand)')}</span>
      <h2>${a.winner==="draw" ? esc(t.draw) : esc(t.winner(winName))}</h2>
      <p style="color:var(--muted)">${esc(reasonText)} · ${esc(a.subjName)} · ${esc(a.diffName)}</p>
      <div style="display:flex;justify-content:center;gap:30px;margin:22px 0">
        <div><div class="mono" style="font-size:26px;font-weight:700;color:var(--edu)">${a.scoreA}</div><div style="color:var(--muted);font-size:13px">${esc(a.teamA||t.team1)}</div></div>
        <div><div class="mono" style="font-size:26px;font-weight:700;color:var(--fun)">${a.scoreB}</div><div style="color:var(--muted);font-size:13px">${esc(a.teamB||t.team2)}</div></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-brand btn-lg" id="playAgainBtn">${icon('replay',18)} ${esc(t.playAgain)}</button>
        <button class="btn btn-outline btn-lg" data-nav="foydali">${esc(t.toList)}</button>
      </div>
    </div>
  </div>`;
}

/* ===================== TEZKOR TEST (solo speed quiz) ===================== */
let speedTimerHandle = null;
function viewSpeedSetup(){
  const t = L().speed, ts = L().arqonSetup, subjT = L().subjects, diffT = L().difficulties;
  const s = state.speed || {subject:null, difficulty:null, category:null};
  state.speed = s;
  const stepNum = !s.subject ? 1 : 2;
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.setupH2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="steps">
      <div class="step-pill ${stepNum===1?'active':s.subject?'done':''}">${esc(ts.step1)}</div>
      <div class="step-pill ${stepNum===2?'active':''}">${esc(ts.step2)}</div>
    </div>
    ${stepNum===1? subjectPickHtml(s.category, "data-speedsubj", "data-speedcat", "data-speedcatback", subjT, ts) : (!s.difficulty? `
    <div class="diff-grid">
      ${DIFFICULTIES.map(d=>`<button class="pick" data-speeddiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc((SUBJECTS.find(o=>o.id===s.subject)||{}).mode==="math"?diffT[d.id].desc:diffT[d.id].descMcq)}</span><span class="mono" style="color:var(--muted)">${d.speedTime}s</span></button>`).join("")}
    </div>
    <div style="margin-top:16px"><button class="btn btn-outline" id="speedBackSubj">${esc(ts.backSubj)}</button></div>` : `
    <div class="card pad" style="max-width:440px">
      <p style="color:var(--muted);margin-bottom:16px">${esc(t.readyInfo(diffT[s.difficulty].name, DIFFICULTIES.find(d=>d.id===s.difficulty).speedTime))}</p>
      <button class="btn btn-brand btn-block btn-lg" id="speedStartBtn">${icon('clock',18)} ${esc(t.startBtn)}</button>
      <button class="btn btn-outline btn-block" id="speedBackDiff" style="margin-top:10px">${esc(ts.backDiff)}</button>
    </div>`)}
  </div>`;
}
async function startSpeedGame(difficultyId){
  stopDefeatAudio();
  const s = state.speed;
  s.difficulty = difficultyId;
  const diff = DIFFICULTIES.find(d=>d.id===difficultyId);
  const subj = SUBJECTS.find(o=>o.id===s.subject);
  s.timeLeft = diff.speedTime;
  s.totalTime = diff.speedTime;
  s.target = diff.speedTarget;
  s.livesMax = diff.speedLives;
  s.wrongStreak = 0;
  s.score = 0; s.streak = 0; s.finished = false; s.eliminated = false; s.timerRunning = false;
  s.subjName = L().subjects[subj.id];
  s.diffName = L().difficulties[diff.id].name;
  let pool=[], idx=0;
  if(subj.mode==="mcq"){ pool = await getCachedQuestionPool(subj.id, diff.id); }
  function nextQ(){
    if(subj.mode==="math") return genMathQuestion(diff.id);
    if(idx>=pool.length){ pool=reshuffleNoRepeat(pool, pool[pool.length-1]); idx=0; }
    const item = pool[idx++];
    return {mcq:true, ...shuffleOptions(item)};
  }
  s.nextQ = nextQ;
  s.cur = nextQ();
  navigate("speed-play");
  startMusic();
  if(speedTimerHandle){ clearInterval(speedTimerHandle); speedTimerHandle=null; }
}
// The countdown only actually starts once the first question is answered
// (see submitSpeedAnswer), so the player can read question 1 untimed.
function startSpeedTimer(){
  const s = state.speed;
  if(!s || s.timerRunning) return;
  s.timerRunning = true;
  if(speedTimerHandle) clearInterval(speedTimerHandle);
  speedTimerHandle = setInterval(()=>{
    if(state.route!=="speed-play"){ clearInterval(speedTimerHandle); return; }
    s.timeLeft--;
    const el = document.getElementById("speedTimer");
    if(el){ el.textContent = s.timeLeft+"s"; el.classList.toggle("low", s.timeLeft<=10); }
    if(s.timeLeft>0 && s.timeLeft<=5) playCountdownBeep();
    if(s.timeLeft<=0){ clearInterval(speedTimerHandle); finishSpeedGame(); }
  }, 1000);
}
function viewSpeedPlay(){
  const s = state.speed, t = L().speed;
  if(!s || !s.cur) return `<div class="center-note">—</div>`;
  return `
  <div class="wrap section" style="padding-top:24px;max-width:560px;margin:0 auto">
    <div class="rope-hud" style="margin-bottom:10px">
      <div><b style="font-family:Unbounded;font-size:15px">${esc(s.subjName)}</b> <span style="color:var(--muted);font-size:13px">· ${esc(s.diffName)}</span></div>
      <div style="display:flex;align-items:center;gap:8px">
        <button class="music-toggle" data-nav="home" title="${esc(L().nav.home)}" aria-label="${esc(L().nav.home)}">${icon('home',18)}</button>
        <button class="music-toggle" id="musicToggle" title="Music" aria-label="Toggle music">${state.musicOn?icon('volume',18):icon('volumeMute',18)}</button>
        <div class="timer mono" id="speedTimer">${s.timeLeft}s</div>
      </div>
    </div>
    <div style="text-align:center;font-size:20px;letter-spacing:3px;margin-bottom:14px" id="speedLivesDisp">${renderLives(s)}</div>
    <div style="display:flex;gap:20px;justify-content:center;margin-bottom:10px">
      <div><div class="mono" style="font-size:24px;font-weight:700;color:var(--edu)" id="speedScoreDisp">${s.score}</div><div style="color:var(--muted);font-size:12px">${esc(t.scoreLabel)}</div></div>
      <div><div class="mono" style="font-size:24px;font-weight:700;color:var(--brand)" id="speedStreakDisp">${s.streak}</div><div style="color:var(--muted);font-size:12px">${esc(t.streakLabel)}</div></div>
      <div><div class="mono" style="font-size:24px;font-weight:700;color:var(--muted)">${s.target}</div><div style="color:var(--muted);font-size:12px">${esc(t.targetLabel)}</div></div>
    </div>
    <p style="text-align:center;color:var(--muted);font-size:12px;margin-bottom:16px">${esc(t.wrongStreakHint(s.livesMax))}</p>
    <div class="team-panel A" id="speedPanel">${renderSpeedQBlock(s.cur)}</div>
  </div>`;
}
function renderLives(s){
  let out = "";
  for(let i=0;i<s.livesMax;i++){ out += i < (s.livesMax - s.wrongStreak) ? icon('heart',16,'var(--fun)') : icon('heartBroken',16,'var(--danger)'); }
  return out;
}
function renderSpeedQBlock(cur){
  if(cur.math){
    return `<div class="q-text mono" style="text-align:center;font-size:28px">${esc(cur.text)} = ?</div>
    <div class="mcq-opts mcq-opts-num">${cur.opts.map((o,i)=>`<button class="mcq-opt mcq-opt-num" data-speedmcq="${i}">${esc(o)}</button>`).join("")}</div>`;
  }
  const letters=["A","B","C","D"];
  return `<div class="q-text" style="font-size:17px;line-height:1.35">${esc(cur.q)}</div>
  <div class="mcq-opts">${cur.opts.map((o,i)=>`<button class="mcq-opt" data-speedmcq="${i}">${letters[i]}. ${esc(o)}</button>`).join("")}</div>`;
}
function wireSpeedQBlock(){
  const panel = document.getElementById("speedPanel");
  if(!panel) return;
  panel.querySelectorAll("[data-speedmcq]").forEach(b=>b.addEventListener("click", ()=>submitSpeedAnswer(b.dataset.speedmcq)));
}
function submitSpeedAnswer(given){
  const s = state.speed;
  if(s.finished) return;
  startSpeedTimer();
  const cur = s.cur;
  const correct = Number(given)===cur.correct;

  const panel = document.getElementById("speedPanel");
  if(panel){
    panel.querySelectorAll("[data-speedmcq]").forEach(b=>b.disabled=true);
    const chosenBtn = panel.querySelector(`[data-speedmcq="${given}"]`);
    if(chosenBtn) chosenBtn.classList.add(correct?"opt-correct":"opt-wrong");
  }

  if(correct){ s.score++; s.streak++; } else { s.streak = 0; s.wrongStreak++; }
  panel.classList.remove("flash-ok","flash-bad"); void panel.offsetWidth; panel.classList.add(correct?"flash-ok":"flash-bad");
  document.getElementById("speedScoreDisp").textContent = s.score;
  document.getElementById("speedStreakDisp").textContent = s.streak;
  const livesEl = document.getElementById("speedLivesDisp");
  if(livesEl) livesEl.innerHTML = renderLives(s);

  setTimeout(()=>{
    if(s.finished) return;
    if(s.wrongStreak >= s.livesMax){
      if(speedTimerHandle) clearInterval(speedTimerHandle);
      finishSpeedGame(true);
      return;
    }
    if(s.score >= s.target){
      if(speedTimerHandle) clearInterval(speedTimerHandle);
      finishSpeedGame();
      return;
    }
    s.cur = s.nextQ();
    panel.innerHTML = renderSpeedQBlock(s.cur);
    wireSpeedQBlock();
  }, 500);
}
function finishSpeedGame(eliminated){
  const s = state.speed;
  if(s.finished) return;
  s.finished = true;
  s.eliminated = !!eliminated;
  s.won = !s.eliminated && s.score >= (s.target||0);
  stopMusic(); if(s.won) playVictoryJingle(false); else playDefeatJingle();
  const key = `aqlarena_speed_best_${s.subject}_${s.difficulty}`;
  let best = 0;
  try{ best = Number(localStorage.getItem(key))||0; }catch(e){}
  s.isNewBest = s.score > best;
  if(s.isNewBest){ try{ localStorage.setItem(key, String(s.score)); }catch(e){} best = s.score; }
  s.best = best;
  navigate("speed-result");
}
function viewSpeedResult(){
  const s = state.speed, t = L().speed;
  if(!s || !s.finished) return `<div class="center-note">—</div>`;
  return `
  <div class="wrap section">
    <div class="card result-banner">
      <span class="trophy">${s.won?icon('trophy',34,'var(--brand)'):icon('heartBroken',34,'var(--danger)')}</span>
      <h2>${s.won?icon('sparkles',22,'var(--brand)'):icon('frown',22,'var(--danger)')} ${s.won?esc(t.won):esc(t.lost)}</h2>
      <p style="color:var(--muted)">${esc(t.yourScore(s.score))} ${s.isNewBest?"· "+icon('trophy',14,'var(--brand)')+" "+esc(t.newBest):""}</p>
      ${s.eliminated?`<p style="color:var(--muted);font-size:13px">${esc(t.eliminatedInfo(s.livesMax))}</p>`:""}
      <p style="color:var(--muted);font-size:13px">${esc(t.targetInfo(s.target))}</p>
      <p style="color:var(--muted);font-size:13px">${esc(t.best)}: ${s.best}</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-brand btn-lg" id="speedAgainBtn">${icon('replay',18)} ${esc(t.playAgain)}</button>
        <button class="btn btn-outline btn-lg" data-nav="foydali">${esc(t.toList)}</button>
      </div>
    </div>
  </div>`;
}

/* ===================== FORMULA POYGASI (2-team racing quiz) ===================== */
let poygaTimerHandle = null;
function viewPoygaSetup(){
  const t = L().poyga, ts = L().arqonSetup, subjT = L().subjects, diffT = L().difficulties;
  const p = state.poyga || {subject:null, difficulty:null, teamA:"", teamB:"", category:null};
  state.poyga = p;
  const stepNum = !p.subject ? 1 : !p.difficulty ? 2 : 3;
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="steps">
      <div class="step-pill ${stepNum===1?'active':p.subject?'done':''}">${esc(ts.step1)}</div>
      <div class="step-pill ${stepNum===2?'active':p.difficulty?'done':''}">${esc(ts.step2)}</div>
      <div class="step-pill ${stepNum===3?'active':''}">${esc(ts.step3)}</div>
    </div>
    ${stepNum===1? subjectPickHtml(p.category, "data-poygasubj", "data-poygacat", "data-poygacatback", subjT, ts) : ""}
    ${stepNum===2?`
    <div class="diff-grid">
      ${DIFFICULTIES.map(d=>`<button class="pick" data-poygadiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc((SUBJECTS.find(o=>o.id===p.subject)||{}).mode==="math"?diffT[d.id].desc:diffT[d.id].descMcq)}</span><span class="mono" style="color:var(--muted)">${d.time}s</span></button>`).join("")}
    </div>
    <div style="margin-top:16px"><button class="btn btn-outline" id="poygaBackSubj">${esc(ts.backSubj)}</button></div>` : ""}
    ${stepNum===3?`
    <div class="card pad" style="max-width:520px">
      <div class="formrow">
        <label>${esc(ts.modeLabel)}</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn ${!p.vsBot?'btn-brand':'btn-outline'}" id="poygaMode2pBtn">${icon('users',16)} ${esc(ts.mode2p)}</button>
          <button type="button" class="btn ${p.vsBot?'btn-brand':'btn-outline'}" id="poygaModeBotBtn">${icon('robot',16)} ${esc(ts.modeBot)}</button>
        </div>
      </div>
      <div class="formrow"><label>${esc(ts.teamALabel)}</label><input type="text" id="poygaTeamA" placeholder="${esc(ts.teamAPh)}" maxlength="20" value="${esc(p.teamA||'')}"></div>
      ${p.vsBot ? "" : `<div class="formrow"><label>${esc(ts.teamBLabel)}</label><input type="text" id="poygaTeamB" placeholder="${esc(ts.teamBPh)}" maxlength="20" value="${esc(p.teamB||'')}"></div>`}
      <button class="btn btn-brand btn-block btn-lg" id="poygaStartBtn">${icon('flag',18)} ${esc(t.startBtn)}</button>
      <button class="btn btn-outline btn-block" id="poygaBackDiff" style="margin-top:10px">${esc(ts.backDiff)}</button>
    </div>` : ""}
  </div>`;
}
async function startPoygaGame(){
  const p = state.poyga;
  const diff = DIFFICULTIES.find(d=>d.id===p.difficulty);
  const subj = SUBJECTS.find(o=>o.id===p.subject);
  p.timeLeft = diff.time; p.progA=0; p.progB=0; p.scoreA=0; p.scoreB=0; p.finished=false; p.winner=null;
  p.subjName = L().subjects[subj.id]; p.diffName = L().difficulties[diff.id].name;
  let poolA=[],poolB=[],idxA=0,idxB=0;
  if(subj.mode==="mcq"){ const pool = await getCachedQuestionPool(subj.id, diff.id); poolA=prioritizedShuffle(pool); poolB=prioritizedShuffle(pool); }
  function nextQ(team){
    if(subj.mode==="math") return genMathQuestion(diff.id);
    const pool = team==="A"?poolA:poolB; let i = team==="A"?idxA:idxB;
    if(i>=pool.length){
      const reshuffled = reshuffleNoRepeat(pool, pool[pool.length-1]);
      if(team==="A") poolA=reshuffled; else poolB=reshuffled;
      i=0;
    }
    const item=(team==="A"?poolA:poolB)[i]; if(team==="A") idxA=i+1; else idxB=i+1;
    return {mcq:true, ...shuffleOptions(item)};
  }
  p.nextQ = nextQ; p.curA = nextQ("A"); p.curB = nextQ("B");
  navigate("poyga-play");
  startMusic();
  if(poygaTimerHandle) clearInterval(poygaTimerHandle);
  poygaTimerHandle = setInterval(()=>{
    if(state.route!=="poyga-play"){ clearInterval(poygaTimerHandle); return; }
    p.timeLeft--;
    const el = document.getElementById("poygaTimer");
    if(el){ el.textContent = p.timeLeft+"s"; el.classList.toggle("low", p.timeLeft<=10); }
    if(p.timeLeft>0 && p.timeLeft<=5) playCountdownBeep();
    if(p.timeLeft<=0){ clearInterval(poygaTimerHandle); endPoygaGame("time"); }
  }, 1000);
}
// Race car images (user-provided), nose pointing right — matches the
// track's left-to-right direction of travel. CAR_IMG_A = team A (blue),
// CAR_IMG_B = team B (red).
const CAR_IMG_A = "assets/img/car-blue.png";
const CAR_IMG_B = "assets/img/car-red.png";
function raceCarImg(src){
  return `<img src="${src}" class="race-car-img" alt="" draggable="false">`;
}
function viewPoygaPlay(){
  const p = state.poyga, rt = L().arqonResult;
  if(!p || !p.curA) return `<div class="center-note">—</div>`;
  return `
  <div class="wrap section" style="padding-top:24px">
    <div class="rope-wrap">
      <div class="rope-hud">
        <div><b style="font-family:Unbounded;font-size:15px">${esc(p.subjName)}</b> <span style="color:var(--muted);font-size:13px">· ${esc(p.diffName)}</span></div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="music-toggle" data-nav="home" title="${esc(L().nav.home)}" aria-label="${esc(L().nav.home)}">${icon('home',18)}</button>
          <button class="music-toggle" id="musicToggle" title="Music" aria-label="Toggle music">${state.musicOn?icon('volume',18):icon('volumeMute',18)}</button>
          <div class="timer mono" id="poygaTimer">${p.timeLeft}s</div>
        </div>
      </div>
      <div class="race-track">
        <div class="race-lane"><div class="race-car team-a" id="carA" style="left:${p.progA}%">${raceCarImg(CAR_IMG_A)}</div><div class="race-finish"></div></div>
        <div class="race-lane"><div class="race-car team-b" id="carB" style="left:${p.progB}%">${raceCarImg(CAR_IMG_B)}</div><div class="race-finish"></div></div>
      </div>
    </div>
    <div class="qa-cols">
      <div class="team-panel A" id="poygaPanelA">
        <div class="team-header-block">
          <div class="team-head"><span class="team-name">${icon('car',16)} ${esc(p.teamA||rt.team1)}</span><span class="team-score mono" id="poygaScoreA">${p.scoreA}</span></div>
        </div>
        ${renderQBlock("A", p.curA)}
      </div>
      <div class="team-panel B" id="poygaPanelB">
        <div class="team-header-block">
          <div class="team-head"><span class="team-name">${icon('car',16)} ${p.vsBot?icon('robot',15)+' ':''}${esc(p.teamB||rt.team2)}</span><span class="team-score mono" id="poygaScoreB">${p.scoreB}</span></div>
        </div>
        ${renderQBlock("B", p.curB, p.vsBot)}
      </div>
    </div>
  </div>`;
}
function wirePoygaQBlock(team){
  if(team==="B" && state.poyga && state.poyga.vsBot){ schedulePoygaBot(); return; }
  const panel = document.getElementById(team==="A"?"poygaPanelA":"poygaPanelB");
  if(!panel) return;
  panel.querySelectorAll("[data-mcq]").forEach(btn=>btn.addEventListener("click", ()=>{ const [t,i]=btn.dataset.mcq.split(":"); submitPoygaAnswer(t,i); }));
}
function submitPoygaAnswer(team, given){
  const p = state.poyga;
  if(p.finished) return;
  const cur = team==="A"?p.curA:p.curB;
  const correct = Number(given)===cur.correct;

  const panel = document.getElementById(team==="A"?"poygaPanelA":"poygaPanelB");
  if(panel){
    panel.querySelectorAll("[data-mcq]").forEach(b=>b.disabled=true);
    const chosenBtn = panel.querySelector(`[data-mcq="${team}:${given}"]`);
    if(chosenBtn) chosenBtn.classList.add(correct?"opt-correct":"opt-wrong");
  }

  const step = correct?9:-3;
  if(team==="A"){ p.progA = Math.max(0,Math.min(100,p.progA+step)); if(correct) p.scoreA++; }
  else { p.progB = Math.max(0,Math.min(100,p.progB+step)); if(correct) p.scoreB++; }
  panel.classList.remove("flash-ok","flash-bad"); void panel.offsetWidth; panel.classList.add(correct?"flash-ok":"flash-bad");
  document.getElementById("carA").style.left = p.progA+"%";
  document.getElementById("carB").style.left = p.progB+"%";
  document.getElementById("poygaScoreA").textContent = p.scoreA;
  document.getElementById("poygaScoreB").textContent = p.scoreB;

  setTimeout(()=>{
    if(p.finished) return;
    if(p.progA>=100 || p.progB>=100){ endPoygaGame("finish"); return; }
    const nq = p.nextQ(team);
    if(team==="A") p.curA=nq; else p.curB=nq;
    const headHtml = panel.querySelector(".team-header-block").outerHTML;
    panel.innerHTML = headHtml + renderQBlock(team, nq, team==="B" && p.vsBot);
    wirePoygaQBlock(team);
  }, 500);
}

// Lets two people share one computer (no second mouse) in the 2-team games:
// Team A answers by clicking as usual, Team B presses 1-4 on the keyboard
// to pick their option (matching the on-screen number badges rendered by
// renderQBlock for team "B"). Looked up fresh on every keypress rather than
// cached, since the option buttons are re-rendered after each question.
function teamBKeyHandler(e){
  if(e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
  const idx = {"1":0,"2":1,"3":2,"4":3}[e.key];
  if(idx===undefined) return;
  let panelId, submit;
  if(state.route==="arqon-play"){ panelId="panelB"; submit=submitAnswer; }
  else if(state.route==="poyga-play"){ panelId="poygaPanelB"; submit=submitPoygaAnswer; }
  else return;
  const panel = document.getElementById(panelId);
  if(!panel) return;
  const btns = panel.querySelectorAll("[data-mcq]:not([disabled])");
  const btn = btns[idx];
  if(!btn) return;
  e.preventDefault();
  const [t,i] = btn.dataset.mcq.split(":");
  submit(t,i);
}
function endPoygaGame(reason){
  const p = state.poyga;
  if(p.finished) return;
  p.finished = true;
  if(poygaTimerHandle) clearInterval(poygaTimerHandle);
  if(poygaBotHandle){ clearTimeout(poygaBotHandle); poygaBotHandle = null; }
  p.reason = reason;
  p.winner = p.progA===p.progB ? "draw" : (p.progA>p.progB ? "A" : "B");
  stopMusic(); playVictoryJingle(p.winner==="draw");
  // Fire-and-forget: never let a slow/hanging DB write block the result screen.
  if(state.dbReady){
    const rt = L().arqonResult;
    try{
      state.db.collection("results").add({subject:p.subjName, difficulty:p.diffName, teamA:p.teamA||rt.team1, teamB:p.teamB||rt.team2,
        scoreA:p.scoreA, scoreB:p.scoreB, winner: p.winner==="A"?(p.teamA||rt.team1):p.winner==="B"?(p.teamB||rt.team2):rt.draw, playedAt:Date.now(), game:"poyga"}).catch(()=>{});
    }catch(e){}
  }
  navigate("poyga-result");
}
function viewPoygaResult(){
  const p = state.poyga, t = L().poyga, rt = L().arqonResult;
  if(!p || !p.finished) return `<div class="center-note">—</div>`;
  const winName = p.winner==="A"?(p.teamA||rt.team1):p.winner==="B"?(p.teamB||rt.team2):null;
  return `
  <div class="wrap section">
    <div class="card result-banner">
      <span class="trophy">${p.winner==="draw"?icon('draw',34,'var(--muted)'):icon('trophy',34,'var(--brand)')}</span>
      <h2>${p.winner==="draw"?esc(t.draw):esc(t.winner(winName))}</h2>
      <p style="color:var(--muted)">${esc(p.reason==="time"?t.timeUp:t.finishLine)} · ${esc(p.subjName)} · ${esc(p.diffName)}</p>
      <div style="display:flex;justify-content:center;gap:30px;margin:22px 0">
        <div><div class="mono" style="font-size:26px;font-weight:700;color:var(--edu)">${p.scoreA}</div><div style="color:var(--muted);font-size:13px">${esc(p.teamA||rt.team1)}</div></div>
        <div><div class="mono" style="font-size:26px;font-weight:700;color:var(--fun)">${p.scoreB}</div><div style="color:var(--muted);font-size:13px">${esc(p.teamB||rt.team2)}</div></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-brand btn-lg" id="poygaAgainBtn">${icon('replay',18)} ${esc(t.playAgain)}</button>
        <button class="btn btn-outline btn-lg" data-nav="foydali">${esc(t.toList)}</button>
      </div>
    </div>
  </div>`;
}

/* ===================== SAVOL QO'SHISH (teacher panel) ===================== */
function viewSavollar(){
  const t = L().savollar;
  if(!state.user){
    return `
    <div class="wrap section">
      <div class="card pad" style="max-width:500px;margin:0 auto;text-align:center">
        <h2 style="font-size:20px">${esc(t.needLoginT)}</h2>
        <p style="color:var(--muted);font-size:14.5px">${esc(t.needLoginD)}</p>
        <button class="btn btn-brand btn-lg" data-auth="register">${esc(L().nav.register)}</button>
      </div>
    </div>`;
  }
  if(state.user.role!=="oqituvchi"){
    return `
    <div class="wrap section">
      <div class="card pad" style="max-width:500px;margin:0 auto;text-align:center">
        <h2 style="font-size:20px">${esc(t.teacherOnlyT)}</h2>
        <p style="color:var(--muted);font-size:14.5px">${esc(t.teacherOnlyD)}</p>
      </div>
    </div>`;
  }
  const f = state.teacherForm;
  const subjT = L().subjects, diffT = L().difficulties;
  const mcqSubjects = SUBJECTS.filter(s=>s.mode==="mcq");
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="card pad" style="max-width:640px">
      ${state.teacherErr?`<div class="err-msg">${esc(state.teacherErr)}</div>`:""}
      ${state.teacherOk?`<div class="ok-msg">${esc(state.teacherOk)}</div>`:""}
      <div class="two-col">
        <div class="formrow"><label>${esc(t.fanLabel)}</label>
          <select id="tf-subject">${mcqSubjects.map(s=>`<option value="${s.id}" ${f.subject===s.id?'selected':''}>${esc(subjT[s.id])}</option>`).join("")}</select>
        </div>
        <div class="formrow"><label>${esc(t.qiyinlikLabel)}</label>
          <select id="tf-difficulty">${DIFFICULTIES.map(d=>`<option value="${d.id}" ${f.difficulty===d.id?'selected':''}>${esc(diffT[d.id].name)}</option>`).join("")}</select>
        </div>
      </div>
      <div class="formrow"><label>${esc(t.savolLabel)}</label><textarea id="tf-question" rows="2" placeholder="${esc(t.savolPh)}">${esc(f.q)}</textarea></div>
      <div class="formrow"><label>${esc(t.variantsLabel)}</label>
        ${[0,1,2,3].map(i=>`
        <div class="opt-row">
          <input type="radio" name="tf-correct" value="${i}" ${f.correct==i?'checked':''}>
          <input type="text" class="tf-opt" data-i="${i}" placeholder="${esc(t.variantPh(['A','B','C','D'][i]))}" value="${esc(f.opts[i])}">
        </div>`).join("")}
      </div>
      <button class="btn btn-brand btn-block btn-lg" id="tfSubmit">${icon('plus',18)} ${esc(t.submitBtn)}</button>
    </div>

    <div style="max-width:640px;margin-top:26px" id="myQuestions">
      <h3 style="font-size:16px">${esc(t.myQuestions)}</h3>
      <div class="qlist" id="myQList"><div class="center-note">${esc(t.myQLoading)}</div></div>
    </div>
  </div>`;
}

async function loadMyQuestions(){
  const list = document.getElementById("myQList");
  if(!list) return;
  const t = L().savollar;
  if(!state.dbReady){ list.innerHTML = `<div class="center-note">${esc(t.dbDown)}</div>`; return; }
  try{
    const snap = await state.db.collection("questions").where("authorEmail","==",state.user.email).limit(50).get();
    const docs = snap.docs.map(d=>({id:d.id, ...d.data()})).sort((x,y)=>(y.createdAt||0)-(x.createdAt||0));
    state.myQCache = docs;
    renderMyQList();
  }catch(e){ list.innerHTML = `<div class="center-note">${esc(t.myQError)}</div>`; }
}

function renderMyQList(){
  const list = document.getElementById("myQList");
  if(!list) return;
  const t = L().savollar, subjT = L().subjects, diffT = L().difficulties;
  const mcqSubjects = SUBJECTS.filter(s=>s.mode==="mcq");
  const docs = state.myQCache || [];
  const banner = state.myQErr ? `<div class="err-msg">${esc(state.myQErr)}</div>`
    : state.myQOk ? `<div class="ok-msg">${esc(state.myQOk)}</div>` : "";
  if(docs.length===0){
    list.innerHTML = banner + `<div class="center-note">${esc(t.myQEmpty)}</div>`;
  } else {
    list.innerHTML = banner + docs.map(v=>{
      const subjName = subjT[v.subject] || v.subject;
      const diffName = (diffT[v.difficulty]||{}).name || v.difficulty;
      if(state.myQDeleteId===v.id){
        return `<div class="qitem" data-qid="${v.id}">
          <div style="flex:1;min-width:0">
            <div class="qitem-q">${esc(v.question)}</div>
            <div style="color:var(--fun-soft-text);font-size:12.5px;margin-top:4px">${esc(t.deleteConfirm)}</div>
          </div>
          <div style="display:flex;gap:8px;flex:none">
            <button class="btn btn-outline" style="padding:6px 12px;font-size:12.5px" data-qcanceldel="${v.id}">${esc(t.cancel)}</button>
            <button class="btn" style="padding:6px 12px;font-size:12.5px;background:var(--danger);color:#fff" data-qconfirmdel="${v.id}">${esc(t.deleteYes)}</button>
          </div>
        </div>`;
      }
      if(state.myQEditId===v.id){
        const ef = state.myQEditForm;
        return `<div class="qitem" data-qid="${v.id}" style="flex-direction:column;align-items:stretch">
          <div class="two-col">
            <div class="formrow"><label>${esc(t.fanLabel)}</label>
              <select data-eqf="subject">${mcqSubjects.map(s=>`<option value="${s.id}" ${ef.subject===s.id?'selected':''}>${esc(subjT[s.id])}</option>`).join("")}</select>
            </div>
            <div class="formrow"><label>${esc(t.qiyinlikLabel)}</label>
              <select data-eqf="difficulty">${DIFFICULTIES.map(d=>`<option value="${d.id}" ${ef.difficulty===d.id?'selected':''}>${esc(diffT[d.id].name)}</option>`).join("")}</select>
            </div>
          </div>
          <div class="formrow"><label>${esc(t.savolLabel)}</label><textarea data-eqf="q" rows="2">${esc(ef.q)}</textarea></div>
          <div class="formrow"><label>${esc(t.variantsLabel)}</label>
            ${[0,1,2,3].map(i=>`
            <div class="opt-row">
              <input type="radio" name="eq-correct" value="${i}" ${ef.correct==i?'checked':''} data-eqf="correct">
              <input type="text" data-eqf="opt" data-i="${i}" placeholder="${esc(t.variantPh(['A','B','C','D'][i]))}" value="${esc(ef.opts[i])}">
            </div>`).join("")}
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-brand" style="flex:1" data-qsave="${v.id}">${esc(t.save)}</button>
            <button class="btn btn-outline" style="flex:1" data-qcanceledit="${v.id}">${esc(t.cancel)}</button>
          </div>
        </div>`;
      }
      return `<div class="qitem" data-qid="${v.id}">
        <div style="flex:1;min-width:0">
          <div class="qitem-q">${esc(v.question)}</div>
          <span class="badge ready" style="white-space:nowrap;margin-top:4px;display:inline-block">${esc(subjName)} · ${esc(diffName)}</span>
        </div>
        <div style="display:flex;gap:6px;flex:none">
          <button class="icon-btn" data-qedit="${v.id}" title="${esc(t.edit)}" aria-label="${esc(t.edit)}">${icon('edit',15)}</button>
          <button class="icon-btn danger" data-qdel="${v.id}" title="${esc(t.delete)}" aria-label="${esc(t.delete)}">${icon('trash',15)}</button>
        </div>
      </div>`;
    }).join("");
  }
  wireMyQList();
}

function wireMyQList(){
  const list = document.getElementById("myQList");
  if(!list) return;
  list.querySelectorAll("[data-qedit]").forEach(btn=>btn.addEventListener("click", ()=>startEditQuestion(btn.dataset.qedit)));
  list.querySelectorAll("[data-qdel]").forEach(btn=>btn.addEventListener("click", ()=>startDeleteQuestion(btn.dataset.qdel)));
  list.querySelectorAll("[data-qcanceldel]").forEach(btn=>btn.addEventListener("click", ()=>cancelDeleteQuestion()));
  list.querySelectorAll("[data-qconfirmdel]").forEach(btn=>btn.addEventListener("click", ()=>confirmDeleteQuestion(btn.dataset.qconfirmdel)));
  list.querySelectorAll("[data-qcanceledit]").forEach(btn=>btn.addEventListener("click", ()=>cancelEditQuestion()));
  list.querySelectorAll("[data-qsave]").forEach(btn=>btn.addEventListener("click", ()=>saveEditQuestion(btn.dataset.qsave)));

  const ef = state.myQEditForm;
  if(ef){
    const subjSel = list.querySelector('[data-eqf="subject"]'); if(subjSel) subjSel.addEventListener("change", e=>ef.subject=e.target.value);
    const diffSel = list.querySelector('[data-eqf="difficulty"]'); if(diffSel) diffSel.addEventListener("change", e=>ef.difficulty=e.target.value);
    const qArea = list.querySelector('[data-eqf="q"]'); if(qArea) qArea.addEventListener("input", e=>ef.q=e.target.value);
    list.querySelectorAll('[data-eqf="opt"]').forEach(inp=>inp.addEventListener("input", e=>{ ef.opts[Number(e.target.dataset.i)] = e.target.value; }));
    list.querySelectorAll('[data-eqf="correct"]').forEach(r=>r.addEventListener("change", e=>{ ef.correct = Number(e.target.value); }));
  }
}

function startEditQuestion(id){
  const v = (state.myQCache||[]).find(q=>q.id===id);
  if(!v) return;
  state.myQDeleteId = null;
  state.myQErr = ""; state.myQOk = "";
  state.myQEditId = id;
  state.myQEditForm = {subject:v.subject, difficulty:v.difficulty, q:v.question, opts:(v.options||["","","",""]).slice(), correct:v.correct||0};
  renderMyQList();
}
function cancelEditQuestion(){
  state.myQEditId = null; state.myQEditForm = null; state.myQErr = "";
  renderMyQList();
}
async function saveEditQuestion(id){
  const ef = state.myQEditForm;
  const t = L().savollar;
  if(!ef || !ef.q.trim() || ef.opts.some(o=>!o.trim())){
    state.myQErr = t.fillAllErr;
    renderMyQList(); return;
  }
  if(!state.dbReady){ state.myQErr = t.dbDownErr; renderMyQList(); return; }
  try{
    await state.db.collection("questions").doc(id).update({
      subject: ef.subject, difficulty: ef.difficulty, question: ef.q.trim(),
      options: ef.opts.map(o=>o.trim()), correct: ef.correct,
    });
    state.myQEditId = null; state.myQEditForm = null; state.myQErr = ""; state.myQOk = "";
    await loadMyQuestions();
  }catch(e){ state.myQErr = t.updateErr; renderMyQList(); }
}
function startDeleteQuestion(id){
  state.myQEditId = null; state.myQEditForm = null;
  state.myQErr = ""; state.myQOk = "";
  state.myQDeleteId = id;
  renderMyQList();
}
function cancelDeleteQuestion(){
  state.myQDeleteId = null;
  renderMyQList();
}
async function confirmDeleteQuestion(id){
  const t = L().savollar;
  if(!state.dbReady){ state.myQErr = t.dbDownErr; renderMyQList(); return; }
  try{
    await state.db.collection("questions").doc(id).delete();
    state.myQDeleteId = null; state.myQErr = ""; state.myQOk = t.deletedOk;
    await loadMyQuestions();
  }catch(e){ state.myQErr = t.deleteErr; renderMyQList(); }
}

/* ===================== XOTIRA (memory) ===================== */
let memState = null;
let memTimerHandle = null;
const MEMORY_DIFFICULTIES = [
  {id:"oson", pairs:6, time:30},
  {id:"normal", pairs:8, time:40},
  {id:"qiyin", pairs:10, time:50},
];
const MEM_ICONS = ["apple","rocket","balloon","bee","moon","headphones","soccerBall","donut","sun","heart","car","gamepad"];
// Short, cheerful click tone played whenever a card is flipped face-up.
function playCardFlipSound(){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.01;
  playTone(720, t, 0.08, "triangle", 0.06);
}
// Two-note "go!" cue played once, the moment the player flips the very
// first card — this is what makes the round's actual start audible,
// since the game itself has no continuous background music.
function playMemStartCue(){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.02;
  playTone(523.25, t, 0.12, "sine", 0.08);
  playTone(783.99, t+0.11, 0.16, "sine", 0.08);
}
function viewXotira(){
  const t = L().xotira, c = L().common, diffT = L().difficulties;
  if(!state.xotira) state.xotira = {difficulty:null};
  const st = state.xotira;
  if(!st.difficulty){
    // Returning to the difficulty picker (e.g. via "Darajani almashtirish")
    // doesn't go through navigate()'s route-change audio cleanup since the
    // route stays "xotira" — so stop any running timer/jingle explicitly here.
    if(memTimerHandle){ clearInterval(memTimerHandle); memTimerHandle=null; }
    if(memState) memState.finished = true;
    stopVictoryAudio(); stopDefeatAudio();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${MEMORY_DIFFICULTIES.map(d=>`<button class="pick" data-memdiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc(d))}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  if(memTimerHandle){ clearInterval(memTimerHandle); memTimerHandle=null; }
  // A fresh game is starting — make sure no leftover win/lose jingle from a
  // previous round keeps playing over it.
  stopVictoryAudio(); stopDefeatAudio();
  const diff = MEMORY_DIFFICULTIES.find(d=>d.id===st.difficulty);
  const icons = MEM_ICONS.slice(0, diff.pairs);
  const cards = shuffle(icons.concat(icons)).map((ic,i)=>({id:i, icon:ic, flipped:false, matched:false}));
  memState = {cards, first:null, second:null, moves:0, matched:0, lock:false, startTime:Date.now(),
    timeLeft:diff.time, finished:false, started:false};
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
    </div>
    <div class="rope-hud" style="max-width:420px;margin:0 auto 14px">
      <div class="mono" id="memMovesDisp" style="font-size:13px">${esc(t.moves(0))}</div>
      <div class="timer mono" id="memTimer" style="font-size:18px;padding:5px 12px">${diff.time}s</div>
    </div>
    <div class="mem-grid" id="memGrid">
      ${cards.map(c=>`<button class="mem-card" data-id="${c.id}">?</button>`).join("")}
    </div>
    <div style="text-align:center;margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="memChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function memStartTimer(){
  if(memTimerHandle) clearInterval(memTimerHandle);
  memTimerHandle = setInterval(()=>{
    if(!memState || memState.finished || state.route!=="xotira"){ clearInterval(memTimerHandle); memTimerHandle=null; return; }
    memState.timeLeft--;
    const el = document.getElementById("memTimer");
    if(el){ el.textContent = memState.timeLeft+"s"; el.classList.toggle("low", memState.timeLeft<=10); }
    if(memState.timeLeft>0 && memState.timeLeft<=5) playCountdownBeep();
    if(memState.timeLeft<=0){ memEndGame(false); }
  }, 1000);
}
// Mirrors the other mini-games (Target, Snake): on game end, the play area
// itself is replaced with a result panel carrying its own restart button,
// rather than a status line the player has to notice on their own.
function memEndGame(won){
  const t = L().xotira, c = L().common;
  memState.finished = true;
  if(memTimerHandle){ clearInterval(memTimerHandle); memTimerHandle=null; }
  const grid = document.getElementById("memGrid");
  let titleHtml, subText;
  if(won){
    const secs = Math.round((Date.now()-memState.startTime)/1000);
    playVictoryJingle(false);
    titleHtml = `${icon('sparkles',20,'var(--brand)')} ${esc(t.winTitle)}`;
    subText = t.winSub(memState.moves, secs);
  } else {
    playDefeatJingle();
    titleHtml = `${icon('frown',20,'var(--danger)')} ${esc(t.timeUpTitle)}`;
    subText = t.timeUpSub;
  }
  if(grid){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:34px 10px">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
      <div style="color:var(--muted);margin-bottom:18px">${esc(subText)}</div>
      <button class="btn btn-brand btn-lg" id="memPlayAgainBtn">${icon('replay',18)} ${esc(c.restart)}</button>
    </div>`;
    const again = document.getElementById("memPlayAgainBtn");
    if(again) again.addEventListener("click", render);
  }
  // The countdown is meaningless once the round is over — hide it so a
  // frozen/stale second count isn't left on screen next to the result.
  const timerEl = document.getElementById("memTimer");
  if(timerEl) timerEl.style.display = "none";
}
function wireMemory(){
  const t = L().xotira;
  document.querySelectorAll("[data-memdiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.xotira.difficulty = b.dataset.memdiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("memChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    // Stop the running game immediately — otherwise the old timer keeps
    // counting down in the background and fires the defeat jingle even
    // though the player has already left to the difficulty picker.
    if(memTimerHandle){ clearInterval(memTimerHandle); memTimerHandle=null; }
    if(memState) memState.finished = true;
    state.xotira.difficulty=null;
    render();
  });

  const grid = document.getElementById("memGrid");
  if(!grid) return;
  // The countdown and its cue sound only start once the player flips their
  // first card, not the instant the board is drawn — see the first-flip
  // check inside the card click handler below.
  grid.querySelectorAll(".mem-card").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(memState.finished) return;
      const id = Number(btn.dataset.id);
      const c = memState.cards.find(x=>x.id===id);
      if(memState.lock || c.flipped || c.matched) return;
      if(!memState.started){
        memState.started = true;
        memState.startTime = Date.now();
        playMemStartCue();
        memStartTimer();
      }
      c.flipped = true;
      btn.innerHTML = icon(c.icon, 26, MEM_ICON_COLOR[c.icon]);
      btn.classList.add("flipped");
      playCardFlipSound();
      if(memState.first===null){ memState.first = id; return; }
      memState.second = id;
      memState.lock = true;
      memState.moves++;
      const c1 = memState.cards.find(x=>x.id===memState.first);
      const c2 = c;
      document.getElementById("memMovesDisp").textContent = t.moves(memState.moves);
      setTimeout(()=>{
        if(!memState || memState.finished) return;
        if(c1.icon===c2.icon){
          c1.matched = true; c2.matched = true;
          memState.matched += 2;
          [c1.id,c2.id].forEach(id2=>{ const el = grid.querySelector(`[data-id="${id2}"]`); el.classList.add("matched"); });
          if(memState.matched===memState.cards.length){ memEndGame(true); }
        } else {
          c1.flipped=false; c2.flipped=false;
          [c1.id,c2.id].forEach(id2=>{ const el = grid.querySelector(`[data-id="${id2}"]`); el.textContent="?"; el.classList.remove("flipped"); });
        }
        memState.first=null; memState.second=null; memState.lock=false;
      }, 700);
    });
  });
}

/* ===================== REAKSIYA (reaction) ===================== */
let reactState = {phase:"idle", rounds:[], startAt:0, timeoutHandle:null};
function viewReaksiya(){
  reactState = {phase:"idle", rounds:[], startAt:0, timeoutHandle:null};
  const t = L().reaksiya, c = L().common;
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="react-box react-idle" id="reactBox">${esc(t.start)}</div>
    <div style="text-align:center;margin-top:16px" id="reactInfo"></div>
    <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
  </div>`;
}
function wireReaksiya(){
  const box = document.getElementById("reactBox");
  if(!box) return;
  const t = L().reaksiya;
  box.addEventListener("click", ()=>{
    if(reactState.phase==="idle" || reactState.phase==="result"){
      if(reactState.rounds.length>=3){ reactState.rounds=[]; document.getElementById("reactInfo").innerHTML=""; }
      reactState.phase = "waiting";
      box.className = "react-box react-wait";
      box.textContent = t.wait;
      const delay = randInt(1200,3500);
      reactState.timeoutHandle = setTimeout(()=>{
        reactState.phase = "go";
        reactState.startAt = Date.now();
        box.className = "react-box react-go";
        box.textContent = t.go;
      }, delay);
    } else if(reactState.phase==="waiting"){
      clearTimeout(reactState.timeoutHandle);
      reactState.phase = "idle";
      box.className = "react-box react-idle";
      box.textContent = t.early;
    } else if(reactState.phase==="go"){
      const ms = Date.now() - reactState.startAt;
      reactState.rounds.push(ms);
      reactState.phase = "result";
      box.className = "react-box react-idle";
      if(reactState.rounds.length<3){
        box.textContent = t.round(ms, reactState.rounds.length);
      } else {
        const avg = Math.round(reactState.rounds.reduce((a,b)=>a+b,0)/reactState.rounds.length);
        let rating = avg<250 ? t.r1 : avg<400 ? t.r2 : avg<600 ? t.r3 : t.r4;
        let ratingIcon = avg<250 ? 'zap' : avg<400 ? 'check' : avg<600 ? 'meh' : 'turtle';
        let ratingColor = avg<250 ? 'var(--brand)' : avg<400 ? 'var(--ok)' : avg<600 ? 'var(--muted)' : 'var(--danger)';
        box.textContent = t.avg(avg);
        document.getElementById("reactInfo").innerHTML = `<b>${icon(ratingIcon,16,ratingColor)} ${esc(rating)}</b><br><span style="color:var(--muted);font-size:13px">${esc(t.retryHint)}</span>`;
      }
    }
  });
}

/* ===================== 15-PAZL (puzzle) ===================== */
const PAZL_DIFFICULTIES = [
  {id:"oson", shuffleMoves:25, time:120, hints:3},
  {id:"normal", shuffleMoves:55, time:180, hints:4},
  {id:"qiyin", shuffleMoves:90, time:300, hints:5},
];
// Renders a whole-minute time budget as m:ss (e.g. 125 -> "2:05").
function pzFormatTime(s){
  const m = Math.floor(s/60), r = s%60;
  return `${m}:${String(r).padStart(2,"0")}`;
}
let pzState = null;
let pzTimerHandle = null;
let pzHintTimeoutHandle = null;

// --- Solver used only by the "Yordam" (hint) button: A* search over the
// 4x4 sliding-puzzle state space using the Manhattan-distance + linear-
// conflict heuristic. The search is hard-capped by a fixed number of heap
// pops — not just "real" expansions, since a heap full of stale duplicate
// entries could otherwise stall well past the intended budget — so a
// single hint click always resolves in a fraction of a second. When the
// cap is hit before a full solution is found, the best partial lead found
// along the way is used instead, preferring one that doesn't just undo a
// board we already suggested a moment ago, so repeated hints don't get
// stuck bouncing between the same couple of states.
function pzManhattanLC(tiles, size){
  let manhattan = 0;
  for(let i=0;i<tiles.length;i++){
    const v = tiles[i];
    if(v===0) continue;
    const tr = Math.floor((v-1)/size), tc=(v-1)%size;
    const r = Math.floor(i/size), c = i%size;
    manhattan += Math.abs(r-tr)+Math.abs(c-tc);
  }
  let conflict = 0;
  for(let r=0;r<size;r++){
    const rowVals = [];
    for(let c=0;c<size;c++){
      const v = tiles[r*size+c];
      if(v===0) continue;
      const tr = Math.floor((v-1)/size);
      if(tr===r) rowVals.push({c, tc:(v-1)%size});
    }
    for(let i=0;i<rowVals.length;i++) for(let j=i+1;j<rowVals.length;j++){
      if(rowVals[i].tc > rowVals[j].tc) conflict++;
    }
  }
  for(let c=0;c<size;c++){
    const colVals = [];
    for(let r=0;r<size;r++){
      const v = tiles[r*size+c];
      if(v===0) continue;
      const tc = (v-1)%size;
      if(tc===c) colVals.push({r, tr:Math.floor((v-1)/size)});
    }
    for(let i=0;i<colVals.length;i++) for(let j=i+1;j<colVals.length;j++){
      if(colVals[i].tr > colVals[j].tr) conflict++;
    }
  }
  return manhattan + 2*conflict;
}
class PzHeap{
  constructor(){ this.arr=[]; }
  push(item){ this.arr.push(item); this._up(this.arr.length-1); }
  pop(){
    const top=this.arr[0];
    const last=this.arr.pop();
    if(this.arr.length){ this.arr[0]=last; this._down(0); }
    return top;
  }
  size(){ return this.arr.length; }
  _up(i){
    while(i>0){
      const p=(i-1)>>1;
      if(this.arr[p].f<=this.arr[i].f) break;
      [this.arr[p],this.arr[i]]=[this.arr[i],this.arr[p]]; i=p;
    }
  }
  _down(i){
    const n=this.arr.length;
    while(true){
      let l=2*i+1, r=2*i+2, s=i;
      if(l<n && this.arr[l].f<this.arr[s].f) s=l;
      if(r<n && this.arr[r].f<this.arr[s].f) s=r;
      if(s===i) break;
      [this.arr[s],this.arr[i]]=[this.arr[i],this.arr[s]]; i=s;
    }
  }
}
function pzSolveNextMove(tiles, size, budget, avoidKeys){
  budget = budget || 20000;
  avoidKeys = avoidKeys || new Set();
  const startKey = tiles.join(",");
  const goal = [];
  for(let i=1;i<size*size;i++) goal.push(i);
  goal.push(0);
  const goalKey = goal.join(",");
  if(startKey===goalKey) return {move:null};
  const h0 = pzManhattanLC(tiles, size);
  const root = {tiles, g:0, f:h0, emptyI:tiles.indexOf(0), firstMove:null};
  const open = new PzHeap();
  open.push(root);
  const bestG = new Map();
  bestG.set(startKey, 0);
  let bestPartial = null, bestH = Infinity;
  let bestPartialAvoid = null, bestHAvoid = Infinity;
  let pops = 0;
  while(open.size()>0){
    pops++;
    if(pops > budget){
      const chosen = bestPartialAvoid || bestPartial;
      return {move: chosen ? chosen.firstMove : null};
    }
    const node = open.pop();
    const key = node.tiles.join(",");
    if(node.g > (bestG.get(key) ?? Infinity)) continue;
    if(key===goalKey) return {move: node.firstMove};
    const er = Math.floor(node.emptyI/size), ec = node.emptyI%size;
    const deltas=[[-1,0],[1,0],[0,-1],[0,1]];
    for(const [dr,dc] of deltas){
      const nr=er+dr, nc=ec+dc;
      if(nr<0||nr>=size||nc<0||nc>=size) continue;
      const ni = nr*size+nc;
      const newTiles = node.tiles.slice();
      [newTiles[node.emptyI], newTiles[ni]] = [newTiles[ni], newTiles[node.emptyI]];
      const newKey = newTiles.join(",");
      const newG = node.g+1;
      if(newG >= (bestG.get(newKey) ?? Infinity)) continue;
      bestG.set(newKey, newG);
      const h = pzManhattanLC(newTiles, size);
      const child = {tiles:newTiles, g:newG, f:newG+h, emptyI:ni, firstMove: node.firstMove===null ? ni : node.firstMove};
      open.push(child);
      if(h < bestH){ bestH = h; bestPartial = child; }
      if(h < bestHAvoid && !avoidKeys.has(newKey)){ bestHAvoid = h; bestPartialAvoid = child; }
    }
  }
  return {move:null};
}

// Builds a shuffled board purely by applying `movesCount` legal slides from
// the solved state, so the result is always solvable (no parity check
// needed) and the shuffle depth doubles as the difficulty knob.
function pzGenerateShuffled(movesCount){
  const size=4;
  let tiles = [];
  for(let i=1;i<=15;i++) tiles.push(i);
  tiles.push(0);
  let emptyI = 15;
  let lastMove = -1;
  for(let m=0;m<movesCount;m++){
    const er=Math.floor(emptyI/size), ec=emptyI%size;
    const candidates=[];
    const deltas=[[-1,0],[1,0],[0,-1],[0,1]];
    for(const [dr,dc] of deltas){
      const nr=er+dr,nc=ec+dc;
      if(nr<0||nr>=size||nc<0||nc>=size) continue;
      const ni=nr*size+nc;
      if(ni===lastMove) continue;
      candidates.push(ni);
    }
    if(candidates.length===0) continue;
    const pick = candidates[randInt(0,candidates.length-1)];
    [tiles[emptyI],tiles[pick]] = [tiles[pick],tiles[emptyI]];
    lastMove = emptyI;
    emptyI = pick;
  }
  return tiles;
}
// Short click/slide tone played whenever a tile is moved into the empty slot.
function playTileSlideSound(){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.01;
  playTone(600, t, 0.07, "triangle", 0.06);
}

function viewPazl(){
  const t = L().pazl, c = L().common, diffT = L().difficulties;
  if(!state.pazl) state.pazl = {difficulty:null};
  const st = state.pazl;
  if(!st.difficulty){
    // Returning to the difficulty picker doesn't go through navigate()'s
    // route-change audio cleanup since the route stays "pazl" — stop any
    // running timer/jingle explicitly here.
    if(pzTimerHandle){ clearInterval(pzTimerHandle); pzTimerHandle=null; }
    if(pzState) pzState.finished = true;
    stopVictoryAudio(); stopDefeatAudio();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${PAZL_DIFFICULTIES.map(d=>`<button class="pick" data-pzdiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc(d))}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  if(pzTimerHandle){ clearInterval(pzTimerHandle); pzTimerHandle=null; }
  // A fresh game is starting — make sure no leftover win/lose jingle from a
  // previous round keeps playing over it.
  stopVictoryAudio(); stopDefeatAudio();
  const diff = PAZL_DIFFICULTIES.find(d=>d.id===st.difficulty);
  const tiles = pzGenerateShuffled(diff.shuffleMoves);
  pzState = {tiles, moves:0, startTime:Date.now(), finished:false, timeLeft:diff.time, hintHistory:[],
    started:false, hintsLeft:diff.hints};
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
    </div>
    <div class="rope-hud" style="max-width:420px;margin:0 auto 14px">
      <div class="mono" id="pzMovesDisp" style="font-size:13px">${esc(t.moves(0))}</div>
      <div class="timer mono" id="pzTimer" style="font-size:18px;padding:5px 12px">${pzFormatTime(diff.time)}</div>
    </div>
    <div class="puzzle-grid" id="pzGrid"></div>
    <div style="text-align:center;margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="pzHintBtn">${icon('lightbulb',18)} ${esc(t.hintLabel(diff.hints))}</button>
      <button class="btn btn-outline" id="pzChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function pzStartTimer(){
  if(pzTimerHandle) clearInterval(pzTimerHandle);
  pzTimerHandle = setInterval(()=>{
    if(!pzState || pzState.finished || state.route!=="pazl"){ clearInterval(pzTimerHandle); pzTimerHandle=null; return; }
    pzState.timeLeft--;
    const el = document.getElementById("pzTimer");
    if(el){ el.textContent = pzFormatTime(pzState.timeLeft); el.classList.toggle("low", pzState.timeLeft<=10); }
    if(pzState.timeLeft>0 && pzState.timeLeft<=5) playCountdownBeep();
    if(pzState.timeLeft<=0){ pzFinishGame(false); }
  }, 1000);
}
// Mirrors the other mini-games (Xotira, Target): on game end, the play area
// itself is replaced with a result panel carrying its own restart button.
function pzFinishGame(won){
  const t = L().pazl, c = L().common;
  pzState.finished = true;
  if(pzTimerHandle){ clearInterval(pzTimerHandle); pzTimerHandle=null; }
  if(pzHintTimeoutHandle){ clearTimeout(pzHintTimeoutHandle); pzHintTimeoutHandle=null; }
  const grid = document.getElementById("pzGrid");
  let titleHtml, subText;
  if(won){
    const secs = Math.round((Date.now()-pzState.startTime)/1000);
    playVictoryJingle(false);
    titleHtml = `${icon('sparkles',20,'var(--brand)')} ${esc(t.winTitle)}`;
    subText = t.winSub(pzState.moves, secs);
  } else {
    playDefeatJingle();
    titleHtml = `${icon('frown',20,'var(--danger)')} ${esc(t.timeUpTitle)}`;
    subText = t.timeUpSub;
  }
  if(grid){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:34px 10px">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
      <div style="color:var(--muted);margin-bottom:18px">${esc(subText)}</div>
      <button class="btn btn-brand btn-lg" id="pzPlayAgainBtn">${icon('replay',18)} ${esc(c.restart)}</button>
    </div>`;
    const again = document.getElementById("pzPlayAgainBtn");
    if(again) again.addEventListener("click", render);
  }
  // The countdown is meaningless once the round is over — hide it so a
  // frozen/stale second count isn't left on screen next to the result.
  const timerEl = document.getElementById("pzTimer");
  if(timerEl) timerEl.style.display = "none";
  // Hints only make sense while the board is still being solved — once the
  // round has ended (won or timed out) there's nothing left to hint at.
  const hintBtn = document.getElementById("pzHintBtn");
  if(hintBtn) hintBtn.style.display = "none";
}
function renderPzGrid(){
  const grid = document.getElementById("pzGrid");
  if(!grid) return;
  const t = L().pazl;
  grid.innerHTML = pzState.tiles.map((v,i)=> v===0 ? `<div class="pz-tile pz-empty"></div>` : `<button class="pz-tile" data-i="${i}">${v}</button>`).join("");
  grid.querySelectorAll("[data-i]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(pzState.finished) return;
      const i = Number(btn.dataset.i);
      const emptyI = pzState.tiles.indexOf(0);
      const ri=Math.floor(i/4), ci=i%4, re=Math.floor(emptyI/4), ce=emptyI%4;
      if(Math.abs(ri-re)+Math.abs(ci-ce)===1){
        // The countdown only starts once the player makes their first move —
        // until then the board just sits there fully visible, so there's no
        // reason to burn the clock before they've even begun.
        if(!pzState.started){
          pzState.started = true;
          pzState.startTime = Date.now();
          pzStartTimer();
        }
        [pzState.tiles[i],pzState.tiles[emptyI]] = [pzState.tiles[emptyI],pzState.tiles[i]];
        pzState.moves++;
        playTileSlideSound();
        renderPzGrid();
        document.getElementById("pzMovesDisp").textContent = t.moves(pzState.moves);
        const solved = pzState.tiles.every((v,idx)=> idx===15 ? v===0 : v===idx+1);
        if(solved) pzFinishGame(true);
      }
    });
  });
}
// Highlights (briefly) the tile the player should move next, computed by
// pzSolveNextMove. Doesn't move the tile for them — just points at it.
// Each game only comes with a limited number of hints (set per difficulty
// in PAZL_DIFFICULTIES), shown as a "(n)" counter on the button itself.
function pzShowHint(){
  if(!pzState || pzState.finished || pzState.hintsLeft<=0) return;
  const btn = document.getElementById("pzHintBtn");
  if(btn) btn.disabled = true;
  const avoidKeys = new Set(pzState.hintHistory.slice(-6));
  const res = pzSolveNextMove(pzState.tiles, 4, 20000, avoidKeys);
  if(res.move===null || res.move===undefined){
    if(btn) btn.disabled = false;
    return;
  }
  pzState.hintsLeft--;
  pzState.hintHistory.push(pzState.tiles.join(","));
  if(pzState.hintHistory.length>6) pzState.hintHistory.shift();
  if(btn){
    const t = L().pazl;
    btn.innerHTML = `${icon('lightbulb',18)} ${esc(t.hintLabel(pzState.hintsLeft))}`;
    btn.disabled = pzState.hintsLeft<=0;
  }
  const tileBtn = document.querySelector(`.pz-tile[data-i="${res.move}"]`);
  if(tileBtn){
    tileBtn.classList.remove("hint"); void tileBtn.offsetWidth;
    tileBtn.classList.add("hint");
    if(pzHintTimeoutHandle) clearTimeout(pzHintTimeoutHandle);
    pzHintTimeoutHandle = setTimeout(()=>{ tileBtn.classList.remove("hint"); }, 2200);
  }
}
function wirePazl(){
  document.querySelectorAll("[data-pzdiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.pazl.difficulty = b.dataset.pzdiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("pzChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    // Stop the running game immediately — otherwise the old timer keeps
    // counting down in the background and fires the defeat jingle even
    // though the player has already left to the difficulty picker.
    if(pzTimerHandle){ clearInterval(pzTimerHandle); pzTimerHandle=null; }
    if(pzState) pzState.finished = true;
    state.pazl.difficulty=null;
    render();
  });
  const hintBtn = document.getElementById("pzHintBtn");
  if(hintBtn) hintBtn.addEventListener("click", pzShowHint);

  const grid = document.getElementById("pzGrid");
  if(!grid) return;
  renderPzGrid();
  // The timer itself is started from renderPzGrid's click handler, on the
  // player's first move — see the comment there.
}

/* ===================== NISHONGA URISH (target practice) ===================== */
// A small custom cursor (replaces the native pointer while playing) that
// swings left-and-back on every click, like a hand-held tool being used.
const TARGET_CURSOR_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAwCAYAAABnjuimAAADuUlEQVR4nO2Zz2tcVRTHv9973/yO4kyCRulf4caNQkGwi7rN/AOCiyBulAhCnERc6U6wYFduDJKBogsxuGoQQVxY0KVFd2WobVIzyWTevHvOcTEz6aR9sSm9YVKYL5x57w3v3vvhnnPP5dxHM3OdO721cqW4nKaDBgAiT6qwWhXFG3+g8eEnQKkEmOW++uvPf2G/l8KTx15h4hHCDl5cXcHzH7+NcLsLJj63D5JWLBV2+r3BlcWF6lrSudP7qN6oru7t9XMbTEuqymwQ5uuN6mpnp6eOtPe73VRFRKcNNymSEAnW7aYKs/cSOlcLIYDM9/g0RTqGEEhyzpmqnUfIscZs7lxOZY7ctAFOqxlobM1AY2sGGlsz0NiagcbWDDS2nh5QM8tIyokF0FRlRlLMLDgS383XK14VZqZqZgpA8s2GVzOBQdRMYRDA1ADoyIzHzACIAXrU/uiab2amQxbYfL3iQXybaKG2fPfeYaVaLV/2Pr8iBACowSpEsVIFkgKQJHBjJ5iBIQNHBWwpUwxM4Y0gHB2cBwDCI8ChWiyjBiDUamCSH30GQEVw917/eyvUlpOXnuU/AN68vZu+XEisnvb7AJKcpgHgHNLDQ5Q0AzKPfgJfDpAfFiqv3nxuYS0MMhUV3rp4gSIqhWLRl3cPrr3+y60rmS/4iqkECHqDPg4AyH4P8Plj+XIZCXXnhXrlBgDQzAgM6+iTp/P/dWll5dIFFrbSNA0iIdnr7oBAViyXCvuaffrj1a8+gMMwLh5TY75kDGhmDicdPkyqDaDdBAB8vriYvNvphHcOsjlWPBI1BFEMMgEMLDqB74fSJpb8T28sJq9tdQLQxtLmJrC0dCpOkgpMpCeSSlIeaU0K221huy3XGg1huy2p92rgaCERRkI5vBcHa6Itv7/SkCba0gSEzeajxxnakQ8i5VG5PwVxOnxIERP+cUQCUVNzRFCOfidPxeIdGUQDvY/H8XPUKIgGyodcH/cEJrrrJ3Q+Z3TExQeeoykSqMd4nY//sTG0xjl2jZ1HJ/0/hHZxhojqek4sKZ5mO34MRV1MBotLN6GIMQpgYi86p3lUkLuFRtRZ5tFzGqNn/CUgHugwOs/sy8XTU9fH6ISAA2h4cEWZmUUKiicCvTgq1yjJ36LCYcIfxoABSudI4CYA4Pr16YGur69rq9VyV7/47LeQZd9UatWEIM3MiqVSsd/v/1lW/RoAt7e35ZEdnhXoCNYA0KXPvJUepl/SuX9JBg1hiyKXNzY2dlutFvGEG8B/5QDMM8FOnEEAAAAASUVORK5CYII=";
const TARGET_DIFFICULTIES = [
  {id:"oson", time:20, hitsNeeded:10, spawnInterval:700, life:1300, sizeMin:46, sizeMax:64},
  {id:"normal", time:40, hitsNeeded:18, spawnInterval:600, life:1050, sizeMin:40, sizeMax:58},
  {id:"qiyin", time:60, hitsNeeded:28, spawnInterval:500, life:850, sizeMin:34, sizeMax:50},
];
let targetState = null;
// Stops whatever the previous round was doing — timers, spawns still on
// screen, leftover win/lose jingle — so re-entering this route (from the
// difficulty picker, a restart, or "Darajani almashtirish") never leaves
// something running silently in the background.
function targetStopEverything(){
  if(targetState){
    targetState.running = false;
    if(targetState.spawnTimer){ clearInterval(targetState.spawnTimer); targetState.spawnTimer=null; }
    if(targetState.tickTimer){ clearInterval(targetState.tickTimer); targetState.tickTimer=null; }
    Object.values(targetState.activeTargets||{}).forEach(clearTimeout);
  }
  stopVictoryAudio(); stopDefeatAudio();
}
function viewTarget(){
  const t = L().target, c = L().common, diffT = L().difficulties;
  if(!state.target) state.target = {difficulty:null};
  const st = state.target;
  if(!st.difficulty){
    targetStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${TARGET_DIFFICULTIES.map(d=>`<button class="pick" data-targetdiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc(d))}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  targetStopEverything();
  const diff = TARGET_DIFFICULTIES.find(d=>d.id===st.difficulty);
  targetState = {hits:0, misses:0, timeLeft:diff.time, running:false, spawnTimer:null, tickTimer:null,
    activeTargets:{}, nextId:1, diff, finished:false};
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
    </div>
    <div class="rope-hud" style="max-width:520px;margin:0 auto 10px">
      <div class="mono" style="font-size:14px" id="targetStats">${esc(t.progress(0, diff.hitsNeeded))}</div>
      <div class="timer mono" id="targetTimer">${diff.time}s</div>
    </div>
    <div class="target-area" id="targetArea"></div>
    <div style="text-align:center;margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="targetChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function wireTarget(){
  document.querySelectorAll("[data-targetdiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.target.difficulty = b.dataset.targetdiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("targetChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    // Stop the running round immediately — otherwise its spawn/tick timers
    // keep firing in the background after the player has already left to
    // the difficulty picker.
    if(targetState){ targetState.finished = true; }
    targetStopEverything();
    state.target.difficulty = null;
    render();
  });
  const area = document.getElementById("targetArea");
  if(!area) return;
  startTargetGame();
}
function startTargetGame(){
  const area = document.getElementById("targetArea");
  area.innerHTML = `<img id="targetCursor" src="${TARGET_CURSOR_SRC}" alt="">`;
  targetSetupCursor(area);
  targetState.running = true;
  targetState.finished = false;
  spawnTarget();
  targetState.spawnTimer = setInterval(spawnTarget, targetState.diff.spawnInterval);
  targetState.tickTimer = setInterval(()=>{
    if(!targetState || targetState.finished || state.route!=="target"){
      if(targetState && targetState.tickTimer){ clearInterval(targetState.tickTimer); targetState.tickTimer=null; }
      return;
    }
    targetState.timeLeft--;
    const el = document.getElementById("targetTimer");
    if(el){ el.textContent = targetState.timeLeft+"s"; el.classList.toggle("low", targetState.timeLeft<=8); }
    if(targetState.timeLeft>0 && targetState.timeLeft<=5) playCountdownBeep();
    if(targetState.timeLeft<=0) finishTargetGame(false);
  }, 1000);
}
// Makes the custom axe cursor follow the mouse inside the play area (the
// native pointer is hidden there via CSS — see .target-area/.target-dot),
// and gives it a quick left-swing animation on every click.
function targetSetupCursor(area){
  const cursorEl = document.getElementById("targetCursor");
  if(!cursorEl || !area) return;
  const offsetX = 18, offsetY = 13; // aligns the axe head with the actual pointer position
  area.addEventListener("mousemove", (e)=>{
    const rect = area.getBoundingClientRect();
    cursorEl.style.left = (e.clientX-rect.left-offsetX)+"px";
    cursorEl.style.top = (e.clientY-rect.top-offsetY)+"px";
    cursorEl.style.display = "block";
  });
  area.addEventListener("mouseleave", ()=>{ cursorEl.style.display = "none"; });
  area.addEventListener("mousedown", ()=>{
    cursorEl.classList.remove("swing"); void cursorEl.offsetWidth;
    cursorEl.classList.add("swing");
  });
}
function spawnTarget(){
  if(!targetState || !targetState.running || targetState.finished || state.route!=="target") return;
  const area = document.getElementById("targetArea");
  if(!area) return;
  const diff = targetState.diff;
  const id = targetState.nextId++;
  const size = randInt(diff.sizeMin, diff.sizeMax);
  const left = randInt(2, 92);
  const top = randInt(4, 76);
  const el = document.createElement("button");
  el.className = "target-dot";
  el.style.width = el.style.height = size+"px";
  el.style.left = left+"%";
  el.style.top = top+"%";
  el.dataset.id = id;
  area.appendChild(el);
  const life = setTimeout(()=>{
    if(el.parentNode){ el.remove(); if(targetState && !targetState.finished){ targetState.misses++; updateTargetStats(); } }
    if(targetState) delete targetState.activeTargets[id];
  }, diff.life);
  targetState.activeTargets[id] = life;
  el.addEventListener("click", ()=>{
    if(!targetState || targetState.finished) return;
    clearTimeout(targetState.activeTargets[id]); delete targetState.activeTargets[id];
    targetState.hits++; updateTargetStats();
    el.classList.add("hit"); setTimeout(()=>el.remove(), 150);
    if(targetState.hits>=diff.hitsNeeded) finishTargetGame(true);
  });
}
function updateTargetStats(){
  const t = L().target;
  const el = document.getElementById("targetStats");
  if(el && targetState) el.textContent = t.progress(targetState.hits, targetState.diff.hitsNeeded);
}
// Mirrors the other mini-games (Xotira, Pazl): on round end, the play area
// itself is replaced with a result panel carrying its own restart button.
function finishTargetGame(won){
  if(!targetState || targetState.finished) return; // guards a hit landing right as the clock also runs out
  targetState.finished = true;
  targetState.running = false;
  if(targetState.spawnTimer){ clearInterval(targetState.spawnTimer); targetState.spawnTimer=null; }
  if(targetState.tickTimer){ clearInterval(targetState.tickTimer); targetState.tickTimer=null; }
  Object.values(targetState.activeTargets).forEach(clearTimeout);
  targetState.activeTargets = {};
  const t = L().target, c = L().common;
  const total = targetState.hits+targetState.misses;
  const acc = total>0 ? Math.round(targetState.hits/total*100) : 0;
  const secs = targetState.diff.time - Math.max(targetState.timeLeft, 0);
  let titleHtml, subText;
  if(won){
    playVictoryJingle(false);
    titleHtml = `${icon('sparkles',20,'var(--brand)')} ${esc(t.winTitle)}`;
    subText = t.winSub(targetState.hits, acc, secs);
  } else {
    playDefeatJingle();
    titleHtml = `${icon('frown',20,'var(--danger)')} ${esc(t.timeUpTitle)}`;
    subText = t.timeUpSub(targetState.hits, targetState.diff.hitsNeeded);
  }
  const area = document.getElementById("targetArea");
  if(area){
    area.innerHTML = `<div class="target-start"><div style="text-align:center">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
      <div style="color:var(--muted);margin-bottom:16px">${esc(subText)}</div>
      <button class="btn btn-brand btn-lg" id="targetAgainBtn">${icon('replay',18)} ${esc(c.restart)}</button>
    </div></div>`;
    const again = document.getElementById("targetAgainBtn");
    if(again) again.addEventListener("click", render);
  }
  // The countdown is meaningless once the round is over — hide it so a
  // frozen/stale second count isn't left on screen next to the result.
  const timerEl = document.getElementById("targetTimer");
  if(timerEl) timerEl.style.display = "none";
}

/* ===================== ILON O'YINI (snake) ===================== */
let snakeState = null, snakeLoopTimer = null;
const SNAKE_SIZE = 16;
const SNAKE_DIFFICULTIES = [
  {id:"oson", speed:170, bigFoodLife:7000},
  {id:"normal", speed:140, bigFoodLife:5000},
  {id:"qiyin", speed:100, bigFoodLife:3500},
];
// Same defense-in-depth pattern as Target/Pazl: stops the tick loop, any
// pending big-food expiry timeout, and any leftover win jingle, so leaving
// this route (or reopening the difficulty picker) never leaves something
// running silently in the background.
function snakeStopEverything(){
  if(snakeLoopTimer){ clearInterval(snakeLoopTimer); snakeLoopTimer=null; }
  if(snakeState && snakeState.bigFoodTimer){ clearTimeout(snakeState.bigFoodTimer); snakeState.bigFoodTimer=null; }
  if(snakeState){ snakeState.running = false; snakeState.paused = false; }
  stopVictoryAudio(); stopDefeatAudio();
}
function viewSnake(){
  const t = L().snake, c = L().common, diffT = L().difficulties;
  if(!state.snake) state.snake = {difficulty:null};
  const st = state.snake;
  let best = 0;
  try{ best = Number(localStorage.getItem("aqlarena_snake_best"))||0; }catch(e){}
  if(!st.difficulty){
    snakeStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${SNAKE_DIFFICULTIES.map(d=>`<button class="pick" data-snakediff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc[d.id])}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  snakeStopEverything();
  const diff = SNAKE_DIFFICULTIES.find(d=>d.id===st.difficulty);
  snakeState = {running:false, best, diff, eatenCount:0, bigFoodTimer:null};
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div style="display:flex;gap:20px;justify-content:center;align-items:center;margin-bottom:12px;flex-wrap:wrap">
      <div><div class="mono" style="font-size:22px;font-weight:700" id="snakeScoreDisp">0</div><div style="color:var(--muted);font-size:12px">${esc(t.score)}</div></div>
      <div><div class="mono" style="font-size:22px;font-weight:700;color:var(--brand)" id="snakeBestDisp">${best}</div><div style="color:var(--muted);font-size:12px">${esc(t.best)}</div></div>
      <button class="btn btn-outline" id="snakePauseBtn">${esc(c.pause)}</button>
    </div>
    <div class="snake-wrap">
      <div class="snake-grid" id="snakeGrid"></div>
      <div class="snake-overlay" id="snakeOverlay"><button class="btn btn-brand btn-lg" id="snakeStartBtn">${esc(t.start)}</button></div>
    </div>
    <div class="snake-pad" id="snakePad">
      <button class="snake-btn" data-dir="up" style="grid-area:up">▲</button>
      <button class="snake-btn" data-dir="left" style="grid-area:left">◀</button>
      <button class="snake-btn" data-dir="down" style="grid-area:down">▼</button>
      <button class="snake-btn" data-dir="right" style="grid-area:right">▶</button>
    </div>
    <p style="text-align:center;color:var(--muted);font-size:12.5px;margin-top:6px">${esc(t.swipeHint)}</p>
    <div style="text-align:center;margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="snakeChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function snakeInitGrid(){
  const grid = document.getElementById("snakeGrid");
  if(!grid) return;
  let cells = "";
  for(let i=0;i<SNAKE_SIZE*SNAKE_SIZE;i++) cells += `<div class="snake-cell" data-c="${i}"></div>`;
  grid.innerHTML = cells;
}
function snakeRandCell(exclude){
  let p;
  do{ p = {x:randInt(0,SNAKE_SIZE-1), y:randInt(0,SNAKE_SIZE-1)}; }
  while(exclude.some(e=>e.x===p.x&&e.y===p.y));
  return p;
}
function wireSnake(){
  document.querySelectorAll("[data-snakediff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.snake.difficulty = b.dataset.snakediff;
    render();
  }));
  const changeDiffBtn = document.getElementById("snakeChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    snakeStopEverything();
    state.snake.difficulty = null;
    render();
  });
  const grid = document.getElementById("snakeGrid");
  if(!grid) return; // still on the difficulty picker
  snakeInitGrid();
  const startBtn = document.getElementById("snakeStartBtn");
  if(startBtn) startBtn.addEventListener("click", startSnakeGame);
  document.querySelectorAll(".snake-btn").forEach(b=>b.addEventListener("click", ()=>snakeSetDir(b.dataset.dir)));
  const pauseBtn = document.getElementById("snakePauseBtn");
  if(pauseBtn) pauseBtn.addEventListener("click", snakeTogglePause);
  let tsx=0, tsy=0;
  grid.addEventListener("touchstart", e=>{ tsx=e.touches[0].clientX; tsy=e.touches[0].clientY; }, {passive:true});
  grid.addEventListener("touchend", e=>{
    const dx = e.changedTouches[0].clientX-tsx, dy = e.changedTouches[0].clientY-tsy;
    if(Math.abs(dx)>Math.abs(dy)){ snakeSetDir(dx>0?"right":"left"); } else { snakeSetDir(dy>0?"down":"up"); }
  }, {passive:true});
}
function snakeKeyHandler(e){
  if(state.route!=="snake") return;
  if(e.key==="p" || e.key==="P"){ e.preventDefault(); snakeTogglePause(); return; }
  const map = {ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};
  if(map[e.key]){ e.preventDefault(); snakeSetDir(map[e.key]); }
}
function snakeSetDir(dir){
  if(!snakeState || !snakeState.running || snakeState.paused) return;
  const opp = {up:"down",down:"up",left:"right",right:"left"};
  if(opp[dir]===snakeState.dir) return;
  snakeState.nextDir = dir;
}
// Pause stops the tick loop (and, so it isn't secretly still counting down
// in the background, also freezes any pending big-food expiry by swapping
// it for a recorded remaining-time value) without ending the round. Resume
// restarts the tick loop and reschedules the big-food expiry for whatever
// time was left on it.
function snakePause(){
  const s = snakeState;
  if(!s || !s.running || s.paused) return;
  s.paused = true;
  if(snakeLoopTimer){ clearInterval(snakeLoopTimer); snakeLoopTimer=null; }
  if(s.bigFoodTimer){
    clearTimeout(s.bigFoodTimer);
    s.bigFoodTimer = null;
    s.bigFoodRemaining = Math.max(0, s.bigFoodDuration - (Date.now()-s.bigFoodStartedAt));
  }
  const c = L().common;
  const overlay = document.getElementById("snakeOverlay");
  if(overlay){
    overlay.innerHTML = `<div style="text-align:center">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:12px">${icon('clock',20)} ${esc(c.pausedTitle)}</div>
      <button class="btn btn-brand btn-lg" id="snakeResumeBtn">${esc(c.resume)}</button>
    </div>`;
    overlay.classList.remove("hide");
    const resumeBtn = document.getElementById("snakeResumeBtn");
    if(resumeBtn) resumeBtn.addEventListener("click", snakeResume);
  }
  const pauseBtn = document.getElementById("snakePauseBtn");
  if(pauseBtn) pauseBtn.textContent = c.resume;
}
function snakeResume(){
  const s = snakeState;
  if(!s || !s.running || !s.paused) return;
  s.paused = false;
  const overlay = document.getElementById("snakeOverlay");
  if(overlay){ overlay.classList.add("hide"); overlay.innerHTML = ""; }
  const pauseBtn = document.getElementById("snakePauseBtn");
  if(pauseBtn) pauseBtn.textContent = L().common.pause;
  if(snakeLoopTimer) clearInterval(snakeLoopTimer);
  snakeLoopTimer = setInterval(snakeTick, s.diff.speed);
  if(s.bigFoodRemaining != null){
    s.bigFoodStartedAt = Date.now();
    s.bigFoodDuration = s.bigFoodRemaining;
    s.bigFoodTimer = setTimeout(()=>{
      if(!s || !s.running) return;
      s.food = {...snakeRandCell(s.snake), big:false};
      s.bigFoodTimer = null;
      snakeRenderGrid();
    }, s.bigFoodRemaining);
    s.bigFoodRemaining = null;
  }
}
function snakeTogglePause(){
  const s = snakeState;
  if(!s || !s.running) return;
  if(s.paused) snakeResume(); else snakePause();
}
function startSnakeGame(){
  const overlay = document.getElementById("snakeOverlay");
  if(overlay) overlay.classList.add("hide");
  snakeState.paused = false;
  const pauseBtn = document.getElementById("snakePauseBtn");
  if(pauseBtn) pauseBtn.textContent = L().common.pause;
  const mid = Math.floor(SNAKE_SIZE/2);
  snakeState.snake = [{x:mid,y:mid},{x:mid-1,y:mid},{x:mid-2,y:mid}];
  snakeState.dir = "right"; snakeState.nextDir = "right";
  snakeState.eatenCount = 0;
  snakeSpawnFood();
  snakeState.running = true;
  snakeState.score = 0;
  document.getElementById("snakeScoreDisp").textContent = "0";
  if(snakeLoopTimer) clearInterval(snakeLoopTimer);
  snakeLoopTimer = setInterval(snakeTick, snakeState.diff.speed);
  snakeRenderGrid();
}
// Picks the next food cell. Every 10th food (the 10th, 20th, 30th... one
// eaten) spawns "big" instead of normal — worth more points, but it only
// stays on the board for a limited time (shorter at higher difficulty)
// before quietly being replaced by a normal one.
function snakeSpawnFood(){
  const s = snakeState;
  if(s.bigFoodTimer){ clearTimeout(s.bigFoodTimer); s.bigFoodTimer=null; }
  s.bigFoodRemaining = null;
  const isBig = (s.eatenCount+1) % 10 === 0;
  s.food = {...snakeRandCell(s.snake), big:isBig};
  if(isBig){
    s.bigFoodStartedAt = Date.now();
    s.bigFoodDuration = s.diff.bigFoodLife;
    s.bigFoodTimer = setTimeout(()=>{
      if(!s || !s.running) return;
      s.food = {...snakeRandCell(s.snake), big:false};
      s.bigFoodTimer = null;
      snakeRenderGrid();
    }, s.diff.bigFoodLife);
  }
}
function snakeTick(){
  if(state.route!=="snake"){ clearInterval(snakeLoopTimer); if(snakeState) snakeState.running=false; return; }
  const s = snakeState;
  if(!s || !s.running || s.paused) return;
  s.dir = s.nextDir;
  const head = s.snake[0];
  let nx=head.x, ny=head.y;
  if(s.dir==="up") ny--; else if(s.dir==="down") ny++; else if(s.dir==="left") nx--; else nx++;
  if(nx<0||nx>=SNAKE_SIZE||ny<0||ny>=SNAKE_SIZE || s.snake.some(c=>c.x===nx&&c.y===ny)){ return endSnakeGame(); }
  s.snake.unshift({x:nx,y:ny});
  if(nx===s.food.x && ny===s.food.y){
    const wasBig = s.food.big;
    s.score += wasBig ? 5 : 1;
    s.eatenCount++;
    playSnakeEatSound(wasBig);
    document.getElementById("snakeScoreDisp").textContent = s.score;
    snakeSpawnFood();
  } else { s.snake.pop(); }
  snakeRenderGrid();
}
function playSnakeEatSound(big){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.01;
  if(big){ playTone(660, t, 0.09, "triangle", 0.08); playTone(880, t+0.08, 0.13, "triangle", 0.08); }
  else { playTone(520, t, 0.08, "triangle", 0.07); }
}
function snakeRenderGrid(){
  const s = snakeState;
  const grid = document.getElementById("snakeGrid");
  if(!grid) return;
  grid.querySelectorAll(".snake-cell").forEach(c=>c.className="snake-cell");
  s.snake.forEach((c,i)=>{
    const idx = c.y*SNAKE_SIZE+c.x;
    const el = grid.children[idx];
    if(el) el.className = "snake-cell "+(i===0?"head":"body");
  });
  const foodEl = grid.children[s.food.y*SNAKE_SIZE+s.food.x];
  if(foodEl) foodEl.className = "snake-cell "+(s.food.big?"food-big":"food");
}
// No "defeat" framing here: hitting the wall/itself always just ends the
// round. A new personal best gets the victory jingle and a "new record"
// panel; anything else is a plain, neutral "you scored N" panel with no
// sound at all.
function endSnakeGame(){
  const s = snakeState, t = L().snake, c = L().common;
  s.running = false;
  clearInterval(snakeLoopTimer);
  if(s.bigFoodTimer){ clearTimeout(s.bigFoodTimer); s.bigFoodTimer=null; }
  const isNewRecord = s.score > s.best;
  if(isNewRecord){
    s.best = s.score;
    try{ localStorage.setItem("aqlarena_snake_best", String(s.best)); }catch(e){}
    playVictoryJingle(false);
  }
  document.getElementById("snakeBestDisp").textContent = s.best;
  const overlay = document.getElementById("snakeOverlay");
  const titleHtml = isNewRecord
    ? `${icon('trophy',20,'var(--brand)')} ${esc(t.recordTitle)}`
    : `${icon('flag',20,'var(--muted)')} ${esc(t.over)}`;
  const subText = isNewRecord ? t.recordSub(s.score) : t.overSub(s.score);
  overlay.innerHTML = `<div style="text-align:center">
    <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
    <div style="color:var(--muted);margin-bottom:14px">${esc(subText)}</div>
    <button class="btn btn-brand btn-lg" id="snakeStartBtn">${icon('replay',18)} ${esc(c.restart)}</button>
  </div>`;
  overlay.classList.remove("hide");
  document.getElementById("snakeStartBtn").addEventListener("click", startSnakeGame);
}

/* ===================== X-0 (tic-tac-toe vs computer) ===================== */
const XO_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const XO_DIFFICULTIES = [
  {id:"oson", ai:"random"},
  {id:"normal", ai:"heuristic"},
  {id:"qiyin", ai:"minimax"},
];
let xoState = null, xoMoveTimer = null;
// Same defense-in-depth pattern as Target/Snake: this route's difficulty
// picker and its game screen share one route, so leaving/re-entering it
// (or reopening the picker) has to explicitly stop the pending computer
// move and any leftover win/lose jingle itself.
function xoStopEverything(){
  if(xoMoveTimer){ clearTimeout(xoMoveTimer); xoMoveTimer=null; }
  stopVictoryAudio(); stopDefeatAudio();
}
function xoCheckResult(board){
  for(const line of XO_LINES){
    const [a,b,c] = line;
    if(board[a] && board[a]===board[b] && board[a]===board[c]) return {winner:board[a], line};
  }
  if(board.every(c=>c)) return {winner:"draw", line:null};
  return {winner:null, line:null};
}
function xoRandomMove(board){
  const empties = [];
  board.forEach((c,i)=>{ if(!c) empties.push(i); });
  return empties[randInt(0, empties.length-1)];
}
// Win if possible, else block the player's win, else take the center,
// else a corner, else whatever's left. Decent but not unbeatable.
function xoHeuristicMove(board){
  for(let i=0;i<9;i++){
    if(board[i]) continue;
    const nb = board.slice(); nb[i]="O";
    if(xoCheckResult(nb).winner==="O") return i;
  }
  for(let i=0;i<9;i++){
    if(board[i]) continue;
    const nb = board.slice(); nb[i]="X";
    if(xoCheckResult(nb).winner==="X") return i;
  }
  if(!board[4]) return 4;
  const corners = [0,2,6,8].filter(i=>!board[i]);
  if(corners.length) return corners[randInt(0,corners.length-1)];
  return xoRandomMove(board);
}
// Full-depth minimax (the board is only 9 cells, so an exhaustive search is
// instant) — perfect play, so the best a player can ever get is a draw.
function xoMinimaxMove(board){
  function minimax(b, isMax){
    const res = xoCheckResult(b);
    if(res.winner==="O") return {score:1};
    if(res.winner==="X") return {score:-1};
    if(res.winner==="draw") return {score:0};
    let best = null;
    for(let i=0;i<9;i++){
      if(b[i]) continue;
      const nb = b.slice(); nb[i] = isMax?"O":"X";
      const {score} = minimax(nb, !isMax);
      if(best===null || (isMax ? score>best.score : score<best.score)) best = {i, score};
    }
    return best;
  }
  return minimax(board, true).i;
}
function xoComputerPick(board, aiType){
  if(aiType==="random") return xoRandomMove(board);
  if(aiType==="heuristic") return xoHeuristicMove(board);
  return xoMinimaxMove(board);
}
function playXOPlaceSound(isPlayer){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.01;
  playTone(isPlayer?520:380, t, 0.07, "triangle", 0.06);
}
function viewXO(){
  const t = L().xo, c = L().common, diffT = L().difficulties;
  if(!state.xo) state.xo = {mode:null, difficulty:null};
  const st = state.xo;
  if(!st.mode){
    xoStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.chooseMode)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        <button class="pick" data-xomode="computer"><b>${esc(t.modeComputer)}</b><span>${esc(t.modeComputerDesc)}</span></button>
        <button class="pick" data-xomode="two-player"><b>${esc(t.modeTwoPlayer)}</b><span>${esc(t.modeTwoPlayerDesc)}</span></button>
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  if(st.mode==="computer" && !st.difficulty){
    xoStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${XO_DIFFICULTIES.map(d=>`<button class="pick" data-xodiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc[d.id])}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
        <button class="btn btn-outline" id="xoChangeModeBtn">${esc(t.changeMode)}</button>
      </div>
    </div>`;
  }
  xoStopEverything();
  const diff = st.mode==="computer" ? XO_DIFFICULTIES.find(d=>d.id===st.difficulty) : null;
  xoState = {board:Array(9).fill(null), mode:st.mode, diff, finished:false, turn:"X", winLine:null};
  const statusText = st.mode==="computer" ? t.yourTurn : t.p1Turn;
  const leadText = st.mode==="computer" ? t.lead : t.leadTwoPlayer;
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(leadText)}</p>
    </div>
    <p style="text-align:center;color:var(--muted);font-size:13.5px;margin-bottom:10px" id="xoStatus">${esc(statusText)}</p>
    <div class="xo-wrap">
      <div class="xo-grid" id="xoGrid">
        ${[0,1,2,3,4,5,6,7,8].map(i=>`<button class="xo-cell" data-i="${i}"></button>`).join("")}
      </div>
      <div class="xo-overlay hide" id="xoOverlay"></div>
    </div>
    <div style="text-align:center;margin-top:18px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      ${st.mode==="computer" ? `<button class="btn btn-outline" id="xoChangeDiffBtn">${esc(t.changeDiff)}</button>` : ""}
      <button class="btn btn-outline" id="xoChangeModeBtn">${esc(t.changeMode)}</button>
    </div>
  </div>`;
}
function wireXO(){
  document.querySelectorAll("[data-xomode]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.xo.mode = b.dataset.xomode;
    state.xo.difficulty = null;
    render();
  }));
  document.querySelectorAll("[data-xodiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.xo.difficulty = b.dataset.xodiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("xoChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    xoStopEverything();
    state.xo.difficulty = null;
    render();
  });
  const changeModeBtn = document.getElementById("xoChangeModeBtn");
  if(changeModeBtn) changeModeBtn.addEventListener("click", ()=>{
    xoStopEverything();
    state.xo.mode = null;
    state.xo.difficulty = null;
    render();
  });
  const grid = document.getElementById("xoGrid");
  if(!grid) return;
  grid.querySelectorAll(".xo-cell").forEach(cell=>cell.addEventListener("click", ()=>xoCellClick(Number(cell.dataset.i))));
}
// Handles a click for BOTH modes: in vs-computer, only "X" clicks are the
// human's — the "O" reply is scheduled below; in two-player, every click is
// a human turn and no computer move is ever scheduled.
function xoCellClick(i){
  const s = xoState;
  if(!s || s.finished || s.board[i]) return;
  if(s.mode==="computer" && s.turn!=="X") return;
  const mark = s.turn;
  s.board[i] = mark;
  playXOPlaceSound(mark==="X");
  const res = xoCheckResult(s.board);
  if(res.winner) return xoFinish(res);
  s.turn = mark==="X" ? "O" : "X";
  xoRenderBoard();
  updateXOStatusText();
  if(s.mode==="computer" && s.turn==="O"){
    xoMoveTimer = setTimeout(()=>{
      if(!xoState || xoState.finished || state.route!=="xo") return;
      const idx = xoComputerPick(s.board, s.diff.ai);
      s.board[idx] = "O";
      playXOPlaceSound(false);
      const res2 = xoCheckResult(s.board);
      if(res2.winner) return xoFinish(res2);
      s.turn = "X";
      xoRenderBoard();
      updateXOStatusText();
    }, 480);
  }
}
function updateXOStatusText(){
  const s = xoState, t = L().xo;
  const el = document.getElementById("xoStatus");
  if(!el || !s) return;
  el.textContent = s.mode==="computer"
    ? (s.turn==="X" ? t.yourTurn : t.computerTurn)
    : (s.turn==="X" ? t.p1Turn : t.p2Turn);
}
function xoRenderBoard(){
  const s = xoState;
  const grid = document.getElementById("xoGrid");
  const locked = s.finished || (s.mode==="computer" && s.turn!=="X");
  if(grid) grid.classList.toggle("locked", locked);
  document.querySelectorAll(".xo-cell").forEach((cell,i)=>{
    const v = s.board[i];
    cell.textContent = v==="X" ? "X" : v==="O" ? "O" : "";
    cell.className = "xo-cell" + (v==="X"?" x":v==="O"?" o":"") + (s.winLine && s.winLine.includes(i) ? " win" : "");
  });
}
function xoFinish(res){
  const s = xoState, t = L().xo, c = L().common;
  s.finished = true;
  s.winLine = res.line;
  xoRenderBoard();
  let titleHtml, subText;
  if(res.winner==="draw"){
    playVictoryJingle(true);
    titleHtml = `${icon('draw',20,'var(--muted)')} ${esc(t.drawTitle)}`;
    subText = t.drawSub;
  } else if(s.mode==="computer"){
    if(res.winner==="X"){
      playVictoryJingle(false);
      titleHtml = `${icon('trophy',20,'var(--brand)')} ${esc(t.winTitle)}`;
      subText = t.winSub;
    } else {
      playDefeatJingle();
      titleHtml = `${icon('frown',20,'var(--danger)')} ${esc(t.loseTitle)}`;
      subText = t.loseSub;
    }
  } else {
    playVictoryJingle(false);
    if(res.winner==="X"){
      titleHtml = `${icon('trophy',20,'var(--brand)')} ${esc(t.p1WinTitle)}`;
      subText = t.p1WinSub;
    } else {
      titleHtml = `${icon('trophy',20,'var(--brand)')} ${esc(t.p2WinTitle)}`;
      subText = t.p2WinSub;
    }
  }
  const overlay = document.getElementById("xoOverlay");
  if(overlay){
    overlay.innerHTML = `<div style="text-align:center">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
      <div style="color:var(--muted);margin-bottom:14px">${esc(subText)}</div>
      <button class="btn btn-brand btn-lg" id="xoAgainBtn">${icon('replay',18)} ${esc(c.restart)}</button>
    </div>`;
    overlay.classList.remove("hide");
    const again = document.getElementById("xoAgainBtn");
    if(again) again.addEventListener("click", render);
  }
}

/* ===================== FARQ TOPISH (spot the difference) ===================== */
// Two hand-drawn scenes (park, room), each rendered twice into a shared
// 400x240 SVG coordinate space. Each scene's diff list gives every possible
// difference a fixed hotspot (cx, cy, r); each round picks a random scene,
// then a random subset of that scene's diffs (sized by difficulty) is
// actually made different — the rest render identically on both sides, via
// the "A" branch on both panels. Differences favor a close color/size shift
// over a jarring swap, and each scene carries a few purely decorative
// elements (identical on both sides) so the real differences have to be
// searched for rather than jumping out immediately.
const FARQ_DIFFICULTIES = [
  {id:"oson", diffCount:5, time:20},
  {id:"normal", diffCount:10, time:40},
  {id:"qiyin", diffCount:15, time:50},
];
const FARQ_PARK_DIFFS = [
  {id:"sun_rays", cx:45, cy:42, r:30},
  {id:"cloud1_color", cx:120, cy:42, r:26},
  {id:"cloud2_missing", cx:270, cy:58, r:26},
  {id:"bird_added", cx:335, cy:28, r:20},
  {id:"tree1_size", cx:55, cy:148, r:30},
  {id:"tree2_missing", cx:140, cy:155, r:30},
  {id:"bench_color", cx:226, cy:180, r:24},
  {id:"flower_color", cx:278, cy:200, r:18},
  {id:"roof_shade", cx:340, cy:126, r:24},
  {id:"window_pane", cx:332, cy:160, r:16},
  {id:"door_color", cx:323, cy:179, r:13},
  {id:"bush_missing", cx:380, cy:200, r:14},
  {id:"second_cloud_added", cx:190, cy:30, r:20},
  {id:"path_stone_added", cx:90, cy:207, r:14},
  {id:"grass_tuft_added", cx:176, cy:182, r:14},
];
function farqParkBaseSvg(){
  return `
    <rect x="0" y="0" width="400" height="150" fill="#CFE8FF"/>
    <rect x="0" y="150" width="400" height="90" fill="#BFE3A8"/>
    <path d="M0 162 Q80 132 180 158 T400 150 V240 H0 Z" fill="#AAD98F"/>
    <path d="M30 205q60-14 120 0" stroke="#E3D3A6" stroke-width="9" fill="none" opacity="0.55"/>
    <rect x="310" y="140" width="60" height="50" fill="#E8D9C3"/>
    <ellipse cx="360" cy="45" rx="12" ry="8" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="20" cy="185" r="7" fill="#8FB877"/>
    <circle cx="30" cy="190" r="9" fill="#9CC684"/>
  `;
}
function farqParkDiffSvg(id, variant){
  switch(id){
    case "sun_rays": {
      let rays = "";
      if(variant==="A"){
        for(let a=0;a<8;a++){
          const ang = a*Math.PI/4;
          const x1=45+Math.cos(ang)*20, y1=42+Math.sin(ang)*20;
          const x2=45+Math.cos(ang)*28, y2=42+Math.sin(ang)*28;
          rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#FFD166" stroke-width="3" stroke-linecap="round"/>`;
        }
      }
      return `${rays}<circle cx="45" cy="42" r="16" fill="#FFD166"/>`;
    }
    case "cloud1_color": {
      const fill = variant==="A" ? "#FFFFFF" : "#D7E2EC";
      return `<g fill="${fill}"><ellipse cx="112" cy="46" rx="16" ry="11"/><ellipse cx="128" cy="42" rx="13" ry="10"/><ellipse cx="122" cy="50" rx="18" ry="9"/></g>`;
    }
    case "cloud2_missing": {
      if(variant==="B") return "";
      return `<g fill="#FFFFFF"><ellipse cx="262" cy="62" rx="16" ry="11"/><ellipse cx="278" cy="58" rx="13" ry="10"/><ellipse cx="272" cy="66" rx="18" ry="9"/></g>`;
    }
    case "bird_added": {
      if(variant==="A") return "";
      return `<path d="M325 28q6-6 10 0q4-6 10 0" stroke="#5B6178" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    }
    case "tree1_size": {
      const r = variant==="A" ? 19 : 23;
      return `<rect x="51" y="152" width="8" height="28" fill="#8B5E3C"/><circle cx="55" cy="140" r="${r}" fill="#4C8C5B"/>`;
    }
    case "tree2_missing": {
      if(variant==="B") return "";
      return `<rect x="136" y="158" width="8" height="28" fill="#8B5E3C"/><circle cx="140" cy="148" r="22" fill="#3E7A4C"/>`;
    }
    case "bench_color": {
      const fill = variant==="A" ? "#8B5E3C" : "#9C6B44";
      return `<g fill="${fill}"><rect x="205" y="176" width="42" height="6" rx="2"/><rect x="208" y="182" width="5" height="14"/><rect x="240" y="182" width="5" height="14"/></g>`;
    }
    case "flower_color": {
      const petal = variant==="A" ? "#E63950" : "#E6784F";
      let petals = "";
      for(let a=0;a<5;a++){
        const ang = a*(2*Math.PI/5) - Math.PI/2;
        const px=278+Math.cos(ang)*8, py=200+Math.sin(ang)*8;
        petals += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="${petal}"/>`;
      }
      return `<rect x="276" y="204" width="4" height="14" fill="#4C8C5B"/>${petals}<circle cx="278" cy="200" r="4" fill="#8B5E3C"/>`;
    }
    case "window_pane": {
      const cross = variant==="A" ? `<line x1="332" y1="152" x2="332" y2="168" stroke="#5B6178" stroke-width="1.5"/><line x1="324" y1="160" x2="340" y2="160" stroke="#5B6178" stroke-width="1.5"/>` : "";
      return `<rect x="324" y="152" width="16" height="16" rx="1" fill="#BEE3F8" stroke="#5B6178" stroke-width="1.5"/>${cross}`;
    }
    case "roof_shade": {
      const fill = variant==="A" ? "#C0392B" : "#A83226";
      return `<path d="M304 140 L340 112 L376 140 Z" fill="${fill}"/>`;
    }
    case "door_color": {
      const fill = variant==="A" ? "#8B5E3C" : "#6B4A2E";
      return `<rect x="316" y="168" width="14" height="22" fill="${fill}"/>`;
    }
    case "bush_missing": {
      if(variant==="B") return "";
      return `<circle cx="380" cy="200" r="6" fill="#8FB877"/>`;
    }
    case "second_cloud_added": {
      if(variant==="A") return "";
      return `<ellipse cx="190" cy="30" rx="14" ry="9" fill="#FFFFFF"/>`;
    }
    case "path_stone_added": {
      if(variant==="A") return "";
      return `<circle cx="90" cy="207" r="5" fill="#9C9C9C"/>`;
    }
    case "grass_tuft_added": {
      if(variant==="B") return "";
      return `<path d="M170 185q6-10 12 0" stroke="#6FA85B" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }
  }
  return "";
}
const FARQ_ROOM_DIFFS = [
  {id:"window_frame_color", cx:20, cy:62, r:12},
  {id:"curtain_open", cx:53, cy:90, r:36},
  {id:"sofa_color", cx:210, cy:158, r:14},
  {id:"cushion_color", cx:231, cy:147, r:16},
  {id:"shelf_color", cx:220, cy:35, r:16},
  {id:"book_stack_count", cx:172, cy:20, r:18},
  {id:"lamp_shade_color", cx:283, cy:118, r:20},
  {id:"picture_missing", cx:255, cy:73, r:20},
  {id:"plant_leaf_size", cx:106, cy:150, r:20},
  {id:"clock_hands_angle", cx:115, cy:38, r:18},
  {id:"rug_dot", cx:170, cy:200, r:20},
  {id:"door_handle_side", cx:336, cy:115, r:30},
  {id:"peephole_color", cx:341, cy:70, r:10},
  {id:"floor_shadow_missing", cx:36, cy:147, r:12},
  {id:"floor_plank_added", cx:280, cy:190, r:16},
];
function farqRoomBaseSvg(){
  return `
    <rect x="0" y="0" width="400" height="170" fill="#F2E4CE"/>
    <rect x="0" y="170" width="400" height="70" fill="#C89B6B"/>
    <path d="M0 182h400M0 200h400M0 218h400" stroke="#B4854F" stroke-width="1" opacity="0.45"/>
    <rect x="300" y="40" width="70" height="150" fill="#DCC79E" stroke="#8B6B45" stroke-width="3"/>
    <rect x="145" y="14" width="8" height="10" fill="#B4854F" opacity="0.6"/>
  `;
}
function farqRoomDiffSvg(id, variant){
  switch(id){
    case "lamp_shade_color": {
      const fill = variant==="A" ? "#F4C368" : "#E8B457";
      return `<rect x="279" y="128" width="4" height="14" fill="#8B6B45"/><path d="M269 112 L297 112 L291 128 L275 128 Z" fill="${fill}"/>`;
    }
    case "picture_missing": {
      if(variant==="B") return "";
      return `<rect x="242" y="56" width="26" height="34" fill="#FFFFFF" stroke="#8B6B45" stroke-width="2.5"/><path d="M246 84l7-10 5 6 6-8 6 12Z" fill="#9AB88F"/>`;
    }
    case "plant_leaf_size": {
      const r = variant==="A" ? 15 : 18;
      return `<path d="M98 175 L114 175 L111 155 L101 155 Z" fill="#B98455"/><circle cx="106" cy="148" r="${r}" fill="#4C8C5B"/>`;
    }
    case "cushion_color": {
      const fill = variant==="A" ? "#8FAF8A" : "#7FA37A";
      return `<rect x="222" y="140" width="18" height="14" rx="3" fill="${fill}"/>`;
    }
    case "curtain_open": {
      const w = variant==="A" ? 20 : 12;
      return `<rect x="18" y="58" width="${w}" height="64" fill="#C97B84" opacity="0.85"/><rect x="${88-w}" y="58" width="${w}" height="64" fill="#C97B84" opacity="0.85"/>`;
    }
    case "clock_hands_angle": {
      const ang2 = variant==="A" ? -40 : -70;
      const hx = 115+9*Math.cos(ang2*Math.PI/180), hy = 38+9*Math.sin(ang2*Math.PI/180);
      return `<circle cx="115" cy="38" r="15" fill="#FFFFFF" stroke="#8B6B45" stroke-width="2"/><line x1="115" y1="38" x2="115" y2="28" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round"/><line x1="115" y1="38" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round"/>`;
    }
    case "book_stack_count": {
      const n = variant==="A" ? 3 : 2;
      const colors = ["#C0596B","#5B7FA6","#DDA23A"];
      let books = "";
      for(let i=0;i<n;i++){
        books += `<rect x="${158+i*9}" y="${30-(i+1)*8}" width="7" height="${(i+1)*8}" fill="${colors[i%colors.length]}"/>`;
      }
      return books;
    }
    case "rug_dot": {
      const dot = variant==="A" ? `<circle cx="170" cy="198" r="4" fill="#B4854F"/>` : "";
      return `<ellipse cx="170" cy="205" rx="70" ry="18" fill="#D9C49A" opacity="0.7"/>${dot}`;
    }
    case "door_handle_side": {
      const cx = variant==="A" ? 360 : 312;
      return `<circle cx="${cx}" cy="115" r="4" fill="#8B6B45"/>`;
    }
    case "window_frame_color": {
      const stroke = variant==="A" ? "#8B6B45" : "#7A5B3A";
      return `<rect x="18" y="60" width="70" height="60" fill="none" stroke="${stroke}" stroke-width="4"/>`;
    }
    case "sofa_color": {
      const fill = variant==="A" ? "#6B7F9E" : "#5F7390";
      return `<rect x="196" y="150" width="64" height="14" rx="4" fill="${fill}"/><rect x="200" y="130" width="10" height="24" fill="${fill}"/><rect x="248" y="130" width="10" height="24" fill="${fill}"/>`;
    }
    case "shelf_color": {
      const fill = variant==="A" ? "#8B6B45" : "#7A5B3A";
      return `<rect x="150" y="30" width="90" height="10" fill="${fill}"/>`;
    }
    case "peephole_color": {
      const fill = variant==="A" ? "#DCC79E" : "#C9AD7E";
      return `<circle cx="341" cy="70" r="5" fill="${fill}" stroke="#8B6B45" stroke-width="1.5"/>`;
    }
    case "floor_shadow_missing": {
      if(variant==="B") return "";
      return `<rect x="30" y="145" width="12" height="3" fill="#B4854F" opacity="0.5"/>`;
    }
    case "floor_plank_added": {
      if(variant==="B") return "";
      return `<line x1="260" y1="190" x2="300" y2="190" stroke="#8B5A3C" stroke-width="2" opacity="0.6"/>`;
    }
  }
  return "";
}
const FARQ_SCENES = {
  park: {diffs: FARQ_PARK_DIFFS, base: farqParkBaseSvg, render: farqParkDiffSvg},
  room: {diffs: FARQ_ROOM_DIFFS, base: farqRoomBaseSvg, render: farqRoomDiffSvg},
};
const FARQ_SCENE_IDS = Object.keys(FARQ_SCENES);
function farqRenderPanelSvg(sceneId, variant, activeDiffs){
  const scene = FARQ_SCENES[sceneId];
  let body = scene.base();
  scene.diffs.forEach(d=>{
    const isActive = activeDiffs.some(ad=>ad.id===d.id);
    const useVariant = (variant==="B" && isActive) ? "B" : "A";
    body += scene.render(d.id, useVariant);
  });
  return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}
let farqState = null, farqTickTimer = null;
function farqStopEverything(){
  if(farqTickTimer){ clearInterval(farqTickTimer); farqTickTimer=null; }
  stopVictoryAudio(); stopDefeatAudio();
}
function viewFarq(){
  const t = L().farq, c = L().common, diffT = L().difficulties;
  if(!state.farq) state.farq = {difficulty:null};
  const st = state.farq;
  if(!st.difficulty){
    farqStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${FARQ_DIFFICULTIES.map(d=>`<button class="pick" data-farqdiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc(d))}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  farqStopEverything();
  const diff = FARQ_DIFFICULTIES.find(d=>d.id===st.difficulty);
  const sceneId = FARQ_SCENE_IDS[randInt(0, FARQ_SCENE_IDS.length-1)];
  const activeDiffs = shuffle(FARQ_SCENES[sceneId].diffs).slice(0, diff.diffCount);
  farqState = {diff, sceneId, found:new Set(), finished:false, timeLeft:diff.time, activeDiffs};
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="rope-hud" style="max-width:820px;margin:0 auto 10px">
      <div class="mono" style="font-size:14px" id="farqStats">${esc(t.progress(0, diff.diffCount))}</div>
      <div class="timer mono" id="farqTimer">${diff.time}s</div>
    </div>
    <div class="farq-wrap" id="farqWrap">
      <div class="farq-panel"><div class="farq-svg-holder" id="farqHolderA">${farqRenderPanelSvg(sceneId, "A", activeDiffs)}</div><div class="farq-markers" id="farqMarkersA"></div></div>
      <div class="farq-panel"><div class="farq-svg-holder" id="farqHolderB">${farqRenderPanelSvg(sceneId, "B", activeDiffs)}</div><div class="farq-markers" id="farqMarkersB"></div></div>
      <div class="farq-result hide" id="farqResult"></div>
    </div>
    <div style="text-align:center;margin-top:18px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="farqChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function wireFarq(){
  document.querySelectorAll("[data-farqdiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.farq.difficulty = b.dataset.farqdiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("farqChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    farqStopEverything();
    state.farq.difficulty = null;
    render();
  });
  const wrap = document.getElementById("farqWrap");
  if(!wrap) return;
  startFarqTimer();
  ["A","B"].forEach(side=>{
    const holder = document.getElementById("farqHolder"+side);
    if(holder) holder.addEventListener("click", (e)=>farqHandleClick(e, holder));
  });
}
function startFarqTimer(){
  if(farqTickTimer) clearInterval(farqTickTimer);
  farqTickTimer = setInterval(()=>{
    if(!farqState || farqState.finished || state.route!=="farq"){
      if(farqTickTimer){ clearInterval(farqTickTimer); farqTickTimer=null; }
      return;
    }
    farqState.timeLeft--;
    const el = document.getElementById("farqTimer");
    if(el){ el.textContent = farqState.timeLeft+"s"; el.classList.toggle("low", farqState.timeLeft<=8); }
    if(farqState.timeLeft>0 && farqState.timeLeft<=5) playCountdownBeep();
    if(farqState.timeLeft<=0) farqFinish(false);
  }, 1000);
}
function playFarqFoundSound(){
  const ctx = ensureAudioCtx();
  if(!ctx) return;
  const t = ctx.currentTime + 0.01;
  playTone(700, t, 0.08, "triangle", 0.07);
  playTone(1000, t+0.06, 0.1, "triangle", 0.06);
}
function farqHandleClick(e, holder){
  if(!farqState || farqState.finished) return;
  const rect = holder.getBoundingClientRect();
  const svgX = (e.clientX-rect.left)/rect.width*400;
  const svgY = (e.clientY-rect.top)/rect.height*240;
  let hit = null;
  for(const d of farqState.activeDiffs){
    if(farqState.found.has(d.id)) continue;
    if(Math.hypot(svgX-d.cx, svgY-d.cy) <= d.r){ hit = d; break; }
  }
  if(hit){
    farqState.found.add(hit.id);
    playFarqFoundSound();
    farqAddMarker(hit, false);
    updateFarqStats();
    if(farqState.found.size>=farqState.activeDiffs.length) farqFinish(true);
  } else {
    farqFlashMiss(holder, e.clientX-rect.left, e.clientY-rect.top, rect);
  }
}
function farqAddMarker(d, missed){
  const leftPct = d.cx/400*100, topPct = d.cy/240*100;
  ["A","B"].forEach(side=>{
    const markers = document.getElementById("farqMarkers"+side);
    if(!markers) return;
    const m = document.createElement("div");
    m.className = "farq-marker"+(missed?" missed":"");
    m.style.left = leftPct+"%"; m.style.top = topPct+"%";
    m.innerHTML = icon(missed?'x':'check', missed?12:14, '#fff');
    markers.appendChild(m);
  });
}
function farqFlashMiss(holder, px, py, rect){
  const markers = holder.parentElement.querySelector(".farq-markers");
  if(!markers) return;
  const el = document.createElement("div");
  el.className = "farq-miss";
  el.style.left = (px/rect.width*100)+"%";
  el.style.top = (py/rect.height*100)+"%";
  markers.appendChild(el);
  setTimeout(()=>{ el.remove(); }, 450);
}
function updateFarqStats(){
  const t = L().farq;
  const el = document.getElementById("farqStats");
  if(el && farqState) el.textContent = t.progress(farqState.found.size, farqState.activeDiffs.length);
}
function farqFinish(won){
  if(!farqState || farqState.finished) return;
  farqState.finished = true;
  if(farqTickTimer){ clearInterval(farqTickTimer); farqTickTimer=null; }
  const t = L().farq, c = L().common;
  const foundCount = farqState.found.size, total = farqState.activeDiffs.length;
  const secs = farqState.diff.time - Math.max(farqState.timeLeft, 0);
  let titleHtml, subText;
  if(won){
    playVictoryJingle(false);
    titleHtml = `${icon('sparkles',20,'var(--brand)')} ${esc(t.winTitle)}`;
    subText = t.winSub(secs);
  } else {
    playDefeatJingle();
    titleHtml = `${icon('frown',20,'var(--danger)')} ${esc(t.timeUpTitle)}`;
    subText = t.timeUpSub(foundCount, total);
    farqState.activeDiffs.forEach(d=>{ if(!farqState.found.has(d.id)) farqAddMarker(d, true); });
  }
  const result = document.getElementById("farqResult");
  if(result){
    result.innerHTML = `<div style="text-align:center">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
      <div style="color:var(--muted);margin-bottom:14px">${esc(subText)}</div>
      <button class="btn btn-brand btn-lg" id="farqAgainBtn">${icon('replay',18)} ${esc(c.restart)}</button>
    </div>`;
    result.classList.remove("hide");
    const again = document.getElementById("farqAgainBtn");
    if(again) again.addEventListener("click", render);
  }
  // The timer is meaningless once the round is over.
  const timerEl = document.getElementById("farqTimer");
  if(timerEl) timerEl.style.display = "none";
}

/* ===================== TETRIS ===================== */
const TETRIS_COLS = 14, TETRIS_ROWS = 18;
const TETRIS_SPAWN_X = Math.floor(TETRIS_COLS/2) - 2;
const TETRIS_DIFFICULTIES = [
  {id:"oson", dropSpeed:800, minSpeed:350, speedStep:35, linesPerLevel:10},
  {id:"normal", dropSpeed:600, minSpeed:200, speedStep:45, linesPerLevel:8},
  {id:"qiyin", dropSpeed:420, minSpeed:100, speedStep:55, linesPerLevel:6},
];
// Each piece is stored as 4 rotation states inside a 4x4 bounding box, so
// collision/rotation code never needs to special-case a piece's shape.
const TETRIS_SHAPES = {
  I:[[[0,1],[1,1],[2,1],[3,1]], [[2,0],[2,1],[2,2],[2,3]], [[0,2],[1,2],[2,2],[3,2]], [[1,0],[1,1],[1,2],[1,3]]],
  O:[[[1,0],[2,0],[1,1],[2,1]], [[1,0],[2,0],[1,1],[2,1]], [[1,0],[2,0],[1,1],[2,1]], [[1,0],[2,0],[1,1],[2,1]]],
  T:[[[1,0],[0,1],[1,1],[2,1]], [[1,0],[1,1],[2,1],[1,2]], [[0,1],[1,1],[2,1],[1,2]], [[1,0],[0,1],[1,1],[1,2]]],
  S:[[[1,0],[2,0],[0,1],[1,1]], [[1,0],[1,1],[2,1],[2,2]], [[1,1],[2,1],[0,2],[1,2]], [[0,0],[0,1],[1,1],[1,2]]],
  Z:[[[0,0],[1,0],[1,1],[2,1]], [[2,0],[1,1],[2,1],[1,2]], [[0,1],[1,1],[1,2],[2,2]], [[1,0],[0,1],[1,1],[0,2]]],
  J:[[[0,0],[0,1],[1,1],[2,1]], [[1,0],[2,0],[1,1],[1,2]], [[0,1],[1,1],[2,1],[2,2]], [[1,0],[1,1],[0,2],[1,2]]],
  L:[[[2,0],[0,1],[1,1],[2,1]], [[1,0],[1,1],[1,2],[2,2]], [[0,1],[1,1],[2,1],[0,2]], [[0,0],[1,0],[1,1],[1,2]]],
};
const TETRIS_COLORS = {I:"var(--edu)", O:"var(--brand)", T:"var(--purple)", S:"var(--ok)", Z:"var(--danger)", J:"var(--indigo)", L:"var(--fun)"};
const TETRIS_TYPES = Object.keys(TETRIS_SHAPES);
let tetrisState = null, tetrisDropTimer = null;
// Same defense-in-depth pattern as Snake/Target/X-0: this route's difficulty
// picker and its game screen share one route, so leaving/re-entering it (or
// reopening the picker) has to explicitly stop the pending drop tick and any
// leftover win jingle itself.
function tetrisStopEverything(){
  if(tetrisDropTimer){ clearTimeout(tetrisDropTimer); tetrisDropTimer=null; }
  if(tetrisState){ tetrisState.running = false; tetrisState.paused = false; }
  stopVictoryAudio(); stopDefeatAudio();
}
function viewTetris(){
  const t = L().tetris, c = L().common, diffT = L().difficulties;
  if(!state.tetris) state.tetris = {difficulty:null};
  const st = state.tetris;
  let best = 0;
  try{ best = Number(localStorage.getItem("aqlarena_tetris_best"))||0; }catch(e){}
  if(!st.difficulty){
    tetrisStopEverything();
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.h2)}</h2>
        <p class="lead">${esc(t.setupLead)}</p>
      </div>
      <div class="pick-grid" style="max-width:560px;margin:0 auto">
        ${TETRIS_DIFFICULTIES.map(d=>`<button class="pick" data-tetrisdiff="${d.id}"><b>${esc(diffT[d.id].name)}</b><span>${esc(t.diffDesc[d.id])}</span></button>`).join("")}
      </div>
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button></div>
    </div>`;
  }
  tetrisStopEverything();
  const diff = TETRIS_DIFFICULTIES.find(d=>d.id===st.difficulty);
  tetrisState = {running:false, paused:false, best, diff};
  return `
  <div class="wrap section" style="padding-top:16px;padding-bottom:24px">
    <div class="section-head" style="margin-bottom:12px">
      <div class="eyebrow" style="color:var(--fun)">${esc(t.eyebrow)}</div>
      <h2 style="margin-bottom:0">${esc(t.h2)}</h2>
    </div>
    <div style="display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:10px">
      <div><div class="mono" style="font-size:20px;font-weight:700" id="tetrisScoreDisp">0</div><div style="color:var(--muted);font-size:12px">${esc(t.score)}</div></div>
      <div><div class="mono" style="font-size:20px;font-weight:700;color:var(--brand)" id="tetrisBestDisp">${best}</div><div style="color:var(--muted);font-size:12px">${esc(t.best)}</div></div>
      <div><div class="mono" style="font-size:20px;font-weight:700" id="tetrisLevelDisp">${esc(diffT[diff.id].name)}</div><div style="color:var(--muted);font-size:12px">${esc(t.level)}</div></div>
      <div><div class="mono" style="font-size:20px;font-weight:700" id="tetrisLinesDisp">0</div><div style="color:var(--muted);font-size:12px">${esc(t.lines)}</div></div>
      <button class="btn btn-outline" id="tetrisPauseBtn">${esc(t.pause)}</button>
    </div>
    <div class="tetris-layout">
      <div class="tetris-wrap">
        <div class="tetris-grid" id="tetrisGrid"></div>
        <div class="tetris-overlay" id="tetrisOverlay"><button class="btn btn-brand btn-lg" id="tetrisStartBtn">${esc(t.start)}</button></div>
      </div>
      <div class="tetris-side">
        <div style="color:var(--muted);font-size:12px;margin-bottom:6px;text-align:center">${esc(t.next)}</div>
        <div class="tetris-next-grid" id="tetrisNextGrid"></div>
      </div>
    </div>
    <div class="snake-pad" id="tetrisPad">
      <button class="snake-btn" data-taction="rotate" style="grid-area:up">↻</button>
      <button class="snake-btn" data-taction="left" style="grid-area:left">◀</button>
      <button class="snake-btn" data-taction="down" style="grid-area:down">▼</button>
      <button class="snake-btn" data-taction="right" style="grid-area:right">▶</button>
    </div>
    <div style="text-align:center;margin-top:8px"><button class="btn btn-outline" id="tetrisDropBtn">${esc(t.hardDrop)}</button></div>
    <p style="text-align:center;color:var(--muted);font-size:12.5px;margin-top:6px">${esc(t.keyHint)}</p>
    <div style="text-align:center;margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" data-nav="kongilochar">${esc(c.back)}</button>
      <button class="btn btn-outline" id="tetrisChangeDiffBtn">${esc(t.changeDiff)}</button>
    </div>
  </div>`;
}
function tetrisInitGrid(){
  const grid = document.getElementById("tetrisGrid");
  if(!grid) return;
  let cells = "";
  for(let i=0;i<TETRIS_COLS*TETRIS_ROWS;i++) cells += `<div class="tetris-cell" data-c="${i}"></div>`;
  grid.innerHTML = cells;
  const next = document.getElementById("tetrisNextGrid");
  if(next){
    let ncells = "";
    for(let i=0;i<16;i++) ncells += `<div class="tetris-cell" data-c="${i}"></div>`;
    next.innerHTML = ncells;
  }
}
function wireTetris(){
  document.querySelectorAll("[data-tetrisdiff]").forEach(b=>b.addEventListener("click", ()=>{
    ensureAudioCtx();
    state.tetris.difficulty = b.dataset.tetrisdiff;
    render();
  }));
  const changeDiffBtn = document.getElementById("tetrisChangeDiffBtn");
  if(changeDiffBtn) changeDiffBtn.addEventListener("click", ()=>{
    tetrisStopEverything();
    state.tetris.difficulty = null;
    render();
  });
  const grid = document.getElementById("tetrisGrid");
  if(!grid) return; // still on the difficulty picker
  tetrisInitGrid();
  const startBtn = document.getElementById("tetrisStartBtn");
  if(startBtn) startBtn.addEventListener("click", startTetrisGame);
  document.querySelectorAll("#tetrisPad [data-taction]").forEach(b=>b.addEventListener("click", ()=>tetrisAction(b.dataset.taction)));
  const dropBtn = document.getElementById("tetrisDropBtn");
  if(dropBtn) dropBtn.addEventListener("click", ()=>tetrisAction("harddrop"));
  const pauseBtn = document.getElementById("tetrisPauseBtn");
  if(pauseBtn) pauseBtn.addEventListener("click", tetrisTogglePause);
}
function tetrisKeyHandler(e){
  if(state.route!=="tetris") return;
  if(e.key==="p" || e.key==="P"){ e.preventDefault(); tetrisTogglePause(); return; }
  const map = {ArrowLeft:"left", ArrowRight:"right", ArrowDown:"down", ArrowUp:"rotate", " ":"harddrop", Spacebar:"harddrop"};
  const action = map[e.key];
  if(action){ e.preventDefault(); tetrisAction(action); }
}
function tetrisAction(action){
  const s = tetrisState;
  if(!s || !s.running || s.paused) return;
  if(action==="left") tetrisMove(-1,0);
  else if(action==="right") tetrisMove(1,0);
  else if(action==="down") tetrisSoftDrop();
  else if(action==="rotate") tetrisRotate();
  else if(action==="harddrop") tetrisHardDrop();
}
// Pause freezes the drop timer (and blocks all move/rotate/drop input)
// without ending the round, so the score/board/next-piece are untouched —
// resuming just re-schedules the next natural drop from full speed.
function tetrisPause(){
  const s = tetrisState;
  if(!s || !s.running || s.paused) return;
  s.paused = true;
  if(tetrisDropTimer){ clearTimeout(tetrisDropTimer); tetrisDropTimer=null; }
  const t = L().tetris;
  const overlay = document.getElementById("tetrisOverlay");
  if(overlay){
    overlay.innerHTML = `<div style="text-align:center">
      <div style="font-family:Unbounded;font-size:20px;margin-bottom:12px">${icon('clock',20)} ${esc(t.pausedTitle)}</div>
      <button class="btn btn-brand btn-lg" id="tetrisResumeBtn">${esc(t.resume)}</button>
    </div>`;
    overlay.classList.remove("hide");
    const resumeBtn = document.getElementById("tetrisResumeBtn");
    if(resumeBtn) resumeBtn.addEventListener("click", tetrisResume);
  }
  const pauseBtn = document.getElementById("tetrisPauseBtn");
  if(pauseBtn) pauseBtn.textContent = t.resume;
}
function tetrisResume(){
  const s = tetrisState;
  if(!s || !s.running || !s.paused) return;
  s.paused = false;
  const overlay = document.getElementById("tetrisOverlay");
  if(overlay){ overlay.classList.add("hide"); overlay.innerHTML = ""; }
  const pauseBtn = document.getElementById("tetrisPauseBtn");
  if(pauseBtn) pauseBtn.textContent = L().tetris.pause;
  tetrisScheduleDrop();
}
function tetrisTogglePause(){
  const s = tetrisState;
  if(!s || !s.running) return;
  if(s.paused) tetrisResume(); else tetrisPause();
}
function tetrisCells(piece){
  return TETRIS_SHAPES[piece.type][piece.rot].map(([dx,dy])=>({x:piece.x+dx, y:piece.y+dy}));
}
function tetrisValid(piece){
  return tetrisCells(piece).every(c=>{
    if(c.x<0 || c.x>=TETRIS_COLS || c.y>=TETRIS_ROWS) return false;
    if(c.y<0) return true; // still above the visible board, always open
    return !tetrisState.grid[c.y][c.x];
  });
}
function tetrisMove(dx,dy){
  const s = tetrisState;
  const np = {...s.current, x:s.current.x+dx, y:s.current.y+dy};
  if(tetrisValid(np)){ s.current = np; tetrisRenderBoard(); return true; }
  return false;
}
function tetrisRotate(){
  const s = tetrisState;
  const nrot = (s.current.rot+1)%4;
  const kicks = [0,-1,1,-2,2];
  for(const k of kicks){
    const np = {...s.current, rot:nrot, x:s.current.x+k};
    if(tetrisValid(np)){ s.current = np; tetrisRenderBoard(); return; }
  }
}
function tetrisSoftDrop(){
  if(tetrisMove(0,1)){ tetrisState.score += 1; tetrisUpdateStats(); }
  else { tetrisLockPiece(); }
}
function tetrisHardDrop(){
  const s = tetrisState;
  let dist = 0;
  while(tetrisMove(0,1)) dist++;
  s.score += dist*2;
  playTetrisDropSound();
  tetrisLockPiece();
}
function tetrisRandomType(){
  const s = tetrisState;
  if(!s.bag || s.bag.length===0) s.bag = shuffle(TETRIS_TYPES);
  return s.bag.pop();
}
function tetrisSpawnPiece(){
  const s = tetrisState;
  s.current = {type:s.next, rot:0, x:TETRIS_SPAWN_X, y:-1};
  s.next = tetrisRandomType();
  tetrisRenderNext();
}
function tetrisClearLines(){
  const s = tetrisState;
  let cleared = 0;
  for(let y=TETRIS_ROWS-1; y>=0; y--){
    if(s.grid[y].every(c=>c)){
      s.grid.splice(y,1);
      s.grid.unshift(Array(TETRIS_COLS).fill(null));
      cleared++;
      y++; // re-check this same index, now holding the row shifted down into it
    }
  }
  return cleared;
}
function tetrisLockPiece(){
  const s = tetrisState;
  tetrisCells(s.current).forEach(c=>{
    if(c.y>=0 && c.y<TETRIS_ROWS && c.x>=0 && c.x<TETRIS_COLS) s.grid[c.y][c.x] = s.current.type;
  });
  const cleared = tetrisClearLines();
  if(cleared>0){
    playTetrisClearSound(cleared);
    s.lines += cleared;
    const pointsTable = [0,100,300,500,800];
    s.score += pointsTable[cleared] * s.level;
    if(s.lines >= s.level*s.diff.linesPerLevel){
      s.level++;
      s.speed = Math.max(s.diff.minSpeed, s.speed - s.diff.speedStep);
    }
  } else {
    playTetrisLockSound();
  }
  tetrisUpdateStats();
  tetrisSpawnPiece();
  if(!tetrisValid(s.current)){ endTetrisGame(); return; }
  tetrisScheduleDrop();
  tetrisRenderBoard();
}
function tetrisScheduleDrop(){
  if(tetrisDropTimer) clearTimeout(tetrisDropTimer);
  tetrisDropTimer = setTimeout(tetrisTick, tetrisState.speed);
}
function tetrisTick(){
  if(state.route!=="tetris"){ if(tetrisDropTimer){ clearTimeout(tetrisDropTimer); tetrisDropTimer=null; } if(tetrisState) tetrisState.running=false; return; }
  const s = tetrisState;
  if(!s || !s.running || s.paused) return;
  if(!tetrisMove(0,1)){ tetrisLockPiece(); }
  else { tetrisScheduleDrop(); }
}
function startTetrisGame(){
  const overlay = document.getElementById("tetrisOverlay");
  if(overlay) overlay.classList.add("hide");
  const s = tetrisState;
  s.paused = false;
  const pauseBtn = document.getElementById("tetrisPauseBtn");
  if(pauseBtn) pauseBtn.textContent = L().tetris.pause;
  s.grid = Array.from({length:TETRIS_ROWS}, ()=>Array(TETRIS_COLS).fill(null));
  s.bag = [];
  s.score = 0; s.level = 1; s.lines = 0;
  s.speed = s.diff.dropSpeed;
  s.next = tetrisRandomType();
  tetrisSpawnPiece();
  s.running = true;
  tetrisUpdateStats();
  if(!tetrisValid(s.current)){ endTetrisGame(); return; }
  tetrisScheduleDrop();
  tetrisRenderBoard();
}
function tetrisUpdateStats(){
  const s = tetrisState;
  const scoreEl = document.getElementById("tetrisScoreDisp"); if(scoreEl) scoreEl.textContent = s.score;
  // tetrisLevelDisp is intentionally left alone here — it shows the chosen
  // difficulty name (set once in viewTetris), not the internal speed level.
  const linesEl = document.getElementById("tetrisLinesDisp"); if(linesEl) linesEl.textContent = s.lines;
}
function tetrisRenderBoard(){
  const s = tetrisState;
  const grid = document.getElementById("tetrisGrid");
  if(!grid || !s || !s.grid) return;
  grid.querySelectorAll(".tetris-cell").forEach(c=>{ c.className="tetris-cell"; c.style.background=""; });
  for(let y=0;y<TETRIS_ROWS;y++){
    for(let x=0;x<TETRIS_COLS;x++){
      const type = s.grid[y][x];
      if(type){
        const el = grid.children[y*TETRIS_COLS+x];
        if(el){ el.classList.add("filled"); el.style.background = TETRIS_COLORS[type]; }
      }
    }
  }
  if(s.current){
    tetrisCells(s.current).forEach(c=>{
      if(c.y<0 || c.y>=TETRIS_ROWS || c.x<0 || c.x>=TETRIS_COLS) return;
      const el = grid.children[c.y*TETRIS_COLS+c.x];
      if(el){ el.classList.add("filled"); el.style.background = TETRIS_COLORS[s.current.type]; }
    });
  }
}
function tetrisRenderNext(){
  const s = tetrisState;
  const grid = document.getElementById("tetrisNextGrid");
  if(!grid || !s.next) return;
  grid.querySelectorAll(".tetris-cell").forEach(c=>{ c.className="tetris-cell"; c.style.background=""; });
  TETRIS_SHAPES[s.next][0].forEach(([x,y])=>{
    const el = grid.children[y*4+x];
    if(el){ el.classList.add("filled"); el.style.background = TETRIS_COLORS[s.next]; }
  });
}
function playTetrisLockSound(){
  const ctx = ensureAudioCtx(); if(!ctx) return;
  playTone(220, ctx.currentTime+0.005, 0.06, "square", 0.05);
}
function playTetrisDropSound(){
  const ctx = ensureAudioCtx(); if(!ctx) return;
  playTone(140, ctx.currentTime+0.005, 0.08, "square", 0.06);
}
function playTetrisClearSound(n){
  const ctx = ensureAudioCtx(); if(!ctx) return;
  const t0 = ctx.currentTime+0.01;
  const freqs = [520,660,780,920];
  for(let i=0;i<Math.min(n,4);i++) playTone(freqs[i], t0+i*0.07, 0.12, "triangle", 0.08);
}
// No "defeat" framing here either (same choice as Snake): topping out just
// ends the round. A new personal best gets the victory jingle and a "new
// record" panel; anything else is a plain, neutral "you scored N" panel
// with no sound.
function endTetrisGame(){
  const s = tetrisState, t = L().tetris, c = L().common;
  s.running = false;
  if(tetrisDropTimer){ clearTimeout(tetrisDropTimer); tetrisDropTimer=null; }
  const isNewRecord = s.score > s.best;
  if(isNewRecord){
    s.best = s.score;
    try{ localStorage.setItem("aqlarena_tetris_best", String(s.best)); }catch(e){}
    playVictoryJingle(false);
  }
  const bestEl = document.getElementById("tetrisBestDisp"); if(bestEl) bestEl.textContent = s.best;
  const overlay = document.getElementById("tetrisOverlay");
  if(!overlay) return;
  const titleHtml = isNewRecord
    ? `${icon('trophy',20,'var(--brand)')} ${esc(t.recordTitle)}`
    : `${icon('flag',20,'var(--muted)')} ${esc(t.over)}`;
  const subText = isNewRecord ? t.recordSub(s.score) : t.overSub(s.score);
  overlay.innerHTML = `<div style="text-align:center">
    <div style="font-family:Unbounded;font-size:20px;margin-bottom:8px">${titleHtml}</div>
    <div style="color:var(--muted);margin-bottom:14px">${esc(subText)}</div>
    <button class="btn btn-brand btn-lg" id="tetrisStartBtn">${icon('replay',18)} ${esc(c.restart)}</button>
  </div>`;
  overlay.classList.remove("hide");
  document.getElementById("tetrisStartBtn").addEventListener("click", startTetrisGame);
}

/* ===================== BILIM KROSSVORDI ===================== */
// A small "keyword acrostic" crossword: each row's word crosses the shared
// key column (col 4) at one letter, and those letters spell a keyword read
// top-to-bottom. Built this way so every row is independent — no risk of
// conflicting letters between words, unlike a freeform crossword grid.
// Each subject has a LIST of banks (variants); one is picked at random when
// the player chooses that subject, so the puzzle isn't identical every time.
const XWORD_BANKS = {
  kompsavod: [
    {
      keyword: "PROGRAMMA",
      keyCol: 4,
      words: [
        {word:"PAROL",     startCol:4, clue:"Tizimga kirish uchun kerakli maxfiy so'z."},
        {word:"SERVER",    startCol:2, clue:"Ma'lumotlarni saqlaydigan va so'rovlarga javob beradigan kuchli kompyuter."},
        {word:"KOD",       startCol:3, clue:"Dasturchi yozadigan buyruqlar matni."},
        {word:"LOGIN",     startCol:2, clue:"Tizimga kirish uchun ishlatiladigan foydalanuvchi nomi."},
        {word:"BRAUZER",   startCol:3, clue:"Internet sahifalarini ko'rish uchun dastur (Chrome, Firefox kabi)."},
        {word:"MASSIV",    startCol:3, clue:"Bir nechta qiymatni bitta o'zgaruvchida saqlash usuli."},
        {word:"KOMPYUTER", startCol:2, clue:"Dasturlarni ishga tushiradigan elektron qurilma."},
        {word:"MODUL",     startCol:4, clue:"Dasturning alohida, qayta ishlatsa bo'ladigan qismi."},
        {word:"SAYT",      startCol:3, clue:"Internetdagi bir nechta sahifadan iborat manzil."},
      ],
    },
    {
      keyword: "INTERNET",
      keyCol: 4,
      words: [
        {word:"IKON",    startCol:4, clue:"Dastur yoki faylni bildiruvchi kichik rasm belgisi."},
        {word:"MENU",    startCol:2, clue:"Ilovada bir nechta bo'limni tanlash uchun ro'yxat."},
        {word:"SAYT",    startCol:1, clue:"Internetdagi bir nechta sahifadan iborat manzil."},
        {word:"MENYU",   startCol:3, clue:"Foydalanuvchi tanlov qiladigan buyruqlar ro'yxati."},
        {word:"PAROL",   startCol:2, clue:"Tizimga kirish uchun kerakli maxfiy so'z."},
        {word:"EKRAN",   startCol:0, clue:"Ma'lumot ko'rsatiladigan qurilma yuzasi."},
        {word:"TELEFON", startCol:3, clue:"Qo'lda olib yuriladigan aloqa va internet qurilmasi."},
        {word:"PORT",    startCol:1, clue:"Qurilmalarni ulash uchun kompyuterdagi yoki tarmoqdagi manzil qismi."},
      ],
    },
  ],
  html: [
    {
      keyword: "ELEMENT",
      keyCol: 4,
      words: [
        {word:"TEG",     startCol:3, clue:"HTML qurilish bloki, burchak qavslar orasida yoziladi."},
        {word:"HAVOLA",  startCol:0, clue:"Boshqa sahifaga o'tish uchun matn yoki elementga biriktirilgan manzil."},
        {word:"MENU",    startCol:3, clue:"Sahifada bir nechta bo'limga o'tish uchun tugmalar ro'yxati."},
        {word:"FORMA",   startCol:1, clue:"Foydalanuvchidan ma'lumot yig'ish uchun ishlatiladigan HTML qismi."},
        {word:"VIDEO",   startCol:1, clue:"HTML da ko'rsatiladigan harakatlanuvchi tasvir fayli."},
        {word:"INPUT",   startCol:3, clue:"Foydalanuvchi ma'lumot kiritadigan HTML elementi."},
        {word:"ATRIBUT", startCol:3, clue:"HTML elementiga qo'shimcha xususiyat beruvchi yozuv (masalan class, id)."},
      ],
    },
    {
      keyword: "BRAUZER",
      keyCol: 4,
      words: [
        {word:"BLOK",   startCol:4, clue:"Butun qatorni egallaydigan HTML element turi (masalan div)."},
        {word:"FORMA",  startCol:2, clue:"Foydalanuvchidan ma'lumot yig'ish uchun ishlatiladigan HTML qismi."},
        {word:"RASM",   startCol:3, clue:"HTMLda <img> tegi bilan qo'shiladigan tasvir."},
        {word:"MENU",   startCol:1, clue:"Sahifada bir nechta bo'limga o'tish uchun tugmalar ro'yxati."},
        {word:"TIZIM",  startCol:2, clue:"HTML sahifa qurilishi asosidagi umumiy tuzilma."},
        {word:"VIDEO",  startCol:1, clue:"HTML da ko'rsatiladigan harakatlanuvchi tasvir fayli."},
        {word:"SERVER", startCol:2, clue:"Veb-sahifani foydalanuvchiga yetkazib beruvchi kuchli kompyuter."},
      ],
    },
  ],
  css: [
    {
      keyword: "SELEKTOR",
      keyCol: 4,
      words: [
        {word:"STIL",   startCol:4, clue:"Elementning tashqi ko'rinishini belgilaydigan qoidalar (CSS)."},
        {word:"FLEX",   startCol:2, clue:"Elementlarni qator yoki ustun bo'ylab tekis joylashtiruvchi CSS taxlik usuli."},
        {word:"CLASS",  startCol:3, clue:"CSS da nuqta (.) belgisi bilan boshlanadigan selektor turi."},
        {word:"BORDER", startCol:0, clue:"Elementning atrofidagi chegara chizig'i uchun CSS xususiyati."},
        {word:"PIKSEL", startCol:2, clue:"Ekrandagi eng kichik o'lchov birligi (masalan, 16px)."},
        {word:"FONT",   startCol:1, clue:"Matn shrifti bilan bog'liq CSS xususiyatlari guruhi."},
        {word:"FON",    startCol:3, clue:"Elementning orqa foni uchun ishlatiladigan CSS xususiyati (background)."},
        {word:"RANG",   startCol:4, clue:"Matn yoki fonning rangini belgilash uchun CSS xususiyati (color)."},
      ],
    },
    {
      keyword: "GRADIENT",
      keyCol: 4,
      words: [
        {word:"RANG",   startCol:1, clue:"Matn yoki fonning rangini belgilash uchun CSS xususiyati (color)."},
        {word:"BORDER", startCol:2, clue:"Elementning atrofidagi chegara chizig'i uchun CSS xususiyati."},
        {word:"CLASS",  startCol:2, clue:"CSS da nuqta (.) belgisi bilan boshlanadigan selektor turi."},
        {word:"GRID",   startCol:1, clue:"Elementlarni qator va ustunlarga bo'lib joylashtiruvchi CSS taxlik usuli."},
        {word:"PIKSEL", startCol:3, clue:"Ekrandagi eng kichik o'lchov birligi."},
        {word:"FLEX",   startCol:2, clue:"Elementlarni tekis joylashtiruvchi CSS taxlik usuli."},
        {word:"FON",    startCol:2, clue:"Elementning orqa foni uchun ishlatiladigan CSS xususiyati."},
        {word:"FONT",   startCol:1, clue:"Matn shrifti bilan bog'liq CSS xususiyatlari guruhi."},
      ],
    },
  ],
  js: [
    {
      keyword: "FUNKSIYA",
      keyCol: 4,
      words: [
        {word:"FOR",      startCol:4, clue:"Ma'lumotlar to'plami bo'ylab necha marta takrorlanishni biladigan tsikl turi."},
        {word:"NULL",     startCol:3, clue:"Qiymat yo'qligini bildiruvchi maxsus JavaScript qiymati."},
        {word:"KONSOL",   startCol:2, clue:"Brauzerda dastur natijalarini chiqarish uchun ishlatiladigan panel."},
        {word:"KALIT",    startCol:4, clue:"Obyekt ichidagi qiymatga mos keluvchi nom (key)."},
        {word:"SATR",     startCol:4, clue:"Matn ma'lumot turi (masalan, so'zlar va harflar ketma-ketligi)."},
        {word:"MASSIV",   startCol:0, clue:"Bir nechta qiymatni tartib bilan saqlaydigan JavaScript tuzilmasi."},
        {word:"QIYMAT",   startCol:2, clue:"O'zgaruvchida saqlanadigan narsa (masalan, x = 5 dagi 5)."},
        {word:"ARGUMENT", startCol:4, clue:"Funksiyaga uzatiladigan qiymat (parametr sifatida)."},
      ],
    },
    {
      keyword: "OBYEKT",
      keyCol: 4,
      words: [
        {word:"FOR",     startCol:3, clue:"Ma'lumotlar to'plami bo'ylab necha marta takrorlanishni biladigan tsikl turi."},
        {word:"BRAUZER", startCol:4, clue:"Internet sahifalarini ko'rish va JavaScript kodini bajaradigan dastur."},
        {word:"QIYMAT",  startCol:2, clue:"O'zgaruvchida saqlanadigan narsa."},
        {word:"METOD",   startCol:3, clue:"Obyektga bog'langan funksiya (method)."},
        {word:"KALIT",   startCol:4, clue:"Obyekt ichidagi qiymatga mos keluvchi nom (key)."},
        {word:"SATR",    startCol:2, clue:"Matn ma'lumot turi."},
      ],
    },
  ],
  react: [
    {
      keyword: "KOMPONENT",
      keyCol: 4,
      words: [
        {word:"KOD",      startCol:4, clue:"React elementlarini yaratish uchun yoziladigan dastur matni."},
        {word:"PROP",     startCol:2, clue:"Komponentga tashqaridan uzatiladigan ma'lumot (property)."},
        {word:"MASSIV",   startCol:4, clue:"Ro'yxat ko'rinishidagi ma'lumotlar to'plami, ko'pincha .map() bilan aylantiriladi."},
        {word:"APP",      startCol:3, clue:"Butun React dasturining bosh (asosiy) komponenti odatda shu nom bilan ataladi."},
        {word:"HOLAT",    startCol:3, clue:"Komponent ichida o'zgaruvchi ma'lumotni saqlash usuli (state)."},
        {word:"EKRAN",    startCol:0, clue:"Foydalanuvchi interfeysi ko'rinadigan qism."},
        {word:"TEG",      startCol:3, clue:"JSX ichida yoziladigan HTML ga o'xshash belgi."},
        {word:"FUNKSIYA", startCol:2, clue:"React komponenti ko'pincha shu turdagi JavaScript qurilmasi sifatida yoziladi."},
        {word:"TUGMA",    startCol:4, clue:"Foydalanuvchi bosadigan interfeys elementi (masalan submit uchun)."},
      ],
    },
    {
      keyword: "ROUTER",
      keyCol: 4,
      words: [
        {word:"PROP",   startCol:3, clue:"Komponentga tashqaridan uzatiladigan ma'lumot."},
        {word:"HOLAT",  startCol:3, clue:"Komponent ichida o'zgaruvchi ma'lumotni saqlash usuli (state)."},
        {word:"MENU",   startCol:1, clue:"Sahifada bir nechta bo'limga o'tish uchun tugmalar ro'yxati."},
        {word:"TUGMA",  startCol:4, clue:"Foydalanuvchi bosadigan interfeys elementi."},
        {word:"EKRAN",  startCol:4, clue:"Foydalanuvchi interfeysi ko'rinadigan qism."},
        {word:"SERVER", startCol:2, clue:"Ma'lumotlarni saqlaydigan va so'rovlarga javob beradigan kuchli kompyuter."},
      ],
    },
  ],
  backend: [
    {
      keyword: "SERVER",
      keyCol: 4,
      words: [
        {word:"SQL",      startCol:4, clue:"Ma'lumotlar bazasi bilan ishlash uchun ishlatiladigan so'rov tili."},
        {word:"ENDPOINT", startCol:4, clue:"API dasturida ma'lum bir so'rovga javob beradigan manzil."},
        {word:"PORT",     startCol:2, clue:"Server bilan tarmoq orqali bog'lanish uchun ishlatiladigan raqamli manzil qismi."},
        {word:"SERVIS",   startCol:1, clue:"Backend tomonda ma'lum vazifani bajaradigan dastur qismi (service)."},
        {word:"KESH",     startCol:3, clue:"Tez-tez so'raladigan ma'lumotlarni vaqtincha saqlab, tezlikni oshiruvchi usul (cache)."},
        {word:"PAROL",    startCol:2, clue:"Foydalanuvchi hisobini himoya qiluvchi maxfiy so'z, backend uni shifrlab saqlaydi."},
      ],
    },
    {
      keyword: "BAZA",
      keyCol: 4,
      words: [
        {word:"OBYEKT", startCol:3, clue:"Dasturlash tilida ma'lumot va funksiyalarni birlashtirgan tuzilma."},
        {word:"API",    startCol:4, clue:"Ikki dastur bir-biri bilan gaplashishi uchun interfeys."},
        {word:"TIZIM",  startCol:2, clue:"Bir nechta qism birgalikda ishlaydigan yaxlit tuzilma."},
        {word:"PAROL",  startCol:3, clue:"Foydalanuvchi hisobini himoya qiluvchi maxfiy so'z."},
      ],
    },
  ],
  flutter: [
    {
      keyword: "VIDJET",
      keyCol: 4,
      words: [
        {word:"VERSIYA",    startCol:4, clue:"Dasturning muayyan chiqarilishi (masalan Flutter 3.0)."},
        {word:"INTERFEYS",  startCol:4, clue:"Foydalanuvchi bilan dastur o'rtasidagi vizual bog'lanish."},
        {word:"DART",       startCol:4, clue:"Flutter dasturlari yoziladigan dasturlash tili."},
        {word:"PROJEKT",    startCol:1, clue:"Boshidan oxirigacha ishlab chiqilayotgan dastur ishi."},
        {word:"EKRAN",      startCol:4, clue:"Foydalanuvchi ilova sahifasini ko'radigan joy."},
        {word:"TUGMA",      startCol:4, clue:"Bosilganda amal bajaradigan interfeys elementi."},
      ],
    },
    {
      keyword: "MOBIL",
      keyCol: 4,
      words: [
        {word:"MASSIV", startCol:4, clue:"Bir nechta qiymatni tartib bilan saqlaydigan dastur tuzilmasi."},
        {word:"HOLAT",  startCol:3, clue:"Ilova ichida o'zgaruvchi ma'lumotni saqlash usuli (state)."},
        {word:"OBYEKT", startCol:3, clue:"Dastur ichidagi narsa yoki tuzilma (object)."},
        {word:"DIZAYN", startCol:3, clue:"Ilova tashqi ko'rinishini yaratish jarayoni."},
        {word:"FAYL",   startCol:1, clue:"Kompyuterda saqlangan ma'lumot birligi (masalan .dart fayli)."},
      ],
    },
  ],
  matematika: [
    {
      keyword: "FORMULA",
      keyCol: 4,
      words: [
        {word:"FOIZ",      startCol:4, clue:"Butunning yuzdan bir ulushini bildiruvchi son turi (%)."},
        {word:"SON",       startCol:3, clue:"Matematik miqdorni ifodalovchi asosiy tushuncha."},
        {word:"KVADRAT",   startCol:0, clue:"Barcha tomonlari teng bo'lgan to'rtburchak shakli."},
        {word:"SUMMA",     startCol:2, clue:"Ikki yoki undan ortiq sonni qo'shish natijasi."},
        {word:"BURCHAK",   startCol:3, clue:"Ikki nur kesishishidan hosil bo'ladigan geometrik shakl."},
        {word:"TENGLAMA",  startCol:0, clue:"Ikki tomoni teng bo'lgan matematik ifoda (masalan, 2x+3=7)."},
        {word:"AYIRMA",    startCol:4, clue:"Ikki sonni ayirish natijasi."},
      ],
    },
    {
      keyword: "TENGLAMA",
      keyCol: 4,
      words: [
        {word:"TOMON",    startCol:4, clue:"Geometrik shaklning chetki chizig'i (masalan uchburchakning tomoni)."},
        {word:"ELEMENT",  startCol:4, clue:"To'plamga tegishli bo'lgan bitta a'zo."},
        {word:"SON",      startCol:2, clue:"Matematik miqdorni ifodalovchi asosiy tushuncha."},
        {word:"GRAFIK",   startCol:4, clue:"Funksiya qiymatlarini tasvirlaydigan chizma."},
        {word:"ULUSH",    startCol:3, clue:"Butunning bir qismini bildiruvchi son (masalan foiz yoki kasr)."},
        {word:"AYIRMA",   startCol:4, clue:"Ikki sonni ayirish natijasi."},
        {word:"SUMMA",    startCol:2, clue:"Ikki yoki undan ortiq sonni qo'shish natijasi."},
        {word:"KVADRAT",  startCol:2, clue:"Barcha tomonlari teng bo'lgan to'rtburchak shakli."},
      ],
    },
  ],
};
function krossVariants(subject){ return XWORD_BANKS[subject] || XWORD_BANKS.kompsavod; }
// Remembers the last variant shown per subject (in-memory, for this session) so
// picking the same subject again never repeats the same crossword back-to-back —
// it guarantees a change instead of just leaving it to a 50/50 coin flip.
let krossLastVariant = {};
function pickKrossVariantIdx(subject){
  const variants = krossVariants(subject);
  if(variants.length<=1) return 0;
  let idx;
  do{ idx = Math.floor(Math.random()*variants.length); }while(idx===krossLastVariant[subject]);
  krossLastVariant[subject] = idx;
  return idx;
}
function viewXword(){
  const t = L().kross, c = L().common;
  const k = state.kross || {subject:null, category:null, variantIdx:0};
  state.kross = k;
  if(!k.subject){
    const subjT = L().subjects, pickT = L().arqonSetup;
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.chooseSubj)}</h2>
        <p class="lead">${esc(t.pickLead)}</p>
      </div>
      ${subjectPickHtml(k.category, "data-krosssubj", "data-krosscat", "data-krosscatback", subjT, pickT)}
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="foydali">${esc(c.back)}</button></div>
    </div>`;
  }
  const variants = krossVariants(k.subject);
  const bank = variants[k.variantIdx] || variants[0];
  const subjName = L().subjects[k.subject] || "";
  const cluesHtml = bank.words.map((w,i)=>`<li><b>${i+1}.</b> ${esc(w.clue)}</li>`).join("");
  const rowsHtml = bank.words.map((w,i)=>{
    const spacers = Array.from({length:w.startCol}).map(()=>`<div style="width:30px;flex:none"></div>`).join("");
    const keyIdx = bank.keyCol - w.startCol;
    const cells = w.word.split("").map((ch,ci)=>`<input class="xw-cell ${ci===keyIdx?"xw-key":""}" maxlength="1" data-xw="${i}:${ci}" autocomplete="off">`).join("");
    return `<div class="xw-row"><span class="xw-num">${i+1}</span>${spacers}${cells}</div>`;
  }).join("");
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)} · ${esc(subjName)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div style="max-width:560px;margin:0 auto">
      <div id="xwGrid" style="overflow-x:auto;padding-bottom:4px">${rowsHtml}</div>
      <ul class="xw-clues" style="margin-top:18px">${cluesHtml}</ul>
      <div style="text-align:center">
        <button class="btn btn-brand btn-lg" id="xwCheckBtn">${icon("checkCircle",18)} ${esc(t.checkBtn)}</button>
      </div>
      <div id="xwResult" style="text-align:center;margin-top:16px"></div>
      <div style="text-align:center;margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-outline" id="xwChangeSubjBtn">${esc(t.playAgain)}</button>
        <button class="btn btn-outline" data-nav="foydali">${esc(t.toList)}</button>
      </div>
    </div>
  </div>`;
}
function wireXword(){
  const k = state.kross || {};
  if(!k.subject){
    document.querySelectorAll("[data-krosssubj]").forEach(b=>b.addEventListener("click", ()=>{
      const subj = b.dataset.krosssubj;
      state.kross = {...(state.kross||{}), subject:subj, variantIdx: pickKrossVariantIdx(subj)};
      render();
    }));
    document.querySelectorAll("[data-krosscat]").forEach(b=>b.addEventListener("click", ()=>{ state.kross = {...(state.kross||{}), category:b.dataset.krosscat}; render(); }));
    document.querySelectorAll("[data-krosscatback]").forEach(b=>b.addEventListener("click", ()=>{ state.kross.category=null; render(); }));
    return;
  }
  document.querySelectorAll("[data-xw]").forEach(inp=>{
    inp.addEventListener("input", ()=>{
      inp.value = inp.value.slice(-1).toUpperCase();
      inp.classList.remove("xw-ok","xw-bad");
      if(inp.value){
        const [ri,ci] = inp.dataset.xw.split(":").map(Number);
        const next = document.querySelector(`[data-xw="${ri}:${ci+1}"]`);
        if(next) next.focus();
      }
    });
    inp.addEventListener("keydown", (e)=>{
      if(e.key==="Backspace" && !inp.value){
        const [ri,ci] = inp.dataset.xw.split(":").map(Number);
        const prev = document.querySelector(`[data-xw="${ri}:${ci-1}"]`);
        if(prev) prev.focus();
      }
    });
  });
  const checkBtn = document.getElementById("xwCheckBtn");
  if(checkBtn) checkBtn.addEventListener("click", checkXword);
  const changeBtn = document.getElementById("xwChangeSubjBtn");
  if(changeBtn) changeBtn.addEventListener("click", ()=>{ state.kross = {subject:null, category:null}; render(); });
}
function checkXword(){
  const k = state.kross || {};
  const variants = krossVariants(k.subject);
  const bank = variants[k.variantIdx] || variants[0];
  let correct = 0;
  bank.words.forEach((w,i)=>{
    let wordOk = true;
    w.word.split("").forEach((ch,ci)=>{
      const inp = document.querySelector(`[data-xw="${i}:${ci}"]`);
      const ok = !!inp && inp.value.toUpperCase()===ch;
      if(inp){ inp.classList.toggle("xw-ok", ok); inp.classList.toggle("xw-bad", !ok); }
      if(!ok) wordOk = false;
    });
    if(wordOk) correct++;
  });
  const t = L().kross;
  const resEl = document.getElementById("xwResult");
  if(!resEl) return;
  const allOk = correct === bank.words.length;
  if(allOk){
    playVictoryJingle(false);
    resEl.innerHTML = `<b style="color:var(--ok)">${esc(t.resultAll)}</b><br><span class="mono" style="color:var(--edu)">${esc(t.keyword(bank.keyword))}</span>`;
  } else {
    resEl.innerHTML = `<b>${esc(t.resultPartial(correct))}</b>`;
  }
}

/* ===================== ROUND QUIZ ENGINE (Kod detektivi / Rost-Yolg'on / Code Quiz) ===================== */
// Shared engine: 10 shuffled rounds, immediate per-answer feedback + a short
// explanation, then a win/lose result screen (win at >=70% correct, matching
// the same threshold used by Dizaynni takrorla).
let rqState = null;

// Content is split per subject (html/css/js/react/backend) so the player can pick a
// topic first; rqBank(kind) reads the currently-chosen subject out of state.rq[kind].
const RQ_SUBJECTS = ["html","css","js","react","backend"];

const CODE_DETECTIVE_BANKS = {
  js: [
    {code:`function sum(a, b) {\n  return a - b;\n}`,
     opts:["Qo'shish o'rniga ayirish amali ishlatilgan","Funksiya nomi noto'g'ri","Parametrlar soni noto'g'ri","return so'zi kerak emas"], correct:0,
     explain:"Funksiya 'sum' (yig'indi) deb nomlangan, lekin ichida qo'shish (+) o'rniga ayirish (-) amali ishlatilgan."},
    {code:`let arr = [1, 2, 3];\nconsole.log(arr[3]);`,
     opts:["console.log ishlamaydi","Massiv indekslari 0 dan boshlanadi, arr[3] mavjud emas (undefined qaytaradi)","Massivda faqat 2ta element bo'lishi kerak","let o'rniga var kerak"], correct:1,
     explain:"Massiv indekslari 0 dan boshlanadi: arr[0]=1, arr[1]=2, arr[2]=3. arr[3] mavjud emas, shuning uchun undefined qaytaradi."},
    {code:`if (x = 5) {\n  console.log("besh");\n}`,
     opts:["console.log noto'g'ri yozilgan","if operatoridan keyin nuqtali vergul kerak","Solishtirish (==) o'rniga tenglashtirish (=) ishlatilgan","x o'zgaruvchisi e'lon qilinmagan"], correct:2,
     explain:"if ichida bitta '=' qiymat beradi (tenglashtirish), solishtirish uchun '==' yoki '===' kerak edi."},
    {code:`function greet(name) {\n  console.log("Salom, " + nam);\n}`,
     opts:["console.log noto'g'ri", "Parametr nomi 'name', lekin kod ichida 'nam' deb yozilgan","+ belgisi kerak emas","function so'zi noto'g'ri yozilgan"], correct:1,
     explain:"Parametr 'name' deb e'lon qilingan, lekin funksiya ichida xato bilan 'nam' deb yozilgan — bunday o'zgaruvchi mavjud emas."},
    {code:`let total = 0;\nfor (let i = 1; i < 5; i++) {\n  total = i;\n}\nconsole.log(total);`,
     opts:["i < 5 o'rniga i <= 5 bo'lishi kerak","total 0 dan emas, 1 dan boshlanishi kerak","total = i o'rniga total += i bo'lishi kerak edi","console.log ichida total yo'q"], correct:2,
     explain:"'total = i' har safar eskisini o'chirib, faqat oxirgi qiymatni qoldiradi. Yig'indi hisoblash uchun 'total += i' kerak edi."},
    {code:`function isEven(n) {\n  if (n % 2 = 0) {\n    return true;\n  }\n  return false;\n}`,
     opts:["return true noto'g'ri","function nomi xato","n % 2 = 0 o'rniga n % 2 === 0 bo'lishi kerak","% belgisi ishlatilmaydi"], correct:2,
     explain:"Solishtirish uchun '=' emas, '===' (yoki '==') ishlatilishi kerak. 'n % 2 = 0' sintaksis xatoga olib keladi."},
    {code:`const numbers = [5, 3, 8, 1];\nnumbers = [1, 2, 3];`,
     opts:["Massiv uzunligi noto'g'ri","'const' o'zgaruvchisiga qayta qiymat berib bo'lmaydi","numbers nomi band","= belgisi kerak emas"], correct:1,
     explain:"'const' bilan e'lon qilingan o'zgaruvchiga yangi qiymat butunlay qayta berib bo'lmaydi — bu xato chiqaradi."},
    {code:`function multiply(a, b) {\n  return a * b;\n}\nconsole.log(multiply(4));`,
     opts:["4 qaytadi","Xato chiqadi va dastur to'xtaydi","0 qaytadi","NaN qaytadi, chunki 'b' argumenti berilmagan (undefined * 4)"], correct:3,
     explain:"multiply(4) chaqirilganda 'b' parametriga qiymat berilmagan, u undefined bo'ladi. undefined * 4 = NaN (son emas)."},
    {code:`let arr = [10, 20, 30];\nfor (let i = 0; i <= arr.length; i++) {\n  console.log(arr[i]);\n}`,
     opts:["'let' o'rniga 'var' kerak","Shart 'i < arr.length' bo'lishi kerak, 'i <=' emas","console.log ishlamaydi","arr massivi noto'g'ri yozilgan"], correct:1,
     explain:"Massiv uzunligi 3 bo'lsa, oxirgi indeks 2. 'i <= arr.length' shartida i qiymati 3 gacha yetadi va arr[3] undefined bo'ladi."},
    {code:`function square(n) {\n  n * n;\n}\nconsole.log(square(4));`,
     opts:["16 chiqadi","'return' so'zi yo'q — natija undefined bo'ladi","n parametri xato","console.log ishlamaydi"], correct:1,
     explain:"Funksiya hisoblagan qiymatni qaytarish uchun 'return' so'zi kerak. U yo'q bo'lsa, funksiya avtomatik ravishda undefined qaytaradi."},
    {code:`let age = "18";\nif (age === 18) {\n  console.log("Voyaga yetgan");\n}`,
     opts:["age satr, 18 esa son — '===' ularni teng demaydi","if operatori xato yozilgan","age o'zgaruvchisi e'lon qilinmagan","console.log ishlamaydi"], correct:0,
     explain:"age satr turida (\"18\"), 18 esa son turida. '===' turlarni ham solishtiradi, shuning uchun ular teng emas va shart hech qachon bajarilmaydi."},
    {code:`for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// natija: 0, 1, 2 kutilgan edi`,
     opts:["'var' emas, 'let' ishlatilishi kerak edi","setTimeout noto'g'ri ishlatilgan","console.log xato","Sikl shartida xato bor"], correct:0,
     explain:"'var' funksiya darajasida umumiy, shuning uchun barcha setTimeout chaqiruvlari bitta umumiy 'i'ni ko'radi va sikl tugagach uning oxirgi qiymati (3) chop etiladi. 'let' har bir iteratsiya uchun alohida nusxa yaratadi."},
    {code:`let obj = {name: "Ali"};\nconsole.log(obj.Name);`,
     opts:["obj.Name — \"Ali\" qiymatini qaytaradi","'Name' va 'name' — turli xossalar (harf katta-kichikligi farqlanadi)","obj noto'g'ri e'lon qilingan","console.log xato ishlatilgan"], correct:1,
     explain:"JavaScript katta-kichik harfga sezgir (case-sensitive): obyektda 'name' xossasi bor, 'Name' esa mavjud emas — shuning uchun undefined qaytadi."},
    {code:`let i = 0;\nwhile (i < 5) {\n  console.log(i);\n}`,
     opts:["Sikl 5 marta ishlab to'xtaydi","'i' hech qachon oshirilmagan (i++ yo'q)","while sintaksisi noto'g'ri","console.log ichida xato bor"], correct:1,
     explain:"Sikl ichida 'i' qiymati hech qachon o'zgartirilmagan — shart doim 'true' bo'lib qoladi va sikl to'xtamay cheksiz aylanadi (infinite loop)."},
    {code:`let arr = [1, 2, 3];\nlet doubled = arr.forEach(n => n * 2);\nconsole.log(doubled);`,
     opts:["[2, 4, 6] chiqadi","'map' kerak edi, 'forEach' emas","arr massivi noto'g'ri","n * 2 hisoblanmaydi"], correct:1,
     explain:"'forEach' har bir elementni aylanib chiqadi, lekin har doim undefined qaytaradi. Yangi o'zgartirilgan massiv olish uchun 'map()' ishlatilishi kerak edi."},
    {code:`console.log(0.1 + 0.2 === 0.3);`,
     opts:["Ha, albatta true bo'ladi","Yo'q, kasr sonlar aniq emas — false","Xato chiqadi","NaN chiqadi"], correct:1,
     explain:"Kompyuterda kasr sonlar aniq saqlanmaydi (floating point), shuning uchun 0.1+0.2 aslida 0.30000000000000004 bo'lib, 0.3'ga teng emas."},
    {code:`console.log([10, 1, 2].sort());`,
     opts:["To'g'ri, [1, 2, 10] chiqadi","Yo'q, matn tartibida: [1, 10, 2] chiqadi","Xato chiqadi","O'zgarishsiz qoladi"], correct:1,
     explain:"Standart sort() elementlarni SATR sifatida solishtiradi, son sifatida emas — shuning uchun \"10\" \"2\"dan oldin keladi: [1, 10, 2]."},
    {code:`let s = "salom";\ns[0] = "S";\nconsole.log(s);`,
     opts:["\"Salom\" bo'lib chiqadi","Satrlar immutable — \"salom\" o'zgarmaydi","TypeError chiqadi","s butunlay o'zgaradi"], correct:1,
     explain:"JavaScript'da satrlar (string) o'zgarmas (immutable) — s[0] ga qiymat berish hech narsa qilmaydi, s hali ham \"salom\" bo'lib qoladi."},
    {code:`let arr = [1, 2, 2, 3];\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === 2) arr.splice(i, 1);\n}\nconsole.log(arr);`,
     opts:["[1, 3] chiqadi (ikkalasi ham o'chadi)","Bitta '2' o'chmay qoladi: [1, 2, 3] chiqadi","TypeError chiqadi","Cheksiz sikl bo'lib qoladi"], correct:1,
     explain:"Bir elementni splice() bilan o'chirganda qolgan elementlar chapga suriladi, lekin 'i' baribir oshiriladi — shu sabab keyingi element (ikkinchi '2') tekshirilmay qoladi."},
    {code:`let arr = [1, 2, 3];\nconsole.log(typeof arr);`,
     opts:["\"array\" chiqadi","typeof massiv uchun ham \"object\" beradi","SyntaxError chiqadi","\"list\" chiqadi"], correct:1,
     explain:"JavaScript'da massivlar maxsus turdagi obyekt hisoblanadi, shuning uchun typeof ularga ham \"object\" qaytaradi, \"array\" emas (buning uchun Array.isArray() kerak)."},
  ],
  html: [
    {code:`<img src="rasm.png">`,
     opts:["alt atributi yo'q","width atributi shart","img o'rniga picture kerak","src qiymati noto'g'ri"], correct:0,
     explain:"Rasm ko'rinmasa yoki ekran o'quvchilar uchun tasvirni tushuntirish kerak bo'lsa, 'alt' atributi bo'lishi shart."},
    {code:`<ul>\n  <p>Element 1</p>\n  <p>Element 2</p>\n</ul>`,
     opts:["<ul> ichida <p> emas, <li> ishlatilishi kerak","<ul> teg nomi noto'g'ri","Elementlar soni noto'g'ri","<p> teglari kerak emas"], correct:0,
     explain:"<ul> (ro'yxat) ichidagi har bir band <li> tegi bilan yozilishi kerak, <p> emas."},
    {code:`<a herf="https://example.com">Havola</a>`,
     opts:["Havola matni noto'g'ri","'herf' xato yozilgan, to'g'risi 'href'","https:// kerak emas","<a> tegi noto'g'ri"], correct:1,
     explain:"Atribut nomida xato bor — to'g'ri yozilishi 'href' bo'lishi kerak, 'herf' brauzer uchun tanish emas."},
    {code:`<div id="box">1</div>\n<div id="box">2</div>`,
     opts:["<div> teglari noto'g'ri","Ikkala elementga bir xil id=\"box\" berilgan","Matn ichida xato bor","id atributi kerak emas"], correct:1,
     explain:"'id' atributi butun sahifada faqat bitta elementga tegishli bo'lishi kerak — takrorlanishi mumkin emas."},
    {code:`<h1>Sarlavha</h1>\n<h3>Kichik sarlavha</h3>\n<h2>Boshqa qism</h2>`,
     opts:["Sarlavha darajalari tartibsiz — h3'dan keyin h2 qaytilgan","h1 faqat bitta bo'lishi shart emas","<h3> ishlatib bo'lmaydi","Sarlavhalar soni noto'g'ri"], correct:0,
     explain:"Sarlavha darajalari ketma-ket bo'lishi tavsiya etiladi (h1, keyin h2, ...); h3'dan keyin h2'ga qaytish tuzilma tartibini buzadi."},
    {code:`<form>\n  <input type="text">\n  <button onclick="ishla()">Hisobla</button>\n</form>`,
     opts:["input'ga name kerak emas","type=\"button\" ko'rsatilmagan","onclick ishlamaydi","<form> kerak emas"], correct:1,
     explain:"Forma ichidagi <button> standart holatda type=\"submit\" hisoblanadi; faqat funksiya chaqirish kerak bo'lsa, type=\"button\" belgilanishi kerak edi."},
    {code:`<a href="https://example.com"><a href="https://test.com">Havola</a></a>`,
     opts:["href qiymatlari noto'g'ri","<a> tegini boshqa <a> teg ichiga joylashtirib bo'lmaydi","Matn yo'q","https:// shart emas"], correct:1,
     explain:"<a> elementlarini bir-birining ichiga joylashtirish (nested link) HTML qoidalariga zid — brauzer buni noto'g'ri tuzilma sifatida qayta tuzadi."},
    {code:`<table>\n  <tr>\n    Ism\n  </tr>\n</table>`,
     opts:["<table> tegi kerak emas","Qator (<tr>) ichidagi matn <td> yoki <th> tegisiz yozilgan","<tr> tegi xato","Jadval bo'sh bo'lishi kerak"], correct:1,
     explain:"Jadval qatori (<tr>) ichidagi har bir katak <td> (yoki sarlavha uchun <th>) tegi bilan o'ralishi kerak, oddiy matn emas."},
    {code:`<ul>\n  <li>Bitta\n  <li>Ikki</li>\n</ul>`,
     opts:["<ul> ichida faqat ikkita element bo'lishi mumkin","Birinchi <li> yopilmagan (</li> yo'q)","<ul> nomi xato","Matnlar joyi almashtirilgan"], correct:1,
     explain:"Har bir <li> o'zining yopuvchi </li> tegiga ega bo'lishi kerak; ba'zi brauzerlar buni avtomatik tuzatsa-da, bu to'g'ri yozilish emas."},
    {code:`<label for="ismInput">Ism:</label>\n<input id="ism" type="text">`,
     opts:["<label> tegi kerak emas","'for' va input'ning 'id'si mos kelmaydi","input turi noto'g'ri","Matn xato"], correct:1,
     explain:"<label>'ning 'for' atributi input'ning 'id'siga aynan mos kelishi kerak, aks holda label bosilganda input fokusga tushmaydi."},
    {code:`<html>\n<head><title>Sahifa</title></head>\n<body>Salom</body>\n</html>`,
     opts:["<title> kerak emas","Fayl boshida <!DOCTYPE html> yo'q","<body> tegi noto'g'ri","<head> ichida xato bor"], correct:1,
     explain:"HTML5 hujjati '<!DOCTYPE html>' bilan boshlanishi kerak — bu brauzerga qanday standartda sahifani ko'rsatishni bildiradi."},
    {code:`<input type="email" require>`,
     opts:["type=\"email\" noto'g'ri","'require' xato yozilgan, to'g'risi 'required'","input yopilishi kerak","Atribut umuman kerak emas"], correct:1,
     explain:"Maydonni majburiy qilish uchun atribut nomi 'required', 'require' emas — noto'g'ri yozilgani sababli brauzer uni tanimaydi."},
    {code:`<p>Matn boshi <div>ichki blok</div> matn oxiri</p>`,
     opts:["<div> <p> ichiga joylashtirilgan — bu noto'g'ri","<p> tegi umuman kerak emas","Matn tartibi noto'g'ri","div class nomi yo'q"], correct:0,
     explain:"<div> kabi blok elementlarni <p> (xatboshi) ichiga joylashtirib bo'lmaydi — brauzer buni ko'rganda <p>ni avtomatik yopib, tuzilmani o'zgartirib qo'yadi."},
    {code:`<div class="wrapper">\n  <div class="inner">Matn</div>\n<!-- wrapper shu yerda yopilishi kerak edi -->`,
     opts:["'wrapper' klassi noto'g'ri yozilgan","Tashqi <div class=\"wrapper\"> uchun yopuvchi </div> yo'q","Ichki <div> ortiqcha","Izoh (comment) noto'g'ri yozilgan"], correct:1,
     explain:"Har bir ochilgan <div> o'zining yopuvchi </div> tegiga ega bo'lishi kerak — bu yerda tashqi 'wrapper' divi yopilmagan."},
    {code:`<script src="app.js" />`,
     opts:["<script> tegini o'z-o'zidan yopib (self-close) bo'lmaydi, alohida <\/script> kerak","src atributi noto'g'ri","app.js fayli xato nomlangan","<script> <head> ichida bo'lishi shart"], correct:0,
     explain:"HTML'da <script> elementi har doim alohida yopuvchi tegga ega bo'lishi kerak: <script src=\"app.js\"><\/script>. Uni <img> kabi o'z-o'zidan yopib bo'lmaydi."},
    {code:`<input type="text"></input>`,
     opts:["To'g'ri va standart yozilgan","<input> bo'sh (void) element, yopuvchi teg kerak emas","type atributi noto'g'ri","Hech qanday muammo yo'q"], correct:1,
     explain:"<input> \"bo'sh\" (void) element hisoblanadi — uning yopuvchi tegi umuman bo'lmaydi, </input> yozish noto'g'ri."},
    {code:`<label>Ism</label>\n<input type="text">`,
     opts:["To'g'ri bog'langan","<label> input bilan bog'lanmagan", "input turi xato","label matni yo'q"], correct:1,
     explain:"<label> va <input> bir-biriga bog'lanishi uchun 'for' (label) va 'id' (input) atributlari mos kelishi yoki input label ichiga olinishi kerak — bu yerda ikkalasi ham yo'q."},
    {code:`<a>Bosing</a>`,
     opts:["Oddiy havola sifatida ishlaydi","href yo'q — bu haqiqiy havola emas","Matn xato","<a> tegi noto'g'ri"], correct:1,
     explain:"href atributi bo'lmasa, <a> hech qayerga olib bormaydigan oddiy matnga aylanadi — u brauzerda havoladek bosilmaydi."},
    {code:`<input type="radio"> Ha\n<input type="radio"> Yo'q`,
     opts:["Ikkalasi alohida tanlanadi (to'g'ri)","'name' yo'q — ikkalasi bir vaqtda tanlanadi","input turi xato","Matnlar joyi xato"], correct:1,
     explain:"Radio tugmalar bir guruhda ishlashi (faqat bittasi tanlanishi) uchun bir xil 'name' atributiga ega bo'lishi kerak — bu yerda 'name' yo'q, shuning uchun ikkalasi ham mustaqil belgilanadi."},
    {code:`<!- Bu izoh ->`,
     opts:["To'g'ri izoh yozilgan","Izoh sintaksisi xato — <!-- va --> kerak","Izoh kerak emas","Matn xato"], correct:1,
     explain:"HTML izohi '<!--' bilan boshlanib '-->' bilan tugashi kerak (ikkitadan chiziqcha) — bu yerda bittadan chiziqcha yozilgan, sintaksis noto'g'ri."},
  ],
  css: [
    {code:`.btn {\n  color: red;\n  bacground-color: blue;\n}`,
     opts:["color qiymati noto'g'ri","'bacground-color' xato, to'g'risi 'background-color'","nuqtali vergul kerak emas",".btn klassi noto'g'ri"], correct:1,
     explain:"'bacground-color' so'zida xato bor — to'g'ri yozilishi 'background-color' bo'lishi kerak, aks holda brauzer bu qatorni tushunmaydi."},
    {code:`.box {\n  width: 100px\n  height: 50px;\n}`,
     opts:["'width: 100px' dan keyin nuqtali vergul (;) yo'q","height qiymati noto'g'ri","'.box' nomi noto'g'ri","px o'lchov birligi kerak emas"], correct:0,
     explain:"'width: 100px' qatoridan keyin nuqtali vergul yo'q — bu keyingi qoidani ham buzib qo'yishi mumkin."},
    {code:`.title {\n  font-size: 20;\n}`,
     opts:["'font-size' xossasi mavjud emas",".title klassi xato","'20' songa o'lchov birligi (masalan px) yetishmaydi","Qavslar noto'g'ri"], correct:2,
     explain:"CSS'da (0 dan tashqari) son qiymatlarga o'lchov birligi kerak — to'g'risi 'font-size: 20px;' bo'lishi kerak edi."},
    {code:`p {\n  colour: red;\n}`,
     opts:["'colour' xato yozilgan, to'g'risi 'color'","'red' rangi mavjud emas","<p> tegiga stil berib bo'lmaydi","Qavslar noto'g'ri"], correct:0,
     explain:"CSS'da xossa nomi 'color' (Amerika yozuvi), 'colour' emas — brauzer bu xossani tanimaydi."},
    {code:`.card > .title {\n  font-weight bold;\n}`,
     opts:["'>' belgisi noto'g'ri ishlatilgan","'font-weight' bilan 'bold' orasida ':' (ikki nuqta) yo'q","'.title' klassi noto'g'ri","'bold' so'zi mavjud emas"], correct:1,
     explain:"Xossa va qiymat orasida ':' bo'lishi kerak — to'g'risi 'font-weight: bold;' bo'lishi kerak edi."},
    {code:`.text {\n  font-style: italics;\n}`,
     opts:["'font-style' xossasi mavjud emas","To'g'ri qiymat 'italic', 'italics' emas","'.text' nomi noto'g'ri","Nuqtali vergul kerak emas"], correct:1,
     explain:"CSS'dagi to'g'ri qiymat 'italic' (oxirida 's' yo'q) — 'italics' brauzer tomonidan tanilmaydi."},
    {code:`.card, .box {\n  margin: 10;\n}`,
     opts:["Selektorlar vergul bilan ajratilmasligi kerak","'10' songa o'lchov birligi yetishmaydi (masalan 10px)","'.card' nomi noto'g'ri","margin xossasi mavjud emas"], correct:1,
     explain:"CSS'da 0 dan boshqa sonli qiymatlarga o'lchov birligi kerak — to'g'risi 'margin: 10px;' bo'lishi kerak edi."},
    {code:`.btn.hover {\n  background: green;\n}`,
     opts:["'.hover' emas, ':hover' bo'lishi kerak edi","'.btn' klassi noto'g'ri","'background' xossasi xato","Ranglar mavjud emas"], correct:0,
     explain:"Sichqoncha ustiga kelganda stil berish uchun ':hover' psevdo-klassi ishlatiladi, '.hover' oddiy klass sifatida hech qachon avtomatik yoqilmaydi."},
    {code:`.row {\n  display: flexbox;\n}`,
     opts:["To'g'ri qiymat 'flex', 'flexbox' emas","'.row' klassi noto'g'ri","display xossasi mavjud emas","Qavslar noto'g'ri"], correct:0,
     explain:"CSS'da flexbox tartibini yoqish uchun qiymat 'flex' deb yoziladi, 'flexbox' emas — brauzer bu qiymatni tanimaydi."},
    {code:`box {\n  border: 1px solid black;\n}\n/* HTML: <div class="box">...</div> */`,
     opts:["'box' oldiga nuqta (.box) kerak edi","border xossasi noto'g'ri","'solid' so'zi xato","1px o'lchovi noto'g'ri"], correct:0,
     explain:"Klass bo'yicha tanlash uchun selektor oldida nuqta bo'lishi kerak: '.box', aks holda brauzer 'box' nomli tegni qidiradi (bunday teg yo'q)."},
    {code:`.title {\n  color: #12345;\n}`,
     opts:["Hex kod uzunligi noto'g'ri (3 yoki 6 belgi kerak)","'.title' nomi xato","color xossasi mavjud emas","# belgisi kerak emas"], correct:0,
     explain:"Hex rang kodlari 3 yoki 6 ta belgidan iborat bo'lishi kerak (masalan #123 yoki #112233); '#12345' (5 ta belgi) noto'g'ri format."},
    {code:`.box {\n  z-index: 10;\n}`,
     opts:["'z-index' xossasi mavjud emas","'position' belgilanmagan, shuning uchun 'z-index' ishlamaydi","10 qiymati noto'g'ri","z-index faqat rasm uchun ishlaydi"], correct:1,
     explain:"'z-index' faqat 'position' xossasi 'static'dan boshqa qiymatga (relative, absolute, fixed, sticky) ega bo'lgan elementlarda ishlaydi — position berilmasa, z-index e'tiborga olinmaydi."},
    {code:`.box {\n  transition: all 2;\n}`,
     opts:["'2' songa vaqt o'lchov birligi (masalan 2s) yetishmaydi","'transition' xossasi mavjud emas","'all' so'zi noto'g'ri","Qavslar kerak"], correct:0,
     explain:"transition davomiyligiga vaqt o'lchov birligi kerak — to'g'risi 'transition: all 2s;' (yoki 2000ms) bo'lishi kerak edi."},
    {code:`.card.title {\n  font-weight: bold;\n}\n/* Maqsad: .card ICHIDAGI .title elementlariga stil berish */`,
     opts:["Orasiga bo'shliq kerak edi: '.card .title', '.card.title' emas","font-weight qiymati noto'g'ri","'.card' klassi mavjud emas","Izoh sintaksisi CSS uchun noto'g'ri"], correct:0,
     explain:"'.card.title' (bo'shliqsiz) ham 'card', ham 'title' klassiga ega BITTA elementni bildiradi. '.card' ICHIDAGI '.title' elementini tanlash uchun orasida bo'shliq bo'lishi kerak: '.card .title'."},
    {code:`#title {\n  color: blue;\n}\n.title {\n  color: red;\n}`,
     opts:["Matn qizil bo'ladi (keyingi qoida g'olib)","Matn ko'k bo'ladi — id selektori class'dan kuchliroq","Xato beradi","Rang umuman qo'llanmaydi"], correct:1,
     explain:"CSS'da selektor ustunligi (specificity) yozilish tartibidan muhimroq — 'id' selektori 'class' selektoridan har doim kuchliroq, shuning uchun keyin yozilgan '.title' qoidasi g'olib chiqolmaydi."},
    {code:`.box {\n  width: calc(100% - 20);\n}`,
     opts:["To'g'ri ishlaydi","calc() ichidagi '20' ga o'lchov birligi yetishmaydi","Foiz noto'g'ri","calc() funksiyasi mavjud emas"], correct:1,
     explain:"calc() ichidagi barcha sonli qiymatlarga (0'dan tashqari) o'lchov birligi kerak — to'g'risi 'calc(100% - 20px)' bo'lishi kerak edi."},
    {code:`.icon::before {\n  width: 16px;\n  height: 16px;\n  background: red;\n}`,
     opts:["To'g'ri ko'rinadi","'content' yo'q — ::before chiqmaydi","width noto'g'ri","background rangi xato"], correct:1,
     explain:"::before (va ::after) psevdo-elementlari faqat 'content' xossasi berilganda (hatto bo'sh \"\" bo'lsa ham) ekranga chiqadi — bu yerda 'content' umuman yo'q."},
    {code:`:root {\n  --main-color: blue;\n}\np {\n  color: var(--maincolor);\n}`,
     opts:["Rang ko'k bo'ladi","O'zgaruvchi nomi mos kelmaydi — ishlamaydi","Xato beradi","CSS o'zgaruvchisi qo'llab-quvvatlanmaydi"], correct:1,
     explain:"E'lon qilingan o'zgaruvchi nomi '--main-color', lekin ishlatilganda '--maincolor' deb yozilgan (chiziqcha yo'q) — bu ikkita turli nom, shuning uchun rang qo'llanmaydi."},
    {code:`.box {\n  width: 100px;\n  min-width: 200px;\n}`,
     opts:["Eni 100px bo'ladi","min-width kattaroq bo'lgani uchun eni 200px bo'ladi","Xato beradi","Eni avtomatik hisoblanadi"], correct:1,
     explain:"'min-width' elementning eng kichik enini belgilaydi — u 'width'dan katta bo'lsa, brauzer 'min-width'ni qo'llaydi, shuning uchun haqiqiy en 200px bo'ladi."},
  ],
  react: [
    {code:`function Welcome() {\n  return <h1>Salom!<h1>;\n}`,
     opts:["Yopilish tegida \"/\" yo'q — </h1> bo'lishi kerak","function nomi noto'g'ri","return so'zi kerak emas","Sarlavha matni xato"], correct:0,
     explain:"Yopilish tegida '/' belgisi yo'q — to'g'risi <h1>Salom!</h1> bo'lishi kerak edi, aks holda JSX xato beradi."},
    {code:`const items = [1, 2, 3];\nitems.map(i => <li>{i}</li>);`,
     opts:["'.map()' massivda ishlamaydi","Ro'yxat elementlariga 'key' atributi berilmagan","<li> o'rniga <p> kerak","{i} noto'g'ri yozilgan"], correct:1,
     explain:"Ro'yxat (list) render qilinganda har bir elementga unikal 'key' atributi berish kerak, aks holda React ogohlantirish beradi."},
    {code:`function App() {\n  const [count, setCount] = useState(0);\n  count = count + 1;\n  return <p>{count}</p>;\n}`,
     opts:["useState noto'g'ri chaqirilgan","'count' to'g'ridan-to'g'ri o'zgartirilgan (setCount kerak edi)","<p> ichida {count} bo'lmasligi kerak","Funksiya nomi xato"], correct:1,
     explain:"State qiymatini to'g'ridan-to'g'ri o'zgartirib bo'lmaydi — 'setCount(count + 1)' orqali yangilanishi kerak edi, aks holda komponent qayta chizilmaydi."},
    {code:`<button onClick="handleClick()">Bos</button>`,
     opts:["JSX'da onClick qiymati satr emas, {handleClick} kabi funksiya bo'lishi kerak","<button> tegi noto'g'ri","Matn 'Bos' xato","onClick kichik harf bilan yozilishi kerak"], correct:0,
     explain:"JSX'da hodisa (event) uchun funksiya {handleClick} ko'rinishida beriladi, oddiy HTML'dagidek satr (\"handleClick()\") emas."},
    {code:`function Card(props) {\n  return <div class="card">{props.title}</div>;\n}`,
     opts:["'props' nomi noto'g'ri","JSX'da 'class' emas, 'className' ishlatilishi kerak","<div> ichida {props.title} bo'lmasligi kerak","Funksiya qiymat qaytarmayapti"], correct:1,
     explain:"JSX'da HTML'dagi 'class' atributi o'rniga 'className' ishlatiladi, chunki 'class' JavaScript'da band so'z."},
    {code:`function App() {\n  return (\n    <h1>Salom</h1>\n    <p>Xush kelibsiz</p>\n  );\n}`,
     opts:["<h1> va <p> ikkalasi ham noto'g'ri yozilgan","Ikkita yonma-yon element bitta o'rovchi element (yoki Fragment) ichiga olinmagan","return so'zidan keyin qavs kerak emas","Matnlar xato"], correct:1,
     explain:"Komponent faqat bitta \"ildiz\" elementni qaytarishi mumkin — ikkita alohida elementni bitta <div> yoki <>...</> fragment ichiga olish kerak edi."},
    {code:`function App({show}) {\n  if (show) {\n    const [n, setN] = useState(0);\n  }\n  return <p>Salom</p>;\n}`,
     opts:["Hook shartli ('if') ichida chaqirilgan","'show' prop noto'g'ri","<p> tegiga xato","Funksiya nomi xato"], correct:0,
     explain:"React hooklari (useState, useEffect va h.k.) har doim komponentning eng yuqori darajasida, shartlar yoki sikllar ichida emas, bir xil tartibda chaqirilishi kerak."},
    {code:`function App(){\n  const [items, setItems] = useState([1,2,3]);\n  function add(){\n    items.push(4);\n  }\n  return <button onClick={add}>{items.length}</button>;\n}`,
     opts:["'push()' state massivini to'g'ridan-to'g'ri o'zgartiradi","useState noto'g'ri chaqirilgan","onClick xato","button tegiga xato"], correct:0,
     explain:"State massivini to'g'ridan-to'g'ri o'zgartirish (push) React'ga o'zgarishni bildirmaydi — yangi massiv yaratib 'setItems' orqali yangilash kerak."},
    {code:`function App(){\n  function handleClick(){ console.log("bosildi"); }\n  return <button onClick={handleClick()}>Bos</button>;\n}`,
     opts:["Qavs bilan yozilgani funksiyani darhol chaqiradi","button tegiga xato","console.log ishlamaydi","Funksiya nomi noto'g'ri"], correct:0,
     explain:"Qavs bilan chaqirilsa (handleClick()), funksiya sahifa yuklanishi bilanoq ishga tushadi. Faqat bosilganda ishlashi uchun funksiya havolasi {handleClick} berilishi kerak."},
    {code:`function welcome() {\n  return <h1>Salom</h1>;\n}\nfunction App(){\n  return <welcome />;\n}`,
     opts:["Komponent nomi kichik harf bilan boshlangan","<h1> xato","App funksiyasi xato","return so'zi kerak emas"], correct:0,
     explain:"React'da o'zingiz yaratgan komponent nomi katta harf bilan boshlanishi shart (masalan 'Welcome'), aks holda React uni oddiy HTML tegi deb hisoblab, xato beradi."},
    {code:`function App(){\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    setCount(count + 1);\n  });\n  return <p>{count}</p>;\n}`,
     opts:["Dependency massivi yo'q — cheksiz qayta render yuz beradi","useState xato","<p> ichida xato","count o'zgaruvchisi e'lon qilinmagan"], correct:0,
     explain:"Dependency massivi ([]) berilmasa, useEffect HAR bir render'dan keyin ishga tushadi; u ichida state o'zgartirilsa, bu cheksiz qayta render tsikliga olib keladi."},
    {code:`function App(){\n  const items = [];\n  return <div>{items.length && <p>Ro'yxat bor</p>}</div>;\n}`,
     opts:["Hech narsa chiqmaydi","'length' 0 bo'lsa, '&&' ekranga \"0\" chiqarib yuboradi","<p> matni har doim chiqadi","Xato beradi"], correct:1,
     explain:"'0' — falsy qiymat, lekin React uni (false yoki null'dan farqli) baribir ekranga chiqaradi. Bo'sh ro'yxatda '&&' 0'ni qaytaradi va sahifada kutilmagan \"0\" ko'rinadi."},
    {code:`function App(){\n  const [text, setText] = useState("");\n  return <input value={text} />;\n}`,
     opts:["'value' bor, lekin 'onChange' yo'q — yozib bo'lmaydi","useState noto'g'ri chaqirilgan","input tegiga xato","value bo'sh bo'lishi mumkin emas"], correct:0,
     explain:"'value' bilan boshqariladigan (controlled) input har doim 'onChange' bilan birga kelishi kerak, aks holda React uning qiymatini doim bir xil ushlab turadi va foydalanuvchi yoza olmaydi."},
    {code:`function App(){\n  const [user, setUser] = useState({name:"Ali", age:20});\n  function updateAge(){\n    setUser({age:21});\n  }\n  return <button onClick={updateAge}>{user.name}, {user.age}</button>;\n}`,
     opts:["State'ni almashtirib, 'name'ni yo'qotadi","useState noto'g'ri","onClick xato","button elementiga xato bor"], correct:0,
     explain:"setUser({age:21}) eski obyektni to'liq YANGI (faqat age'li) obyekt bilan almashtiradi — 'name' xossasi yo'qoladi. Qolgan qiymatlarni saqlash uchun 'setUser({...user, age:21})' kerak edi."},
    {code:`function Card({title}) {\n  return <h3>{Title}</h3>;\n}`,
     opts:["\"title\" matni chiqadi","'Title' aniqlanmagan — xato chiqadi","<h3> tegiga xato","Bo'sh chiqadi"], correct:1,
     explain:"Prop 'title' (kichik harf bilan) destrukturizatsiya qilingan, lekin JSX ichida 'Title' (katta harf bilan) ishlatilgan — bunday o'zgaruvchi mavjud emas, xato chiqadi."},
    {code:`function Empty() {\n}\nfunction App(){\n  return <Empty />;\n}`,
     opts:["Bo'sh <div> chiqadi","Komponent hech narsa qaytarmagan — xato","Sahifa oq bo'lib qoladi","<Empty /> chiqadi"], correct:1,
     explain:"'Empty' funksiyasi hech qanday 'return' ifodasiga ega emas — React komponentlari JSX (yoki null) qaytarishi kerak, aks holda xato beradi."},
    {code:`function App({show}){\n  if (!show) return null;\n  const [n, setN] = useState(0);\n  return <p>{n}</p>;\n}`,
     opts:["Ha, muammosiz ishlayveradi","Erta return'dan keyin hook chaqirilgan","<p> tegiga xato bor","'n' o'zgaruvchisi aniqlanmagan"], correct:1,
     explain:"React hooklari komponentning shartsiz, eng yuqori qismida chaqirilishi kerak. Bu yerda 'useState' shartli 'return'dan KEYIN turibdi — 'show' ga qarab hook chaqirilishi o'zgarib qoladi, bu React qoidalarini buzadi."},
    {code:`const items=["a","b","a"];\nfunction App(){\n  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;\n}`,
     opts:["Hech qanday muammo bo'lmaydi","Ikkita bir xil key bor — ogohlantirish chiqadi","<li> xato","Faqat bitta element chiqadi"], correct:1,
     explain:"Massivda 'a' qiymati ikki marta takrorlangan, shuning uchun ikkita <li> bir xil key=\"a\" oladi — React bunday holatda konsolga ogohlantirish chiqaradi, chunki key'lar unikal bo'lishi kerak."},
    {code:`function App(){\n  const [user, setUser] = useState({name:"Ali"});\n  return <button onClick={() => setUser({name:"Ali"})}>{user === {name:"Ali"} ? "bir xil" : "har xil"}</button>;\n}`,
     opts:["Har doim \"bir xil\" chiqadi","Obyektlar referens bo'yicha solishtiriladi (har xil)","Konsolda xato chiqadi","Tugma umuman ishlamaydi"], correct:1,
     explain:"JavaScript'da obyektlar qiymati emas, XOTIRADAGI MANZILI (referensi) bo'yicha solishtiriladi. Ikkita mazmuni bir xil obyekt ham '===' bilan teng emas — shuning uchun natija doim \"har xil\"."},
  ],
  backend: [
    {code:`app.get('/user', (req, res) => {\n  res.send(user);\n});`,
     opts:["'app.get' noto'g'ri ishlatilgan","'user' o'zgaruvchisi hech qayerda aniqlanmagan/olinmagan","'/user' manzili noto'g'ri","res.send ishlamaydi"], correct:1,
     explain:"'user' o'zgaruvchisi funksiya ichida yoki tashqarida hech qayerda e'lon qilinmagan yoki bazadan olinmagan — bu xatoga olib keladi."},
    {code:`SELECT * FROM users WHERE name = Ali`,
     opts:["'SELECT *' noto'g'ri","'Ali' qiymati qo'shtirnoq ichiga olinmagan","'WHERE' so'zi kerak emas","Jadval nomi xato"], correct:1,
     explain:"SQL'da matn (string) qiymatlar qo'shtirnoq ichida yozilishi kerak — to'g'risi WHERE name = 'Ali' bo'lishi kerak edi."},
    {code:`app.post('/login', (req, res) => {\n  if (req.body.password = correctPassword) {\n    res.send("OK");\n  }\n});`,
     opts:["Solishtirish (===) o'rniga tenglashtirish (=) ishlatilgan","'/login' manzili noto'g'ri","req.body ishlatib bo'lmaydi","res.send xato"], correct:0,
     explain:"if ichida bitta '=' qiymat beradi, solishtirish uchun '===' (yoki '==') kerak edi — hozirgi holida parol har doim \"to'g'ri\" deb hisoblanadi."},
    {code:`app.get('/data', (req, res) => {\n  res.send("Salom");\n  res.send("Xayr");\n});`,
     opts:["res.send ikki marta chaqirilgan (xato)","'/data' manzili noto'g'ri","Matnlar noto'g'ri","app.get ishlatib bo'lmaydi"], correct:0,
     explain:"Bitta so'rovga faqat bitta javob yuborish mumkin — res.send() ikki marta chaqirilishi \"headers already sent\" xatosiga olib keladi."},
    {code:`const data = JSON.parse(response);`,
     opts:["'response' allaqachon obyekt bo'lsa, qayta parse qilish xato beradi","JSON.parse funksiyasi mavjud emas","'data' nomi band so'z","Qavslar noto'g'ri"], correct:0,
     explain:"Agar 'response' allaqachon oddiy matn emas, balki tayyor JS obyekti bo'lsa, uni yana JSON.parse() qilishga urinish xatoga olib keladi."},
    {code:`db.users.insert({ username: "ali", password: req.body.password });`,
     opts:["'username' nomi noto'g'ri","Parol xeshlanmasdan ochiq holda saqlanmoqda","insert() funksiyasi mavjud emas","req.body ishlatib bo'lmaydi"], correct:1,
     explain:"Parollar hech qachon ochiq (plain text) holda bazaga saqlanmasligi kerak — xavfsizlik uchun avval xeshlanishi (masalan bcrypt bilan) shart."},
    {code:`app.get('/ping', (req, res) => {\n  console.log("so'rov keldi");\n});`,
     opts:["res.send() chaqirilmagan","app.get noto'g'ri","'/ping' manzili xato","console.log ishlamaydi"], correct:0,
     explain:"Server har bir so'rovga javob qaytarishi kerak. res.send() (yoki shunga o'xshash) chaqirilmasa, brauzer/klient javobni cheksiz kutib qoladi."},
    {code:`app.get('/user', (req, res) => {\n  const q = "SELECT * FROM users WHERE id = " + req.query.id;\n  db.query(q);\n});`,
     opts:["SQL in'ektsiya (injection) xavfi bor","SELECT so'zi xato","req.query ishlatib bo'lmaydi","db.query funksiyasi mavjud emas"], correct:0,
     explain:"Foydalanuvchi kiritgan ma'lumotni to'g'ridan-to'g'ri SQL matniga qo'shish xavfli — buning o'rniga parametrlangan (parameterized) so'rovlar ishlatilishi kerak."},
    {code:`async function getUser(id) {\n  return db.users.findById(id);\n}\nfunction handler(req, res) {\n  const user = getUser(req.params.id);\n  res.send(user);\n}`,
     opts:["'await' ishlatilmagan — 'user' natija emas, Promise bo'lib qoladi","findById funksiyasi mavjud emas","handler funksiyasi xato","req.params ishlatib bo'lmaydi"], correct:0,
     explain:"async funksiya har doim Promise qaytaradi. Uning natijasini olish uchun 'await getUser(...)' yozilishi kerak edi, aks holda 'user' hali bajarilmagan Promise obyekti bo'lib qoladi."},
    {code:`app.get('/users/:id', handler1);\napp.get('/users/me', handler2);\n// GET /users/me`,
     opts:["':id' marshruti avval turgani uchun 'me'ni o'ziga oladi","handler1 mavjud emas","':id' sintaksisi xato","Ikkala marshrut ham bir xil"], correct:0,
     explain:"Express marshrutlarni yozilish tartibida tekshiradi. Dinamik ':id' marshruti aniqroq '/users/me' dan oldin turgani uchun uni ham \"ushlab qoladi\" — aniqroq marshrutlar avval yozilishi kerak."},
    {code:`app.post('/order', (req, res) => {\n  const total = req.body.price * req.body.qty;\n  saveOrder(total);\n});`,
     opts:["Narx klientdan ishonib olinmoqda (xavfli)","req.body ishlatib bo'lmaydi","saveOrder funksiyasi mavjud emas","'*' amali noto'g'ri"], correct:0,
     explain:"Narx kabi muhim qiymatlarni hech qachon klientdan kelgan ma'lumotga ishonib olish kerak emas — narx serverdagi bazadan olinishi va u yerda tekshirilishi kerak, aks holda foydalanuvchi narxni o'zgartirib yuborishi mumkin."},
    {code:`app.post('/user', (req, res) => {\n  if (!req.body.name) {\n    res.send("Xato: ism kiritilmagan");\n  }\n  saveUser(req.body);\n  res.send("Saqlandi");\n});`,
     opts:["'if' dan keyin 'return' yo'q — kod baribir davom etadi","if sharti noto'g'ri yozilgan","saveUser funksiyasi mavjud emas","res.send ishlatib bo'lmaydi"], correct:0,
     explain:"Xato xabari yuborilgandan keyin funksiyani to'xtatish uchun 'return' kerak edi. Aks holda kod pastga davom etadi va bitta so'rovga ikkinchi marta res.send chaqiriladi — bu xatoga olib keladi."},
    {code:`app.get('/user/:id', (req, res) => {\n  const user = db.find(req.params.id);\n  res.send(user);\n});\n// foydalanuvchi topilmasa, user === undefined`,
     opts:["Topilmasa ham 200 status qaytadi — 404 kerak edi","db.find funksiyasi mavjud emas","req.params ishlatib bo'lmaydi","res.send xato"], correct:0,
     explain:"Resurs topilmaganda server baribir standart 200 statusni qaytaradi. Klient uchun aniqroq bo'lishi uchun bunday holatda 404 kabi mos status kod qaytarilishi kerak edi."},
    {code:`const apiKey = "sk_live_51H8xJ2KZ...";\nfetch(\`https://api.example.com/pay?key=\${apiKey}\`);`,
     opts:["Maxfiy kalit kodga to'g'ridan-to'g'ri yozilgan (.env kerak edi)","fetch funksiyasi noto'g'ri ishlatilgan","Template literal sintaksisi xato","URL manzili noto'g'ri"], correct:0,
     explain:"Maxfiy kalitlarni (parol, API key) to'g'ridan-to'g'ri kodga yozish xavfsiz emas — kod boshqa birov qo'liga tushsa, kalit ham oshkor bo'ladi. Bunday qiymatlar .env fayl orqali saqlanishi kerak."},
    {code:`app.get('/delete-user/:id', (req, res) => {\n  db.users.remove(req.params.id);\n  res.send("O'chirildi");\n});`,
     opts:["O'chirish uchun GET ishlatilgan — DELETE kerak edi","'/delete-user/:id' manzili noto'g'ri","db.users.remove funksiyasi mavjud emas","req.params ishlatib bo'lmaydi"], correct:0,
     explain:"GET so'rovi faqat ma'lumot o'qish uchun mo'ljallangan va yon ta'sirsiz bo'lishi kerak. O'chirish kabi amallar uchun DELETE (yoki POST) ishlatilishi kerak, aks holda havolani ochish orqali ham tasodifan o'chirib yuborish mumkin."},
    {code:`app.use((req, res, next) => {\n  res.header("Access-Control-Allow-Origin", "*");\n  next();\n});`,
     opts:["To'g'ri va xavfsiz sozlangan","'*' hammaga ruxsat beradi — xavfsiz emas","CORS umuman ishlamaydi","next() chaqiruvi ortiqcha"], correct:1,
     explain:"'Access-Control-Allow-Origin: *' istalgan manbadan (saytdan) so'rov yuborishga ruxsat beradi — bu ko'p holatlarda (ayniqsa maxfiy ma'lumot uchun) xavfsiz emas, aniq domenlarni ko'rsatish tavsiya etiladi."},
    {code:`app.get('/data', async (req, res) => {\n  const data = await db.find();\n  res.send(data);\n});`,
     opts:["To'g'ri ishlaydi","Xatoni ushlaydigan try/catch yo'q","await noto'g'ri","res.send xato"], correct:1,
     explain:"await ishlatilganda xatolik (masalan baza ulanmasa) yuz bersa, uni ushlab qolish uchun try/catch kerak — aks holda kutilmagan xato butun serverni yiqitib qo'yishi mumkin."},
    {code:`app.put('/user/:id', (req, res) => {\n  db.update(req.params.id, {age: req.body.age});\n});`,
     opts:["To'g'ri ishlatilgan","PUT emas, PATCH kerak edi (qisman yangilash)","Marshrut xato","update() mavjud emas"], correct:1,
     explain:"PUT resursni TO'LIQ almashtirish uchun, PATCH esa QISMAN yangilash uchun ishlatiladi. Bu yerda faqat 'age' yangilanmoqda — bu PATCH'ga mosroq amal."},
    {code:`app.post('/login', (req, res) => {\n  console.log("Login urinishi:", req.body.password);\n});`,
     opts:["Xavfsiz, muammo yo'q","Parol logga yozilmoqda — bu xavfsizlik xatosi","console.log ishlamaydi","req.body noto'g'ri"], correct:1,
     explain:"Foydalanuvchi parolini (hatto vaqtincha bo'lsa ham) log fayllariga yozish xavfsizlik nuqtai nazaridan xato — log fayllarini ko'ra oladigan har kim parolni ko'rib qolishi mumkin."},
  ],
};

const TRUE_FALSE_BANKS = {
  js: [
    {stmt:"JavaScript'da 'let' bilan bitta nomda ikkita o'zgaruvchi qayta e'lon qilib bo'lmaydi.", answer:true, explain:"To'g'ri — 'let' (va 'const') bilan bir doirada bir xil nomni qayta e'lon qilish xatoga olib keladi. Faqat 'var' buni ruxsat beradi."},
    {stmt:"Massiv (array) indekslari 1 dan boshlanadi.", answer:false, explain:"Aksariyat dasturlash tillarida, jumladan JavaScript'da ham, massiv indekslari 0 dan boshlanadi."},
    {stmt:"Funksiya (function) — bu qayta-qayta ishlatsa bo'ladigan kod bo'lagi.", answer:true, explain:"To'g'ri — funksiyaning asosiy maqsadi bir marta yozib, kerak bo'lganda qayta-qayta chaqirish."},
    {stmt:"== va === JavaScript'da har doim bir xil natija beradi.", answer:false, explain:"Yo'q — '==' qiymatni turlarni moslashtirib solishtiradi, '===' esa qiymat va turini birga tekshiradi (qat'iy solishtirish)."},
    {stmt:"'for' sikli kodni bir necha marta takrorlash uchun ishlatiladi.", answer:true, explain:"To'g'ri — 'for' sikli belgilangan shart bajarilguncha kod blokini takrorlaydi."},
    {stmt:"JSON formatida faqat matn (string) turidagi ma'lumot saqlash mumkin.", answer:false, explain:"Yo'q — JSON'da son, mantiqiy (true/false), massiv va boshqa obyektlarni ham saqlash mumkin."},
    {stmt:"'typeof null' JavaScript'da \"object\" qiymatini qaytaradi.", answer:true, explain:"To'g'ri — bu JavaScript'dagi mashhur \"g'alati\" holat: typeof null tarixiy sabablarga ko'ra \"object\" deb qaytadi, garchi null alohida tur bo'lsa ham."},
    {stmt:"Massivlar (array) JavaScript'da ham obyekt turiga kiradi.", answer:true, explain:"To'g'ri — JavaScript'da massivlar maxsus turdagi obyektlar hisoblanadi, shuning uchun typeof [] ham \"object\" qaytaradi."},
    {stmt:"'const' bilan e'lon qilingan massivning ichidagi elementlarini o'zgartirib bo'lmaydi.", answer:false, explain:"Yo'q — 'const' faqat o'zgaruvchiga QAYTA qiymat berishni taqiqlaydi, lekin massiv yoki obyekt ICHIDAGI elementlarni o'zgartirish (push, pop kabi) mumkin."},
    {stmt:"Arrow funksiyalar (=>) har doim o'zining shaxsiy 'this' qiymatiga ega bo'ladi.", answer:false, explain:"Yo'q — arrow funksiyalar o'z 'this'iga ega emas, ular uni o'rab turgan (tashqi) kontekstdan meros qilib oladi."},
    {stmt:"'NaN === NaN' ifodasining natijasi true bo'ladi.", answer:false, explain:"Yo'q — NaN o'ziga ham teng emas, shuning uchun NaN === NaN har doim false qaytaradi."},
    {stmt:"JavaScript'da massivga yangi element qo'shish uchun faqat 'push()' metodidan foydalanish mumkin.", answer:false, explain:"Yo'q — 'unshift()', 'splice()' yoki indeks orqali to'g'ridan-to'g'ri qiymat berish kabi boshqa usullar ham bor."},
    {stmt:"'undefined' va 'null' JavaScript'da '===' bilan solishtirilganda teng hisoblanadi.", answer:false, explain:"Yo'q — '==' ular orasida teng deydi, lekin '===' turlarini ham solishtiradi va ular turli tur bo'lgani uchun teng emas."},
    {stmt:"Sikl (loop) ichida 'break' operatori butun siklni to'liq to'xtatadi.", answer:true, explain:"To'g'ri — 'break' ishga tushgan joyda sikl darhol to'xtaydi va undan keyingi kodga o'tiladi."},
    {stmt:"JavaScript bir vaqtning o'zida faqat bitta amalni bajaradigan (single-threaded) til.", answer:true, explain:"To'g'ri — JavaScript asosiy oqimda bir vaqtning o'zida faqat bitta amalni ketma-ket bajaradi (single-threaded)."},
    {stmt:"Template literal (orqa qo'shtirnoq bilan yozilgan matn) ichida o'zgaruvchini ${} yordamida joylashtirish mumkin.", answer:true, explain:"To'g'ri — template literal (`...`) ichida ${o'zgaruvchi} yordamida qiymatlarni to'g'ridan-to'g'ri matn ichiga joylashtirish mumkin."},
  ],
  html: [
    {stmt:"HTML — bu dasturlash tili.", answer:false, explain:"HTML — bu belgilash (markup) tili, u sahifa tuzilishini tavsiflaydi, lekin dasturlash tiliga xos mantiq (shartlar, sikllar) yo'q."},
    {stmt:"HTML'dagi <img> tegi yopiluvchi tegga muhtoj emas.", answer:true, explain:"To'g'ri — <img> \"bo'sh teg\" hisoblanadi, uni </img> bilan yopish shart emas."},
    {stmt:"<div> va <span> bir xil — ikkalasi ham satr darajasidagi (inline) element.", answer:false, explain:"Yo'q — <div> blok darajasidagi, <span> esa satr darajasidagi (inline) element."},
    {stmt:"Bitta HTML sahifasida bir nechta elementda bir xil id bo'lishi mumkin.", answer:false, explain:"Yo'q — 'id' atributi sahifada unikal bo'lishi kerak, takrorlanmasligi kerak."},
    {stmt:"<head> qismidagi kontent brauzer oynasida to'g'ridan-to'g'ri ko'rinadi.", answer:false, explain:"Yo'q — <head> meta-ma'lumot uchun, uning ichidagi kontent (title'dan tashqari) sahifada ko'rinmaydi."},
    {stmt:"HTML formasidagi <label> elementi input maydonini tavsiflash uchun ishlatiladi.", answer:true, explain:"To'g'ri — <label> input maydoniga nom/tavsif berish va uni bosish orqali fokus qilish uchun ishlatiladi."},
    {stmt:"<script> tegini <body> ichiga joylashtirish mumkin emas.", answer:false, explain:"Yo'q — <script> ham <head>, ham <body> ichida joylashishi mumkin; ko'pincha sahifa tezroq yuklanishi uchun <body> oxiriga qo'yiladi."},
    {stmt:"Bitta HTML sahifasida bir nechta <h1> tegi bo'lishi texnik jihatdan mumkin.", answer:true, explain:"To'g'ri — brauzer buni taqiqlamaydi, lekin sahifa tuzilishi (SEM) uchun odatda faqat bitta asosiy <h1> tavsiya etiladi."},
    {stmt:"<br> tegi yangi xatboshi emas, faqat qator ko'chirish uchun ishlatiladi.", answer:true, explain:"To'g'ri — <br> matn ichida oddiy qator ko'chirish uchun, <p> esa to'liq yangi xatboshi (paragraf) yaratish uchun ishlatiladi."},
    {stmt:"HTML formasida <textarea> ichiga matn 'value' atributi orqali kiritiladi.", answer:false, explain:"Yo'q — <textarea>ning boshlang'ich matni uning OCHUVCHI va YOPUVCHI teglari orasiga yoziladi, 'value' atributi orqali emas."},
    {stmt:"<meta charset=\"UTF-8\"> sahifaning belgilar kodlashini bildiradi.", answer:true, explain:"To'g'ri — bu qator brauzerga sahifadagi matnni qanday kodlashda (bu yerda UTF-8) o'qish kerakligini bildiradi."},
    {stmt:"HTML'da <table> ichida <thead> va <tbody> teglari majburiy emas, lekin ishlatish tavsiya etiladi.", answer:true, explain:"To'g'ri — jadval ularsiz ham ishlaydi, lekin <thead>/<tbody> tuzilmani aniqroq va stillashni osonroq qiladi."},
    {stmt:"<iframe> tegi boshqa veb-sahifani joriy sahifa ichiga joylashtirish uchun ishlatiladi.", answer:true, explain:"To'g'ri — <iframe> orqali boshqa manzildagi sahifa yoki kontentni joriy sahifa ichida \"deraza\" sifatida ko'rsatish mumkin."},
    {stmt:"Bitta HTML elementga bir nechta atribut (attribute) berish mumkin emas.", answer:false, explain:"Yo'q — bitta elementga istalgancha atribut (id, class, src, alt va h.k.) qo'shish mumkin."},
    {stmt:"<nav> tegi sahifadagi asosiy navigatsiya havolalarini guruhlash uchun ishlatiladi.", answer:true, explain:"To'g'ri — <nav> semantik teg bo'lib, sahifaning asosiy navigatsiya bloklarini belgilash uchun ishlatiladi."},
    {stmt:"HTML formasidagi 'submit' turidagi tugma bosilganda sahifa har doim albatta to'liq qayta yuklanishi shart.", answer:false, explain:"Yo'q — JavaScript yordamida (masalan preventDefault() bilan) forma yuborilishini ushlab qolib, sahifani qayta yuklamasdan ishlov berish mumkin."},
  ],
  css: [
    {stmt:"CSS yordamida veb-sahifaning ko'rinishini (ranglar, shriftlar) o'zgartirish mumkin.", answer:true, explain:"To'g'ri — CSS aynan shu uchun ishlatiladi: rang, shrift, joylashuv va boshqa vizual xususiyatlarni belgilash."},
    {stmt:"CSS'da 'color' xossasi elementning fon rangini o'zgartiradi.", answer:false, explain:"Yo'q — 'color' matn rangini belgilaydi. Fon rangi uchun 'background-color' ishlatiladi."},
    {stmt:"CSS'da 'class' selektori bir nechta elementga qo'llanilishi mumkin.", answer:true, explain:"To'g'ri — bir xil class nomi bir nechta elementga berilishi va ularga bir xil stil qo'llanishi mumkin."},
    {stmt:"Inline stil (style=\"...\") har doim tashqi CSS fayldagi qoidadan kuchsizroq hisoblanadi.", answer:false, explain:"Yo'q — aksincha, inline stil odatda tashqi yoki ichki CSS qoidalaridan ustun (kuchliroq) turadi."},
    {stmt:"'em' va 'rem' o'lchov birliklari CSS'da bir xil ma'noni anglatadi.", answer:false, explain:"Yo'q — 'em' ota-elementning shrift o'lchamiga, 'rem' esa sahifaning bosh (root) shrift o'lchamiga nisbatan hisoblanadi."},
    {stmt:"Flexbox yordamida elementlarni vertikal markazga joylashtirish mumkin.", answer:true, explain:"To'g'ri — 'display:flex' bilan 'align-items:center' va 'justify-content:center' yordamida elementlarni markazlashtirish mumkin."},
    {stmt:"CSS'da bitta elementga bir nechta klass berish mumkin.", answer:true, explain:"To'g'ri — class atributiga bo'sh joy bilan ajratib bir nechta klass nomi yozish mumkin, masalan class=\"card katta\"."},
    {stmt:"'padding' elementning tashqi bo'shlig'ini, 'margin' esa ichki bo'shlig'ini belgilaydi.", answer:false, explain:"Yo'q — aksincha: 'padding' element ICHIDAGI (chegara bilan kontent orasidagi), 'margin' esa element TASHQARISIDAGI bo'shliqni belgilaydi."},
    {stmt:"Brauzer CSS qoidalarini yuqoridan pastga o'qiydi va keyingi mos qoida oldingisini bekor qilishi mumkin.", answer:true, explain:"To'g'ri — bir xil ustunlikdagi qoidalar orasida keyin yozilgani odatda oldingisini bekor qilib, amal qiladi."},
    {stmt:"'display: none' bilan yashirilgan element sahifada hali ham o'z joyini egallab turadi.", answer:false, explain:"Yo'q — 'display:none' elementni butunlay olib tashlaydi va u hech qanday joy egallamaydi (bunga farqli 'visibility:hidden' joyni saqlaydi)."},
    {stmt:"Media query yordamida turli ekran o'lchamlariga moslashtirilgan dizayn (responsive) yaratish mumkin.", answer:true, explain:"To'g'ri — @media qoidalari ekran kengligiga qarab turli CSS stillarini qo'llash imkonini beradi."},
    {stmt:"CSS'da 'id' selektori '.' (nuqta) bilan emas, '#' bilan boshlanadi.", answer:true, explain:"To'g'ri — id bo'yicha tanlash uchun '#', class bo'yicha tanlash uchun '.' ishlatiladi."},
    {stmt:"'position: fixed' bilan joylashtirilgan element sahifa skroll qilinganda ham bir joyda (ekranga nisbatan) qoladi.", answer:true, explain:"To'g'ri — 'fixed' elementni brauzer oynasiga (viewport) nisbatan mahkamlaydi, sahifa skroll qilinsa ham u siljimaydi."},
    {stmt:"CSS Grid faqat bir o'lchamli (bitta qator yoki bitta ustun) tartiblash uchun ishlatiladi.", answer:false, explain:"Yo'q — Grid ikki o'lchamli (qator VA ustunlar bo'yicha) tartiblash uchun mo'ljallangan; bir o'lchamli tartib uchun ko'proq Flexbox ishlatiladi."},
    {stmt:"Bir xil selektor uchun inline stil (style=\"...\") va tashqi CSS fayldagi oddiy qoida bir xil ustunlikka ega.", answer:false, explain:"Yo'q — inline stil odatda tashqi yoki ichki CSS qoidalaridan ustunroq (kuchliroq) hisoblanadi."},
    {stmt:"'overflow: hidden' konteynerdan tashqariga chiqib ketgan kontentni yashiradi.", answer:true, explain:"To'g'ri — 'overflow: hidden' konteyner chegarasidan oshib ketgan qismni ko'rinmas qiladi."},
  ],
  react: [
    {stmt:"React — bu Meta (Facebook) tomonidan yaratilgan JavaScript kutubxonasi.", answer:true, explain:"To'g'ri — React interfeys qurish uchun Meta (avvalgi Facebook) tomonidan yaratilgan mashhur kutubxona."},
    {stmt:"React'da har bir komponent albatta class ko'rinishida yozilishi shart.", answer:false, explain:"Yo'q — zamonaviy React'da funksional komponentlar (hooklar bilan) ham to'liq ishlatiladi, class shart emas."},
    {stmt:"useState hooki komponent ichida holat (state) saqlash uchun ishlatiladi.", answer:true, explain:"To'g'ri — useState komponentga o'zgaruvchi holatni saqlash va yangilash imkonini beradi."},
    {stmt:"JSX — bu HTML bilan bir xil til, brauzer uni to'g'ridan-to'g'ri tushunadi.", answer:false, explain:"Yo'q — JSX JavaScript ustiga qurilgan sintaksis kengaytmasi, brauzer uni ishlatishdan oldin oddiy JavaScript'ga aylantiriladi (Babel kabi vositalar bilan)."},
    {stmt:"React'da props komponentga tashqaridan uzatiladigan, komponent ichida o'zgartirib bo'lmaydigan ma'lumot.", answer:true, explain:"To'g'ri — props faqat o'qish uchun (read-only) bo'ladi, komponent ularni to'g'ridan-to'g'ri o'zgartira olmaydi."},
    {stmt:"Ro'yxat (list) render qilinganda 'key' atributi shart emas, u faqat ixtiyoriy bezak.", answer:false, explain:"Yo'q — 'key' React'ga qaysi element o'zgarganini samarali aniqlashda yordam beradi, uni bermaslik ogohlantirish va samaradorlik muammolariga olib kelishi mumkin."},
    {stmt:"Bitta komponent bir nechta marta, turli joylarda qayta ishlatilishi mumkin.", answer:true, explain:"To'g'ri — qayta ishlatiladigan komponentlar yaratish React'ning asosiy g'oyalaridan biri."},
    {stmt:"React komponentlari har doim JSX qaytarishi shart, boshqa hech narsa qaytara olmaydi.", answer:false, explain:"Yo'q — komponent JSX'dan tashqari matn, massiv, null yoki Fragment ham qaytarishi mumkin."},
    {stmt:"useEffect komponent ekrandan olib tashlanganda (unmount) tozalash funksiyasini ishga tushirishi mumkin.", answer:true, explain:"To'g'ri — useEffect ichida qaytarilgan funksiya komponent unmount bo'lganda (yoki keyingi effektdan oldin) avtomatik chaqiriladi."},
    {stmt:"Bir komponentga bir nechta prop uzatish mumkin emas.", answer:false, explain:"Yo'q — komponentga istalgancha son va nomdagi propslarni uzatish mumkin."},
    {stmt:"React Virtual DOM har safar haqiqiy DOM'ni to'liq qayta yozadi.", answer:false, explain:"Yo'q — React eski va yangi Virtual DOM'ni solishtirib (diffing), faqat haqiqatan o'zgargan qismlarni yangilaydi, bu samaradorlikni oshiradi."},
    {stmt:"React'da komponent nomini har doim katta harf bilan boshlash kerak.", answer:true, explain:"To'g'ri — kichik harf bilan boshlangan nomni React oddiy HTML tegi deb qabul qiladi, shuning uchun o'z komponentlar katta harf bilan boshlanishi shart."},
    {stmt:"useState orqali qaytarilgan yangilash funksiyasi (masalan setCount) chaqirilganda komponent har doim darhol, aynan o'sha zahotiyoq qayta chiziladi.", answer:false, explain:"Yo'q — React ko'pincha bir nechta state yangilanishini birlashtirib (batching), keyinroq bitta qayta render sifatida bajaradi."},
    {stmt:"Fragment (<>...</>) bir nechta elementni ekranda qo'shimcha HTML elementi yaratmasdan guruhlaydi.", answer:true, explain:"To'g'ri — Fragment faqat JSX'da bitta \"ildiz\" talabini qondirish uchun ishlatiladi va u haqiqiy DOM'ga hech qanday qo'shimcha element qo'shmaydi."},
    {stmt:"React'da bitta komponent ichida bir nechta marta useState chaqirish mumkin emas.", answer:false, explain:"Yo'q — bitta komponent ichida kerakli sondagi useState (yoki boshqa hooklar) chaqirish mumkin."},
    {stmt:"Props orqali komponentga funksiya ham uzatish mumkin.", answer:true, explain:"To'g'ri — props orqali son, matn, obyekt, massiv va hatto funksiyalarni ham uzatish mumkin (masalan onClick handleri)."},
  ],
  backend: [
    {stmt:"Backend — bu foydalanuvchi to'g'ridan-to'g'ri ko'radigan qism.", answer:false, explain:"Yo'q — foydalanuvchi ko'radigan qism frontend deyiladi. Backend server tomonidagi, ko'zga ko'rinmaydigan qism."},
    {stmt:"Ma'lumotlar bazasi (database) ma'lumotlarni saqlash uchun ishlatiladi.", answer:true, explain:"To'g'ri — ma'lumotlar bazasi katta hajmdagi ma'lumotlarni tartibli saqlash va qidirish uchun ishlatiladi."},
    {stmt:"SQL — ma'lumotlar bazasi bilan ishlash uchun ishlatiladigan til.", answer:true, explain:"To'g'ri — SQL ma'lumotlar bazasidan ma'lumot so'rash, qo'shish va o'zgartirish uchun maxsus til."},
    {stmt:"API — bu ikkita dastur o'rtasida ma'lumot almashish uchun ishlatiladigan interfeys.", answer:true, explain:"To'g'ri — API (Application Programming Interface) dasturlar bir-biri bilan standart tarzda gaplashishi uchun ishlatiladi."},
    {stmt:"Backend serverida barcha foydalanuvchilar parollari oddiy matn (plain text) holida saqlanishi xavfsiz hisoblanadi.", answer:false, explain:"Yo'q — parollar har doim xesh (hash) qilingan holda saqlanishi kerak, aks holda ma'lumotlar bazasi o'g'irlansa parollar ochiq qoladi."},
    {stmt:"GET so'rovi odatda serverdan ma'lumot olish, POST esa yangi ma'lumot yuborish/yaratish uchun ishlatiladi.", answer:true, explain:"To'g'ri — bu HTTP metodlarining eng keng tarqalgan vazifalari: GET o'qish, POST yaratish uchun."},
    {stmt:"HTTP — bu server va klient o'rtasida ma'lumot almashish protokoli.", answer:true, explain:"To'g'ri — HTTP (HyperText Transfer Protocol) veb-brauzer va server o'rtasidagi aloqa qoidalarini belgilaydi."},
    {stmt:"PUT so'rovi odatda mavjud resursni to'liq yangilash uchun ishlatiladi.", answer:true, explain:"To'g'ri — PUT metodi odatda ko'rsatilgan resursni yangi ma'lumot bilan to'liq almashtirish uchun ishlatiladi."},
    {stmt:"Server bir vaqtning o'zida faqat bitta foydalanuvchi so'roviga javob bera oladi.", answer:false, explain:"Yo'q — zamonaviy serverlar bir vaqtning o'zida ko'plab so'rovlarni parallel yoki navbat bilan tez almashtirib qayta ishlashga mo'ljallangan."},
    {stmt:"Middleware — bu so'rov va javob o'rtasida ishlaydigan qo'shimcha funksiya.", answer:true, explain:"To'g'ri — middleware so'rov serverga yetib kelgach va asosiy handler ishga tushishidan oldin (masalan tekshiruv, log yozish uchun) ishlaydi."},
    {stmt:"REST API'da javobni har doim faqat JSON formatida qaytarish shart.", answer:false, explain:"Yo'q — REST API ko'pincha JSON ishlatadi, lekin bu majburiy emas: XML yoki boshqa formatlar ham qaytarilishi mumkin."},
    {stmt:"Backend server odatda ma'lumotlar bazasi bilan bevosita ishlaydi, frontend esa unga to'g'ridan-to'g'ri ulanmaydi.", answer:true, explain:"To'g'ri — frontend odatda backend orqali (API so'rovlari bilan) ma'lumotga murojaat qiladi, bazaga to'g'ridan-to'g'ri ulanmaydi."},
    {stmt:"HTTP status kodi 200 so'rov muvaffaqiyatli bajarilganini bildiradi.", answer:true, explain:"To'g'ri — 200 (OK) statusi so'rov muvaffaqiyatli qabul qilinib, to'g'ri bajarilganini bildiradi."},
    {stmt:"Token (masalan JWT) foydalanuvchini autentifikatsiya qilishda ishlatilishi mumkin.", answer:true, explain:"To'g'ri — JWT kabi tokenlar foydalanuvchi tizimga kirganini har bir so'rovda tasdiqlash uchun keng qo'llaniladi."},
    {stmt:"Bitta serverda bir nechta turli marshrut (route) bo'lishi mumkin emas.", answer:false, explain:"Yo'q — bitta serverda istalgancha turli marshrut (masalan /users, /orders, /login) belgilash mumkin."},
    {stmt:"Environment o'zgaruvchilari (.env) maxfiy ma'lumotlarni (parol, kalit) kodga yozmasdan saqlash uchun ishlatiladi.", answer:true, explain:"To'g'ri — .env fayli orqali maxfiy sozlamalarni kod ichiga hardcode qilmasdan, alohida saqlash mumkin."},
  ],
};

const CODE_QUIZ_BANKS = {
  js: [
    {code:`let x = 5;\nlet y = 2;\nconsole.log(x + y);`,
     opts:["7","52","3","x+y"], correct:0, explain:"x (5) va y (2) qo'shiladi: 5 + 2 = 7."},
    {code:`console.log(10 % 3);`,
     opts:["3","0","1","3.33"], correct:2, explain:"'%' — qoldiqni topish amali. 10 ni 3 ga bo'lganda qoldiq 1 bo'ladi."},
    {code:`console.log("5" + 3);`,
     opts:["8","5","Xato","53"], correct:3, explain:"Satr (\"5\") va son qo'shilganda, JavaScript sonni satrga aylantirib, ularni birlashtiradi: \"5\"+3 = \"53\"."},
    {code:`console.log(typeof "salom");`,
     opts:["salom","text","undefined","string"], correct:3, explain:"'typeof' operatori qiymatning turini qaytaradi — \"salom\" satr (string) turida."},
    {code:`let a = 3;\na += 4;\nconsole.log(a);`,
     opts:["34","3","4","7"], correct:3, explain:"'a += 4' — bu 'a = a + 4' bilan bir xil: 3 + 4 = 7."},
    {code:`console.log([1, 2, 3].length);`,
     opts:["2","[1,2,3]","Xato","3"], correct:3, explain:"'.length' massivdagi elementlar sonini qaytaradi — bu yerda 3ta element bor."},
    {code:`console.log(2 ** 3);`,
     opts:["6","9","23","8"], correct:3, explain:"'**' — darajaga oshirish amali: 2 ning 3-darajasi = 2×2×2 = 8."},
    {code:`console.log(5 > 3 && 2 > 4);`,
     opts:["true","5","Xato","false"], correct:3, explain:"5 > 3 — rost, lekin 2 > 4 — yolg'on. '&&' (VA) amalida ikkalasi ham rost bo'lishi kerak, shuning uchun natija false."},
    {code:`console.log(Boolean(0));`,
     opts:["true","0","undefined","false"], correct:3, explain:"0 — JavaScript'da \"falsy\" qiymat hisoblanadi, shuning uchun Boolean(0) — false."},
    {code:`let arr = [1, 2, 3];\narr.pop();\nconsole.log(arr);`,
     opts:["[1, 2, 3]","[2, 3]","3","[1, 2]"], correct:3, explain:"'pop()' massivning oxirgi elementini olib tashlaydi. Massivda [1, 2] qoladi."},
    {code:`console.log([1, 2, 3].includes(2));`,
     opts:["false","2","undefined","true"], correct:3, explain:"'.includes()' massivda berilgan qiymat bor-yo'qligini tekshiradi va mantiqiy (true/false) qiymat qaytaradi. 2 massivda bor, shuning uchun true."},
    {code:`console.log(typeof NaN);`,
     opts:["'NaN'","'undefined'","'object'","'number'"], correct:3, explain:"NaN (\"Not a Number\") ham, g'alati tuyulsa-da, 'number' turiga kiradi — typeof NaN natijasi 'number'."},
    {code:`console.log([1, 2, 3].map(n => n * 2));`,
     opts:["[1, 2, 3]","[2, 4, 6]","6","Xato"], correct:1, explain:"'.map()' har bir elementni berilgan funksiya orqali o'zgartirib, yangi massiv qaytaradi: [1*2, 2*2, 3*2] = [2, 4, 6]."},
    {code:`console.log("dasturchi".length);`,
     opts:["8","9","10","Xato"], correct:1, explain:"\"dasturchi\" so'zida 9 ta harf bor, shuning uchun '.length' 9 ni qaytaradi."},
    {code:`let x;\nconsole.log(x);`,
     opts:["null","0","''","undefined"], correct:3, explain:"O'zgaruvchi e'lon qilinib, lekin qiymat berilmasa, uning boshlang'ich qiymati avtomatik ravishda 'undefined' bo'ladi."},
    {code:`console.log(3 == "3");`,
     opts:["false","Xato","undefined","true"], correct:3, explain:"'==' (moslashtiruvchi solishtirish) qiymatlarni solishtirishdan oldin turlarini moslashtiradi — satr \"3\" songa aylantirilib, 3 bilan teng deb topiladi."},
    {code:`console.log(Math.max(3, 7, 2));`,
     opts:["3","7","2","Xato"], correct:1, explain:"Math.max() berilgan sonlar orasidan eng kattasini qaytaradi — bu yerda 7."},
    {code:`let arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);`,
     opts:["3","4","[1,2,3,4]","Xato"], correct:1, explain:"'.push()' massivga yangi element qo'shadi, endi massivda 4ta element bor — '.length' 4 qaytaradi."},
    {code:`console.log("Salom".slice(0, 3));`,
     opts:["Salo","Sal","alom","Xato"], correct:1, explain:"'.slice(0,3)' satrdan 0-indeksdan 3-indeksgacha (3 kirmaydi) belgilarni oladi: \"Sal\"."},
  ],
  html: [
    {code:`<p>Salom <b>Dunyo</b></p>`,
     opts:["Salom Dunyo (\"Dunyo\" qalin harflarda)","Faqat \"Dunyo\" chiqadi","HTML kodi matn sifatida chiqadi","Xato beradi"], correct:0,
     explain:"<b> matnni qalin qiladi, <p> esa xatboshi hosil qiladi — natijada 'Salom Dunyo' chiqadi, 'Dunyo' qalin shriftda."},
    {code:`<input type="checkbox" checked>`,
     opts:["Belgilangan (checked) holatda","Belgilanmagan holatda","O'chirilgan (disabled) holatda","Ko'rinmaydi"], correct:0,
     explain:"'checked' atributi checkboxni sahifa yuklangandayoq belgilangan holatda ko'rsatadi."},
    {code:`<a href="#pastga">Pastga</a>\n...\n<div id="pastga">Bu yerga</div>`,
     opts:["Sahifa id=\"pastga\" bo'lgan qismga o'tadi","Yangi sahifa ochiladi","Hech narsa bo'lmaydi","Xato chiqadi"], correct:0,
     explain:"href=\"#id\" formatidagi havola sahifa ichida shu id'ga ega elementga o'tkazadi (anchor link)."},
    {code:`<select>\n  <option>Bir</option>\n  <option selected>Ikki</option>\n  <option>Uch</option>\n</select>`,
     opts:["Bir","Ikki","Uch","Hech qaysi biri"], correct:1,
     explain:"'selected' atributi qo'yilgan <option> boshlang'ich holatda tanlangan bo'lib ko'rinadi."},
    {code:`<p style="display:none">Salom</p>`,
     opts:["Ha, oddiy holatda ko'rinadi","Yo'q, u yashirilgan bo'ladi","Xira (shaffof) holatda ko'rinadi","Xato beradi"], correct:1,
     explain:"display:none elementni butunlay yashiradi, u sahifada joy ham egallamaydi."},
    {code:`<button disabled>Yubor</button>`,
     opts:["Ha, erkin bosiladi","Yo'q, tugma bosilmaydigan holatda","Faqat sichqoncha bilan bosiladi","Faqat klaviatura bilan bosiladi"], correct:1,
     explain:"'disabled' atributi tugmani bosib bo'lmaydigan holatga keltiradi, odatda xiraroq ko'rinadi."},
    {code:`<p>Salom &amp; Xayr</p>`,
     opts:["Salom &amp; Xayr","Salom & Xayr","Xato chiqadi","Salom and Xayr"], correct:1,
     explain:"'&amp;' — bu '&' belgisining maxsus HTML kodi (entity). Brauzer uni oddiy '&' belgisiga aylantirib ko'rsatadi."},
    {code:`<ol>\n  <li>Bir</li>\n  <li>Ikki</li>\n</ol>`,
     opts:["Ro'yxat nuqta (•) bilan chiqadi","Ro'yxat raqamlangan holda (1, 2, ...) chiqadi","Elementlar yonma-yon chiqadi","Xato chiqadi"], correct:1,
     explain:"<ol> (ordered list) elementlari avtomatik ravishda raqamlangan holda (1, 2, 3...) ko'rsatiladi, <ul>'dan farqli."},
    {code:`<input type="number" min="1" max="5" value="10">`,
     opts:["Qiymat 10 bo'lib qoladi, brauzer hech narsa qilmaydi","Ko'pchilik brauzerlar bu qiymatni chegaradan tashqarida deb belgilaydi (max=5)","Xato chiqadi va sahifa ishlamay qoladi","Qiymat avtomatik 1 ga aylanadi"], correct:1,
     explain:"'min' va 'max' atributlari qabul qilinadigan chegarani bildiradi; 10 bu chegaradan tashqarida bo'lgani uchun ko'pchilik brauzerlar maydonni yaroqsiz (invalid) deb belgilaydi."},
    {code:`<p>Bu <strong>muhim</strong> so'z.</p>`,
     opts:["\"muhim\" so'zi qalin (bold) ko'rinishda chiqadi","\"muhim\" so'zi kursiv ko'rinishda chiqadi","<strong> tegi hech narsaga ta'sir qilmaydi","Xato chiqadi"], correct:0,
     explain:"<strong> tegi matnni semantik jihatdan \"muhim\" deb belgilaydi va odatda uni qalin (bold) shriftda ko'rsatadi."},
    {code:`<a href="mailto:info@site.uz">Yozing</a>`,
     opts:["Sahifa yangilanadi","Email dasturi ochiladi","Hech narsa bo'lmaydi","Xato chiqadi"], correct:1,
     explain:"'mailto:' bilan boshlangan href havolasi bosilganda brauzer odatda foydalanuvchining standart email dasturini ko'rsatilgan manzil bilan ochadi."},
    {code:`<input type="password" value="1234">`,
     opts:["Ekranda \"1234\" ochiq matn sifatida ko'rinadi","Ekranda son o'rniga nuqta/yulduzcha kabi belgilar ko'rinadi (qiymat yashiriladi)","Maydon bo'sh ko'rinadi","Xato chiqadi"], correct:1,
     explain:"type=\"password\" kiritilgan belgilarni ekranda yashirib, o'rniga nuqta yoki yulduzcha kabi belgilar bilan ko'rsatadi — asl qiymat esa saqlanadi."},
    {code:`<p>Salom<br>Dunyo</p>`,
     opts:["\"Salom\" va \"Dunyo\" bir qatorda, bo'shliqsiz chiqadi","\"Salom\" va \"Dunyo\" ikki alohida qatorda chiqadi","Faqat \"Dunyo\" chiqadi","Xato chiqadi"], correct:1,
     explain:"<br> matn ichida qator ko'chirish (line break) hosil qiladi — \"Salom\" va \"Dunyo\" ikkita alohida qatorda ko'rinadi."},
    {code:`<textarea rows="3" cols="20">Salom</textarea>`,
     opts:["Bitta qatorli oddiy input chiqadi","\"Salom\" matni bilan to'ldirilgan ko'p qatorli matn maydoni chiqadi","Bo'sh maydon chiqadi, \"Salom\" ko'rinmaydi","Xato chiqadi"], correct:1,
     explain:"<textarea> ochilish va yopilish teglari orasidagi matn uning boshlang'ich qiymati bo'lib, ko'p qatorli (rows/cols bilan belgilangan o'lchamdagi) matn maydonida ko'rsatiladi."},
    {code:`<progress value="50" max="100"></progress>`,
     opts:["Bo'sh progress-bar (0%) ko'rinadi","Yarmigacha (50%) to'lgan progress-bar ko'rinadi","To'liq (100%) to'lgan progress-bar ko'rinadi","Hech narsa ko'rinmaydi"], correct:1,
     explain:"'value' va 'max' nisbati progress-barning to'lish darajasini belgilaydi: 50/100 = 50%, ya'ni yarmigacha to'lgan holatda ko'rsatiladi."},
    {code:`<input type="range" min="0" max="10" value="5">`,
     opts:["Oddiy matn kiritish maydoni","Chek belgisi (checkbox)","Slayder, dastlab o'rtada (5 qiymatida)","Oddiy tugma"], correct:2,
     explain:"type=\"range\" siljituvchi slayder hosil qiladi — 'value' uning boshlang'ich holatini belgilaydi, bu yerda min(0) va max(10) orasidagi o'rtaga yaqin joyda."},
    {code:`<details>\n  <summary>Ko'proq</summary>\n  Qo'shimcha matn shu yerda\n</details>`,
     opts:["Faqat \"Ko'proq\" ko'rinadi, bosilsa matn ochiladi","Butun matn darhol ko'rinadi","Hech narsa ko'rinmaydi","Xato chiqadi"], correct:0,
     explain:"<details> elementi standart holatda yopiq bo'ladi — faqat <summary> ichidagi matn ko'rinadi, bosilganda esa qolgan kontent ochiladi."},
  ],
  css: [
    {code:`.box {\n  width: 100px;\n  padding: 20px;\n  box-sizing: border-box;\n}`,
     opts:["140px","100px","120px","80px"], correct:1,
     explain:"box-sizing: border-box bilan, padding va border 'width' ichiga kiradi, shuning uchun umumiy en 100px bo'lib qoladi."},
    {code:`p {\n  color: red !important;\n}\np.special {\n  color: blue;\n}`,
     opts:["Ko'k (blue)","Qizil (red)","Qora (default)","Xato beradi"], correct:1,
     explain:"'!important' belgilangan qoida boshqa oddiy qoidalardan ustun turadi, shu sabab rang qizil bo'lib qoladi."},
    {code:`.box {\n  visibility: hidden;\n}`,
     opts:["Ko'rinmaydi, lekin o'z joyini egallab turadi","Ko'rinmaydi va joyni ham egallamaydi","Yarim shaffof ko'rinadi","Oddiy holatda ko'rinadi"], correct:0,
     explain:"visibility:hidden elementni ko'rinmas qiladi, lekin display:none'dan farqli o'laroq, u sahifada o'z joyini saqlab qoladi."},
    {code:`.parent {\n  display: flex;\n}\n.child {\n  flex: 1;\n}`,
     opts:["Mavjud bo'shliqni teng taqsimlab oladi","Eng kichik o'lchamda qoladi","Faqat bittasi ko'rinadi","Xato beradi"], correct:0,
     explain:"flex:1 elementga mavjud bo'shliqni boshqa flex elementlar bilan teng taqsimlab olish imkonini beradi."},
    {code:`a {\n  color: blue;\n}\na:visited {\n  color: purple;\n}`,
     opts:["Ko'k","Binafsha","Qizil","Rangsiz"], correct:1,
     explain:"':visited' psevdo-klassi allaqachon bosilgan havolalarga alohida rang belgilaydi, bu yerda binafsha."},
    {code:`.box {\n  position: relative;\n}\n.box .badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}`,
     opts:["Butun sahifaning yuqori-o'ng burchagiga","'.box' ning yuqori-o'ng burchagiga","'.box' ning markaziga","Joylashuvi o'zgarmaydi"], correct:1,
     explain:"position:absolute element eng yaqin 'position:relative' qo'yilgan ota-elementga nisbatan joylashadi — bu yerda '.box' ga nisbatan."},
    {code:`.item {\n  opacity: 0.5;\n}`,
     opts:["Element butunlay yashiriladi","Yarim shaffof ko'rinadi, lekin bosiladi","Element rangi o'zgarmaydi","Xato beradi"], correct:1,
     explain:"'opacity' elementning shaffofligini boshqaradi; 0.5 qiymati elementni yarim shaffof qiladi, lekin u hali ham sahifada joy egallaydi va bosiladi."},
    {code:`ul li {\n  color: red;\n}`,
     opts:["Faqat birinchi <li> qizil bo'ladi","<ul> ichidagi barcha <li> elementlari qizil bo'ladi","Hech qanday <li> qizil bo'lmaydi","Xato beradi"], correct:1,
     explain:"'ul li' — bu \"avlod selektori\": <ul> ichidagi barcha <li> elementlariga (chuqurligidan qat'iy nazar) stil qo'llanadi."},
    {code:`.box {\n  width: 200px;\n  margin: 0 auto;\n}`,
     opts:["Element chapga suriladi","Element ota-elementi ichida gorizontal markazlashadi","Element o'ng chetga suriladi","Hech narsa o'zgarmaydi"], correct:1,
     explain:"Kenglik belgilangan blok elementda 'margin: 0 auto' chap va o'ng bo'shliqlarni avtomatik teng qilib, elementni gorizontal markazga joylashtiradi."},
    {code:`.list li:first-child {\n  font-weight: bold;\n}`,
     opts:["Ro'yxatdagi barcha elementlar qalin bo'ladi","Ro'yxatdagi faqat birinchi element qalin bo'ladi","Ro'yxatdagi oxirgi element qalin bo'ladi","Hech narsa o'zgarmaydi"], correct:1,
     explain:"':first-child' psevdo-klassi ota-elementning birinchi farzandiga mos keladigan elementga stil qo'llaydi — bu yerda ro'yxatning birinchi <li>si."},
    {code:`* {\n  box-sizing: border-box;\n}\n.box {\n  width: 200px;\n  border: 10px solid black;\n}`,
     opts:["220px","200px","180px","210px"], correct:1,
     explain:"box-sizing: border-box bilan border ham 'width' ichiga kiradi, shuning uchun elementning umumiy eni 200px bo'lib qoladi."},
    {code:`.parent {\n  width: 400px;\n}\n.child {\n  width: 50%;\n}`,
     opts:["400px","50px","200px","100px"], correct:2,
     explain:"Foizli kenglik ota-elementning eniga nisbatan hisoblanadi: 400px ning 50% i — 200px."},
    {code:`.text {\n  text-transform: uppercase;\n}\n/* HTML: <p class="text">salom</p> */`,
     opts:["\"salom\" bo'lib qoladi","\"SALOM\" bo'lib ko'rinadi (faqat ekranda)","Matn butunlay yashiriladi","Xato beradi"], correct:1,
     explain:"'text-transform: uppercase' matnni faqat vizual ravishda katta harflarga aylantirib ko'rsatadi — HTML fayldagi asl matn o'zgarmaydi."},
    {code:`.item:hover {\n  background: yellow;\n}`,
     opts:["Har doim sariq fon bilan ko'rinadi","Sichqoncha element ustiga kelganidagina fon sariq bo'ladi","Fon rangi hech qachon o'zgarmaydi","Xato beradi"], correct:1,
     explain:"':hover' psevdo-klassi faqat sichqoncha kursori element ustida turgan vaqtda ishga tushadi — shu paytdagina fon sariq bo'ladi."},
    {code:`ul {\n  list-style: none;\n}`,
     opts:["Ro'yxat elementlari nuqta (•) bilan chiqaveradi","Ro'yxat belgilari (nuqta/raqam) olib tashlanadi","Ro'yxat elementlari yashiriladi","Xato beradi"], correct:1,
     explain:"'list-style: none' ro'yxat oldidagi standart belgilarni (nuqta yoki raqam) olib tashlaydi, lekin elementlarning o'zi (matni) ko'rinishda qoladi."},
    {code:`.box {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}`,
     opts:["Kvadrat", "Doira (aylana)", "Uchburchak", "Chiziq"], correct:1,
     explain:"Kenglik va balandligi teng kvadrat elementga border-radius:50% berilsa, u to'liq doira (aylana) shakliga aylanadi."},
    {code:`.row {\n  display: flex;\n  justify-content: space-between;\n}`,
     opts:["Barcha bolalar chapga to'planadi","Bolalar orasida teng bo'shliq, birinchi/oxirgisi chetlarda","Barcha bolalar markazga to'planadi","Xato beradi"], correct:1,
     explain:"'justify-content: space-between' birinchi elementni chap chetga, oxirgisini o'ng chetga qo'yib, qolganlarini orasida teng bo'shliq bilan taqsimlaydi."},
  ],
  react: [
    {code:`function App(){\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n+1)}>{n}</button>;\n}`,
     opts:["Hech narsa", "Sahifa qayta yuklanadi", "Tugmadagi son bittaga oshadi", "Xato chiqadi"], correct:2,
     explain:"setN(n+1) chaqirilganda state yangilanadi va komponent qayta render bo'lib, yangi son ko'rsatiladi."},
    {code:`const el = <h1>Salom</h1>;\nconsole.log(typeof el);`,
     opts:["'string'","'object'","'html'","'undefined'"], correct:1,
     explain:"JSX kompilyatsiya qilinganda oddiy JavaScript obyektiga aylanadi, shuning uchun typeof natijasi 'object'."},
    {code:`function List({items}) {\n  return items.map(i => <li key={i}>{i}</li>);\n}\n// items = []`,
     opts:["Xato chiqadi","Hech narsa (bo'sh)","'undefined' matni","Bitta bo'sh <li>"], correct:1,
     explain:"Bo'sh massivni .map() qilish yana bo'sh massiv qaytaradi, demak ekranda hech qanday <li> ko'rsatilmaydi."},
    {code:`function App(){\n  const name = "Ali";\n  return <p>Salom, {name}!</p>;\n}`,
     opts:["Salom, {name}!","Salom, Ali!","Salom, name!","Xato chiqadi"], correct:1,
     explain:"JSX ichidagi jingalak qavslar {} JavaScript ifodasini bildiradi — {name} o'rniga 'name' o'zgaruvchisining qiymati (Ali) qo'yiladi."},
    {code:`function App(){\n  const isLoggedIn = false;\n  return <div>{isLoggedIn && <p>Xush kelibsiz</p>}</div>;\n}`,
     opts:["'Xush kelibsiz' matni","Hech narsa","'false' matni","Xato chiqadi"], correct:1,
     explain:"'&&' operatori chap tomon yolg'on (false) bo'lsa, o'ng tomonni hisoblamaydi va false qiymatni qaytaradi — React false'ni ekranga chiqarmaydi."},
    {code:`useEffect(() => {\n  console.log("ishga tushdi");\n}, []);`,
     opts:["Har render'da","Faqat mount paytida","Hech qachon","Har sekundda"], correct:1,
     explain:"Bo'sh massiv [] dependency sifatida berilsa, effekt faqat komponent birinchi marta ekranga chiqqanda (mount) bir marta ishga tushadi."},
    {code:`function App(){\n  const [visible, setVisible] = useState(true);\n  return (\n    <div>\n      {visible ? <p>Ko'rinadi</p> : null}\n      <button onClick={() => setVisible(false)}>Yashir</button>\n    </div>\n  );\n}\n// tugma bosilgandan keyin`,
     opts:["\"Ko'rinadi\" matni ekranda qoladi","\"Ko'rinadi\" matni ekrandan yo'qoladi","Sahifa xato beradi","Tugma yo'qoladi"], correct:1,
     explain:"Tugma bosilganda 'visible' false bo'ladi, shart operatori 'null' qaytaradi va React null'ni hech narsa ko'rsatmaydi — matn ekrandan yo'qoladi."},
    {code:`function Greeting({name = "Mehmon"}) {\n  return <p>Salom, {name}!</p>;\n}\n// <Greeting /> chaqirilganda (prop berilmagan)`,
     opts:["\"Salom, undefined!\"","\"Salom, Mehmon!\"","Xato chiqadi","\"Salom, !\""], correct:1,
     explain:"Prop uzatilmasa, 'name = \"Mehmon\"' orqali belgilangan standart (default) qiymat ishlatiladi."},
    {code:`const [items, setItems] = useState(["olma", "nok"]);\nconsole.log(items.length);`,
     opts:["0","undefined","1","2"], correct:3, explain:"Boshlang'ich holat massivida ikkita element bor ('olma' va 'nok'), shuning uchun .length 2 ga teng."},
    {code:`function App(){\n  const style = {color: "red", fontSize: "20px"};\n  return <p style={style}>Salom</p>;\n}`,
     opts:["Xato chiqadi, style obyekt bo'lishi mumkin emas","Matn qizil rangda va 20px o'lchamda chiqadi","Matn o'zgarishsiz chiqadi","Faqat rang qo'llanadi, o'lcham qo'llanmaydi"], correct:1,
     explain:"JSX'da 'style' atributiga JavaScript obyekti beriladi (kalitlar camelCase'da, masalan fontSize) — u to'g'ridan-to'g'ri inline stil sifatida qo'llanadi."},
    {code:`function App(){\n  const nums = [1, 2, 3];\n  return <p>{nums.filter(n => n > 1).length}</p>;\n}`,
     opts:["3","1","0","2"], correct:3, explain:"'.filter(n => n > 1)' faqat 1 dan katta sonlarni qoldiradi: [2, 3] — uzunligi 2."},
    {code:`function App(){\n  const [on, setOn] = useState(false);\n  return <button>{on ? "Yoqilgan" : "O'chirilgan"}</button>;\n}\n// dastlabki (birinchi) render`,
     opts:["\"Yoqilgan\"","\"O'chirilgan\"","Bo'sh","Xato chiqadi"], correct:1,
     explain:"Boshlang'ich holat 'on = false', shuning uchun shart operatori dastlab \"O'chirilgan\" matnini tanlaydi."},
    {code:`const arr = [1, 2, 3];\nfunction App(){\n  return <ul>{arr.map((n,i) => <li key={i}>{n*n}</li>)}</ul>;\n}`,
     opts:["1 ta <li>","2 ta <li>","3 ta <li>","Xato chiqadi"], correct:2,
     explain:"'.map()' massivning har bir elementi uchun bittadan <li> yaratadi — 3 elementli massiv uchun 3 ta <li> chiqadi (1, 4, 9 qiymatlari bilan)."},
    {code:`function App(){\n  const [count] = useState(5);\n  return <p>{count > 3 ? "Katta" : "Kichik"}</p>;\n}`,
     opts:["\"Kichik\"","\"Katta\"","\"5\"","Xato chiqadi"], correct:1,
     explain:"count qiymati 5, u 3 dan katta bo'lgani uchun shart operatori \"Katta\" matnini tanlaydi."},
    {code:`function App(){\n  return <p>{1 + 1}</p>;\n}`,
     opts:["\"1 + 1\"","2","\"11\"","Xato chiqadi"], correct:1,
     explain:"JSX ichidagi {} JavaScript ifodasini bildiradi — '1 + 1' hisoblanib, natijada son 2 ekranga chiqadi."},
    {code:`function App(){\n  const arr = [];\n  return <p>{arr.length === 0 ? "Bo'sh" : "To'la"}</p>;\n}`,
     opts:["\"To'la\"","\"Bo'sh\"","0","Xato chiqadi"], correct:1,
     explain:"Bo'sh massivning '.length' qiymati 0, shart operatori '0 === 0' true bo'lgani uchun \"Bo'sh\" matni tanlanadi."},
  ],
  backend: [
    {code:`app.get('/hello', (req, res) => {\n  res.send("Salom!");\n});\n// GET /hello`,
     opts:["404 xatolik","'Salom!' matnli javob","Bo'sh javob","500 xatolik"], correct:1,
     explain:"Marshrut (route) to'g'ri sozlangan, shuning uchun /hello ga GET so'rov yuborilganda 'Salom!' matni qaytariladi."},
    {code:`const arr = [1, 2, 3];\nconst json = JSON.stringify(arr);\nconsole.log(json);`,
     opts:["[1,2,3] (massiv sifatida)","\"[1,2,3]\" (matn/string sifatida)","Xato chiqadi","undefined"], correct:1,
     explain:"JSON.stringify() JavaScript qiymatini JSON formatidagi MATNGA (string) aylantiradi."},
    {code:`app.get('/users/:id', (req, res) => {\n  res.send(req.params.id);\n});\n// GET /users/42`,
     opts:["'id' matni","'42'","Bo'sh javob","Xato"], correct:1,
     explain:"req.params.id URL'dagi ':id' o'rniga qo'yilgan haqiqiy qiymatni oladi — bu yerda '42'."},
    {code:`SELECT COUNT(*) FROM users WHERE age > 18;\n// jadvalda 5ta 20 yoshli, 3ta 15 yoshli bor`,
     opts:["8","5","3","0"], correct:1,
     explain:"Faqat 18 yoshdan katta foydalanuvchilar sanaladi — bu yerda 5 nafar 20 yoshli foydalanuvchi shartga mos keladi."},
    {code:`let count = 0;\nfunction handler(req, res) {\n  count++;\n  res.send(String(count));\n}\n// ketma-ket 3 marta so'rov yuborilsa`,
     opts:["'1'","'3'","'0'","Xato"], correct:1,
     explain:"'count' server xotirasida saqlanadi va har so'rovda oshadi — 3-so'rovda u 3 ga teng bo'ladi."},
    {code:`// app.use(express.json()) yozilmagan\napp.post('/data', (req, res) => {\n  console.log(req.body);\n});`,
     opts:["Hammasi normal ishlaydi","req.body odatda 'undefined' bo'lib qoladi","Server ishga tushmaydi","Avtomatik xato tuzatiladi"], correct:1,
     explain:"express.json() middleware'i JSON so'rov tanasini o'qib, req.body'ga joylashtiradi; u ulanmasa, req.body odatda aniqlanmagan (undefined) bo'lib qoladi."},
    {code:`app.delete('/items/:id', (req, res) => {\n  res.send('O\\'chirildi: ' + req.params.id);\n});\n// DELETE /items/7`,
     opts:["\"O'chirildi: id\"","\"O'chirildi: 7\"","Bo'sh javob","Xato"], correct:1,
     explain:"req.params.id URL'dagi ':id' o'rniga qo'yilgan haqiqiy qiymatni oladi — bu yerda '7'."},
    {code:`const obj = { name: "Ali", age: 20 };\nconst { name } = obj;\nconsole.log(name);`,
     opts:["undefined","{name: \"Ali\"}","obj","\"Ali\""], correct:3,
     explain:"Bu — destrukturizatsiya (destructuring): '{name} = obj' obyektdagi 'name' xossasini alohida o'zgaruvchiga ('Ali' qiymati bilan) ajratib oladi."},
    {code:`app.use((req, res, next) => {\n  console.log("So'rov keldi:", req.method);\n  next();\n});`,
     opts:["Har so'rovda ishga tushadi va keyingisiga o'tkazadi","Bu faqat bitta marta ishlaydi","'next()' shart emas edi","Bu kod xato beradi"], correct:0,
     explain:"app.use() bilan ro'yxatga olingan middleware HAR BIR so'rovda ishga tushadi; 'next()' chaqiruvi ishlovni keyingi middleware/handler'ga uzatadi."},
    {code:`function add(a, b) {\n  return a + b;\n}\nmodule.exports = add;\n// boshqa faylda: const add = require('./add');\nconsole.log(add(2, 3));`,
     opts:["Xato chiqadi","undefined","5","'2''3'"], correct:2,
     explain:"module.exports orqali eksport qilingan funksiya boshqa faylda require() bilan olinib, oddiy funksiyadek chaqiriladi: 2+3=5."},
    {code:`const items = [{id:1,price:10},{id:2,price:20}];\nconst total = items.reduce((sum, i) => sum + i.price, 0);\nconsole.log(total);`,
     opts:["\"1020\"","0","30","[10, 20]"], correct:2,
     explain:"'.reduce()' massivdagi barcha elementlarni bitta qiymatga \"yig'adi\" — bu yerda narxlarni qo'shib: 10+20=30."},
    {code:`app.get('/status', (req, res) => {\n  res.status(404).send("Topilmadi");\n});\n// GET /status`,
     opts:["Status 200, matn \"Topilmadi\"","Status 404, matn \"Topilmadi\"","Status 500, bo'sh javob","Xato beradi"], correct:1,
     explain:"'.status(404)' javobning HTTP status kodini 404 ga o'rnatadi, '.send(...)' esa javob tanasini yuboradi — natijada status 404 va matn \"Topilmadi\" qaytadi."},
    {code:`const arr = ['a', 'b', 'c'];\nconsole.log(arr.indexOf('b'));`,
     opts:["0","2","-1","1"], correct:3, explain:"'.indexOf()' berilgan qiymatning massivdagi indeksini qaytaradi — 'b' massivda 1-indeksda (ikkinchi o'rinda) turibdi."},
    {code:`app.get('/square/:n', (req, res) => {\n  const n = Number(req.params.n);\n  res.send(String(n * n));\n});\n// GET /square/4`,
     opts:["\"4\"","\"8\"","\"16\"","Xato"], correct:2,
     explain:"req.params.n — \"4\" (matn), Number() bilan songa aylantiriladi. 4*4=16, String() bilan yana matnga aylantirilib, \"16\" javob sifatida yuboriladi."},
    {code:`let user = {name: "Ali"};\nuser.age = 20;\nconsole.log(user);`,
     opts:["{name: \"Ali\"}","Xato beradi","undefined","{name: \"Ali\", age: 20}"], correct:3,
     explain:"JavaScript obyektlariga keyinchalik yangi xossa (property) qo'shish mumkin — 'user.age = 20' obyektga 'age' xossasini qo'shadi."},
    {code:`async function getData(){\n  return 5;\n}\ngetData().then(v => console.log(v));`,
     opts:["Promise {5}","undefined","Xato beradi","5"], correct:3,
     explain:"async funksiya doim Promise qaytaradi, lekin '.then()' o'sha Promise ICHIDAGI qiymatni ('resolve' qilingan natijani) beradi — bu yerda 5."},
    {code:`console.log(Math.round(4.6));`,
     opts:["4","5","4.6","Xato"], correct:1, explain:"Math.round() eng yaqin butun songa yaxlitlaydi — 4.6 esa 5'ga yaqinroq."},
    {code:`const arr = [3, 1, 2];\nconsole.log(arr.sort((a,b) => a-b));`,
     opts:["[3,1,2]","[1,2,3]","[3,2,1]","Xato"], correct:1, explain:"(a,b)=>a-b funksiyasi sonlarni o'sish tartibida solishtiradi — natija [1,2,3] bo'ladi."},
    {code:`app.get('/ping', (req, res) => {\n  res.json({ok: true});\n});\n// GET /ping`,
     opts:["Matnli \"ok\" javobi","JSON: {ok:true}","Bo'sh javob","404 xato"], correct:1,
     explain:"res.json() berilgan obyektni JSON formatida qaytaradi — bu yerda {ok:true}."},
  ],
};

function viewRoundQuiz(kind){
  const t = L()[kind], c = L().common;
  state.rq = state.rq || {};
  const rq = state.rq[kind] = state.rq[kind] || {subject:null};
  if(!rq.subject){
    const subjT = L().subjects;
    return `
    <div class="wrap section">
      <div class="section-head">
        <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
        <h2>${esc(t.chooseSubj)}</h2>
        <p class="lead">${esc(t.pickLead)}</p>
      </div>
      ${rqSubjectPickHtml(subjT)}
      <div style="text-align:center;margin-top:22px"><button class="btn btn-outline" data-nav="foydali">${esc(c.back)}</button></div>
    </div>`;
  }
  const subjName = L().subjects[rq.subject] || "";
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)} · ${esc(subjName)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div id="rqArea" style="max-width:560px;margin:0 auto;text-align:center">
      <button class="btn btn-brand btn-lg" id="rqStartBtn">${esc(t.start)}</button>
    </div>
    <div style="text-align:center;margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-outline" id="rqChangeSubjBtn">${esc(t.changeSubj)}</button>
      <button class="btn btn-outline" data-nav="foydali">${esc(c.back)}</button>
    </div>
  </div>`;
}
function wireRoundQuiz(kind){
  const rq = state.rq && state.rq[kind];
  if(!rq || !rq.subject){
    document.querySelectorAll("[data-rqsubj]").forEach(b=>b.addEventListener("click", ()=>{
      state.rq = state.rq || {};
      state.rq[kind] = {subject:b.dataset.rqsubj};
      render();
    }));
    return;
  }
  const startBtn = document.getElementById("rqStartBtn");
  if(startBtn) startBtn.addEventListener("click", ()=>{ ensureAudioCtx(); stopDefeatAudio(); stopVictoryAudio(); startRoundQuiz(kind); });
  const changeBtn = document.getElementById("rqChangeSubjBtn");
  if(changeBtn) changeBtn.addEventListener("click", ()=>{ state.rq[kind] = {subject:null}; render(); });
}
function rqBank(kind){
  const subj = (state.rq && state.rq[kind] && state.rq[kind].subject) || "js";
  const banks = kind==="detektiv" ? CODE_DETECTIVE_BANKS : kind==="rostyolgon" ? TRUE_FALSE_BANKS : CODE_QUIZ_BANKS;
  return banks[subj] || banks.js;
}
function startRoundQuiz(kind){
  const bank = rqBank(kind);
  // Pull 10 questions from the (11-12-per-subject) bank each round, shuffled, so
  // students still see a randomized subset/order (not always the exact same 10)
  // while completing a full round takes 10 correct-or-wrong answers as before.
  const order = shuffle(bank.map((_,i)=>i)).slice(0, Math.min(10, bank.length));
  rqState = {kind, order, idx:0, score:0, wrong:0, livesMax:3, answered:false};
  renderRqQuestion();
}
function renderRqQuestion(){
  const area = document.getElementById("rqArea");
  if(!area || !rqState) return;
  const t = L()[rqState.kind];
  const bank = rqBank(rqState.kind);
  const item = bank[rqState.order[rqState.idx]];
  const codeHtml = item.code ? `<pre class="code-block">${esc(item.code)}</pre>` : "";
  let promptText, optsHtml;
  if(rqState.kind==="rostyolgon"){
    promptText = item.stmt;
    optsHtml = `<div class="mcq-opts">
      <button class="mcq-opt" data-rq="1">${icon("checkCircle",16,"var(--ok)")} ${esc(t.trueBtn)}</button>
      <button class="mcq-opt" data-rq="0">${icon("x",16,"var(--danger)")} ${esc(t.falseBtn)}</button>
    </div>`;
  } else {
    promptText = rqState.kind==="kodquiz" ? t.resultQ : t.prompt;
    optsHtml = `<div class="mcq-opts">${item.opts.map((o,i)=>`<button class="mcq-opt" data-rq="${i}">${esc(o)}</button>`).join("")}</div>`;
  }
  area.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:13px;color:var(--muted)">
      <span class="mono">${esc(t.question(rqState.idx+1))}</span>
      <span id="rqLivesDisp">${renderLives({livesMax:rqState.livesMax, wrongStreak:rqState.wrong})}</span>
      <span class="mono" style="color:var(--edu)">${esc(t.scoreLabel)}: ${rqState.score}</span>
    </div>
    ${codeHtml}
    <div class="q-text" style="font-size:16px;text-align:left">${esc(promptText)}</div>
    ${optsHtml}
    <div id="rqExplain" style="margin-top:12px;text-align:left"></div>
  `;
  rqState.answered = false;
  document.querySelectorAll("[data-rq]").forEach(btn=>btn.addEventListener("click", ()=>onRqAnswer(btn)));
}
// Correct answers just flash green and auto-advance — nothing to read, no need to
// stop and click. Wrong answers show the explanation and pause for a "Keyingisi"
// click so there's time to read it (or "Natijani ko'rish" if that was the last life).
function onRqAnswer(btn){
  if(!rqState || rqState.answered) return;
  rqState.answered = true;
  const bank = rqBank(rqState.kind);
  const item = bank[rqState.order[rqState.idx]];
  const given = Number(btn.dataset.rq);
  const correctIdx = rqState.kind==="rostyolgon" ? (item.answer?1:0) : item.correct;
  const correct = given===correctIdx;
  if(correct) rqState.score++; else rqState.wrong++;
  document.querySelectorAll("[data-rq]").forEach(b=>{
    b.disabled = true;
    const bi = Number(b.dataset.rq);
    if(bi===correctIdx) b.classList.add("opt-correct");
    else if(bi===given) b.classList.add("opt-wrong");
  });
  const livesEl = document.getElementById("rqLivesDisp");
  if(livesEl) livesEl.innerHTML = renderLives({livesMax:rqState.livesMax, wrongStreak:rqState.wrong});

  if(correct){
    setTimeout(()=>{ if(rqState) advanceRq(); }, 550);
    return;
  }
  const outOfLives = rqState.wrong >= rqState.livesMax;
  const t = L()[rqState.kind];
  const explainEl = document.getElementById("rqExplain");
  if(explainEl){
    if(outOfLives){
      // 3-chi (oxirgi) jon ketganda "Natijani ko'rish" tugmasini bosishga hojat
      // qoldirmaymiz — izohni ko'rsatib, natija ekraniga avtomatik o'tamiz.
      explainEl.innerHTML = `<p style="color:var(--muted);font-size:13.5px;background:var(--surface-2);border-radius:10px;padding:10px 12px;margin:0 0 10px">${esc(item.explain)}</p>`;
      setTimeout(()=>{ if(rqState) finishRq(false); }, 1400);
    }else{
      explainEl.innerHTML = `<p style="color:var(--muted);font-size:13.5px;background:var(--surface-2);border-radius:10px;padding:10px 12px;margin:0 0 10px">${esc(item.explain)}</p>
        <button class="btn btn-brand" id="rqNextBtn">${esc(t.nextBtn)}</button>`;
      document.getElementById("rqNextBtn").addEventListener("click", ()=> advanceRq());
    }
  }
}
function advanceRq(){
  if(!rqState) return;
  rqState.idx++;
  if(rqState.idx >= rqState.order.length){ finishRq(true); return; }
  renderRqQuestion();
}
function finishRq(won){
  const t = L()[rqState.kind];
  // On a win, advanceRq() already incremented idx past the last question
  // (idx === order.length), so attempted is just order.length; on a loss,
  // idx still points at the question just answered (0-based), so +1.
  const attempted = won ? rqState.order.length : rqState.idx + 1;
  stopMusic();
  if(won) playVictoryJingle(false); else playDefeatJingle();
  const area = document.getElementById("rqArea");
  if(!area) return;
  area.innerHTML = `
    <div class="card result-banner">
      <span class="trophy">${won?icon("trophy",34,"var(--brand)"):icon("heartBroken",34,"var(--danger)")}</span>
      <h2>${won?icon("sparkles",22,"var(--brand)"):icon("frown",22,"var(--danger)")} ${won?esc(t.won):esc(t.lost)}</h2>
      <p style="color:var(--muted)">${esc(t.yourScore(rqState.score, attempted))}</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-brand btn-lg" id="rqAgainBtn">${icon("replay",18)} ${esc(t.playAgain)}</button>
        <button class="btn btn-outline btn-lg" id="rqChangeSubjBtn2">${esc(t.changeSubj)}</button>
        <button class="btn btn-outline btn-lg" id="rqToListBtn">${esc(t.toList)}</button>
      </div>
    </div>`;
  document.getElementById("rqAgainBtn").addEventListener("click", ()=>{ ensureAudioCtx(); stopDefeatAudio(); stopVictoryAudio(); startRoundQuiz(rqState.kind); });
  document.getElementById("rqChangeSubjBtn2").addEventListener("click", ()=>{ stopDefeatAudio(); stopVictoryAudio(); const k=rqState.kind; state.rq = state.rq || {}; state.rq[k] = {subject:null}; rqState = null; navigate(k); });
  document.getElementById("rqToListBtn").addEventListener("click", ()=>navigate("foydali"));
}

/* ===================== TEZ YOZISH (speed typing practice) ===================== */
const TYPING_WORDS = {
  uz: ["kitob","maktab","oila","do'st","shahar","qishloq","quyosh","oy","yulduz","daryo","tog'","dengiz","bog'","gul","daraxt","non","choy","osh","uy","mashina","telefon","kompyuter","internet","dastur","o'yin","musiqa","rasm","kino","sport","futbol","kutubxona","o'qituvchi","talaba","doktor","muhandis","dehqon","ishchi","bozor","do'kon","pul","vaqt","kun","tun","ertalab","kechqurun","hafta","yil","fasl","bahor","yoz","kuz","qish","yomg'ir","qor","shamol","bulut","osmon","suv","olma","sut","non","gap","so'z","fikr","ish","yo'l","gap","hayot","dunyo","inson","bola","ota","ona","aka","uka","opa","singil"],
  ru: ["книга","школа","семья","друг","город","село","солнце","луна","звезда","река","гора","море","сад","цветок","дерево","хлеб","чай","дом","машина","телефон","компьютер","интернет","программа","игра","музыка","картина","кино","спорт","футбол","библиотека","учитель","студент","врач","инженер","фермер","рабочий","рынок","магазин","деньги","время","день","ночь","утро","вечер","неделя","год","сезон","весна","лето","осень","зима","дождь","снег","ветер","облако","небо","вода","яблоко","молоко","слово","мысль","работа","дорога","жизнь","мир","человек","ребёнок","отец","мать","брат","сестра","друзья","город"],
  en: ["book","school","family","friend","city","village","sun","moon","star","river","mountain","sea","garden","flower","tree","bread","tea","house","car","phone","computer","internet","program","game","music","picture","movie","sport","football","library","teacher","student","doctor","engineer","farmer","worker","market","shop","money","time","day","night","morning","evening","week","year","season","spring","summer","autumn","winter","rain","snow","wind","cloud","sky","water","apple","milk","word","thought","work","road","life","world","person","child","father","mother","brother","sister","friends","town"],
};
const TYPING_SENTENCES = {
  uz: [
    "Bilim - kelajakning eng ishonchli kaliti.",
    "Har kuni ozgina o'rgansang, bir yilda katta natijaga erishasan.",
    "Dasturlash - zamonaviy dunyoning yangi tili hisoblanadi.",
    "Kitob o'qish miyani rivojlantiradi va tafakkurni kengaytiradi.",
    "Muvaffaqiyat sabr va mehnat natijasida keladi.",
    "Har bir mutaxassis avval o'quvchi bo'lgan.",
    "Texnologiya hayotimizni tubdan o'zgartirmoqda.",
    "Sog'lom turmush tarzi baxtli hayotning asosidir.",
    "Do'stlik - hayotdagi eng qadrli boylik.",
    "Vaqtni tejash - o'zingizni hurmat qilishdir.",
    "Har bir xato - yangi tajriba va saboqdir.",
    "Tabiatni asrash - kelajak avlodlar oldidagi burchimiz.",
    "Kompyuter fanlari tez sur'atlar bilan rivojlanmoqda.",
    "Intilish va sabr har qanday to'siqni yengadi.",
    "Yaxshi odat - muvaffaqiyatning eng ishonchli yo'ldoshi.",
    "Har bir kun yangi imkoniyatlar bilan boshlanadi.",
    "Bilim olish uchun yosh chegarasi yo'q.",
    "Aql va mehnat birlashsa, tog'larni ham qo'zg'atish mumkin.",
    "Internet dunyoni bir-biriga yaqinlashtirdi.",
    "Har bir katta ish kichik qadamdan boshlanadi.",
    "O'z ustida ishlagan inson doim oldinga intiladi.",
    "Sport tanani mustahkamlaydi, aqlni tetiklashtiradi.",
    "Yangi bilimlar hayotni yanada qiziqarli qiladi.",
    "Ertangi kun bugungi mehnatga bog'liqdir.",
    "Har bir inson o'z taqdirining ustasidir.",
  ],
  ru: [
    "Знание - самый надёжный ключ к будущему.",
    "Если учиться понемногу каждый день, через год будет большой результат.",
    "Программирование - это новый язык современного мира.",
    "Чтение книг развивает мозг и расширяет мышление.",
    "Успех приходит благодаря терпению и труду.",
    "Каждый специалист когда-то был учеником.",
    "Технологии кардинально меняют нашу жизнь.",
    "Здоровый образ жизни - основа счастливой жизни.",
    "Дружба - самое ценное богатство в жизни.",
    "Беречь время - значит уважать себя.",
    "Каждая ошибка - это новый опыт и урок.",
    "Беречь природу - наш долг перед будущими поколениями.",
    "Компьютерные науки развиваются очень быстрыми темпами.",
    "Стремление и терпение преодолевают любые преграды.",
    "Хорошая привычка - самый надёжный спутник успеха.",
    "Каждый день начинается с новых возможностей.",
    "Для получения знаний нет возрастных ограничений.",
    "Когда ум и труд объединяются, можно сдвинуть горы.",
    "Интернет сблизил весь мир.",
    "Любое большое дело начинается с маленького шага.",
    "Человек, работающий над собой, всегда идёт вперёд.",
    "Спорт укрепляет тело и бодрит разум.",
    "Новые знания делают жизнь ещё интереснее.",
    "Завтрашний день зависит от сегодняшнего труда.",
    "Каждый человек - хозяин своей судьбы.",
  ],
  en: [
    "Knowledge is the most reliable key to the future.",
    "If you learn a little every day, you will see great results in a year.",
    "Programming is the new language of the modern world.",
    "Reading books develops the mind and broadens thinking.",
    "Success comes through patience and hard work.",
    "Every expert was once a beginner.",
    "Technology is changing our lives in fundamental ways.",
    "A healthy lifestyle is the foundation of a happy life.",
    "Friendship is one of the most valuable treasures in life.",
    "Saving time means respecting yourself.",
    "Every mistake is a new experience and a lesson.",
    "Protecting nature is our duty to future generations.",
    "Computer science is developing at a very fast pace.",
    "Determination and patience overcome any obstacle.",
    "A good habit is the most reliable companion of success.",
    "Every day begins with new opportunities.",
    "There is no age limit for gaining knowledge.",
    "When mind and effort combine, mountains can be moved.",
    "The internet has brought the whole world closer together.",
    "Every big task begins with a small step.",
    "A person who works on themselves always moves forward.",
    "Sport strengthens the body and sharpens the mind.",
    "New knowledge makes life even more interesting.",
    "Tomorrow depends on today's effort.",
    "Every person is the master of their own fate.",
  ],
};
const TYPING_CONJ = {
  uz: {conj:"va", orWord:"yoki", qWord:"Savol"},
  ru: {conj:"и", orWord:"или", qWord:"Вопрос"},
  en: {conj:"and", orWord:"or", qWord:"Question"},
};
const TYPING_LENGTHS = [{id:"short", words:20}, {id:"medium", words:40}, {id:"long", words:70}];
function typingCap(s){ return s.length ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
function typingPickWord(lang){ const pool = TYPING_WORDS[lang] || TYPING_WORDS.uz; return pool[randInt(0,pool.length-1)]; }
function buildPunctTemplates(conj, orWord, qWord){
  return [
    (w)=>`${typingCap(w())}, ${w()} ${conj} ${w()}!`,
    (w)=>`"${typingCap(w())}" — ${w()} (${randInt(10,99)}%).`,
    (w)=>`${typingCap(w())}: ${w()}, ${w()}...`,
    (w)=>`${randInt(1,50)}-${randInt(51,100)}: ${w()}.`,
    (w)=>`${typingCap(w())} & ${w()} @ ${w()}`,
    (w)=>`${typingCap(w())} (${w()}/${w()}) — ${randInt(1,100)}%`,
    (w)=>`${typingCap(w())}-${w()}, ${randInt(1,20)}x.`,
    (w)=>`${typingCap(w())} = ${w()} + ${w()}?`,
    (w)=>`${qWord}: ${w()} ${orWord} ${w()}?`,
  ];
}
function generateWordsText(lang, count){
  const arr = [];
  for(let i=0;i<count;i++) arr.push(typingPickWord(lang));
  return arr.join(" ");
}
function generatePunctText(lang, approxWords){
  const cj = TYPING_CONJ[lang] || TYPING_CONJ.uz;
  const templates = buildPunctTemplates(cj.conj, cj.orWord, cj.qWord);
  const w = ()=>typingPickWord(lang);
  let words=0, parts=[];
  while(words<approxWords){
    const tpl = templates[randInt(0,templates.length-1)];
    const frag = tpl(w);
    parts.push(frag);
    words += frag.split(/\s+/).length;
  }
  return parts.join(" ");
}
function generateSentenceText(lang, approxWords){
  const pool = (TYPING_SENTENCES[lang] || TYPING_SENTENCES.uz).slice();
  for(let i=pool.length-1;i>0;i--){ const j=randInt(0,i); const tmp=pool[i]; pool[i]=pool[j]; pool[j]=tmp; }
  let words=0, parts=[];
  for(const s of pool){
    if(words>=approxWords) break;
    parts.push(s);
    words += s.split(/\s+/).length;
  }
  if(!parts.length) parts.push(pool[0]);
  return parts.join(" ");
}
function generateTypingPassage(mode, lang, lengthId){
  const len = TYPING_LENGTHS.find(l=>l.id===lengthId) || TYPING_LENGTHS[0];
  if(mode==="random") return generateWordsText(lang, len.words);
  if(mode==="punct") return generatePunctText(lang, len.words);
  if(mode==="dict") return generateSentenceText(lang, len.words);
  return "";
}
let typingTimerHandle = null;
function viewTypingSetup(){
  const t = L().tezyozish;
  const s = state.typing || {mode:null, length:null, customText:""};
  state.typing = s;
  const stepNum = !s.mode ? 1 : 2;
  const MODES = [
    {id:"random", name:t.modeRandom, desc:t.modeRandomDesc},
    {id:"punct", name:t.modePunct, desc:t.modePunctDesc},
    {id:"dict", name:t.modeDict, desc:t.modeDictDesc},
    {id:"custom", name:t.modeCustom, desc:t.modeCustomDesc},
  ];
  return `
  <div class="wrap section">
    <div class="section-head">
      <div class="eyebrow" style="color:var(--edu)">${esc(t.eyebrow)}</div>
      <h2>${esc(t.h2)}</h2>
      <p class="lead">${esc(t.lead)}</p>
    </div>
    <div class="steps">
      <div class="step-pill ${stepNum===1?'active':s.mode?'done':''}">${esc(t.step1)}</div>
      <div class="step-pill ${stepNum===2?'active':''}">${esc(t.step2)}</div>
    </div>
    ${stepNum===1 ? `
    <div class="typing-mode-grid">
      ${MODES.map(m=>`<button class="pick" data-typingmode="${m.id}"><b>${esc(m.name)}</b><span>${esc(m.desc)}</span></button>`).join("")}
    </div>` : s.mode==="custom" ? `
    <div class="card pad" style="max-width:520px">
      <p style="color:var(--muted);margin-bottom:10px">${esc(t.customLabel)}</p>
      <textarea id="typingCustomInput" rows="5" placeholder="${esc(t.customPh)}" style="margin-bottom:6px;resize:none">${esc(s.customText||"")}</textarea>
      <p id="typingCustomErr" style="color:var(--danger);font-size:12.5px;min-height:16px"></p>
      <button class="btn btn-brand btn-block btn-lg" id="typingStartBtn">${icon('zap',18)} ${esc(t.startBtn)}</button>
      <button class="btn btn-outline btn-block" id="typingBackMode" style="margin-top:10px">${esc(t.backMode)}</button>
    </div>` : `
    <div class="diff-grid">
      ${TYPING_LENGTHS.map(l=>`<button class="pick" data-typinglen="${l.id}"><b>${esc(t["len"+typingCap(l.id)])}</b><span class="mono" style="color:var(--muted)">~${l.words} ${esc(t.wordsUnit)}</span></button>`).join("")}
    </div>
    <div style="margin-top:16px"><button class="btn btn-outline" id="typingBackMode">${esc(t.backMode)}</button></div>`}
  </div>`;
}
function startTypingGame(mode, lengthId, customText){
  const s = state.typing || {};
  s.mode = mode;
  s.length = lengthId;
  s.passage = mode==="custom" ? customText : generateTypingPassage(mode, state.lang, lengthId);
  s.typed = "";
  s.wrongPending = false;
  s.totalMistakes = 0;
  s.startedAt = null;
  s.finished = false;
  state.typing = s;
  navigate("typing-play");
}
function restartTypingSamePassage(){
  const s = state.typing;
  if(!s) return;
  s.typed = "";
  s.wrongPending = false;
  s.totalMistakes = 0;
  s.startedAt = null;
  s.finished = false;
  navigate("typing-play");
}
function renderTypingPassageHtml(passage, typed){
  let html = "";
  for(let i=0;i<passage.length;i++){
    if(i===typed.length) html += '<span class="tcaret"></span>';
    const ch = passage[i];
    let cls = "tch";
    if(i<typed.length){ cls += typed[i]===ch ? " ok" : " bad"; }
    html += `<span class="${cls}">${esc(ch)}</span>`;
  }
  if(typed.length>=passage.length) html += '<span class="tcaret"></span>';
  return html;
}
function computeTypingStats(s){
  const typed = s.typed || "";
  const correctLen = s.wrongPending ? typed.length-1 : typed.length;
  const elapsedSec = s.startedAt ? (Date.now()-s.startedAt)/1000 : 0;
  const wpm = elapsedSec>0.05 ? Math.round((correctLen/5)/(elapsedSec/60)) : 0;
  const totalAttempts = correctLen + (s.totalMistakes||0);
  const accuracy = totalAttempts>0 ? Math.round(correctLen/totalAttempts*100) : 100;
  return {elapsedSec, correctLen, wpm, accuracy};
}
function viewTypingPlay(){
  const s = state.typing, t = L().tezyozish;
  if(!s || !s.passage) return `<div class="center-note">—</div>`;
  const typed = s.typed || "";
  const stats = computeTypingStats(s);
  const modeLabel = s.mode==="random" ? t.modeRandom : s.mode==="punct" ? t.modePunct : s.mode==="dict" ? t.modeDict : t.modeCustom;
  return `
  <div class="wrap section" style="padding-top:24px;max-width:800px;margin:0 auto">
    <div class="typing-console">
      <div class="typing-console-bar">
        <div>
          <div class="typing-console-tag">${esc(modeLabel)}</div>
          <button class="typing-leave" data-nav="home">« ${esc(t.leaveBtn)}</button>
        </div>
        <div class="typing-status-dark">${icon('zap',15)} <b id="typingWpm">${stats.wpm}</b> ${esc(t.wpmLabel)}</div>
      </div>
      <div class="typing-passage" id="typingPassage">${renderTypingPassageHtml(s.passage, typed)}</div>
      <input type="text" id="typingInput" class="typing-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus placeholder="${esc(t.typingPh)}" value="${esc(typed)}">
      <div class="typing-console-footer"><span id="typingAcc">${stats.accuracy}%</span> ${esc(t.accLabel)} · <span id="typingTime">${Math.floor(stats.elapsedSec)}s</span> ${esc(t.timeLabel)}</div>
    </div>
  </div>`;
}
function onTypingInput(e){
  const s = state.typing;
  if(!s || s.finished) return;
  const oldVal = s.typed || "";
  const newVal = e.target.value;

  if(newVal.length < oldVal.length){
    // backspacing/deleting is always allowed, so the player can fix a mistake
    s.typed = newVal;
    s.wrongPending = newVal.length>0 && newVal[newVal.length-1] !== s.passage[newVal.length-1];
  } else if(newVal.length > oldVal.length){
    if(s.wrongPending){
      // an uncorrected mistake is already showing — block further forward typing
      // until it's fixed (backspaced), so the player can't skip past an error.
      e.target.value = oldVal;
      return;
    }
    const addedChar = newVal.charAt(oldVal.length);
    const expected = s.passage.charAt(oldVal.length);
    s.typed = oldVal + addedChar;
    if(addedChar === expected){
      s.wrongPending = false;
    } else {
      s.wrongPending = true;
      s.totalMistakes = (s.totalMistakes||0) + 1;
    }
    e.target.value = s.typed; // trims any extra pasted/IME characters beyond the one accepted
  } else {
    s.typed = newVal;
    s.wrongPending = newVal.length>0 && newVal[newVal.length-1] !== s.passage[newVal.length-1];
  }

  if(!s.startedAt && s.typed.length>0) s.startedAt = Date.now();

  const stats = computeTypingStats(s);
  const passageEl = document.getElementById("typingPassage");
  if(passageEl) passageEl.innerHTML = renderTypingPassageHtml(s.passage, s.typed);
  const wpmEl = document.getElementById("typingWpm"); if(wpmEl) wpmEl.textContent = stats.wpm;
  const accEl = document.getElementById("typingAcc"); if(accEl) accEl.textContent = stats.accuracy+"%";
  const timeEl = document.getElementById("typingTime"); if(timeEl) timeEl.textContent = Math.floor(stats.elapsedSec)+"s";

  if(!s.wrongPending && s.typed.length >= s.passage.length){
    finishTypingGame();
  }
}
function wireTypingPlay(){
  const inputEl = document.getElementById("typingInput");
  if(!inputEl) return;
  const focusInput = ()=>{ try{ inputEl.focus({preventScroll:true}); const len=inputEl.value.length; inputEl.setSelectionRange(len,len); }catch(e){} };
  focusInput();
  requestAnimationFrame(focusInput);
  inputEl.addEventListener("input", onTypingInput);
  inputEl.addEventListener("paste", (e)=>{ e.preventDefault(); });
  const consoleEl = document.querySelector(".typing-console");
  if(consoleEl) consoleEl.addEventListener("click", (e)=>{ if(!e.target.closest(".typing-leave")) focusInput(); });
  if(typingTimerHandle) clearInterval(typingTimerHandle);
  typingTimerHandle = setInterval(()=>{
    const s = state.typing;
    if(!s || s.finished || state.route!=="typing-play"){ clearInterval(typingTimerHandle); typingTimerHandle=null; return; }
    if(!s.startedAt) return;
    const stats = computeTypingStats(s);
    const timeEl = document.getElementById("typingTime");
    if(timeEl) timeEl.textContent = Math.floor(stats.elapsedSec)+"s";
    const wpmEl = document.getElementById("typingWpm");
    if(wpmEl) wpmEl.textContent = stats.wpm;
  }, 500);
}
function finishTypingGame(){
  const s = state.typing;
  if(!s || s.finished) return;
  s.finished = true;
  if(typingTimerHandle){ clearInterval(typingTimerHandle); typingTimerHandle=null; }
  const stats = computeTypingStats(s);
  s.finalWpm = stats.wpm;
  s.finalAcc = stats.accuracy;
  s.finalTime = Math.max(1, Math.round(stats.elapsedSec));
  s.mistakes = s.totalMistakes||0;
  stopMusic();
  if(s.finalWpm>=40 && s.finalAcc>=90) playVictoryJingle(false);
  navigate("typing-result");
}
function typingRatingText(t, wpm){
  if(wpm>=60) return t.ratingGreat;
  if(wpm>=40) return t.ratingGood;
  if(wpm>=20) return t.ratingOk;
  return t.ratingSlow;
}
function viewTypingResult(){
  const s = state.typing, t = L().tezyozish;
  if(!s || !s.finished) return `<div class="center-note">—</div>`;
  return `
  <div class="wrap section">
    <div class="card result-banner">
      <span class="trophy">${icon('zap',34,'var(--edu)')}</span>
      <h2>${esc(typingRatingText(t, s.finalWpm))}</h2>
      <div class="typing-stats" style="margin-top:10px">
        <div class="typing-stat"><b>${s.finalWpm}</b><span>${esc(t.wpmLabel)}</span></div>
        <div class="typing-stat"><b>${s.finalAcc}%</b><span>${esc(t.accLabel)}</span></div>
        <div class="typing-stat"><b>${s.finalTime}s</b><span>${esc(t.timeLabel)}</span></div>
        <div class="typing-stat"><b>${s.mistakes}</b><span>${esc(t.mistakeLabel)}</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-brand btn-lg" id="typingRetryBtn">${icon('replay',18)} ${esc(t.retryBtn)}</button>
        <button class="btn btn-outline btn-lg" id="typingNewBtn">${icon('zap',18)} ${esc(t.newBtn)}</button>
        <button class="btn btn-outline btn-lg" data-nav="foydali">${esc(t.toList)}</button>
      </div>
    </div>
  </div>`;
}

/* ===================== AUTH MODAL ===================== */
function openAuth(tab){
  state.authTab = tab || "login";
  state.authErr = "";
  if(state.mobileNavOpen){ state.mobileNavOpen = false; renderNav(); }
  renderModal();
}
function closeModal(){
  document.getElementById("modal-root").innerHTML = "";
}
function renderModal(){
  const tab = state.authTab;
  const t = L().auth;
  document.getElementById("modal-root").innerHTML = `
  <div class="modal-bg" id="modalBg">
    <div class="modal" style="position:relative">
      <button class="close-x" id="modalClose">${icon('x',16)}</button>
      <div class="modal-tabs">
        <button class="modal-tab ${tab==='login'?'active':''}" data-tab="login">${esc(t.loginTab)}</button>
        <button class="modal-tab ${tab==='register'?'active':''}" data-tab="register">${esc(t.registerTab)}</button>
      </div>
      ${state.authErr?`<div class="err-msg">${esc(state.authErr)}</div>`:""}
      ${tab==='login' ? `
        <div class="formrow"><label>${esc(t.emailLabel)}</label><input type="email" id="loginEmail"></div>
        <div class="formrow"><label>${esc(t.passLabel)}</label><input type="password" id="loginPass"></div>
        <button class="btn btn-brand btn-block btn-lg" id="doLogin">${esc(t.loginBtn)}</button>
      ` : `
        <div class="formrow"><label>${esc(t.nameLabel)}</label><input type="text" id="regName" maxlength="30"></div>
        <div class="formrow"><label>${esc(t.emailLabel)}</label><input type="email" id="regEmail"></div>
        <div class="formrow"><label>${esc(t.passLabel)}</label><input type="password" id="regPass" placeholder="${esc(t.passPh)}"></div>
        <div class="formrow"><label>${esc(t.roleLabel)}</label>
          <div class="role-row">
            <button type="button" class="role-opt ${state.authRole==='oquvchi'?'selected':''}" data-role="oquvchi">${icon('graduationCap',16,'var(--edu)')} ${esc(t.roleStudent)}</button>
            <button type="button" class="role-opt ${state.authRole==='oqituvchi'?'selected':''}" data-role="oqituvchi">${icon('teacher',16,'var(--purple)')} ${esc(t.roleTeacher)}</button>
          </div>
        </div>
        <button class="btn btn-brand btn-block btn-lg" id="doRegister">${esc(t.registerBtn)}</button>
      `}
    </div>
  </div>`;
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBg").addEventListener("click", e=>{ if(e.target.id==="modalBg") closeModal(); });
  document.querySelectorAll(".modal-tab").forEach(b=>b.addEventListener("click", ()=>{ state.authTab=b.dataset.tab; state.authErr=""; renderModal(); }));
  if(tab==='register'){
    document.querySelectorAll(".role-opt").forEach(b=>b.addEventListener("click", ()=>{ state.authRole=b.dataset.role; renderModal(); }));
    document.getElementById("doRegister").addEventListener("click", doRegister);
  } else {
    document.getElementById("doLogin").addEventListener("click", doLogin);
  }
}

async function doRegister(){
  const t = L().auth, c = L().common;
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value;
  if(!name || !email || pass.length<4){ state.authErr = t.errFill; renderModal(); return; }
  if(!state.dbReady){ state.authErr = t.errDbReg; renderModal(); return; }
  const key = emailKey(email);
  const btn = document.getElementById("doRegister"); btn.disabled=true; btn.textContent=c.loading;
  try{
    const ref = state.db.doc("users/"+key);
    const snap = await ref.get();
    if(snap.exists){ state.authErr = t.errTaken; renderModal(); return; }
    const hash = await sha256(pass+"::"+key);
    await ref.set({name, email, passwordHash:hash, role:state.authRole, createdAt:Date.now()});
    saveSession({name, email, role:state.authRole});
    closeModal(); renderNav(); render();
  }catch(e){ state.authErr = t.errGeneric; renderModal(); }
}
async function doLogin(){
  const t = L().auth, c = L().common;
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;
  if(!email || !pass){ state.authErr = t.errFillLogin; renderModal(); return; }
  if(!state.dbReady){ state.authErr = t.errDbLogin; renderModal(); return; }
  const key = emailKey(email);
  const btn = document.getElementById("doLogin"); btn.disabled=true; btn.textContent=c.loading;
  try{
    const ref = state.db.doc("users/"+key);
    const snap = await ref.get();
    if(!snap.exists){ state.authErr = t.errNotFound; renderModal(); return; }
    const v = snap.data();
    const hash = await sha256(pass+"::"+key);
    if(hash !== v.passwordHash){ state.authErr = t.errWrongPass; renderModal(); return; }
    saveSession({name:v.name, email:v.email, role:v.role});
    closeModal(); renderNav(); render();
  }catch(e){ state.authErr = t.errGeneric; renderModal(); }
}

/* ===================== WIRE ROUTE-SPECIFIC EVENTS ===================== */
function wireRoute(){
  document.querySelectorAll("[data-nav]").forEach(b=>{
    if(!b.dataset.wired){ b.dataset.wired="1"; b.addEventListener("click", ()=>navigate(b.dataset.nav)); }
  });
  document.querySelectorAll("[data-auth]").forEach(b=>{
    if(!b.dataset.wired){ b.dataset.wired="1"; b.addEventListener("click", ()=>openAuth(b.dataset.auth)); }
  });

  if(state.route==="home"){ loadStatsRow(); wireFeaturedCarousel(); }

  if(state.route==="arqon-setup"){
    document.querySelectorAll("[data-subj]").forEach(b=>b.addEventListener("click", ()=>{ state.arqon = {...(state.arqon||{}), subject:b.dataset.subj}; render(); }));
    document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click", ()=>{ state.arqon = {...(state.arqon||{}), category:b.dataset.cat}; render(); }));
    document.querySelectorAll("[data-catback]").forEach(b=>b.addEventListener("click", ()=>{ state.arqon.category=null; render(); }));
    document.querySelectorAll("[data-diff]").forEach(b=>b.addEventListener("click", ()=>{ state.arqon.difficulty=b.dataset.diff; prefetchQuestionPool(state.arqon.subject, b.dataset.diff); render(); }));
    const backSubj = document.getElementById("backSubj"); if(backSubj) backSubj.addEventListener("click", ()=>{ state.arqon.subject=null; render(); });
    const backDiff = document.getElementById("backDiff"); if(backDiff) backDiff.addEventListener("click", ()=>{ state.arqon.difficulty=null; render(); });
    const teamAInput = document.getElementById("teamAInput"); if(teamAInput) teamAInput.addEventListener("input", e=>{ state.arqon.teamA = e.target.value; });
    const teamBInput = document.getElementById("teamBInput"); if(teamBInput) teamBInput.addEventListener("input", e=>{ state.arqon.teamB = e.target.value; });
    const mode2pBtn = document.getElementById("mode2pBtn"); if(mode2pBtn) mode2pBtn.addEventListener("click", ()=>{ state.arqon.vsBot=false; render(); });
    const modeBotBtn = document.getElementById("modeBotBtn"); if(modeBotBtn) modeBotBtn.addEventListener("click", ()=>{ state.arqon.vsBot=true; render(); });
    const startBtn = document.getElementById("startGameBtn");
    if(startBtn) startBtn.addEventListener("click", async ()=>{
      if(startBtn.disabled) return;
      startBtn.disabled = true;
      startBtn.textContent = L().common.loading;
      try{
        ensureAudioCtx();
        const rt = L().arqonResult;
        state.arqon.teamA = (document.getElementById("teamAInput").value||"").trim() || rt.team1;
        if(state.arqon.vsBot){
          state.arqon.teamB = L().arqonSetup.botName;
        } else {
          const tbEl = document.getElementById("teamBInput");
          state.arqon.teamB = ((tbEl?tbEl.value:"")||"").trim() || rt.team2;
        }
        await startArqonGame();
      } finally {
        startBtn.disabled = false;
      }
    });
  }

  if(state.route==="arqon-play"){
    wireQBlock("A"); wireQBlock("B");
    const mt = document.getElementById("musicToggle");
    if(mt) mt.addEventListener("click", toggleMusic);
  }

  if(state.route==="arqon-result"){
    const again = document.getElementById("playAgainBtn");
    if(again) again.addEventListener("click", ()=>{ navigate("arqon-setup", {arqon:{subject:state.arqon.subject, difficulty:state.arqon.difficulty, teamA:state.arqon.teamA, teamB:state.arqon.teamB, vsBot:state.arqon.vsBot}}); });
  }

  if(state.route==="speed-setup"){
    document.querySelectorAll("[data-speedsubj]").forEach(b=>b.addEventListener("click", ()=>{ state.speed = {...(state.speed||{}), subject:b.dataset.speedsubj}; render(); }));
    document.querySelectorAll("[data-speedcat]").forEach(b=>b.addEventListener("click", ()=>{ state.speed = {...(state.speed||{}), category:b.dataset.speedcat}; render(); }));
    document.querySelectorAll("[data-speedcatback]").forEach(b=>b.addEventListener("click", ()=>{ state.speed.category=null; render(); }));
    document.querySelectorAll("[data-speeddiff]").forEach(b=>b.addEventListener("click", ()=>{ ensureAudioCtx(); state.speed.difficulty=b.dataset.speeddiff; prefetchQuestionPool(state.speed.subject, b.dataset.speeddiff); render(); }));
    const back = document.getElementById("speedBackSubj"); if(back) back.addEventListener("click", ()=>{ state.speed.subject=null; render(); });
    const backDiff = document.getElementById("speedBackDiff"); if(backDiff) backDiff.addEventListener("click", ()=>{ state.speed.difficulty=null; render(); });
    const startBtn = document.getElementById("speedStartBtn"); if(startBtn) startBtn.addEventListener("click", async ()=>{
      if(startBtn.disabled) return;
      startBtn.disabled = true;
      startBtn.textContent = L().common.loading;
      try{
        ensureAudioCtx();
        await startSpeedGame(state.speed.difficulty);
      } finally {
        startBtn.disabled = false;
      }
    });
  }
  if(state.route==="speed-play"){
    wireSpeedQBlock();
    const mt = document.getElementById("musicToggle");
    if(mt) mt.addEventListener("click", toggleMusic);
  }
  if(state.route==="speed-result"){
    const again = document.getElementById("speedAgainBtn");
    if(again) again.addEventListener("click", ()=>navigate("speed-setup", {speed:{subject:state.speed.subject, difficulty:null}}));
  }

  if(state.route==="poyga-setup"){
    document.querySelectorAll("[data-poygasubj]").forEach(b=>b.addEventListener("click", ()=>{ state.poyga = {...(state.poyga||{}), subject:b.dataset.poygasubj}; render(); }));
    document.querySelectorAll("[data-poygacat]").forEach(b=>b.addEventListener("click", ()=>{ state.poyga = {...(state.poyga||{}), category:b.dataset.poygacat}; render(); }));
    document.querySelectorAll("[data-poygacatback]").forEach(b=>b.addEventListener("click", ()=>{ state.poyga.category=null; render(); }));
    document.querySelectorAll("[data-poygadiff]").forEach(b=>b.addEventListener("click", ()=>{ state.poyga.difficulty=b.dataset.poygadiff; prefetchQuestionPool(state.poyga.subject, b.dataset.poygadiff); render(); }));
    const backSubj = document.getElementById("poygaBackSubj"); if(backSubj) backSubj.addEventListener("click", ()=>{ state.poyga.subject=null; render(); });
    const backDiff = document.getElementById("poygaBackDiff"); if(backDiff) backDiff.addEventListener("click", ()=>{ state.poyga.difficulty=null; render(); });
    const poygaMode2pBtn = document.getElementById("poygaMode2pBtn"); if(poygaMode2pBtn) poygaMode2pBtn.addEventListener("click", ()=>{ state.poyga.vsBot=false; render(); });
    const poygaModeBotBtn = document.getElementById("poygaModeBotBtn"); if(poygaModeBotBtn) poygaModeBotBtn.addEventListener("click", ()=>{ state.poyga.vsBot=true; render(); });
    const startBtn = document.getElementById("poygaStartBtn");
    if(startBtn) startBtn.addEventListener("click", async ()=>{
      if(startBtn.disabled) return;
      startBtn.disabled = true;
      startBtn.textContent = L().common.loading;
      try{
        ensureAudioCtx();
        const rt = L().arqonResult;
        state.poyga.teamA = (document.getElementById("poygaTeamA").value||"").trim() || rt.team1;
        if(state.poyga.vsBot){
          state.poyga.teamB = L().arqonSetup.botName;
        } else {
          const tbEl = document.getElementById("poygaTeamB");
          state.poyga.teamB = ((tbEl?tbEl.value:"")||"").trim() || rt.team2;
        }
        await startPoygaGame();
      } finally {
        startBtn.disabled = false;
      }
    });
  }
  if(state.route==="poyga-play"){
    wirePoygaQBlock("A"); wirePoygaQBlock("B");
    const mt = document.getElementById("musicToggle");
    if(mt) mt.addEventListener("click", toggleMusic);
  }
  if(state.route==="poyga-result"){
    const again = document.getElementById("poygaAgainBtn");
    if(again) again.addEventListener("click", ()=>navigate("poyga-setup", {poyga:{subject:state.poyga.subject, difficulty:state.poyga.difficulty, teamA:state.poyga.teamA, teamB:state.poyga.teamB, vsBot:state.poyga.vsBot}}));
  }

  if(state.route==="target"){ wireTarget(); }
  if(state.route==="snake"){ wireSnake(); }
  if(state.route==="xo"){ wireXO(); }
  if(state.route==="farq"){ wireFarq(); }
  if(state.route==="tetris"){ wireTetris(); }
  if(state.route==="kross"){ wireXword(); }
  if(state.route==="detektiv"){ wireRoundQuiz("detektiv"); }
  if(state.route==="typing-setup"){
    document.querySelectorAll("[data-typingmode]").forEach(b=>b.addEventListener("click", ()=>{ state.typing = {...(state.typing||{}), mode:b.dataset.typingmode}; render(); }));
    document.querySelectorAll("[data-typinglen]").forEach(b=>b.addEventListener("click", ()=>{ startTypingGame(state.typing.mode, b.dataset.typinglen); }));
    const backMode = document.getElementById("typingBackMode");
    if(backMode) backMode.addEventListener("click", ()=>{ state.typing.mode=null; render(); });
    const customTa = document.getElementById("typingCustomInput");
    if(customTa) customTa.addEventListener("input", ()=>{ state.typing.customText = customTa.value; });
    const startBtn = document.getElementById("typingStartBtn");
    if(startBtn) startBtn.addEventListener("click", ()=>{
      const ta = document.getElementById("typingCustomInput");
      const val = (ta.value||"").replace(/\s+/g," ").trim();
      if(val.length<20){ const errEl=document.getElementById("typingCustomErr"); if(errEl) errEl.textContent = L().tezyozish.customTooShort; return; }
      state.typing.customText = val;
      startTypingGame("custom", null, val);
    });
  }
  if(state.route==="typing-play"){ wireTypingPlay(); }
  if(state.route==="typing-result"){
    const retry = document.getElementById("typingRetryBtn");
    if(retry) retry.addEventListener("click", ()=>restartTypingSamePassage());
    const again = document.getElementById("typingNewBtn");
    if(again) again.addEventListener("click", ()=>{
      if(state.typing.mode==="custom"){ navigate("typing-setup", {typing:{mode:"custom", length:null, customText:""}}); }
      else { startTypingGame(state.typing.mode, state.typing.length); }
    });
  }
  if(state.route==="rostyolgon"){ wireRoundQuiz("rostyolgon"); }
  if(state.route==="kodquiz"){ wireRoundQuiz("kodquiz"); }

  if(state.route==="savollar" && state.user){
    const f = state.teacherForm;
    const subjSel = document.getElementById("tf-subject"); if(subjSel) subjSel.addEventListener("change", e=>f.subject=e.target.value);
    const diffSel = document.getElementById("tf-difficulty"); if(diffSel) diffSel.addEventListener("change", e=>f.difficulty=e.target.value);
    const qArea = document.getElementById("tf-question"); if(qArea) qArea.addEventListener("input", e=>f.q=e.target.value);
    document.querySelectorAll(".tf-opt").forEach(inp=>inp.addEventListener("input", e=>{ f.opts[Number(e.target.dataset.i)] = e.target.value; }));
    document.querySelectorAll('input[name="tf-correct"]').forEach(r=>r.addEventListener("change", e=>{ f.correct = Number(e.target.value); }));
    const submitBtn = document.getElementById("tfSubmit");
    if(submitBtn) submitBtn.addEventListener("click", submitTeacherQuestion);
    loadMyQuestions();
  }

  if(state.route==="xotira") wireMemory();
  if(state.route==="reaksiya") wireReaksiya();
  if(state.route==="pazl") wirePazl();
}

async function submitTeacherQuestion(){
  const f = state.teacherForm;
  const t = L().savollar;
  state.teacherErr = ""; state.teacherOk = "";
  if(!f.q.trim() || f.opts.some(o=>!o.trim())){
    state.teacherErr = t.fillAllErr;
    render(); return;
  }
  if(!state.dbReady){ state.teacherErr = t.dbDownErr; render(); return; }
  try{
    await state.db.collection("questions").add({
      subject: f.subject, difficulty: f.difficulty, question: f.q.trim(),
      options: f.opts.map(o=>o.trim()), correct: f.correct,
      source: "teacher", authorEmail: state.user.email, authorName: state.user.name,
      createdAt: Date.now(),
    });
    state.teacherOk = t.savedOk;
    state.teacherForm = {subject:f.subject, difficulty:f.difficulty, q:"", opts:["","","",""], correct:0};
    render();
  }catch(e){ state.teacherErr = t.saveErr; render(); }
}

/* ===================== BOOT ===================== */
applyTheme();
document.addEventListener("keydown", snakeKeyHandler);
document.addEventListener("keydown", tetrisKeyHandler);
document.addEventListener("keydown", teamBKeyHandler);
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape" && state.mobileNavOpen){ state.mobileNavOpen=false; renderNav(); } });
render();
initDb();
let _gridResizeT = null;
window.addEventListener("resize", ()=>{
  clearTimeout(_gridResizeT);
  _gridResizeT = setTimeout(fixOrphanGridItems, 120);
});
})();
