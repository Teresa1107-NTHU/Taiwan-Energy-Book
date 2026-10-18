
const ENERGY_SUBMIT_URL =
    "https://script.google.com/macros/s/AKfycby5SSVFvh6uV-c4Jz5kGVBt-XYU34OOqbpacPfxhwi37qfHH-3ENitj4InYiiwck7Wp/exec";

    function collectEnergyAnswers() {

    return {

        participant_id:
            localStorage.getItem(
                "energy_participant_id"
            ) || "",


        start_q1:
            localStorage.getItem(
                "energy_answer_start_q1"
            ) || "",

        start_q2:
            localStorage.getItem(
                "energy_answer_start_q2"
            ) || "",


        thermal:
            localStorage.getItem(
                "energy_quiz_thermal_quiz_1"
            ) || "",

        nuclear:
            localStorage.getItem(
                "energy_quiz_nuclear_quiz_1"
            ) || "",

        wind:
            localStorage.getItem(
                "energy_quiz_wind_quiz_1"
            ) || "",

        hydro:
            localStorage.getItem(
                "energy_quiz_hydro_quiz_1"
            ) || "",

        solar:
            localStorage.getItem(
                "energy_quiz_solar_quiz_1"
            ) || "",

        tokamak:
            localStorage.getItem(
                "energy_quiz_tokamak_quiz_1"
            ) || "",


        discover:
            localStorage.getItem(
                "energy_answer_discover_reflection"
            ) || "",


        vacuum_predict:
            localStorage.getItem(
                "energy_answer_vacuum_predict"
            ) || "",

        vacuum_reason:
            localStorage.getItem(
                "energy_answer_vacuum_reason"
            ) || "",

        vacuum_observe:
            localStorage.getItem(
                "energy_answer_vacuum_observe"
            ) || "",

        vacuum_explain:
            localStorage.getItem(
                "energy_answer_vacuum_explain"
            ) || "",


        fuel_predict:
            localStorage.getItem(
                "energy_answer_fuel_predict"
            ) || "",

        fuel_observe:
            localStorage.getItem(
                "energy_answer_fuel_observe"
            ) || "",

        fuel_explain:
            localStorage.getItem(
                "energy_answer_fuel_explain"
            ) || "",


        review_q1:
            localStorage.getItem(
                "energy_answer_review_q1"
            ) || "",

        review_q2:
            localStorage.getItem(
                "energy_answer_review_q2"
            ) || "",

        review_q3:
            localStorage.getItem(
                "energy_answer_review_q3"
            ) || ""

    };

}

async function submitEnergyAnswers() {

    const data =
        collectEnergyAnswers();


    const response =
        await fetch(
            ENERGY_SUBMIT_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(data)
            }
        );


    if (!response.ok) {

        throw new Error(
            "送出失敗"
        );

    }


    return true;

}

// =====================================================
// 火力發電 Unity 網頁控制
// =====================================================

