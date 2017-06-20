<template>
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
          height: 3em;
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
