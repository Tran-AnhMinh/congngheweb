/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const ds = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

function capNhatLoc() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacMuc = Array.from(ds.querySelectorAll("li"));
	let soHien = 0;

	for (const muc of cacMuc) {
		const vanBan = (muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent).toLowerCase();
		if (tuKhoa === "" || vanBan.includes(tuKhoa)) {
			muc.classList.remove("an");
			soHien++;
		} else {
			muc.classList.add("an");
		}
	}

	if (soHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	} else {
		khongThay.classList.add("an");
	}

	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;
}

// F1 + F2 + F3
oTimKiem.addEventListener("keyup", capNhatLoc);
capNhatLoc();

// F4
ds.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return;
	}
	const muc = e.target.closest("li");
	if (!muc) {
		return;
	}
	const doan = muc.querySelector("p");
	if (!doan) {
		return;
	}
	if (doan.classList.contains("day-du")) {
		doan.classList.remove("day-du");
		e.target.textContent = "Read more >>";
	} else {
		doan.classList.add("day-du");
		e.target.textContent = "Thu gọn <<";
	}
});

// F5
nutDang.addEventListener("click", () => {
	if (oTieuDe.value.trim() === "" || oNoiDung.value.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const mucMoi = document.createElement("li");
	const spanNgay = document.createElement("span");
	spanNgay.className = "time";
	spanNgay.textContent = homNay();

	const h3TieuDe = document.createElement("h3");
	h3TieuDe.textContent = oTieuDe.value;

	const pNoiDung = document.createElement("p");
	pNoiDung.textContent = oNoiDung.value;

	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";

	mucMoi.append(spanNgay, h3TieuDe, pNoiDung, nutMore);
	ds.prepend(mucMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	capNhatLoc();
});
