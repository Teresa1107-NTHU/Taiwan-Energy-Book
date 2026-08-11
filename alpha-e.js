/* Alpha-E 仿真面板：控制數值、互鎖、圖表與 Unity 訊息。 */
const UNITY_WEBGL_URL ="https://teresa1107-nthu.github.io/Alpha-E/";
const s={power:false,rough:false,turbo:false,vent:false,gas:false,mfc:false,cooler:false,hv:false,mw:false,beam:false,vacuum:0,seconds:0,selected:null};
const info={rough_pump:["Rough Pump｜前級真空泵","先排除腔體內大部分氣體，建立前級真空。","機械泵浦改變腔室容積，將氣體吸入並排出。"],turbo_pump:["Turbo Pump｜渦輪分子泵","進一步降低壓力，建立高真空環境。","高速葉片與氣體分子碰撞，將分子定向送往排氣端。"],gas_supply:["Gas Supply｜氣體供應","提供實驗氣體並完成調壓。","氣瓶中的氣體經調壓後送往 MFC。"],gas_mfc:["MFC｜質量流量控制器","精確控制氣體進入系統的流量。","感測實際質量流率，再以控制閥閉迴路調節。"],cooler:["Cooler｜冷卻系統","帶走設備運轉產生的熱量。","冷卻液循環通過熱源並經熱交換器散熱。"],high_voltage:["High Voltage｜高壓系統","提供離子源與電極所需的電位差。","帶電粒子在電場中受力並獲得動能。"],microwave:["Microwave RF｜微波射頻系統","輸入微波能量，使低壓氣體游離形成電漿。","自由電子吸收微波能量後碰撞氣體分子造成游離。"],detector:["Pressure & Detector｜壓力與偵測","監測腔體壓力及粒子相關訊號。","感測器把物理量轉換為電訊號。"]};
const $=id=>document.getElementById(id);const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* 教學導引順序：每完成一步，下一個設備才亮起 */
const guideOrder=["rough_pump","turbo_pump","gas_supply","gas_mfc","cooler","high_voltage","microwave","beam"];

function guideStatus(){
  return {
    rough_pump:s.rough,
    turbo_pump:s.turbo,
    gas_supply:s.gas,
    gas_mfc:s.mfc,
    cooler:s.cooler,
    high_voltage:s.hv,
    microwave:s.mw,
    beam:s.beam
  };
}

function guideElement(id){
  if(id==="beam") return $("beamOn");
  return document.querySelector(`[data-device="${id}"]`);
}

function updateGuide(){
  const panel=document.querySelector(".sim-panel");
  if(!panel)return;

  panel.classList.toggle("power-off",!s.power);
  panel.classList.toggle("power-on",s.power);
  panel.classList.add("guided");

  document.querySelectorAll(".device,.steps button,.beam button").forEach(el=>{
    el.classList.remove("is-available","is-complete");
    el.dataset.locked="true";
  });

  if(!s.power)return;

  const status=guideStatus();
  guideOrder.forEach(id=>{
    const el=guideElement(id);
    if(el && status[id]){
      el.classList.add("is-complete");
      el.dataset.locked="false";
    }
  });

  const next=guideOrder.find(id=>!status[id]);
  if(next){
    const el=guideElement(next);
    if(el){
      el.classList.add("is-available");
      el.dataset.locked="false";
    }
  }

  /* Off 按鈕保持可用，方便停止已啟動設備 */
  document.querySelectorAll('[data-cmd$=":off"]').forEach(btn=>{
    const card=btn.closest("[data-device]");
    if(card && card.classList.contains("is-complete")) btn.style.pointerEvents="auto";
  });
  $("beamOff").dataset.locked="false";
}

