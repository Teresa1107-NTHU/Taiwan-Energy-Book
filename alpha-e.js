/* Alpha-E 仿真面板：控制數值、互鎖、圖表與 Unity 訊息。 */
const UNITY_WEBGL_URL = "https://teresa1107-nthu.github.io/Alpha-E/";

/*
 * p–11B Fusion Unity WebGL 網址。
 *
 * 等第二個 Unity 上傳 GitHub Pages 後，
 * 把網址填在這裡。
 */
const FUSION_WEBGL_URL = "https://teresa1107-nthu.github.io/Unity_Nuclear-Fusion_Project/";

/* =========================================================
   Language System
   zh = 中文
   en = English
========================================================= */

let currentLanguage =
    localStorage.getItem("alphaLanguage")
    || "zh";


const translations = {

    zh: {

        /* Navigation */
        nav_thermal: "火力",
        nav_wind: "風力",
        nav_hydro: "水力",
        nav_solar: "太陽能",
        nav_nuclear: "核能",
        nav_fusion: "核融合",

        /* Hero */
        hero_eyebrow: "互動式核融合學習模組",

        hero_title: "Alpha-E 互動教學系統",

        hero_desc:
            "面板數值、開關、壓力曲線與偵測圖表皆可即時改變，並可把指令傳送到下方 Unity WebGL 模型。",

        /* Alpha-E Experiment */
        alpha_experiment_title:
            "Alpha-E 互動實驗",

        /* Flow */
        flow_title: "Alpha-E 實驗流程",

        flow_power: "Power",
        flow_power_desc: "系統啟動",

        flow_vacuum: "Vacuum",
        flow_vacuum_desc: "建立真空",

        flow_gas: "Gas",
        flow_gas_desc: "氣體注入",

        flow_cooling: "Cooling",
        flow_cooling_desc: "冷卻系統",

        flow_hv: "High Voltage",
        flow_hv_desc: "粒子加速",

        flow_plasma: "Plasma",
        flow_plasma_desc: "微波游離",

        flow_beam: "Beam",
        flow_beam_desc: "建立粒子束",

        flow_fusion: "Fusion",
        flow_fusion_desc: "核融合反應",

        /* Selected equipment */
        selected_equipment: "SELECTED EQUIPMENT",
        select_equipment_hint: "請點擊面板設備",

        function: "功能",
        principle: "運作原理",
        current_status: "目前狀態",

        function_hint:
            "點擊設備後顯示用途。",

        principle_hint:
            "點擊設備後顯示原理。",

        status_hint:
            "尚未選取設備。",

        standby: "待機",

        /* Alpha-E Panel */
        panel_location:
            "Alpha-E @ 台南",

        panel_off:
            "關閉",

        panel_on:
            "開啟",

        panel_power_on:
            "電源開啟",

        panel_rough_pump:
            "前級真空泵",

        panel_turbo_pump:
            "渦輪分子泵",

        panel_rotation_speed:
            "轉速",

        panel_temperature:
            "溫度",

        panel_current:
            "電流",

        panel_high_voltage:
            "高壓系統",

        panel_voltage:
            "電壓",

        panel_microwave:
            "微波系統",

        panel_duty_cycle:
            "工作週期",

        panel_pulse_frequency:
            "脈衝頻率",

        panel_rf_frequency:
            "RF 頻率",

        panel_rf_attenuation:
            "RF 衰減",

        panel_mfc:
            "MFC｜質量流量控制器",

        panel_flowrate:
            "流量設定",

        panel_measured:
            "量測值",

        panel_gas_can:
            "氣體供應",

        panel_setup_gas:
            "設定氣體",

        panel_cooler:
            "冷卻系統",

        panel_flow:
            "流量",

        panel_plasma:
            "電漿",

        panel_pressure:
            "壓力",

        panel_pn_detector:
            "PN 偵測器訊號",

        panel_psd_dataset:
            "PSD 散佈資料",

        panel_pressurization:
            "真空系統狀態",

        panel_time_under_vacuum:
            "真空運轉時間",

        panel_experiment_setup:
            "實驗設定",

        panel_gas_injection:
            "氣體注入",

        panel_beam_on:
            "粒子束開啟",

        panel_beam_off:
            "粒子束關閉",

        gas_deuterium:
            "氘",

        gas_hydrogen:
            "氫",

        gas_argon:
            "氬",

        /* Alpha-E Dynamic Status */
        vacuum_ready:
            "真空已就緒",

        vacuum_not_ready:
            "尚未就緒",

        current_gas:
            "目前氣體",

        not_configured:
            "尚未設定",

        high_voltage_on:
            "高壓已啟動",

        ready_to_start:
            "可以啟動",

        prerequisites_incomplete:
            "前置步驟未完成",

        microwave_plasma_on:
            "微波已啟動 / 電漿已形成",

        status_beam_on:
            "粒子束已開啟",

        status_plasma_generated:
            "電漿已形成",

        status_power_on:
            "電源已開啟",

        live_running:
            "運轉",

        live_stopped:
            "停止",

        live_vacuum_progress:
            "真空進度",

        live_rotation_speed:
            "轉速",

        live_gas_configured:
            "已完成設定",

        live_pressure_setting:
            "壓力設定",

        live_setpoint:
            "設定",

        live_measured:
            "量測",

        live_flow:
            "流量",

        live_temperature:
            "溫度",

        live_plasma_not_generated:
            "電漿尚未形成",

        gas_supply_not_configured:
            "氣體供應尚未設定。",

        /* Unity */
        realtime_3d: "REAL-TIME 3D VIEW",
        alpha_model: "Alpha-E 3D Model",
        alpha_model_status:
            "系統待機",

        camera_controls:
            "左鍵拖曳：旋轉 ｜ 右鍵拖曳：平移 ｜ 滾輪：縮放 ｜ R：重設",

        /* Fusion */
        fusion_title:
            "p–¹¹B 核融合反應",

        fusion_locked_hint:
            "完成 Alpha-E 操作並啟動 Beam On 後解鎖。",

        reaction_status:
            "Reaction Status",

        energy_released:
            "Energy Released",

        start_reaction:
            "Start Reaction",

        pause:
            "Pause",

        resume:
            "Resume",

        restart:
            "Restart",

        fusion_locked:
            "Fusion Reaction Locked",

        fusion_wait_beam:
            "完成 Beam On 後即可進行核融合反應",

        fusion_complete:
            "核融合完成",

        total_energy:
            "總釋放能量",

        reaction_products:
            "反應產物",

        fusion_result_desc:
            "質子與硼-11 發生核融合反應後，最終產生三個 α 粒子並釋放能量。",

        replay:
            "重新播放反應",

        return_alpha:
            "返回 Alpha-E",

        fusion_loading:
            "正在載入 Fusion 模型...",

        fusion_model_ready:
            "模型已就緒 ✓",

        fusion_model_ready_hint:
            "模型已載入完成，完成 Beam On 後即可進行核融合反應。",

        fusion_ready_hint:
            "Beam 已建立，可進行 p–¹¹B 核融合反應示意。",

        fusion_loading_hint:
            "Beam 已建立，Fusion 模型仍在載入中...",

        fusion_status_ready:
            "就緒",

        fusion_status_loading:
            "正在載入 Unity...",

        fusion_status_running:
            "反應進行中",

        fusion_status_paused:
            "已暫停",

        fusion_stage_approach:
            "質子接近硼-11",

        fusion_stage_capture:
            "質子被硼-11 捕獲",

        fusion_stage_c12_excited:
            "碳-12* 激發態",

        fusion_stage_c12_break:
            "碳-12 → 氦-4 + 鈹-8",

        fusion_stage_be8_unstable:
            "鈹-8 處於不穩定狀態",

        fusion_stage_be8_break:
            "鈹-8 → 氦-4 + 氦-4",

        fusion_stage_complete:
            "核融合完成",

        reaction_complete_eyebrow:
            "反應完成",

        alpha_particles:
            "3 × α 粒子",

        fusion_status_locked:
            "尚未解鎖",

        /* Beam Transition */

        beam_transition_eyebrow:
            "反應條件已建立",

        beam_transition_title:
            "離子束已建立",

        beam_transition_desc:
            "Alpha-E 實驗條件已完成，高能粒子束已建立。",

        beam_transition_next:
            "即將進入 p–¹¹B 核融合反應示意",

        /* Alpha-E Alerts */
        alert_power_first:
            "請先開啟系統電源。",

        alert_rough_first:
            "請先啟動前級真空泵。",

        alert_setup_gas_first:
            "請先完成氣體設定。",

        alert_hv_prerequisites:
            "需先完成高真空、供氣與冷卻。",

        alert_mw_prerequisites:
            "需先啟動高壓系統與 MFC。",

        alert_turbo_first:
            "請先啟動渦輪分子泵。",

        alert_beam_prerequisites:
            "粒子束啟動前需先完成真空、供氣、冷卻、高壓與微波步驟。",

        /* Final UI */
        operation_process:
            "操作流程",

        flow_step:
            "步驟",

        footer_title:
            "臺灣能源互動電子書 © 2026",

        footer_desc:
            "本網站為教育與學術用途開發。",

        page_title:
            "Alpha-E 互動教學系統｜臺灣能源互動電子書",

        alpha_panel_alt:
            "Alpha-E 操作面板底圖",

        alpha_unity_title:
            "Alpha-E 3D 模型",

        fusion_unity_title:
            "p–¹¹B 核融合反應模型",
    },


    en: {

        /* Navigation */
        nav_thermal: "Thermal",
        nav_wind: "Wind",
        nav_hydro: "Hydro",
        nav_solar: "Solar",
        nav_nuclear: "Nuclear",
        nav_fusion: "Fusion",

        /* Hero */
        hero_eyebrow: "INTERACTIVE FUSION LEARNING MODULE",

        hero_title: "Alpha-E Interactive Learning System",

        hero_desc:
            "Panel values, switches, pressure curves, and detector charts can be updated in real time, while control commands are synchronized with the Unity WebGL model below.",

        /* Alpha-E Experiment */
        alpha_experiment_title:
            "Alpha-E Interactive Experiment",

        /* Flow */
        flow_title:
            "Alpha-E Experimental Procedure",

        flow_power:
            "Power",

        flow_power_desc:
            "System Startup",

        flow_vacuum:
            "Vacuum",

        flow_vacuum_desc:
            "Establish Vacuum",

        flow_gas:
            "Gas",

        flow_gas_desc:
            "Gas Injection",

        flow_cooling:
            "Cooling",

        flow_cooling_desc:
            "Cooling System",

        flow_hv:
            "High Voltage",

        flow_hv_desc:
            "Particle Acceleration",

        flow_plasma:
            "Plasma",

        flow_plasma_desc:
            "Microwave Ionization",

        flow_beam:
            "Beam",

        flow_beam_desc:
            "Ion Beam Formation",

        flow_fusion:
            "Fusion",

        flow_fusion_desc:
            "Fusion Reaction",

        /* Selected Equipment */
        selected_equipment:
            "SELECTED EQUIPMENT",

        select_equipment_hint:
            "Select an equipment item",

        function:
            "Function",

        principle:
            "Operating Principle",

        current_status:
            "Current Status",

        function_hint:
            "Select a device to view its function.",

        principle_hint:
            "Select a device to view its operating principle.",

        status_hint:
            "No equipment selected.",

        standby:
            "Standby",

        /* Alpha-E Panel */
        panel_location:
            "Alpha-E @ Tainan",

        panel_off:
            "Off",

        panel_on:
            "On",

        panel_power_on:
            "Power On",

        panel_rough_pump:
            "Rough Pump",

        panel_turbo_pump:
            "Turbo Pump",

        panel_rotation_speed:
            "Rotation Speed",

        panel_temperature:
            "Temp",

        panel_current:
            "Current",

        panel_high_voltage:
            "High Voltage",

        panel_voltage:
            "Voltage",

        panel_microwave:
            "Microwave",

        panel_duty_cycle:
            "Duty Cycle",

        panel_pulse_frequency:
            "Pulse Frequency",

        panel_rf_frequency:
            "RF Frequency",

        panel_rf_attenuation:
            "RF Attenuation",

        panel_mfc:
            "MFC",

        panel_flowrate:
            "Flowrate",

        panel_measured:
            "Measured",

        panel_gas_can:
            "Gas Can",

        panel_setup_gas:
            "Set Up Gas",

        panel_cooler:
            "Cooler",

        panel_flow:
            "Flow",

        panel_plasma:
            "Plasma",

        panel_pressure:
            "Pressure",

        panel_pn_detector:
            "PN Detector Signal",

        panel_psd_dataset:
            "PSD Scatter Dataset",

        panel_pressurization:
            "Machine Pressurization",

        panel_time_under_vacuum:
            "Time Under Vacuum",

        panel_experiment_setup:
            "Experiment Setup",

        panel_gas_injection:
            "Gas Injection",

        panel_beam_on:
            "Beam On",

        panel_beam_off:
            "Beam Off",

        gas_deuterium:
            "Deuterium",

        gas_hydrogen:
            "Hydrogen",

        gas_argon:
            "Argon",

        /* Alpha-E Dynamic Status */
        vacuum_ready:
            "Vacuum Ready",

        vacuum_not_ready:
            "Not Ready",

        current_gas:
            "Current Gas",

        not_configured:
            "Not configured",

        high_voltage_on:
            "High Voltage On",

        ready_to_start:
            "Ready",

        prerequisites_incomplete:
            "Prerequisites incomplete",

        microwave_plasma_on:
            "Microwave On / Plasma Generated",

        status_beam_on:
            "Beam On",

        status_plasma_generated:
            "Plasma Generated",

        status_power_on:
            "Power On",

        live_running:
            "Running",

        live_stopped:
            "Stopped",

        live_vacuum_progress:
            "Vacuum Progress",

        live_rotation_speed:
            "Rotation Speed",

        live_gas_configured:
            "configured",

        live_pressure_setting:
            "Pressure setting",

        live_setpoint:
            "Setpoint",

        live_measured:
            "Measured",

        live_flow:
            "Flow",

        live_temperature:
            "Temperature",

        live_plasma_not_generated:
            "Plasma not generated",

        gas_supply_not_configured:
            "Gas supply is not configured.",

        /* Unity */
        realtime_3d:
            "REAL-TIME 3D VIEW",

        alpha_model:
            "Alpha-E 3D Model",

        alpha_model_status:
            "System Standby",

        camera_controls:
            "Left Drag: Rotate ｜ Right Drag: Pan ｜ Scroll: Zoom ｜ R: Reset",

        /* Fusion */
        fusion_title:
            "p–¹¹B Fusion Reaction",

        fusion_locked_hint:
            "Complete the Alpha-E procedure and activate Beam On to unlock.",

        reaction_status:
            "Reaction Status",

        energy_released:
            "Energy Released",

        start_reaction:
            "Start Reaction",

        pause:
            "Pause",

        resume:
            "Resume",

        restart:
            "Restart",

        fusion_locked:
            "Fusion Reaction Locked",

        fusion_wait_beam:
            "Complete Beam On to begin the fusion reaction.",

        fusion_complete:
            "Fusion Complete",

        total_energy:
            "Total Energy Released",

        reaction_products:
            "Reaction Products",

        fusion_result_desc:
            "After a proton fuses with boron-11, the reaction ultimately produces three alpha particles and releases energy.",

        replay:
            "Replay Reaction",

        return_alpha:
            "Return to Alpha-E",

        fusion_loading:
            "Loading Fusion Model...",

        fusion_model_ready:
            "Model Ready ✓",

        fusion_model_ready_hint:
            "The model is ready. Complete Beam On to begin the fusion reaction.",

        fusion_ready_hint:
            "The beam has been established. You can now proceed with the p–¹¹B fusion reaction demonstration.",

        fusion_loading_hint:
            "The beam has been established, but the Fusion model is still loading...",

        fusion_status_ready:
            "Ready",

        fusion_status_loading:
            "Loading Unity...",

        fusion_status_running:
            "Running",

        fusion_status_paused:
            "Paused",

        fusion_stage_approach:
            "Proton approaching B-11",

        fusion_stage_capture:
            "Proton captured by B-11",

        fusion_stage_c12_excited:
            "C-12* excited state",

        fusion_stage_c12_break:
            "C-12 → He-4 + Be-8",

        fusion_stage_be8_unstable:
            "Be-8 unstable",

        fusion_stage_be8_break:
            "Be-8 → He-4 + He-4",

        fusion_stage_complete:
            "Fusion Complete",

        reaction_complete_eyebrow:
            "REACTION COMPLETE",

        alpha_particles:
            "3 × α particles",

        fusion_status_locked:
            "Locked",

        /* Beam Transition */
        beam_transition_eyebrow:
            "REACTION CONDITIONS ESTABLISHED",

        beam_transition_title:
            "Ion Beam Established",

        beam_transition_desc:
            "The Alpha-E experimental conditions are complete, and a high-energy ion beam has been established.",

        beam_transition_next:
            "Proceeding to the p–¹¹B fusion reaction demonstration.",

        /* Alpha-E Alerts */
        alert_power_first:
            "Please turn on the system power first.",

        alert_rough_first:
            "Please start the rough pump first.",

        alert_setup_gas_first:
            "Please complete the gas setup first.",

        alert_hv_prerequisites:
            "High vacuum, gas supply, and cooling must be completed first.",

        alert_mw_prerequisites:
            "Please activate High Voltage and the MFC first.",

        alert_turbo_first:
            "Please start the turbo pump first.",

        alert_beam_prerequisites:
            "Vacuum, gas supply, cooling, high voltage, and microwave steps must be completed before Beam On.",

        /* Final UI */
        operation_process:
            "OPERATION PROCESS",

        flow_step:
            "Step",

        footer_title:
            "Taiwan Energy Interactive E-Book © 2026",

        footer_desc:
            "This website was developed for educational and academic purposes.",

        page_title:
            "Alpha-E Interactive Learning System | Taiwan Energy Interactive E-Book",

        alpha_panel_alt:
            "Alpha-E control panel",

        alpha_unity_title:
            "Alpha-E 3D Model",

        fusion_unity_title:
            "p–¹¹B Fusion Reaction Model",
    }
};

