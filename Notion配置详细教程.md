# Notion 配置详细教程

本教程将一步步带你完成 Notion 端的全部配置，包括创建集成、创建数据库、共享数据库、获取数据库 ID。

---

## 目录

1. [第一步：创建 Notion 集成（Integration）](#第一步创建-notion-集成integration)
2. [第二步：创建书籍数据库（Books Database）](#第二步创建书籍数据库books-database)
3. [第三步：创建划线数据库（Highlights Database）](#第三步创建划线数据库highlights-database)
4. [第四步：共享数据库给集成](#第四步共享数据库给集成)
5. [第五步：获取数据库 ID](#第五步获取数据库-id)
6. [第六步：获取微信读书 Cookie](#第六步获取微信读书-cookie)
7. [第七步：配置 weread2notion-pro](#第七步配置-weread2notion-pro)
8. [常见问题](#常见问题)

---

## 第一步：创建 Notion 集成（Integration）

Notion 集成相当于一个"机器人"，我们的脚本通过它来读写 Notion 数据库。

### 操作步骤：

1. 打开浏览器，访问：https://www.notion.so/my-integrations
   - 如果没登录，先登录你的 Notion 账号

2. 点击页面上的 **"New integration"**（新建集成）按钮

3. 填写集成信息：
   - **Name（名称）**：填写 `weread-sync`（或任意你喜欢的名字）
   - **Associated workspace（关联工作区）**：选择你自己的工作区
   - **Type（类型）**：选择 **"Internal"（内部）**
   
   > 注意：不要选 Public / OAuth，我们只在自己的工作区使用

4. 点击 **"Submit"（提交）** 或 **"Save"（保存）**

5. 创建成功后，你会看到一个 **"Internal Integration Token"**（内部集成令牌）
   - 长得像 `secret_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **重要：立刻复制这个 Token 并保存好！** 后面配置要用
   - 如果不小心关掉了页面，可以重新打开集成详情页查看

6. （可选）在左侧菜单点击 **"Capabilities"（功能）**，确认权限：
   - Read content（读取内容）：✅ 需要
   - Update content（更新内容）：✅ 需要
   - Insert content（插入内容）：✅ 需要
   - Delete content（删除内容）：❌ 不需要（可以不勾）

---

## 第二步：创建书籍数据库（Books Database）

书籍数据库用来存放微信读书中每本书的基本信息。

### 操作步骤：

1. 打开 Notion，进入你的工作区

2. 在左侧边栏，点击 **"Add a page"（添加页面）** 或 **"+"** 号

3. 给页面起个名字，比如 `微信读书同步`

4. 在页面正文中，输入 `/database`，选择 **"Database - Inline"（数据库 - 行内）**
   - 或者点击下方的 **"Table"（表格）** 视图

5. 数据库创建后，点击数据库右上角的 **"..."** 三个点 → **"Properties"（属性）**

6. 我们需要添加以下属性（字段）。点击 **"+ Add a property"（添加属性）** 来添加：

   | 属性名 | 类型 | 说明 | 操作 |
   |--------|------|------|------|
   | Name | Title（标题） | 书名 | 默认就有，不用改 |
   | BookId | Text（文本） | 微信读书书籍 ID | 添加 → 选 Text → 改名为 BookId |
   | Author | Text（文本） | 作者 | 添加 → 选 Text → 改名为 Author |
   | Cover | Files & media（文件和媒体） | 封面 | 添加 → 选 Files & media → 改名为 Cover |
   | Status | Select（选择） | 阅读状态 | 添加 → 选 Select → 改名为 Status |
   | Progress | Number（数字） | 阅读进度 | 添加 → 选 Number → 改名为 Progress |
   | Rating | Number（数字） | 评分 | 添加 → 选 Number → 改名为 Rating |
   | Category | Select（选择） | 分类 | 添加 → 选 Select → 改名为 Category |
   | ReadTime | Number（数字） | 阅读时长 | 添加 → 选 Number → 改名为 ReadTime |
   | LastReadDate | Date（日期） | 最后阅读时间 | 添加 → 选 Date → 改名为 LastReadDate |

7. 给数据库起个名字：点击数据库左上角的默认名称（一般是 "Database"），改为 **"Books"** 或 **"书籍库"**

> 注意：属性名（如 BookId、Author 等）必须和上面完全一致，大小写也要一致，否则脚本读不到数据。

---

## 第三步：创建划线数据库（Highlights Database）

划线数据库用来存放每一条具体的划线内容。

### 操作步骤：

1. 回到刚才的 `微信读书同步` 页面（或者新建一个页面）

2. 在页面正文空白处，输入 `/database`，选择 **"Database - Inline"**

3. 点击数据库右上角的 **"..."** → **"Properties"**

4. 添加以下属性：

   | 属性名 | 类型 | 说明 | 操作 |
   |--------|------|------|------|
   | Name | Title（标题） | 划线内容摘要 | 默认就有，不用改 |
   | Book | Relation（关联） | 关联到书籍库 | 添加 → 选 Relation |
   | Chapter | Text（文本） | 章节名 | 添加 → 选 Text → 改名为 Chapter |
   | Content | Text（文本） | 划线原文 | 添加 → 选 Text → 改名为 Content |
   | Position | Number（数字） | 章节内位置 | 添加 → 选 Number → 改名为 Position |
   | CreateTime | Date（日期） | 划线时间 | 添加 → 选 Date → 改名为 CreateTime |
   | BookmarkId | Text（文本） | 划线唯一 ID | 添加 → 选 Text → 改名为 BookmarkId |

5. **Book 属性的特殊设置（Relation 类型）：**
   
   当你添加 Book 属性并选择 Relation 类型后：
   - 会弹出一个选择数据库的窗口
   - 选择我们刚才创建的 **"Books"** 书籍数据库
   - 点击 **"Create relation"（创建关联）**
   - （可选）可以改名为 "书籍"，但属性名必须是 `Book`

6. 给数据库起个名字：改为 **"Highlights"** 或 **"划线库"**

> 重要提醒：属性名必须完全一致（Book、Chapter、Content、Position、CreateTime、BookmarkId），首字母大写，否则会导致脚本解析失败。

---

## 第四步：共享数据库给集成

创建完数据库后，必须把它们共享给集成，否则集成（机器人）访问不到这些数据库。

### 操作步骤：

**对两个数据库分别操作一次：**

1. 打开 Books 数据库页面

2. 点击页面右上角的 **"..."** 三个点按钮

3. 在弹出的菜单中，找到 **"Connections"（连接）** 或 **"+ Add connections"**
   - 位置大概在菜单的中下部
   - 如果没看到，往下滚动菜单

4. 点击 **"Connect to"** 或 **"Find more"**

5. 在搜索框中输入你刚才创建的集成名称（比如 `weread-sync`）

6. 点击搜索结果中的集成名称

7. 确认连接，点击 **"Confirm"（确认）**

8. 重复以上步骤，对 **Highlights 数据库**也做同样的操作

> 验证：在 Connections 列表中能看到你的集成就表示成功了。

---

## 第五步：获取数据库 ID

我们需要两个数据库的 ID，后面配置 GitHub Secrets 要用。

### 获取方法：

1. 打开 Books 数据库页面（确保是在完整页面视图，不是行内视图）
   - 如果是行内的，点击数据库右上角的 **"Open as full page"（以整页打开）** 按钮

2. 看浏览器地址栏的 URL，格式如下：
   ```
   https://www.notion.so/你的工作区名/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyyyyyyyyyyyyy
   ```
   或者
   ```
   https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyyyyyyyyyyyyy
   ```

3. `?v=` 前面的那串 **32 位字符**就是数据库 ID
   - 例如 URL 是 `https://www.notion.so/abc123def456ghi789jkl012mnop345?qrs=tuv678`
   - 数据库 ID 就是 `abc123def456ghi789jkl012mnop345`

4. 复制这个 ID，记为 **`WEREAD_BOOKS_DB_ID`**（书籍库 ID）

5. 用同样的方法获取 **Highlights 数据库**的 ID，记为 **`WEREAD_HIGHLIGHTS_DB_ID`**（划线库 ID）

> 小提示：数据库 ID 是 32 位的字母数字混合字符串。注意不要把 `?v=` 后面那串也复制进去了，那是视图 ID。

---

## 第六步：获取微信读书 Cookie

我们需要微信读书网页版的 Cookie，这样 weread2notion-pro 才能模拟登录并获取你的划线数据。

### 操作步骤：

1. 打开浏览器（推荐 Chrome 或 Edge），访问：https://weread.qq.com

2. 如果没登录，用微信扫码登录

3. 登录成功后，按键盘上的 **F12** 键，打开开发者工具
   - 或者右键页面 → 选择"检查"（Inspect）

4. 在开发者工具顶部的标签栏中，点击 **"Network"（网络）** 标签

5. 刷新一下页面（按 F5 或点击刷新按钮）

6. 在 Network 标签的左侧列表中，随便点击第一个请求（一般是 weread.qq.com）

7. 在右侧出现的详情面板中，找到 **"Request Headers"（请求头）** 部分

8. 在请求头中找到 **"Cookie"** 这一行
   - 后面跟着一长串字符，类似 `wr_loggin_guid=xxx; wr_avatar=xxx; ...`

9. 右键点击 Cookie 那一行 → 选择 **"Copy value"（复制值）**，复制完整的 Cookie 内容

10. 把复制的 Cookie 保存好，记为 **`WEREAD_COOKIE`**

> 注意事项：
> - Cookie 有效期一般为 1-3 个月，过期后需要重新获取
> - 不要把 Cookie 分享给别人，相当于你的登录凭证
> - 复制的时候确保是完整的 Cookie，不要漏掉前面或后面的内容

---

## 第七步：配置 weread2notion-pro

weread2notion-pro 是一个开源项目，负责把微信读书的数据同步到 Notion。

### 操作步骤：

#### 7.1 Fork 项目到你的 GitHub

1. 访问项目地址（选择一个）：
   - https://github.com/malinkang/weread2notion-pro

2. 点击页面右上角的 **"Fork"** 按钮

3. 选择 Fork 到你自己的 GitHub 账号下

4. 等待 Fork 完成

#### 7.2 配置 GitHub Secrets

1. 进入你 Fork 后的仓库页面

2. 点击顶部的 **"Settings"（设置）** 标签

3. 在左侧菜单中，找到 **"Secrets and variables"** → 点击 **"Actions"**

4. 点击 **"New repository secret"（新建仓库密钥）** 按钮

5. 依次添加以下 4 个 Secrets：

   | Secret 名称 | 值 | 说明 |
   |-------------|-----|------|
   | `NOTION_TOKEN` | 第一步获取的 Internal Integration Token | `secret_` 开头的那串 |
   | `WEREAD_COOKIE` | 第六步获取的微信读书 Cookie | 很长的一串 |
   | `WEREAD_BOOKS_DB_ID` | 第五步获取的书籍库 ID | 32 位字符串 |
   | `WEREAD_HIGHLIGHTS_DB_ID` | 第五步获取的划线库 ID | 32 位字符串 |

   > 注意：Secret 名称必须完全一致（大小写也要一致）。

#### 7.3 启用 GitHub Actions

1. 在仓库顶部点击 **"Actions"（动作）** 标签

2. 如果看到提示说 Actions 已禁用，点击 **"I understand my workflows, go ahead and enable them"**（我了解我的工作流，继续启用）

3. 在左侧找到同步的 workflow（一般叫 Sync 或 weread-sync）

4. 点击 **"Run workflow"（运行工作流）** → 选择 main 分支 → 点击绿色的 **"Run workflow"** 按钮

5. 等待工作流运行完成（大概 1-3 分钟）
   - 绿色对勾 = 成功
   - 红色叉号 = 失败（点击进去看日志找原因）

6. 运行成功后，去 Notion 的两个数据库看看，应该有数据了！

> 如果运行失败，把错误截图或日志发给我，我帮你排查。

---

## 第八步：配置博客仓库的 Secrets

weread2notion-pro 把数据同步到 Notion 后，我们的博客脚本需要从 Notion 拉取数据。所以博客仓库也需要配置 Secrets。

### 操作步骤：

1. 打开你的博客 GitHub 仓库（`californiafitzleo.github.io`）

2. 点击 **Settings** → **Secrets and variables** → **Actions**

3. 添加以下 2 个 Secrets：

   | Secret 名称 | 值 | 说明 |
   |-------------|-----|------|
   | `NOTION_TOKEN` | 同一个 Notion Token | 和 weread2notion-pro 用同一个就行 |
   | `WEREAD_HIGHLIGHTS_DB_ID` | 划线数据库 ID | 和 weread2notion-pro 用同一个就行 |

4. （可选）`WEREAD_BOOKS_DB_ID` 暂时不需要，可以先不加

---

## 第九步：填写书籍映射配置

数据同步到 Notion 后，我们需要告诉脚本"哪些书要同步到博客"。

### 操作步骤：

1. 打开 Notion 的 Books 数据库，找到你想同步的书
2. 复制那本书的 **BookId** 字段的值
3. 打开博客项目中的 `source/_data/weread_mapping.yml`
4. 找到对应书籍的配置，把 `weread_book_id` 替换成实际的 BookId
5. 保存文件

> 例如，找到理想国对应的 BookId 是 `abc123`，就把配置中的 `"请替换为实际的书籍ID"` 改成 `"abc123"`。

---

## 常见问题

### Q1：创建集成时找不到 Internal 选项？

A：确保你用的是 Notion 个人版或团队版。现在 Notion 的新建集成可能默认是 Internal，直接创建就行。

---

### Q2：数据库属性名一定要英文吗？

A：是的，脚本里读取属性用的是英文名（BookId、Chapter、Content 等），必须和教程里完全一致。数据库本身的显示名可以是中文。

---

### Q3：Cookie 会过期吗？过期了怎么办？

A：会的，一般 1-3 个月过期。过期了的话：
1. 重新登录微信读书网页版
2. 按第六步重新获取 Cookie
3. 更新 GitHub Secrets 中的 `WEREAD_COOKIE`
4. 重新运行 weread2notion-pro 的工作流

---

### Q4：工作流运行失败了，怎么看错误？

A：
1. 进入 Actions 页面
2. 点击失败的那个工作流运行记录
3. 点击失败的 job（一般是红色叉号）
4. 展开各个步骤，找到红色的那个，看日志输出

把错误信息发给我，我帮你排查。

---

### Q5：怎么确认数据同步成功了？

A：
1. 打开 Notion 的 Books 数据库，看有没有书籍数据
2. 打开 Highlights 数据库，看有没有划线数据
3. 如果都有数据，说明同步成功了

---

### Q6：可以只同步部分书吗？

A：可以的。我们的博客脚本有白名单机制，只有在 `weread_mapping.yml` 里配置了的书才会同步到博客。Notion 那边可以同步所有书，不影响。

---

## 完成检查清单

配置完成后，检查以下项目是否都搞定了：

- [ ] Notion 集成创建好了，有 Token
- [ ] Books 数据库创建好了，属性都齐了
- [ ] Highlights 数据库创建好了，属性都齐了
- [ ] 两个数据库都共享给集成了
- [ ] 两个数据库的 ID 都拿到了
- [ ] 微信读书 Cookie 拿到了
- [ ] weread2notion-pro Fork 好了
- [ ] weread2notion-pro 的 4 个 Secrets 都配置了
- [ ] weread2notion-pro 运行成功，Notion 里有数据了
- [ ] 博客仓库的 2 个 Secrets 配置了
- [ ] weread_mapping.yml 里至少一本书的 BookId 填好了

全部搞定就可以运行 `npm run weread-sync` 测试了！