function toggleMenu(){$("nav-menu").classList.toggle("open")}
function led(name,on){$(name+"Led").classList.toggle("on",on);$(name+"Label").textContent=on?"on":"off";$(name+"Label").classList.toggle("on",on)}
function select(id) {
    s.selected = id;

    document
        .querySelectorAll("[data-device]")
        .forEach((element) => {
            element.style.outline =
                element.dataset.device === id
                    ? "3px solid #63daf4"
                    : "";
        });

    const deviceInfo = info[id];

    if (!deviceInfo) {
        return;
    }

    $("infoTitle").textContent =
        deviceInfo[0];

    $("infoFunction").textContent =
        deviceInfo[1];

    $("infoPrinciple").textContent =
        deviceInfo[2];

    live();

    send(
        "SelectEquipment",
        id
    );
}
document.querySelectorAll("[data-device]").forEach(x=>x.addEventListener("click",e=>{if(!["BUTTON","INPUT","SELECT"].includes(e.target.tagName))select(x.dataset.device)}));
function powered(){if(!s.power){alert("請先按 Power On。");return false}return true}
/*
 * 控制整台 Alpha-E 的 Power On / Off，
 * 並將電源指令傳送給 Unity WebGL。
 */
/*
 * 控制整台 Alpha-E 的 Power On / Off，
 * 並將電源指令傳送給 Unity WebGL。
 */
function master(on) {
    s.power = on;

    $("powerOff").classList.toggle("active", !on);
    $("powerOn").classList.toggle("active", on);

    if (!on) {
        s.rough = false;
        s.turbo = false;
        s.vent = false;

        s.gas = false;
        s.mfc = false;
        s.cooler = false;
        s.hv = false;
        s.mw = false;
        s.beam = false;
    }

    update();

    send(
        "SetPower",
        "system",
        on ? "on" : "off"
    );
}
$("powerOn").onclick = () => master(true);
$("powerOff").onclick = () => master(false);
document.querySelectorAll("[data-cmd]").forEach(b => b.onclick = () => {
    const [d, a] = b.dataset.cmd.split(":"); if (a !== "off" && !powered()) return; if (d === "rough") s.rough = a === "on"; if (d === "turbo") { if (a === "on" && !s.rough) return alert("請先啟動 Rough Pump。"); s.turbo = a === "on"; s.vent = a === "vent" } if (d === "mfc") { if (a === "on" && !s.gas) return alert("請先 Set Up Gas。"); s.mfc = a === "on" } if (d === "cooler") s.cooler = a === "on"; if (d === "hv") { if (a === "on" && !(s.vacuum >= 85 && s.gas && s.cooler)) return alert("需先完成高真空、供氣與冷卻。"); s.hv = a === "on" } if (d === "mw") { if (a === "on" && !(s.hv && s.mfc)) return alert("需先啟動 High Voltage 與 MFC。"); s.mw = a === "on" }
    const map = {
        rough: "rough_pump",
        turbo: "turbo_pump",
        mfc: "gas_mfc",
        cooler: "cooler",
        hv: "high_voltage",
        mw: "microwave"
    };
    select(map[d]); update(); send("OperateEquipment", map[d], a)
});
/*
 * 設定氣體供應。
 * 必須先完成 Power、Rough Pump 與 Turbo Pump。
 */
$("setupGas").onclick = () => {
    if (!powered()) {
        return;
    }

    if (!s.rough) {
        alert("請先啟動 Rough Pump。");
        return;
    }

    if (!s.turbo) {
        alert("請先啟動 Turbo Pump。");
        return;
    }

    const selectedGas = $("gasType").value;

    s.gas = true;

    select("gas_supply");
    update();

    send(
        "SetupGas",
        "gas_supply",
        selectedGas
    );
};
$("beamOn").onclick=()=>{if(!(s.power&&s.hv&&s.mw&&s.mfc&&s.cooler&&s.vacuum>=90))return alert("Beam On 需要完成真空、供氣、冷卻、高壓與微波步驟。");s.beam=true;update();send("Beam","beam","on")};$("beamOff").onclick=()=>{s.beam=false;update();send("Beam","beam","off")};
/*
 * 更新 Alpha-E 操作面板上的所有即時狀態。
 */
