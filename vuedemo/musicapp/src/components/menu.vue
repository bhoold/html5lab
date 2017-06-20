<template>
      <div id="menu">
        <div class="panel">
          <div class="panel-heading top"><a class="iconfont icon-sort"></a></div>
          <div class="panel-body">
            <a class="item"><i class="iconfont icon-search"></i><span>搜索</span></a>
            <a class="item"><i class="iconfont icon-searchlist"></i><span>发现音乐</span></a>
            <a class="item"><i class="iconfont icon-radiobox"></i><span>MV</span></a>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">我的音乐</div>
          <div class="panel-body">
            <a class="item"><i class="iconfont icon-home"></i><span>本地音乐</span></a>
            <a class="item"><i class="iconfont icon-down"></i><span>下载管理</span></a>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">创建的歌单</div>
          <div class="panel-body">
            <a class="item"><i class="iconfont icon-like"></i><span>我喜欢的音乐</span></a>
          </div>
        </div>
        <div class="personal">
          <img src="../images/avatar.jpg" />
          <span>未登录</span>
          <a><i class="iconfont icon-comment"></i></a>
          <a><i class="iconfont icon-settings"></i></a>
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="scss">
#menu{
  position: relative;
  background: #f3f3f5;
  width: 200px;
  border-right: 1px solid #d3d3d8;
      .panel{
        margin-bottom: 15px;
        border: none;
        background: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        .panel-heading{
        padding: 9px 12px;
        border: none;
        font-size: 12px;
        color: #888;
        }
        .panel-body{
          padding: 0;
        }
      }
      .item{
        display: block;
        position: relative;
        padding: 9px 12px;
        &:hover{
          background: #e8e8eb;
        }
        &.active{
          background: #dddde1;
          &:before{
            content: '';
            position: absolute;
            top: 0;
            left: -1px;
            height: 100%;
            width: 2px;
            background: #32aaff;
          }
        }
        span{
          margin-left: 1em;
        }
      }
      .personal{
        position: absolute;
        bottom: -2px;
        left: 0;
        padding: 14px 12px;
        width: 100%;
        height: 60px;
        border-top: 1px solid #d3d3d8;
        font-size: 12px;
        background: #f3f3f5;
        img{
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 50%;
          vertical-align: middle;
        }
        a{
          float: right;
          margin-top: 4px;
          margin-left: 20px;
        }
      }
      &.simple{
        width: auto;
        .panel{
          margin-bottom: 0;
          border-bottom: 1px solid #d3d3d8;
        .panel-heading{
            display: none;
            &.top{
              display: block;
            }
          }
        }
        .item span{
          display: none;
        }
        .personal{
          padding: 0;
          height: auto;
          border-top: none;
          text-align: center;

          img{
            margin: 9px 0;
          }
          span{
            display: none;
          }
          a{
            float: none;
            display: block;
            margin: 0;
            padding: 9px 12px;
          }
        }
      }
}
</style>
