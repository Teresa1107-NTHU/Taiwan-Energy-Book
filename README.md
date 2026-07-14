# Alpha-E 仿真操作面板 v2

此版本已把操作面板改成真正可操作的 HTML 元件。

## 可操作內容

- Power On / Off
- Rough Pump On / Off
- Turbo Pump On / Off / Vent
- 轉速、溫度與電流即時模擬
- 氣體種類與 Set Up Gas
- MFC 流量設定與量測值
- Cooler 流量與溫度
- High Voltage 電壓與電流
- Microwave Duty、Pulse、RF Frequency、Attenuation
- 壓力數值與真空進度
- PN Detector 折線圖
- PSD Scatter Dataset
- 實驗步驟互鎖與 Beam On / Off

目前數值是教學用模擬資料，不是實際 Alpha-E 量測值。

## 放入原網站

將 `alpha-e.html`、`alpha-e.css`、`alpha-e.js` 與 `assets` 資料夾放在網站根目錄。

原首頁導覽列改成：

```html
<li><a href="alpha-e.html">Alpha-E</a></li>
```

## Unity WebGL

在 `alpha-e.js` 修改：

```javascript
const UNITY_WEBGL_URL="";
```

填入你的 Unity WebGL 網址。網頁會用 `window.postMessage()` 傳送設備 ID、動作與目前狀態。


## v4 精準覆蓋修正

這版將背景圖恢復為原始 `1536 × 1024` 比例，並依照原圖座標重新定位所有控制卡。

先前使用 `1536 × 790` 的裁切比例，會讓百分比座標與原始面板不一致，
因此背景中的舊控制卡會從新卡片旁邊露出。

此外，新卡片外圍加入 5px 不透明遮罩，即使瀏覽器縮放造成少量像素誤差，
舊面板邊緣也不容易露出。