function update() {

    /* =========================
       設備 LED
    ========================= */

    led("rough", s.rough);
    led("turbo", s.turbo);
    led("mfc", s.mfc);
    led("cooler", s.cooler);
    led("hv", s.hv);
    led("mw", s.mw);


    /* =========================
       真空系統
    ========================= */

    $("vacuumProgress").value = s.vacuum;

    $("vacuumReady").textContent =
        s.vacuum >= 90
            ? "Vacuum Ready"
            : "Not Ready";

    $("vacuumReady").classList.toggle(
        "ready",
        s.vacuum >= 90
    );

    $("vacuumTime").textContent =
        String(
            Math.floor(s.seconds / 60)
        ).padStart(2, "0")
        +
        ":"
        +
        String(
            s.seconds % 60
        ).padStart(2, "0");


    /* =========================
       Experiment Setup
    ========================= */

    $("stepGas").textContent =
        s.gas
            ? "Current Gas: " + $("gasType").value
            : "尚未設定";


    $("stepHv").textContent =
        s.hv
            ? "High Voltage On"
            : (
                s.vacuum >= 85 &&
                s.gas &&
                s.cooler
            )
                ? "可以啟動"
                : "前置步驟未完成";


    $("stepMw").textContent =
        s.mw
            ? "Microwave On / Plasma Generated"
            : (
                s.hv &&
                s.mfc
            )
                ? "可以啟動"
                : "前置步驟未完成";


    /* =========================
       Plasma
       Microwave On → 顯示
       Microwave Off → 隱藏
    ========================= */

    const plasmaDisplay =
        $("plasmaDisplay");

    if (plasmaDisplay) {

        plasmaDisplay.classList.toggle(
            "active",
            s.mw
        );

        plasmaDisplay.setAttribute(
            "aria-hidden",
            s.mw ? "false" : "true"
        );
    }


    /* =========================
       Beam
    ========================= */

    const beamReady =
        s.hv &&
        s.mw &&
        s.mfc &&
        s.cooler &&
        s.vacuum >= 90;

    $("beamOn").classList.toggle(
        "enabled",
        beamReady
    );

    $("beamOn").classList.toggle(
        "active",
        s.beam
    );

    $("beamOff").classList.toggle(
        "active",
        !s.beam
    );


    /* =========================
       系統狀態
    ========================= */

    $("infoStatus").textContent =
        s.beam
            ? "Beam On"
            : s.mw
                ? "Plasma Generated"
                : s.power
                    ? "Power On"
                    : "待機";


    /* =========================
       更新資訊與教學導引
    ========================= */

    live();
    updateGuide();
}
function live() {
    if (!s.selected) return; let t = ""; if (s.selected === "rough_pump") t = `${s.rough ? "運轉" : "停止"}；真空進度 ${s.vacuum.toFixed(0)}%。`; if (s.selected === "turbo_pump") t = `${s.turbo ? "運轉" : s.vent ? "Vent" : "停止"}；轉速 ${$("turboSpeed").textContent} Hz。`; if (s.selected === "gas_supply") {
        t = s.gas
            ? `${$("gasType").value} 已完成設定；壓力設定 ${$("gasPressure").value}。`
            : "Gas Supply 尚未設定。";
    }
    if (s.selected === "gas_mfc") t = `${s.mfc ? "On" : "Off"}；設定 ${$("mfcFlow").value} sccm；量測 ${$("mfcMeasured").textContent}。`; if (s.selected === "cooler") t = `${s.cooler ? "On" : "Off"}；流量 ${$("coolerFlow").textContent} L/m；溫度 ${$("coolerTemp").textContent} °C。`; if (s.selected === "high_voltage") t = `${s.hv ? "On" : "Off"}；${$("hvVoltage").value} kV / ${$("hvCurrent").value} mA。`;
    if (s.selected === "microwave") {

        t = s.mw
            ? `On；Plasma Generated；RF ${$("mwFreq").value} MHz；Duty ${$("mwDuty").value}%。`
            : `Off；Plasma 尚未形成；RF ${$("mwFreq").value} MHz；Duty ${$("mwDuty").value}%。`;
    }
    if (s.selected === "detector") t = `壓力 ${$("pressureValue").textContent} Torr；Beam ${s.beam ? "On" : "Off"}。`; $("infoLive").textContent = t
}
const pn=Array(45).fill(.08),psd=Array(45).fill(.03);function line(c,d,scatter=false){const x=c.getContext("2d"),w=c.width,h=c.height;x.clearRect(0,0,w,h);x.strokeStyle="#d9dde2";for(let i=0;i<4;i++){let y=8+i*(h-16)/3;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}if(scatter){x.fillStyle="#ef7895";d.forEach((v,i)=>{let px=i*w/(d.length-1),py=h-6-v*(h-12);x.beginPath();x.arc(px,py,2,0,Math.PI*2);x.fill()})}else{x.strokeStyle="#72b9e8";x.lineWidth=2;x.beginPath();d.forEach((v,i)=>{let px=i*w/(d.length-1),py=h-6-v*(h-12);i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke()}}
setInterval(()=>{if(s.power){if(s.rough)s.vacuum+=s.turbo?1.8:.65;if(s.vent)s.vacuum-=2.2;s.vacuum=clamp(s.vacuum,0,100);if(s.rough)s.seconds++;let speed=+$("turboSpeed").textContent,target=s.turbo?1500:0;$("turboSpeed").textContent=Math.round(speed+(target-speed)*.18);$("turboTemp").textContent=(24+(s.turbo?19:0)+Math.random()).toFixed(0);$("turboCurrent").textContent=(s.turbo?.58+Math.random()*.08:0).toFixed(2);$("coolerFlow").textContent=(s.cooler?1.8+Math.random()*.3:0).toFixed(1);$("coolerTemp").textContent=(s.cooler?23.8+Math.random()*.8:24.7+Math.random()).toFixed(1);$("mfcMeasured").textContent=(s.mfc?+$("mfcFlow").value/260000+(Math.random()-.5)*.001:0).toFixed(4);pn.push(s.beam?.55+Math.random()*.35:s.mw?.25+Math.random()*.18:.08+Math.random()*.05);psd.push(s.beam?Math.random()*.9:Math.random()*.12)}else{s.vacuum=Math.max(0,s.vacuum-.25);pn.push(.08+Math.random()*.03);psd.push(Math.random()*.05)}pn.shift();psd.shift();let p=.75*Math.pow(10,-s.vacuum/28);$("pressureValue").textContent=p>=.01?p.toFixed(4):p.toExponential(2);line($("pnChart"),pn);line($("psdChart"),psd,true);update()},1000);
/*
 * 將操作面板指令傳送給 iframe 內的 Unity WebGL。
 */
function send(type, equipmentId = "", action = "") {
    const unityFrame = $("alphaUnity");

    if (!UNITY_WEBGL_URL.trim()) {
        console.warn("尚未設定 UNITY_WEBGL_URL。");
        return;
    }

    if (!unityFrame || !unityFrame.contentWindow) {
        console.warn("找不到 Unity iframe。");
        return;
    }

    const message = {
        source: "alpha-e-parent",
        type: type,
        equipmentId: equipmentId,
        action: action,

        // 同時保留 value，避免 Unity 接收端使用不同名稱
        value: action,

        state: { ...s }
    };

    console.log("傳送給 Unity：", message);

    unityFrame.contentWindow.postMessage(
        message,
        "*"
    );
}
if (UNITY_WEBGL_URL) {
    $("alphaUnity").src = UNITY_WEBGL_URL;
    $("alphaUnity").style.display = "block";
} line($("pnChart"), pn); line($("psdChart"), psd, true); update();
