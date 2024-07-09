<template>
    <div class="home-page">
        <el-row :gutter="20">
            <el-col :span="16">
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
            <el-col :span="8">
                <!-- 个人信息展示框 -->
                <el-card v-if="isLoggedin" class="user-info">
                    <template v-slot:header>
                        <span>个人信息</span>
                    </template>
                    <div class="card-body">
                        <div class="avatar-container">
                            <img class="avatar" src="../assets/change.jpg" alt="User Avatar">
                        </div>
                        <div class="user-details">
                            <div>用户名: {{ userInfo.username }}</div>
                            <div>邮箱: {{ userInfo.email }}</div>
                            <div>积分: {{ userInfo.points }}</div>
                        </div>
                    </div>
                </el-card>
                <el-card v-else class="user-info">
                    <template v-slot:header>
                        <span>个人信息</span>
                    </template>
                    <div class="CardBody">
                        <a @click="goto('/login')">
                            <span>未登录，点击登录</span>
                        </a>
                    </div>
                </el-card>
                <!-- Codeforces 展示 -->
                <el-card>
                    <template v-slot:header>
                        <span>Codeforce展示</span>
                    </template>
                    <div>{{ cfData }}</div>
                    <div class="CardBody">
                        <el-table :data="cfData" style="width: 100%">
                            <el-table-column prop="name" label="用户名" />
                            <el-table-column prop="date" label="分数" />
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Loginstore } from '@/stores/login';

const store = Loginstore();
const router = useRouter();

const isLoggedin = computed(() => {
    // 这里根据实际情况修改为从 Pinia Store 获取登录状态
    return store.islogin;
});

const goto = (path) => {
    router.push(path);
};

const userInfo = ref({
    username: '',
    email: '',
    points: 0,
});

// 模拟获取用户信息的方法，实际应根据登录状态从后端获取
const fetchUserInfo = () => {
    // 这里根据实际情况修改为从后端获取用户信息
    if (store.islogin) {
        userInfo.value.username = 'John Doe';
        userInfo.value.email = 'john.doe@example.com';
        userInfo.value.points = 1000;
    } else {
        // 清空未登录状态下的用户信息
        userInfo.value.username = '';
        userInfo.value.email = '';
        userInfo.value.points = 0;
    }
};

fetchUserInfo(); // 页面加载时获取一次用户信息
</script>

<style scoped>
.home-page {
    padding: 10px 20px;
    /* 修改为上方 padding 为 10px */
}

.CardBody {
    padding: 20px;
}

.tranning-header,
.tranning-body,
.tranning-footer {
    text-align: center;
}

.tranning-datas,
.statistics-container {
    display: flex;
    padding: 30px 0;
    justify-content: space-around;
}

:deep(.el-card) {
    margin-bottom: 20px;
}

el-col {
    gap: 20px;
}


.card-body {
    display: flex;
    align-items: center;
}

.avatar-container {
    flex: 0 0 auto;
    margin-right: 20px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.user-details {
    flex: 1;
}

.not-logged-in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}
</style>