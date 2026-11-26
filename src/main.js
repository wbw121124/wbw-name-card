const my_card = document.getElementById("card");
const CARD_ROTATE_STRENGTH = 1; // card 鼠标靠近时的旋转强度
const CARD_TITLE = "wbw121124 的个人名片——喵~";

const my_avatar = document.getElementById("avatar");
let cleanupUniverse = null;
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

document.addEventListener("DOMContentLoaded", () => {
	if (prefersReducedMotion?.matches) {
		document.title = CARD_TITLE;
	} else {
		setTimeout(() => {
			const text = CARD_TITLE;
			let cnt = 0;
			const f = () => {
				document.title = text.substring(0, ++cnt);
				if (cnt != text.length)
					setTimeout(f,
						text.charCodeAt(cnt - 1) < 128 ? 50 : 125);
			};
			f();
		}, 500);
	}
	(() => {
		/*
		以下代码基于以下 ISC 许可代码修改而来：
		原始来源：https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/dark/dark.js
		原始许可证：ISC License
		修改内容：已进行修改以适应本项目的需要。
		*/
		function initUniverse() {
			if (prefersReducedMotion?.matches) return null;

			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

			const canvas = document.getElementById("universe");
			if (!canvas) return null;

			let n, e, i, h;
			const t = 0.05;
			let o = true;
			const a = "180,184,240";
			const r = "226,225,142";
			const d = "226,225,224";
			const c = [];

			// 动画运行标志与 rAF 句柄：暂停/停止时置 false 并取消帧
			let running = true;
			let rafId = null;

			function f() {
				n = window.innerWidth;
				e = window.innerHeight;
				i = 0.1919810 * n;
				canvas.setAttribute("width", n);
				canvas.setAttribute("height", e);
			}

			function u() {
				if (!h) return;
				h.clearRect(0, 0, n, e);
				for (let idx = 0; idx < c.length; idx++) {
					const star = c[idx];
					star.move();
					star.fadeIn();
					star.fadeOut();
					star.draw();
				}
			}

			function y() {
				this.reset = function () {
					this.giant = m(3);
					this.comet = !this.giant && !o && m(10);
					this.x = l(0, n - 10);
					this.y = l(0, e);
					this.r = l(1.1, 2.6);
					this.dx = l(t, 6 * t) + (this.comet ? t * l(50, 120) : 0) + 2 * t;
					this.dy = -l(t, 6 * t) - (this.comet ? t * l(50, 120) : 0);
					this.fadingOut = null;
					this.fadingIn = true;
					this.opacity = 0;
					this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet ? 1 : 0));
					this.do = l(5e-4, 0.002) + 0.001 * (this.comet ? 1 : 0);
				};

				this.fadeIn = function () {
					if (this.fadingIn) {
						if (this.opacity > this.opacityTresh) this.fadingIn = false;
						this.opacity += this.do;
					}
				};

				this.fadeOut = function () {
					if (this.fadingOut) {
						if (this.opacity < 0) this.fadingOut = false;
						this.opacity -= this.do / 2;
						if ((this.x > n || this.y < 0)) {
							this.fadingOut = false;
							this.reset();
						}
					}
				};

				this.draw = function () {
					if (!h) return;
					h.beginPath();
					if (this.giant) {
						h.fillStyle = "rgba(" + a + "," + this.opacity + ")";
						h.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
					} else if (this.comet) {
						h.fillStyle = "rgba(" + d + "," + this.opacity + ")";
						h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
						for (let t2 = 0; t2 < 30; t2++) {
							h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t2) + ")";
							h.rect(this.x - this.dx / 4 * t2, this.y - this.dy / 4 * t2 - 2, 2, 2);
							h.fill();
						}
					} else {
						h.fillStyle = "rgba(" + r + "," + this.opacity + ")";
						h.rect(this.x, this.y, this.r, this.r);
					}
					h.closePath();
					h.fill();
				};

				this.move = function () {
					this.x += this.dx;
					this.y += this.dy;
					if (this.fadingOut === false) this.reset();
					if ((this.x > n - n / 4 || this.y < 0)) this.fadingOut = true;
				};

				setTimeout(function () {
					o = false;
				}, 50);
			}

			function m(threshold) {
				return Math.floor(1000 * Math.random()) + 1 < 10 * threshold;
			}

			function l(min, max) {
				return Math.random() * (max - min) + min;
			}

			f();
			window.addEventListener("resize", f, false);

			h = canvas.getContext("2d");
			for (let idx = 0; idx < i; idx++) {
				c[idx] = new y();
				c[idx].reset();
			}
			u();

			// 动画循环：停止时不再调度下一帧
			function animate() {
				if (!running) return;
				u();
				rafId = window.requestAnimationFrame(animate);
			}
			animate();

			// 页面隐藏时暂停动画，重新可见时恢复
			const onVis = () => {
				if (document.hidden) {
					running = false;
					if (rafId) cancelAnimationFrame(rafId);
					rafId = null;
				} else {
					running = true;
					rafId = window.requestAnimationFrame(animate);
				}
			};
			document.addEventListener("visibilitychange", onVis);

			// 返回清理函数：停止动画并成对移除监听
			return function cleanup() {
				running = false;
				if (rafId) cancelAnimationFrame(rafId);
				rafId = null;
				window.removeEventListener("resize", f);
				document.removeEventListener("visibilitychange", onVis);
			};
		}

		if (typeof window.initUniverse === 'undefined') {
			window.initUniverse = initUniverse;
		}

		// 显式启动星空背景；返回 cleanup 供后续按需停止
		cleanupUniverse = initUniverse();
	})();
});

// 3D 倾斜：down 立即更新，按住期间 move 持续更新，up/cancel/leave/blur 复位
let pressed = false;
let cachedRect = null;

function updateTilt(e) {
	if (prefersReducedMotion?.matches || !cachedRect) return;
	const { left, top, width: w, height: h } = cachedRect;
	if (!w || !h) return;
	const x = Math.min(Math.max(e.clientX - left, 0), w);
	const y = Math.min(Math.max(e.clientY - top, 0), h);
	const mx = 0.5 - x / w;
	const my = y / h - 0.5;
	my_card.style.transform = `rotateX(${my * CARD_ROTATE_STRENGTH}deg) rotateY(${mx * CARD_ROTATE_STRENGTH}deg)`;
}

function resetCardTilt() {
	pressed = false;
	cachedRect = null;
	my_card.style.transform = "";
}

my_card.addEventListener("pointerdown", (e) => {
	if (prefersReducedMotion?.matches || e.target.closest("a")) return;
	// 阻止浏览器把按下拖动识别为文本选择/手势，避免 pointercancel 打断倾斜
	// e.preventDefault(); // 傻子 ai 写的，这根本不会被打断
	pressed = true;
	cachedRect = my_card.getBoundingClientRect();
	updateTilt(e);
});

my_card.addEventListener("pointermove", (e) => {
	if (pressed) updateTilt(e);
});

["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
	my_card.addEventListener(type, resetCardTilt);
});
window.addEventListener("blur", resetCardTilt);