<template>
  <div class="app-container">
    <el-card>
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
        <el-form-item label="电话" prop="tel">
          <el-input
            v-model="queryParams.tel"
            placeholder="请输入电话"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="小区名" prop="areaName">
          <el-input
            v-model="queryParams.areaName"
            placeholder="请输入小区名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input
            v-model="queryParams.addr"
            placeholder="请输入地址"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <!-- <el-form-item label="省" prop="province">
          <el-input
            v-model="queryParams.province"
            placeholder="请输入省"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="省ID" prop="provinceId">
          <el-input
            v-model="queryParams.provinceId"
            placeholder="请输入省ID"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input
            v-model="queryParams.city"
            placeholder="请输入市"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="市ID" prop="cityId">
          <el-input
            v-model="queryParams.cityId"
            placeholder="请输入市ID"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="县" prop="area">
          <el-input
            v-model="queryParams.area"
            placeholder="请输入县"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="县ID" prop="areaId">
          <el-input
            v-model="queryParams.areaId"
            placeholder="请输入县ID"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item> -->
        <el-form-item label="创建人" prop="createBy">
          <el-input
            v-model="queryParams.createBy"
            placeholder="请输入创建人"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt20">

      <el-row :gutter="10" class="mb8" type="flex" justify="space-between">
        <el-col :span="6"><span style="font-size: large">房源信息</span></el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['house:info:add']"
          >新增</el-button>
          <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['house:info:export']"
          >导出</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="infoList" border class="mt20">
        <!-- <el-table-column label="" prop="id" v-if="true"/> -->
        <el-table-column label="电话" prop="tel" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="小区名" prop="areaName" />
        <el-table-column label="地址" prop="addr" />
        <!-- <el-table-column label="省" prop="province" />
        <el-table-column label="省ID" prop="provinceId" />
        <el-table-column label="市" prop="city" />
        <el-table-column label="市ID" prop="cityId" />
        <el-table-column label="县" prop="area" />
        <el-table-column label="县ID" prop="areaId" /> -->
        <el-table-column label="附件文件" align="center" prop="attachment" width="150">
            <template #default="scope">
              <div style="{display: inline-block}" v-for=" (item) in scope.row.attachments ">
                  <ImagePreview
                  :width="100" :height="100"
                  :src="rewriteUrl(item)"
                  :preview-src-list="[rewriteUrl(item)]"
                  />
              </div>
                <!-- <image-preview :src="scope.row.attachment" :preview-src-list="[scope.row.attachments]" :width="50" :height="50"/> -->
                
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="创建人" prop="createBy" />
        <el-table-column label="时间" prop="createTime" />
        <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
            <template #default="scope">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['house:info:edit']">修改</el-button>
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['house:info:remove']">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <el-row>
        <pagination
          v-show="total>0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
        />
      </el-row>

    </el-card>
    <!-- 添加或修改房源信息对话框 -->
    <el-drawer :title="title" v-model="open" size="90%" append-to-body>
      <el-form ref="infoRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="电话" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入电话" /> 
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="小区名" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入小区名" />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="省ID" prop="provinceId">
          <el-input v-model="form.provinceId" placeholder="请输入省ID" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="市ID" prop="cityId">
          <el-input v-model="form.cityId" placeholder="请输入市ID" />
        </el-form-item>
        <el-form-item label="县" prop="area">
          <el-input v-model="form.area" placeholder="请输入县" />
        </el-form-item>
        <el-form-item label="县ID" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入县ID" /> 
        </el-form-item> -->
        <el-form-item label="附件文件" prop="attachment">
          <image-upload v-model="form.attachment" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>

</template>





<script setup name="Info">
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from "@/api/house/info";
// import { listByIds } from "@/api/system/oss";


const { proxy } = getCurrentInstance();
const infoList = ref([]);
const open = ref(false);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref([]);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tel: undefined,
    name: undefined,
    areaName: undefined,
    addr: undefined,
    province: undefined,
    provinceId: undefined,
    city: undefined,
    cityId: undefined,
    area: undefined,
    areaId: undefined,
    createBy: undefined,
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    tel: [
      { required: true, message: "电话不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "姓名不能为空", trigger: "blur" }
    ],
    areaName: [
      { required: true, message: "小区名不能为空", trigger: "blur" }
    ],
    addr: [
      { required: true, message: "地址不能为空", trigger: "blur" }
    ],
    // province: [
    //   { required: true, message: "省不能为空", trigger: "blur" }
    // ],
    // provinceId: [
    //   { required: true, message: "省ID不能为空", trigger: "blur" }
    // ],
    // city: [
    //   { required: true, message: "市不能为空", trigger: "blur" }
    // ],
    // cityId: [
    //   { required: true, message: "市ID不能为空", trigger: "blur" }
    // ],
    // area: [
    //   { required: true, message: "县不能为空", trigger: "blur" }
    // ],
    // areaId: [
    //   { required: true, message: "县ID不能为空", trigger: "blur" }
    // ],
    // attachment: [
    //   { required: true, message: "附件文件不能为空", trigger: "blur" }
    // ],
    // remark: [
    //   { required: true, message: "备注不能为空", trigger: "blur" }
    // ],
    // delFlag: [
    //   { required: true, message: "删除标识不能为空", trigger: "blur" }
    // ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询房源信息列表 */
function getList() {
  loading.value = true;
  listInfo(queryParams.value).then(response => {
    infoList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}


function rewriteUrl(url) {
  console.log(url);
  // http://127.0.0.1:9000/wms/2024/09/21/c4f5b62449f04fafae0534cd0a741e3b.jpg
  // http://www.liangbaokun.cn/image/2024/09/21/c4f5b62449f04fafae0534cd0a741e3b.jpg

  return url.replace("127.0.0.1:9000/wms", "www.liangbaokun.cn/image")
            .replace("192.168.52.100:9000/wms", "www.liangbaokun.cn/image");
  
   
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    tel: null,
    name: null,
    areaName: null,
    addr: null,
    province: null,
    provinceId: null,
    city: null,
    cityId: null,
    area: null,
    areaId: null,
    attachment: null,
    remark: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("infoRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加房源信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getInfo(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改房源信息";
  });
}

// /** 查看图片 */
// function showImage(row) {
//   reset();
//   const _id = row.id || ids.value
//   getInfo(_id).then(response => {
//     console.log(response.data);
//    const {attachment} = response.data;
//    console.log(attachment);
//    listByIds(attachment).then(response => {
//      console.log(response.data);
//      const data = response.data;
//      for (let row of data) {
//         console.log(row.url);
//      }

//    });
//   });
// }


/** 提交按钮 */
function submitForm() {
  proxy.$refs["infoRef"].validate(valid => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id != null) {
        updateInfo(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        }).finally(() => {
          buttonLoading.value = false;
        });
      } else {
        addInfo(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        }).finally(() => {
          buttonLoading.value = false;
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除房源信息编号为"' + _ids + '"的数据项？').then(function() {
    loading.value = true;
    return delInfo(_ids);
  }).then(() => {
    loading.value = true;
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  }).finally(() => {
    loading.value = false;
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('house/info/export', {
    ...queryParams.value
  }, `info_${new Date().getTime()}.xlsx`)
}

getList();
</script>
