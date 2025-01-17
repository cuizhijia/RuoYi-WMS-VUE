<template>
  <div>
    <div class="receipt-order-edit-wrapper app-container" style="margin-bottom: 60px" v-loading="loading">
      <el-card header="入库单基本信息">
        <el-form label-width="108px" :model="form" ref="receiptForm" :rules="rules">
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="入库单号" prop="receiptOrderNo">
                <el-input class="w200" v-model="form.receiptOrderNo" placeholder="入库单号" :disabled="form.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="仓库" prop="warehouseId">
                <el-select v-model="form.warehouseId" placeholder="请选择仓库" @change="handleChangeWarehouse" filterable>
                  <el-option v-for="item in useWmsStore().warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="库区" prop="areaId">
                <el-popover
                  placement="left"
                  title="提示"
                  :width="200"
                  trigger="hover"
                  :disabled="form.warehouseId"
                  content="请先选择仓库！"
                >
                  <template #reference>
                    <el-select v-model="form.areaId" placeholder="请选择库区" :disabled="!form.warehouseId" clearable filterable @change="handleChangeArea" style="width: 100%!important;">
                      <el-option v-for="item in useWmsStore().areaList.filter(it => it.warehouseId === form.warehouseId)" :key="item.id" :label="item.areaName" :value="item.id"/>
                    </el-select>
                  </template>
                </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="入库类型" prop="receiptOrderType">
                <el-radio-group v-model="form.receiptOrderType">
                  <el-radio-button
                    v-for="item in wms_receipt_type"
                    :key="item.value"
                    :label="item.value"
                    >{{ item.label }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="供应商" prop="merchantId">
                <el-select v-model="form.merchantId" placeholder="请选择供应商" clearable filterable>
                  <el-option v-for="item in useWmsStore().merchantList" :key="item.id" :label="item.merchantName" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单号" prop="orderNo">
                <el-input v-model="form.orderNo" placeholder="请输入订单号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="form.remark"
                  placeholder="备注...100个字符以内"
                  rows="4"
                  maxlength="100"
                  type="textarea"
                  show-word-limit="show-word-limit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div style="display: flex;align-items: start">
                <el-form-item label="金额" prop="payableAmount">
                  <el-input-number v-model="form.payableAmount" :precision="2" :min="0"></el-input-number>
                </el-form-item>
                <el-button link type="primary" @click="handleAutoCalc" class="ml20" style="line-height: 32px">自动计算</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数量" prop="totalQuantity">
                <el-input-number v-model="form.totalQuantity" :controls="false" :precision="0" :disabled="true"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card header="商品明细" class="mt10">
        <div class="receipt-order-content">
          <div class="flex-space-between mb8">
            <div>
              <span>一物一码/SN模式：</span>
              <el-switch
                :before-change="goSaasTip"
                class="mr10 ml10"
                inline-prompt
                size="large"
                v-model="mode"
                :active-value="true"
                :inactive-value="false"
                active-text="开启"
                inactive-text="关闭"
              />
            </div>
            <el-popover
              placement="left"
              title="提示"
              :width="200"
              trigger="hover"
              :disabled="form.warehouseId"
              content="请先选择仓库！"
            >
              <template #reference>
                <el-button type="primary" plain="plain" size="default" @click="showAddItem" icon="Plus" :disabled="!form.warehouseId">添加商品</el-button>
              </template>
            </el-popover>
          </div>
          <el-table :data="form.details" border empty-text="暂无商品明细">
            <el-table-column label="商品信息" prop="itemSku.itemName">
              <template #default="{ row }">
                <div>{{ row.itemSku.item.itemName + (row.itemSku.item.itemCode ? ('(' + row.itemSku.item.itemCode + ')') : '') }}</div>
                <div v-if="row.itemSku.item.itemBrand">品牌：{{ useWmsStore().itemBrandMap.get(row.itemSku.item.itemBrand).brandName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="规格信息">
              <template #default="{ row }">
                <div>{{ row.itemSku.skuName }}</div>
                <div v-if="row.itemSku.barcode">条码：{{row.itemSku.barcode}}</div>
              </template>
            </el-table-column>
            <el-table-column label="库区" prop="itemSku.skuName" width="200">
              <template #default="{ row }">
                <el-popover
                  placement="left"
                  title="提示"
                  :width="200"
                  trigger="hover"
                  :disabled="form.warehouseId"
                  content="请先选择仓库！"
                >
                  <template #reference>
                    <el-select v-model="row.areaId" placeholder="请选择库区" :disabled="!form.warehouseId || !!form.areaId" filterable>
                      <el-option v-for="item in useWmsStore().areaList.filter(it => it.warehouseId === form.warehouseId)" :key="item.id" :label="item.areaName" :value="item.id"/>
                    </el-select>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="quantity" width="180">
              <template #default="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  placeholder="数量"
                  :min="1"
                  :precision="0"
                  @change="handleChangeQuantity"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="价格" prop="amount" width="180">
              <template #default="scope">
                <el-input-number
                  v-model="scope.row.amount"
                  placeholder="价格"
                  :precision="2"
                  :min="0"
                  :max="2147483647"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="批号" prop="batchNo" width="150">
              <template #default="scope">
                <el-input v-model="scope.row.batchNo"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="生产日期/过期日期" width="250">
              <template #default="scope">
                <div class="flex-center">
                  <span>生产日期：</span>
                  <el-date-picker
                    v-model="scope.row.productionDate"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="width: 150px!important;"
                  />
                </div>
                <div class="flex-center mt5">
                  <span>过期日期：</span>
                  <el-date-picker
                    v-model="scope.row.expirationDate"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="width: 150px!important;"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="right" fixed="right">
              <template #default="scope">
                <el-button icon="Delete" type="danger" plain size="small" @click="handleDeleteDetail(scope.row, scope.$index)" link>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <SkuSelect
        ref="sku-select"
        :model-value="skuSelectShow"
        @handleOkClick="handleOkClick"
        @handleCancelClick="skuSelectShow = false"
        :size="'80%'"
      />
    </div>
    <div class="footer-global">
      <div class="btn-box">
        <div>
          <el-button @click="doWarehousing" type="primary" class="ml10">完成入库</el-button>
          <el-button @click="updateToInvalid" type="danger" v-if="form.id">作废</el-button>
        </div>
        <div>
          <el-button @click="save" type="primary">暂存</el-button>
          <el-button @click="cancel" class="mr10">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="ReceiptOrderEdit">
import {computed, getCurrentInstance, onMounted, reactive, ref, toRef, toRefs, watch} from "vue";
import {addReceiptOrder, getReceiptOrder, updateReceiptOrder, warehousing} from "@/api/wms/receiptOrder";
import {ElMessage, ElMessageBox} from "element-plus";
import SkuSelect from "../../../components/SkuSelect.vue";
import {useRoute} from "vue-router";
import {useWmsStore} from '@/store/modules/wms'
import { numSub, generateNo } from '@/utils/ruoyi'
import { delReceiptOrderDetail } from '@/api/wms/receiptOrderDetail'

const {proxy} = getCurrentInstance();
const { wms_receipt_type } = proxy.useDict("wms_receipt_type");
const mode = ref(false)
const loading = ref(false)
const initFormData = {
  id: undefined,
  receiptOrderNo: undefined,
  receiptOrderType: "2",
  merchantId: undefined,
  orderNo: undefined,
  payableAmount: undefined,
  receiptOrderStatus: 0,
  remark: undefined,
  warehouseId: undefined,
  areaId: undefined,
  totalQuantity: 0,
  details: [],
}
const data = reactive({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    receiptOrderNo: undefined,
    receiptOrderType: undefined,
    orderNo: undefined,
    payableAmount: undefined,
    receiptOrderStatus: undefined,
  },
  rules: {
    id: [
      {required: true, message: "不能为空", trigger: "blur"}
    ],
    receiptOrderNo: [
      {required: true, message: "入库单号不能为空", trigger: "blur"}
    ],
    receiptOrderType: [
      {required: true, message: "入库类型不能为空", trigger: "change"}
    ],
    receiptOrderStatus: [
      {required: true, message: "入库状态不能为空", trigger: "change"}
    ],
    warehouseId: [
      {required: true, message: "请选择仓库", trigger: ['blur', 'change']}
    ],
  }
});
const { form, rules} = toRefs(data);

const cancel = async () => {
  await proxy?.$modal.confirm('确认取消编辑入库单吗？');
  close()
}
const close = () => {
  const obj = {path: "/receiptOrder"};
  proxy?.$tab.closeOpenPage(obj);
}
const skuSelectShow = ref(false)

// 选择商品 start
const showAddItem = () => {
  skuSelectShow.value = true
}
// 选择成功
const handleOkClick = (item) => {
  skuSelectShow.value = false
  item.forEach((it) => {
    form.value.details.push(
      {
        itemSku: {...it},
        amount: undefined,
        quantity: it.quantity,
        batchNo: undefined,
        productionDate: undefined,
        expirationDate: undefined,
        warehouseId: form.value.warehouseId,
        areaId: form.value.areaId
      }
    )
  })
}
// 选择商品 end

// 初始化receipt-order-form ref
const receiptForm = ref()

const save = async () => {
  await proxy?.$modal.confirm('确认暂存入库单吗？');
  doSave()
}

const doSave = async (receiptOrderStatus = 0) => {
  //验证receiptForm表单
  receiptForm.value?.validate((valid) => {
    // 校验
    if (!valid) {
      return ElMessage.error('请填写必填项')
    }
    if (form.value.details?.length) {
      const invalidAreaList = form.value.details.filter(it => !it.areaId )
      if (invalidAreaList?.length) {
        return ElMessage.error('请选择库区')
      }
      const invalidQuantityList = form.value.details.filter(it => !it.quantity)
      if (invalidQuantityList?.length) {
        return ElMessage.error('请选择数量')
      }
    }
    // 构建参数
    const details = form.value.details.map(it => {
      return {
        id: it.id,
        shipmentOrderId: form.value.id,
        skuId: it.itemSku.id,
        amount: it.amount,
        quantity: it.quantity,
        batchNo: it.batchNo,
        productionDate: it.productionDate,
        expirationDate: it.expirationDate,
        warehouseId: form.value.warehouseId,
        areaId: it.areaId
      }
    })

    //console.log('提交前校验',form.value)
    const params = {
      id: form.value.id,
      receiptOrderNo: form.value.receiptOrderNo,
      receiptOrderStatus,
      receiptOrderType: form.value.receiptOrderType,
      merchantId: form.value.merchantId,
      orderNo: form.value.orderNo,
      remark: form.value.remark,
      payableAmount: form.value.payableAmount,
      totalQuantity: form.value.totalQuantity,
      warehouseId: form.value.warehouseId,
      areaId: form.value.areaId,
      details: details
    }
    if (params.id) {
      updateReceiptOrder(params).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.msg)
          close()
        } else {
          ElMessage.error(res.msg)
        }
      })
    } else {
      addReceiptOrder(params).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.msg)
          close()
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}


