// =====================================================
// 火力發電 Unity 網頁控制
// =====================================================

const thermalSteps = [
    {
        title: "天然氣供應",
        description:
            "天然氣中儲存著化學能。啟動燃料供應後，天然氣會進入發電系統，準備進行燃燒與後續的能量轉換。"
    },
    {
        title: "燃燒與熱回收蒸汽產生器",
        description:
            "天然氣燃燒後，化學能轉換成熱能。產生的熱能經由 HRSG（熱回收蒸汽產生器）加熱水並形成高溫蒸氣。"
    },
    {
        title: "蒸氣推動汽輪機",
        description:
            "高溫高壓蒸氣流向汽輪機並推動葉片旋轉，使熱能進一步轉換成旋轉的機械能。"
    },
    {
        title: "冷凝與冷卻循環",
        description:
            "通過汽輪機後的蒸氣進入冷凝與冷卻系統，將熱量帶走並使水回到系統中，形成循環使用的工作流體。"
    },
    {
        title: "發電與電力輸出",
        description:
            "汽輪機的旋轉帶動發電機，將機械能轉換成電能，之後再送往後續的電力系統。"
    },
    {
        title: "電力使用",
        description:
            "當電力輸出完成後，燈泡亮起代表電能已經可以供應負載。回頭看看整個過程，能量依序經過化學能、熱能、機械能，最後轉換成電能。"
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
                ? "完成"
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