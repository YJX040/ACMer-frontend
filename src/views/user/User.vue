<template>
    
  <div class="home-page">
    <el-row :gutter="20">
      <el-col :span="16"> <!-- 左侧占据70%的宽度 -->
        <el-card>
          <template v-slot:header>
            <span>近七天提交数</span>
          </template>
          <div>{{ recentSubmissions }}</div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>智能训练</span>
          </template>
          <div>{{ intelligentTraining }}</div>
          <div class="CardBody">
              <div class="tranning-header">
                <div class="tranning-datas">
                  <div class="el-statistic">
                    <div class="el-statistic__head">开始时间</div>
                    <div class="el-statistic__content">
                      <span class='el-statistic__number'>2024/7/1 08:00:00</span>
                    </div>
                  </div>
                  <div class="el-statistic">
                    <div class="el-statistic__head">结束时间</div>
                    <div class="el-statistic__content">
                      <span class='el-statistic__number'>2024/7/1 08:00:00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tranning-body">
                <div class="statistics-container">
                  <div class="el-statistic">
                    <div class="el-statistic__head">总参与人数</div>
                    <div class="el-statistic__content">
                      <span class='el-statistic__number'>19</span>
                    </div>
                  </div>
                  <div class="el-statistic">
                    <div class="el-statistic__head">累计解题数量</div>
                    <div class="el-statistic__content">
                      <span class='el-statistic__number'>19</span>
                    </div>
                  </div>
                  <div class="el-statistic">
                    <div class="el-statistic__head">累计解题分数</div>
                    <div class="el-statistic__content">
                      <span class='el-statistic__number'>19</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tranning-footer">
                <el-button type="primary" disabled>榜单</el-button>
                <el-button type="success" disabled>记录</el-button>
                <el-button type="info" disabled>加入</el-button>
              </div>
            </div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>已结束的比赛</span>
          </template>
          <div>{{ pastContests }}</div>
          <div class="CardBody">
            <el-table :data="pastContests" style="width: 100%">
              <el-table-column prop="name" label="比赛名称" width="180" />
              <el-table-column prop="date" label="时间" width="180" />                
              <el-table-column prop="address" label="比赛人数" />
            </el-table>
          </div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>即将到来的比赛</span>
          </template>
          <div>{{ upcomingContests }}</div>
          <div class="CardBody">
            <el-table :data="upcomingContests" style="width: 100%">
              <el-table-column prop="name" label="比赛名称" width="180" />
              <el-table-column prop="date" label="开始时间" width="180" />                
              <el-table-column prop="address" label="结束时间" />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"> <!-- 右侧占据30%的宽度 -->
        <el-card>
          <template v-slot:header>
            <span>Codeforce展示</span>
          </template>
          <div>{{ cfData }}</div>
          <div class="CardBody">
            <el-table :data="cfData" style="width: 100%">
              <el-table-column prop="name" label="用户名" width="180" />
              <el-table-column prop="date" label="分数" />                
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'HomePage',
  data() {
    return {
      recentSubmissions: '',
      intelligentTraining: '',
      pastContests: '',
      upcomingContests: '',
      cfData: ''
    }
  },

}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
.CardBody{
  padding:15px;
}
.tranning-header, .tranning-body, .tranning-footer{
  text-align: center;
}
.tranning-datas, .statistics-container{
  display: flex;
  padding: 30px 0;
  justify-content: space-around;
}
</style>
