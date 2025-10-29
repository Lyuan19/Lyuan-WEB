let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text',  {
    strings: ['Frontend Developer', 'Backend Developer', 'Blockchain Developer', 'Web Designer', 'Youtuber'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
 });
 const typedAbout = new Typed(".typed-about", {
  strings: ["Problem Solver", "Genshin Player", "ModelKit Slayer", "King of Gacha"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

AOS.init({
  duration: 1500, // thời gian chạy hiệu ứng (ms)
  once: true, // chỉ chạy 1 lần khi cuộn tới
});

// --- BẮT ĐẦU LOGIC MUSIC PLAYER ---

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles: Vui lòng đổi tên các file nhạc/ảnh của bạn thành: lighter.mp3/jpeg, no_more.mp3/jpeg, move_your_body.mp3/jpeg
const songs = ['lighter', 'no more', 'move your body']; // <--- ĐÃ SỬA: Thêm 2 bài hát, dùng gạch dưới thay khoảng trắng

// Keep track of song
let songIndex = 0; // Bắt đầu từ bài hát đầu tiên

// Initially load song details into DOM
if (musicContainer) {
    loadSong(songs[songIndex]);
}


// Update song details
function loadSong(song) {
  // Thay thế dấu gạch dưới bằng khoảng trắng để hiển thị trên UI đẹp hơn
  const displayTitle = song.replace(/_/g, ' ');
    
  title.innerText = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1); // Viết hoa chữ cái đầu
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`; // <--- ĐÃ SỬA: Đã đồng bộ lại thành .jpeg (Khớp với MainWeb.html)
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar (Chức năng tua bài)
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song (Cập nhật số hiển thị)
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	if (currTime) currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	if (durTime) durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners - Kiểm tra sự tồn tại của phần tử trước khi thêm listener
if (playBtn) playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

if (prevBtn) prevBtn.addEventListener('click', prevSong);
if (nextBtn) nextBtn.addEventListener('click', nextSong);

// Time/song update (Cập nhật thanh tiến trình)
if (audio) audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar (Kích hoạt chức năng tua bài)
if (progressContainer) progressContainer.addEventListener('click', setProgress);

// Song ends
if (audio) audio.addEventListener('ended', nextSong);

// Time of song (Cập nhật số hiển thị)
if (audio) audio.addEventListener('timeupdate',DurTime);

// --- KẾT THÚC LOGIC MUSIC PLAYER ---
// ... (Các event listeners cho nút Play, Prev, Next, Progress Bar giữ nguyên)

// Song ends
if (audio) audio.addEventListener('ended', nextSong);

// Time of song (Cập nhật số hiển thị)
if (audio) audio.addEventListener('timeupdate',DurTime);


// --- SỬA LỖI ĐƠ NHẠC VÀ AUTOPLAY THỬ LẠI ---

let isAutoplayAttempted = false;

// Lắng nghe sự kiện canplaythrough để đảm bảo nhạc sẵn sàng phát
if (audio) {
    audio.addEventListener('canplaythrough', function() {
        
        // Chỉ chạy logic Autoplay nếu chưa từng được chạy
        if (!isAutoplayAttempted) {
            
            // 1. LẦN THỬ THỨ NHẤT (Ngay khi file sẵn sàng)
            // Gọi playSong() ngay, sử dụng setTimeout để ưu tiên tải trang
            setTimeout(playSong, 100); 
            isAutoplayAttempted = true;

            // 2. LẦN THỬ THỨ HAI (Chạy sau 1 giây, nếu lần 1 thất bại)
            setTimeout(() => {
                // Kiểm tra xem nhạc đã thực sự đang phát chưa (class 'play' đã được thêm chưa)
                const isPlaying = musicContainer.classList.contains('play');
                
                if (!isPlaying) {
                    // Nếu nhạc chưa phát, gọi lại playSong()
                    console.log('Autoplay failed the first time. Attempting a second time...');
                    playSong(); 
                }
            }, 1000); // Thử lại sau 1000ms (1 giây)
        }
    }, { once: true }); // { once: true } đảm bảo sự kiện chỉ chạy 1 lần khi load bài đầu tiên.
}

// --- KẾT THÚC LOGIC MUSIC PLAYER ---