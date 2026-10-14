// =====================================================
// 火力發電 Unity 網頁控制
// =====================================================

const thermalSteps = [

    {
        title: "液化天然氣儲槽",
        description:
            "液化天然氣在送入發電系統前先儲存在儲槽中。天然氣本身儲存著化學能，是這套發電系統最初的能量來源。",
        energy:
            "化學能"
    },

    {
        title: "熱回收蒸汽產生器",
        description:
            "天然氣燃燒後釋放熱能，熱回收蒸汽產生器利用這些熱量加熱水並產生高溫蒸氣。",
        energy:
            "化學能 → 熱能"
    },

    {
        title: "蒸汽渦輪機",
        description:
            "高壓蒸氣推動渦輪機旋轉，使蒸氣所攜帶的能量轉換成旋轉的機械能。",
        energy:
            "熱能 → 機械能"
    },

    {
        title: "煙囪",
        description:
            "天然氣燃燒後產生的廢氣經由煙囪排出。煙囪主要負責排放燃燒後的氣體，並不是產生電能的設備。",
        energy:
            "燃燒後氣體排放"
    },

    {
        title: "冷凝器",
        description:
            "蒸氣通過渦輪機後進入冷凝器，被冷卻並凝結回水，使水可以再次進入蒸汽循環。",
        energy:
            "蒸氣 → 水"
    },

    {
        title: "給水泵",
        description:
            "給水泵將冷凝後的水送回熱回收蒸汽產生器，使工作流體可以持續循環使用。",
        energy:
            "水循環"
    },

    {
        title: "冷卻塔",
        description:
            "冷卻塔將循環水中的多餘熱量排放到環境中，協助降低冷卻水的溫度。",
        energy:
            "移除多餘熱量"
    },

    {
        title: "冷卻水泵",
        description:
            "冷卻水泵讓冷卻水在冷凝器與冷卻塔之間循環，協助冷凝器持續帶走蒸氣中的熱量。",
        energy:
            "冷卻循環"
    },

    {
        title: "發電機",
        description:
            "汽輪機帶動發電機旋轉，發電機利用電磁感應將旋轉的機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "變壓器",
        description:
            "發電機產生電力後，變壓器會調整電壓，使電能更適合進行後續的輸電與配電。",
        energy:
            "電能傳輸"
    },

    {
        title: "電力負載",
        description:
            "電能最後送到用電端。在模型中，燈泡代表電力負載；天然氣輸入量改變時，也可以觀察輸出效果的變化。",
        energy:
            "電能 → 使用"
    }

];


let thermalCurrentStep = -1;


// =====================================================
// 傳送一般控制指令給 Unity
// =====================================================

function sendThermalCommand(command) {

    const iframe =
        document.getElementById("thermalUnity");

    if (
        !iframe ||
        !iframe.contentWindow
    ) {
        return;
    }

    iframe.contentWindow.postMessage(
        {
            type: "THERMAL_COMMAND",
            command: command
        },
        "*"
    );
}


// =====================================================
// 下一步
// =====================================================
function thermalNext() {

    const slider =
        document.getElementById("thermalGasSlider");

    const gasValue =
        slider ? Number(slider.value) : 0;


    // Gas Input = 0 時，不允許繼續導覽
    if (gasValue <= 0) {
        updateThermalHint();
        return;
    }


    // 已經到最後一步
    if (
        thermalCurrentStep >=
        thermalSteps.length - 1
    ) {
        return;
    }


    thermalCurrentStep++;

    sendThermalCommand("NEXT");

    updateThermalPanel();
}

// =====================================================
// 上一步
// =====================================================

function thermalPrevious() {

    if (thermalCurrentStep <= 0) {
        return;
    }

    thermalCurrentStep--;

    sendThermalCommand("PREVIOUS");

    updateThermalPanel();
}


// =====================================================
// 重設
// =====================================================

function thermalReset() {

    thermalCurrentStep = -1;

    sendThermalCommand("RESET");


    /*
     * Gas Input 回到 0。
     */
    const slider =
        document.getElementById(
            "thermalGasSlider"
        );

    if (slider) {
        slider.value = 0;
    }

    setThermalGas(0);
    updateThermalPanel();
    updateThermalHint();
}


// =====================================================
// 更新網頁說明
// =====================================================

function updateThermalPanel() {

    const number =
        document.getElementById(
            "thermalStepNumber"
        );

    const title =
        document.getElementById(
            "thermalStepTitle"
        );

    const description =
        document.getElementById(
            "thermalStepDescription"
        );

    const energyTag =
        document.getElementById(
            "thermalEnergyTag"
        );

    const prevBtn =
        document.getElementById(
            "thermalPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "thermalNextBtn"
        );

    const resetBtn =
        document.getElementById(
            "thermalResetBtn"
        );

    const progress =
        document.getElementById(
            "thermalProgressText"
        );

    const panel =
        document.querySelector(
            ".thermal-control-panel"
        );


    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }


    // =========================
    // 尚未開始
    // =========================

    if (thermalCurrentStep < 0) {

        if (resetBtn) {
            resetBtn.disabled = true;
        }

        number.textContent =
            "準備開始";

        title.textContent =
            "天然氣火力發電";

        description.textContent =
            "先調整下方的 Gas Input，讓天然氣進入系統，再開始觀察發電流程。";

        if (energyTag) {
            energyTag.textContent =
                "能量來源：天然氣";
        }

        if (prevBtn) {
            prevBtn.disabled = true;
        }


        /*
         * 是否可以開始，
         * 由目前 Gas Input 判斷。
         */
        const slider =
            document.getElementById(
                "thermalGasSlider"
            );

        const gasValue =
            slider
                ? Number(slider.value)
                : 0;

        if (nextBtn) {
            nextBtn.disabled =
                gasValue <= 0;

            nextBtn.textContent =
                "開始導覽";
        }

        if (progress) {
            progress.textContent =
                gasValue > 0
                    ? "已設定天然氣輸入，可以開始導覽"
                    : "調整天然氣輸入後即可開始";
        }

        if (panel) {
            panel.classList.remove(
                "complete"
            );
        }

        return;
    }


    // =========================
    // 導覽中
    // =========================

    const step =
        thermalSteps[
        thermalCurrentStep
        ];

    if (resetBtn) {
        resetBtn.disabled = false;
    }

    number.textContent =
        `STEP ${thermalCurrentStep + 1} / ${thermalSteps.length}`;

    title.textContent =
        step.title;

    description.textContent =
        step.description;


    if (energyTag) {
        energyTag.textContent =
            step.energy;
    }


    if (prevBtn) {
        prevBtn.disabled =
            thermalCurrentStep === 0;
    }


    // =========================
    // 最後一步
    // =========================
    const isLastStep =
        thermalCurrentStep ===
        thermalSteps.length - 1;

    if (nextBtn) {

        const slider =
            document.getElementById("thermalGasSlider");

        const gasValue =
            slider ? Number(slider.value) : 0;

        if (isLastStep) {

            nextBtn.textContent =
                "導覽完成 ✓";

            nextBtn.disabled = true;

        } else {

            nextBtn.textContent =
                "下一步";

            // Gas = 0 時維持鎖定
            nextBtn.disabled =
                gasValue <= 0;
        }
    }

    if (progress) {

        progress.textContent =
            isLastStep
                ? "你已經完成火力發電流程導覽"
                : `正在查看第 ${thermalCurrentStep + 1} 個設備`;
    }

    if (panel) {

        panel.classList.toggle(
            "complete",
            isLastStep
        );
    }

    updateThermalHint();
}


