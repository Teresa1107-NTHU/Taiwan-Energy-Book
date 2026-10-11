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
// Gas Input 提示狀態
// =====================================================

function showThermalGasHint(ready) {

    const hint =
        document.getElementById(
            "thermalStartHint"
        );

    if (!hint) {
        return;
    }


    hint.classList.toggle(
        "ready",
        ready
    );


    const strong =
        hint.querySelector(
            "strong"
        );

    const text =
        hint.querySelector(
            "p"
        );

    const icon =
        hint.querySelector(
            ".thermal-hint-icon"
        );


    if (ready) {

        if (icon) {
            icon.textContent =
                "✓";
        }

        if (strong) {
            strong.textContent =
                "天然氣輸入已設定";
        }

        if (text) {
            text.textContent =
                "現在可以按下「開始導覽」，逐步觀察天然氣如何轉換成最後的電能。";
        }

    } else {

        if (icon) {
            icon.textContent =
                "01";
        }

        if (strong) {
            strong.textContent =
                "先設定天然氣輸入量";
        }

        if (text) {
            text.textContent =
                "拖曳 Gas Input 滑桿到大於 0%，再開始觀察發電流程。";
        }
    }
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
    title.textContent = "你已完成火力發電導覽";
    text.textContent =
        "現在可以再拉拉看滑桿，比較天然氣輸入量改變時，模型中的系統運作與燈泡亮度有什麼差異。";
}