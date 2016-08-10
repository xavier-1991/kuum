

window.onload=function(){

	
	//主页部分-----------------------------------------
   		//主导航
   	var mask1 = document.getElementById('mask1');
   	var mask2 = document.getElementById('mask2');
	var wrap = document.getElementById('wrap');
	var tatle_nav = document.getElementById('tatle_nav');
	var nav_strongs = tatle_nav.getElementsByTagName('strong');
	var nav_ems = tatle_nav.getElementsByTagName('em');
	var nav_spans = tatle_nav.getElementsByTagName('span');
	var page1Img = document.getElementById('page1Img');
	var page2Img = document.getElementById('page2Img');
	var H=document.documentElement.clientHeight;
	var W=document.documentElement.clientWidth;
	var logos=document.querySelectorAll('h2 img');
	var p = document.querySelector('#second_page p');
	var arr_strong=[]
	var n=0;
	var h = H;
	var prevN;
	var onOff=true;

		//渲染
		for (var i = 0; i < logos.length-1; i++) {
			logos[i].src=data['logo'];
		}
		for (var i = 0; i < nav_strongs.length; i++) {
			nav_strongs[i].innerHTML=data['tatle_nav'][i]+'<em></em>'
		}
		page1Img.src=data['page1Img'];
		// console.log(data['second_page']['text'])
		p.innerHTML = data['second_page']['text'];


	
	nav_spans[n].style.transform="scale(2)";
	nav_spans[n].className='nav_active'+(n+1);
	for (var i=0;i< nav_strongs.length;i++) {  //获取所有strong的宽度
			 nav_strongs[i].wid=getComputedStyle( nav_strongs[i])['width']		
	}	
	$('#tatle_nav').find('strong').width(0); //获取所有strong的宽度，并存为自定义属性
	
	for(var i=0;i<nav_ems.length;i++){//给所有em加class
		nav_ems[i].className='nav_active'+(i+1);
	}
	
	$(nav_spans).on('mouseover',navShow);
	$(nav_spans).on('mouseout',navHide);
	
	function navShow(ev){ // 主导航移入显示运动函数
			$( nav_strongs).stop(true);
			$(nav_ems).stop(true);
			for (var i=0;i< nav_strongs.length;i++) {
				$( nav_strongs).eq(i).animate({"width": nav_strongs[i].wid},300-15*i,'linear',function(){
					$(nav_ems).animate({'width':0},200,'linear')				
				})
			}				
	}
	
	function navHide(ev){ // 主导航移出隐藏运动函数
		$( nav_strongs).stop(true);
		$(nav_ems).stop(true);
		for (var i=0;i< nav_strongs.length;i++) {
			$(nav_ems).eq(i).animate({"width": nav_strongs[i].wid},300-15*i,'linear')
			$(nav_strongs).animate({'width':0},300-15*i,'linear')
		}				
	}
	
	//主体部分-----------------------------------------------------------
	
	var  sections = document.querySelectorAll('.plate');
	var	 main_arrow = document.querySelector('#main_arrow');
	for(var i=0;i<nav_spans.length;i++){
		nav_spans[i].index=i;
		nav_spans[i].addEventListener('click',navClikeIndex); //点击导航切换
	}
	main_arrow.addEventListener('click',downIndex); //点击下拉键切换
	
	mScroll(document,function(){ //滚轮滚动切换
				if(!onOff){
					return;
				}
				onOff=false;
				topScorllIndex();
					
				},function(){
					if(!onOff){
						return;
					}
					onOff=false;
					downScorllIndex()
				});
						
	function mScroll(obj,callBackUp,callBackDown){ //滚轮滚动函数
		obj.onmousewheel=fn;
		obj.addEventListener('DOMMouseScroll',fn);
		
		function fn(eve){
			if(eve.wheelDelta==120||eve.detail==-3){
				callBackUp();
			}else{
				callBackDown();
			}
			
			eve.preventDefault();
		}
	}
	function navClikeIndex(){
		onOff=false;
		prevN=n;
		n = this.index;
		pageSwhich();		
	}
	function downIndex(){
		onOff=false;
		prevN=n;
		n++;
		pageSwhich();		
	}
	function topScorllIndex(){
		prevN=n;
		n--;
		pageSwhich();		
	}
	function downScorllIndex(){
		prevN=n;
		n++;
		pageSwhich();
	}
	
	function pageSwhich(){//页面切换动画  
		if(n<prevN){//判断切换动画是向上还是向下
			h=-H;
		}else{
			h=H;
		}
		if(n>=5){
			n=0
		}
		else if(n<0){
			n=sections.length-1;
		}		
		mask1.className='nav_active'+(n+1);
		mask2.className='nav_active'+(prevN+1);
		mask1.style.zIndex='1';
    	mask1.style.transform='tanslateY(0)';
    	mask1.innerHTML=nav_strongs[n].innerHTML;
    	mask2.style.zIndex='2';
    	mask2.style.transform='scale(1)'
	    mask2.style.opacity='1';
     	wrap.style.zIndex='3'; 
     	wrap.style.transform='scale(1)';
     	page1Img.style.transform='scale(1)';
     	page2Img.style.transform='scale(1)';
		anime({
				targets: '#wrap',
				duration:800,
			    scale: .6,
			    opacity:0,
			    direction: 'normal',
			    autoplay: true,
			    easing:'easeOutQuad'
			});
			anime({
				targets: '#mask2',
				duration:1300,
			    scale: .4,
			    opacity:0,
			    direction: 'normal',
			    autoplay: true,
			    easing:'easeOutQuad'
			});
			anime({
				targets: '#mask1',
				duration:800,
			    scale: .9,
			    direction: 'normal',
			    autoplay: true,
			    easing:'easeOutQuad',
			    complete:function(){
			    	 mask1.style.zIndex='4';
			    	anime({
						targets: '#mask1',
						duration:500,
					    scale: 1,
					    direction: 'normal',
					    autoplay: true,
					    easing:'easeOutQuad',
					    complete:function(){
					    //此处操作主体内容部分
					    wrap.style.opacity='1';
					    wrap.style.transform='scale(1)';
					    wrap.style.zIndex='3';
					    mask2.style.zIndex='1';
					    changeFn();
					    //此处判断H的值，正负
					    	anime({
								targets: '#mask1',
								duration:1000,
							    translateY: h,
							    direction: 'normal',
							    autoplay: true,
							    easing:'easeOutQuad',
							    complete:function(){
							    	onOff=true;
								    if(n==0){
								    	page1();
								    }
								    if(n==1){
								    	page2();
								    }
								    if(n==4){
								    	page5();
								    }
							    }
							})
					    }
				    })
			    }
			})
	}
	
	
	function changeFn(ev){ //页面切换函数
		for (var i=0;i<sections.length;i++) {	
			sections[i].style.display='none';
			nav_spans[i].className='';
			nav_spans[i].style.transform="scale(1)";
		}
		sections[n].style.display='block';
		nav_spans[n].className='nav_active'+(n+1);
		nav_spans[n].style.transform="scale(2)";
		main_arrow.className='nav_active'+(n+1);
		main_arrow.style.opacity='.7';
		if(n==4){
			$('#page5List').find('li').css('opacity',0);
		}		
	}

//  第一页------------------------------------------------------

	function page1(){
			anime({
				targets: '#page1Img',
				duration:4000,
			    scale: 1.1,
			    direction: 'normal',
			    autoplay: true,
			    easing:'easeOutQuad'
			})		
	}
//  第二页--------------------------------------------------------
	function page2(){
			anime({
				targets: '#page2Img',
				duration:4000,
			    scale: 1.1,
			    direction: 'normal',
			    autoplay: true,
			    easing:'easeOutQuad'
			})		
	}
//	第三页---------------------------------------------------------
	var third_page = document.getElementById('third_page');
	var page3BigList = document.getElementById('page3BigList');
	var page3L = document.getElementById('page3L');
	var page3R = document.getElementById('page3R');
	var page3SmallImg = document.querySelectorAll('#page3SmallList img');
	var arr=['image/3big/01_soil.jpg','image/3big/02_fire.jpg','image/3big/03_flower.jpg','image/3big/04_tree.jpg','image/3big/05_mountain.jpg',
	'image/3big/06_sea.jpg','image/3big/07_ice.jpg','image/3big/08_stone.jpg','image/3big/09_earth.jpg','image/3big/10_moon.jpg','image/3big/11_sun.jpg',
	'image/3big/12_sand.jpg']
	
	var m=0;
	var prevM;
	var isDown=false;
	for (var i = 0; i < page3SmallImg.length; i++) {
		page3SmallImg[i].src='image/3small/'+data['third_page']['page3SmallList'][i];
	}
		document.onkeydown=function (ev){
//			alert(1)
			if (isDown) {
				return;
			}
			if(ev.keyCode==37||ev.keyCode==38||ev.keyCode==39||ev.keyCode==40){
				isDown=true;
			}
			if(ev.keyCode==39){
				m++;
				if(m>arr.length-1){
					m=0;
				}

				page3Right();
				
			}
			if(ev.keyCode==37){
				m--;
				if(m<0){
					m=arr.length-1;
				}				
				 page3Left();	
			}
			if(ev.keyCode==40){
				m++;
				if(m>arr.length-1){
					m=0;
				}

				page3BigList.children[1].src=arr[m];
				page3BigList.children[1].style.top='100%';
				page3BigList.children[1].style.left='0';
				mTween(page3BigList.children[1], {left:0,top:0}, 1000, 'easeOut')
				mTween(page3BigList.children[0], {top:-(page3BigList.children[1].offsetHeight),left:0}, 1000, 'easeOut',function(){
					page3BigList.insertBefore(page3BigList.children[1],page3BigList.children[0]);
					isDown=false;	
				})
				
			}
			if(ev.keyCode==38){
				m--;
				if(m<0){
					m=arr.length-1;
				}

				page3BigList.children[1].src=arr[m];
				page3BigList.children[1].style.top='-100%';
				page3BigList.children[1].style.left='0';
				mTween(page3BigList.children[1], {left:0,top:0}, 1000, 'easeOut')
				mTween(page3BigList.children[0], {top:page3BigList.children[1].offsetHeight,left:0}, 1000, 'easeOut',function(){
					page3BigList.insertBefore(page3BigList.children[1],page3BigList.children[0]);
					isDown=false;	
				})
				
			}

		}
		page3R.onclick=function(){
			if (isDown) {
				return;
			}
			isDown=true;
			m++;
			if(m>arr.length-1){
				m=0;
			}

			page3Right()
		}
		page3L.onclick=function(){
			if (isDown) {
				return;
			}
			isDown=true;
			m--;
			if(m<0){
				m=arr.length-1;
			}				
			 page3Left();
		}
		
		
		
		function page3Left(){
			page3BigList.children[1].src=arr[m];
			page3BigList.children[1].style.left='-100%';
			page3BigList.children[1].style.top='0';
			mTween(page3BigList.children[1], {left:0,top:0}, 1000, 'easeOut')
			mTween(page3BigList.children[0], {left:page3BigList.children[1].offsetWidth,top:0},1000, 'easeOut',function(){
				page3BigList.insertBefore(page3BigList.children[1],page3BigList.children[0]);
				isDown=false;	
			})
		}
		function page3Right(){
			page3BigList.children[1].src=arr[m];
			page3BigList.children[1].style.left='100%';
			page3BigList.children[1].style.top='0';
			mTween(page3BigList.children[1], {left:0,top:0}, 1000, 'easeOut')
			mTween(page3BigList.children[0], {left:-page3BigList.children[1].offsetWidth,top:0}, 1000, 'easeOut',function(){
				page3BigList.insertBefore(page3BigList.children[1],page3BigList.children[0]);
				isDown=false;	
			})
		}
	//仿苹果菜单-----------------------------------
	var page3SmallList = document.getElementById('page3SmallList');
	var page3SmallImg = page3SmallList.children;
	document.onmousemove = function(ev){
		
			var ev = ev || window.event;
			
			for(var i=0;i<page3SmallImg.length;i++){
				var x = page3SmallImg[i].offsetLeft + page3SmallImg[i].offsetWidth/2;
				var y = page3SmallImg[i].offsetTop + page3SmallImg[i].offsetHeight/2 + page3SmallList.offsetTop;
			
				var a = ev.clientX - x;
				var b = ev.clientY - y;
				
				var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
				
				var scale  = 1 - c/300;
				
				if(scale < 0.5){
					scale = 0.5;
				}
				
				
				page3SmallImg[i].style.width = scale * 80 + 'px';
				page3SmallImg[i].style.height = scale * 80 + 'px';
				
		}
		
	};
	
	for(var i=0;i<page3SmallImg.length;i++){
			page3SmallImg[i].index=i;
			page3SmallImg[i].onclick=function(){
				prevM=m;
				m=this.index;
				if(m>prevM){
					page3Right();
				}else{
					page3Left();
				}
				
			}
			
		}
	//第四页---------------------------------------------------------------------------------
	var page4imgs=document.querySelectorAll('#page4img img');
	for (var i = 0; i < page4imgs.length; i++) {
		page4imgs[i].src='image/4big/'+data['fourth_page']['page4img'][i];
	}
		
	//第五页--------------------------------------------------------------------------------

	
	
	function page5(){
		
		var page5List = document.getElementById('page5List');
		var page5Lis =  page5List.children;
		var page5Arr=[];

		var page5ListImg = document.querySelectorAll('#page5List img');
		for (var i = 0; i < page5ListImg.length; i++) {
			page5ListImg[i].src='image/5page/'+data['last_page']['page5List'][i];
		}
		
		for(var i = 0;i<page5Lis.length;i++){
			page5Arr[i]={
				left:page5Lis[i].offsetLeft,
				top:page5Lis[i].offsetTop
			}
		}
		
		for(var i=0;i<page5Lis.length;i++){
			page5Lis[i].style.position = 'absolute';
			page5Lis[i].style.left ='50%';
			page5Lis[i].style.top = -page5List.offsetTop+'px';
			page5Lis[i].style.margin = '0';
			page5Lis[i].style.opacity = '0';
		}
		var num = page5Lis.length;
		var timer1=null;
		timer1 = setInterval(function(){
			num--;
			if(num <= 0){
				clearInterval(timer1);
				num = 0; 
			}
			mTween(page5Lis[num],{
					top:page5Arr[num].top,
					left:page5Arr[num].left,
					opacity:1
					},2000,'elasticOut')
			
		},80);		
	}
	
	
//	var imgAll = document.getElementsByName('img');
//		for(var i=0;i<imgAll.length;i++){
//			imgAll[i].onmousedown=function(){
//			return false;
//		}	
//	}
	document.onmousedown=function(){
		return false;
	}
	
	window.onresize=function(){
		H=document.documentElement.clientHeight;
		mask1.style.transform='translateY('+H+'px)'
	}
	
}




