function t(key) {

    return (
        translations[currentLanguage]?.[key]
        ??
        translations.zh[key]
        ??
        key
    );
}

function getGasDisplayName(value) {

    switch (value) {

        case "Deuterium":
            return t("gas_deuterium");

        case "Hydrogen":
            return t("gas_hydrogen");

        case "Argon":
            return t("gas_argon");

        default:
            return value;
    }
}

function setFusionStatus(key) {

    currentFusionStatusKey = key;

    const element =
        $("fusionStatus");

    if (element) {
        element.textContent =
            t(key);
    }
}


function setFusionSectionHint(key) {

    currentFusionSectionHintKey = key;

    const element =
        $("fusionSectionHint");

    if (element) {
        element.textContent =
            t(key);
    }
}


function refreshFusionLanguage() {

    /* Reaction Status */
    setFusionStatus(
        currentFusionStatusKey
    );


    /* Fusion 區塊右上提示 */
    setFusionSectionHint(
        currentFusionSectionHintKey
    );


    /* Beam On 前鎖定畫面的提示 */
    const lockHint =
        $("fusionLockHint");

    if (lockHint) {

        lockHint.textContent =
            fusionUnityReady
                ? t("fusion_model_ready_hint")
                : t("fusion_wait_beam");
    }


    /* Fusion Unity Loading 顯示 */
    const loadingText =
        $("fusionLoadingText");

    if (loadingText) {

        loadingText.textContent =
            fusionUnityReady
                ? t("fusion_model_ready")
                : `${t("fusion_loading")} ${fusionLoadingPercent}%`;
    }
}

