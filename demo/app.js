const initialPrep = [
  {
    id: "soup",
    name: "筒骨煨藕汤",
    subtitle: "核心招牌 · 晚市优先",
    range: [66, 78],
    recommended: 74,
    quantity: 74,
    forecastPoint: 72,
    actual: 75,
    coverage: "可覆盖 1.4 天",
    coverageClass: "steady",
    risk: "窗口较紧",
    riskClass: "attention",
    confidence: "中高置信",
    drivers: [
      "周末晚市是本店近四周的稳定高峰。",
      "演示天气信号显示降温，热汤需求存在上行可能。",
      "商圈活动标签与近两周晚市增长方向一致。",
      "当前核心原料库存可覆盖建议上限，无需为缺货预留额外缓冲。"
    ]
  },
  {
    id: "lotus-ribs",
    name: "粉蒸排骨",
    subtitle: "关联菜品 · 控制积压",
    range: [38, 46],
    recommended: 42,
    quantity: 42,
    forecastPoint: 41,
    actual: 39,
    coverage: "可覆盖 1.8 天",
    coverageClass: "steady",
    risk: "平稳",
    riskClass: "steady",
    confidence: "中等置信",
    drivers: [
      "同类周末销量稳定，未出现连续偏高或偏低。",
      "当前半成品在安全库存内，建议按常规节奏准备。",
      "未发现与此菜品直接相关的异常反馈。"
    ]
  },
  {
    id: "lotus-cake",
    name: "桂花糖藕",
    subtitle: "甜品 · 防止临期损耗",
    range: [24, 31],
    recommended: 27,
    quantity: 27,
    forecastPoint: 28,
    actual: 30,
    coverage: "可覆盖 2.2 天",
    coverageClass: "watch",
    risk: "留意损耗",
    riskClass: "watch",
    confidence: "中等置信",
    drivers: [
      "甜品在高峰后段波动较大，预测区间比主菜更宽。",
      "近两日库存覆盖偏高，建议维持保守备餐。",
      "如果团餐确认，可在餐前补加，不建议一次性做满。"
    ]
  }
];

const initialIssues = [
  {
    id: "hold-time",
    severity: "high",
    severityLabel: "高优先级",
    title: "藕汤保温记录中断，待人工复核",
    source: "设备记录 · 15:42",
    status: "待确认",
    deadline: "剩余 08 分钟升级",
    description: "连续 17 分钟未收到保温设备的有效数据。系统无法判断真实温度，需现场核对设备与交接记录。",
    evidenceType: "设备数据提示",
    evidenceTitle: "不是“温度异常”，而是“数据中断”",
    evidenceCopy: "本项只说明系统缺少可信记录，不能据此判断食品安全状态。现场复核结果才是处置依据。",
    evidence: [
      "15:25 至 15:42 之间，设备未写入有效温度值。",
      "该锅关联晚市核心菜品“筒骨煨藕汤”。",
      "当班交接表尚未记录设备检修或人工测温。"
    ]
  },
  {
    id: "portion-photo",
    severity: "medium",
    severityLabel: "需复核",
    title: "出品照片出现分量偏离线索",
    source: "图像比对 · 17:08",
    status: "待确认",
    deadline: "本餐段内处理",
    description: "两张抽检照片与演示标准样本差异较大。请由值班主管核对盛装器具和实际出品，不直接以图像结论判定不合格。",
    evidenceType: "图像比对提示",
    evidenceTitle: "图像只提供复核线索",
    evidenceCopy: "模型比对的是画面特征，不理解现场的器具、角度和加料情况，因此必须结合实物确认。",
    evidence: [
      "17:01 与 17:08 两次抽检，碗内可见区域低于演示样本。",
      "同一窗口的顾客反馈未出现明确“分量不足”关键词。",
      "建议先核对盛装勺数与当班 SOP。"
    ]
  },
  {
    id: "arrival-log",
    severity: "low",
    severityLabel: "留痕提醒",
    title: "原料到货温度留痕未补全",
    source: "收货单 · 11:18",
    status: "待确认",
    deadline: "闭店前补齐",
    description: "收货单缺少一项温度记录。请确认是否为漏填；系统不判断原料状态，只提醒记录完整性。",
    evidenceType: "表单完整性提示",
    evidenceTitle: "缺失的是记录，不是事实",
    evidenceCopy: "缺少数据会影响后续追溯，先把记录补全，之后再由负责人员判断是否需要进一步处理。",
    evidence: [
      "11:18 收货单已记录品类、数量和交接人。",
      "“到货温度”字段为空，未附照片或备注。",
      "同批次其他记录未发现关联异常。"
    ]
  }
];

