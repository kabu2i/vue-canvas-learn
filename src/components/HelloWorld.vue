<template>
  <div>
    <el-row class="row-head">
      <el-col :span="24">
        <el-menu
          class="el-menu-head"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="#8cc4fc"
          active-text-color="#1989fa"
          >
          <el-menu-item index="3" @click="centerDialogVisible = true">关于</el-menu-item>
          <el-submenu index="1">
            <template slot="title">文件</template>
            <el-menu-item index="1-1" @click="saveCanvas('png')">保存为PNG</el-menu-item>
            <el-menu-item index="1-2" @click="saveCanvas('jpg')">保存为JPG</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">帮助</template>
            <el-menu-item index="2-1">使用说明</el-menu-item>
            <el-menu-item index="2-2" @click="centerDialogVisible = true">关于</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="1">
        <div>
          <el-menu 
          class="toolbar-menu" 
          mode="vertical" 
          @select="handleSelect"
          text-color="#1989fa"
          background-color="#fff"
          >
            <el-menu-item class="tool-button" index="1" @click="pen"><i class="el-icon-edit" style="color: #1989fa"></i></el-menu-item>
            <el-menu-item class="tool-button" index="2" @click="rect"><i class="el-icon-edit-outline" style="color: #1989fa"></i></el-menu-item>
            <el-menu-item class="tool-button" index="3" @click="resetCanvas"><i class="el-icon-s-release" style="color: #1989fa"></i></el-menu-item>
          </el-menu>
        <!-- <el-card class="toolbar" :body-style="{padding: '0px'}"> -->
            <!-- <i class="el-icon-edit" style="float: left; margin-right: 10px; margin-left: 10px;"></i>
            <i class="el-icon-edit-outline" style="float: left; margin-right: 10px;"></i>
            <i class="el-icon-s-release" style="float: left; margin-right: 10px;"></i>
            <el-button-group style="float: left">
              <el-button class="toolbarButton" icon="el-icon-edit" size="mini"></el-button>
              <el-button class="toolbarButton" icon="el-icon-edit-outline" size="mini"></el-button>
              <el-button class="toolbarButton" icon="el-icon-s-release" size="mini"></el-button>
            </el-button-group> -->
        <!-- </el-card> -->
        </div>
        
      </el-col>
      <el-col :span="23">
        <canvas 
          id="canvas" 
          :width="canvasWidth" 
          :height="canvasHeight"
          @mousedown="canvasDown($event)"
          @mouseup="canvasUp($event)"
          @mousemove="canvasMove($event)"
          style="background-color: #fff"
          />
      </el-col>
    </el-row>

    <el-dialog
    title="关于"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span>author： 魏杨 课程：C++程序设计</span>
    <span><img src="#" alt=""></span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      centerDialogVisible: false,
      context: {},
      canvas: null,
      area: [],
      canvasWidth: 1920,
      canvasHeight: 1080,
      paint: false,
      mode: 'pen',
      rectPos: {
        x: 0,
        y: 0
      },
      imgData: ''
    };
  },
  mounted() {
    this.canvas = document.querySelector('#canvas')
    this.context = this.canvas.getContext('2d')
    this.initCanvas()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    saveCanvas(format){
      var newImage = new Image() 
      if(format === "png") {
        newImage.src = this.canvas.toDataURL("image/png")
      }
      if(format === "jpg") {
        newImage.src = this.canvas.toDataURL("image/webp")
      }
      var a = document.createElement("a") 
      a.download = ''
      a.href = newImage.src
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    initCanvas() { // 初始化
      // this.tempStep.push(preData)

      this.context.lineWidth = 1
      // this.context.shadowBlur = 1
      // this.context.shadowColor = '#2c3e50'
      this.context.strokeStyle = '#2c3e50'

      // const canvas = document.querySelector('#canvas')
      // this.imgData = canvas.toDataURL('image/png')
    },
    resetCanvas() { // 清空画布
      this.context.fillStyle = '#fff'
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.context.fillStyle = '#000'
      this.imgData = ''
    },
    pen() {
      this.mode = 'pen'
    },
    rect() {
      this.mode = 'rect'
    },
    canvasDown(e) {
      this.paint = true

      const { target } = e
      let canvasOffsetTop
      if (this.device === 'mobile') {
        canvasOffsetTop = 0
      } else {
        canvasOffsetTop = 0
      }
      const canvasOffsetLeft = 0
      const { scrollTop, scrollLeft } = document.documentElement

      // 获取鼠标初始位置
      const canvasX = e.clientX - target.parentNode.offsetLeft - canvasOffsetLeft + scrollLeft
      const canvasY = e.clientY - target.parentNode.offsetTop - canvasOffsetTop + scrollTop - 60
      // 初始位置赋值给全局
      this.rectPos.x = canvasX
      this.rectPos.y = canvasY

      this.context.beginPath()
      this.context.moveTo(canvasX, canvasY)
    },
    canvasUp() {
      this.paint = false
      this.imgData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
    },
    canvasMove(e) {
      if(this.paint === true) {
        // 获取鼠标位置
        const { target } = e
        const canvasX = e.clientX - target.parentNode.offsetLeft
        const canvasY = e.clientY - target.parentNode.offsetTop - 60
        // const canvasX = e.clientX
        // const canvasY = e.clientY
        if(this.mode === 'pen') {
          this.drawLine(this.rectPos.x, this.rectPos.y, canvasX, canvasY)
          // 更新全局位置
          this.rectPos.x = canvasX
          this.rectPos.y = canvasY
        }
        if(this.mode === 'rect'){
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
          if(this.imgData != ''){
            this.context.putImageData(this.imgData, 0, 0, 0, 0, this.canvasWidth, this.canvasHeight)
          }
          this.drawRect(this.rectPos.x, this.rectPos.y, canvasX, canvasY)
        }
      } 
    },
    drawLine(x1, y1, x2, y2) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke()
    },
    drawRect(x1, y1, x2, y2) {
      this.context.beginPath();
      this.context.rect(x1, y1, x2-x1, y2-y1);
      this.context.stroke()
    },
    open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    height: 100px;
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  // .row-head {
  //   height: 40px;
  // }
  // .el-menu-head {
  //   height: 40px;
  //   padding: auto;
  //   margin: auto;
  //   .el-submenu {
  //     height: 40px;
  //     padding: auto;
  //     margin: auto;
  //   }
  // }
  .toolbarButton {
    float: left;
    margin: 2px;
  }
  .tool-button {
    height: 40px;
    margin: auto;
  }
  .tool-button i {
    height: 40px;
  }
</style>
