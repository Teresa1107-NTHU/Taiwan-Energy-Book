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