function applyLanguage() {

    document.documentElement.lang =
        currentLanguage === "zh"
            ? "zh-Hant"
            : "en";

    document.title =
        t("page_title");

    const panelImage =
        document.querySelector(
            '.schematic img[src="assets/alpha-e-panel.jpg"]'
        );

    if (panelImage) {
        panelImage.alt =
            t("alpha_panel_alt");
    }


    const alphaFrame =
        $("alphaUnity");

    if (alphaFrame) {
        alphaFrame.title =
            t("alpha_unity_title");
    }


    const fusionFrame =
        $("fusionUnity");

    if (fusionFrame) {
        fusionFrame.title =
            t("fusion_unity_title");
    }

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            element.textContent =
                t(key);

        });


    const langButton =
        $("langToggle");

    if (langButton) {

        langButton.textContent =
            currentLanguage === "zh"
                ? "EN"
                : "中文";
    }


    /* 更新 JS 動態文字 */
    update();


    /* 如果目前有選設備，重新套用該語言的設備介紹 */
    if (s.selected) {
        select(s.selected);
    }


    /* 重新套用 Fusion 當前狀態語言 */
    refreshFusionLanguage();
}

/*
 * Fusion WebGL 是否已完成初始化。
 */
let fusionUnityReady = false;
let fusionUnlocked = false;
let fusionCompleted = false;
let lastFusionEnergyUpdate = 0;