const state = {
  prep: clone(initialPrep),
  selectedPrepId: "soup",
  prepCommitted: null,
  issues: clone(initialIssues),
  selectedIssueId: "hold-time"
};

const byId = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let viewTween;

function animatePulse(target) {
  if (!window.gsap || reduceMotion.matches || !target) return;
  window.gsap.fromTo(target, { scale: 0.986 }, {
    scale: 1,
    duration: 0.36,
    ease: "power2.out",
    overwrite: "auto"
  });
}

function animateDemoView(viewName) {
  if (!window.gsap || reduceMotion.matches) return;
  const view = byId(`view-${viewName}`);
  if (!view) return;
  const targets = [...view.children];
  viewTween?.kill();
  viewTween = window.gsap.from(targets, {
    y: 14,
    duration: 0.46,
    ease: "power2.out",
    stagger: 0.07,
    overwrite: "auto"
  });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function iconify() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }
}

function selectedPrep() {
  return state.prep.find((dish) => dish.id === state.selectedPrepId) || state.prep[0];
}

function selectedIssue() {
  return state.issues.find((issue) => issue.id === state.selectedIssueId) || state.issues[0];
}

function renderPrep() {
  const tbody = byId("prep-table-body");
  tbody.innerHTML = state.prep.map((dish) => {
    const selected = dish.id === state.selectedPrepId ? "is-selected" : "";
    return `
      <tr class="${selected}" data-prep-row="${dish.id}" tabindex="0" aria-label="查看${dish.name}的建议依据">
        <td>
          <span class="dish-name">${dish.name}</span>
          <span class="dish-subtitle">${dish.subtitle}</span>
        </td>
        <td>
          <span class="range-value">${dish.range[0]} - ${dish.range[1]} 份</span>
          <span class="cell-hint">预测中心 ${dish.forecastPoint} 份</span>
        </td>
        <td>
          <span class="range-value">${dish.recommended} 份</span>
          <span class="cell-hint"><span class="risk-badge risk-badge--${dish.riskClass}">${dish.risk}</span></span>
        </td>
        <td><span class="coverage-badge">${dish.coverage}</span></td>
        <td>
          <div class="portion-stepper" aria-label="${dish.name}确认备餐量">
            <button type="button" data-prep-adjust="-1" data-prep-id="${dish.id}" title="减少一份" aria-label="${dish.name}减少一份"><i data-lucide="minus" aria-hidden="true"></i></button>
            <input class="portion-input" data-prep-input="${dish.id}" type="number" min="0" max="160" value="${dish.quantity}" aria-label="${dish.name}确认备餐量" />
            <button type="button" data-prep-adjust="1" data-prep-id="${dish.id}" title="增加一份" aria-label="${dish.name}增加一份"><i data-lucide="plus" aria-hidden="true"></i></button>
          </div>
        </td>
      </tr>`;
  }).join("");

  const dish = selectedPrep();
  byId("prep-confidence").textContent = dish.confidence;
  byId("selected-dish-summary").innerHTML = `
    <strong>${dish.name}</strong>
    <span>建议 ${dish.recommended} 份，当前确认 ${dish.quantity} 份。</span>`;
  byId("driver-list").innerHTML = dish.drivers.map((driver) => `<li>${driver}</li>`).join("");

  const audit = byId("prep-audit");
  if (state.prepCommitted) {
    audit.innerHTML = `<i data-lucide="badge-check" aria-hidden="true"></i><span>${state.prepCommitted}</span>`;
  } else {
    audit.innerHTML = `<i data-lucide="history" aria-hidden="true"></i><span>尚未写入。确认后会保留修改数量、理由和时间。</span>`;
  }
  iconify();
}

function updatePrepQuantity(id, value) {
  const dish = state.prep.find((item) => item.id === id);
  if (!dish) return;
  const next = Math.max(0, Math.min(160, Number.isFinite(value) ? value : dish.recommended));
  dish.quantity = Math.round(next);
  state.selectedPrepId = id;
  state.prepCommitted = null;
  renderPrep();
}

