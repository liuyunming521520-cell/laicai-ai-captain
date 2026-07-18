const stages = {
  prep: {
    label: "18:00 前 / 店长确认",
    title: "预测不是一个数，而是一套可修改的决策起点。",
    summary: "系统给出需求区间、库存约束和建议量；店长可以按当天现场情况改量，并必须留下理由。第二天复盘的不是“谁服从了模型”，而是这次调整解决了什么问题。",
    points: [
      "输出 P50、P75 与库存约束，而不是一句“明天备 74 份”。",
      "保留店长确认量、调整理由和时间，形成可复盘的决策记录。",
      "先从高频、易耗、波动明显的重点菜品开始验证。"
    ],
    image: "assets/images/01-prep.png",
    alt: "明日备餐决策台界面",
    caption: "店长调整数量并写入理由后，作业单才会生效。"
  },
  quality: {
    label: "营业中 / 当班负责人复核",
    title: "先分清“风险线索”与“专业结论”。",
    summary: "设备记录、图像比对和表单缺失可以共同提示需要核对的事项，但系统不替代食品安全与出品责任人作判断。每一步处置都要能找到证据和负责人。",
    points: [
      "把异常按严重度、时限和责任人排队，而不是只弹一次提醒。",
      "从认领、处置、复核到关闭，保留完整状态流转。",
      "高风险事项必须人工复核，AI 只能提示待核对线索。"
    ],
    image: "assets/images/02-quality.png",
    alt: "出品质检与异常处置台界面",
    caption: "系统标记“记录中断”而不是擅自给出食品安全结论。"
  },
  review: {
    label: "闭店后 / 区域督导与总部运营",
    title: "门店周评不该是一张来源不明的排名表。",
    summary: "当日的预测、调整与异常处置会被带入复盘。总部看到的是哪些动作值得辅导、哪些数据需要补齐，而不是一个掩盖原因的总分。",
    points: [
      "把预测与实际、未闭环异常、店长调整理由放在同一张复盘里。",
      "按门店阶段和菜品场景看差异，避免新店与成熟店混在一起比较。",
      "周评输出下一周的辅导任务，而非只给门店贴标签。"
    ],
    image: "assets/images/03-review.png",
    alt: "闭店复盘与门店周评台界面",
    caption: "周评面向下一步行动：补什么记录、辅导什么动作。"
  }
};

const stageButtons = [...document.querySelectorAll("[data-stage]")];
const stageLabel = document.getElementById("stage-label");
const stageTitle = document.getElementById("stage-title");
const stageSummary = document.getElementById("stage-summary");
const stagePoints = document.getElementById("stage-points");
const stageImage = document.getElementById("stage-image");
const stageCaption = document.getElementById("stage-caption");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let stageTween;

function renderIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function animateStageChange() {
  if (!window.gsap || reduceMotion.matches) return;

  const targets = [stageLabel, stageTitle, stageSummary, stagePoints, stageImage, stageCaption];
  stageTween?.kill();
  stageTween = window.gsap.from(targets, {
    y: 8,
    duration: 0.32,
    ease: "power2.out",
    overwrite: "auto"
  });
}

function setStage(name) {
  const stage = stages[name];
  if (!stage) return;

  stageButtons.forEach((button) => {
    const active = button.dataset.stage === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  stageLabel.textContent = stage.label;
  stageTitle.textContent = stage.title;
  stageSummary.textContent = stage.summary;
  stagePoints.innerHTML = stage.points.map((point) => `<li>${point}</li>`).join("");
  stageImage.src = stage.image;
  stageImage.alt = stage.alt;
  stageCaption.textContent = stage.caption;
  animateStageChange();
}

stageButtons.forEach((button) => {
  button.addEventListener("click", () => setStage(button.dataset.stage));
});

function initializeMotion() {
  if (!window.gsap || reduceMotion.matches) return;

  const { gsap, ScrollTrigger } = window;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const heroShot = document.querySelector("[data-hero-shot]");
  gsap.from(heroShot, { y: 12, duration: 0.48, ease: "power2.out" });

  if (ScrollTrigger) {
    gsap.utils.toArray("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 12,
        duration: 0.42,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true
        }
      });
    });
  }

  const header = document.querySelector("[data-site-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

document.addEventListener("DOMContentLoaded", renderIcons);
window.addEventListener("load", initializeMotion, { once: true });
