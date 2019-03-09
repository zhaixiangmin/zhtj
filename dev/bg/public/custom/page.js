;(function($,win,doc,unde){
	$.fn.pageFun = function(options){
		// //console.log('$(this).selector', $(this).selector);
		var defaults = {
			parentContent: $(this), // 分页器容器(最顶层) -- 自定义
			pageDiv: $(this).find(options.contentCell), // 包裹显示内容的父元素 -- 自定义
			pageObjSelector: $(this).selector + ' .pageObj',  // 包裹页码图标的父元素
			prevPageSelector: $(this).selector + ' .prevPage', // 上一页
			nextPageSelector: $(this).selector + ' .nextPage', // 下一页
			cacheNum: 1, // 缓存当前激活页码的序号
			myPageSize: 10 // 每页记录数
		};
		var opts = $.extend({},defaults,options);

		var Method = {
			init : function(){
				Method.getData(); /*请求接口获得数据*/
				Method.handleEvent(); /*事件处理*/
			}, 

			// 生成页码页面，生成列表数据
			getData : function(){
				var html = '';
				opts.apiProxy(opts.data).then(function (result) {
					var helpList = result.rows; // 数据列表
					if(result.dataList) { // 兼容请求参数不一致(列表数据：rows、dataList)
						helpList = result.dataList;
					}

					opts.pageDiv.empty(); // 清空内容列表
					opts.pageDiv.parent().find('.page').remove(); // 清除页码
					// var pageSize = 10; // 每页记录数
					if(opts.data.rows) { // 兼容请求参数不一致(每页记录数：pageSize、rows)
						opts.myPageSize = opts.data.rows;
					}
					if(opts.data.pageSize) {
						opts.myPageSize = opts.data.pageSize;
					}

					// 显示总记录数
					if(opts.insertTotalSeletor && result.total) {
						$(opts.insertTotalSeletor).text(result.total)
					}

					if(!helpList || helpList.length <= 0) { // 返回数据长度 为 0
						html += '<div class="notContent">';
						html += '  暂无内容';
						html += '</div>';
						opts.pageDiv.html(html); // 渲染底部页码栏
						// opts.pageDiv.after(html); // 渲染底部页码栏
						return;
					}

					html += '<div class="page">';
					html += '    <ul class="pageMenu clearfix">';
					html += '        <li class="prevPage"> < 上一页 </li>';
					html += '        <div class="pageObj"></div>';
					html += '        <li class="nextPage"> 下一页 > </li>';
					// html += '        <li class="last" style="font-size: 14px;">';
					// html += '        </li>';
					html += '    </ul>';
					html += '</div>';

					var isOnePage = false; // 只有一页
					// 返回数据长度 小于 一页页数 时
					if(helpList.length < opts.myPageSize){
						html = html.replace('nextPage', 'nextPage disabled');
						isOnePage = true; // 设置只有一页
					}

					// 显示求助中列表
					var dataList = opts.listFun(helpList, opts.arg); // 回调页面数据绑定的html字符串，并返回
					opts.pageDiv.html(dataList); // 渲染列表数据到页面

					html = html.replace('prevPage', 'prevPage disabled');

					if(isOnePage) { // 只有一页
						var html_page = '<li class="pageNum active">1</li>'; // 页码html
						// 向页码父元素 插入 页码项
						html = html.replace('<div class="pageObj"></div>', '<div class="pageObj">' + html_page + '</div>');
						opts.pageDiv.after(html); // 渲染底部页码栏
						return;
					}

					var html_page = ''; // 页码html
					// 添加页码html元素
					for(var i=0; i<opts.maxPage; i++) {
						if(i == 0) {
							html_page +=  '<li class="pageNum active">' + (i+1) + '</li>';
							continue;
						}
						html_page +=  '<li class="pageNum">' + (i+1) + '</li>';
					}
					// 向页码父元素 插入 页码项
					html = html.replace('<div class="pageObj"></div>', '<div class="pageObj">' + html_page + '</div>');

					opts.pageDiv.after(html); // 渲染底部页码栏
				});
			},
			handleEvent : function(){
				// 按钮禁用点击事件
				opts.parentContent.on("click", '.disabled', function (event) {
					// event.stopPropagation();
					// return false;
					event.stopImmediatePropagation(); // 可以阻止同级别点击事件，同时也阻止事件冒泡
				});
				opts.parentContent.off('click', '.pageObj li');
				opts.parentContent.off('click', '.prevPage');
				opts.parentContent.off('click', '.nextPage');
				opts.parentContent.on("click", '.pageObj li', function(){  /*点击页码切换*/
					// Method.showPageindex(0, opts.maxPage, $(this).text(), $(this));
					Method.xhhtml($(this).text(), 'indexPage', $(this));
				}); /*点击页码切换*/

				opts.parentContent.on("click", '.prevPage', function(){ /*点击上页*/
					if(opts.cacheNum == 1){
						return;
					}

					if(opts.cacheNum == 2){
						$(opts.prevPageSelector).addClass("disabled");
					}

					opts.cacheNum--;
					$(opts.nextPageSelector).removeClass("disabled");

					Method.xhhtml(opts.cacheNum, 'prevPage');
					Method.showPageindex(0, opts.maxPage, opts.cacheNum);
                });/*点击上页*/

				opts.parentContent.on("click", '.nextPage', function(){  /*点击下页*/
					opts.cacheNum++;
					Method.xhhtml(opts.cacheNum, 'nextPage');
                }); /*点击下页*/
			},
			// 塞数据
			xhhtml : function(index, selectorName, $this){
				// 保证请求参数名称不一致时，也可以兼容(当前页码：page, pageIndex, pageNo)
				if(opts.data.page) {
					opts.data.page = index;
				}
				if(opts.data.pageIndex) {
					opts.data.pageIndex = index;
				}
				if(opts.data.pageNo) {
					opts.data.pageNo = index;
				}
				var helpList = undefined;
				opts.apiProxy(opts.data).then(function (result) {
					helpList = result.rows; // 数据列表
					if(result.dataList) { // 兼容请求参数不一致(列表数据：rows、dataList)
						helpList = result.dataList;
					}

					opts.pageDiv.empty(); // 列表数据清空

					// 显示求助中列表
					var dataList = opts.listFun(helpList, opts.arg);
					opts.pageDiv.html(dataList);
				}).always(function () {
					if(!helpList || helpList.length <= 0) {
						var html = '';
						html += '<div class="notContent">';
						html += '    暂无内容';
						html += '</div>';
						opts.pageDiv.html(html); // 渲染底部页码栏
					}

					if(selectorName == '') { // 点击 '上一页'

					}else if(selectorName == 'nextPage') { // 点击 '下一页'
						if(!helpList || helpList.length < opts.myPageSize){ // 当前页是最后一页
							// $(opts.nextPageSelector).addClass("disabled").attr('disabled', true);
							$(opts.nextPageSelector).addClass("disabled");
							// opts.parentContent.off('click', '.nextPage'); // 禁用点击事件(下一页)
							Method.showPageindex(0, opts.maxPage, opts.cacheNum, true); // 显示页码页面(最后一页设置失效)
							return;
						}

						$(opts.prevPageSelector).removeClass("disabled");

						Method.showPageindex(0, opts.maxPage, opts.cacheNum); // 显示页码页面
					}else if(selectorName == 'indexPage') { // 点击 '页码'
						// 如果是当前页，直接返回
						if($this.hasClass("active")) {
							return;
						}

						opts.cacheNum = $this.text(); // 保存当前页码的序号
						if($this.text() == 1){ // 当前页码的序号是 第一页
							$(opts.prevPageSelector).addClass("disabled");
							$(opts.nextPageSelector).removeClass("disabled");
						}else if(helpList.length < opts.myPageSize){ // 当前页码的序号是 最后一页
							$(opts.prevPageSelector).removeClass("disabled");
							$(opts.nextPageSelector).addClass("disabled");
						}else{
							$(opts.prevPageSelector).removeClass("disabled");
							$(opts.nextPageSelector).removeClass("disabled");
						}

						if(!helpList || helpList.length < opts.myPageSize) { // 当前页是最后一页
							Method.showPageindex(0, opts.maxPage, $this.text(), true);
							return;
						}
						Method.showPageindex(0, opts.maxPage, $this.text());
					}
				});

				// $(opts.keuInputSelector).val(index); // 修改输入框页码
			},
			// 显示页码页面
			showPageindex : function(min, max, index, isLastPageDisabled) {
				if (index <= Math.ceil(max / 2)) { // 当前页码索引 小于等于 所要显示的页码数量
					min = 0;
					max = opts.maxPage;
				}
				else {  // 当前页码索引 在适当范围内
					min = Math.round(index - max / 2)-1;
					max = Math.round(Number(index) + Number(max / 2))-1;
				}

				var html = '';
				index = index == 0 ? 1: index; // index为0时，默认第一页
				for (var i = min; i < max; i++) {
					if(isLastPageDisabled) { // 若是最后一页
						if(i >= index-1) { // 最后一个页码设置失效
							if(i == index-1) {
								html +=  '<li class="pageNum active">' + (i+1) + '</li>';
							}
							break;
						}
					}
					if(i+1 == index) {
						// html += opts.pageFun(i+1).replace('pageNum', 'pageNum active');
						html +=  '<li class="pageNum active">' + (i+1) + '</li>';
						continue;
					}
					html += '<li class="pageNum">' + (i+1) + '</li>';

					// html += opts.pageFun(i+1);
				}
				$(opts.pageObjSelector).html(html);
            }
		};

		Method.init();
	}
})(jQuery,window,document,undefined);