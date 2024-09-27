export default {
  "panels": [
    {
      "index": 0,
      "name": 1,
      "height": 297,
      "width": 210,
      "paperHeader": 49.5,
      "paperFooter": 780,
      "printElements": [
        {"options":{"left":140.5,"top":12,"height":27,"width":259,"title":"开利空气源热泵","fontSize":19,"fontWeight":"600","textAlign":"center","lineHeight":26},"printElementType":{"title":"自定义文本","type":"text"}},
        // {
        //   "options": {
        //     "left": 402.5,
        //     "top": 35,
        //     "height": 40,
        //     "width": 160,
        //     "title": "条形码",
        //     "barcodeType": "code128",
        //     "testData": "barcode",
        //     "textType": "barcode",
        //     "fields": [
        //       {
        //         "text": "出库单号",
        //         "field": "shipmentOrderNo"
        //       },
        //       {
        //         "text": "订单号",
        //         "field": "orderNo"
        //       }
        //     ],
        //     "field": "shipmentOrderNo",
        //     "coordinateSync": false,
        //     "widthHeightSync": false
        //   },
        //   "printElementType": {
        //     "title": "条形码",
        //     "type": "barcode"
        //   }
        // },
        {
          "options": {
              "left": 28, 
              "top": 54, 
              "height": 9.75, 
              "width": 120, 
              "title": "发货仓库", 
              "field": "warehouseName", 
          }, 
          "printElementType": {
              "type": "text"
          }
      }, 
      {
          "options": {
              "left": 226.5, 
              "top": 54, 
              "height": 9.75, 
              "width": 120, 
              "title": "日期", 
              "field": "updateTime", 
          }, 
          "printElementType": {
              "type": "text"
          }
      }, 
      {
          "options": {
              "left": 375, 
              "top": 54, 
              "height": 9.75, 
              "width": 120, 
              "title": "单据编号", 
              "field": "shipmentOrderNo", 
          }, 
          "printElementType": {
              "type": "text"
          }
      }, 
      {
          "options": {
              "left": 28, 
              "top": 72, 
              "height": 9.75, 
              "width": 120, 
              "title": "客户名称", 
              "field": "merchantName", 
          }, 
          "printElementType": {
              "type": "text"
          }
      }, 
      {
          "options": {
              "left": 226.5, 
              "top": 72, 
              "height": 9.75, 
              "width": 120, 
              "title": "联系人", 
              "field": "contactPerson", 
          }, 
          "printElementType": {
              "type": "text"
          }
      }, 
      {
          "options": {
              "left": 375, 
              "top": 72, 
              "height": 9.75, 
              "width": 120, 
              "title": "联系电话", 
              "field": "mobile", 
          }, 
          "printElementType": {
              "type": "text"
          }
      },
      {
        "options": {
            "left": 28, 
            "top": 90, 
            "height": 9.75, 
            "width": 120, 
            "title": "制单人", 
            "field": "loginUserName", 
        }, 
        "printElementType": {
            "type": "text"
        }
    }, 
    {
        "options": {
            "left": 226.5, 
            "top": 90, 
            "height": 9.75, 
            "width": 180, 
            "title": "打印日期", 
            "field": "printDate", 
        }, 
        "printElementType": {
            "type": "text"
        }
    }, 
    // {
    //     "options": {
    //         "left": 375, 
    //         "top": 90, 
    //         "height": 9.75, 
    //         "width": 120, 
    //         "title": "单据编号", 
    //         "field": "shipmentOrderNo", 
    //     }, 
    //     "printElementType": {
    //         "type": "text"
    //     }
    // }, 
    {
        "options": {
            "left": 28, 
            "top": 108, 
            "height": 9.75, 
            "width": 120, 
            "title": "总计大写", 
            "field": "chineseAmount", 
        }, 
        "printElementType": {
            "type": "text"
        }
    }, 
    // {
    //     "options": {
    //         "left": 226.5, 
    //         "top": 108, 
    //         "height": 9.75, 
    //         "width": 120, 
    //         "title": "联系人", 
    //         "field": "merchantName", 
    //     }, 
    //     "printElementType": {
    //         "type": "text"
    //     }
    // }, 
    // {
    //     "options": {
    //         "left": 375, 
    //         "top": 108, 
    //         "height": 9.75, 
    //         "width": 120, 
    //         "title": "联系电话", 
    //         "field": "tel", 
    //     }, 
    //     "printElementType": {
    //         "type": "text"
    //     }
    // },
       
        {
          "options": {
            "left": 17.5,
            "top": 126,
            "height": 54,
            "width": 550,
            "field": "table",
            "groupFieldsFormatter": "function(type,options,data){ return [\"name\"] }",
            "columns": [
              [
                {
                  "width": 120,
                  "align": "center",
                  "title": "商品名称",
                  "field": "itemName",
                  "checked": true,
                  "columnId": "itemName",
                  "fixed": false,
                  "rowspan": 1,
                  "colspan": 1
                },
                {
                  "width": 78.57142857142857,
                  "align": "center",
                  "title": "数量",
                  "field": "quantity",
                  "checked": true,
                  "columnId": "quantity",
                  "fixed": false,
                  "rowspan": 1,
                  "colspan": 1
                  // "tableSummary": "sum",
                  // "tableSummaryAlign": "right",
                  // "tableSummaryNumFormat": "0"
                },
                {
                  "width": 78.57142857142857,
                  "align": "center",
                  "title": "单位",
                  "field": "skuName",
                  "checked": true,
                  "columnId": "skuName",
                  "fixed": false,
                  "rowspan": 1,
                  "colspan": 1
                },
                {
                  "width": 78.57142857142857,
                  "align": "center",
                  "title": "单价(元)",
                  "field": "sellingPrice",
                  "checked": true,
                  "columnId": "sellingPrice",
                  "fixed": false,
                  "rowspan": 1,
                  "colspan": 1,
                  // "tableSummary": "sum",
                  // "tableSummaryAlign": "right"
                },
                {
                  "width": 78.57142857142857,
                  "align": "center",
                  "title": "金额(元)",
                  "field": "amount",
                  "checked": true,
                  "columnId": "amount",
                  "fixed": false,
                  "rowspan": 1,
                  "colspan": 1,
                  "tableSummary": "sum",
                  "tableSummaryAlign": "center",
                  "tableSummaryNumFormat": "0"

                },
                // {
                //   "width": 78.57142857142857,
                //   "title": "规格名称",
                //   "field": "skuName",
                //   "checked": true,
                //   "columnId": "skuName",
                //   "fixed": false,
                //   "rowspan": 1,
                //   "colspan": 1
                // },
                // {
                //   "width": 90,
                //   "align": "center",
                //   "title": "备注",
                //   "field": "areaName",
                //   "checked": true,
                //   "columnId": "areaName",
                //   "fixed": false,
                //   "rowspan": 1,
                //   "colspan": 1
                // },
                // {
                //   "width": 78.57142857142857,
                //   "title": "批号",
                //   "field": "batchNo",
                //   "checked": true,
                //   "columnId": "batchNo",
                //   "fixed": false,
                //   "rowspan": 1,
                //   "colspan": 1,
                // },
                // {
                //   "width": 78.57142857142857,
                //   "title": "生产日期",
                //   "field": "productionDate",
                //   "checked": true,
                //   "columnId": "productionDate",
                //   "fixed": false,
                //   "rowspan": 1,
                //   "colspan": 1,
                // },
                // {
                //   "width": 78.57142857142857,
                //   "title": "过期日期",
                //   "field": "expirationDate",
                //   "checked": true,
                //   "columnId": "expirationDate",
                //   "fixed": false,
                //   "rowspan": 1,
                //   "colspan": 1,
                // },
                
               
              ]
            ]
          },
          "printElementType": {
            "title": "表格",
            "type": "table",
            "editable": true,
            "columnDisplayEditable": true,
            "columnDisplayIndexEditable": true,
            "columnTitleEditable": true,
            "columnResizable": true,
            "columnAlignEditable": true,
            "isEnableEditField": true,
            "isEnableContextMenu": true,
            "isEnableInsertRow": true,
            "isEnableDeleteRow": true,
            "isEnableInsertColumn": true,
            "isEnableDeleteColumn": true,
            "isEnableMergeCell": true
          }
        }
        // {
        //   "options": {
        //     "left": 20,
        //     "top": 247.5,
        //     "height": 9.75,
        //     "width": 500,
        //     "fields": [
        //       {
        //         "text": "入库单号",
        //         "field": "shipmentOrderNo"
        //       },
        //       {
        //         "text": "客户",
        //         "field": "merchantName"
        //       },
        //       {
        //         "text": "订单号",
        //         "field": "orderNo"
        //       },
        //       {
        //         "text": "出库类型",
        //         "field": "shipmentOrderType"
        //       },
        //       {
        //         "text": "出库状态",
        //         "field": "shipmentOrderStatus"
        //       },
        //       {
        //         "text": "创建日期",
        //         "field": "createTime"
        //       },
        //       {
        //         "text": "备注",
        //         "field": "remark"
        //       }
        //     ],
        //     "title": "备注",
        //     "field": "remark",
        //     "coordinateSync": false,
        //     "widthHeightSync": false,
        //     "qrCodeLevel": 0,
        //     "right": 139.5,
        //     "bottom": 233.25,
        //     "vCenter": 79.5,
        //     "hCenter": 228.375
        //   },
        //   "printElementType": {
        //     "title": "文本",
        //     "type": "text"
        //   }
        // }
      ],
      "paperNumberLeft": 565.5,
      "paperNumberTop": 819,
      "paperNumberContinue": true,
      "watermarkOptions": {}
    }
  ]
};
