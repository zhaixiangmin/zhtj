/**
 * Created by licong on 2018/5/31.
 */
$(function () {
    var orgTypeList = ['leagueCommittee', 'leagueWorkCommittee', 'leagueGeneralBranch', 'leagueBranch']; // 组织类型数组(leagueCommittee-基层团委、leagueWorkCommittee-基层团工委、leagueGeneralBranch-团总支、leagueBranch-团支部)
    var oid_global = undefined; //  组织ID(全局变量)
    if(parent.window.zhtj && parent.window.zhtj.oid) {
        oid_global = parent.window.zhtj.oid; // 组织ID(全局变量)
        console.log('before parent.window.zhtj', parent.window.zhtj);
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        // 单个组织数据详细统计信息列表
        OrganizationManagementApi.singleOrgList({orgId: oid_global}).then(function (data) {
            console.log('data', data);
            var list = data.rows;
            var html = '';
            for(var i = 0; i < list.length; i++) {
                var item = list[i];
                html += ' <tr data-industry="' + item.industryCategory + '">';
                html += '     <td>' + item.industryCategoryStr + '</td>';
                for(var j=0; j<orgTypeList.length; j++) {
                    var orgType = orgTypeList[j];
                    var orgTypeCount = orgTypeList[j] + 'Count';
                    if(item[orgTypeCount] > 0) {
                        html += '<td class="clickable"><div data-type="' + orgType + '">' + item[orgTypeCount] + '</div></td>';
                    }else {
                        html += '<td>' + item[orgTypeCount] + '</td>';
                    }
                }
                // html += '<td class="clickable"><div>' + item.leagueCommitteeCount + '</div></td><td>' + item.leagueWorkCommitteeCount + '</td><td>' + item.leagueGeneralBranchCount + '</td><td>' + item.leagueBranchCount + '</td>';
                html += '<td>' + item.memberCount + '</td><td>' + item.memberLastyearCount + '</td><td>' + item.cadreFulltimePostCount + '</td><td>' + item.cadreParttimePostCount + '</td><td>' + item.cadreTemporaryPostCount + '</td>';
                html += ' </tr>';
            }
            $('#statistics').append(html);
        });

        // 点击团组织数量
        $('#statistics').on('click', '.clickable div', function () {
            // // 空心组织名称
            // var emptyName = {
            //     'emptyLeagueCommittee': '空心团委',
            //     'emptyLeagueBranch': '空心团支部',
            //     'nullCadreLeagueBranch': '无团干团支部'
            // };

            parent.window.zhtj = {
                orgId: oid_global, // 组织ID(全局变量)
                industryCategory: $(this).parents('tr').data('industry'), // 行业类别
                statIndustryOrgType: $(this).data('type'), // 要查看的组织类型(全局变量，leagueCommittee-基层团委、leagueWorkCommittee-基层团工委、leagueGeneralBranch-团总支、leagueBranch-团支部)
                num: $(this).text() // 数量
            };
            Utils.toggleTab('查看团组织明细', 'view/organization_management/organization_statistics_detail.html'); // 创建(打开)新面板(查看团组织明细)
        });

        // 点击 '导出本页数据'
        $('#download').click(function () {
            window.location.href = League.path + '/bg/orgStatistics/singleOrg/export' + '?orgId=' + oid_global; // 单个组织数据详细统计表下载导出Excel
        });

        // 团组织类型统计名称
        var industryCategoryStatisticNames = {
            'categoryCount01': '党政机关',
            'categoryCount02': '事业单位(不含公立学校)',
            'categoryCount03': '普通高等院校',
            'categoryCount04': '职业教育学校',
            'categoryCount05': '普通高中', 
            'categoryCount06': '初中',
            'categoryCount07': '小学',
            'categoryCount08': '国有企业',
            'categoryCount09': '集体企业',
            'categoryCount10': '非公企业',
            'categoryCount11': '新社会组织(不含民办学校)',
            'categoryCount12': '军队',
            'categoryCount13': '武警',
            'categoryCount14': '城市社区',
            'categoryCount15': '农村',
            'categoryCount16': '其他'
        };

        //团员最高学历统计名称
        var memberEducationStatisticNames = {
            'educationCount01': '初中',
            'educationCount02': '高中',
            'educationCount03': '大专',
            'educationCount04': '本科',
            'educationCount05': '硕士',
            'educationCount06': '博士',
            'educationCount07': '中职',
            'educationCount08': '中职中专在读',
            'educationCount09': '初中在读',
            'educationCount10': '高中在读',
            'educationCount11': '大专在读',
            'educationCount12': '本科在读',
            'educationCount13': '硕士在读',
            'educationCount14': '博士在读',
            'educationCount15': '小学'
        };

        // 团员收入档次统计名称
        var memberIncomeStatisticNames = {
            'incomeCount01': '职业为学生无收入',
            'incomeCount02': '农村户籍且无固定',
            'incomeCount03': '<=2000元/月',
            'incomeCount04': '2000～5000元/月',
            'incomeCount05': '5000～8000元/月',
            'incomeCount06': '8000～10000元/月',
            'incomeCount07': '>10000元/月'
        };

        // 团干部性质统计名称
        var tuanganPropertyStatisticNames = {
            'propertyCount01': '专职',
            'propertyCount02': '兼职',
            'propertyCount03': '挂职'
        };

        /**
         * 渲染统计图
         * @param idName {string} 统计图ID的名称
         * @param title {string} 统计图的名称
         * @param data {object} 数据对象
         * @param StatisticNames {object} 统计数据对应的名称对象
         */
        function renderCharts(idName, title, data, StatisticNames) {
            var dataArr = [];
            $.each(data, function (name, value) {
                if(StatisticNames[name]) {
                    dataArr.push({name: StatisticNames[name], value: value});
                }
            });
            console.log('dataArr', dataArr);

            var option = {
                title : {
                    text: title,
                    x:'center' // 文字水平居中
                },
                // 提示框组件
                tooltip : {
                    trigger: 'item', // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                    // 字符串模板
                    // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                //   图例组件
                //   图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                legend: {
                    x : 'center',
                    y : 'bottom'
                },
                // ??
                calculable : true,
                series : [
                    {
                        // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
                        // name:'半径模式',
                        name: title.substring(0, title.length-3),
                        type: 'pie',
                        radius : [20, 110], // 饼图的半径，数组的第一项是内半径，第二项是外半径。
                        // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
                        // 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                        center : ['50%', 160],
                        // 是否展示成南丁格尔图，通过半径区分数据大小
                        roseType : 'radius', // 扇区圆心角展现数据的百分比，半径展现数据的大小
                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                        label: {
                            normal: {
                                show: false
                            },
                            // 高亮状态下
                            emphasis: {
                                show: true
                            }
                        },
                        // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
                        lableLine: {
                            normal: {
                                show: false
                            },
                            // 高亮状态下
                            emphasis: {
                                show: true
                            }
                        },
                        // 系列中的数据内容数组。数组项可以为单个数值
                        data: dataArr
                    }
                ]
            };

            echarts.init(document.getElementById(idName)).setOption(option);
        }

        // 单个组织的团组织行业类别统计信息
        OrganizationManagementApi.industryCategoryDetail({orgId: oid_global}).then(function (data) {
            var data = data.data;
            renderCharts('industryCategory', '团组织行业类别统计图', data, industryCategoryStatisticNames); // 渲染统计图
        });

        // 单个组织的团员最高学历统计信息
        OrganizationManagementApi.memberEducationDetail({orgId: oid_global}).then(function (data) {
            var data = data.data;
            renderCharts('memberEducation', '团员学历统计图', data, memberEducationStatisticNames); // 渲染统计图
        });

        // 单个组织的团员收入档次统计信息
        OrganizationManagementApi.memberIncomeDetail({orgId: oid_global}).then(function (data) {
            var data = data.data;
            renderCharts('memberIncome', '团员收入档次统计图', data, memberIncomeStatisticNames); // 渲染统计图
        });

        // 单个组织的团干部性质统计信息
        OrganizationManagementApi.tuanganPropertyDetail({orgId: oid_global}).then(function (data) {
            var data = data.data;
            renderCharts('tuanganProperty', '团干部性质统计图', data, tuanganPropertyStatisticNames); // 渲染统计图
        });
    }
});