// =====================================================
// Gas Input Slider
// =====================================================
function setThermalGas(value) {

    const numericValue =
        Number(value);

    const valueText =
        document.getElementById("thermalGasValue");

    if (valueText) {
        valueText.textContent =
            Math.round(numericValue);
    }


    // 傳給 Unity
    const iframe =
        document.getElementById("thermalUnity");

    if (
        iframe &&
        iframe.contentWindow
    ) {
        iframe.contentWindow.postMessage(
            {
                type: "THERMAL_GAS",
                value: String(numericValue)
            },
            "*"
        );
    }


    // =========================
    // 控制下一步按鈕
    // =========================

    const nextBtn =
        document.getElementById("thermalNextBtn");

    const isLastStep =
        thermalCurrentStep === thermalSteps.length - 1;

    if (nextBtn) {

        if (isLastStep) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled =
                numericValue <= 0;
        }
    }
    updateThermalHint();
}

// =====================================================
// 頁面載入時初始化火力控制面板
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const slider =
        document.getElementById("thermalGasSlider");

    if (!slider) {
        return;
    }

    // 初始狀態
    slider.value = 0;
    thermalCurrentStep = -1;

    // 正式綁定 Gas Input 滑桿
    slider.addEventListener("input", () => {
        setThermalGas(slider.value);
    });

    slider.addEventListener("change", () => {
        setThermalGas(slider.value);
    });

    // 初始化介面
    setThermalGas(0);
    updateThermalPanel();
});


console.log(
    "THERMAL LEARNING MODULE LOADED"
);

function updateThermalHint() {
    const hint = document.getElementById("thermalStartHint");
    const icon = document.getElementById("thermalHintIcon");
    const title = document.getElementById("thermalHintTitle");
    const text = document.getElementById("thermalHintText");
    const slider = document.getElementById("thermalGasSlider");

    if (!hint || !icon || !title || !text || !slider) return;

    const gasValue = parseInt(slider.value, 10) || 0;

    hint.classList.remove("ready", "started", "complete");

    // 尚未開始
    if (thermalCurrentStep < 0) {
        if (gasValue <= 0) {
            icon.textContent = "01";
            title.textContent = "先設定天然氣輸入量";
            text.textContent =
                "拖曳 Gas Input 滑桿到大於 0%。觀察輸入量改變後，再開始逐步查看發電系統。";
        } else {
            hint.classList.add("ready");
            icon.textContent = "✓";
            title.textContent = "天然氣輸入已設定";
            text.textContent =
                "現在可以按下「開始導覽」，逐步觀察天然氣如何轉換成最後的電能。";
        }
        return;
    }

    // 導覽已開始，但 Gas Input 被拉回 0
    if (
        thermalCurrentStep >= 0 &&
        gasValue <= 0
    ) {
        hint.classList.add("started");

        icon.textContent = "!";

        title.textContent =
            "天然氣輸入已停止";

        text.textContent =
            "Gas Input 現在是 0%。請重新調高天然氣輸入量，系統恢復運作後才能繼續下一步。";

        return;
    }

    // 導覽進行中
    if (thermalCurrentStep >= 0 && thermalCurrentStep < thermalSteps.length - 1) {
        hint.classList.add("started");
        icon.textContent = "↔";
        title.textContent = "試著拉動滑桿比較看看";
        text.textContent =
            "你已經開始導覽了。可以一邊逐步觀察設備，一邊拖拉 Gas Input 滑桿，看看天然氣輸入量不同時，系統運作與輸出效果有什麼差別。";
        return;
    }

    // 導覽完成
    hint.classList.add("complete");
    icon.textContent = "✓";
    title.textContent = "你已完成火力發電導覽，最後再比較一次";
    text.textContent =
        "試著把 Gas Input 分別調低與調高，觀察燈泡亮度與系統運作有什麼變化。你覺得燃料輸入量和發電輸出之間有什麼關係？";
}

    // =====================================================
// 核能發電手動文字導覽
// =====================================================
const nuclearSteps = [

    {
        title: "反應爐建築",
        description:
            "反應爐建築主要由鋼筋混凝土構成，容納核能發電廠的重要設備，主要功能是提升正常運轉與事故情況下的安全性。",
        energy:
            "安全與防護"
    },

    {
        title: "反應爐",
        description:
            "反應爐是核燃料進行受控核分裂的地方。核分裂釋放的核能會轉換成熱能，再用來產生電力。壓水式反應爐（PWR）使用厚壁鋼製壓力槽。",
        energy:
            "核能 → 熱能"
    },

    {
        title: "蒸汽產生器",
        description:
            "蒸汽產生器位於一次側系統中，功能類似熱交換器。它把反應爐產生的熱傳到二次側，使水形成蒸汽並推動汽輪機。",
        energy:
            "熱能傳遞"
    },

    {
        title: "反應爐冷卻水泵",
        description:
            "反應爐冷卻水泵使一次側冷卻水持續循環，把反應爐產生的熱帶到蒸汽產生器。",
        energy:
            "一次側循環"
    },

    {
        title: "穩壓器系統",
        description:
            "穩壓器用來維持一次側系統的壓力。它部分裝有水，並利用電加熱器加熱，以維持所需的系統壓力。",
        energy:
            "壓力控制"
    },

    {
        title: "混凝土屏蔽",
        description:
            "鋼筋混凝土結構包覆並保護反應爐與一次側的重要設備，同時也作為阻隔游離輻射的重要屏障。",
        energy:
            "安全與防護"
    },

    {
        title: "汽輪機廠房",
        description:
            "汽輪機廠房內包含利用蒸汽發電所需的主要設備，例如汽輪機、冷凝器與發電機，也可能包含汽水分離器與加熱設備。",
        energy:
            "發電設備區"
    },

    {
        title: "蒸汽汽輪機",
        description:
            "汽輪機把蒸汽所攜帶的能量轉換成旋轉的機械能，並利用轉軸帶動發電機。",
        energy:
            "熱能 → 機械能"
    },

    {
        title: "發電機",
        description:
            "發電機把汽輪機提供的旋轉機械能轉換成電能。旋轉磁場會在定子線圈中感應出電壓。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "冷凝器",
        description:
            "通過汽輪機後的蒸汽在冷凝器中冷卻並凝結成水，再經由系統送回蒸汽產生器。冷凝器吸收的熱則由冷卻水帶走。",
        energy:
            "蒸汽 → 水循環"
    },

    {
        title: "冷卻塔",
        description:
            "冷卻塔主要用來降低冷凝器循環冷卻水的溫度，使冷卻水可以持續循環使用。",
        energy:
            "散熱與冷卻"
    },

    {
        title: "電力輸出",
        description:
            "淨電力輸出表示實際送入電網的電力。發電廠本身也會消耗一部分所產生的電力來維持設備運轉。",
        energy:
            "電能 → 電網"
    },

    {
        title: "汽水分離再熱器",
        description:
            "汽水分離再熱器（MSR）會移除高壓汽輪機出口蒸汽中的水分，並在蒸汽進入低壓汽輪機前重新加熱，以提升效率並減少汽輪機葉片受到侵蝕。",
        energy:
            "蒸汽品質與效率"
    }

];

let nuclearCurrentStep = -1;

// =====================================================
// 下一步
// =====================================================

function nuclearNext() {

    if (
        nuclearCurrentStep >=
        nuclearSteps.length - 1
    ) {
        return;
    }

    nuclearCurrentStep++;

    updateNuclearPanel();
}


// =====================================================
// 上一步
// =====================================================

function nuclearPrevious() {

    if (nuclearCurrentStep <= 0) {
        return;
    }

    nuclearCurrentStep--;

    updateNuclearPanel();
}


// =====================================================
// 重設
// =====================================================

function nuclearReset() {

    nuclearCurrentStep = -1;

    updateNuclearPanel();
}


// =====================================================
// 更新核能文字導覽
// =====================================================

