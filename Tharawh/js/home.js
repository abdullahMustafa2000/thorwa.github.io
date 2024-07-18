//navigation bar items clicks
const scrollToSectionLinks = document.querySelectorAll('.scroll-to-section');
scrollToSectionLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor link behavior
    const targetSection = document.querySelector(this.dataset.section);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetSection.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    }); // Smooth scrolling

    // Add highlight animation
    targetSection.classList.add('highlight');
            
    // Remove highlight class after animation ends
    targetSection.addEventListener('animationend', () => {
        targetSection.classList.remove('highlight');
    }, { once: true });
  });
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
  } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //nav bar scroll behavior
  const navbar = document.querySelector('.navbar');
  console.log(navbar.classList);
  if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent', 'pt-4');
  } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent', 'pt-4');
  }
  //circular progress-bar animations
  const progressBars = document.querySelectorAll('.progress-bar');
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const targetElement = entry.target;
              let progressStartValue = 0;
              const styles = getComputedStyle(targetElement);
              const progressEndValue = parseInt(styles.getPropertyValue('--progress'));
              const spanElement = targetElement.querySelector('span');
              const spanTargetValue = parseInt(spanElement.textContent.replace(/\./g, ''));

              const progress = setInterval(() => {
                  progressStartValue++;
                  const spanValue = Math.floor((spanTargetValue * progressStartValue) / progressEndValue).toLocaleString('en-US');
                  targetElement.style.background = `radial-gradient(closest-side, var(--primary-color, #003b71) 79%, transparent 80% 100%),
                      conic-gradient(white ${progressStartValue}%, rgba(255, 255, 255, 0.25) 0)`;
                  spanElement.textContent = spanValue;

                  if (progressStartValue >= progressEndValue) {
                      clearInterval(progress);
                  }
              }, 20);

              observer.unobserve(targetElement); // Stop observing after animation starts
          }
      });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
});

//swap services div
const col1 = document.getElementById("services-left-side");
const col2 = document.getElementById("services-right-side");
const zakahLogoLayer = document.getElementById("zakah-logo");
const serviceDetailsLayer = document.getElementById("selected-service-detials");
const swapButton = document.querySelector(".services-btn");

let isSwapped = false;
swapButton.addEventListener("click", function(event) {
  // Prevent default button behavior
  event.preventDefault();
  
  changeView();
  changeContent();
  isSwapped = !isSwapped;
});

function changeView() {
  // Swap the columns
  const parent = col1.parentNode;
  if (!isSwapped) {
    parent.insertBefore(col2, col1);
  } else {
    parent.insertBefore(col1, col2);
  }
  //hide the logo and show the (list and whatsapp button)
  serviceDetailsLayer.classList.remove("d-none");
  zakahLogoLayer.classList.add("d-none");
  //remove any border of previously selected box item
  document.querySelectorAll(".box-item").forEach(boxItem => {
    boxItem.classList.remove('selected');
  });
}

function changeContent(button) {
  const servicesAbout = document.querySelector(".services-about");
  if (isSwapped) {
    serviceDetails.serviceTitle = " خدمات القسم الإداري ";
    serviceDetails.serviceDesc = " تساعدك ذروة التكامل للاستشارات الاداريه والماليه في تحسين مستوى جودة اعمالك حيث تساهم في تقديم حلول فعالة ومميزة لرواد الاعمال في جميع نطاقات العمل ";
    serviceDetails.btnTitle = " خدمات القسم المالي ";
    serviceDetails.btnIcon = "fa-chevron-right";
    serviceDetails.servicesTitles = managementServices;
    setDataOnSwap(serviceDetails, servicesAbout);
  } else {
    serviceDetails.serviceTitle = " خدمات القسم المالي ";
    serviceDetails.serviceDesc = " تساعدك ذروة التكامل للاستشارات الاداريه والماليه في تحسين مستوى جودة اعمالك حيث تساهم في تقديم حلول فعالة ومميزة لرواد الاعمال في جميع نطاقات العمل ";
    serviceDetails.btnTitle = " خدمات القسم الاداري ";
    serviceDetails.btnIcon = "fa-chevron-left";
    serviceDetails.servicesTitles = moneyServices;
    setDataOnSwap(serviceDetails, servicesAbout);
  }
}