const updateToInvalid = async () => {
  await proxy?.$modal.confirm('确认作废入库单吗？');
  doSave(-1)
}

const doWarehousing = async () => {
  await proxy?.$modal.confirm('确认入库吗？');
  receiptForm.value?.validate((valid) => {
    // 校验
    if (!valid) {
      return ElMessage.error('请填写必填项')
    }
    if (!form.value.details?.length) {
      return ElMessage.error('请选择商品')
    }
    const invalidAreaList = form.value.details.filter(it => !it.areaId )
    if (invalidAreaList?.length) {
      return ElMessage.error('请选择库区')
    }
    const invalidQuantityList = form.value.details.filter(it => !it.quantity)
    if (invalidQuantityList?.length) {
      return ElMessage.error('请选择数量')
    }
    // 构建参数
    const details = form.value.details.map(it => {
      return {
        id: it.id,
        shipmentOrderId: form.value.id,
        skuId: it.itemSku.id,
        amount: it.amount,
        quantity: it.quantity,
        batchNo: it.batchNo,
        productionDate: it.productionDate,
        expirationDate: it.expirationDate,
        warehouseId: form.value.warehouseId,
        areaId: it.areaId
      }
    })

    //console.log('提交前校验',form.value)
    const params = {
      id: form.value.id,
      receiptOrderNo: form.value.receiptOrderNo,
      receiptOrderStatus: form.value.receiptOrderStatus,
      receiptOrderType: form.value.receiptOrderType,
      merchantId: form.value.merchantId,
      orderNo: form.value.orderNo,
      remark: form.value.remark,
      payableAmount: form.value.payableAmount,
      totalQuantity: form.value.totalQuantity,
      warehouseId: form.value.warehouseId,
      areaId: form.value.areaId,
      details: details
    }
    warehousing(params).then((res) => {
      if (res.code === 200) {
        ElMessage.success('入库成功')
        close()
      } else {
        ElMessage.error(res.msg)
      }
    })
  })
}