function updateNuclearPanel() {

    const number =
        document.getElementById(
            "nuclearStepNumber"
        );

    const title =
        document.getElementById(
            "nuclearStepTitle"
        );

    const description =
        document.getElementById(
            "nuclearStepDescription"
        );

    const energy =
        document.getElementById(
            "nuclearEnergyTag"
        );

    const prevBtn =
        document.getElementById(
            "nuclearPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "nuclearNextBtn"
        );


    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }


    // =========================
    // 尚未開始
    // =========================

    if (nuclearCurrentStep < 0) {

        number.textContent =
            "準備開始";

        title.textContent =
            "壓水式核能發電";

        description.textContent =
            "請使用上方模型中的「Next view」依序觀看各設備，並搭配下方中文步驟整理核能發電流程。";

        if (energy) {
            energy.textContent =
                "能量來源：核分裂";
        }

        if (prevBtn) {
            prevBtn.disabled = true;
        }

        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent = "開始導覽";
        }

        return;
    }


    // =========================
    // 導覽中
    // =========================

    const step =
        nuclearSteps[
            nuclearCurrentStep
        ];


    number.textContent =
        `STEP ${nuclearCurrentStep + 1} / ${nuclearSteps.length}`;

    title.textContent =
        step.title;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }


    if (prevBtn) {
        prevBtn.disabled =
            nuclearCurrentStep === 0;
    }


    const isLastStep =
        nuclearCurrentStep ===
        nuclearSteps.length - 1;


    if (nextBtn) {

        if (isLastStep) {

            nextBtn.textContent =
                "導覽完成 ✓";

            nextBtn.disabled = true;

        } else {

            nextBtn.textContent =
                "下一步";

            nextBtn.disabled = false;
        }
    }
}


// 頁面載入時初始化
document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            document.getElementById(
                "nuclearStepNumber"
            )
        ) {
            nuclearCurrentStep = -1;
            updateNuclearPanel();
        }

    }
);

// =====================================================
// 風力發電自動同步導覽
// 使用已測試成功的 3d-Pro postMessage 控制方式
// =====================================================

const WIND_MODEL_URL =
    "https://my-3d-proxy.loveleehom9.workers.dev/wind-energy/horizontal-axis-turbine";

const windSteps = [

    {
        title: "主軸",
        english: "Main Shaft",
        description:
            "主軸是風力機傳動系統的一部分，與轉子相連。這支低速主軸會隨著葉片與轉子旋轉，將旋轉的機械能傳往後續設備。",
        energy:
            "旋轉機械能傳遞"
    },

    {
        title: "主軸軸承",
        english: "Main Shaft Bearing",
        description:
            "主軸軸承支撐旋轉中的低速主軸，並減少零件運動時產生的摩擦，使轉子傳來的力量能穩定地傳遞。",
        energy:
            "支撐與減少摩擦"
    },

    {
        title: "轉子",
        english: "Rotor",
        description:
            "轉子主要由葉片與輪轂組成，並與主軸連接。風吹動葉片後，轉子開始旋轉，將風的動能轉換成旋轉的機械能。",
        energy:
            "風的動能 → 機械能"
    },

    {
        title: "葉片",
        english: "Blades",
        description:
            "風流過葉片時，葉片兩側的氣流與壓力差會產生升力與阻力。當升力作用使轉子旋轉時，風的動能便開始轉換成旋轉的機械能。",
        energy:
            "風的動能 → 機械能"
    },

    {
        title: "葉片變槳系統",
        english: "Blade Pitch",
        description:
            "變槳系統可以調整葉片相對於風的角度，以控制轉子的轉速與取得的風能。當風速過高時，也能調整葉片角度來降低負載並保護風力機。",
        energy:
            "控制風能擷取"
    },

    {
        title: "塔架",
        english: "Tower",
        description:
            "塔架支撐風力機的機艙與轉子，讓葉片能位於較高的位置。通常高度越高，越有機會接觸到較穩定且較強的風。",
        energy:
            "結構支撐"
    },

    {
        title: "偏航驅動系統",
        english: "Yaw Drive",
        description:
            "偏航驅動系統會旋轉機艙，使風力機能朝向目前的風向，讓葉片維持較適合取得風能的方向。",
        energy:
            "風向控制"
    },

    {
        title: "齒輪箱",
        english: "Gearbox",
        description:
            "齒輪箱利用不同齒輪將低速主軸的旋轉轉換成較適合發電機使用的轉速，再把旋轉的機械能傳到發電機。",
        energy:
            "機械能傳遞"
    },

    {
        title: "發電機",
        english: "Electric Generator",
        description:
            "葉片與轉子的旋轉經由主軸和齒輪箱傳到發電機。發電機利用磁場與線圈之間的相對運動，把旋轉的機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "轉子煞車",
        english: "Rotor Brake",
        description:
            "需要停止風力機時，可利用葉片變槳降低受風作用，再由轉子煞車協助固定轉子。它也能在維修時作為停車煞車使用。",
        energy:
            "停止與安全"
    },

    {
        title: "風速計",
        english: "Anemometer",
        description:
            "風速計用來測量風速。控制系統會利用這些資料調整葉片角度，使風力機在不同風速下能更有效率且安全地運轉。",
        energy:
            "風速偵測"
    },

    {
        title: "風向標",
        english: "Wind Vane",
        description:
            "風向標用來測量風向，並將資訊提供給偏航驅動系統，使機艙與轉子能轉向適合的方向面對來風。",
        energy:
            "風向偵測"
    },

    {
        title: "機艙",
        english: "Nacelle",
        description:
            "機艙位於塔架頂端，內部容納風力發電的重要設備，例如主軸、齒輪箱與發電機，是旋轉機械能傳遞與發電的主要設備區。",
        energy:
            "發電設備區"
    },

    {
        title: "你知道嗎？",
        english: "Did You Know?",
        description:
            "大型風力機的葉片可以非常長，有些葉片長度甚至超過 100 公尺。較大的葉片能掃過更大的面積，因此可以從風中取得更多能量。",
        energy:
            "延伸認識"
    }

];

let windCurrentStep = -1;

// =====================================================
// 取得風力 iframe
// =====================================================

function getWindIframe() {

    return document.getElementById(
        "windModel"
    );

}


// =====================================================
// 傳送控制訊號給 EnergyEncyclopedia
// 每次只送一次，不額外模擬 click
// =====================================================

function sendWindAction(action) {

    const iframe =
        getWindIframe();


    if (
        !iframe ||
        !iframe.contentWindow
    ) {

        console.warn(
            "Wind iframe 尚未準備完成"
        );

        return false;

    }


    iframe.focus();

    iframe.contentWindow.focus();


    iframe.contentWindow.postMessage(
        action,
        "*"
    );


    console.log(
        "Wind postMessage:",
        action
    );


    return true;

}


// =====================================================
// 下一步
// =====================================================

function windNext() {

    if (
        windCurrentStep >=
        windSteps.length - 1
    ) {
        return;
    }


    /*
     * 先控制模型。
     * 成功送出後中文步驟才 +1。
     */
    if (
        !sendWindAction(
            "ACTION_NEXT_STEP"
        )
    ) {
        return;
    }


    windCurrentStep += 1;


    updateWindPanel();

}


// =====================================================
// 上一步
// =====================================================

function windPrevious() {

    if (
        windCurrentStep <= 0
    ) {
        return;
    }


    if (
        !sendWindAction(
            "ACTION_PREV_STEP"
        )
    ) {
        return;
    }


    windCurrentStep -= 1;


    updateWindPanel();

}


// =====================================================
// 重設
// =====================================================

function windReset() {

    const wrapper =
        document.getElementById(
            "windViewerWrapper"
        );


    if (!wrapper) {
        return;
    }


    const oldIframe =
        getWindIframe();


    if (oldIframe) {
        oldIframe.remove();
    }


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.id =
        "windModel";


    iframe.src =
        WIND_MODEL_URL;


    iframe.title =
        "水平軸風力發電機 3D 互動模型";


    iframe.allowFullscreen =
        true;


    wrapper.appendChild(
        iframe
    );


    windCurrentStep =
        -1;


    bindWindIframeLoad(
        iframe
    );


    updateWindPanel();

}


// =====================================================
// 更新右側中文說明
// =====================================================