function serviceTitleCreate(title, id) {
  const path = "img/services-icons/" + id + ".png";
  return `<div id="${id}" class="service-selector col d-flex justify-content-center">
              <div class="row w-75 justify-content-end box-item">
                  <h5 class="my-auto">${title}</h5>
                  <div style="width: 25px;"></div>
                  <img src="${path}" height="39px" />
              </div>
          </div>`;
}

function moreButtonCreate(title, icon) {
  const path = "img/services-icons/" + icon;
  return `<div id="more-btn" class="service-selector col d-flex justify-content-center">
              <div class="row w-75 justify-content-center box-item" style="background-color: white;">
                  <h5 style="color: var(--primary-color);" class="my-auto">${title}</h5>
                  <div style="width: 4px;"></div>
                  <img src="${path}" height="39px" />
              </div>
          </div>`;
}

var serviceDetails = {
  serviceTitle: "",
  serviceDesc: "",
  btnTitle: "",
  btnIcon: "",
  servicesTitles: [],
};
const servicesContainer = document.getElementById("services-titles-container");
function setDataOnSwap(serviceDetails, servicesAbout) {
  servicesAbout.querySelector(".title").textContent = serviceDetails.serviceTitle;
  servicesAbout.querySelector(".desc").textContent = serviceDetails.serviceDesc;
  swapButton.querySelector("a").textContent = serviceDetails.btnTitle;
  swapButton.querySelector("i").classList.replace(
    swapButton.querySelector("i").classList.contains("fa-chevron-left") ? "fa-chevron-left" : "fa-chevron-right",
    swapButton.querySelector("i").classList.contains("fa-chevron-left") ? "fa-chevron-right" : "fa-chevron-left"
  );
  displayTitlesList(serviceDetails.servicesTitles, titlesListLimit);
}

let titlesListLimit = 3;
function displayTitlesList(list, count) {
  servicesContainer.innerHTML = "";
  for (let i = 0; i < Math.min(count, list.length); i++) {
    servicesContainer.innerHTML += serviceTitleCreate(list[i].title, list[i].key);
  };
  if (list.length > titlesListLimit) {
    if (list.length == count) {
      servicesContainer.innerHTML += moreButtonCreate("اقل", "arrow_up.png");
    } else {
      servicesContainer.innerHTML += moreButtonCreate("اكثر", "arrow_down.png");
    }
  }
}

function displaySubTitles(key) {
  let listFirst = document.getElementById("list-first");
  let listSecond = document.getElementById("list-second");
  
  // Clear existing content
  listFirst.innerHTML = '';
  listSecond.innerHTML = '';

  // Filter the list based on the key
  const filteredList = subListServices.filter(service => service.key == key);

  // Calculate the midpoint of the filtered list
  const midpoint = Math.ceil(filteredList.length / 2);

  // Split the list into two halves
  const firstHalf = filteredList.slice(0, midpoint);
  const secondHalf = filteredList.slice(midpoint);
  console.log(firstHalf);
  // Function to create list items and append them to the given ul element
  function appendItemsToList(items, ulElement) {
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.desc;
      ulElement.appendChild(li);
    });
  }

  // Append items to listFirst and listSecond
  appendItemsToList(firstHalf, listFirst);
  appendItemsToList(secondHalf, listSecond);
}

let moreBtnClicked = false;
servicesContainer.addEventListener('click', handleServiceClick);
function handleServiceClick(event) {
  let targetElement = event.target;
  while (targetElement && !targetElement.classList.contains('service-selector')) {
      targetElement = targetElement.parentElement;
  }

  // If a service-selector was clicked, log the title
  if (targetElement && targetElement.classList.contains('service-selector')) {
      if (targetElement.id == "more-btn") {
        let list = isSwapped? moneyServices: managementServices;
        if (!moreBtnClicked) {
          displayTitlesList(list, list.length);
        } else {
          displayTitlesList(list, titlesListLimit);
        }
        moreBtnClicked = !moreBtnClicked;
      } else {
        displaySubTitles(targetElement.id);
        serviceDetailsLayer.classList.add("d-none");
        zakahLogoLayer.classList.remove("d-none");
        //white border of clickable boxes
        document.querySelectorAll(".box-item").forEach(otherSelector => {
          otherSelector.classList.remove('selected');
        });
        // Add border to the clicked selector
        targetElement.querySelector(".box-item").classList.add('selected');
      }
  }
}

