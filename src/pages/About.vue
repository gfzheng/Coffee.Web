<template>
  <div class="page-about">
    <el-row class="banner" type="flex" justify="center">
      <el-col class="logo-box" :span="8">
        <img class="logo" src="../assets/coffee.png" />
      </el-col>
      <el-col class="title" :span="10">
        <p class="title-name">Coffee
          <span>v0.1</span>
        </p>
        <p class="title-sub">个人数据管理系统</p>
      </el-col>
    </el-row>
    <el-row class="detail-row">
      <p>使用 Coffee 管理和分享你的数据。</p>
      <p>Coffee后端基于Golang和MongoDB，前端使用Vue.js、ElementUI开发，可以部署到Windows、Linux和MacOS上，专门为局域网数据存储和分享设计。</p>
      <p>Github地址：
        <a target="_blank" href="https://github.com/XMatrixStudio/Coffee">服务端</a>
        <a target="_blank" href="https://github.com/XMatrixStudio/Coffee.Web">前端</a>
      </p>

      <p>只需要在局域网内的一台设备上部署Coffee，可以在PC、平板、手机上共享你的图片、电影、文档、应用、游戏等数据。</p>
      <p>电影太大？拷贝不方便？Coffee可以使用全部内网带宽，以10M/s~100M/s的速度的速度分享你的电影。</p>
      <p>电影没看完，想在床上躺着看？把电影保存到Coffee上，只需在同一WIFI下，可以让你无压力在线播放4K视频。</p>
      <p>想与你的好友分享你的相册？只需要把你的相册设置为公开，你的好友就可以在Coffee上查看你的相册，下载高清大图</p>

      <p>版本迭代：</p>
      <el-steps direction="vertical" :active="1">
        <el-step title="v0.2 (开发中...)" icon="el-icon-star-on">
          <ul slot="description" class="version-list">
            <li>高级权限管理系统
              <ul>
                <li>给你的好友定向分享内容</li>
                <li>向特定组分享内容</li>
                <li>向特定组共享内容编辑权限</li>
              </ul>
            </li>
            <li>私信系统</li>
            <li>关注系统</li>
            <li>成就系统</li>
            <li>热门评论模块</li>
            <li>黑名单模块</li>
            <li>智能内容推荐系统</li>
            <li>高级搜索功能</li>
            <li>完善分页系统</li>
            <li>基于用户等级的空间成长体系</li>
            <li>管理员控制系统</li>
            <li>文件一键打包下载</li>
            <li>电影内容模块
              <ul>
                <li>在线播放电影</li>
              </ul>
            </li>
            <li>文档内容模块</li>
            <li>应用内容模块</li>
            <li>游戏内容模块</li>
            <li>代码内容模块</li>
            <li>其他内容模块</li>
          </ul>
        </el-step>
        <el-step title="v0.1" icon="el-icon-star-off">
          <ul slot="description" class="version-list">
            <li>基于Violet中央授权系统的用户模块</li>
            <li>简单的匹配搜索</li>
            <li>基于内容公开/私密属性的分享</li>
            <li>可以嵌套回复的评论系统</li>
            <li>全局唯一的点赞系统</li>
            <li>简单的基本回复通知系统</li>
            <li>简单的空间分配系统</li>
            <li>简单的文件存储系统</li>
            <li>初步建立内容标签系统</li>
            <li>文本内容模块</li>
            <li>相册内容模块
              <ul>
                <li>图片缩略图预览</li>
                <li>高清大图下载</li>
              </ul>
            </li>
          </ul>
        </el-step>
      </el-steps>
      <p></p>
    </el-row>
  </div>
</template>


<style lang="scss">
.el-step__icon {
  background: transparent !important;
}
.page-about {
  .banner {
    padding-top: 100px;
    .logo-box {
      text-align: right;
      .logo {
        height: 100px;
        width: 100px;
      }
    }
    .title {
      text-align: left;
      color: rgb(209, 180, 137);
      margin-left: 30px;
      margin-top: 10px;
      .title-name {
        margin: 7px;
        font-size: 30px;
        span {
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .title-sub {
        margin: 7px;
        font-size: 24px;
      }
    }
  }
  .detail-row {
    text-align: left;
    margin: 40px 100px;
    .version-list {
      li {
        font-size: 18px;
        line-height: 35px;
      }
    }
  }
}
</style>