function updateWindPanel() {

    const number =
        document.getElementById(
            "windStepNumber"
        );

    const title =
        document.getElementById(
            "windStepTitle"
        );

    const description =
        document.getElementById(
            "windStepDescription"
        );

    const energy =
        document.getElementById(
            "windEnergyTag"
        );

    const prev =
        document.getElementById(
            "windPrevBtn"
        );

    const next =
        document.getElementById(
            "windNextBtn"
        );

    const reset =
        document.getElementById(
            "windResetBtn"
        );

    /*
     * 其他頁沒有 wind 元件時直接離開。
     * 因為這支 student-learning.js 是共用 JS。
     */
    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }

    // =========================
    // 尚未開始
    // =========================

    if (
        windCurrentStep < 0
    ) {

        number.textContent =
            "準備開始";

        title.innerHTML =
            `水平軸風力發電機
            <span class="wind-title-en">
                Horizontal-Axis Wind Turbine
            </span>`;

        description.textContent =
            "模型初始畫面為 All components view，可先觀察各設備的位置與標籤。按下「開始導覽」後，模型與右側中文說明會同步前進一步。";

        if (energy) {
            energy.textContent =
                "能量來源：風";
        }

        if (prev) {
            prev.disabled =
                true;
        }

        if (next) {

            next.disabled =
                false;

            next.textContent =
                "開始導覽";
        }

        if (reset) {
            reset.disabled =
                true;
        }

        return;
    }

    // =========================
    // 導覽中
    // =========================

    const step =
        windSteps[
        windCurrentStep
        ];

    number.textContent =
        `STEP ${windCurrentStep + 1} / ${windSteps.length}`;

    title.innerHTML =
        `${step.title}
     <span class="wind-title-en">
         ${step.english}
     </span>`;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    const allowBackAndReset =
        windCurrentStep >= 1;

    if (prev) {

        prev.disabled =
            !allowBackAndReset;

    }

    if (reset) {

        reset.disabled =
            !allowBackAndReset;

    }

    const last =
        windCurrentStep ===
        windSteps.length - 1;


    if (next) {

        next.disabled =
            last;


        next.textContent =
            last
                ? "導覽完成 ✓"
                : "下一步";

    }
}

// =====================================================
// iframe 載入狀態
// =====================================================

function bindWindIframeLoad(
    iframe
) {

    const status =
        document.getElementById(
            "windModelStatus"
        );


    if (!iframe) {
        return;
    }


    if (status) {

        status.classList.remove(
            "ready"
        );


        status.textContent =
            "正在載入風力 3D 模型……";

    }


    iframe.addEventListener(
        "load",
        () => {

            if (status) {

                status.textContent =
                    "3D 模型已載入";


                setTimeout(
                    () => {

                        status.classList.add(
                            "ready"
                        );

                    },
                    500
                );

            }


            console.log(
                "Wind model loaded"
            );

        }
    );

}


// =====================================================
// 頁面初始化
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const iframe =
            getWindIframe();


        /*
         * 只有 wind.html 才會有這個 iframe。
         * 其他頁面不受影響。
         */
        if (!iframe) {
            return;
        }


        bindWindIframeLoad(
            iframe
        );


        document
            .getElementById(
                "windPrevBtn"
            )
            ?.addEventListener(
                "click",
                windPrevious
            );


        document
            .getElementById(
                "windNextBtn"
            )
            ?.addEventListener(
                "click",
                windNext
            );


        document
            .getElementById(
                "windResetBtn"
            )
            ?.addEventListener(
                "click",
                windReset
            );


        windCurrentStep =
            -1;


        updateWindPanel();

    }
);

// =====================================================
// 水力發電手動文字導覽
// =====================================================

const hydroSteps = [

    {
        title: "卡布蘭水輪機",
        description:
            "卡布蘭水輪機可以調整導葉與轉輪葉片的角度，適合用於水頭較低、流量較大的水力發電環境。水流推動葉片旋轉，將水流的能量轉換成旋轉的機械能。",
        energy:
            "水流動能 → 機械能"
    },

    {
        title: "發電機",
        description:
            "水輪機旋轉時會帶動發電機轉子。發電機利用電磁感應，將水輪機提供的旋轉機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "壩體",
        description:
            "壩體橫跨河流並攔蓄水量，使上游形成水庫，同時建立水位高度差。這個高度差讓水具有可用來發電的重力位能。",
        energy:
            "建立水位差"
    },

    {
        title: "進水口設施",
        description:
            "進水口設施將水庫中的水導入壓力水管，通常包含攔污柵與閘門，可以控制水流並在需要時停止水流進入水輪機。",
        energy:
            "控制水流"
    },

    {
        title: "蓄水庫",
        description:
            "蓄水庫儲存大量位於較高位置的水。高處的水具有重力位能，水庫的水位與放水流量也會影響可供發電使用的能量。",
        energy:
            "重力位能"
    },

    {
        title: "變壓器",
        description:
            "發電機產生電力後，變壓器會提高電壓，使電力更適合輸送到電網，並降低長距離輸電時的能量損失。",
        energy:
            "電能傳輸"
    },

    {
        title: "壓力水管",
        description:
            "壓力水管將水庫中的水送往水輪機。水從較高處往較低處流動時，重力位能逐漸轉換成水流的動能。",
        energy:
            "重力位能 → 動能"
    },

    {
        title: "尾水管",
        description:
            "尾水管位於水輪機出口下方，負責將通過水輪機後的水導向下游，同時協助提高水輪機的能量利用效率。",
        energy:
            "水流排出"
    },

    {
        title: "下游水庫",
        description:
            "水通過水輪機後會流入下游水庫。在抽蓄式水力發電系統中，也可以在需要時利用幫浦將下游的水送回上游水庫，再次儲存能量。",
        energy:
            "水循環與儲能"
    }

];


let hydroCurrentStep = -1;


// =====================================================
// 下一步
// =====================================================

function hydroNext() {

    if (
        hydroCurrentStep >=
        hydroSteps.length - 1
    ) {
        return;
    }

    hydroCurrentStep++;

    updateHydroPanel();
}


// =====================================================
// 上一步
// =====================================================

function hydroPrevious() {

    if (hydroCurrentStep <= 0) {
        return;
    }

    hydroCurrentStep--;

    updateHydroPanel();
}


// =====================================================
// 重設
// =====================================================

function hydroReset() {

    hydroCurrentStep = -1;

    updateHydroPanel();
}


// =====================================================
// 更新水力中文導覽
// =====================================================

function updateHydroPanel() {

    const number =
        document.getElementById(
            "hydroStepNumber"
        );

    const title =
        document.getElementById(
            "hydroStepTitle"
        );

    const description =
        document.getElementById(
            "hydroStepDescription"
        );

    const energy =
        document.getElementById(
            "hydroEnergyTag"
        );

    const prevBtn =
        document.getElementById(
            "hydroPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "hydroNextBtn"
        );


    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }


    // =========================
    // 尚未開始
    // =========================

    if (hydroCurrentStep < 0) {

        number.textContent =
            "準備開始";

        title.textContent =
            "水力發電";

        description.textContent =
            "請使用上方模型中的「Next view」依序觀看各設備，並搭配下方中文步驟了解水如何帶動水輪機並產生電能。";

        if (energy) {
            energy.textContent =
                "能量來源：高處的水";
        }

        if (prevBtn) {
            prevBtn.disabled = true;
        }

        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent =
                "開始導覽";
        }

        return;
    }

    // =========================
    // 導覽中
    // =========================

    const step =
        hydroSteps[
        hydroCurrentStep
        ];

    number.textContent =
        `STEP ${hydroCurrentStep + 1} / ${hydroSteps.length}`;
    title.textContent =
        step.title;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    if (prevBtn) {
        prevBtn.disabled =
            hydroCurrentStep === 0;
    }

    const isLastStep =
        hydroCurrentStep ===
        hydroSteps.length - 1;

    if (nextBtn) {

        if (isLastStep) {

            nextBtn.textContent =
                "導覽完成 ✓";

            nextBtn.disabled =
                true;

        } else {

            nextBtn.textContent =
                "下一步";

            nextBtn.disabled =
                false;
        }
    }
}