function redirectToWhatsapp() {
  //                                money             management
  const whatsappNumber = isSwapped? "+966511495969" : "+966576508566";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  window.open(whatsappUrl, "_blanck");
}

//services columns content
const managementServices = [
  { title: ' خدمات وزارة التجارة والإستثمار ', icon: 'skyline.png', key: 2 },
  { title: ' خدمات ادارة الجوازات و الوافدين ', icon: 'calculator.png', key: 3 },
  { title: ' خدمات الموارد البشرية والتنمية الإجتماعيه ', icon: 'hr.png', key: 4 },
  { title: ' خدمات هيئة الدواء والغذاء ', icon: 'hr.png', key: 5 },
  { title: ' خدمات الهيئة السعودية للملكية الفكرية ', icon: 'hr.png', key: 6 },
  { title: ' خدمات وزارة الصناعة و الثروة المعدنية ', icon: 'hr.png', key: 7 },
  { title: ' خدمات وزارة ادارة مدن ومناطق التقنية ', icon: 'hr.png', key: 8 },
  { title: ' خدمات استشارات التأمين الطبي ', icon: 'hr.png', key: 9 },
  { title: ' خدمات بلدي ', icon: 'hr.png', key: 10 },
  { title: ' خدمات الدفاع المدني ', icon: 'hr.png', key: 11 },
  { title: ' المزيد ', icon: 'hr.png', key: 12 },
];

displayTitlesList(managementServices, 3);

const moneyServices = [
  { title: ' خدمات الهيئه العامه للزكاه والدخل ', icon: 'money.png', key: 1 },
];


