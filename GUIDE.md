### Vue 本身應用
- router 切換分成 path (路徑) 和 name (Vue) 檔案做切換使用方式也不太一樣
```js
this.$router.push({
    path: '/demo/test'
  });
  this.$router.push({
    name: "demo-test",
  }); 
```

### Nuxt 本身套件 規則
- 全部 components 接不需要再 `import` 引入，他會自行引入

- 若該 .vue 檔案非直接 components 下，需要搭配資料夾名稱做引入
  - 如 `layout/default.vue` 底下的
  <LayoutHeader /> <LayoutFooter/>

- `pages` 資料夾下會直接生成，對應檔名 router
  - 如 `pages/product.vue` 便可使用 /product 的路由
  - 若該路由要在開啟一個子層需在 `pages` 資料夾下開啟同樣檔名資料夾，接者塞入對應路徑的檔案
    - 如：`pages/product/first` 、 `pages/product/test`  便可使用 `product/first` 、 `product/test` 的路由
  - 若在 pages 資料夾下的檔案前方加入 `_` 的檔案會變成所謂動態路由
    - 如 `pages/demo/_index.vue`
    - 這種動態寫路由寫法
    - 比如路由： `demo/123123` 該檔案的 `this.$route.params` 便會是 `{"index":"123123" }`

  - 承上資料夾規則，若要將父層內容當作 components 一併顯示，並隨 router 切換子層內容可使用 <Nuxt-child /> ，但仍要注意要在 `pages` 資料夾底下設置對應資料夾 + 檔案。
    - 如 `pages/product` 以及子檔案狀況
  
  - QS.js 快速轉字串、陣列、物件的套件 和 JSON 八成像
  - `<input type="file" id="file" ref="file" @change="uploadFile" class="input-file">` 上傳檔案搭配 `this.$refs.file.files[0]` 也能抓到檔案



### 製作前後設定、概念
- 為了 SEO 而使用的前後端語法
- validate ﹑asyncData() 、 fetch() 在前 後端都會被執行，類似 hook 
  - `validate` 是用來判斷某寫資料、or 路由等等是否錯誤的生命週期
  - `asyncData()`  可使用 AJAX 的 vue data() ，目的是為了 SEO ，`asyncData()`  只能在 pages 資料夾下使用
  - `fetch()` 和 `asyncData()`  差不多，不過 `fetch()`  是改變 Nuxt VueX 的 state
    - 上面兩者的 AJAX 並不會出現在 network 只能使用 console.log 觀察回傳
  
  - <client-only> 用來包住使用者端渲染套件，比如 `pages/index.vue` 的 <Datepicker/> (時間選擇器)

  
### 後端設定、概念
- Middleware
    - 中間層、中介層
    - 簡單來說是網站 API 前、後端串接時的一個非前、非伺服器的階層 （硬要算後端
    - 可在這個 API 交流的階層做一些判斷

 - nuxt 有兩種伺服器組合方法
   1. 把 API 檔案也放在 Nuxt 專案下，並在 nuxt.config.js 做相關設定
    ```js
    serverMiddleware: [
      { path:'/api', handler: '~/server/api.js' }, 
    ], 
    ```
       - src/serve 底下資料夾採用此設定。 
       - 若要 call 這邊 API 會使用 http://localhost:3000/api/xxx ，和 nuxt 同 prot
    2. 和 SPA 一樣 伺服器、網頁分離
      - src/mock 資料夾採用此設定。
      - 若要 call 這邊 API 會使用 http://localhost:3034/api/xxx ，由 mock 中自行設定
   - 不過上述兩者為了 SEO 都需使用 `asyncData` 方法滿足爬蟲 

### mock 
  - `mock/index.js` 有做 `listen()` 監聽設定
  - 而 package.json 中有使用 `"mock": "set PORT=3034 && nodemon index.js"` 因此當使用 npm run mock 指令時，會自動將 mock 伺服器以 3034 prt 開啟 
  - 使用 mock API 會有 CORS 請求問題，大致會三有種解法
- 
    1. 後端設定
     - 參考 `Mock/utils/cors.js` 的 `res.header("Access-Control-Allow-Origin", "*")` 便是不檔全部 port 寫法， `*` 也可以替換成 domain 或是其他 port ，比如目前 nuxt 設定的 `http://localhost:3000/`
  
       - 若是非簡單的跨域請於後端必需設置 `Access-Control-Allow-Origin` 以及 `Access-Control-Allow-Headers` 
        - 如 ： `Mock/utils/cors.js`
        ```js
        //此段設定方法
        res.header(
          "Access-Control-Allow-Methods",
          "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
        );
        // 此段設定對應表頭
          res.header(
            "Access-Control-Allow-Headers",
            "RyderCCC"
          );
        ``` 

       - 前端也必需設置與 `Access-Control-Allow-Headers` 對應的檔頭

    2. 前端使用代理功能 proxy 將 API 轉換對應 port ，以 nuxt 為例 `npm i @nuxtjs/proxy` 後在 nuxt.config 設置以下程式碼便是開啟代理功能，之後 Axios 只需要使用 `baseURL: '/api/pet'`
        ```js 
          modules: [
            '@nuxtjs/axios',
            '@nuxtjs/proxy'
          ],
          axios: {
            proxy: true
          },
          proxy: [
            'http://localhost:3034/api'
          ],
        ```
        
### 前後端 API 實做
  - 前端會有三種傳資料方法
    1. get → req.query 
     - 前端 API 網址後方添加 `?xxx=xx` `http://localhost:3034/api/pet1?id=2`
     - 後端: `app.get('/pet1', (req, res) => { ....`
     - 後端 req.qeury 會是 `{id:2}`
     - 參考 getQuery()

    2. 動態參數 → /:id → req.params.id 
     - 前端 API 網址直接添加 `/` 呼叫 API `http://localhost:3034/api/pet2/rydertest`
     - 後端: `app.post('/pet2/:id', (req, res) => {`
     - 後端: `req.params` 會是 `params { id: 'rydertest' }`

    3. post、put → req.body


### 部屬
  - 若要更新 Linux 伺服器上 Git 
  - git pull origin
  - npm install
  - npm run build 
  - pm2 reload all

ryder-nuxt.website.conf

server {
    server_name ryder-nuxt.website www.ryder-nuxt.website;
    location / {
        proxy_pass http://localhost:3001; 
    }
}