// =====================================================
// 頁面載入時初始化
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            document.getElementById(
                "hydroStepNumber"
            )
        ) {
            hydroCurrentStep = -1;
            updateHydroPanel();
        }
    }
);

// =====================================================
// 太陽光電手動文字導覽
// =====================================================
const solarSteps = [

    {
        title: "你知道嗎？",
        description:
            "大規模太陽光電發電需要相當大的設置面積。模型資料指出，1000 MW 的太陽光電發電廠大約需要 50 平方公里的土地，因此空間也是規劃太陽光電時需要考量的重要條件。",
        energy:
            "延伸認識"
    },

    {
        title: "太陽能板",
        description:
            "許多太陽能電池會組合成完整的太陽能板。太陽能板接收陽光後產生電流，而產生的電流大小會受到接收到的光量影響。",
        energy:
            "光能 → 電能"
    },

    {
        title: "太陽能電池",
        description:
            "太陽能電池是太陽光電發電的核心元件，主要由半導體材料構成。當半導體吸收光的能量後，能量會傳遞給電子，使電子移動並形成電流。",
        energy:
            "光能 → 電能"
    },

    {
        title: "逆變器",
        description:
            "太陽能板產生的是直流電，但電網使用交流電，因此需要逆變器將直流電轉換成交流電，讓產生的電力能進一步送往電力系統。",
        energy:
            "直流電 → 交流電"
    },

    {
        title: "支撐結構",
        description:
            "支撐結構負責固定太陽能板，並讓面板以適合的方向與角度接收陽光。有些系統使用固定式支架，也有能追蹤太陽位置的可動式設計。",
        energy:
            "提升光能利用"
    },

    {
        title: "地下電纜",
        description:
            "經過逆變器轉換後的交流電，會透過地下電纜送往變電站，將各區太陽能板產生的電力集中並繼續傳輸。",
        energy:
            "交流電傳輸"
    },

    {
        title: "電力輸出",
        description:
            "完成轉換與輸電設備處理後，太陽光電發電廠會把產生的交流電向外輸出，準備送入電網供使用者使用。",
        energy:
            "電能 → 電網"
    },

    {
        title: "變電站",
        description:
            "太陽光電發電廠要連接電網，需要透過變電站提高電壓，使電力更適合輸送。變電站也包含量測、控制與電力開關等設備。",
        energy:
            "升壓與輸電"
    },

    {
        title: "圍欄",
        description:
            "太陽光電場周圍設置圍欄，可以避免未經允許的人員或動物進入，協助保護發電設備與場區安全。",
        energy:
            "場域安全"
    },

    {
        title: "草地",
        description:
            "太陽能板之間可能會有自然生長的草地，但植被需要適當管理，避免草木過高遮住太陽能板，同時也要方便後續維修與管理。",
        energy:
            "場域維護"
    },

    {
        title: "間隔空間",
        description:
            "太陽能板列與列之間需要保留適當空間，除了降低彼此遮蔭，也讓維修、清潔設備與車輛可以在場區內通行。",
        energy:
            "避免遮蔭與方便維護"
    }

];

let solarCurrentStep = -1;

// =====================================================
// 下一步
// =====================================================
function solarNext() {

    if (
        solarCurrentStep >=
        solarSteps.length - 1
    ) {
        return;
    }

    solarCurrentStep++;
    updateSolarPanel();
}

// =====================================================
// 上一步
// =====================================================
function solarPrevious() {

    if (solarCurrentStep <= 0) {
        return;
    }

    solarCurrentStep--;
    updateSolarPanel();
}

// =====================================================
// 重設
// =====================================================
function solarReset() {

    solarCurrentStep = -1;

    updateSolarPanel();
}

// =====================================================
// 更新太陽光電中文導覽
// =====================================================
function updateSolarPanel() {

    const number =
        document.getElementById(
            "solarStepNumber"
        );

    const title =
        document.getElementById(
            "solarStepTitle"
        );

    const description =
        document.getElementById(
            "solarStepDescription"
        );

    const energy =
        document.getElementById(
            "solarEnergyTag"
        );

    const prevBtn =
        document.getElementById(
            "solarPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "solarNextBtn"
        );

    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }

    // =========================
    // 尚未開始
    // =========================
    if (solarCurrentStep < 0) {

        number.textContent =
            "準備開始";

        title.textContent =
            "太陽光電發電";

        description.textContent =
            "請使用上方模型中的「Next view」依序觀看各設備，並搭配下方中文步驟了解陽光如何轉換成電能，再送往電網。";

        if (energy) {
            energy.textContent =
                "能量來源：陽光";
        }

        if (prevBtn) {
            prevBtn.disabled = true;
        }

        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent =
                "開始導覽";
        }
        return;
    }

    // =========================
    // 導覽中
    // =========================
    const step =
        solarSteps[
        solarCurrentStep
        ];

    number.textContent =
        `STEP ${solarCurrentStep + 1} / ${solarSteps.length}`;

    title.textContent =
        step.title;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    if (prevBtn) {
        prevBtn.disabled =
            solarCurrentStep === 0;
    }

    const isLastStep =
        solarCurrentStep ===
        solarSteps.length - 1;

    if (nextBtn) {

        if (isLastStep) {

            nextBtn.textContent =
                "導覽完成 ✓";

            nextBtn.disabled =
                true;

        } else {

            nextBtn.textContent =
                "下一步";

            nextBtn.disabled =
                false;
        }
    }
}

// =====================================================
// 頁面載入時初始化
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            document.getElementById(
                "solarStepNumber"
            )
        ) {
            solarCurrentStep = -1;
            updateSolarPanel();
        }

    }
);

// =====================================================
// Tokamak 手動中文導覽
// =====================================================

