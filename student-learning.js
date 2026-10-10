// =====================================================
// 火力發電 Unity 網頁控制
// =====================================================

const thermalSteps = [
    {
        title: "液化天然氣儲槽",
        description:
            "儲存液化天然氣，在燃料送入發電系統前提供天然氣供應。"
    },

    {
        title: "熱回收蒸汽產生器",
        description:
            "利用天然氣燃燒所產生的熱能加熱水並產生蒸氣，供後續蒸汽渦輪機使用。"
    },

    {
        title: "蒸汽渦輪機",
        description:
            "高壓蒸氣推動渦輪機旋轉，將熱能轉換成旋轉的機械能。"
    },

    {
        title: "煙囪",
        description:
            "燃燒後的廢氣經由煙囪排出。天然氣發電相較於燃煤發電，產生的污染排放通常較少。"
    },

    {
        title: "冷凝器",
        description:
            "蒸氣通過渦輪機後進入冷凝器，被冷卻並凝結回水，使水能夠繼續在發電系統中循環使用。"
    },

    {
        title: "給水泵",
        description:
            "給水泵將冷凝後的水送回熱回收蒸汽產生器，使蒸汽循環能夠持續進行。"
    },

    {
        title: "冷卻塔",
        description:
            "冷卻塔移除循環水系統中的多餘熱量，並將部分熱量以水蒸氣的形式釋放到大氣中。"
    },

    {
        title: "冷卻水泵",
        description:
            "冷卻水泵使冷卻水在冷凝器與冷卻塔之間循環，協助維持系統穩定的散熱與運作。"
    },

    {
        title: "發電機",
        description:
            "發電機利用電磁感應，將渦輪機的旋轉機械能轉換成電能。"
    },

    {
        title: "變壓器",
        description:
            "變壓器調整電力的電壓，使產生的電能能夠更有效率地進行輸電與配電。"
    },

    {
        title: "電力負載",
        description:
            "發電廠產生的電能最後送到電力負載使用。在這個模型中，燈泡亮度會隨天然氣輸入量改變。"
    }
];

let thermalCurrentStep = -1;


// 傳送一般控制指令給 Unity
function sendThermalCommand(command) {
    const iframe = document.getElementById("thermalUnity");

    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage({
        type: "THERMAL_COMMAND",
        command: command
    }, "*");
}


// 下一步
function thermalNext() {
    if (thermalCurrentStep >= thermalSteps.length - 1) {
        return;
    }

    thermalCurrentStep++;

    sendThermalCommand("NEXT");
    updateThermalPanel();
}


// 上一步
function thermalPrevious() {
    if (thermalCurrentStep <= 0) {
        return;
    }

    thermalCurrentStep--;

    sendThermalCommand("PREVIOUS");
    updateThermalPanel();
}


// 重設
function thermalReset() {
    thermalCurrentStep = -1;

    sendThermalCommand("RESET");

    const slider = document.getElementById("thermalGasSlider");

    if (slider) {
        slider.value = 50;
    }

    setThermalGas(50);
    updateThermalPanel();
}


// 更新網頁說明文字
function updateThermalPanel() {
    const number = document.getElementById("thermalStepNumber");
    const title = document.getElementById("thermalStepTitle");
    const description =
        document.getElementById("thermalStepDescription");

    const prevBtn =
        document.getElementById("thermalPrevBtn");

    const nextBtn =
        document.getElementById("thermalNextBtn");

    if (!number || !title || !description) return;

    if (thermalCurrentStep < 0) {
        number.textContent = "準備開始";
        title.textContent = "天然氣火力發電";
        description.textContent =
            "按下「開始」進入火力發電流程。";

        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.textContent = "開始";

        return;
    }

    const step = thermalSteps[thermalCurrentStep];

    number.textContent =
        `STEP ${thermalCurrentStep + 1} / ${thermalSteps.length}`;

    title.textContent = step.title;
    description.textContent = step.description;

    if (prevBtn) {
        prevBtn.disabled = thermalCurrentStep === 0;
    }

    if (nextBtn) {
        nextBtn.textContent =
            thermalCurrentStep === thermalSteps.length - 1
                ? "完成導覽"
                : "下一步";
    }
}


// Gas Input Slider
function setThermalGas(value) {
    const valueText =
        document.getElementById("thermalGasValue");

    if (valueText) {
        valueText.textContent = value;
    }

    const iframe =
        document.getElementById("thermalUnity");

    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage({
        type: "THERMAL_GAS",
        value: String(value)
    }, "*");
}

console.log("THERMAL JS LOADED");