/* 目前 Fusion 畫面所使用的翻譯狀態 */
let currentFusionStatusKey =
    "fusion_status_locked";

let currentFusionSectionHintKey =
    "fusion_locked_hint";

let fusionLoadingPercent = 0;

// Fusion Unity 是否已經開始載入
let fusionUnityLoaded = false;

/* =========================================================
   延遲載入 Fusion Unity
========================================================= */

function loadFusionUnity() {

    // 已經載入過就不要重複載入
    if (fusionUnityLoaded) {
        return;
    }

    const fusionFrame =
        $("fusionUnity");

    if (
        !fusionFrame ||
        !FUSION_WEBGL_URL
    ) {
        return;
    }

    fusionUnityLoaded = true;

    fusionFrame.src =
        FUSION_WEBGL_URL;

    fusionFrame.dataset.loaded =
        "true";

    console.log(
        "開始載入 Fusion Unity..."
    );
}

const s = {
    power: false,
    rough: false,
    turbo: false,
    vent: false,
    gas: false,
    mfc: false,
    cooler: false,
    hv: false,
    mw: false,
    beam: false,
    vacuum: 0,
    seconds: 0,
    selected: null
};

const info = {

    zh: {

        rough_pump: [
            "Rough Pump｜前級真空泵",
            "先排除腔體內大部分氣體，建立前級真空。",
            "機械泵浦改變腔室容積，將氣體吸入並排出。"
        ],

        turbo_pump: [
            "Turbo Pump｜渦輪分子泵",
            "進一步降低壓力，建立高真空環境。",
            "高速葉片與氣體分子碰撞，將分子定向送往排氣端。"
        ],

        gas_supply: [
            "Gas Supply｜氣體供應",
            "提供實驗氣體並完成調壓。",
            "氣瓶中的氣體經調壓後送往 MFC。"
        ],

        gas_mfc: [
            "MFC｜質量流量控制器",
            "精確控制氣體進入系統的流量。",
            "感測實際質量流率，再以控制閥閉迴路調節。"
        ],

        cooler: [
            "Cooler｜冷卻系統",
            "帶走設備運轉產生的熱量。",
            "冷卻液循環通過熱源並經熱交換器散熱。"
        ],

        high_voltage: [
            "High Voltage｜高壓系統",
            "提供離子源與電極所需的電位差。",
            "帶電粒子在電場中受力並獲得動能。"
        ],

        microwave: [
            "Microwave RF｜微波射頻系統",
            "輸入微波能量，使低壓氣體游離形成電漿。",
            "自由電子吸收微波能量後碰撞氣體分子造成游離。"
        ],

        detector: [
            "Pressure & Detector｜壓力與偵測",
            "監測腔體壓力及粒子相關訊號。",
            "感測器把物理量轉換為電訊號。"
        ]
    },


    en: {

        rough_pump: [
            "Rough Pump",
            "Removes most of the gas from the chamber to establish a rough vacuum.",
            "The mechanical pump changes the chamber volume to draw in and exhaust gas."
        ],

        turbo_pump: [
            "Turbo Pump",
            "Further reduces the chamber pressure to establish a high-vacuum environment.",
            "High-speed rotor blades collide with gas molecules and direct them toward the exhaust side."
        ],

        gas_supply: [
            "Gas Supply",
            "Supplies the experimental gas and regulates its pressure before it enters the system.",
            "Gas from the cylinder is pressure-regulated before being delivered to the mass flow controller."
        ],

        gas_mfc: [
            "MFC｜Mass Flow Controller",
            "Precisely controls the gas flow entering the system.",
            "The actual mass flow rate is measured and regulated through closed-loop control of the valve."
        ],

        cooler: [
            "Cooler｜Cooling System",
            "Removes heat generated during system operation.",
            "Coolant circulates through the heat source and transfers the absorbed heat through a heat exchanger."
        ],

        high_voltage: [
            "High Voltage System",
            "Provides the potential difference required by the ion source and electrodes.",
            "Charged particles experience force in the electric field and gain kinetic energy."
        ],

        microwave: [
            "Microwave RF System",
            "Supplies microwave energy to ionize the low-pressure gas and generate plasma.",
            "Free electrons absorb microwave energy and collide with gas particles, causing ionization."
        ],

        detector: [
            "Pressure & Detector",
            "Monitors chamber pressure and particle-related signals.",
            "Sensors convert physical quantities into electrical signals for measurement and analysis."
        ]
    }
};

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

/* =========================================================
   Alpha-E 教學流程進度列
========================================================= */

function updateFlowProgress() {

    const flow = [
        {
            id: "power",
            complete: s.power
        },

        {
            id: "vacuum",
            complete: s.vacuum >= 90
        },

        {
            id: "gas",
            complete: s.gas && s.mfc
        },

        {
            id: "cooling",
            complete: s.cooler
        },

        {
            id: "high_voltage",
            complete: s.hv
        },

        {
            id: "plasma",
            complete: s.mw
        },

        {
            id: "beam",
            complete: s.beam
        },

        {
            id: "fusion",
            complete: fusionCompleted
        }
    ];


    /* 找出第一個尚未完成的步驟 */
    let currentIndex =
        flow.findIndex(step => !step.complete);


    /* 全部完成 */
    if (currentIndex === -1) {
        currentIndex = flow.length - 1;
    }


    flow.forEach((step, index) => {

        const element =
            document.querySelector(
                `[data-flow-step="${step.id}"]`
            );

        if (!element) return;


        element.classList.remove(
            "current",
            "complete"
        );


        if (step.complete) {

            element.classList.add(
                "complete"
            );

        }
        else if (index === currentIndex) {

            element.classList.add(
                "current"
            );
        }
    });


    /* 更新連接線 */
    const lines =
        document.querySelectorAll(
            ".alpha-flow-steps .flow-line"
        );

    lines.forEach((line, index) => {

        line.classList.toggle(
            "complete",
            flow[index]?.complete === true
        );

    });


    /* Step X / 8 */
    const progressText =
        $("flowProgressText");

    if (progressText) {

        progressText.textContent =
            `${t("flow_step")} ${currentIndex + 1} / ${flow.length}`;
    }
}