const thermalSteps = [

    {
        title: "液化天然氣儲槽",
        english: "LNG Storage Tank",
        description:
            "液化天然氣在送入發電系統前先儲存在儲槽中。天然氣本身儲存著化學能，是這套發電系統最初的能量來源。",
        energy:
            "化學能"
    },

    {
        title: "熱回收蒸汽產生器",
        english: "Heat Recovery Steam Generator",
        description:
            "天然氣燃燒後可以形成高溫氣體。熱回收蒸汽產生器利用其中的熱能加熱水並產生蒸氣，使熱能可以繼續被利用。在實際的天然氣複循環發電系統中，HRSG 主要回收燃氣渦輪機排出的高溫氣體。它本身不是直接產生電能的設備。",
        energy:
            "熱能傳遞"
    },

    {
        title: "蒸汽渦輪機",
        english: "Steam Turbine",
        description:
            "高壓蒸氣推動蒸汽渦輪機的葉片與轉軸旋轉，使蒸氣所攜帶的能量轉換成旋轉的機械能，再由轉軸帶動發電機。",
        energy:
            "熱能 → 機械能"
    },

    {
        title: "煙囪",
        english: "Stack",
        description:
            "天然氣燃燒後產生的廢氣經由煙囪排出。煙囪主要負責排放燃燒後的氣體，並不是產生電能的設備。",
        energy:
            "燃燒後氣體排放"
    },

    {
        title: "冷凝器",
        english: "Condenser",
        description:
            "蒸氣通過渦輪機後進入冷凝器，被冷卻並凝結回水，使水可以再次進入蒸汽循環。",
        energy:
            "蒸氣 → 水"
    },

    {
        title: "給水泵",
        english: "Feedwater Pump",
        description:
            "給水泵將冷凝後的水送回熱回收蒸汽產生器，使工作流體可以持續循環使用。",
        energy:
            "水循環"
    },

    {
        title: "冷卻塔",
        english: "Cooling Tower",
        description:
            "冷卻塔將循環水中的多餘熱量排放到環境中，協助降低冷卻水的溫度。",
        energy:
            "移除多餘熱量"
    },

    {
        title: "冷卻水泵",
        english: "Cooling Water Pump",
        description:
            "冷卻水泵讓冷卻水在冷凝器與冷卻塔之間循環，協助冷凝器持續帶走蒸氣中的熱量。",
        energy:
            "冷卻循環"
    },

    {
        title: "發電機",
        english: "Generator",
        description:
            "汽輪機帶動發電機旋轉，發電機利用電磁感應將旋轉的機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "變壓器",
        english: "Transformer",
        description:
            "發電機產生電力後，變壓器會調整電壓，使電能更適合進行後續的輸電與配電。",
        energy:
            "電能傳輸"
    },

    {
        title: "電力負載",
        english: "Electrical Load",
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

        title.innerHTML =
            `天然氣火力發電
             <span class="thermal-title-en">
                 Natural Gas Power Generation
             </span>`;

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

    title.innerHTML =
        `${step.title}
     <span class="thermal-title-en">
         ${step.english}
     </span>`;

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

    if (!hint || !icon || !title) return;

    hint.classList.remove("ready", "started", "complete");
    hint.classList.add("started");

    icon.textContent = "↔";
    title.textContent = "試著拉動滑桿比較看看";

    if (text) {
        text.textContent = "";
    }
}

// =====================================================
// 核能發電自動同步導覽
// =====================================================
const NUCLEAR_MODEL_URL =
    "https://my-3d-proxy.loveleehom9.workers.dev/npp-pwr";

const nuclearSteps = [

    {
        title: "反應爐建築",
        english: "Reactor Building",
        description:
            "反應爐建築主要由鋼筋混凝土構成，容納核能發電廠的重要設備，主要功能是提升正常運轉與事故情況下的安全性。",
        energy:
            "安全與防護"
    },

    {
        title: "反應爐",
        english: "Reactor",
        description:
            "反應爐是核燃料進行受控核分裂的地方。核分裂釋放的核能會轉換成熱能，再用來產生電力。壓水式反應爐（PWR）使用厚壁鋼製壓力槽。",
        energy:
            "核能 → 熱能"
    },

    {
        title: "蒸汽產生器",
        english: "Steam Generator",
        description:
            "功能類似熱交換器。它把反應爐系統帶來的熱量傳給另一側的水，使水形成蒸氣，再利用蒸氣推動汽輪機。",
        energy:
            "熱能傳遞"
    },

    {
        title: "反應爐冷卻水泵",
        english: "Reactor Coolant Pump",
        description:
"反應爐冷卻水泵讓冷卻水持續循環，把反應爐產生的熱帶到蒸汽產生器。",
        energy:
    "冷卻水循環"
    },

    {
        title: "穩壓器系統",
        english: "Pressurizer System",
        description:
            "穩壓器用來協助維持反應爐冷卻系統的壓力，使系統保持適當的運轉條件。",
        energy:
            "壓力控制"
    },

    {
        title: "混凝土屏蔽",
        english: "Concrete Shielding",
        description:
            "鋼筋混凝土結構包覆並保護反應爐與重要設備，同時也作為阻隔游離輻射的重要屏障。",
        energy:
            "安全與防護"
    },

    {
        title: "汽輪機廠房",
        english: "Turbine Hall",
        description:
            "汽輪機廠房內包含利用蒸汽發電所需的主要設備，例如汽輪機、冷凝器與發電機，也可能包含汽水分離器與加熱設備。",
        energy:
            "發電設備區"
    },

    {
        title: "蒸汽汽輪機",
        english: "Steam Turbine",
        description:
            "汽輪機把蒸汽所攜帶的能量轉換成旋轉的機械能，並利用轉軸帶動發電機。",
        energy:
            "熱能 → 機械能"
    },

    {
        title: "發電機",
        english: "Electric Generator",
        description:
            "發電機把汽輪機提供的旋轉機械能轉換成電能。旋轉磁場會在定子線圈中感應出電壓。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "冷凝器",
        english: "Condenser",
        description:
            "通過汽輪機後的蒸汽在冷凝器中冷卻並凝結成水，再經由系統送回蒸汽產生器。冷凝器吸收的熱則由冷卻水帶走。",
        energy:
            "蒸汽 → 水循環"
    },

    {
        title: "冷卻塔",
        english: "Cooling Tower",
        description:
            "冷卻塔主要用來降低冷凝器循環冷卻水的溫度，使冷卻水可以持續循環使用。",
        energy:
            "散熱與冷卻"
    },

    {
        title: "電力輸出",
        english: "Power Output",
        description:
            "淨電力輸出表示實際送入電網的電力。發電廠本身也會消耗一部分所產生的電力來維持設備運轉。",
        energy:
            "電能 → 電網"
    },

    {
        title: "汽水分離再熱器",
        english: "Moisture Separator Reheater",
        description:
            "汽水分離再熱器（MSR）會移除高壓汽輪機出口蒸汽中的水分，並在蒸汽進入低壓汽輪機前重新加熱，以提升效率並減少汽輪機葉片受到侵蝕。",
        energy:
            "蒸汽品質與效率"
    }

];

let nuclearCurrentStep = -1;

// =====================================================
// 取得核能 iframe
// =====================================================
function getNuclearIframe() {

    return document.getElementById(
        "nuclearModel"
    );

}

// =====================================================
// 傳送控制訊號給核能模型
// =====================================================
function sendNuclearAction(action) {

    const iframe =
        getNuclearIframe();

    if (
        !iframe ||
        !iframe.contentWindow
    ) {

        console.warn(
            "Nuclear iframe 尚未準備完成"
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
        "Nuclear postMessage:",
        action
    );

    return true;
}

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

    /*
     * 先控制模型。
     * 訊號成功送出後，中文導覽才前進。
     */
    if (
        !sendNuclearAction(
            "ACTION_NEXT_STEP"
        )
    ) {
        return;
    }

    nuclearCurrentStep += 1;

    updateNuclearPanel();
}

// =====================================================
// 上一步
// =====================================================
function nuclearPrevious() {

    if (
        nuclearCurrentStep <= 0
    ) {
        return;
    }

    if (
        !sendNuclearAction(
            "ACTION_PREV_STEP"
        )
    ) {
        return;
    }

    nuclearCurrentStep -= 1;

    updateNuclearPanel();
}

// =====================================================
// 重設
// =====================================================
function nuclearReset() {

    const wrapper =
        document.getElementById(
            "nuclearViewerWrapper"
        );

    if (!wrapper) {
        return;
    }

    const oldIframe =
        getNuclearIframe();

    if (oldIframe) {
        oldIframe.remove();
    }

    const iframe =
        document.createElement(
            "iframe"
        );

    iframe.id =
        "nuclearModel";

    iframe.src =
        NUCLEAR_MODEL_URL;

    iframe.title =
        "壓水式核能發電 3D 互動模型";

    iframe.allowFullscreen =
        true;

    wrapper.appendChild(
        iframe
    );

    nuclearCurrentStep =
        -1;

    bindNuclearIframeLoad(
        iframe
    );

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

    const resetBtn =
        document.getElementById(
            "nuclearResetBtn"
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

        title.innerHTML =
            `壓水式核能發電
             <span class="nuclear-title-en">
                 Pressurized Water Reactor
             </span>`;

        description.textContent =
            "模型初始畫面為整體設備視圖，可先觀察各設備的位置與標籤。按下「開始導覽」後，模型會依設備順序逐步介紹；完成設備探索後，再利用下方「能源小幫手」整理完整的能量轉換流程。";

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

        if (resetBtn) {
            resetBtn.disabled = true;
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

    if (resetBtn) {
        resetBtn.disabled = false;
    }

    number.textContent =
        `STEP ${nuclearCurrentStep + 1} / ${nuclearSteps.length}`;

    title.innerHTML =
        `${step.title}
        <span class="nuclear-title-en">
            ${step.english}
        </span>`;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    const allowBackAndReset =
        nuclearCurrentStep >= 1;

    if (prevBtn) {
        prevBtn.disabled =
            !allowBackAndReset;
    }

    if (resetBtn) {
        resetBtn.disabled =
            !allowBackAndReset;
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

// =====================================================
// 核能 iframe 載入狀態
// =====================================================
function bindNuclearIframeLoad(
    iframe
) {

    const status =
        document.getElementById(
            "nuclearModelStatus"
        );

    if (!iframe) {
        return;
    }

    if (status) {

        status.classList.remove(
            "ready"
        );

        status.textContent =
            "正在載入核能 3D 模型……";
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
                "Nuclear model loaded"
            );
        }
    );
}

// =====================================================
// 核能頁面初始化
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const iframe =
            getNuclearIframe();

        /*
         * 只有 nuclear.html 才有這個 iframe。
         */
        if (!iframe) {
            return;
        }

        bindNuclearIframeLoad(
            iframe
        );

        nuclearCurrentStep =
            -1;

        updateNuclearPanel();

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
            "模型初始畫面為整體設備視圖，可先觀察各設備的位置與標籤。按下「開始導覽」後，模型會依設備順序逐步介紹；完成設備探索後，再利用下方「能源小幫手」整理完整的能量轉換流程。";

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
// 水力發電自動同步導覽
// 使用與風力相同的 postMessage 控制方式
// =====================================================
const HYDRO_MODEL_URL =
    "https://my-3d-proxy.loveleehom9.workers.dev/hydro_power_house";

const hydroSteps = [

    {
        title: "卡布蘭水輪機",
        english: "Kaplan Turbine",
        description:
            "卡布蘭水輪機可以調整導葉與轉輪葉片的角度，適合用於水頭較低、流量較大的水力發電環境。水流推動葉片旋轉，將水流的能量轉換成旋轉的機械能。",
        energy:
            "水流動能 → 機械能"
    },

    {
        title: "發電機",
        english: "Electric Generator",
        description:
            "水輪機旋轉時會帶動發電機轉子。發電機利用電磁感應，將水輪機提供的旋轉機械能轉換成電能。",
        energy:
            "機械能 → 電能"
    },

    {
        title: "壩體",
        english: "Dam Wall",
        description:
            "壩體橫跨河流並攔蓄水量，使上游形成水庫，同時建立水位高度差。這個高度差讓水具有可用來發電的重力位能。",
        energy:
            "建立水位差"
    },

    {
        title: "進水口設施",
        english: "Intake Object",
        description:
            "進水口設施將水庫中的水導入壓力水管，通常包含攔污柵與閘門，可以控制水流並在需要時停止水流進入水輪機。",
        energy:
            "控制水流"
    },

    {
        title: "蓄水庫",
        english: "Storage Reservoir",
        description:
           
    "蓄水庫儲存大量位於較高位置的水。高處的水具有重力位能，而可利用的水位高度差與放水流量，都會影響水力發電的輸出。",
        energy:
            "重力位能"
    },

    {
        title: "變壓器",
        english: "Transformer",
        description:
            "發電機產生電力後，變壓器會提高電壓，使電力更適合輸送到電網，並降低長距離輸電時的能量損失。",
        energy:
            "電能傳輸"
    },

    {
        title: "壓力水管",
        english: "Penstock",
        description:
            "壓力水管將水庫中的水送往水輪機。水從較高處往較低處流動時，重力位能逐漸轉換成水流的動能。",
        energy:
            "重力位能 → 動能"
    },

    {
        title: "尾水管",
        english: "Draft Tube",
        description:
            "尾水管位於水輪機出口下方，負責將通過水輪機後的水導向下游，同時協助提高水輪機的能量利用效率。",
        energy:
            "水流排出"
    },

    {
        title: "下游水庫",
        english: "Bottom Reservoir",
        description:
            "水通過水輪機後會流入下游水庫。在抽蓄式水力發電系統中，也可以在需要時利用幫浦將下游的水送回上游水庫，再次儲存能量。",
        energy:
            "水循環與儲能"
    }
];

let hydroCurrentStep = -1;

// =====================================================
// 取得水力 iframe
// =====================================================
function getHydroIframe() {

    return document.getElementById(
        "hydroModel"
    );

}

// =====================================================
// 傳送控制訊號給 EnergyEncyclopedia
// =====================================================
function sendHydroAction(action) {

    const iframe =
        getHydroIframe();

    if (
        !iframe ||
        !iframe.contentWindow
    ) {

        console.warn(
            "Hydro iframe 尚未準備完成"
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
        "Hydro postMessage:",
        action
    );

    return true;
}

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

    if (
        !sendHydroAction(
            "ACTION_NEXT_STEP"
        )
    ) {
        return;
    }

    hydroCurrentStep += 1;

    updateHydroPanel();
}

// =====================================================
// 上一步
// =====================================================
function hydroPrevious() {

    if (
        hydroCurrentStep <= 0
    ) {
        return;
    }

    if (
        !sendHydroAction(
            "ACTION_PREV_STEP"
        )
    ) {
        return;
    }

    hydroCurrentStep -= 1;

    updateHydroPanel();
}

// =====================================================
// 重設
// =====================================================
function hydroReset() {

    const wrapper =
        document.getElementById(
            "hydroViewerWrapper"
        );

    if (!wrapper) {
        return;
    }

    const oldIframe =
        getHydroIframe();

    if (oldIframe) {
        oldIframe.remove();
    }

    const iframe =
        document.createElement(
            "iframe"
        );

    iframe.id =
        "hydroModel";

    iframe.src =
        HYDRO_MODEL_URL;

    iframe.title =
        "水力發電廠 3D 互動模型";

    iframe.allowFullscreen =
        true;

    wrapper.appendChild(
        iframe
    );

    hydroCurrentStep =
        -1;

    bindHydroIframeLoad(
        iframe
    );

    updateHydroPanel();
}

// =====================================================
// 更新右側中文說明
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

    const prev =
        document.getElementById(
            "hydroPrevBtn"
        );

    const next =
        document.getElementById(
            "hydroNextBtn"
        );

    const reset =
        document.getElementById(
            "hydroResetBtn"
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
    if (
        hydroCurrentStep < 0
    ) {

        number.textContent =
            "準備開始";

        title.innerHTML =
            `水力發電
             <span class="hydro-title-en">
                 Hydroelectric Power
             </span>`;

        description.textContent =
            "模型初始畫面為整體設備視圖，可先觀察水庫、水輪機與發電機的位置。按下「開始導覽」後，模型會依設備順序逐步介紹；完成設備探索後，再利用下方「能源小幫手」整理完整的能量轉換流程。";

        if (energy) {
            energy.textContent =
                "能量來源：高處的水";
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
        hydroSteps[
        hydroCurrentStep
        ];

    number.textContent =
        `STEP ${hydroCurrentStep + 1} / ${hydroSteps.length}`;

    title.innerHTML =
        `${step.title}
         <span class="hydro-title-en">
             ${step.english}
         </span>`;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }


    const allowBackAndReset =
        hydroCurrentStep >= 1;

    if (prev) {
        prev.disabled =
            !allowBackAndReset;
    }

    if (reset) {
        reset.disabled =
            !allowBackAndReset;
    }


    const last =
        hydroCurrentStep ===
        hydroSteps.length - 1;

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
function bindHydroIframeLoad(
    iframe
) {

    const status =
        document.getElementById(
            "hydroModelStatus"
        );

    if (!iframe) {
        return;
    }

    if (status) {

        status.classList.remove(
            "ready"
        );

        status.textContent =
            "正在載入水力 3D 模型……";
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
                "Hydro model loaded"
            );
        }
    );
}


// =====================================================
// 水力頁面初始化
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const iframe =
            getHydroIframe();

        /*
         * 只有 hydro.html 才有 hydroModel。
         */
        if (!iframe) {
            return;
        }

        bindHydroIframeLoad(
            iframe
        );


        document
            .getElementById(
                "hydroPrevBtn"
            )
            ?.addEventListener(
                "click",
                hydroPrevious
            );


        document
            .getElementById(
                "hydroNextBtn"
            )
            ?.addEventListener(
                "click",
                hydroNext
            );


        document
            .getElementById(
                "hydroResetBtn"
            )
            ?.addEventListener(
                "click",
                hydroReset
            );


        hydroCurrentStep =
            -1;

        updateHydroPanel();
    }
);

// =====================================================
// 太陽光電自動同步導覽
// 使用與風力、水力相同的 postMessage 控制方式
// =====================================================

const SOLAR_MODEL_URL =
    "https://my-3d-proxy.loveleehom9.workers.dev/solar/photovoltaic";


const solarSteps = [

    {
        title: "你知道嗎？",
        english: "Did You Know?",
        description:
            "大規模太陽光電發電需要一定的設置空間，因此除了發電效率之外，場址、土地利用與太陽能板配置也是規劃時的重要條件。",
        energy:
            "延伸認識"
    },

    {
        title: "太陽能板",
        english: "Photovoltaic Panel",
        description:
            "太陽能板由許多太陽能電池組合而成。接收到陽光後，太陽能電池會將光能直接轉換成電能，形成直流電。",
        energy:
            "光能 → 電能"
    },

    {
        title: "太陽能電池",
        english: "Photovoltaic Cell",
        description:
            "太陽能電池是太陽光電發電的核心元件，主要由半導體材料構成。當材料吸收光的能量後，電子產生移動並形成電流。",
        energy:
            "光能 → 電能"
    },

    {
        title: "逆變器",
        english: "Inverters",
        description:
            "太陽能板產生的是直流電，而一般電網使用交流電，因此逆變器會將直流電轉換成交流電，讓產生的電力可以送往後續電力系統。",
        energy:
            "直流電 → 交流電"
    },

    {
        title: "支撐結構",
        english: "Support Structure",
        description:
            "支撐結構負責固定太陽能板，並讓面板保持適合接收陽光的方向與角度。有些系統採固定式設計，也有能追蹤太陽位置的系統。",
        energy:
            "提升光能利用"
    },

    {
        title: "地下電纜",
        english: "Underground Power Lines",
        description:
            "完成電力轉換後，交流電會透過電纜送往變電設備，將不同區域太陽能板產生的電力集中並繼續輸送。",
        energy:
            "交流電傳輸"
    },

    {
        title: "電力輸出",
        english: "Power Output",
        description:
            "太陽光電系統完成發電與電力轉換後，產生的電能會向外輸出，準備送入電網供使用者使用。",
        energy:
            "電能 → 電網"
    },

    {
        title: "變電站",
        english: "Substation",
        description:
            "變電站會調整電力系統的電壓，並包含保護、量測與控制設備，使太陽光電產生的電力能更適合送入電網。",
        energy:
            "升壓與輸電"
    },

    {
        title: "圍欄",
        english: "Fence",
        description:
            "太陽光電場周圍設置圍欄，可以避免未經允許的人員或動物進入，協助保護發電設備並維持場區安全。",
        energy:
            "場域安全"
    },

    {
        title: "草地",
        english: "Grass",
        description:
            "太陽能板周圍的植被需要適當管理，避免植物過高造成遮蔭，同時也能保留設備維修與管理所需的空間。",
        energy:
            "場域維護"
    },

    {
        title: "間隔空間",
        english: "Free Space",
        description:
            "太陽能板列與列之間需要保留適當距離，以降低彼此遮蔭，也讓維修人員與設備能在場區中移動。",
        energy:
            "避免遮蔭與方便維護"
    }

];


let solarCurrentStep = -1;


// =====================================================
// 取得太陽光電 iframe
// =====================================================

function getSolarIframe() {

    return document.getElementById(
        "solarModel"
    );

}


// =====================================================
// 傳送控制訊號給模型
// =====================================================

function sendSolarAction(action) {

    const iframe =
        getSolarIframe();

    if (
        !iframe ||
        !iframe.contentWindow
    ) {

        console.warn(
            "Solar iframe 尚未準備完成"
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
        "Solar postMessage:",
        action
    );

    return true;
}


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

    if (
        !sendSolarAction(
            "ACTION_NEXT_STEP"
        )
    ) {
        return;
    }

    solarCurrentStep += 1;

    updateSolarPanel();
}


// =====================================================
// 上一步
// =====================================================

function solarPrevious() {

    if (
        solarCurrentStep <= 0
    ) {
        return;
    }

    if (
        !sendSolarAction(
            "ACTION_PREV_STEP"
        )
    ) {
        return;
    }

    solarCurrentStep -= 1;

    updateSolarPanel();
}


// =====================================================
// 重設
// =====================================================

function solarReset() {

    const wrapper =
        document.getElementById(
            "solarViewerWrapper"
        );

    if (!wrapper) {
        return;
    }

    const oldIframe =
        getSolarIframe();

    if (oldIframe) {
        oldIframe.remove();
    }


    const iframe =
        document.createElement(
            "iframe"
        );

    iframe.id =
        "solarModel";

    iframe.src =
        SOLAR_MODEL_URL;

    iframe.title =
        "太陽光電發電廠 3D 互動模型";

    iframe.allowFullscreen =
        true;

    wrapper.appendChild(
        iframe
    );


    solarCurrentStep =
        -1;

    bindSolarIframeLoad(
        iframe
    );

    updateSolarPanel();
}


// =====================================================
// 更新右側中文說明
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

    const prev =
        document.getElementById(
            "solarPrevBtn"
        );

    const next =
        document.getElementById(
            "solarNextBtn"
        );

    const reset =
        document.getElementById(
            "solarResetBtn"
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

    if (
        solarCurrentStep < 0
    ) {

        number.textContent =
            "準備開始";

        title.innerHTML =
            `太陽光電發電
             <span class="solar-title-en">
                 Solar Photovoltaic Power
             </span>`;

        description.textContent =
            "模型初始畫面為整體設備視圖，可先觀察太陽能板、逆變器與變電設備的位置。按下「開始導覽」後，模型會依設備順序逐步介紹；完成設備探索後，再利用下方「能源小幫手」整理完整的能量轉換流程。";

        if (energy) {
            energy.textContent =
                "能量來源：陽光";
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
        solarSteps[
        solarCurrentStep
        ];


    number.textContent =
        `STEP ${solarCurrentStep + 1} / ${solarSteps.length}`;


    title.innerHTML =
        `${step.title}
         <span class="solar-title-en">
             ${step.english}
         </span>`;


    description.textContent =
        step.description;


    if (energy) {
        energy.textContent =
            step.energy;
    }


    const allowBackAndReset =
        solarCurrentStep >= 1;


    if (prev) {

        prev.disabled =
            !allowBackAndReset;
    }


    if (reset) {

        reset.disabled =
            !allowBackAndReset;
    }


    const last =
        solarCurrentStep ===
        solarSteps.length - 1;


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

function bindSolarIframeLoad(
    iframe
) {

    const status =
        document.getElementById(
            "solarModelStatus"
        );

    if (!iframe) {
        return;
    }


    if (status) {

        status.classList.remove(
            "ready"
        );

        status.textContent =
            "正在載入太陽光電 3D 模型……";
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
                "Solar model loaded"
            );
        }
    );
}


// =====================================================
// 太陽光電頁面初始化
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const iframe =
            getSolarIframe();

        /*
         * 只有 solar.html 才有 solarModel。
         */
        if (!iframe) {
            return;
        }


        bindSolarIframeLoad(
            iframe
        );


        document
            .getElementById(
                "solarPrevBtn"
            )
            ?.addEventListener(
                "click",
                solarPrevious
            );


        document
            .getElementById(
                "solarNextBtn"
            )
            ?.addEventListener(
                "click",
                solarNext
            );


        document
            .getElementById(
                "solarResetBtn"
            )
            ?.addEventListener(
                "click",
                solarReset
            );


        solarCurrentStep =
            -1;

        updateSolarPanel();

    }
);