function commitPrep() {
  const changed = state.prep.filter((dish) => dish.quantity !== dish.recommended);
  const reason = byId("adjust-reason").value;
  const note = byId("adjust-note").value.trim();
  if (changed.length && !reason) {
    showToast("备餐量有调整，请补充调整原因后再写入作业单。");
    byId("adjust-reason").focus();
    return;
  }

  const changedText = changed.length
    ? changed.map((dish) => `${dish.name} ${dish.recommended}→${dish.quantity} 份`).join("；")
    : "三项菜品均沿用系统建议";
  const reasonText = changed.length ? `调整依据：${reason}${note ? `。补充：${escapeHtml(note)}` : "。"}` : "未发生人工调整。";
  state.prepCommitted = `已写入明日作业单：${changedText}。${reasonText}`;
  renderPrep();
  animatePulse(byId("prep-audit"));
  showToast("明日作业单已写入，调整依据已留痕。");
}

function issueStatusClass(status) {
  if (status === "已关闭") return "closed";
  if (status === "待复核") return "review";
  return "pending";
}

function nextIssueAction(issue) {
  if (issue.status === "待确认") return "认领处置";
  if (issue.status === "处理中") return "提交复核";
  if (issue.status === "待复核") return "关闭事项";
  return "已关闭";
}

function renderIssues() {
  const list = byId("issue-list");
  list.innerHTML = state.issues.map((issue) => {
    const selected = issue.id === state.selectedIssueId ? "is-selected" : "";
    const closed = issue.status === "已关闭";
    return `
      <article class="issue-card ${selected}" data-issue-card="${issue.id}" tabindex="0" aria-label="查看${issue.title}">
        <span class="issue-stripe issue-stripe--${issue.severity}" aria-hidden="true"></span>
        <div class="issue-body">
          <div class="issue-topline">
            <div class="issue-title-block">
              <h3 class="issue-title">${issue.title}</h3>
              <div class="issue-meta">
                <span class="severity severity--${issue.severity}">${issue.severityLabel}</span>
                <span>${issue.source}</span>
                <span class="status-badge status-badge--${issueStatusClass(issue.status)}">${issue.status}</span>
              </div>
            </div>
          </div>
          <p class="issue-description">${issue.description}</p>
          <div class="issue-actions">
            <span class="issue-time">${closed ? "已完成留痕" : issue.deadline}</span>
            <button class="button ${issue.severity === "high" && !closed ? "button-danger" : "button-quiet"}" type="button" data-issue-action="advance" data-issue-id="${issue.id}" ${closed ? "disabled" : ""}>
              <i data-lucide="${closed ? "check-check" : "arrow-right"}" aria-hidden="true"></i>
              ${nextIssueAction(issue)}
            </button>
          </div>
        </div>
      </article>`;
  }).join("");

  const openIssues = state.issues.filter((issue) => issue.status !== "已关闭").length;
  byId("open-issue-count").textContent = openIssues;
  byId("review-open-count").textContent = openIssues;

  const issue = selectedIssue();
  const evidence = byId("issue-evidence");
  evidence.innerHTML = `
    <p class="evidence-type">${issue.evidenceType}</p>
    <h3 class="evidence-title">${issue.evidenceTitle}</h3>
    <p class="evidence-copy">${issue.evidenceCopy}</p>
    <ul class="evidence-list">
      ${issue.evidence.map((item) => `<li><i aria-hidden="true"></i><span>${item}</span></li>`).join("")}
    </ul>`;
  iconify();
}

function advanceIssue(id) {
  const issue = state.issues.find((item) => item.id === id);
  if (!issue || issue.status === "已关闭") return;
  if (issue.status === "待确认") {
    issue.status = "处理中";
    showToast("事项已认领。请现场核对后提交复核。");
  } else if (issue.status === "处理中") {
    issue.status = "待复核";
    showToast("处置记录已提交，等待当班负责人复核。");
  } else {
    issue.status = "已关闭";
    showToast("事项已关闭，证据与处理过程已留痕。");
  }
  state.selectedIssueId = id;
  renderIssues();
  animatePulse(document.querySelector(`[data-issue-card="${id}"]`));
}

function renderVarianceChart() {
  const chart = byId("variance-chart");
  const highest = Math.max(...state.prep.flatMap((dish) => [dish.forecastPoint, dish.actual]));
  chart.innerHTML = state.prep.map((dish) => {
    const forecastWidth = Math.round((dish.forecastPoint / highest) * 100);
    const actualWidth = Math.round((dish.actual / highest) * 100);
    return `
      <div class="bar-row">
        <div class="bar-label"><strong>${dish.name}</strong><span>单位：份</span></div>
        <div class="bar-area">
          <div class="bar-line"><div class="bar-track"><span class="bar-value bar-value--forecast" style="width:${forecastWidth}%"></span></div><span class="bar-number">${dish.forecastPoint}</span></div>
          <div class="bar-line"><div class="bar-track"><span class="bar-value bar-value--actual" style="width:${actualWidth}%"></span></div><span class="bar-number">${dish.actual}</span></div>
        </div>
      </div>`;
  }).join("");
}