const tokamakSteps = [

    {
        title: "低溫恆溫器",
        description:
            "低溫恆溫器（Cryostat）是一個大型高真空壓力容器，包覆 Tokamak 的真空容器與超導磁鐵，提供高真空與低溫環境。",
        energy:
            "真空與低溫環境"
    },

    {
        title: "真空容器",
        description:
            "真空容器是一個甜甜圈形的鋼製容器，也是高溫電漿所在的主要空間。它提供高真空環境，並支撐偏濾器與包層等內部設備。",
        energy:
            "高真空環境"
    },

    {
        title: "屏蔽塊",
        description:
            "屏蔽塊安裝在真空容器內壁，可以協助阻擋核融合反應產生的高能中子，同時支撐第一壁面板，並利用冷卻水帶走熱量。",
        energy:
            "屏蔽與散熱"
    },

    {
        title: "第一壁面板",
        description:
            "第一壁面板直接面向高溫電漿，因此必須承受很高的熱負載。它也是保護真空容器內部結構的重要第一道表面。",
        energy:
            "承受電漿熱負載"
    },

    {
        title: "包層",
        description:
            "真空容器內壁覆蓋著包層模組，用來保護真空容器與超導磁鐵，降低核融合產生的高能中子與熱量對設備造成的影響。",
        energy:
            "中子屏蔽與散熱"
    },

    {
        title: "真空容器開口",
        description:
            "真空容器設有多個開口（Port），讓加熱設備、診斷系統、真空設備與維修裝置可以進入或連接真空容器。",
        energy:
            "設備連接與操作"
    },

    {
        title: "ELM 控制線圈",
        description:
            "ELM 控制線圈會產生特定的磁場擾動，協助降低電漿邊緣出現某些不穩定現象的機會，使電漿更容易受到控制。",
        energy:
            "電漿穩定控制"
    },

    {
        title: "垂直穩定線圈",
        description:
            "垂直穩定線圈位於 Tokamak 上下兩側，可以快速調整磁場，協助維持電漿在垂直方向上的穩定位置。",
        energy:
            "電漿位置控制"
    },

    {
        title: "真空容器內線圈",
        description:
            "真空容器內部還設有額外的控制線圈，用來提供更快速與精細的磁場調整，協助控制電漿的位置與形狀。",
        energy:
            "磁場控制"
    },

    {
        title: "磁場修正線圈",
        description:
            "修正線圈用來補償實際磁場中的微小誤差，使 Tokamak 內部形成的磁場更接近設計值，提升電漿控制的穩定性。",
        energy:
            "磁場修正"
    },

    {
        title: "預壓支撐結構",
        description:
            "中央螺線管運作時會產生非常大的電磁力，因此需要強固的預壓支撐結構固定線圈，避免線圈彼此分離或產生過大的變形。",
        energy:
            "結構支撐"
    },

    {
        title: "中央定位系統",
        description:
            "中央定位系統是中央螺線管支撐結構的一部分，負責讓中央螺線管保持在真空容器中心的正確位置。",
        energy:
            "結構定位"
    },

    {
        title: "中央螺線管",
        description:
            "中央螺線管可以在電漿中感應出強大的電流。這個電流是建立與維持 Tokamak 電漿的重要條件之一。",
        energy:
            "產生電漿電流"
    },

    {
        title: "環向磁場線圈",
        description:
            "環向磁場線圈（Toroidal Field Magnets）環繞真空容器，產生沿著甜甜圈方向的強磁場，主要作用是限制帶電的電漿粒子。",
        energy:
            "磁場約束電漿"
    },

    {
        title: "極向磁場線圈",
        description:
            "極向磁場線圈（Poloidal Field Magnets）位於環向磁場線圈外側，可以協助調整電漿的形狀與位置，並提高電漿的穩定性。",
        energy:
            "塑形與穩定電漿"
    },

    {
        title: "磁鐵供應系統",
        description:
            "磁鐵供應系統負責向超導磁鐵提供電流與低溫冷卻介質，使大型磁鐵能維持超導狀態並持續產生強磁場。",
        energy:
            "超導磁鐵供電與冷卻"
    },

    {
        title: "偏濾器",
        description:
            "偏濾器（Divertor）位於 Tokamak 底部，負責排出電漿中的熱量與融合反應產生的雜質，減少污染並保護真空容器內壁。",
        energy:
            "排熱與移除雜質"
    },

    {
        title: "偏濾器中央穹頂",
        description:
            "中央穹頂位於偏濾器中央，形狀配合磁場分布，用來保護偏濾器其他零件，降低電漿異常移動時造成的熱負載。",
        energy:
            "設備保護"
    },

    {
        title: "垂直靶板",
        description:
            "垂直靶板是偏濾器中直接面對高能粒子的元件，需要承受非常高的熱負載，因此使用耐高溫材料並搭配水冷系統。",
        energy:
            "承受粒子與熱負載"
    },

    {
        title: "偏濾器支撐結構",
        description:
            "偏濾器的支撐結構負責固定偏濾器各部件，使它們能在高熱負載與複雜的 Tokamak 環境中維持正確位置。",
        energy:
            "結構支撐"
    },

    {
        title: "冷卻系統",
        description:
            "Tokamak 的冷卻水系統會帶走真空容器、包層與偏濾器吸收的熱量，避免設備溫度過高，維持系統安全運作。",
        energy:
            "移除多餘熱量"
    }

];


let tokamakCurrentStep = -1;


// =====================================================
// 下一步
// =====================================================

function tokamakNext() {

    if (
        tokamakCurrentStep >=
        tokamakSteps.length - 1
    ) {
        return;
    }

    tokamakCurrentStep++;

    updateTokamakPanel();
}


// =====================================================
// 上一步
// =====================================================

function tokamakPrevious() {

    if (tokamakCurrentStep <= 0) {
        return;
    }

    tokamakCurrentStep--;

    updateTokamakPanel();
}


// =====================================================
// 重設
// =====================================================

function tokamakReset() {

    tokamakCurrentStep = -1;

    updateTokamakPanel();
}


// =====================================================
// 更新 Tokamak 中文導覽
// =====================================================

function updateTokamakPanel() {

    const number =
        document.getElementById(
            "tokamakStepNumber"
        );

    const title =
        document.getElementById(
            "tokamakStepTitle"
        );

    const description =
        document.getElementById(
            "tokamakStepDescription"
        );

    const energy =
        document.getElementById(
            "tokamakEnergyTag"
        );

    const prevBtn =
        document.getElementById(
            "tokamakPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "tokamakNextBtn"
        );


    if (
        !number ||
        !title ||
        !description
    ) {
        return;
    }


    // =========================
    // 尚未開始
    // =========================

    if (tokamakCurrentStep < 0) {

        number.textContent =
            "準備開始";

        title.textContent =
            "Tokamak 核融合反應器";

        description.textContent =
            "請使用上方模型中的「Next view」依序觀看各設備，並搭配下方中文步驟了解 Tokamak 如何建立與控制核融合所需的環境。";

        if (energy) {
            energy.textContent =
                "核融合條件：真空、電漿與磁場";
        }

        if (prevBtn) {
            prevBtn.disabled = true;
        }

        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent =
                "開始導覽";
        }

        return;
    }


    // =========================
    // 導覽中
    // =========================

    const step =
        tokamakSteps[
        tokamakCurrentStep
        ];

    number.textContent =
        `STEP ${tokamakCurrentStep + 1} / ${tokamakSteps.length}`;

    title.textContent =
        step.title;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    if (prevBtn) {
        prevBtn.disabled =
            tokamakCurrentStep === 0;
    }


    const isLastStep =
        tokamakCurrentStep ===
        tokamakSteps.length - 1;


    if (nextBtn) {

        if (isLastStep) {

            nextBtn.textContent =
                "導覽完成 ✓";

            nextBtn.disabled =
                true;

        } else {

            nextBtn.textContent =
                "下一步";

            nextBtn.disabled =
                false;
        }
    }
}


// =====================================================
// 頁面載入時初始化
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            document.getElementById(
                "tokamakStepNumber"
            )
        ) {
            tokamakCurrentStep = -1;
            updateTokamakPanel();
        }

    }
);


// =====================================================
// V9 共用學習狀態、答案保存、學習路線、解鎖
// =====================================================

const TRADITIONAL_MODULES = [
    { key: "thermal", label: "火力", href: "thermal.html" },
    { key: "nuclear", label: "核能", href: "nuclear.html" },
    { key: "wind", label: "風力", href: "wind.html" },
    { key: "hydro", label: "水力", href: "hydro.html" },
    { key: "solar", label: "太陽光電", href: "solar.html" }
];

const EMERGING_MODULES = [
    { key: "tokamak", label: "Tokamak", href: "tokamak.html" },
    { key: "challenge", label: "Alpha-E", href: "alpha-e-student-activity.html" }
];

function progressKey(key) { return `energy_progress_${key}`; }
function isDone(key) { return localStorage.getItem(progressKey(key)) === "done"; }
function setDone(key, done) {
    if (done) localStorage.setItem(progressKey(key), "done");
    else localStorage.removeItem(progressKey(key));
}
function countDone(list) { return list.filter(item => isDone(item.key)).length; }
function traditionalComplete() { return countDone(TRADITIONAL_MODULES) === 5; }
function discoverUnlocked() { return traditionalComplete(); }
function emergingUnlocked() { return discoverUnlocked() && isDone("discover"); }
function alphaUnlocked() { return emergingUnlocked() && isDone("tokamak"); }
function finalUnlocked() { return alphaUnlocked() && isDone("challenge"); }

