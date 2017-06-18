<template>
  <div id="app">
    <div id="main">
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
      <div id="content"></div>
    </div>
    <div id="playerMin">
      <div class="avatar">
        <img src="../images/music.jpg" />
        <a class="mask">歌词</a>
      </div>
      <div class="operate">
        <a title="收藏"><i class="iconfont icon-like"></i></a>
        <a title="均衡器"><i class="iconfont icon-all"></i></a>
        <a title="音量"><i class="iconfont icon-notification"></i></a>
        <a title="播放列表"><i class="iconfont icon-list"></i></a>

      </div>
      <div class="control">
        <div class="icons-btn">
        <a class="prev" title="上一首"><i class="iconfont icon-fold"></i></a>
        <a class="play" title="正在播放"><i class="iconfont icon-stop"></i></a>
        <a class="next" title="下一首"><i class="iconfont icon-unfold"></i></a>
        </div>
        <div class="bar">
          <div class="label">水手</div>
          <div class="time">
            <span>00:00</span>
            <span>00:00</span>
          </div>
          <div class="progress" title="播放进度">
            <div class="progress-bar">
              <a></a>
            </div>
          </div>
        </div>
      </div>
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
*{
    box-sizing: border-box;
}
html,body,#app{
  height: 100%;
}
body {
  margin: 0;
  font-size: 1rem;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#main{
  display: flex;
  height: calc(100% - 60px);
}
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
#content{
  flex: 1;
}
#playerMin{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-top: 1px solid #d3d3d8;
  background: #fff;
    .avatar{
      float: left;
      position: relative;
    width: 60px;
    height: 60px;
      img{
        width: 100%;
        height: 100%;
      }
      .mask{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        line-height: 60px;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        cursor: default;
        display: none;
      }
      &:hover{
        .mask{
          display: block;
        }
      }
    }
    .operate{
      float: right;
      padding: 20px 27px 0;
      width: 250px;
      height: 100%;
        a{
            margin-right: 30px;
        }
    }
    .control{
      margin: 0 250px 0 60px;
      padding: 0 30px;
      height: 100%;
      .icons-btn{
          float: left;
        padding: 20px 0;
        a{
          float: left;
          margin-right: 10px;
          &.prev{
            transform: rotateZ(-90deg);
          }
          &.play{
            margin-top: -3px;
            i{
              font-size: 1.5em;
            }
          }
          &.next{
            transform: rotateZ(-90deg);
          }

        }
      }
      .bar{
        margin-left: 130px;
        height: 100%;
        .label{
          float: left;
          padding: 12px 0 0;
          font-size: 12px;
          color: #666;
        }
        .time{
          float: right;
          padding-top: 12px;
          height: 2.5em;
          width: 80px;
          font-size: 12px;
          text-align: right;
        }
        .progress{
          float: left;
          width: 100%;
          height: 1px;
          background-color: #f5f5f5;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          overflow: initial;
          .progress-bar{
              position: relative;
              float: left;
              a{
              position: absolute;
              right: -8px;
              top: -8px;
              width: 16px;
              height: 16px;
              background: #fff;
              border: 1px solid #333;
              border-radius: 50%;
              &:before{
              content: "";
              width: 4px;
              height: 4px;
              background: #333;
              position: absolute;
              right: 5px;
              top: 5px;
              border-radius: 50%;
              }
              }
          }
        }
      }

    }
}
</style>
