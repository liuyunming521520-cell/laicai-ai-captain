# 来菜 AI 店长作战台｜GitHub Pages 版

这是“来菜 AI 店长作战台”的可公开访问版本。仓库中包含：项目总览页、可交互的三屏样机、四份 PDF 补充材料和一份模拟试点数据工作簿。

## 目录说明

```text
github-pages/
├── index.html                 # 项目总览页，GitHub Pages 首页
├── styles.css
├── app.js
├── demo/                      # 可交互三屏样机
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── assets/
    ├── images/                # 三张真实样机截图
    └── docs/                  # 可下载的 PDF 与 XLSX
```

## 本地查看

直接打开 `index.html`，或将其拖入 Chrome。页面不依赖构建工具和本地服务。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个空仓库，例如 `laicai-ai-captain`。
2. 将 **本目录 `github-pages` 内的全部文件** 上传到仓库根目录，不要把外层文件夹再套一层。
3. 进入仓库的 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`，分支选 `main`，目录选 `/(root)`，保存。
5. 等待 GitHub 发布完成。访问地址通常为：`https://<你的 GitHub 用户名>.github.io/<仓库名>/`。

如果仓库采用 `docs/` 目录发布，请将本目录整体改名为 `docs` 后再上传；其内部相对路径无需修改。

## 演示边界

- 站内所有门店、菜品、销量、库存、异常、指标和处理记录均为模拟样本。
- AI 仅给出建议、风险线索和复盘初稿；店长、值班主管、品控负责人保留最终确认权。
- 图像、温度、反馈与表单记录只能触发“待复核”线索，不能自动输出食品安全结论。
- 项目网页不代表来菜官方系统、内部数据或实际经营效果。
