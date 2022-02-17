// 伺服器端 res = 回應給客戶資料
// res . header 添加檔頭 ＊
const cors = (req, res, next) => {
  //cors處理
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // 若 API 使用非簡單式 API 需開啟下面兩段
  //此段設定方法
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  // // 此段設定對應表頭
  res.header(
    "Access-Control-Allow-Headers",
    "RyderCCC"
  );
  next();
};

module.exports = cors;