function showLearningToast(message) {
    const old = document.querySelector(".learning-toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "learning-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
}

function createRouteLink({ href, label, number, subtitle, status, done, locked, subitems }) {
    const wrapper = document.createElement("div");
    wrapper.className = `route-stage${done ? " done" : ""}${locked ? " locked" : ""}`;

    const main = document.createElement(locked ? "button" : "a");
    main.className = "route-stage";
    if (!locked) main.href = href;
    else {
        main.type = "button";
        main.addEventListener("click", () => showLearningToast(status));
    }

    main.innerHTML = `
  <span class="route-stage-main">
    <span class="route-stage-num">${done ? "✓" : number}</span>

    <span class="route-stage-text">
      <strong>${label}</strong>
      ${subtitle ? `<small>${subtitle}</small>` : ""}
    </span>

    <span class="route-stage-status">${status}</span>
  </span>`;

    wrapper.appendChild(main);

    if (subitems?.length) {
        const row = document.createElement("div");
        row.className = "route-subitems";
        subitems.forEach(item => {
            const sub = document.createElement(item.locked ? "button" : "a");
            sub.className = `route-subitem${item.done ? " done" : ""}${item.locked ? " locked" : ""}`;
            sub.innerHTML = `${item.done ? "✓" : item.locked ? "🔒" : "○"} ${item.label}`;
            if (item.locked) {
                sub.type = "button";
                sub.addEventListener("click", () => showLearningToast(item.message || "尚未解鎖"));
            } else {
                sub.href = item.href;
            }
            row.appendChild(sub);
        });
        wrapper.appendChild(row);
    }
    return wrapper;
}

function renderLearningRoute() {

    const hosts =
        document.querySelectorAll(
            "[data-learning-route]"
        );

    if (!hosts.length) return;


    const traditionalCount =
        countDone(TRADITIONAL_MODULES);

    const emergingCount =
        countDone(EMERGING_MODULES);


    // =========================
    // 判斷目前是不是首頁
    // =========================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const isHome =
        currentPage === "" ||
        currentPage === "index.html";

    hosts.forEach(host => {

        host.innerHTML = "";


        const route =
            document.createElement("div");

        route.className =
            "learning-route";


        // 首頁展開，其餘頁面預設收起
        if (!isHome) {
            route.classList.add(
                "route-collapsed"
            );
        }


        // =========================
        // 標題列
        // =========================

        const header =
            document.createElement("button");

        header.type =
            "button";

        header.className =
            "learning-route-head route-toggle";


        header.innerHTML = `
            <div>
                <h3>
                    我的學習路線
                </h3>

                <p>
                    點擊查看目前進度與可前往的學習階段
                </p>
            </div>

            <div class="route-head-right">

                <span class="route-overall">
                    傳統能源 ${traditionalCount}/5
                </span>

                ${!isHome ? `
    <span class="route-toggle-icon">
        ＋
    </span>
` : ""}

            </div>
        `;


        route.appendChild(
            header
        );


        // =========================
        // 內容區
        // =========================

        const content =
            document.createElement("div");

        content.className =
            "learning-route-content";


        const list =
            document.createElement("div");

        list.className =
            "route-stage-list";


        list.appendChild(
            createRouteLink({

                href:
                    "index.html#start",

                label:
                    "先想一想",

                number:
                    "1",

                subtitle:
                    "留下原本的想法",

                status:
                    isDone("start")
                        ? "已完成"
                        : "未完成",

                done:
                    isDone("start"),

                locked:
                    false
            })
        );


        list.appendChild(
            createRouteLink({

                href:
                    "index.html#explore",

                label:
                    "傳統能源探索",

                number:
                    "2",

                subtitle: "",

                status:
                    `已完成 ${traditionalCount} / 5`,

                done:
                    traditionalCount === 5,

                locked:
                    false,

                subitems:
                    TRADITIONAL_MODULES.map(
                        item => ({

                            ...item,

                            done:
                                isDone(
                                    item.key
                                ),

                            locked:
                                false

                        })
                    )
            })
        );


        list.appendChild(
            createRouteLink({

                href:
                    "index.html#discover",

                label:
                    "整理發現",

                number:
                    "3",

                subtitle:
                    "比較五種能源與臺灣電力角色",

                status:
                    discoverUnlocked()
                        ? (
                            isDone("discover")
                                ? "已完成"
                                : "已解鎖"
                        )
                        : "完成 5 / 5 後解鎖",

                done:
                    isDone("discover"),

                locked:
                    !discoverUnlocked()
            })
        );


        list.appendChild(
            createRouteLink({

                href:
                    "index.html#emerging",

                label:
                    "新興能源",

                number:
                    "4",

                subtitle: "",

                status:
                    emergingUnlocked()
                        ? `已完成 ${emergingCount} / 2`
                        : "完成整理發現後解鎖",

                done:
                    emergingCount === 2,

                locked:
                    !emergingUnlocked(),

                subitems: [

                    {
                        label:
                            "Tokamak",

                        href:
                            "tokamak.html",

                        done:
                            isDone(
                                "tokamak"
                            ),

                        locked:
                            !emergingUnlocked(),

                        message:
                            "請先完成五種傳統能源與整理發現。"
                    },

                    {
                        label:
                            "Alpha-E",

                        href:
                            "alpha-e-student-activity.html",

                        done:
                            isDone(
                                "challenge"
                            ),

                        locked:
                            !alphaUnlocked(),

                        message:
                            emergingUnlocked()
                                ? "請先完成 Tokamak，再進入 Alpha-E。"
                                : "請先完成前面的學習階段。"
                    }

                ]
            })
        );


        list.appendChild(
            createRouteLink({

                href:
                    "student-summary.html",

                label:
                    "學習整理",

                number:
                    "5",

                subtitle:
                    "七個模組最終比較與反思",

                status:
                    finalUnlocked()
                        ? (
                            isDone("review")
                                ? "已完成"
                                : "已解鎖"
                        )
                        : "完成新興能源 2 / 2 後解鎖",

                done:
                    isDone("review"),

                locked:
                    !finalUnlocked()
            })
        );


        content.appendChild(
            list
        );

        route.appendChild(
            content
        );

        host.appendChild(
            route
        );


        // =========================
        // 收合功能
        // =========================

        if (!isHome) {

            header.addEventListener(
                "click",
                () => {

                    route.classList.toggle(
                        "route-collapsed"
                    );

                    const icon =
                        header.querySelector(
                            ".route-toggle-icon"
                        );

                    if (icon) {

                        icon.textContent =
                            route.classList.contains(
                                "route-collapsed"
                            )
                                ? "＋"
                                : "－";
                    }

                }
            );
        };

    });

}

function refreshModuleCards() {
    document.querySelectorAll("[data-module-card]").forEach(card => {
        const key = card.dataset.moduleCard;
        const status = card.querySelector(".module-card-status");
        card.classList.toggle("done", isDone(key));
        if (status && isDone(key)) status.textContent = "已完成 ✓";
    });

    const t = document.getElementById("traditionalProgressText");
    if (t) t.textContent = `已完成 ${countDone(TRADITIONAL_MODULES)} / 5`;

    const e = document.getElementById("emergingProgressText");
    if (e) e.textContent = `已完成 ${countDone(EMERGING_MODULES)} / 2`;
}

function blockAlphaClick(event) {
    if (!alphaUnlocked()) {
        event.preventDefault();
        showLearningToast("請先完成 Tokamak，再進入 Alpha-E。");
    }
}

function refreshGates() {
    const discover = document.querySelector('[data-gate="discover"]');
    if (discover) discover.classList.toggle("is-locked", !discoverUnlocked());

    const emerging = document.querySelector('[data-gate="emerging"]');
    if (emerging) emerging.classList.toggle("is-locked", !emergingUnlocked());

    const finalGate = document.querySelector('[data-gate="final"]');
    if (finalGate) finalGate.classList.toggle("is-locked", !finalUnlocked());

    document.querySelectorAll('[data-link-requires="alpha"]').forEach(link => {
        const locked = !alphaUnlocked();
        link.classList.toggle("locked", locked);
        const status = link.querySelector(".module-card-status");
        if (locked) {
            link.addEventListener("click", blockAlphaClick);
            if (status && !isDone("challenge")) status.textContent = "完成 Tokamak 後解鎖";
        } else {
            link.removeEventListener("click", blockAlphaClick);
            if (status && !isDone("challenge")) status.textContent = "開始探索 →";
        }
    });
}

function refreshAllLearningUI() {

    renderLearningRoute();

    refreshHomeRoute();

    refreshModuleCards();

    refreshGates();
}

function updateCompletionButton(button, key, done) {
    const defaultLabel = button.dataset.defaultLabel || "完成這一段";
    button.classList.toggle("done", done);
    button.textContent = done ? "已完成 ✓（再按一次可取消）" : defaultLabel;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".complete-phase-btn[data-complete-section]").forEach(button => {
        const key = button.dataset.completeSection;
        updateCompletionButton(button, key, isDone(key));
        button.addEventListener("click", () => {
            const newState = !isDone(key);
            setDone(key, newState);
            updateCompletionButton(button, key, newState);

            if (key === "review") {
                const completeCard = document.getElementById("lessonComplete");
                if (completeCard) completeCard.hidden = !newState;
            }
            refreshAllLearningUI();
        });
    });

    const completeCard = document.getElementById("lessonComplete");
    if (completeCard) completeCard.hidden = !isDone("review");

    document.querySelectorAll("textarea[data-save], input[data-save]").forEach(field => {
        const saveName = field.dataset.save;
        if (!saveName) return;
        const key = `energy_answer_${saveName}`;
        const saved = localStorage.getItem(key);
        if (saved !== null) field.value = saved;
        const save = () => localStorage.setItem(key, field.value);
        field.addEventListener("input", save);
        field.addEventListener("change", save);
    });

    document.querySelectorAll("[data-radio-group]").forEach(group => {
        const groupName = group.dataset.radioGroup;
        if (!groupName) return;
        const key = `energy_answer_${groupName}`;
        const radios = group.querySelectorAll('input[type="radio"]');
        const saved = localStorage.getItem(key);
        if (saved !== null) radios.forEach(radio => radio.checked = radio.value === saved);
        radios.forEach(radio => radio.addEventListener("change", () => {
            if (radio.checked) localStorage.setItem(key, radio.value);
        }));
    });

    refreshAllLearningUI();

    const requirement = document.body.dataset.pageRequires;
    if (requirement === "emerging" && !emergingUnlocked()) {
        showPageLock("Tokamak 尚未解鎖","請先完成五種傳統能源探索與「整理發現」。","index.html#discover");
    }
    if (requirement === "alpha" && !alphaUnlocked()) {
        showPageLock("Alpha-E 尚未解鎖","請先完成 Tokamak，再進入 Alpha-E 挑戰。","index.html#emerging");
    }
    if (requirement === "final" && !finalUnlocked()) {
        showPageLock("學習整理尚未解鎖","請先完成 Tokamak 與 Alpha-E 兩個新興能源模組。","index.html#emerging");
    }
});

