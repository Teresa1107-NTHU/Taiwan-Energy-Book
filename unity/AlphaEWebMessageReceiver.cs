/*
 * Alpha-E 網頁訊息接收器
 * 接收 WebGL 頁面中的 JavaScript 傳入設備 ID，
 * 再呼叫模型高亮、鏡頭定位或設備操作功能。
 */

using UnityEngine;

public class AlphaEWebMessageReceiver : MonoBehaviour
{
    [SerializeField] private EquipmentController equipmentController;

    public void SelectEquipment(string equipmentId)
    {
        if (equipmentController == null)
        {
            Debug.LogError("尚未指定 EquipmentController。");
            return;
        }

        equipmentController.SelectEquipment(equipmentId);
    }

    public void FocusEquipment(string equipmentId)
    {
        if (equipmentController == null)
        {
            Debug.LogError("尚未指定 EquipmentController。");
            return;
        }

        equipmentController.FocusEquipment(equipmentId);
    }

    public void OperateEquipment(string json)
    {
        Debug.Log($"收到網頁操作指令：{json}");
        // 後續可將 JSON 解析成 equipmentId 與 action，
        // 再交給 EquipmentController 執行動畫或狀態變化。
    }
}