// =====================================================
// Tokamak 自動同步導覽
// 使用與風力、水力、太陽能相同的 postMessage 控制方式
// =====================================================
const TOKAMAK_MODEL_URL =
    "https://my-3d-proxy.loveleehom9.workers.dev/tokamak/reactor";

const tokamakSteps = [

    {
        title: "低溫恆溫器",
        english: "Cryostat",
        description:
            "低溫恆溫器是一個大型高真空壓力容器，包覆 Tokamak 的真空容器與超導磁鐵，提供高真空與低溫環境。",
        energy:
            "真空與低溫環境"
    },

    {
        title: "真空容器",
        english: "Vacuum Vessel",
        description:
            "真空容器是高溫電漿所在的主要空間。維持高真空可以減少電漿粒子與背景氣體、雜質粒子之間不必要的碰撞與交互作用，降低能量損失，使電漿更容易維持高溫。",
        energy:
            "高真空環境"
    },

    {
        title: "屏蔽塊",
        english: "Shield Block",
        description:
            "屏蔽塊安裝在真空容器內壁，可以協助阻擋核融合反應產生的高能中子，同時支撐第一壁面板，並利用冷卻水帶走熱量。",
        energy:
            "屏蔽與散熱"
    },

    {
        title: "第一壁面板",
        english: "First Wall Panel",
        description:
            "第一壁面板直接面向高溫電漿，因此必須承受很高的熱負載。它也是保護真空容器內部結構的重要第一道表面。",
        energy:
            "承受電漿熱負載"
    },

    {
        title: "包層",
        english: "Blanket",
        description:
            "真空容器內壁覆蓋著包層模組，用來保護真空容器與超導磁鐵，降低核融合產生的高能中子與熱量對設備造成的影響。",
        energy:
            "中子屏蔽與散熱"
    },

    {
        title: "真空容器開口",
        english: "Port",
        description:
            "真空容器設有多個開口，讓加熱設備、診斷系統、真空設備與維修裝置可以進入或連接真空容器。",
        energy:
            "設備連接與操作"
    },

    {
        title: "ELM 控制線圈",
        english: "ELM Coils",
        description:
            "ELM 控制線圈會產生特定的磁場擾動，協助降低電漿邊緣出現某些不穩定現象的機會，使電漿更容易受到控制。",
        energy:
            "電漿穩定控制"
    },

    {
        title: "垂直穩定線圈",
        english: "Vertical Stability Coils",
        description:
            "垂直穩定線圈位於 Tokamak 上下兩側，可以快速調整磁場，協助維持電漿在垂直方向上的穩定位置。",
        energy:
            "電漿位置控制"
    },

    {
        title: "真空容器內線圈",
        english: "In-Vessel Coils",
        description:
            "真空容器內部還設有額外的控制線圈，用來提供更快速與精細的磁場調整，協助控制電漿的位置與形狀。",
        energy:
            "磁場控制"
    },

    {
        title: "磁場修正線圈",
        english: "Correction Coils",
        description:
            "修正線圈用來補償實際磁場中的微小誤差，使 Tokamak 內部形成的磁場更接近設計值，提升電漿控制的穩定性。",
        energy:
            "磁場修正"
    },

    {
        title: "預壓支撐結構",
        english: "Precompressing Structure",
        description:
            "中央螺線管運作時會產生非常大的電磁力，因此需要強固的預壓支撐結構固定線圈，避免線圈彼此分離或產生過大的變形。",
        energy:
            "結構支撐"
    },

    {
        title: "中央定位系統",
        english: "Centering System",
        description:
            "中央定位系統是中央螺線管支撐結構的一部分，負責讓中央螺線管保持在真空容器中心的正確位置。",
        energy:
            "結構定位"
    },

    {
        title: "中央螺線管",
        english: "Central Solenoid",
        description:
            "中央螺線管可以在電漿中感應出強大的電流。這個電流是建立與維持 Tokamak 電漿的重要條件之一。",
        energy:
            "產生電漿電流"
    },

    {
        title: "環向磁場線圈",
        english: "Toroidal Field Magnets",
        description:
            "環向磁場線圈會產生強磁場。由於電漿中含有大量帶電粒子，這些粒子在磁場中運動時會受到磁力影響而改變運動方向，因此 Tokamak 可以利用磁場控制粒子的運動，使高溫電漿受到約束。",
        energy:
            "磁場約束電漿"
    },

    {
        title: "極向磁場線圈",
        english: "Poroidal Field Magnets",
        description:
            "極向磁場線圈（Poloidal Field Magnets）位於環向磁場線圈外側，可以協助調整電漿的形狀與位置，並提高電漿的穩定性。",
        energy:
            "塑形與穩定電漿"
    },

    {
        title: "磁鐵供應系統",
        english: "Magnet Feeders",
        description:
            "磁鐵供應系統負責向超導磁鐵提供電流與低溫冷卻介質，使大型磁鐵能維持超導狀態並持續產生強磁場。",
        energy:
            "超導磁鐵供電與冷卻"
    },

    {
        title: "偏濾器",
        english: "Divertor",
        description:
            "偏濾器位於 Tokamak 底部，負責排出電漿中的熱量與融合反應產生的雜質，減少污染並保護真空容器內壁。",
        energy:
            "排熱與移除雜質"
    },

    {
        title: "偏濾器中央穹頂",
        english: "Dome",
        description:
            "中央穹頂位於偏濾器中央，形狀配合磁場分布，用來保護偏濾器其他零件，降低電漿異常移動時造成的熱負載。",
        energy:
            "設備保護"
    },

    {
        title: "垂直靶板",
        english: "Vertical Targets",
        description:
            "垂直靶板是偏濾器中直接面對高能粒子的元件，需要承受非常高的熱負載，因此使用耐高溫材料並搭配水冷系統。",
        energy:
            "承受粒子與熱負載"
    },

    {
        title: "偏濾器支撐結構",
        english: "Supporting Structure",
        description:
            "偏濾器的支撐結構負責固定偏濾器各部件，使它們能在高熱負載與複雜的 Tokamak 環境中維持正確位置。",
        energy:
            "結構支撐"
    },

    {
        title: "冷卻系統",
        english: "Cooling System",
        description:
            "Tokamak 的冷卻水系統會帶走真空容器、包層與偏濾器吸收的熱量，避免設備溫度過高，維持系統安全運作。",
        energy:
            "移除多餘熱量"
    }

];