function showPageLock(title, message, backHref) {
    const overlay = document.createElement("div");
    overlay.className = "page-lock-overlay";
    overlay.innerHTML = `
      <div class="page-lock-card">
        <div style="font-size:1.5rem;">🔒</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a class="btn btn-dark" href="${backHref}">回到學習路線</a>
      </div>`;
    document.body.appendChild(overlay);
}

function refreshHomeRoute() {

    const start =
        document.querySelector(
            '[data-home-route="start"]'
        );

    const traditional =
        document.querySelector(
            '[data-home-route="traditional"]'
        );

    const discover =
        document.querySelector(
            '[data-home-route="discover"]'
        );

    const emerging =
        document.querySelector(
            '[data-home-route="emerging"]'
        );

    const summary =
        document.querySelector(
            '[data-home-route="summary"]'
        );


    const traditionalCount =
        countDone(
            TRADITIONAL_MODULES
        );

    const emergingCount =
        countDone(
            EMERGING_MODULES
        );


    // 1 先想一想
    if (start) {

        const status =
            start.querySelector(
                ".phase-status"
            );

        start.classList.toggle(
            "done",
            isDone("start")
        );

        if (status) {
            status.textContent =
                isDone("start")
                    ? "已完成"
                    : "未完成";
        }
    }


    // 2 傳統能源
    if (traditional) {

        const status =
            traditional.querySelector(
                ".phase-status"
            );

        traditional.classList.toggle(
            "done",
            traditionalCount === 5
        );

        if (status) {
            status.textContent =
                `已完成 ${traditionalCount} / 5`;
        }
    }


    // 3 整理發現
    if (discover) {

        const status =
            discover.querySelector(
                ".phase-status"
            );

        const unlocked =
            discoverUnlocked();

        discover.classList.toggle(
            "done",
            isDone("discover")
        );

        discover.classList.toggle(
            "locked",
            !unlocked
        );

        if (status) {

            status.textContent =
                !unlocked
                    ? "尚未解鎖"
                    : isDone("discover")
                        ? "已完成"
                        : "已解鎖";
        }

        discover.onclick =
            unlocked
                ? null
                : (event) => {

                    event.preventDefault();

                    showLearningToast(
                        "請先完成五種傳統能源。"
                    );
                };
    }


    // 4 新興能源
    if (emerging) {

        const status =
            emerging.querySelector(
                ".phase-status"
            );

        const unlocked =
            emergingUnlocked();

        emerging.classList.toggle(
            "done",
            emergingCount === 2
        );

        emerging.classList.toggle(
            "locked",
            !unlocked
        );

        if (status) {

            status.textContent =
                unlocked
                    ? `已完成 ${emergingCount} / 2`
                    : "尚未解鎖";
        }

        emerging.onclick =
            unlocked
                ? null
                : (event) => {

                    event.preventDefault();

                    showLearningToast(
                        "請先完成「整理發現」。"
                    );
                };
    }


    // 5 最終整理
    if (summary) {

        const status =
            summary.querySelector(
                ".phase-status"
            );

        const unlocked =
            finalUnlocked();

        summary.classList.toggle(
            "done",
            isDone("review")
        );

        summary.classList.toggle(
            "locked",
            !unlocked
        );

        if (status) {

            status.textContent =
                !unlocked
                    ? "尚未解鎖"
                    : isDone("review")
                        ? "已完成"
                        : "已解鎖";
        }

        summary.onclick =
            unlocked
                ? null
                : (event) => {

                    event.preventDefault();

                    showLearningToast(
                        "請先完成 Tokamak 與 Alpha-E。"
                    );
                };
    }
}

/* =========================================================
   各能源模組共用：小試身手
========================================================= */

function initMiniQuizzes() {

    document
        .querySelectorAll("[data-mini-quiz]")
        .forEach(card => {

            const quizKey =
                card.dataset.quizKey;

            if (!quizKey) return;

            const radios =
                card.querySelectorAll(
                    `input[name="${quizKey}"]`
                );

            const saveBtn =
                card.querySelector(
                    ".quiz-save-btn"
                );

            const status =
                card.querySelector(
                    ".quiz-save-status"
                );


            // -------------------------
            // 還原之前的作答
            // -------------------------

            const savedAnswer =
                localStorage.getItem(
                    `energy_quiz_${quizKey}`
                );

            if (savedAnswer) {

                const savedRadio =
                    card.querySelector(
                        `input[value="${savedAnswer}"]`
                    );

                if (savedRadio) {
                    savedRadio.checked = true;
                }

                if (status) {
                    status.textContent =
                        "已儲存答案";
                }
            }


            // -------------------------
            // 儲存答案
            // -------------------------

            if (saveBtn) {

                saveBtn.addEventListener(
                    "click",
                    () => {

                        const selected =
                            card.querySelector(
                                `input[name="${quizKey}"]:checked`
                            );

                        if (!selected) {

                            if (status) {
                                status.textContent =
                                    "請先選擇一個答案";
                            }

                            return;
                        }


                        localStorage.setItem(
                            `energy_quiz_${quizKey}`,
                            selected.value
                        );


                        if (status) {
                            status.textContent =
                                "答案已儲存 ✓";
                        }

                    }
                );
            }

        });
}

document.addEventListener(
    "DOMContentLoaded",
    initMiniQuizzes
);

const MINI_QUIZ_ANSWERS = {
    thermal_quiz_1: {
        answer: "C",
        explanation: "……"
    },

    nuclear_quiz_1: {
        answer: "D",
        explanation: "……"
    },

    wind_quiz_1: {
        answer: "B",
        explanation:
            "風力發電主要將風的動能轉成旋轉機械能，再由發電機轉成電能。"
    }
};