function generateReview() {
  const changed = state.prep.filter((dish) => dish.quantity !== dish.recommended);
  const openIssues = state.issues.filter((issue) => issue.status !== "已关闭").length;
  const prepSentence = changed.length
    ? `店长对 ${changed.map((dish) => dish.name).join("、")} 做了人工调整，复盘时应重点核对调整是否减少了售罄或积压。`
    : "店长沿用了系统建议，复盘时应重点检验周末与商圈信号是否被正确吸收。";
  const issueSentence = openIssues
    ? `当前还有 ${openIssues} 项异常未关闭，应先补齐处置记录，再进入周评。`
    : "当日异常均已完成闭环，可将记录纳入周度辅导判断。";
  byId("review-summary").innerHTML = `<i data-lucide="sparkles" aria-hidden="true"></i><p>${prepSentence}${issueSentence}</p>`;
  iconify();
  animatePulse(byId("review-summary"));
  showToast("复盘初稿已生成，仍需店长确认后才能进入周评。");
}

let toastTimer;
function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3100);
}

function switchView(viewName) {
  document.querySelectorAll("[data-view]").forEach((view) => {
    const active = view.dataset.view === viewName;
    view.classList.toggle("is-visible", active);
    view.hidden = !active;
  });
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    const active = button.dataset.viewTarget === viewName;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  animateDemoView(viewName);
}

function resetPrep() {
  state.prep = clone(initialPrep);
  state.selectedPrepId = "soup";
  state.prepCommitted = null;
  byId("adjust-reason").value = "";
  byId("adjust-note").value = "";
  renderPrep();
  showToast("备餐演示数据已恢复。");
}

function resetIssues() {
  state.issues = clone(initialIssues);
  state.selectedIssueId = "hold-time";
  renderIssues();
  showToast("异常处置演示状态已恢复。");
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-target]");
    if (viewButton) {
      switchView(viewButton.dataset.viewTarget);
      return;
    }

    const prepAdjust = event.target.closest("[data-prep-adjust]");
    if (prepAdjust) {
      const dish = state.prep.find((item) => item.id === prepAdjust.dataset.prepId);
      updatePrepQuantity(dish.id, dish.quantity + Number(prepAdjust.dataset.prepAdjust));
      return;
    }

    const prepRow = event.target.closest("[data-prep-row]");
    if (prepRow && !event.target.closest("input, button")) {
      state.selectedPrepId = prepRow.dataset.prepRow;
      renderPrep();
      return;
    }

    const issueAction = event.target.closest("[data-issue-action]");
    if (issueAction) {
      advanceIssue(issueAction.dataset.issueId);
      return;
    }

    const issueCard = event.target.closest("[data-issue-card]");
    if (issueCard && !event.target.closest("button")) {
      state.selectedIssueId = issueCard.dataset.issueCard;
      renderIssues();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-prep-input]")) {
      const raw = Number(event.target.value);
      updatePrepQuantity(event.target.dataset.prepInput, raw);
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-prep-row], [data-issue-card]")) {
      event.preventDefault();
      event.target.click();
    }
  });

  byId("commit-prep").addEventListener("click", commitPrep);
  byId("reset-prep").addEventListener("click", resetPrep);
  byId("reset-issues").addEventListener("click", resetIssues);
  byId("generate-review").addEventListener("click", generateReview);
}

function init() {
  renderPrep();
  renderIssues();
  renderVarianceChart();
  bindEvents();
  iconify();
  initializeDemoMotion();
}

function initializeDemoMotion() {
  if (!window.gsap || reduceMotion.matches) return;
  const topbar = document.querySelector(".topbar");
  const sidebar = document.querySelector(".sidebar");
  const visibleView = document.querySelector(".view.is-visible");
  const viewTargets = visibleView ? [...visibleView.children] : [];
  const timeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from(topbar, { y: -12, duration: 0.46 })
    .from(sidebar, { x: -14, duration: 0.48 }, "-=0.24")
    .from(viewTargets, { y: 16, duration: 0.52, stagger: 0.07 }, "-=0.2");
}

document.addEventListener("DOMContentLoaded", init);
