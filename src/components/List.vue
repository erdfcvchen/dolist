<template>
  <div>
    <div>
      <el-container>
        <el-header>to do list</el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="pink"
            >
              <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">任务列表</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
         <router-view></router-view>      
         </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.collapse {
  cursor: pointer;
  background: #4a5064;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 20px;
}
.el-header,
.el-footer {
  background-color: pink;
  color: rgb(250, 250, 250);
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .el-button {
    height: 40px;
    margin: auto 0;
  }
}

.el-aside {
  height: 100vh;
  background-color: pink;
  color: #333;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  height: 100vh;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-demo {
  background-color: #96b3d8;
  transform: translateX(600px);
  border-bottom: none;
}
.tag {
  margin: auto 0;
  transform: translateX(300px);
}</style
>>