let tokamakCurrentStep = -1;

// =====================================================
// 取得 Tokamak iframe
// =====================================================

function getTokamakIframe() {

    return document.getElementById(
        "tokamakModel"
    );

}

// =====================================================
// 傳送控制訊號給 Tokamak 模型
// =====================================================
function sendTokamakAction(action) {

    const iframe =
        getTokamakIframe();


    if (
        !iframe ||
        !iframe.contentWindow
    ) {

        console.warn(
            "Tokamak iframe 尚未準備完成"
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
        "Tokamak postMessage:",
        action
    );

    return true;
}

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


    /*
     * 先要求模型切換到下一個 view。
     * 成功送出訊號後，
     * 右側中文說明才一起往下一步。
     */
    if (
        !sendTokamakAction(
            "ACTION_NEXT_STEP"
        )
    ) {
        return;
    }


    tokamakCurrentStep += 1;

    updateTokamakPanel();
}

// =====================================================
// 上一步
// =====================================================
function tokamakPrevious() {

    if (
        tokamakCurrentStep <= 0
    ) {
        return;
    }


    if (
        !sendTokamakAction(
            "ACTION_PREV_STEP"
        )
    ) {
        return;
    }


    tokamakCurrentStep -= 1;

    updateTokamakPanel();
}

// =====================================================
// 重設
// =====================================================
function tokamakReset() {

    const wrapper =
        document.getElementById(
            "tokamakViewerWrapper"
        );


    if (!wrapper) {
        return;
    }


    const oldIframe =
        getTokamakIframe();


    if (oldIframe) {
        oldIframe.remove();
    }


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.id =
        "tokamakModel";


    iframe.src =
        TOKAMAK_MODEL_URL;


    iframe.title =
        "Tokamak 反應器 3D 互動模型";


    iframe.loading =
        "lazy";


    iframe.allowFullscreen =
        true;


    wrapper.appendChild(
        iframe
    );


    tokamakCurrentStep =
        -1;


    bindTokamakIframeLoad(
        iframe
    );


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

     const resetBtn =
        document.getElementById(
            "tokamakResetBtn"
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

        title.innerHTML =
    `Tokamak 核融合反應器
     <span class="tokamak-title-en">
         Tokamak Fusion Device
     </span>`;

        description.textContent =
    "模型初始畫面為 Tokamak 整體結構，可先觀察真空容器、磁場線圈與其他設備的位置。按下「開始導覽」後，模型與中文說明會同步切換，逐步了解 Tokamak 如何建立並控制核融合所需的環境。";

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

        if (resetBtn) {
            resetBtn.disabled = true;
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

    title.innerHTML =
        `${step.title}
        <span class="tokamak-title-en">
            ${step.english}
        </span>`;

    description.textContent =
        step.description;

    if (energy) {
        energy.textContent =
            step.energy;
    }

    const allowBackAndReset =
    tokamakCurrentStep >= 1;


if (prevBtn) {

    prevBtn.disabled =
        !allowBackAndReset;
}


if (resetBtn) {

    resetBtn.disabled =
        !allowBackAndReset;
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

    if (resetBtn) {
        resetBtn.disabled = false;
    }
}

// =====================================================
// Tokamak iframe 載入狀態
// =====================================================

function bindTokamakIframeLoad(
    iframe
) {

    if (!iframe) {
        return;
    }


    iframe.addEventListener(
        "load",
        () => {

            console.log(
                "Tokamak model loaded"
            );

        }
    );
}

// =====================================================
// Tokamak 頁面初始化
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const iframe =
            getTokamakIframe();


        if (!iframe) {
            return;
        }


        bindTokamakIframeLoad(
            iframe
        );


        tokamakCurrentStep =
            -1;


        updateTokamakPanel();

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
    button.textContent = done ? "已完成 ✓" : defaultLabel;
}

/* =========================================================
   完成按鈕：檢查學習條件
========================================================= */

function getCompletionRequirement(key) {

    // =========================
    // 首頁：先想一想
    // =========================
    if (key === "start") {

        const q1 =
            document.querySelector(
                '[data-radio-group="start_q1"] input[type="radio"]:checked'
            );

        const q2 =
            document.querySelector(
                'textarea[data-save="start_q2"]'
            );

        const saved =
            localStorage.getItem(
                "energy_answer_saved_start"
            ) === "yes";


        if (!q1 || !q2 || !q2.value.trim()) {

            return {
                ok: false,
                message: "請先完成「先想一想」的兩個問題"
            };
        }


        if (!saved) {

            return {
                ok: false,
                message: "答案尚未儲存，請先按「儲存答案」"
            };
        }


        return {
            ok: true
        };
    }


    // =========================
    // 首頁：能源整合比較
    // =========================
    if (key === "discover") {

        const textarea =
            document.getElementById(
                "discoverReflection"
            );

        const saved =
            localStorage.getItem(
                "energy_answer_saved_discover_reflection"
            ) === "yes";


        if (
            !textarea ||
            !textarea.value.trim()
        ) {

            return {
                ok: false,
                message: "請先完成能源整合比較的反思問題"
            };
        }


        if (!saved) {

            return {
                ok: false,
                message: "答案尚未儲存，請先按「儲存答案」"
            };
        }


        return {
            ok: true
        };
    }

    // =========================
// 火力發電
// =========================
if (key === "thermal") {

    const selected =
        document.querySelector(
            'input[name="thermal_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_thermal_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成火力發電的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}


// =========================
// 核能發電
// =========================
if (key === "nuclear") {

    const selected =
        document.querySelector(
            'input[name="nuclear_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_nuclear_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成核能發電的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}


// =========================
// 風力發電
// =========================
if (key === "wind") {

    const selected =
        document.querySelector(
            'input[name="wind_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_wind_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成風力發電的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}

// =========================
// 水力發電
// =========================
if (key === "hydro") {

    const selected =
        document.querySelector(
            'input[name="hydro_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_hydro_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成水力發電的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}


// =========================
// 太陽光電
// =========================
if (key === "solar") {

    const selected =
        document.querySelector(
            'input[name="solar_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_solar_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成太陽光電的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}

// =========================
// Tokamak
// =========================
if (key === "tokamak") {

    const selected =
        document.querySelector(
            'input[name="tokamak_quiz_1"]:checked'
        );

    const answerSaved =
        localStorage.getItem(
            "energy_quiz_saved_tokamak_quiz_1"
        ) === "yes";


    if (!selected) {

        return {
            ok: false,
            message: "請先完成 Tokamak 的「小試身手」"
        };
    }


    if (!answerSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存答案」"
        };
    }


    return {
        ok: true
    };
}

// =========================
// Alpha-E 挑戰
// =========================
if (key === "challenge") {

    const vacuumPredict =
        document.querySelector(
            'input[name="vacuum_predict"]:checked'
        );

    const vacuumReason =
        document.querySelector(
            'textarea[data-save="vacuum_reason"]'
        );

    const vacuumObserve =
        document.querySelector(
            'textarea[data-save="vacuum_observe"]'
        );

    const vacuumExplain =
        document.querySelector(
            'textarea[data-save="vacuum_explain"]'
        );


    const fuelPredict =
        document.querySelector(
            'textarea[data-save="fuel_predict"]'
        );

    const fuelObserve =
        document.querySelector(
            'textarea[data-save="fuel_observe"]'
        );

    const fuelExplain =
        document.querySelector(
            'textarea[data-save="fuel_explain"]'
        );


    const challenge1Complete =
        !!(
            vacuumPredict &&
            vacuumReason?.value.trim() &&
            vacuumObserve?.value.trim() &&
            vacuumExplain?.value.trim()
        );


    const challenge2Complete =
        !!(
            fuelPredict?.value.trim() &&
            fuelObserve?.value.trim() &&
            fuelExplain?.value.trim()
        );


    if (!challenge1Complete) {

        return {
            ok: false,
            message: "請先完成 CHALLENGE 01 的所有回答"
        };
    }


    if (
        localStorage.getItem(
            "energy_answer_saved_alpha_challenge_1"
        ) !== "yes"
    ) {

        return {
            ok: false,
            message: "請先儲存 CHALLENGE 01 的答案"
        };
    }


    if (!challenge2Complete) {

        return {
            ok: false,
            message: "請先完成 CHALLENGE 02 的所有回答"
        };
    }


    if (
        localStorage.getItem(
            "energy_answer_saved_alpha_challenge_2"
        ) !== "yes"
    ) {

        return {
            ok: false,
            message: "請先儲存 CHALLENGE 02 的答案"
        };
    }


    return {
        ok: true
    };
}

// =========================
// 最後學習整理
// =========================
if (key === "review") {

    const q1 =
        document.querySelector(
            'textarea[data-save="review_q1"]'
        );

    const q2 =
        document.querySelector(
            'textarea[data-save="review_q2"]'
        );

    const q3 =
        document.querySelector(
            'textarea[data-save="review_q3"]'
        );


    const allComplete =
        !!(
            q1?.value.trim() &&
            q2?.value.trim() &&
            q3?.value.trim()
        );


    if (!allComplete) {

        return {
            ok: false,
            message: "請先完成最後的三個問題"
        };
    }


    const answersSaved =
        localStorage.getItem(
            "energy_answer_saved_review"
        ) === "yes";


    if (!answersSaved) {

        return {
            ok: false,
            message: "答案尚未儲存，請先按「儲存三題答案」"
        };
    }


    return {
        ok: true
    };
}
    
    /*
     * 其他還沒改成新機制的頁面，
     * 暫時不額外限制。
     */
    return {
        ok: true
    };
}

document.addEventListener("DOMContentLoaded", () => {

    const moduleQuizMap = {

    thermal: {
        quizName: "thermal_quiz_1",
        buttonId: "thermalCompleteBtn"
    },

    nuclear: {
        quizName: "nuclear_quiz_1",
        buttonId: "nuclearCompleteBtn"
    },

    wind: {
        quizName: "wind_quiz_1",
        buttonId: "windCompleteBtn"
    },

    hydro: {
        quizName: "hydro_quiz_1",
        buttonId: "hydroCompleteBtn"
    },

    solar: {
        quizName: "solar_quiz_1",
        buttonId: "solarCompleteBtn"
    },

    tokamak: {
    quizName: "tokamak_quiz_1",
    buttonId: "tokamakCompleteBtn"
}

};


    Object.entries(moduleQuizMap)
        .forEach(([moduleKey, config]) => {

            document
                .querySelectorAll(
                    `input[name="${config.quizName}"]`
                )
                .forEach(radio => {

                    radio.addEventListener(
                        "change",
                        () => {

                            if (!isDone(moduleKey)) {
                                return;
                            }


                            setDone(
                                moduleKey,
                                false
                            );


                            const button =
                                document.getElementById(
                                    config.buttonId
                                );


                            if (button) {

                                updateCompletionButton(
                                    button,
                                    moduleKey,
                                    false
                                );

                            }


                            refreshAllLearningUI();

                        }
                    );

                });

        });

});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".complete-phase-btn[data-complete-section]").forEach(button => {
        const key = button.dataset.completeSection;
        updateCompletionButton(button, key, isDone(key));
        button.addEventListener("click", () => {

    /*
     * 如果目前已完成，
     * 再按一次仍允許取消完成。
     */
    if (isDone(key)) {

        setDone(
            key,
            false
        );

        updateCompletionButton(
            button,
            key,
            false
        );


        if (key === "review") {

            const completeCard =
                document.getElementById(
                    "lessonComplete"
                );

            if (completeCard) {
                completeCard.hidden = true;
            }
        }


        refreshAllLearningUI();

        return;
    }


    /*
     * 尚未完成：
     * 先檢查是否符合完成條件。
     */
    const requirement =
        getCompletionRequirement(key);


    if (!requirement.ok) {

        showLearningToast(
            requirement.message
        );

        return;
    }

    /*
 * 最後整理頁：
 * 先把答案送到 Google Sheets。
 */
if (key === "review") {

    try {

        button.disabled = true;

        button.textContent =
            "正在送出答案…";


        await submitEnergyAnswers();


        showLearningToast(
            "答案已成功送出 ✓"
        );


    } catch (error) {

        console.error(
            "送出答案失敗：",
            error
        );


        showLearningToast(
            "答案送出失敗，請檢查網路後再試一次"
        );


        button.disabled = false;

        updateCompletionButton(
            button,
            key,
            false
        );

        return;

    }


    button.disabled = false;

}

    /*
     * 條件符合，才真正完成。
     */
    setDone(
        key,
        true
    );

    updateCompletionButton(
        button,
        key,
        true
    );


    if (key === "review") {

        const completeCard =
            document.getElementById(
                "lessonComplete"
            );

        if (completeCard) {
            completeCard.hidden = false;
        }
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

                radios.forEach(radio => {

    radio.addEventListener("change", () => {

        /*
         * 只要答案被修改，
         * 就視為尚未重新儲存。
         */
        localStorage.removeItem(
            `energy_quiz_saved_${quizKey}`
        );

        if (status) {
            status.textContent =
                "答案已修改，請重新儲存";
        }

    });

});


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

    const answerSaved =
        localStorage.getItem(
            `energy_quiz_saved_${quizKey}`
        ) === "yes";

    if (status) {
        status.textContent =
            answerSaved
                ? "答案已儲存 ✓"
                : "答案尚未儲存";
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

localStorage.setItem(
    `energy_quiz_saved_${quizKey}`,
    "yes"
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

/* =========================================================
   能源整合比較：儲存答案後才可完成
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const textarea =
        document.getElementById("discoverReflection");

    const saveBtn =
        document.getElementById("discoverSaveBtn");

    const status =
        document.getElementById("discoverAnswerStatus");

    const completeBtn =
        document.getElementById("discoverCompleteBtn");

    if (
        !textarea ||
        !saveBtn ||
        !status ||
        !completeBtn
    ) return;


    const answerKey =
        "energy_answer_discover_reflection";

    const savedKey =
        "energy_answer_saved_discover_reflection";


    // =========================
    // 還原之前的答案
    // =========================

    const savedAnswer =
        localStorage.getItem(answerKey);

    if (savedAnswer !== null) {
        textarea.value = savedAnswer;
    }

    // =========================
    // 載入時顯示狀態
    // =========================

    if (
        localStorage.getItem(savedKey) === "yes" &&
        textarea.value.trim().length > 0
    ) {

        status.textContent =
            "答案已儲存 ✓";

    }

    // =========================
    // 學生修改文字後
    // 視為需要重新儲存
    // =========================
    textarea.addEventListener("input", () => {

    localStorage.setItem(
        answerKey,
        textarea.value
    );

    localStorage.removeItem(savedKey);

    status.textContent = "";

    // 如果已經完成，但又修改答案，
    // 就取消「完成」狀態，要求重新儲存
    if (isDone("discover")) {

        setDone("discover", false);

        updateCompletionButton(
            completeBtn,
            "discover",
            false
        );

        refreshAllLearningUI();
    }
});

    // =========================
    // 儲存答案
    // =========================
    saveBtn.addEventListener("click", () => {

        const answer =
            textarea.value.trim();

        if (!answer) {

    status.textContent =
        "請先輸入你的想法";

    return;
}

        localStorage.setItem(
            answerKey,
            textarea.value
        );

        localStorage.setItem(
            savedKey,
            "yes"
        );

        status.textContent =
            "答案已儲存 ✓";
    });
});

/* =========================================================
   開始學習：兩題都完成並儲存後才可完成
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const radioGroup =
        document.querySelector(
            '[data-radio-group="start_q1"]'
        );

    const textarea =
        document.querySelector(
            'textarea[data-save="start_q2"]'
        );

    const saveBtn =
        document.getElementById("startSaveBtn");

    const status =
        document.getElementById("startAnswerStatus");

    const completeBtn =
        document.getElementById("startCompleteBtn");

    if (
        !radioGroup ||
        !textarea ||
        !saveBtn ||
        !status ||
        !completeBtn
    ) return;


    const radioKey =
        "energy_answer_start_q1";

    const textKey =
        "energy_answer_start_q2";

    const savedKey =
        "energy_answer_saved_start";


    // =========================
    // 取得目前作答
    // =========================

    function getSelectedRadio() {

        return radioGroup.querySelector(
            'input[type="radio"]:checked'
        );

    }


    function hasCompleteAnswers() {

        const selected =
            getSelectedRadio();

        const hasText =
            textarea.value.trim().length > 0;

        return !!selected && hasText;

    }

    function updateStartAnswerHint() {

    const answersSaved =
        localStorage.getItem(savedKey) === "yes";

    const complete =
        hasCompleteAnswers();


    if (answersSaved && complete) {

        status.textContent =
            "答案已儲存 ✓";

        status.classList.remove("pending");

        return;
    }


    status.classList.add("pending");


    if (complete) {

        status.textContent =
            '已完成作答，請按「儲存答案」';

    } else {

        status.textContent =
            '請先完成兩個問題，再按「儲存答案」';

    }

}

    // =========================
    // 載入時還原「已儲存」狀態
    // =========================
    updateStartAnswerHint();
   

    // =========================
    // 學生修改單選題後
    // 需要重新儲存
    // =========================
    radioGroup
        .querySelectorAll('input[type="radio"]')
        .forEach(radio => {

            radio.addEventListener("change", () => {

                if (radio.checked) {

                    localStorage.setItem(
                        radioKey,
                        radio.value
                    );

                }

                localStorage.removeItem(savedKey);

                // 若已完成後又修改答案，
                // 自動取消完成狀態
                if (isDone("start")) {

                    setDone("start", false);

                    updateCompletionButton(
                        completeBtn,
                        "start",
                        false
                    );

                    refreshAllLearningUI();

                }
                updateStartAnswerHint();
                
            });
        });

    // =========================
    // 學生修改文字後
    // 需要重新儲存
    // =========================
    textarea.addEventListener("input", () => {

        localStorage.setItem(
            textKey,
            textarea.value
        );

        localStorage.removeItem(savedKey);

        if (isDone("start")) {

            setDone("start", false);

            updateCompletionButton(
                completeBtn,
                "start",
                false
            );

            refreshAllLearningUI();

        }
        updateStartAnswerHint();
       
    });


    // =========================
    // 儲存答案
    // =========================

    saveBtn.addEventListener("click", () => {

        const selected =
            getSelectedRadio();

        const answer =
            textarea.value.trim();


        if (!selected || !answer) {
            status.textContent =
            '請先完成兩個問題，再按「儲存答案」';
            status.classList.add("pending");

            return;
        }


        localStorage.setItem(
            radioKey,
            selected.value
        );

        localStorage.setItem(
            textKey,
            textarea.value
        );

        localStorage.setItem(
            savedKey,
            "yes"
        );


        status.textContent =
            "答案已儲存 ✓";

        status.classList.remove("pending");

    });
});

document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".inline-term")
        .forEach(button => {

            button.addEventListener(
    "click",
    async () => {

                const term =
                    button.dataset.term;

                const popover =
                    document.getElementById(
                        `term-${term}`
                    );

                if (!popover) return;

                const willOpen =
                    popover.hidden;

                popover.hidden =
                    !popover.hidden;

                button.setAttribute(
                    "aria-expanded",
                    String(willOpen)
                );

            });

        });

});

/* =========================================================
   Alpha-E Challenge：儲存答案後才可完成
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const challenge1SaveBtn =
        document.getElementById("challenge1SaveBtn");

    const challenge1Status =
        document.getElementById("challenge1SaveStatus");

    const challenge2SaveBtn =
        document.getElementById("challenge2SaveBtn");

    const challenge2Status =
        document.getElementById("challenge2SaveStatus");

    const completeBtn =
        document.getElementById("alphaChallengeCompleteBtn");

    // 不是 Alpha-E challenge 頁就離開
    if (
        !challenge1SaveBtn ||
        !challenge2SaveBtn ||
        !completeBtn
    ) {
        return;
    }


    const challenge1SavedKey =
        "energy_answer_saved_alpha_challenge_1";

    const challenge2SavedKey =
        "energy_answer_saved_alpha_challenge_2";


    // =====================================================
    // CHALLENGE 01 是否都有回答
    // =====================================================

    function challenge1Complete() {

        const selected =
            document.querySelector(
                'input[name="vacuum_predict"]:checked'
            );

        const reason =
            document.querySelector(
                'textarea[data-save="vacuum_reason"]'
            );

        const observe =
            document.querySelector(
                'textarea[data-save="vacuum_observe"]'
            );

        const explain =
            document.querySelector(
                'textarea[data-save="vacuum_explain"]'
            );


        return !!(
            selected &&
            reason?.value.trim() &&
            observe?.value.trim() &&
            explain?.value.trim()
        );
    }


    // =====================================================
    // CHALLENGE 02 是否都有回答
    // =====================================================

    function challenge2Complete() {

        const predict =
            document.querySelector(
                'textarea[data-save="fuel_predict"]'
            );

        const observe =
            document.querySelector(
                'textarea[data-save="fuel_observe"]'
            );

        const explain =
            document.querySelector(
                'textarea[data-save="fuel_explain"]'
            );


        return !!(
            predict?.value.trim() &&
            observe?.value.trim() &&
            explain?.value.trim()
        );
    }

    // =====================================================
    // CHALLENGE 01 狀態
    // =====================================================

    function updateChallenge1Hint() {

        const saved =
            localStorage.getItem(
                challenge1SavedKey
            ) === "yes";


        if (
            saved &&
            challenge1Complete()
        ) {

            challenge1Status.textContent =
                "答案已儲存 ✓";

            challenge1Status.classList.remove(
                "pending"
            );

        } else if (
            challenge1Complete()
        ) {

            challenge1Status.textContent =
                "已完成作答，請按「儲存答案」";

            challenge1Status.classList.add(
                "pending"
            );

        } else {

            challenge1Status.textContent =
                "請先完成三個步驟的回答";

            challenge1Status.classList.add(
                "pending"
            );
        }
    }


    // =====================================================
    // CHALLENGE 02 狀態
    // =====================================================

    function updateChallenge2Hint() {

        const saved =
            localStorage.getItem(
                challenge2SavedKey
            ) === "yes";


        if (
            saved &&
            challenge2Complete()
        ) {

            challenge2Status.textContent =
                "答案已儲存 ✓";

            challenge2Status.classList.remove(
                "pending"
            );

        } else if (
            challenge2Complete()
        ) {

            challenge2Status.textContent =
                "已完成作答，請按「儲存答案」";

            challenge2Status.classList.add(
                "pending"
            );

        } else {

            challenge2Status.textContent =
                "請先完成三個步驟的回答";

            challenge2Status.classList.add(
                "pending"
            );
        }
    }


    // =====================================================
    // CHALLENGE 01 儲存
    // =====================================================

    challenge1SaveBtn.addEventListener(
        "click",
        () => {

            if (!challenge1Complete()) {

                challenge1Status.textContent =
                    "請先完成所有問題再儲存";

                challenge1Status.classList.add(
                    "pending"
                );

                return;
            }


            localStorage.setItem(
                challenge1SavedKey,
                "yes"
            );


            updateChallenge1Hint();
            
        }
    );


    // =====================================================
    // CHALLENGE 02 儲存
    // =====================================================

    challenge2SaveBtn.addEventListener(
        "click",
        () => {

            if (!challenge2Complete()) {

                challenge2Status.textContent =
                    "請先完成所有問題再儲存";

                challenge2Status.classList.add(
                    "pending"
                );

                return;
            }


            localStorage.setItem(
                challenge2SavedKey,
                "yes"
            );


            updateChallenge2Hint();
            
        }
    );


    // =====================================================
    // 修改答案後，必須重新按儲存
    // =====================================================

    const challenge1Fields =
        document.querySelectorAll(`
            input[name="vacuum_predict"],
            textarea[data-save="vacuum_reason"],
            textarea[data-save="vacuum_observe"],
            textarea[data-save="vacuum_explain"]
        `);


    challenge1Fields.forEach(field => {

        const eventName =
            field.type === "radio"
                ? "change"
                : "input";


        field.addEventListener(
            eventName,
            () => {

                localStorage.removeItem(
                    challenge1SavedKey
                );


                if (isDone("challenge")) {

                    setDone(
                        "challenge",
                        false
                    );

                    updateCompletionButton(
                        completeBtn,
                        "challenge",
                        false
                    );

                    refreshAllLearningUI();
                }


                updateChallenge1Hint();
                
            }
        );
    });


    const challenge2Fields =
        document.querySelectorAll(`
            textarea[data-save="fuel_predict"],
            textarea[data-save="fuel_observe"],
            textarea[data-save="fuel_explain"]
        `);


    challenge2Fields.forEach(field => {

        field.addEventListener(
            "input",
            () => {

                localStorage.removeItem(
                    challenge2SavedKey
                );


                if (isDone("challenge")) {

                    setDone(
                        "challenge",
                        false
                    );

                    updateCompletionButton(
                        completeBtn,
                        "challenge",
                        false
                    );

                    refreshAllLearningUI();
                }


                updateChallenge2Hint();
                
            }
        );
    });


    // =====================================================
    // 初始狀態
    // =====================================================

    updateChallenge1Hint();
    updateChallenge2Hint();
    

});

/* =========================================================
   最後學習整理：三題完成並儲存後才可完成
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const q1 =
        document.querySelector(
            'textarea[data-save="review_q1"]'
        );

    const q2 =
        document.querySelector(
            'textarea[data-save="review_q2"]'
        );

    const q3 =
        document.querySelector(
            'textarea[data-save="review_q3"]'
        );

    const saveBtn =
        document.getElementById(
            "reviewSaveBtn"
        );

    const status =
        document.getElementById(
            "reviewSaveStatus"
        );

    const completeBtn =
        document.getElementById(
            "finishLesson"
        );


    /*
     * 不是最後整理頁就離開。
     */
    if (
        !q1 ||
        !q2 ||
        !q3 ||
        !saveBtn ||
        !status ||
        !completeBtn
    ) {
        return;
    }


    const savedKey =
        "energy_answer_saved_review";


    function allAnswered() {

        return !!(
            q1.value.trim() &&
            q2.value.trim() &&
            q3.value.trim()
        );
    }


    function updateReviewHint() {

        const saved =
            localStorage.getItem(
                savedKey
            ) === "yes";


        if (
            saved &&
            allAnswered()
        ) {

            status.textContent =
                "答案已儲存 ✓";

            status.classList.remove(
                "pending"
            );

            return;
        }


        status.classList.add(
            "pending"
        );


        if (allAnswered()) {

            status.textContent =
                "已完成作答，請按「儲存三題答案」";

        } else {

            status.textContent =
                "請先完成三個問題";

        }

    }


    /*
     * 修改任何答案後：
     * 必須重新按儲存，
     * 若原本已完成，也取消完成狀態。
     */
    [q1, q2, q3].forEach(field => {

        field.addEventListener(
            "input",
            () => {

                localStorage.removeItem(
                    savedKey
                );


                if (isDone("review")) {

                    setDone(
                        "review",
                        false
                    );


                    updateCompletionButton(
                        completeBtn,
                        "review",
                        false
                    );


                    const completeCard =
                        document.getElementById(
                            "lessonComplete"
                        );


                    if (completeCard) {
                        completeCard.hidden = true;
                    }


                    refreshAllLearningUI();
                }


                updateReviewHint();

            }
        );

    });


    /*
     * 正式儲存
     */
    saveBtn.addEventListener(
        "click",
        () => {

            if (!allAnswered()) {

                status.textContent =
                    "請先完成三個問題再儲存";

                status.classList.add(
                    "pending"
                );

                return;
            }


            /*
             * textarea 本身的內容已由共用
             * data-save 機制存入 localStorage，
             * 這裡只需要紀錄：
             * 「三題已正式儲存」。
             */
            localStorage.setItem(
                savedKey,
                "yes"
            );


            updateReviewHint();

        }
    );


    /*
     * 頁面載入時還原提示狀態。
     */
    updateReviewHint();

});
