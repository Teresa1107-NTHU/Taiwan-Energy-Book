
function toggleMenu(){
  const menu = document.getElementById("nav-menu");
  if(menu) menu.classList.toggle("open");
}

document.querySelectorAll("#nav-menu a").forEach(link=>{
  link.addEventListener("click",()=>{
    const menu = document.getElementById("nav-menu");
    if(menu) menu.classList.remove("open");
  });
});

const STORAGE_PREFIX = "taiwanEnergyStudent_";

document.querySelectorAll("[data-save]").forEach(el=>{
  const key = STORAGE_PREFIX + el.dataset.save;
  const saved = localStorage.getItem(key);

  if(saved !== null){
    el.value = saved;
  }

  const save = ()=>{
    localStorage.setItem(key, el.value);
  };

  el.addEventListener("input", save);
  el.addEventListener("change", save);
});

document.querySelectorAll("[data-radio-group]").forEach(group=>{
  const key = STORAGE_PREFIX + group.dataset.radioGroup;
  const saved = localStorage.getItem(key);

  if(saved){
    group.querySelectorAll('input[type="radio"]').forEach(radio=>{
      if(radio.value === saved){
        radio.checked = true;
      }
    });
  }

  group.querySelectorAll('input[type="radio"]').forEach(radio=>{
    radio.addEventListener("change",()=>{
      if(radio.checked){
        localStorage.setItem(key, radio.value);
      }
    });
  });
});

function setSectionDone(section, done=true){
  localStorage.setItem(
    STORAGE_PREFIX + "section_" + section,
    done ? "1" : "0"
  );
  refreshProgress();
}

function isSectionDone(section){
  return localStorage.getItem(
    STORAGE_PREFIX + "section_" + section
  ) === "1";
}

function refreshProgress(){
  document.querySelectorAll("[data-progress-item]").forEach(item=>{
    const section = item.dataset.progressItem;
    const done = isSectionDone(section);

    item.classList.toggle("done", done);

    const status = item.querySelector(".phase-status");
    if(status){
      status.textContent = done ? "完成 ✓" : "未完成";
    }
  });

  document.querySelectorAll("[data-complete-section]").forEach(btn=>{
    const section = btn.dataset.completeSection;
    const done = isSectionDone(section);

    btn.classList.toggle("done", done);
    btn.textContent = done ? "這一段已完成 ✓" : "完成這一段";
  });
}

document.querySelectorAll("[data-complete-section]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const section = btn.dataset.completeSection;
    setSectionDone(section, !isSectionDone(section));
  });
});

document.querySelectorAll("[data-mark-section]").forEach(link=>{
  link.addEventListener("click",()=>{
    setSectionDone(link.dataset.markSection, true);
  });
});

refreshProgress();

const finishBtn = document.getElementById("finishLesson");

if(finishBtn){
  finishBtn.addEventListener("click",()=>{
    setSectionDone("review", true);

    const complete = document.getElementById("lessonComplete");
    if(complete){
      complete.hidden = false;
      complete.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }
  });
}

if(isSectionDone("review")){
  const complete = document.getElementById("lessonComplete");
  if(complete){
    complete.hidden = false;
  }
}
