<template>
    <div class="home-page">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-card>
                    <template v-slot:header>
                        <span>近七天提交数</span>
                    </template>
                    <div>{{ recentSubmissions }}</div>

                    <template>
                        <div ref="echartsRef" style="width: 600px; height: 400px;"></div>
                    </template>
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
                    <List :columns="pastContestColumns" :tableData="pastContests"
                        @row-click="handleRowClicktocontest" />
                </el-card>
                <el-card>
                    <template v-slot:header>
                        <span>即将到来的比赛</span>
                    </template>
                    <List :columns="upcomingContestColumns" :tableData="upcomingContests"
                        @row-click="handleRowClicktocontest" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <!-- 个人信息展示框 -->
                <el-card v-if="!authStore.isGuest" class="user-info">
                    <template v-slot:header>
                        <span>个人信息</span>
                    </template>
                    <div class="card-body">
                        <el-row class="user-details" :gutter="20">
                            <el-col :span="12">
                                <div class="user-detail-item"><strong>用户名:</strong> {{ userInfo.username }}</div>
                                <div class="user-detail-item"><strong>姓名:</strong> {{ userInfo.name }}</div>
                                <div class="user-detail-item"><strong>学校:</strong> {{ userInfo.school }}</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="user-detail-item"><strong>班级:</strong> {{ userInfo.clazz }}</div>
                                <div class="user-detail-item"><strong>奖项:</strong> {{ userInfo.award }}</div>
                                <div class="user-detail-item"><strong>积分:</strong> {{ userInfo.cfRanking }}</div>
                            </el-col>
                        </el-row>
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
                    <List :columns="cfColumns" :tableData="cfData" @row-click="handleRowClick" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // 导入 auth store
import userApi from '@/api/user'; // 导入用户 API 模块
import cfApi from '@/api/contest'; // 导入 Codeforces API 模块
import { formatTime,formatDuration } from '@/utils/timeUtils'; // 导入时间格式化函数
const authStore = useAuthStore(); // 初始化 auth store 实例
const router = useRouter();

// 在页面加载时从 Pinia Store 恢复登录状态

const goto = (path) => {
    router.push(path);
};

const userInfo = reactive({
    id: 0,
    username: '',
    name: '',
    school: '',
    clazz: '',
    award: '',
    cfRanking: '',
});

// utils/timeUtils.js

const updateInfo = async () => {
    try {
        const response = await userApi.getUserInfo();
        const data = response.data.data;
        userInfo.id = data.id;
        userInfo.username = data.username;
        userInfo.name = data.name;
        userInfo.school = data.school;
        userInfo.clazz = data.clazz;
        userInfo.award = data.award; // 更新奖项信息
        userInfo.cfRanking = data.cfRanking; // 更新 Codeforces 排名信息
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};

const fetchUserInfo = () => {
    if (!authStore.isGuest) {
        updateInfo();
    } else {
        userInfo.value = {
            id: '',
            username: '',
            name: '',
            school: '',
            clazz: '',
            award: '',
            cfRanking: '',
        };
    }
};

const cfColumns = ref([
    { prop: 'name', label: '用户名', width: 180 },
    { prop: 'score', label: '分数' },
]);

const cfData = ref([{
    name: '',
    ranting: 0
}]);

const updateCfData = async () => {
    try {
        //请求加上一页20条
        const params = {
            pageNum: 1,
            pageSize: 20,
            orderBy: 'rating',
            order: 'desc'
        };
        const response = await cfApi.listRank(params);
        const data = response.data.data;
        cfData.value = data.items.map(item => ({
            name: item.handle,
            score: item.rating,
        }));
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};


const recentSubmissions = ref('');
const intelligentTraining = ref('');


const pastContests = ref([
    { id: '', name: '', date: '', duration: '' },
]);
const upcomingContests = ref([
    { id: '', name: '', date: '', duration: '' },
]);

const pastContestColumns = ref([
    {
        prop: 'id',
        label: '比赛ID',
        width: 180
    },
    { prop: 'name', label: '比赛名称', width: 180 },
    { prop: 'startTimeSeconds', label: '时间', width: 180 , formatter:formatTime},
    { prop: 'durationSeconds', label: '持续时间', formatter:formatDuration},
]);

const upcomingContestColumns = ref([
    {
        prop: 'id',
        label: '比赛ID',
        width: 180
    },
    { prop: 'name', label: '比赛名称', width: 180 },
    { prop: 'startTimeSeconds', label: '开始时间', width: 180, formatter: formatTime },
    { prop: 'durationSeconds', label: '持续时间', formatter: formatDuration },
]);
const updateUpcomingContests = async () => {
    const params = {
        pageNum: 1,
        pageSize: 20,
        relativeTimeSeconds: -604800,
        orderBy: 'relative_Time_Seconds',
        order: 'asc'
    };
    try {
        const response = await cfApi.listContest(params);
        const data = response.data.data;
        upcomingContests.value = data.items
            .filter(item => item.relativeTimeSeconds < 0)
            .map(item => ({
                id: item.id,
                name: item.name,
                startTimeSeconds: item.startTimeSeconds,
                durationSeconds: item.durationSeconds,
            }));
        console.log("up", upcomingContests.value);
    } catch (error) {
        console.error('Error fetching contest info:', error);
    }
};

const updatePastContests = async () => {
    const params = {
        pageNum: 1,
        pageSize: 20,
        relativeTimeSeconds: -604800,
        orderBy: 'relative_Time_Seconds',
        order: 'asc'
    };
    try {
        const response = await cfApi.listContest(params);
        const data = response.data.data;
        pastContests.value = data.items
            .filter(item => item.relativeTimeSeconds > 0)
            .map(item => ({
                id: item.id,
                name: item.name,
                startTimeSeconds: item.startTimeSeconds,
                durationSeconds: item.durationSeconds,
            }));
        console.log("past", pastContests.value);
    } catch (error) {
        console.error('Error fetching contest info:', error);
    }
};

const handleRowClick = (row) => {
    const url = `https://codeforces.com/profile/${row.name}`;
    window.open(url, '_blank');
};
const handleRowClicktocontest = (row) => {
    const url = `https://codeforces.com/contest/${row.id}`;
    window.open(url, '_blank');
};

fetchUserInfo(); // 页面加载时获取一次用户信息
updateCfData();
updateUpcomingContests();
updatePastContests();

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