const route = useRoute();
onMounted(() => {
  const id = route.query && route.query.id;
  if (id) {
    loadDetail(id)
  } else {
    form.value.receiptOrderNo = 'RK' + generateNo()
  }
})


// 获取入库单详情
const loadDetail = (id) => {
  loading.value = true
  getReceiptOrder(id).then((response) => {
    form.value = {...response.data}
    Promise.resolve();
  }).then(() => {
  }).finally(() => {
    loading.value = false
  })
}

const handleChangeWarehouse = (e) => {
  form.value.areaId = undefined
  form.value.details.forEach(it => {
    it.areaId = undefined
  })
}

const handleChangeArea = (e) => {
  form.value.details.forEach(it => {
    it.areaId = e
  })
}

const handleChangeQuantity = () => {
  let sum = 0
  form.value.details.forEach(it => {
    if (it.quantity) {
      sum += Number(it.quantity)
    }
  })
  form.value.totalQuantity = sum
}

const handleAutoCalc = () => {
  let sum = undefined
  form.value.details.forEach(it => {
    if (it.amount >= 0) {
      if (!sum) {
        sum = 0
      }
      sum = numSub(sum, -Number(it.amount))
    }
  })
  form.value.payableAmount = sum
}

const handleDeleteDetail = (row, index) => {
  if (row.id) {
    proxy.$modal.confirm('确认删除本条商品明细吗？如确认会立即执行！').then(function () {
      return delReceiptOrderDetail(row.id);
    }).then(() => {
      form.value.details.splice(index, 1)
      proxy.$modal.msgSuccess("删除成功");
    });
  } else {
    form.value.details.splice(index, 1)
  }
}
const goSaasTip = () => {
  ElMessageBox.alert('一物一码/SN模式请去Saas版本体验！', '系统提示', {
    confirmButtonText: '确定'
  })
  return false
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module";

.btn-box {
  width: calc(100% - #{$base-sidebar-width});
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
}
</style>