function toggleMenu() {
    $("nav-menu").classList.toggle("open")
}

function led(name, on) {

    $(name + "Led")
        .classList.toggle(
            "on",
            on
        );

    $(name + "Label").textContent =
        on
            ? t("panel_on")
            : t("panel_off");

    $(name + "Label")
        .classList.toggle(
            "on",
            on
        );
}

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

    const deviceInfo =
        info[currentLanguage]?.[id];

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

document.querySelectorAll("[data-device]").forEach
    (
        x => x.addEventListener
            (
                "click", e => {
                    if (!["BUTTON", "INPUT", "SELECT"].includes(e.target.tagName))
                        select(x.dataset.device)
            }
        )
    );
function powered() {

    if (!s.power) {

        alert(
            t("alert_power_first")
        );

        return false;
    }

    return true;
}

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
    const [d, a] = b.dataset.cmd.split(":");
    if (a !== "off" && !powered()) return;
    if (d === "rough") s.rough = a === "on";
    if (d === "turbo") {
        if (a === "on" && !s.rough)
            return alert(
                t("alert_rough_first")
            );
            s.turbo = a === "on"; s.vent = a === "vent"
    }
    if (d === "mfc") {

        if (
            a === "on" &&
            !s.gas
        ) {

            return alert(
                t("alert_setup_gas_first")
            );
        }

        s.mfc =
            a === "on";
    }
