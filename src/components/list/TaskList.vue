<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="add">
      <el-button type="primary" size="medium" class="add" @click="addTask"
        >添加任务</el-button
      >
      <el-button type="primary" size="medium" class="add" @click="check"
        >查看未完成任务</el-button
      >
      <el-button type="primary" size="medium" class="add" @click="finish"
        >查看已完成任务</el-button
      >
      <el-button type="primary" size="medium" class="add" @click="all"
        >查看全部</el-button
      >
    </div>
    <div>
      <el-card class="box-card">
        <div>
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="content" label="任务名称" width="650">
              </el-table-column>
              <!-- 操作 -->

              <el-table-column
                label="完成状态"
                id="handle"
                width="100"
                prop="flag"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                id="handle"
                style="text-align:center"
                width="300"
              >
                <template slot-scope="scope">
                  <el-button size="mini" @click="update(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleted(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    type="success"
                    @click="complete(scope.row)"
                    >完成</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-card>
    </div>

    <!-- 添加任务的对话框 -->

    <el-dialog
      title="添加任务"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="活动名称" prop="task">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="ruleForm.task"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSuccess('ruleForm')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改任务的对话框 -->

    <el-dialog
      title="修改任务"
      :visible.sync="dialogUpdate"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="修改任务" prop="update">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="ruleForm.update"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogUpdate = false">取 消</el-button>
          <el-button type="primary" @click="updateSuccess('ruleForm')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      success: "已完成",
      fail: "未完成",
      dialogVisible: false,
      dialogUpdate: false,
      task: "",
      rules: {
        task: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        update: [{ required: true, message: "内容不能为空", trigger: "blur" }],
      },
      ruleForm: {
        task: "",
        update: "",
      },
      nowid: "",
    };
  },
  methods: {
    addTask() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    addSuccess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {};
          data.attribute = "1";

          data.content = this.ruleForm.task;
          if (localStorage.data == null) {
            data.id = 1;
            var arr = [];
            arr.push(data);

            var str = JSON.stringify(arr);
            localStorage.data = str;
            // console.log(localStorage.data);
          } else {
            var str = localStorage.data;
            var arr = JSON.parse(str);
            // console.log(arr);
            // 遍历数组中的对象并把id拿出来
            var idarr = [];
            for (var i = 0; i < arr.length; i++) {
              idarr.push(arr[i].id);
            }

            var max = Math.max.apply(null, idarr);
            var id = max + 1;
            data.id = id;
            arr.push(data);
            var str1 = JSON.stringify(arr);
            localStorage.data = str1;
            // console.log(arr);
          }
          this.$message("任务添加成功");
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取localstore的数据的方法
    getStore() {
      var flag = localStorage.data;

      if (flag) {
        var str = localStorage.data;
        var arr = JSON.parse(str);
        arr.forEach((value) => {
          if (value.attribute == 0) {
            value.flag = "已完成";
          } else {
            value.flag = "未完成";
          }
        });
        this.tableData = arr;
      }
    },

    // 删除任务
    deleted(row) {
      // 获得对应的任务id，把id存放到数据当中给修改的时候使用
      var id = row.id;
      //  根据id来完成 遍历本地数据再更新local的数据
      var data = this.tableData;
      for (var i = 0; i < data.length; i++) {
        if ((data[i].id = row.id)) {
          i = i + 1;
          data.splice(i, 1);
          break;
        }
      }
      this.tableData = data;
      // 同时更新到local中去
      var str = JSON.stringify(data);
      localStorage.data = str;
    },
    // 完成任务的方法
    complete(row) {
      var id = row.id;
      //  根据id来完成 遍历本地数据再更新local的数据
      var data = this.tableData;
      data.forEach((value) => {
        if (value.id == row.id) {
          (value.attribute = 0),
            //伪数据改变 不用刷新页面
            (value.flag = "已完成");
        }
      });
      this.tableData = data;
      // 同时更新到local中去
      var str = JSON.stringify(data);
      localStorage.data = str;
    },
    // 修改任务的对话框
    update(row) {
      this.dialogUpdate = true;
      var id = row.id;
      this.nowid = id;
      this.ruleForm.update = row.content;
    },

    // 修改任务的方法
    updateSuccess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var id = this.nowid;
          console.log(id);
          var data = this.tableData;
          data.forEach((value) => {
            if (value.id == id) {
              value.content = this.ruleForm.update;
            }
          });
          this.tableData = data;
          this.$message("任务修改成功");
          this.dialogUpdate = false;
          //  同步修改本地的
          var str = JSON.stringify(data);
          localStorage.data = str;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查看未完成的任务
    check() {
      this.getStore();
      var data = this.tableData;
      var newdata = data.filter((value) => {
        return value.attribute == 1;
      });
      this.tableData = newdata;
    },
    // 查看已完成任务
    finish() {
      this.getStore();
      var data = this.tableData;
      var newdata = data.filter((value) => {
        return value.attribute == 0;
      });
      this.tableData = newdata;
    },
    all() {
      this.getStore();
    },
  },

  created() {
    // 调用方法获取localstroage的数据
    this.getStore();
  },
};
</script>

<style>
.add {
  margin: 10px 0;
}
.column {
  text-align: center;
}
#handle {
  text-align: center;
}
</style>
