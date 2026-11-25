const my_title = document.getElementById("title");

const my_card = document.getElementById("card");
const CARD_ROTATE_STRENGTH = 1; // card 鼠标靠近时的旋转强度

const my_avatar = document.getElementById("avatar");

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		const text = "wbw121124 的名片——喵~";
		let cnt = 0;
		const f = () => {
			my_title.innerText = text.substring(0, ++cnt);
			if (cnt != text.length)
				setTimeout(f,
					text.charCodeAt(cnt - 1) < 128 ? 50 : 125);
		};
		f();
	}, 500);
});

// 在 my_card 被 hover 时稍微应用 css 3d 变换，微微朝向鼠标
my_card.addEventListener("mousemove", (e) => {
	const rect = my_card.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	const w = rect.width;
	const h = rect.height;
	const mx = 0.5 - x / w;
	const my = y / h - 0.5;
	my_card.style.transform = `rotateX(${my *
		CARD_ROTATE_STRENGTH}deg) rotateY(${mx *
		CARD_ROTATE_STRENGTH}deg)`;
})
my_card.addEventListener("mouseleave", () => {
	my_card.style.transform = "";
})