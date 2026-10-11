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
// 風力發電手動文字導覽
// =====================================================

const windSteps = [

    {
        title: "主軸",
        description:
            "主軸是風力機傳動系統的一部分，與轉子相連。這支低速主軸會隨著葉片與轉子旋轉，將旋轉的機械能傳往後續設備。",
        energy:
            "旋轉機械能傳遞"
    },

    {
        title: "主軸軸承",
        description:
            "主軸軸承支撐旋轉中的低速主軸，並減少零件運動時產生的摩擦，使轉子傳來的力量能穩定地傳遞。",
        energy:
            "支撐與減少摩擦"
    },

    {
        title: "轉子",
        description:
            "轉子主要由葉片與輪轂組成，並與主軸連接。風吹動葉片後，轉子開始旋轉，將風的動能轉換成旋轉的機械能。",
        energy:
            "風的動能 → 機械能"
    },

    {
        title: "葉片",
        description:
            "風流過葉片時，葉片兩側的氣流與壓力差會產生升力與阻力。當升力作用使轉子旋轉時，風的動能便開始轉換成旋轉的機械能。",
        energy:
            "風的動能 → 機械能"
    },

    {
        title: "葉片變槳系統",
        description:
            "變槳系統可以調整葉片相對於風的角度，以控制轉子的轉速與取得的風能。當風速過高時，也能調整葉片角度來降低負載並保護風力機。",
        energy:
            "控制風能擷取"
    },

    {
        title: "塔架",
        description:
            "塔架支撐風力機的機艙與轉子，讓葉片能位於較高的位置。通常高度越高，越有機會接觸到較穩定且較強的風。",
        energy:
            "結構支撐"
    },

    {
        title: "偏航驅動系統",
        description:
            "偏航驅動系統會旋轉機艙，使風力機能朝向目前的風向，讓葉片維持較適合取得風能的方向。",
        energy:
            "風向控制"
    },

    {
        title: "齒輪箱",
        description:
            "齒輪箱利用不同齒輪將低速主軸的旋轉轉換成較適合發電機使用的轉速，再把旋轉的機械能傳到發電機。",
        energy:
            "機械能傳遞"
    },

    {
        title: "發電機",
        description:
            "葉片與轉子的旋轉經由主軸和齒輪箱傳到發電機。發電機利用磁場與線圈之間的相對運動，把旋轉的機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "轉子煞車",
        description:
            "需要停止風力機時，可利用葉片變槳降低受風作用，再由轉子煞車協助固定轉子。它也能在維修時作為停車煞車使用。",
        energy:
            "停止與安全"
    },

    {
        title: "風速計",
        description:
            "風速計用來測量風速。控制系統會利用這些資料調整葉片角度，使風力機在不同風速下能更有效率且安全地運轉。",
        energy:
            "風速偵測"
    },

    {
        title: "風向標",
        description:
            "風向標用來測量風向，並將資訊提供給偏航驅動系統，使機艙與轉子能轉向適合的方向面對來風。",
        energy:
            "風向偵測"
    },

    {
        title: "機艙",
        description:
            "機艙位於塔架頂端，內部容納風力發電的重要設備，例如主軸、齒輪箱與發電機，是旋轉機械能傳遞與發電的主要設備區。",
        energy:
            "發電設備區"
    },

    {
        title: "你知道嗎？",
        description:
            "大型風力機的葉片可以非常長，有些葉片長度甚至超過 100 公尺。較大的葉片能掃過更大的面積，因此可以從風中取得更多能量。",
        energy:
            "延伸認識"
    }

];


let windCurrentStep = -1;


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

    windCurrentStep++;

    updateWindPanel();
}


// =====================================================
// 上一步
// =====================================================

function windPrevious() {

    if (windCurrentStep <= 0) {
        return;
    }

    windCurrentStep--;

    updateWindPanel();
}


// =====================================================
// 重設
// =====================================================

function windReset() {

    windCurrentStep = -1;

    updateWindPanel();
}


// =====================================================
// 更新風力中文導覽
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

    const prevBtn =
        document.getElementById(
            "windPrevBtn"
        );

    const nextBtn =
        document.getElementById(
            "windNextBtn"
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

    if (windCurrentStep < 0) {

        number.textContent =
            "準備開始";

        title.textContent =
            "水平軸風力發電機";

        description.textContent =
            "請使用上方模型中的「Next view」依序觀看各設備，並搭配下方中文步驟了解風力發電的運作方式。";

        if (energy) {
            energy.textContent =
                "能量來源：風";
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
        windSteps[
        windCurrentStep
        ];


    number.textContent =
        `STEP ${windCurrentStep + 1} / ${windSteps.length}`;

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
            windCurrentStep === 0;
    }


    const isLastStep =
        windCurrentStep ===
        windSteps.length - 1;


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
                "windStepNumber"
            )
        ) {
            windCurrentStep = -1;
            updateWindPanel();
        }

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
        title: "光伏電池",
        description:
            "光伏電池是太陽光電發電的核心元件，主要由半導體材料構成。當半導體吸收光的能量後，能量會傳遞給電子，使電子移動並形成電流。",
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