const subListServices = [
  //"خدمات الهيئه العامه للزكاه والدخل"
  { key: 1, desc: "اعداد القوائم المالية و الإقرارات الضريبية "},
  { key: 1, desc: "إمساك الدفاتر"},
  { key: 1, desc: "المراجعة و التدقيق"},
  { key: 1, desc: "خدمات هيئة الزكاة والدخل"},
  { key: 1, desc: "الاستشارات المالية والمحاسبية "},
  { key: 1, desc: "تداول الاسهم "},
  { key: 1, desc: "برامج محاسبية "},
  { key: 1, desc: "تأسيس حسابات"},
  { key: 1, desc: "الاستشارات الفردية لاصحاب الشركات "},
  //"خدمات وزارة التجارة والإستثمار"
  { key: 2, desc: "تأسيس الشركات" },
  { key: 2, desc: "تحويل مؤسسات فردية الى شركات" },
  { key: 2, desc: " تعديل عقود التاسيس" },
  { key: 2, desc: " اصدار ترخيص استثماري في السعودية وفق النشاط " },
  { key: 2, desc: " حجز الأسماء التجارية" },
  { key: 2, desc: "مؤسسات فردية/شركات \'نقل ملكية المنشآة\'" },
  { key: 2, desc: "اصدرا سجل تجاري وتجديده" },
  { key: 2, desc: "تصفية شركة" },
  { key: 2, desc: "شطب سجل تجاري"},
  //"خدمات ادارة الجوازات و الوافدين"
  { key: 3, desc: "إصدار تأشيرة خروج وعودة وإلغاؤها" },
  { key: 3, desc: "إصدار تأشيرة خروج نهائي وإلغاؤها" },
  { key: 3, desc: "إصدار بطاقات الإقامات وتجديدها." },
  //"خدمات الموارد البشرية والتنمية الإجتماعيه"
  { key: 4, desc: "تحديث الملفات الأساسية وربطها" },
  { key: 4, desc: "فتح ملف منشآة لدى مكتب العمل والتأمينات الإجتماعية" },
  { key: 4, desc: "فتح حساب قوى" },
  { key: 4, desc: "فتح حساب مدد وإدارة الاشتراكات" },
  { key: 4, desc: "إعداد عقود الموظفين- المقيمين/السعوديين" },
  { key: 4, desc: "تغيير المهن العليا" },
  { key: 4, desc: "إصدار تأشيرات" },
  //"خدمات هيئة الدواء والغذاء"
  { key: 5, desc: "ترخيص مصانع الغذاء" },
  { key: 5, desc: "تسجيل منتجات المكملات الغذائية ومشروبات الطاقة" },
  { key: 5, desc: "ترخيص مستودع تخزين الأغذية " },
  { key: 5, desc: "حاسبة نموذج التصنيف الغذائي(NPM)" },
  { key: 5, desc: "ترخيص منشآت الأجهزة والمستلزمات الطبية " },
  { key: 5, desc: "تسجيل منتجات الأغذية التقليدية "},
  { key: 5, desc: "تسجيل المنتجات العلفية"},
  { key: 5, desc: "تسجيل منتجات أغذية الأطفال والأغذية المستحدثة "},
  { key: 5, desc: "إدراج منتجات التجميل (إخطار بالتسويق) "},
  { key: 5, desc: "أذونات الاستيراد للأجهزة والمستلزمات الطبية "},
  //"خدمات الهيئة السعودية للملكية الفكرية"
  { key: 6, desc: "تسجيل علامات التجارية " },
  //"خدمات وزارة الصناعة و الثروة المعدنية"
  { key: 7, desc: "طلب تأييد العمالة" },
  { key: 7, desc: "خدمة إصدار الترخيص الصناعي" },
  { key: 7, desc: "إصدار شهادة المنشأ" },
  { key: 7, desc: "خدمة نقل الملكية" },
  { key: 7, desc: "سجل الرخص التعدينية" },
  { key: 7, desc: "طلب التخلي عن الرخص" },
  { key: 7, desc: "طلب إصدار رخصة استطلاع" },
  //"خدمات وزارة ادارة مدن ومناطق التقنية"
  { key: 8, desc: "تأهيل مكتب استشاري " },
  { key: 8, desc: "تأهيل مقاول " },
  { key: 8, desc: "رخص التشغيل وإتمام البناء" },
  //"خدمات استشارات التأمين الطبي"
  { key: 9, desc: "اصدار عروض سعر لشركات التأمين الطبي" },
  { key: 9, desc: "اصدار تأمين طبي" },
  { key: 9, desc: "اصدار وثيقة تأمين متعددة الفئات " },
  //"خدمات بلدي"
  { key: 10, desc: "اصدار عقود نظافة" },
  { key: 10, desc: "إصدار رخصة بناء" },
  { key: 10, desc: "إصدار رخص بلدي" },
  { key: 10, desc: "تجديد رخص بلدي" },
  { key: 10, desc: "نقل الملكية للرخصة" },
  { key: 10, desc: "تحديث الرخص القديمة" },
  { key: 10, desc: "شطب رخص بلدية" },
  { key: 10, desc: "إصدار رخصة تجارية" },
  { key: 10, desc: "إصدار رخصة عربة متنقلة" },
  { key: 10, desc: "إصدار شهادة تأهيل المنشآت" },
  { key: 10, desc: "إصدار شهادة صحية" },
  { key: 10, desc: "إضافة مفوض عن منشأة" },
  //"خدمات الدفاع المدني"
  { key: 11, desc: "إجراءات الأمن و السلامة للمنشآت" },
  { key: 11, desc: "ترخيص المنشآت (اصدار شهادات الاستيفاء للمنشآت منخفضة الخطورة)" },
  { key: 11, desc: "إجراءات مكتب المخططات" },
  { key: 11, desc: "إجراءات الأمن والسلامة للمباني" },
  { key: 11, desc: "إجراءات الأمن والسلامة على المركبات" },
  { key: 11, desc: "عقود الأمن والسلامة"},
  //"المزيد"
  { key: 12, desc: "تقديم الاعتراضات للجان الزكوية" },
  { key: 12, desc: "عداد و تقديم ضريبة القيمة المضافة" },
  { key: 12, desc: "اعداد ميزان المراجعه" },
  { key: 12, desc: "المراجعة الدورية للحسابات وفقا لمعايير المحاسبة السعودية" },
];