if (d === "cooler") s.cooler = a === "on";
if (d === "hv") {
    if (a === "on" && !(s.vacuum >= 85 && s.gas && s.cooler))
        return alert(
            t("alert_hv_prerequisites")
        );
    s.hv = a === "on"
}
    if (d === "mw") {

        if (
            a === "on" &&
            !(s.hv && s.mfc)
        ) {
            return alert(
                t("alert_mw_prerequisites")
            );
        }

        s.mw =
            a === "on";


        /*
         * Microwave On / Plasma 形成後，
         * 才開始背景載入 Fusion Unity。
         */
        if (
            a === "on" &&
            s.mw
        ) {
            loadFusionUnity();
        }
    }
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
        alert(
            t("alert_rough_first")
        );
        return;
    }

    if (!s.turbo) {
        alert(
            t("alert_turbo_first")
        );
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

/*
 * Beam 建立完成後的教學過場。
 *
 * 顯示 Beam Established 提示，
 * 再解鎖並捲動到 Fusion 區域。
 */
function showBeamTransition() {

    const transition =
        $("beamTransition");


    /* 找不到過場元素時，
       直接進入 Fusion，避免流程卡住 */
    if (!transition) {

        unlockFusionSection();

        return;
    }


    transition.classList.add(
        "active"
    );

    transition.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
     * 顯示約 1.5 秒
     */
    setTimeout(() => {

        transition.classList.remove(
            "active"
        );

        transition.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
         * 等淡出開始後再進 Fusion，
         * 畫面會比較自然。
         */
        setTimeout(() => {

            unlockFusionSection();

        }, 250);


    }, 1500);
}

/* =========================================================
   恢復 Alpha-E Unity 狀態
========================================================= */

function restoreAlphaUnityState() {

    console.log(
        "開始恢復 Alpha-E Unity 狀態..."
    );


    /* Power */
    if (s.power) {

        send(
            "SetPower",
            "system",
            "on"
        );
    }


    /* Rough Pump */
    if (s.rough) {

        send(
            "OperateEquipment",
            "rough_pump",
            "on"
        );
    }


    /* Turbo Pump */
    if (s.turbo) {

        send(
            "OperateEquipment",
            "turbo_pump",
            "on"
        );
    }


    /* Gas Supply */
    if (s.gas) {

        send(
            "SetupGas",
            "gas_supply",
            $("gasType").value
        );
    }


    /* MFC */
    if (s.mfc) {

        send(
            "OperateEquipment",
            "gas_mfc",
            "on"
        );
    }


    /* Cooler */
    if (s.cooler) {

        send(
            "OperateEquipment",
            "cooler",
            "on"
        );
    }


    /* High Voltage */
    if (s.hv) {

        send(
            "OperateEquipment",
            "high_voltage",
            "on"
        );
    }


    /* Microwave */
    if (s.mw) {

        send(
            "OperateEquipment",
            "microwave",
            "on"
        );
    }


    console.log(
        "Alpha-E Unity 狀態恢復完成 ✓"
    );
}

/* =========================================================
   Alpha-E Unity Message
========================================================= */

window.addEventListener(
    "message",
    function (event) {

        const message =
            event.data;

        if (
            !message ||
            message.source !== "alpha-unity"
        ) {
            return;
        }


        /*
         * Alpha-E Unity 已經載入完成。
         */
        if (
            message.type === "AlphaReady"
        ) {

            console.log(
                "Alpha-E Unity Ready ✓"
            );


            /*
             * Unity 已經真正初始化完成，
             * 現在可以安全恢復目前設備狀態。
             */
            restoreAlphaUnityState();


            return;
        }
    }
);

/* =========================================================
   Fusion Section
========================================================= */

/*
 * Beam On 完成後解鎖 Fusion 區域。
 *
 * Fusion Unity 在網頁開啟時就已經預先載入，
 * 所以這裡不再重新設定 iframe src。
 */
function unlockFusionSection() {

    fusionUnlocked = true;

    const section =
        $("fusion-section");

    const overlay =
        $("fusionLockedOverlay");

    if (!section) {
        console.warn(
            "找不到 Fusion Section。"
        );
        return;
    }


    /* =========================
       解鎖 Fusion 區域
    ========================= */

    section.classList.remove("locked");

    if (overlay) {
        overlay.style.display = "none";
    }


    /* =========================
       判斷 Unity 是否已 Ready
    ========================= */

    if (fusionUnityReady) {

        setFusionStatus(
            "fusion_status_ready"
        );

        setFusionSectionHint(
            "fusion_ready_hint"
        );

        $("fusionStart").disabled =
            false;

        $("fusionRestart").disabled =
            false;

    }
    else {

        setFusionStatus(
            "fusion_status_loading"
        );

        setFusionSectionHint(
            "fusion_loading_hint"
        );

        $("fusionStart").disabled =
            true;

        $("fusionRestart").disabled =
            true;
    }


    $("fusionPause").disabled =
        true;

    $("fusionResume").disabled =
        true;


    /* =========================
       捲動到 Fusion
    ========================= */

    setTimeout(() => {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 400);
}

/*
 * 接收 Fusion WebGL 傳回外層網頁的訊息。
 */
window.addEventListener(
    "message",
    function (event) {

        const message = event.data;

        if (
            !message ||
            message.source !== "fusion-unity"
        ) {
            return;
        }

        // console.log(
        //    "網頁收到 Fusion Unity：",
        //    message
        // );

        /* =========================
            Fusion Loading Progress
        ========================= */

        if (message.type === "FusionLoading") {

            const progress =
                Math.min(
                    1,
                    Math.max(
                        0,
                        Number(message.progress) || 0
                    )
                );

            const percent =
                Math.round(
                    progress * 100
                );

            fusionLoadingPercent =
                percent;


            const progressBar =
                $("fusionLoadingProgress");

            const loadingText =
                $("fusionLoadingText");


            if (progressBar) {

                progressBar.style.width =
                    percent + "%";
            }


            if (loadingText) {

                loadingText.textContent =
                    `${t("fusion_loading")} ${percent}%`;
            }


            return;
        }

        /* =========================
           Unity 初始化完成
        ========================= */

        if (message.type === "FusionReady") {

            fusionUnityReady = true;


            /* Loading Bar 強制到 100% */
            const progressBar =
                $("fusionLoadingProgress");

            if (progressBar) {
                progressBar.style.width =
                    "100%";
            }


            /* 更新鎖定畫面的文字 */
            const loadingText =
                $("fusionLoadingText");

            if (loadingText) {

                loadingText.textContent =
                    t("fusion_model_ready");
            }


            console.log(
                "Fusion Unity 已完成背景載入。"
            );


            /*
             * 如果 Beam 還沒 On：
             * 保持鎖定，只顯示 Ready。
             */
            if (!fusionUnlocked) {

                $("fusionLockHint").textContent =
                    t("fusion_model_ready_hint");

                return;
            }


            /*
             * Beam 已經 On：
             * 正式開放操作。
             */
            setFusionStatus(
                "fusion_status_ready"
            );

            setFusionSectionHint(
                "fusion_ready_hint"
            );


            $("fusionStart").disabled =
                false;

            $("fusionRestart").disabled =
                false;

            $("fusionPause").disabled =
                true;

            $("fusionResume").disabled =
                true;


            return;
        }

        /* =========================
   Reaction Stage
   Unity 核融合動畫階段同步
========================= */

        if (message.type === "FusionStage") {

            const stage =
                message.stage || "IDLE";

            //console.log(
            //    "Fusion Reaction Stage：",
            //    stage
            // );

            switch (stage) {

                case "IDLE":

                    setFusionStatus(
                        "fusion_status_ready"
                    );

                    break;


                case "APPROACH":

                    setFusionStatus(
                        "fusion_stage_approach"
                    );

                    break;


                case "CAPTURE":

                    setFusionStatus(
                        "fusion_stage_capture"
                    );

                    break;


                case "C12_EXCITED":

                    setFusionStatus(
                        "fusion_stage_c12_excited"
                    );

                    break;


                case "C12_BREAK":

                    setFusionStatus(
                        "fusion_stage_c12_break"
                    );

                    break;


                case "BE8_UNSTABLE":

                    setFusionStatus(
                        "fusion_stage_be8_unstable"
                    );

                    break;


                case "BE8_BREAK":

                    setFusionStatus(
                        "fusion_stage_be8_break"
                    );

                    break;


                case "FINISHED":

                    setFusionStatus(
                        "fusion_stage_complete"
                    );

                    completeFusionReaction();

                    break;
            }

            return;
        }


        /* =========================
           Reaction Status
        ========================= */

        if (message.type === "FusionStatus") {

            const status =
                message.status || "";

            const normalizedStatus =
                status.toLowerCase();


            /*
             * Unity 傳回的 FusionStatus 主要作為備援。
             * 網頁顯示文字統一由翻譯系統控制，
             * 避免中文模式突然出現 Unity 原始英文。
             */

            if (
                normalizedStatus.includes("finished") ||
                normalizedStatus.includes("complete")
            ) {

                completeFusionReaction();

                return;
            }


            if (
                normalizedStatus.includes("pause")
            ) {

                setFusionStatus(
                    "fusion_status_paused"
                );

                return;
            }


            if (
                normalizedStatus.includes("ready") ||
                normalizedStatus.includes("idle")
            ) {

                setFusionStatus(
                    "fusion_status_ready"
                );

                return;
            }


            /*
             * 其他 Unity 狀態不直接顯示原始英文，
             * 統一視為反應進行中。
             */
            if (status) {

                setFusionStatus(
                    "fusion_status_running"
                );
            }


            return;
        }


        /* =========================
           Energy
        ========================= */

        if (message.type === "FusionEnergy") {

            const now = performance.now();

            // 最多約 15 次 / 秒更新 HTML
            if (
                now - lastFusionEnergyUpdate < 66 &&
                Number(message.energy) < 8.68
            ) {
                return;
            }

            lastFusionEnergyUpdate = now;

            const energy =
                Number(message.energy) || 0;

            const totalEnergy = 8.68;

            const percentage =
                Math.min(
                    100,
                    Math.max(
                        0,
                        energy / totalEnergy * 100
                    )
                );

            const energyValue =
                $("fusionEnergyValue");

            const energyProgress =
                $("fusionEnergyProgress");

            if (energyValue) {
                energyValue.textContent =
                    energy.toFixed(2);
            }

            if (energyProgress) {
                energyProgress.style.width =
                    percentage + "%";
            }

            return;
        }
    }
);

/*
 * Beam On：
 * 完成所有前置條件後建立 Beam，
 * 並解鎖下方 p–11B Fusion 區域。
 */
$("beamOn").onclick = () => {

    const beamReady =
        s.power &&
        s.hv &&
        s.mw &&
        s.mfc &&
        s.cooler &&
        s.vacuum >= 90;


    if (!beamReady) {

        alert(
            t("alert_beam_prerequisites")
        );

        return;
    }


    s.beam = true;

    update();

    /* 先通知 Alpha-E Unity Beam On */
    send(
        "Beam",
        "beam",
        "on"
    );

    /*
     * Beam 已建立。
     * 接下來即將進入 Fusion，
     * 立即釋放 Alpha-E Unity，
     * 避免兩個 WebGL 同時占用 GPU。
     */
    unloadAlphaUnity();

    /* 顯示 Beam Established 過場 */
    showBeamTransition();
};

$("beamOff").onclick = () => {

    s.beam = false;

    update();

    send(
        "Beam",
        "beam",
        "off"
    );
};

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
            ? t("vacuum_ready")
            : t("vacuum_not_ready");

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
            ? `${t("current_gas")}：${getGasDisplayName(
                $("gasType").value
            )}`
            : t("not_configured");


    $("stepHv").textContent =
        s.hv
            ? t("high_voltage_on")
            : (
                s.vacuum >= 85 &&
                s.gas &&
                s.cooler
            )
                ? t("ready_to_start")
                : t("prerequisites_incomplete");


    $("stepMw").textContent =
        s.mw
            ? t("microwave_plasma_on")
            : (
                s.hv &&
                s.mfc
            )
                ? t("ready_to_start")
                : t("prerequisites_incomplete");


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
            ? t("status_beam_on")
            : s.mw
                ? t("status_plasma_generated")
                : s.power
                    ? t("status_power_on")
                    : t("standby");


    /* =========================
       更新資訊與教學導引
    ========================= */

    live();
    updateGuide();
    updateFlowProgress();
}
function live() {

    if (!s.selected) {
        return;
    }


    let text = "";


    /* =========================
       Rough Pump
    ========================= */

    if (
        s.selected ===
        "rough_pump"
    ) {

        text =
            `${s.rough
                ? t("live_running")
                : t("live_stopped")
            }；` +
            `${t("live_vacuum_progress")} ` +
            `${s.vacuum.toFixed(0)}%。`;
    }


    /* =========================
       Turbo Pump
    ========================= */

    if (
        s.selected ===
        "turbo_pump"
    ) {

        const turboStatus =
            s.turbo
                ? t("live_running")
                : s.vent
                    ? "Vent"
                    : t("live_stopped");

        text =
            `${turboStatus}；` +
            `${t("live_rotation_speed")} ` +
            `${$("turboSpeed").textContent} Hz。`;
    }


    /* =========================
       Gas Supply
    ========================= */

    if (
        s.selected ===
        "gas_supply"
    ) {

        if (s.gas) {

            text =
                `${getGasDisplayName(
                    $("gasType").value
                )} ` +
                `${t("live_gas_configured")}；` +
                `${t("live_pressure_setting")} ` +
                `${$("gasPressure").value}。`;
        }
        else {

            text =
                t("gas_supply_not_configured");
        }
    }


    /* =========================
       MFC
    ========================= */

    if (
        s.selected ===
        "gas_mfc"
    ) {

        text =
            `${s.mfc
                ? t("panel_on")
                : t("panel_off")
            }；` +
            `${t("live_setpoint")} ` +
            `${$("mfcFlow").value} sccm；` +
            `${t("live_measured")} ` +
            `${$("mfcMeasured").textContent}。`;
    }


    /* =========================
       Cooler
    ========================= */

    if (
        s.selected ===
        "cooler"
    ) {

        text =
            `${s.cooler
                ? t("panel_on")
                : t("panel_off")
            }；` +
            `${t("live_flow")} ` +
            `${$("coolerFlow").textContent} L/m；` +
            `${t("live_temperature")} ` +
            `${$("coolerTemp").textContent} °C。`;
    }


    /* =========================
       High Voltage
    ========================= */

    if (
        s.selected ===
        "high_voltage"
    ) {

        text =
            `${s.hv
                ? t("panel_on")
                : t("panel_off")
            }；` +
            `${$("hvVoltage").value} kV / ` +
            `${$("hvCurrent").value} mA。`;
    }


    /* =========================
       Microwave
    ========================= */

    if (
        s.selected ===
        "microwave"
    ) {

        text =
            `${s.mw
                ? t("panel_on")
                : t("panel_off")
            }；` +

            `${s.mw
                ? t("status_plasma_generated")
                : t("live_plasma_not_generated")
            }；` +

            `RF ${$("mwFreq").value} MHz；` +
            `Duty ${$("mwDuty").value}%。`;
    }


    /* =========================
       Detector
    ========================= */

    if (
        s.selected ===
        "detector"
    ) {

        text =
            `${t("panel_pressure")} ` +
            `${$("pressureValue").textContent} Torr；` +
            `Beam ` +
            `${s.beam
                ? t("panel_on")
                : t("panel_off")
            }。`;
    }


    $("infoLive").textContent =
        text;
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

    // console.log("傳送給 Unity：", message);

    unityFrame.contentWindow.postMessage(
        message,
        "*"
    );
}

/*
 * 將 HTML 操作指令傳送給
 * p–11B Fusion Unity。
 */
function sendFusion(
    type,
    action = ""
) {

    const fusionFrame =
        $("fusionUnity");


    if (!fusionFrame) {

        console.warn(
            "找不到 fusionUnity iframe。"
        );

        return false;
    }


    /*
     * Unity 還沒初始化完成時，
     * 不送控制訊息。
     */
    if (!fusionUnityReady) {

        console.warn(
            "Fusion Unity 尚未 Ready，暫時不送出：",
            type
        );

        return false;
    }


    const message = {

        source: "fusion-parent",

        type: type,

        action: action

    };


    // console.log(
    //    "傳送給 Fusion Unity：",
    //    message
    // );


    fusionFrame.contentWindow.postMessage(
        message,
        "*"
    );


    return true;
}

/*
 * Fusion 反應完成。
 *
 * 1. 第 8 步改為 Complete。
 * 2. 顯示反應結果卡。
 * 3. 鎖住 Pause / Resume。
 */
function completeFusionReaction() {

    fusionCompleted = true;


    /* =========================
       Fusion 控制面板
    ========================= */

    setFusionStatus(
        "fusion_stage_complete"
    );

    $("fusionPause").disabled =
        true;

    $("fusionResume").disabled =
        true;

    $("fusionStart").disabled =
        true;

    $("fusionRestart").disabled =
        false;


    /* =========================
       Energy 強制完成
    ========================= */

    $("fusionEnergyValue").textContent =
        "8.68";

    $("fusionEnergyProgress")
        .style.width =
        "100%";


    /* =========================
       顯示結果卡
    ========================= */

    const result =
        $("fusionResult");

    if (result) {

        result.classList.add(
            "active"
        );

        result.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    /* =========================
       更新 8 步驟流程
    ========================= */

    updateFlowProgress();


    /* =========================
       自動捲到結果
    ========================= */

    setTimeout(() => {

        result?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 350);
}

/* =========================================================
   Fusion HTML Controls
========================================================= */

/* =========================
   Start
========================= */

$("fusionStart").onclick = () => {

    const sent = sendFusion(
        "StartFusion",
        "start"
    );

    if (!sent) {
        return;
    }


    setFusionStatus(
        "fusion_status_running"
    );

    $("fusionStart").disabled =
        true;

    $("fusionPause").disabled =
        false;

    $("fusionResume").disabled =
        true;
};


/* =========================
   Pause
========================= */

$("fusionPause").onclick = () => {


    const sent = sendFusion(
        "PauseFusion",
        "pause"
    );

    if (!sent) {
        return;
    }


    setFusionStatus(
        "fusion_status_paused"
    );

    $("fusionPause").disabled =
        true;

    $("fusionResume").disabled =
        false;
};


/* =========================
   Resume
========================= */

$("fusionResume").onclick = () => {

    const sent = sendFusion(
        "ResumeFusion",
        "resume"
    );

    if (!sent) {
        return;
    }


    setFusionStatus(
        "fusion_status_running"
    );

    $("fusionPause").disabled =
        false;

    $("fusionResume").disabled =
        true;
};

/* =========================
   Restart
========================= */

$("fusionRestart").onclick = () => {

    const sent = sendFusion(
        "RestartFusion",
        "restart"
    );

    if (!sent) {
        return;
    }


    /* 重設 Fusion 完成狀態 */
    fusionCompleted = false;


    /* 隱藏 Fusion Complete 結果卡 */
    const result =
        $("fusionResult");

    if (result) {

        result.classList.remove(
            "active"
        );

        result.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* 重設儀表板 */
    setFusionStatus(
        "fusion_status_ready"
    );


    $("fusionEnergyValue").textContent =
        "0.00";

    $("fusionEnergyProgress").style.width =
        "0%";


    $("fusionStart").disabled =
        false;

    $("fusionPause").disabled =
        true;

    $("fusionResume").disabled =
        true;

    $("fusionRestart").disabled =
        false;


    /* 第 8 步重新回到目前步驟 */
    updateFlowProgress();
};

$("fusionReplay").onclick = () => {

    fusionCompleted = false;


    /* 隱藏結果卡 */
    const result =
        $("fusionResult");

    if (result) {

        result.classList.remove(
            "active"
        );

        result.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* 先 Reset Unity */
    const sent = sendFusion(
        "RestartFusion",
        "restart"
    );

    if (!sent) {
        return;
    }


    /* 重設 HTML 儀表板 */
    setFusionStatus(
        "fusion_status_ready"
    );

    $("fusionEnergyValue").textContent =
        "0.00";

    $("fusionEnergyProgress")
        .style.width =
        "0%";


    $("fusionStart").disabled =
        false;

    $("fusionPause").disabled =
        true;

    $("fusionResume").disabled =
        true;

    $("fusionRestart").disabled =
        false;


    updateFlowProgress();


    /* 回到 Fusion 模型上方 */
    $("fusion-section")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
};

$("returnAlpha").onclick = () => {

    const alphaPanel =
        document.querySelector(
            ".sim-panel"
        );

    if (!alphaPanel) {
        return;
    }


    /*
     * 先重新載入 Alpha-E Unity。
     */
    loadAlphaUnity();


    /*
     * 再回到 Alpha-E 操作區。
     */
    alphaPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

/* =========================
   延遲載入 Alpha-E Unity
========================= */

let alphaUnityLoaded = false;


/* =========================
   載入 Alpha-E Unity
========================= */

function loadAlphaUnity() {

    if (alphaUnityLoaded) {
        return;
    }

    if (!UNITY_WEBGL_URL) {
        return;
    }

    let alphaFrame =
        $("alphaUnity");


    /*
     * 如果 Alpha-E iframe 之前已經被 remove，
     * Return 時重新建立一個新的 iframe。
     */
    if (!alphaFrame) {

        const wrapper =
            document.querySelector(
                ".alpha-unity-wrap"
            );

        if (!wrapper) {
            console.warn(
                "找不到 .alpha-unity-wrap"
            );
            return;
        }


        alphaFrame =
            document.createElement(
                "iframe"
            );

        alphaFrame.id =
            "alphaUnity";

        alphaFrame.title =
            t("alpha_unity_title");

        alphaFrame.setAttribute(
            "allowfullscreen",
            ""
        );


        wrapper.appendChild(
            alphaFrame
        );

        console.log(
            "重新建立 Alpha-E iframe"
        );
    }


    alphaUnityLoaded = true;

    alphaFrame.src =
        UNITY_WEBGL_URL;

    alphaFrame.style.display =
        "block";


    console.log(
        "開始載入 Alpha-E Unity..."
    );
}


/* =========================
   卸載 Alpha-E Unity
========================= */

function unloadAlphaUnity() {

    const alphaFrame =
        $("alphaUnity");

    if (!alphaFrame) {
        return;
    }

    /*
     * 完整移除 Alpha-E iframe，
     * 釋放 Unity WebGL / GPU 資源。
     */
    alphaFrame.remove();

    alphaUnityLoaded = false;

    console.log(
        "Alpha-E Unity 已卸載"
    );
}


/*
 * 當 Alpha-E 3D Model 接近畫面時
 * 才開始載入 Unity。
 */
const alphaUnityColumn =
    document.querySelector(
        ".alpha-unity-column"
    );

if (alphaUnityColumn) {

    const alphaUnityObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        loadAlphaUnity();

                        observer.disconnect();
                    }

                });

            },

            {
                root: null,

                /*
                 * 還沒真正看到模型以前
                 * 提前 300px 開始載入。
                 */
                rootMargin: "300px 0px",

                threshold: 0.01
            }
        );


    alphaUnityObserver.observe(
        alphaUnityColumn
    );
}

line(
    $("pnChart"),
    pn
);

line(
    $("psdChart"),
    psd,
    true
);

applyLanguage();

/* =========================================================
   Alpha-E 操作面板等比例縮放

   同時依照容器的「寬度」與「高度」計算，
   自動選擇較小的縮放倍率，
   確保完整面板永遠不會被裁切。
========================================================= */
function resizeAlphaPanel() {

    const container =
        document.querySelector(
            ".alpha-control-column"
        );

    const panel =
        container?.querySelector(
            ".sim-panel"
        );

    if (!container || !panel) {
        return;
    }

    const originalWidth = 1800;
    const originalHeight = 1024;

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const scaleByWidth =
        containerWidth / originalWidth;

    const scaleByHeight =
        containerHeight / originalHeight;

    const scale =
        Math.min(
            scaleByWidth,
            scaleByHeight
        );

    container.style.setProperty(
        "--alpha-panel-scale",
        scale
    );

    const scaledWidth =
        originalWidth * scale;

    const scaledHeight =
        originalHeight * scale;

    panel.style.left =
        Math.max(
            0,
            (containerWidth - scaledWidth) / 2
        ) + "px";

    panel.style.top =
        Math.max(
            0,
            (containerHeight - scaledHeight) / 2
        ) + "px";
}

$("langToggle").onclick = () => {

    currentLanguage =
        currentLanguage === "zh"
            ? "en"
            : "zh";


    localStorage.setItem(
        "alphaLanguage",
        currentLanguage
    );


    applyLanguage();
};

/* 網頁第一次開啟 */
resizeAlphaPanel();


/* 視窗尺寸改變 */
window.addEventListener(
    "resize",
    resizeAlphaPanel
);


/*
 * 外層 Grid 尺寸改變時也重新計算。
 * 比單純 window.resize 更穩定。
 */
const alphaPanelResizeObserver =
    new ResizeObserver(() => {

        resizeAlphaPanel();

    });


const alphaControlColumn =
    document.querySelector(
        ".alpha-control-column"
    );


if (alphaControlColumn) {

    alphaPanelResizeObserver.observe(
        alphaControlColumn
    );
}